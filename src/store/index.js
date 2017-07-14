import Vuex from 'vuex'
import Vue from 'vue'
import { Drafts, Projects, Tasks, Posts, Users } from '@/api'

Vue.use(Vuex)

const getters = {
  authString: state => state.authString,
  draft: state => {
    let draft = Object.assign({}, state.draft)
    if (draft.content) {
      draft.rawContent = draft.content
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
  getCurrentUser: state => state.currentUser,
  totalPosts: state => state.totalPosts,
  showPostNumber: state => state.showPostNumber
}

const store = new Vuex.Store({
  state: {
    users: [],
    project: {},
    draft: {},
    tasks: [],
    posts: [],
    task: { assignee: {} },
    currentUser: undefined,
    authstring: undefined,
    totalPosts: 0,
    showPostNumber: 0
  },
  actions: {
    createDraft({ commit }, draft) {
      return Drafts.create(draft).then(res => {
        return res.draft
      })
    },
    getDraftById({ commit }, draftId) {
      return Drafts.getById(draftId).then(res => {
        commit('setDraft', res.draft)
        return res.draft
      })
    },
    updateDraft({ commit }, draft) {
      Drafts.updateById(draft.id, draft).then(res => {
        commit('setDraft', res.draft)
        return res.draft
      })
    },
    getProjectById({ commit }, projectId) {
      return Projects.getById(projectId).then(res => {
        commit('setProject', res.project)
        return res.project
      })
    },
    getProjectMembers({ commit }, projectId) {
      return Users.getMembersByProjectId(projectId).then(res => {
        commit('setUsers', res.members)
        return res.members
      })
    },
    getTaskById({ commit }, taskId) {
      return Tasks.getById(taskId).then(res => {
        commit('setTask', res.task)
        return res.task
      })
    },
    getDraftTasks({ commit }, draftId) {
      return Tasks.getTasksByDraftId(draftId).then(res => {
        commit('setTasks', res.tasks)
        return res.tasks
      })
    },
    updateTask({ dispatch, commit, getters }, task) {
      let oTask = getters.tasks.find(t => {
        return task.id === t.id
      })
      if (!oTask && getters.task.id === task.id) {
        oTask = getters.task
      }
      if (oTask.checked !== task.checked) {
        if (task.checked) {
          return Tasks.checkById(task.id).then(() => {
            commit('setOneTask', task)
            return task
          })
        } else {
          return Tasks.uncheckById(task.id).then(() => {
            commit('setOneTask', task)
            return task
          })
        }
      } else {
        return Tasks.updateById(task.id, task).then(res => {
          commit('setTask', res.task)
          commit('setOneTask', res.task)
          return res.task
        })
      }
    },
    createTask({ dispatch, commit, getters, state }, { draftId, task }) {
      return Tasks.addTaskToDraft(draftId, task).then(res => {
        if (res.task.assignee) {
          const assignee = state.users.find(user => {
            return res.task.assignee.id === user.id
          })
          res.task.assignee = assignee
        }
        commit('createTask', res.task)
        return res.task
      })
    },
    delTask({ dispatch, commit, state }, task) {
      return Tasks.deleteById(task.id)
        .then(() => {
          // let posts = state.posts.filter(post => {
          //   return post.task && post.task.id === task.id
          // })
          return commit('removeOneTask', task)
          // let promises = []
          // posts.forEach(p => {
          //   commit('removePost', p)
          //   promises.push(dispatch('delPost', p))
          // })
          // return Promise.all(promises)
        })
    },
    delPost({ commit }, post) {
      return Posts.deleteById(post.id).then(() => {
        commit('removePost', post)
        return post
      })
    },
    updatePost({ commit }, post) {
      return Posts.updatePost(post).then(res => {
        commit('updatePost', { updated: res.post })
        return res.post
      })
    },
    getDraftPosts({ commit, state }, draftId) {
      let getCount = state.showPostNumber + 250
      return Posts.getPostsByDraftId(draftId, getCount).then(res => {
        commit('setShowPostNumber', getCount)
        commit('setTotalPosts', res.pagination.total)
        commit('setPosts', res.posts)
        return res.posts
      })
    },
    getTaskPosts({ commit, state }, taskId) {
      let getCount = state.showPostNumber + 250
      Posts.getPostsByTaskId(taskId, getCount).then(res => {
        commit('setShowPostNumber', getCount)
        commit('setTotalPosts', res.pagination.total)
        commit('setPosts', res.posts)
        return res.posts
      })
    },
    addPostToDraft({ commit }, { post, origin }) {
      Posts.addPostsToDraft(post).then(res => {
        if (!origin) {
          commit('addPost', res.post)
        } else {
          commit('updatePost', { origin: origin, updated: res.post })
        }
        return res.post
      })
    }
  },
  mutations: {
    setAuthString(state, authString) {
      state.authString = authString
    },
    setDraft(state, draft) {
      state.draft = draft
    },
    setProject(state, project) {
      state.project = project
    },
    setTasks(state, tasks) {
      tasks.reverse()
      state.tasks.splice(1, state.tasks.length - 1, ...tasks)
    },
    setCurrentUser(state, user) {
      state.currentUser = user
    },
    createTask(state, task) {
      state.tasks.push(task)
    },
    setOneTask(state, task) {
      const index = state.tasks.findIndex(t => {
        return task.id === t.id
      })
      if (index === -1) return
      state.tasks.splice(index, 1, task)
    },
    removeOneTask(state, task) {
      const index = state.tasks.findIndex(t => {
        return task.id === t.id
      })
      if (index === -1) return
      state.tasks.splice(index, 1)
    },
    setPosts(state, posts) {
      posts.reverse()
      state.posts = posts
    },
    addPost(state, post) {
      state.posts.push(post)
    },
    removePost(state, post) {
      const i = state.posts.findIndex(p => {
        return post.id === p.id
      })
      if (i !== -1) {
        state.posts.splice(i, 1)
      }
    },
    updatePost(state, { updated, origin }) {
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
    setTask(state, task) {
      state.task = task
    },
    setUsers(state, users) {
      state.users = users
    },
    initShowPostNumber(state) {
      state.showPostNumber = 250
    },
    setShowPostNumber(state, number) {
      state.showPostNumber = number
    },
    setTotalPosts(state, number) {
      state.totalPosts = number
    }
  },
  getters
})

store.commit('createTask', { id: 'undefined', deadline: undefined, assignee: undefined })
export default store
