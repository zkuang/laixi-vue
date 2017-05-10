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
  task: state => state.task,
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
    updateDraft ({commit}, draft) {
      Drafts.updateById(draft.id, draft).then(res => {
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
    updateTask ({dispatch, commit, getters}, task) {
      const oTask = getters.tasks.find(t => {
        return task.id === t.id
      })
      let type = 'task-edited'
      if (oTask.checked !== task.checked) {
        if (task.checked) {
          type = 'task-checked'
        } else {
          type = 'task-unchecked'
        }
      }
      Tasks.updateById(task.id, task).then(res => {
        commit('setTask', res.task)
        commit('setOneTask', res.task)
        let eventlog = {
          draft_id: res.task.draft_id,
          type,
          create: new Date().toISOString(),
          user: getters.getCurrentUser,
          task_id: res.task.id
        }
        commit('addPost', eventlog)
        return dispatch('addPostToDraft', {post: eventlog, origin: eventlog})
      })
    },
    createTask ({dispatch, commit, getters}, {draftId, task}) {
      Tasks.addTaskToDraft(draftId, task).then(res => {
        commit('createTask', res.task)
        let eventlog = {
          draft_id: res.task.draft_id,
          type: 'task-created',
          create: new Date().toISOString(),
          user: getters.getCurrentUser,
          task_id: res.task.id
        }
        commit('addPost', eventlog)
        return dispatch('addPostToDraft', {post: eventlog, origin: eventlog})
      })
    },
    delTask ({commit, state}, task) {
      Tasks.deleteById(task.id).then(() => {
        let posts = state.posts.filter(post => {
          return post.task && post.task.id === task.id
        })
        commit('removeOneTask', task)
        posts.forEach(p => {
          commit('removePost', p)
        })
      })
    },
    delPost ({commit}, post) {
      Posts.deleteById(post.id).then(() => {
        commit('removePost', post)
      })
    },
    updatePost ({commit}, post) {
      Posts.updatePost(post).then(res => {
        commit('updatePost', {updated: res.post})
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
    addPostToDraft ({commit}, {post, origin}) {
      Posts.addPostsToDraft(post).then(res => {
        if (!origin) {
          commit('addPost', res.post)
        } else {
          commit('updatePost', {origin: origin, updated: res.post})
        }
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
      state.tasks.splice(1, undefined, ...tasks)
    },
    createTask (state, task) {
      state.tasks.push(task)
    },
    setOneTask (state, task) {
      const index = state.tasks.findIndex(t => {
        return task.id === t.id
      })
      if (index === -1) return
      state.tasks.splice(index, 1, task)
    },
    removeOneTask (state, task) {
      const index = state.tasks.findIndex(t => {
        return task.id === t.id
      })
      if (index === -1) return
      state.tasks.splice(index, 1)
    },
    setPosts (state, posts) {
      state.posts = posts
    },
    addPost (state, post) {
      state.posts.push(post)
    },
    removePost (state, post) {
      const i = state.posts.findIndex(p => {
        return post.id === p.id
      })
      state.posts.splice(i, 1)
    },
    updatePost (state, {updated, origin}) {
      let i
      if (origin) {
        i = state.posts.findIndex(post => {
          return post === origin
        })
      } else {
        i = state.posts.findIndex(post => {
          return post.id === updated.id
        })
      }
      state.posts.splice(i, 1, updated)
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

store.commit('createTask', {id: 'undefined', deadline: undefined, assignee: undefined})
export default store
