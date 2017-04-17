import Vuex from 'vuex'
import Vue from 'vue'
import { Document } from '@/api'

Vue.use(Vuex)

const getters = {
  document: state => {
    let doc = Object.assign({}, state.document)
    if (doc.content) {
      doc.content = doc.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
    }
    return doc
  },
  getTaskById: state => id => {
    return state.document.tasks.find(task => {
      return task.id === id
    })
  },
  tasks: state => {
    return state.document.tasks
  },
  getUserNameById: state => id => {
    return state.document.users.find(user => {
      return user.id === id
    }).username
  },
  getTaskTitleById: state => id => {
    return state.document.tasks.find(task => {
      return task.id === id
    }).title
  },
  getTaskDueDateById: state => id => {
    return state.document.tasks.find(task => {
      return task.id === id
    }).dueDate
  },
  getUserAvatarById: state => id => {
    return state.document.users.find(user => {
      return user.id === id
    }).avatar
  },
  getReferenceById: state => id => {
    return state.document.discussions.find(discussion => {
      return discussion.id === id
    })
  },
  getCurrentUser: state => {
    return state.document.users.find(user => {
      return user.current
    })
  }
}

const store = new Vuex.Store({
  state: {
    document: {
      users: [],
      project: {
        name: undefined,
        uri: undefined
      },
      tasks: [],
      title: undefined,
      content: undefined
    }
  },
  actions: {
    getDocumentById ({commit}, id) {
      Document.getDocumentById(id).then(doc => {
        commit('setDocument', doc)
      })
    }
  },
  mutations: {
    setDocument (state, doc) {
      state.document = doc
    }
  },
  getters
})

export default store
