import Vue from 'vue'
import Router from 'vue-router'
import DocDiscussion from '@/components/DocDiscussion'
import TaskDiscussion from '@/components/TaskDiscussion'
import DraftEditor from '@/components/DraftEditor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/documents/:did',
      name: 'DocDiscussion',
      component: DocDiscussion
    },
    {
      path: '/documents/:did/tasks/:tid',
      name: 'TaskDiscussion',
      component: TaskDiscussion
    },
    {
      path: '/documents/:did/edit',
      name: 'DraftEdit',
      component: DraftEditor
    },
    {
      path: '/documents/edit',
      name: 'DraftCreate',
      component: DraftEditor
    }
  ]
})
