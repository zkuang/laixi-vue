/**
 * Created by zkuang on 2017/4/3.
 */

// import agent from 'superagent'

// let users = [
//   {
//     id: '39c2cbd982d447acb2ef7334924def51',
//     nickname: 'zxygentoo',
//     headimgurl: '/../static/zxy_avatar.png',
//     type: 'writer'
//   },
//   {
//     id: '39c2cbd982d447acb2ef7334924def50',
//     nickname: '走走',
//     headimgurl: '/../static/zz_avatar.jpg',
//     type: 'producer'
//   }
// ]
//
// let currentUser = users[0]
//
// let project = {
//   id: '38d622955372466ba04c1ee18141daf0',
//   name: '萨利机长',
//   created: '2015-08-26T08:30:32.313554',
//   description: '项目描述，可以很长。。。',
//   public: true
// }
//
// let draft = {
//   id: 'a49ebddc88a14283b5671adcb1dc6259',
//   project_id: '38d622955372466ba04c1ee18141daf0',
//   title: '人物设定： 萨利机长',
//   type: 'plaintext',
//   content: `告天起裡太館百為圖等進上上來！
//
// 新統大如收山性們在原術球活細天：地月放水發正己身後象別查草，定山所不年了童強名長也間響的他議朋庭的今知，計那異他告讀長如結面投外發現表作。
//
// 力本面你。高達理定機要怕區驗。眾許落很人道山，情意優多容水因些，量西不會另點熱力你建，照座後機了會才記案細林！
// 集力在中消了升影料……大市公謝我，廣人上成，象最存。
// 事趣小不，化選一聲，風快來以令市放氣斷樓議國院社人早更速已中險星源不選送美時高德王考他女優性，
// 高給能路後子研力不成息語導想出水生男如解問要陽人率股不小喜？`,
//   created: '2015-08-20T08:30:32.313554',
//   creator: users[0],
//   updated: '2015-08-21T08:30:32.313554',
//   updator: users[0],
//   removed: false
// }
//
// let tasks = [
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc6259',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     title: '增加家庭关系部分',
//     description: '任务详细描述……',
//     created: '2017-05-01T08:30:32.313554',
//     creator: users[1],
//     assignee: users[0],
//     deadline: '2017-05-05T08:30:32.313554',
//     checked: false,
//     checked_at: undefined
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc625a',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     title: '增加和二舅的关系',
//     description: '任务详细描述……',
//     created: '2017-05-01T08:30:32.313554',
//     creator: users[1],
//     assignee: users[0],
//     deadline: '2017-05-06T08:30:32.313554',
//     checked: false,
//     checked_at: undefined
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc625c',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     title: '增加和三姨的关系',
//     description: '任务详细描述……',
//     created: '2017-05-01T08:30:32.313554',
//     creator: users[1],
//     assignee: users[0],
//     deadline: '2017-05-07T08:30:32.313554',
//     checked: false,
//     checked_at: undefined
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc625d',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     title: '增加和狗关系部分',
//     description: '任务详细描述……',
//     created: '2017-05-01T08:30:32.313554',
//     creator: users[1],
//     assignee: users[0],
//     deadline: '2017-05-13T08:30:32.313554',
//     checked: true,
//     checked_at: undefined
//   }
// ]
//
// let posts = [
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc6258',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'draft-created',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[0]
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc6259',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'critique',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[0],
//     content: '这是一条评论。\n评论可以很多行。。。'
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc625a',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'critique',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[0],
//     content: '> 这是一条评论。\n> 评论可以很多行。。。\n> [@zxygentoo](http://localhost:8080)\n\n这是一条对评论的回复\n回复可以很多行，啦啦啦啦。。。。'
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc625b',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'draft-edited',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[0]
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc625c',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'task-created',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[1],
//     task: tasks[0]
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc625d',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'critique',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[0],
//     content: '这又是一条评论。'
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc625e',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'task-created',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[1],
//     task: tasks[1]
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc625f',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'task-created',
//     create: '2015-08-21T08:30:32.313554',
//     user: users[1],
//     task: tasks[2]
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc6260',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'task-created',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[1],
//     task: tasks[3]
//   }, {
//     id: 'a49ebddc88a14283b5671adcb1dc6261',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'critique',
//     create: '2015-08-21T08:30:32.313554',
//     user: users[0],
//     task: tasks[3],
//     content: '我操。。。和狗的关系怎么写。。。'
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc6262',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'critique',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[1],
//     task: tasks[3],
//     content: '> 我操。。。和狗的关系怎么写。。。\n> [@zxygentoo](http://localhost:8080) \n\n有什么难写的，照抄《忠狗八公》。'
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc6263',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'task-checked',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[0],
//     task: tasks[3]
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc6264',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'critique',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[1],
//     task: tasks[3],
//     content: '教你照抄你就一字不落的照抄啊。。。起码改改人名地名吧。'
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc6265',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'task-unchecked',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[1],
//     task: tasks[3]
//   },
//   {
//     id: 'a49ebddc88a14283b5671adcb1dc6266',
//     draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
//     type: 'task-checked',
//     created: '2015-08-21T08:30:32.313554',
//     user: users[0],
//     task: tasks[3]
//   }
// ]

export const currentUser = {
  headimgurl: 'http://via.placeholder.com/128x128?text=W1',
  id: 'b916e0d8871348f4bd4080ef11544315',
  nickname: 'WriterOne'
}

import { Base64 } from 'js-base64'
var Promise = this.Promise || require('promise')
var agent = require('superagent-promise')(require('superagent'), Promise)

const config = {
  type: 'http',
  host: 'localhost:5000',
  url: '/api/v1',
  key: 'js-dev-key'
}

const BASE_URL = `${config.type}://${config.host}${config.url}`

function makeAuthRequest(url, method, data) {
  let encode = Base64.encode(`${currentUser.id}:${config.key}`)
  let request = agent(method, url).set('Authorization', `Basic ${encode}`).accept('application/json')
  if (data) {
    return request.send(data).then(res => {
      return res.body
    }).catch(err => {
      console.log(err)
    })
  } else {
    return request.then(res => {
      return res.body
    }).catch(err => {
      console.log(err)
    })
  }
}

export const Users = {
  getMembersByProjectId(projectId) {
    const URL = `${BASE_URL}/projects/${projectId}/members/`
    return makeAuthRequest(URL, 'GET')
  }
}

export const Projects = {
  getById(id) {
    const URL = `${BASE_URL}/projects/${id}/`
    return makeAuthRequest(URL, 'GET')
  }
}

export const Drafts = {
  getById(id) {
    const URL = `${BASE_URL}/drafts/${id}/`
    return makeAuthRequest(URL, 'GET')
  },
  updateById(id, draft) {
    const URL = `${BASE_URL}/drafts/${id}/`
    return makeAuthRequest(URL, 'PUT', draft)
  },
  deleteById(id) {
    const URL = `${BASE_URL}/drafts/${id}/`
    return makeAuthRequest(URL, 'DELETE')
  }
}

export const Posts = {
  getPostsByDraftId(draftId) {
    const URL = `${BASE_URL}/drafts/${draftId}/posts/`
    return makeAuthRequest(URL, 'GET')
  },
  addPostsToDraft(post) {
    const URL = `${BASE_URL}/drafts/${post.draft_id}/posts/`
    return makeAuthRequest(URL, 'POST', post)
  },
  getPostsByTaskId(taskId) {
    const URL = `${BASE_URL}/tasks/${taskId}/posts/`
    return makeAuthRequest(URL, 'GET')
  },
  getById(id) {
    const URL = `${BASE_URL}/posts/${id}/`
    return makeAuthRequest(URL, 'GET')
  },
  updatePost(post) {
    const URL = `${BASE_URL}/posts/${post.id}/`
    return makeAuthRequest(URL, 'PUT', post)
  },
  deleteById(id) {
    const URL = `${BASE_URL}/posts/${id}/`
    return makeAuthRequest(URL, 'DELETE')
  }
}

export const Tasks = {
  getTasksByDraftId(draftId) {
    const URL = `${BASE_URL}/tasks/?draft_id=${draftId}`
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
    const URL = `${BASE_URL}/tasks/`
    return makeAuthRequest(URL, 'POST', data)
  },
  getById(id) {
    const URL = `${BASE_URL}/tasks/${id}/`
    return makeAuthRequest(URL, 'GET')
  },
  updateById(id, task) {
    let URL = `${BASE_URL}/tasks/${id}/`
    const data = {
      title: task.title,
      description: task.description,
      assignee_id: task.assignee.id,
      deadline: task.deadline
    }
    console.log(data)
    if (task.title) URL += ``
    return makeAuthRequest(URL, 'PUT', data)
  },
  deleteById(id) {
    const URL = `${BASE_URL}/tasks/${id}/`
    return makeAuthRequest(URL, 'DELETE')
  },
  checkById(id) {
    const URL = `${BASE_URL}/tasks/${id}/check/`
    return makeAuthRequest(URL, 'POST')
  },
  uncheckById(id) {
    const URL = `${BASE_URL}/tasks/${id}/uncheck/`
    return makeAuthRequest(URL, 'POST')
  }
}
