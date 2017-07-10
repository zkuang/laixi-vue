import Vue from 'vue'
import Router from 'vue-router'
import DocDiscussion from '@/components/DocDiscussion'
import TaskDiscussion from '@/components/TaskDiscussion'
import DraftEditor from '@/components/DraftEditor'
import TaskList from '@/components/TaskList'
import { currentUser } from '../api/index'
import store from '../store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/draft/:did',
      name: 'DraftDiscussion',
      component: DocDiscussion,
      beforeEnter(to, from, next) {
        store.commit('setCurrentUser', currentUser)
        Promise.all(
          [
            store.dispatch('getDraftById', to.params.did),
            store.dispatch('getDraftTasks', to.params.did),
            store.dispatch('getDraftPosts', to.params.did)
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
      path: '/draft/:did/tasks/:tid',
      name: 'TaskDiscussion',
      component: TaskDiscussion,
      beforeEnter(to, from, next) {
        store.commit('setCurrentUser', currentUser)
        Promise.all(
          [
            store.dispatch('getDraftById', to.params.did),
            store.dispatch('getTaskById', to.params.tid),
            store.dispatch('getTaskPosts', to.params.tid)
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
    },
    {
      path: '/draft/:did/edit',
      name: 'DraftEdit',
      component: DraftEditor,
      beforeEnter(to, from, next) {
        store.dispatch('getDraftById', to.params.did).then(() => {
          next()
        })
      }
    },
    {
      path: '/draft/edit',
      name: 'DraftCreate',
      component: DraftEditor
    },
    {
      path: '/drafts/:did/tasks',
      name: 'TaskList',
      component: TaskList,
      beforeEnter(to, from, next) {
        Promise.all(
          [
            store.dispatch('getDraftById', to.params.did),
            store.dispatch('getDraftTasks', to.params.did),
            store.dispatch('getDraftPosts', to.params.did)
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
