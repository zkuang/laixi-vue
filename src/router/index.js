import Vue from 'vue'
import Router from 'vue-router'
import DocDiscussion from '@/components/DocDiscussion'
import TaskDiscussion from '@/components/TaskDiscussion'
import DraftEditor from '@/components/DraftEditor'
import TaskList from '@/components/TaskList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/projects/:pid/drafts/:did',
      name: 'DraftDiscussion',
      component: DocDiscussion
    },
    {
      path: '/projects/:pid/drafts/:did/tasks/:tid',
      name: 'TaskDiscussion',
      component: TaskDiscussion
    },
    {
      path: '/projects/:pid/drafts/:did/edit',
      name: 'DraftEdit',
      component: DraftEditor
    },
    {
      path: '/projects/:pid/drafts/edit',
      name: 'DraftCreate',
      component: DraftEditor
    },
    {
      path: '/projects/:pid/drafts/:did/tasks',
      name: 'TaskList',
      component: TaskList
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
