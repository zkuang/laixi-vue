import Vue from 'vue'
import Router from 'vue-router'
import DocDiscussion from '@/components/DocDiscussion'
import TaskDiscussion from '@/components/TaskDiscussion'
import DraftEditor from '@/components/DraftEditor'
import TaskList from '@/components/TaskList'
import store from '../store'

Vue.use(Router)

function prepare() {
  let authstring = $('#spa>input[name="authstring"]').val()
  store.commit('setAuthString', authstring)
  return authstring
}

function fetchProjectUser(pid, authstring) {
  return Promise.all(
    [
      store.dispatch('getProjectById', pid),
      store.dispatch('getProjectMembers', pid).then(users => {
        const me = users.find(user => {
          return user.id === authstring
        })
        store.commit('setCurrentUser', me)
      })
    ]
  )
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/draft/:did/',
      name: 'DraftDiscussion',
      component: DocDiscussion,
      beforeEnter(to, from, next) {
        const authstring = prepare()
        store.commit('setPosts', [])
        Promise.all(
          [
            store.dispatch('getDraftById', to.params.did),
            store.dispatch('getDraftTasks', to.params.did),
            store.dispatch('getDraftPosts', {draftId: to.params.did, pageNumber: 1})
          ]
        ).then((res) => {
          return fetchProjectUser(res[0].project_id, authstring)
        }).then(() => {
          next()
        })
      }
    },
    {
      path: '/task/:tid/',
      name: 'TaskDiscussion',
      component: TaskDiscussion,
      beforeEnter(to, from, next) {
        const authstring = prepare()
        store.commit('setPosts', [])
        Promise.all(
          [
            store.dispatch('getTaskById', to.params.tid),
            store.dispatch('getTaskPosts', {taskId: to.params.tid, pageNumber: 1})
          ]
        ).then(res => {
          return store.dispatch('getDraftById', res[0].draft_id)
        }).then(draft => {
          return fetchProjectUser(draft.project_id, authstring)
        }).then(() => {
          next()
        })
      }
    },
    {
      path: '/draft/:did/edit/',
      name: 'DraftEdit',
      component: DraftEditor,
      beforeEnter(to, from, next) {
        const authstring = prepare()
        store.dispatch('getDraftById', to.params.did).then(res => {
          return fetchProjectUser(res.project_id, authstring)
        }).then(() => {
          next()
        })
      }
    },
    {
      path: '/project/:pid/drafts/create/',
      name: 'DraftCreate',
      component: DraftEditor,
      beforeEnter(to, from, next) {
        const authstring = prepare()
        return fetchProjectUser(to.params.pid, authstring).then(() => {
          store.commit('setDraft', {})
          next()
        })
      }
    },
    {
      path: '/drafts/:did/tasks/',
      name: 'TaskList',
      component: TaskList,
      beforeEnter(to, from, next) {
        const authstring = prepare()
        Promise.all(
          [
            store.dispatch('getDraftById', to.params.did),
            store.dispatch('getDraftTasks', to.params.did),
            store.dispatch('getDraftPosts', {draftId: to.params.did, pageNumber: 1})
          ]
        ).then(res => {
          return fetchProjectUser(res[0].project_id, authstring)
        }).then(() => {
          next()
        })
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
