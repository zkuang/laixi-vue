import Vuex from 'vuex'
import Vue from 'vue'
import { Drafts, Projects, Tasks, Posts, Users } from '@/api'

Vue.use(Vuex)

const getters = {
  draft: state => {
    let draft = Object.assign({}, state.draft)
    if (draft.content) {
      draft.content = draft.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
    }
    return draft
  },
  project: state => state.project,
  tasks: state => state.tasks,
  task: state => { console.log(state.task); return state.task },
  getTaskById: state => id => {
    return state.tasks.find(task => {
      return task.id === id
    })
  },
  posts: state => state.posts,
  users: state => state.users,
  getCurrentUser: state => state.currentUser
}

const store = new Vuex.Store({
  state: {
    users: [],
    project: {},
    draft: {},
    tasks: [],
    posts: [],
    task: { assignee: {} },
    currentUser: undefined
  },
  actions: {
    getDraftById ({commit}, draftId) {
      Drafts.getById(draftId).then(res => {
        commit('setDraft', res.drafts)
      })
    },
    getProjectById ({commit}, projectId) {
      Projects.getById(projectId).then(res => {
        commit('setProject', res.project)
      })
    },
    getProjectMembers ({commit}, projectId) {
      Users.getMembersByProjectId(projectId).then(res => {
        commit('setUsers', res.members)
      })
    },
    getTaskById ({commit}, taskId) {
      Tasks.getById(taskId).then(res => {
        commit('setTask', res.task)
      })
    },
    getDraftTasks ({commit}, draftId) {
      Tasks.getTasksByDraftId(draftId).then(res => {
        commit('setTasks', res.tasks)
      })
    },
    getDraftPosts ({commit}, draftId) {
      Posts.getPostsByDraftId(draftId).then(res => {
        commit('setPosts', res.posts)
      })
    },
    getTaskPosts ({commit}, taskId) {
      Posts.getPostsByTaskId(taskId).then(res => {
        commit('setPosts', res.posts)
      })
    },
    addPostToDraft ({commit}, {draftId, content, taskId}) {
      Posts.addPostsToDraft(draftId, content, taskId).then(res => {
        commit('addPosts', res.post)
      })
    }
  },
  mutations: {
    setDraft (state, draft) {
      state.draft = draft
    },
    setProject (state, project) {
      state.project = project
    },
    setTasks (state, tasks) {
      state.tasks = tasks
    },
    setPosts (state, posts) {
      state.posts = posts
    },
    addPosts (state, post) {
      state.posts.push(post)
    },
    setCurrentUser (state, user) {
      state.currentUser = user
    },
    setTask (state, task) {
      state.task = task
    },
    setUsers (state, users) {
      state.users = users
    }
  },
  getters
})

export default store
