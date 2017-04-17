<template>
  <li class="discussion-item" :class="style" @mouseover="active" @mouseleave="deactive">
    <div v-if="isTaskLog" class="task-log">
      <span class="discussion-item-avatar">
        <i class="grey check circle icon"></i>
      </span>
      <span class="time-span">{{createdDate}}</span>
      <span class="username">{{authorName}}</span>
      <span v-if="isTaskCreateLog">为</span>
      <span v-if="isTaskCreateLog" class="username">{{assignee}}</span>
      <span>{{content}}</span>
      <a class="task-link">{{taskTitle}}</a>
      <span class="due-date">{{taskDueDate}}</span>
    </div>
    <div v-else-if="isDocLog" class="doc-log">
      <span class="discussion-item-avatar">
        <i v-if="isDocCreateLog" class="grey add circle icon"></i>
        <i v-else class="grey write square icon"></i>
      </span>
      <span class="time-span">{{createdDate}}</span>
      <span class="username">{{authorName}}</span>
      <span>{{content}}</span>
    </div>
    <div v-else class="comment">
      <div class="discussion-item-avatar">
        <img :src="avatar" class="ui avatar image"/>
      </div>
      <div class="discussion-item-content">
        <p><span class="username">{{authorName}}</span> <span class="time-span">{{createdDate}}</span></p>
        <blockquote v-if="item.ref" class="quote">
          <p v-if="quote.content" v-html="quote.content"></p>
          <a>@{{quote.authorName}}</a>
        </blockquote>
        <p v-html="content" class="content"></p>
      </div>
    </div>
    <div class="right floated ui icon buttons">
      <button class="ui button">
        <i class="reply icon"></i>
      </button>
      <button :class="{hidden: notCreatedByMe}" class="ui button has-popup" >
        <i class="content icon"></i>
      </button>
    </div>

  </li>
</template>

<style>
  .discussion-item {
    font-size: 1.5em;
    color: gray;
  }

  .discussion-item > div:first-child {
    display: inline-block;
    width: 90%;
  }

  .discussion-item > .ui.buttons {
    display: none;
  }

  .discussion-item.active > .ui.buttons {
    display: inline-flex;
  }

  .discussion-item .ui.icon.buttons .button {
    background: transparent;
    padding: .5em;
    color: lightgrey;
  }

  .discussion-item .ui.icon.buttons .button > i.icon {
    font-size: 1.2em;
  }

  .discussion-item .task-log {
    color: black;
  }

  .discussion-item > div > span {
    font-size: .8em;
  }

  .discussion-item > div.task-log .time-span,  .discussion-item > div.doc-log .time-span {
    color: gray;
    font-size: 1.2rem;
    margin-left: 5rem;
  }

  .discussion-item > div.task-log .username {
    font-weight: bold;
  }

  .discussion-item > div.comment .username {
    font-size: 1.1em;
  }

  .discussion-item > div .task-link {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .discussion-item span {
    white-space: pre;
  }

  .discussion-item > div > span.discussion-item-avatar {
    font-size: 1.08em;
  }

  .discussion-item > div > span.discussion-item-avatar > i {
    margin: 0 .5rem 0 2rem;
  }

  .discussion-item .discussion-item-avatar .ui.avatar.image {
    width: 3.5rem;
    height: 3.5rem;
    margin-left: .8rem;
  }

  .discussion-item .discussion-item-avatar {
    display: inline-block;
    position: absolute;
  }

  .discussion-item .discussion-item-content {
    display: inline-block;
    margin-left: 5.5rem;
  }

  .discussion-item .comment {
    font-size: medium;
    position: relative;
  }

  .discussion-item .due-date {
    background: #e2e2e2;
    font-size: 1rem;
    padding: .4rem 1.2rem .2rem 1.2rem;
    border-radius: 1em;
    color: #3D3E3F;
  }

  .discussion-item-content .username {
    color: black;
  }

  .discussion-item-content .content {
    color: black;
  }

  .discussion-item-content blockquote {
    display: block;
    margin-left: 0;
    padding-left: 1rem;
    border-style: solid;
    border-color: #ccc;
    border-width: 0;
    border-left-width: .4rem;
  }

  .discussion-item-content blockquote p {
    margin-bottom: 0;
  }

  .right.floated.ui.icon.buttons .button{
    margin-top: .5em;
  }

  .ui.button.in-popup {
    background: transparent;
    display: block;
    padding: .5em 0 .5em .5em;
  }

  .ui.button.hidden {
    visibility: hidden;
  }

  .ui.button.in-popup:hover {
    background: transparent;
    color: red;
  }

  .ui.button.in-popup i.icon {
    font-size: 1.2em;
  }
</style>

<script>
  import { DISCUSSION_ADD_DOC, DISCUSSION_UPD_DOC, DISCUSSION_ADD_TASK, DISCUSSION_ROP_TASK, DISCUSSION_DONE_TASK } from '../common'
  export default {
    name: 'DiscussionItem',
    props: ['item'],
    methods: {
      active () {
        $(this.$el).addClass('active')
      },
      deactive () {
        $(this.$el).removeClass('active')
      }
    },
    mounted () {
      $('.has-popup').popup({
        position: 'bottom center',
        hoverable: true,
        html: `<div><button class="ui button in-popup">修改</button><button class="ui button in-popup">删除</button></div>`
      })
    },
    computed: {
      isLog () {
        return this.item.type === DISCUSSION_ADD_TASK || this.item.type === DISCUSSION_ADD_TASK ||
          this.item.type === DISCUSSION_ROP_TASK || this.item.type === DISCUSSION_ADD_DOC || this.item.type === DISCUSSION_UPD_DOC
      },
      isTaskLog () {
        return this.item.type === DISCUSSION_ADD_TASK || this.item.type === DISCUSSION_DONE_TASK ||
          this.item.type === DISCUSSION_ROP_TASK
      },
      isDocCreateLog () {
        return this.item.type === DISCUSSION_ADD_DOC
      },
      isDocLog () {
        return this.item.type === DISCUSSION_ADD_DOC || this.item.type === DISCUSSION_UPD_DOC
      },
      isTaskCreateLog () {
        return this.item.type === DISCUSSION_ADD_TASK
      },
      style () {
        if (this.isDocLog) return 'discussion-doc-log'
        else if (this.isTaskLog) return 'discussion-task-log'
        else return 'discussion-comment-log'
      },
      createdDate () {
        return this.item.createdDate
      },
      authorName () {
        return this.$store.getters.getUserNameById(this.item.author)
      },
      content () {
        if (this.item.type === DISCUSSION_ADD_DOC) return '添加了文档'
        if (this.item.type === DISCUSSION_UPD_DOC) return '编辑了文档'
        if (this.item.type === DISCUSSION_ADD_TASK) return '创建了任务'
        if (this.item.type === DISCUSSION_ROP_TASK) return '重新打开了任务'
        if (this.item.type === DISCUSSION_DONE_TASK) return '完成了任务'
        else {
          if (this.item.content) {
            return this.item.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
          }
        }
      },
      taskTitle () {
        return this.$store.getters.getTaskTitleById(this.item.ref)
      },
      assignee () {
        return this.$store.getters.getUserNameById(this.item.assignee)
      },
      taskDueDate () {
        return this.$store.getters.getTaskDueDateById(this.item.ref)
      },
      avatar () {
        return this.$store.getters.getUserAvatarById(this.item.author)
      },
      quote () {
        let quote = Object.assign({}, this.$store.getters.getReferenceById(this.item.ref))
        quote.authorName = this.$store.getters.getUserNameById(quote.author)
        if (quote.content) {
          if (quote.type === DISCUSSION_ADD_TASK || quote.type === DISCUSSION_DONE_TASK || quote.type === DISCUSSION_ROP_TASK) {
            let dueDate = this.$store.getters.getTaskDueDateById(quote.ref)
            quote.content = `<p><span>任务</span> <a class="task-link">${quote.content}</a> <span class="due-date">${dueDate}</span></p>`
          } else {
            quote.content = quote.content.replace(/(?:\r\n|\r|\n)/g, '<br />')
          }
        }
        return quote
      },
      notCreatedByMe () {
        const currentUser = this.$store.getters.getCurrentUser
        if (!currentUser) return true
        else return currentUser.id !== this.item.author
      }
    }
  }
</script>
