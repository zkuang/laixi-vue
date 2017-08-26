/**
 * Created by zkuang on 2017/4/3.
 */

var Promise = this.Promise || require('promise')
var agent = require('superagent-promise')(require('superagent'), Promise)
import EventBus from '../EventBus'

const BASE_URL = $('#api-auth-info>input[name="api"]').val()
const AUTH_STR = $('#api-auth-info>input[name="authstring"]').val()

function makeAuthRequest(url, method, data) {
  let request = agent(method, url).set('Authorization', AUTH_STR).accept('application/json')
  if (data) {
    request = request.send(data)
  }
  return request.then(res => {
    return res.body
  }, err => {
    EventBus.$emit('api:error', err.response)
  })
}

export const Users = {
  getMembersByProjectId(projectId) {
    const URL = `${BASE_URL}projects/${projectId}/members/`
    return makeAuthRequest(URL, 'GET')
  }
}

export const Projects = {
  getById(id) {
    const URL = `${BASE_URL}projects/${id}/`
    return makeAuthRequest(URL, 'GET')
  }
}

export const Drafts = {
  create(draft) {
    const URL = `${BASE_URL}drafts/`
    return makeAuthRequest(URL, 'POST', draft)
  },
  getById(id) {
    const URL = `${BASE_URL}drafts/${id}/`
    return makeAuthRequest(URL, 'GET')
  },
  updateById(id, draft) {
    const URL = `${BASE_URL}drafts/${id}/`
    return makeAuthRequest(URL, 'PUT', draft)
  },
  undeleteById(id) {
    const URL = `${BASE_URL}drafts/${id}/`
    return makeAuthRequest(URL, 'PUT', { removed: 'false' })
  },
  deleteById(id) {
    const URL = `${BASE_URL}drafts/${id}/`
    return makeAuthRequest(URL, 'DELETE')
  }
}

export const Posts = {
  getPostsByDraftId(draftId, getCount, page) {
    const URL = `${BASE_URL}drafts/${draftId}/posts/?per_page=${getCount}&page=${page}`
    return makeAuthRequest(URL, 'GET')
  },
  addPostsToDraft(post) {
    const URL = `${BASE_URL}drafts/${post.draft_id}/posts/`
    return makeAuthRequest(URL, 'POST', post)
  },
  getPostsByTaskId(taskId, getCount, page) {
    const URL = `${BASE_URL}tasks/${taskId}/posts/?per_page=${getCount}&page=${page}`
    return makeAuthRequest(URL, 'GET')
  },
  getById(id) {
    const URL = `${BASE_URL}posts/${id}/`
    return makeAuthRequest(URL, 'GET')
  },
  updatePost(post) {
    const URL = `${BASE_URL}posts/${post.id}/`
    return makeAuthRequest(URL, 'PUT', post)
  },
  deleteById(id) {
    const URL = `${BASE_URL}posts/${id}/`
    return makeAuthRequest(URL, 'DELETE')
  }
}

export const Tasks = {
  getTasksByDraftId(draftId) {
    const URL = `${BASE_URL}tasks/?draft_id=${draftId}`
    return makeAuthRequest(URL, 'GET')
  },
  addTaskToDraft(draftId, task) {
    let data = {
      draft_id: draftId,
      title: task.title
    }
    if (task.assignee) {
      data.assignee_id = task.assignee.id
    }
    if (task.deadline) {
      data.deadline = task.deadline
    }
    const URL = `${BASE_URL}tasks/`
    return makeAuthRequest(URL, 'POST', data)
  },
  getById(id) {
    const URL = `${BASE_URL}tasks/${id}/`
    return makeAuthRequest(URL, 'GET')
  },
  updateById(id, task) {
    let URL = `${BASE_URL}tasks/${id}/`
    const data = {
      title: task.title,
      description: task.description
    }
    if (task.assignee) data.assignee_id = task.assignee.id
    if (task.deadline) data.deadline = task.deadline
    return makeAuthRequest(URL, 'PUT', data)
  },
  deleteById(id) {
    const URL = `${BASE_URL}tasks/${id}/`
    return makeAuthRequest(URL, 'DELETE')
  },
  checkById(id) {
    const URL = `${BASE_URL}tasks/${id}/check/`
    return makeAuthRequest(URL, 'POST')
  },
  uncheckById(id) {
    const URL = `${BASE_URL}tasks/${id}/uncheck/`
    return makeAuthRequest(URL, 'POST')
  }
}
