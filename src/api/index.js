/**
 * Created by zkuang on 2017/4/3.
 */

// import agent from 'superagent'

let users = [
  {
    id: '39c2cbd982d447acb2ef7334924def51',
    nickname: 'zxygentoo',
    headimgurl: '/../static/zxy_avatar.png',
    type: 'writer'
  },
  {
    id: '39c2cbd982d447acb2ef7334924def50',
    nickname: '走走',
    headimgurl: '/../static/zz_avatar.jpg',
    type: 'producer'
  }
]

let currentUser = users[0]

let project = {
  id: '38d622955372466ba04c1ee18141daf0',
  name: '萨利机长',
  created: '2015-08-26T08:30:32.313554',
  description: '项目描述，可以很长。。。',
  public: true
}

let draft = {
  id: 'a49ebddc88a14283b5671adcb1dc6259',
  project_id: '38d622955372466ba04c1ee18141daf0',
  title: '人物设定： 萨利机长',
  type: 'plaintext',
  content: `告天起裡太館百為圖等進上上來！
        
          新統大如收山性們在原術球活細天：地月放水發正己身後象別查草，定山所不年了童強名長也間響的他議朋庭的今知，計那異他告讀長如結面投外發現表作。
          
          力本面你。高達理定機要怕區驗。眾許落很人道山，情意優多容水因些，量西不會另點熱力你建，照座後機了會才記案細林！
          集力在中消了升影料……大市公謝我，廣人上成，象最存。
          事趣小不，化選一聲，風快來以令市放氣斷樓議國院社人早更速已中險星源不選送美時高德王考他女優性，
          高給能路後子研力不成息語導想出水生男如解問要陽人率股不小喜？`,
  created: '2015-08-20T08:30:32.313554',
  creator: users[0],
  updated: '2015-08-21T08:30:32.313554',
  updator: users[0],
  removed: false
}

let tasks = [
  {
    id: 'a49ebddc88a14283b5671adcb1dc6259',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    title: '增加家庭关系部分',
    description: '任务详细描述……',
    created: '2017-05-01T08:30:32.313554',
    creator: users[1],
    assignee: users[0],
    deadline: '2017-05-05T08:30:32.313554',
    checked: false,
    checked_at: undefined
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc625a',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    title: '增加和二舅的关系',
    description: '任务详细描述……',
    created: '2017-05-01T08:30:32.313554',
    creator: users[1],
    assignee: users[0],
    deadline: '2017-05-06T08:30:32.313554',
    checked: false,
    checked_at: undefined
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc625c',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    title: '增加和三姨的关系',
    description: '任务详细描述……',
    created: '2017-05-01T08:30:32.313554',
    creator: users[1],
    assignee: users[0],
    deadline: '2017-05-07T08:30:32.313554',
    checked: false,
    checked_at: undefined
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc625d',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    title: '增加和狗关系部分',
    description: '任务详细描述……',
    created: '2017-05-01T08:30:32.313554',
    creator: users[1],
    assignee: users[0],
    deadline: '2017-05-13T08:30:32.313554',
    checked: true,
    checked_at: undefined
  }
]

let posts = [
  {
    id: 'a49ebddc88a14283b5671adcb1dc6258',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'draft-created',
    created: '2015-08-21T08:30:32.313554',
    user: users[0]
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc6259',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'critique',
    created: '2015-08-21T08:30:32.313554',
    user: users[0],
    content: '这是一条评论。\n评论可以很多行。。。'
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc6259',
    draft_id: 'a49ebddc88a14283b5671adcb1dc625a',
    type: 'critique',
    created: '2015-08-21T08:30:32.313554',
    user: users[0],
    content: '> 这是一条评论。\n> 评论可以很多行。。。\n> [@zxygentoo](http://localhost:8080)\n\n这是一条对评论的回复\n回复可以很多行，啦啦啦啦。。。。'
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc625b',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'draft-edited',
    created: '2015-08-21T08:30:32.313554',
    user: users[0]
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc625c',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'task-created',
    created: '2015-08-21T08:30:32.313554',
    user: users[1],
    task: tasks[0]
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc625d',
    draft_id: 'a49ebddc88a14283b5671adcb1dc625a',
    type: 'critique',
    created: '2015-08-21T08:30:32.313554',
    user: users[0],
    content: '这又是一条评论。'
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc625e',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'task-created',
    created: '2015-08-21T08:30:32.313554',
    user: users[1],
    task: tasks[1]
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc625f',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'task-created',
    create: '2015-08-21T08:30:32.313554',
    user: users[1],
    task: tasks[2]
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc6260',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'task-created',
    created: '2015-08-21T08:30:32.313554',
    user: users[1],
    task: tasks[3]
  }, {
    id: 'a49ebddc88a14283b5671adcb1dc6261',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'critique',
    create: '2015-08-21T08:30:32.313554',
    user: users[0],
    task: tasks[3],
    content: '我操。。。和狗的关系怎么写。。。'
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc6262',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'critique',
    created: '2015-08-21T08:30:32.313554',
    user: users[1],
    task: tasks[3],
    content: '> 我操。。。和狗的关系怎么写。。。\n> [@zxygentoo](http://localhost:8080) \n\n有什么难写的，照抄《忠狗八公》。'
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc6263',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'task-checked',
    created: '2015-08-21T08:30:32.313554',
    user: users[0],
    task: tasks[3]
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc6264',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'critique',
    created: '2015-08-21T08:30:32.313554',
    user: users[1],
    task: tasks[3],
    content: '教你照抄你就一字不落的照抄啊。。。起码改改人名地名吧。'
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc6265',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'task-unchecked',
    created: '2015-08-21T08:30:32.313554',
    user: users[1],
    task: tasks[3]
  },
  {
    id: 'a49ebddc88a14283b5671adcb1dc6266',
    draft_id: 'a49ebddc88a14283b5671adcb1dc6259',
    type: 'task-checked',
    created: '2015-08-21T08:30:32.313554',
    user: users[0],
    task: tasks[3]
  }
]

export const Users = {
  getMembersByProjectId (projectId) {
    return new Promise(resolve => {
      resolve({members: users})
    })
  }
}

export const Projects = {
  getById (id) {
    return new Promise(resolve => {
      resolve({project: project})
    })
  }
}

export const Drafts = {
  getById (id) {
    return new Promise((resolve, reject) => {
      if (draft.id === id) {
        resolve({drafts: draft})
      } else {
        reject('no such draft')
      }
    })
  },
  updateById (id, draft) {
    return new Promise(resolve => {
      resolve({drafts: draft})
    })
  },
  deleteById (id) {
    return new Promise(resolve => {
      resolve()
    })
  }
}

export const Posts = {
  getPostsByDraftId (draftId) {
    return new Promise(resolve => {
      let p = posts.filter(post => {
        return post.draft_id === draftId
      })
      resolve({
        posts: p,
        pagination: {
          has_next: false,
          has_prev: false,
          total: p.length
        }
      })
    })
  },
  addPostsToDraft (post) {
    return new Promise(resolve => {
      post.id = `aaaaaa689bca4e40b96aea1b23ae19${Math.random() * 100}`
      resolve({post: post})
    })
  },
  getPostsByTaskId (taskId) {
    return new Promise(resolve => {
      resolve({
        posts: posts.filter(post => {
          return post.task && post.task.id === taskId
        })
      })
    })
  },
  getById (id) {
    return new Promise(resolve => {
      resolve(posts.find(post => {
        return post.id === id
      }))
    })
  },
  updateById (id, content) {
    return new Promise(resolve => {
      let post = posts.find(post => {
        return post.id === id
      })
      post.content = content
      resolve({post: post})
    })
  },
  deleteById (id) {
    return new Promise(resolve => {
      posts = posts.filter(post => {
        return post.id !== id
      })
      resolve()
    })
  }
}

export const Tasks = {
  getTasksByDraftId (draftId) {
    return new Promise(resolve => {
      resolve({
        tasks: tasks.filter(task => {
          return task.draft_id === draftId
        })
      })
    })
  },
  addTaskToDraft (draftId, {title, assignee, deadline, description}) {
    return new Promise(resolve => {
      let task = {
        id: `33650a689bca4e40b96aea1b23ae19${Math.random() * 100}`,
        draft_id: draftId,
        title: title,
        created: '2015-08-21T08:30:32.313554',
        creator: currentUser,
        assignee,
        description,
        deadline,
        checked: false,
        checked_at: undefined
      }
      resolve({task: task})
    })
  },
  getById (id) {
    return new Promise(resolve => {
      resolve({task: tasks.find(task => {
        return task.id === id
      })})
    })
  },
  updateById (id, task) {
    return new Promise(resolve => {
      let t = tasks.find(task => {
        return task.id === id
      })
      resolve({task: Object.assign(t, task)})
    })
  },
  deleteById (id) {
    return new Promise(resolve => {
      tasks = tasks.filter(task => {
        return task.id !== id
      })
      resolve()
    })
  },
  checkById (id) {
    return new Promise(resolve => {
      let task = tasks.find(task => {
        return task.id === id
      })
      task.checked = true
      task.checked_at = (new Date()).toISOString()
      resolve()
    })
  },
  uncheckById (id) {
    return new Promise(resolve => {
      let task = tasks.find(task => {
        return task.id === id
      })
      task.checked = false
      task.checked_at = undefined
      resolve()
    })
  }
}
