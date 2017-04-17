import Vue from 'vue'
import Router from 'vue-router'
import DocDiscussion from '@/components/DocDiscussion'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/documents/:id',
      name: 'DocDiscussion',
      component: DocDiscussion
    }
  ]
})
