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
      path: '/drafts/:did',
      name: 'DocDiscussion',
      component: DocDiscussion
    },
    {
      path: '/drafts/:did/tasks/:tid',
      name: 'TaskDiscussion',
      component: TaskDiscussion
    },
    {
      path: '/drafts/:did/edit',
      name: 'DraftEdit',
      component: DraftEditor
    },
    {
      path: '/drafts/edit',
      name: 'DraftCreate',
      component: DraftEditor
    },
    {
      path: '/drafts/:did/tasks',
      name: 'TaskList',
      component: TaskList
    }
  ]
})
