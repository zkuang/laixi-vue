import Vue from 'vue'
import Router from 'vue-router'
import DocDiscussion from '@/components/DocDiscussion'
import TaskDiscussion from '@/components/TaskDiscussion'
import DraftEditor from '@/components/DraftEditor'
import TaskList from '@/components/TaskList'
import store from '../store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/draft/:did/',
      name: 'DraftDiscussion',
      component: DocDiscussion,
      beforeEnter(to, from, next) {
        store.commit('setPosts', [])
        store.commit('setAuthString', $('#spa>input[name="authstring"]').val())
        Promise.all(
          [
            store.dispatch('getDraftById', to.params.did),
            store.dispatch('getDraftTasks', to.params.did),
            store.dispatch('getDraftPosts', {draftId: to.params.did, pageNumber: 1})
          ]
        ).then((res) => {
          return Promise.all(
            [
              store.dispatch('getProjectById', res[0].project_id),
              store.dispatch('getProjectMembers', res[0].project_id)
            ]
          )
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
        store.commit('setPosts', [])
        store.commit('setAuthString', $('#spa>input[name="authstring"]').val())
        Promise.all(
          [
            store.dispatch('getTaskById', to.params.tid),
            store.dispatch('getTaskPosts', {taskId: to.params.tid, pageNumber: 1})
          ]
        ).then(res => {
          return store.dispatch('getDraftById', res[0].draft_id)
        }).then(draft => {
          return Promise.all(
            [
              store.dispatch('getProjectById', draft.project_id),
              store.dispatch('getProjectMembers', draft.project_id)
            ]
          )
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
        store.commit('setAuthString', $('#spa>input[name="authstring"]').val())
        store.dispatch('getDraftById', to.params.did).then(res => {
          return store.dispatch('getProjectById', res.project_id)
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
        store.commit('setAuthString', $('#spa>input[name="authstring"]').val())
        store.dispatch('getProjectById', to.params.pid).then(() => {
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
        store.commit('setAuthString', $('#spa>input[name="authstring"]').val())
        Promise.all(
          [
            store.dispatch('getDraftById', to.params.did),
            store.dispatch('getDraftTasks', to.params.did),
            store.dispatch('getDraftPosts', {draftId: to.params.did, pageNumber: 1})
          ]
        ).then(res => {
          return Promise.all(
            [
              store.dispatch('getProjectById', res[0].project_id),
              store.dispatch('getProjectMembers', res[0].project_id)
            ]
          )
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
