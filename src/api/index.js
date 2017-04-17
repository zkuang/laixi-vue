/**
 * Created by zkuang on 2017/4/3.
 */

// import agent from 'superagent'

import { DISCUSSION_ADD_DOC, DISCUSSION_UPD_DOC, DISCUSSION_ADD_TASK, DISCUSSION_DONE_TASK, DISCUSSION_ROP_TASK, DISCUSSION_COMMENT } from '../common'

export const Document = {
  getDocumentById (id) {
    return new Promise((resolve) => {
      resolve({
        users: [
          {id: 1, username: 'zxygentoo', avatar: '../../static/zxy_avatar.png', current: true},
          {id: 2, username: '走走', avatar: '../../static/zz_avatar.jpg'}
        ],
        project: {
          name: '萨利机长',
          uri: 'http://localhost:8080/project/someid'
        },
        tasks: [
          {id: 1, title: '增加家庭关系部分。', author: 'zxygentoo', createdDate: '4月2日', done: false, dueDate: '4月21日'},
          {id: 2, title: '增加和二舅的关系。', author: 'zxygentoo', createdDate: '4月2日', done: false, dueDate: '4月21日'},
          {id: 3, title: '增加和三姨的关系。', author: 'zxygentoo', createdDate: '4月2日', done: false, dueDate: '4月21日'},
          {id: 4, title: '增加和狗的关系。', author: 'zxygentoo', createdDate: '4月2日', done: false, dueDate: '4月21日'}
        ],
        discussions: [
          {id: 1, type: DISCUSSION_ADD_DOC, author: 1, createdDate: '2016-04-02  18:01'},
          {id: 2, type: DISCUSSION_COMMENT, author: 1, createdDate: '2016-04-02  18:01', content: '这是一条评论。\n评论可以很多行。。。'},
          {id: 3, type: DISCUSSION_UPD_DOC, author: 1, createdDate: '2016-04-02  18:01'},
          {id: 4, type: DISCUSSION_COMMENT, author: 1, createdDate: '2016-04-02  18:01', content: '这是一条对评论的回复\n回复可以很多行，啦啦啦啦。。。。', ref: 2},
          {id: 5, type: DISCUSSION_ADD_TASK, author: 2, createdDate: '2016-04-02  18:01', assignee: 1, ref: 1},
          {id: 6, type: DISCUSSION_COMMENT, author: 1, createdDate: '2016-04-02  18:01', content: '这又是一条评论。'},
          {id: 7, type: DISCUSSION_ADD_TASK, author: 2, createdDate: '2016-04-02  18:01', assignee: 1, content: '增加和二舅的关系', ref: 2},
          {id: 8, type: DISCUSSION_ADD_TASK, author: 2, createdDate: '2016-04-02  18:01', assignee: 1, content: '增加和三姨的关系', ref: 3},
          {id: 9, type: DISCUSSION_ADD_TASK, author: 2, createdDate: '2016-04-02  18:01', assignee: 1, content: '增加和狗的关系', ref: 4},
          {id: 10, type: DISCUSSION_COMMENT, author: 1, createdDate: '2016-04-02  18:01', content: '我操。。。和狗的关系怎么写。。。', ref: 9},
          {id: 11, type: DISCUSSION_COMMENT, author: 2, createdDate: '2016-04-02  18:01', content: '有什么难写的，照抄《忠狗八公》。', ref: 10},
          {id: 12, type: DISCUSSION_DONE_TASK, author: 1, createdDate: '2016-04-02  18:01', ref: 4, content: '增加和狗的关系'},
          {id: 13, type: DISCUSSION_COMMENT, author: 2, createdDate: '2016-04-02  18:01', content: '教你照抄你就一字不落的照抄啊。。。起码改改人名地名吧。', ref: 12},
          {id: 14, type: DISCUSSION_ROP_TASK, author: 2, createdDate: '2016-04-02  18:01', ref: 4},
          {id: 15, type: DISCUSSION_DONE_TASK, author: 1, createdDate: '2016-04-02  18:01', ref: 4}
        ],
        title: '人物设定： 萨利机长',
        content: `告天起裡太館百為圖等進上上來！
        
          新統大如收山性們在原術球活細天：地月放水發正己身後象別查草，定山所不年了童強名長也間響的他議朋庭的今知，計那異他告讀長如結面投外發現表作。
          
          力本面你。高達理定機要怕區驗。眾許落很人道山，情意優多容水因些，量西不會另點熱力你建，照座後機了會才記案細林！
          集力在中消了升影料……大市公謝我，廣人上成，象最存。
          事趣小不，化選一聲，風快來以令市放氣斷樓議國院社人早更速已中險星源不選送美時高德王考他女優性，
          高給能路後子研力不成息語導想出水生男如解問要陽人率股不小喜？`
      })
    })
  }
}
