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
  hasNextPage: state => state.hasNextPage
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
    hasNextPage: false
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
          return Tasks.checkById(task.id).then((res) => {
            commit('setOneTask', res.task)
            return res.task
          })
        } else {
          return Tasks.uncheckById(task.id).then((res) => {
            commit('setOneTask', res.task)
            return res.task
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
    getDraftPosts({ commit, state }, {draftId, pageNumber}) {
      return Posts.getPostsByDraftId(draftId, 250, pageNumber).then(res => {
        for (let post of res.posts) {
          if (post.task === null) continue
          for (let task of state.tasks) {
            if (task.id === post.task.id) post.task = task
          }
        }
        commit('setHasNextPage', res.pagination.has_next)
        commit('setTotalPosts', res.pagination.total)
        if (pageNumber === 1) commit('setPosts', [])
        commit('setPosts', state.posts.reverse().concat(res.posts))
        return res.posts
      }).catch(() => {
        commit('setShowPostNumber', state.showPostNumber - 250)
      })
    },
    getTaskPosts({ commit, state }, {taskId, pageNumber}) {
      Posts.getPostsByTaskId(taskId, 250, pageNumber).then(res => {
        console.log(state.tasks, res.posts)
        for (let post of res.posts) {
          if (post.task === null) continue
          for (let task of state.tasks) {
            if (task.id === post.task.id) post.task = task
          }
        }
        commit('setHasNextPage', res.pagination.has_next)
        commit('setTotalPosts', res.pagination.total)
        commit('setPosts', state.posts.reverse().concat(res.posts))
        return res.posts
      }).catch(() => {
        commit('setShowPostNumber', state.showPostNumber - 250)
      })
    },
    addPostToDraft({ commit, state }, { post, origin }) {
      Posts.addPostsToDraft(post).then(res => {
        if (!origin) {
          let length = state.posts.length
          commit('addPost', res.post)
          commit('setTotalPosts', (state.totalPosts + 1))
          let pageNumber = Math.ceil(length / 250)
          let extraNumber = state.posts.length - (pageNumber * 250)
          if (extraNumber > 0) {
            commit('removeSomePosts', {begin: 0, removeNumber: extraNumber})
            commit('setHasNextPage', true)
          }
        } else {
          commit('updatePost', { origin: origin, updated: res.post })
        }
        return res.post
      })
    },
    getLatestDraftPost({ commit, state }, draftId) {
      let getCount = 1
      Posts.getPostsByDraftId(draftId, getCount, 1).then(res => {
        commit('setTotalPosts', res.pagination.total)
        if (res.posts[0].task !== null) {
          for (let task of state.tasks) {
            if (task.id === res.posts[0].task.id) {
              res.posts[0].task = task
              break
            }
          }
        }
        let length = state.posts.length
        commit('addNewPost', res.posts[0])
        let pageNumber = Math.ceil(length / 250)
        let extraNumber = state.posts.length - (pageNumber * 250)
        if (extraNumber > 0) {
          commit('removeSomePosts', {begin: 0, removeNumber: extraNumber})
          commit('setHasNextPage', true)
        }
      })
    },
    getLatestTaskPost({ commit, state }, taskId) {
      Posts.getPostsByTaskId(taskId, 1, 1).then(res => {
        commit('setTotalPosts', res.pagination.total)
        if (res.posts[0].task !== null) {
          for (let task of state.tasks) {
            if (task.id === res.posts[0].task.id) {
              res.posts[0].task = task
              break
            }
          }
        }
        let length = state.posts.length
        commit('addNewPost', res.posts[0])
        let pageNumber = Math.ceil(length / 250)
        let extraNumber = state.posts.length - (pageNumber * 250)
        if (extraNumber > 0) {
          commit('removeSomePosts', {begin: 0, removeNumber: extraNumber})
          commit('setHasNextPage', true)
        }
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
      let thatTask = state.tasks[index]
      if (thatTask.title !== task.title) thatTask.title = thatTask.title = task.title
      if (thatTask.deadline !== task.deadline) thatTask.deadline = task.deadline
      // if (thatTask.assignee !== task.assignee || thatTask.assignee.id !== task.assignee.id) thatTask.assignee = task.assignee
      if (task.assignee) {
        if (!(thatTask.assignee && thatTask.assignee.id === task.assignee.id)) {
          thatTask.assignee = task.assignee
        }
      } else if (!task.assignee && thatTask.assignee) {
        thatTask.assignee = task.assignee
      }
      if (thatTask.description !== task.description) thatTask.description = task.description
      if (thatTask.checked !== task.checked) thatTask.checked = task.checked
      if (thatTask.checked_at !== task.checked_at) thatTask.checked_at = task.checked_at
      // state.tasks.splice(index, 1, task)
    },
    removeOneTask(state, task) {
      const index = state.tasks.findIndex(t => {
        return task.id === t.id
      })
      if (index !== -1) state.tasks.splice(index, 1)
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
    removeSomePosts(state, {begin, removeNumber}) {
      state.posts.splice(begin, removeNumber)
    },
    setTask(state, task) {
      state.task = task
    },
    setUsers(state, users) {
      state.users = users
    },
    setTotalPosts(state, number) {
      state.totalPosts = number
    },
    setHasNextPage(state, hasNext) {
      state.hasNextPage = hasNext
    },
    addNewPost(state, post) {
      state.posts.push(post)
    }
  },
  getters
})

store.commit('createTask', { id: 'undefined', deadline: undefined, assignee: undefined })
export default store
