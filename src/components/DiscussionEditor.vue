<template>
<section class="ui grid discussion-editor">
  <div class="twelve wide column">
    <div class="discussion-item-avatar">
      <img v-if="user" :src="user.headimgurl" class="ui avatar image" />
    </div>
    <div class="editor-wrapper">
      <div class="fake-textarea">发表评论或者创建任务</div>
      <div class="real-textarea">
        <textarea :maxlength="task?500:5000" name="discussion-editor" id="discussion-editor" rows="10" cols="120"></textarea>
      </div>

      <div class="editor-actions">
        <div class="task-options" v-show="showTaskAssignment">
          <i class="check circle large icon"></i>
          <a>分配任务</a>
        </div>
        <assignment-editor :ref="assignmentEditorId" :name="assignmentEditorId"></assignment-editor>
        <div class="editor-buttons">
          <button class="ui secondary basic button" @click="cancel">取消</button>
          <button class="ui teal basic button" @click="publish">发布</button>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style>
.discussion-editor .editor-actions {
  width: 100%;
  margin-top: 2rem;
}

.discussion-editor .editor-actions .task-options {
  display: inline-block;
}

.discussion-editor .editor-actions .task-options>a {
  cursor: pointer;
}

.discussion-editor .editor-actions .editor-buttons {
  display: inline-block;
  float: right;
}

.discussion-editor .discussion-item-avatar .ui.avatar.image {
  margin-left: .8rem;
  width: 35px;
  height: 35px;
}

.discussion-editor .discussion-item-avatar {
  display: inline-block;
  position: absolute;
}

.discussion-editor .editor-wrapper {
  display: inline-block;
  margin-left: 5rem;
  width: 100%;
}

.discussion-editor .editor-wrapper div[contenteditable=true] {
  border-radius: .3em;
  border: 1px solid gray;
  line-height: 1em;
  min-height: 5em;
  overflow-y: visible;
  padding: .5em;
}

.discussion-editor .editor-wrapper div[contenteditable=true]:focus {
  outline: none;
}

.discussion-editor .editor-wrapper div[contenteditable=true] blockquote {
  padding-left: 1rem;
  border-style: solid;
  border-color: #ccc;
  border-width: 0;
  border-left-width: .4rem;
}

.discussion-editor .fake-textarea {
  min-height: 1em;
  margin-top: 2px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  color: #999;
  font-size: 14px;
  cursor: text;
  border-radius: 5px;
}

.discussion-editor .real-textarea {
  display: none;
}

.cke_reset {
  border-radius: 5px !important;
}

.cke_top {
  color: #d1d1d1;
  padding-top: 4px;
  padding-bottom: 0 !important;
  border-top-left-radius: 5px !important;
  border-top-right-radius: 5px !important;
}

a.cke_button {
  margin-right: .5em !important;
}
</style>

<script>
import { Html, DateTime } from '../utils'
import toMD from 'to-markdown'
import TaskAssignmentEditor from './TaskAssignmentEditor'
import { mapGetters } from 'vuex'

function stripHtml(html) {
  var tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

export default {
  name: 'DiscussionEditor',
  props: ['user'],
  data() {
    return {
      task: undefined
    }
  },
  components: {
    'assignment-editor': TaskAssignmentEditor
  },
  mounted() {
    if (this.$route.params.tid) {
      $(this.$el).find('.task-options').hide()
    }
    let instance = CKEDITOR.instances['discussion-editor']
    if (instance) {
      instance.destroy(true)
      CKEDITOR.remove(instance)
    }
    let self = this
    $('.task-options').popup({
      lastResort: 'right center',
      position: 'right center',
      hoverable: true,
      on: 'click',
      onShow() {
        if (self.task && self.task.assignee) {
          self.$refs[self.assignmentEditorId].setSelection(self.task.assignee.id)
        } else {
          self.$refs[self.assignmentEditorId].setSelection('unknown')
        }
        if (self.task && self.task.deadline && self.task.deadline !== 'null') {
          self.$refs[self.assignmentEditorId].setDate(self.task.deadline)
        } else {
          self.$refs[self.assignmentEditorId].setDate()
        }
        return true
      },
      onHide() {
        let assignment = self.$refs[self.assignmentEditorId].getData()
        if ((assignment.assignee.id || assignment.deadline)) {
          if ((assignment.assignee && assignment.assignee.id && assignment.assignee.id !== 'null') || (assignment.deadline && assignment.deadline !== 'null')) self.task = assignment
          else self.task = undefined
        }
        return true
      }
    })
    CKEDITOR.replace('discussion-editor')
    $(this.$el).find('.fake-textarea').click((event) => {
      self.showEditor('')
    })
  },
  computed: {
    assignmentEditorId() {
      return 'editor'
    },
    showTaskAssignment() {
      return this.$route.name === 'DraftDiscussion' || this.$route.name === 'TaskList'
    },
    ...mapGetters([
      'draft'
    ])
  },
  methods: {
    showEditor(content) {
      $(this.$el).find('.fake-textarea').hide()
      $(this.$el).find('.real-textarea').show()
      $(this.$el).find('.cke_top').hide()
      let editor = CKEDITOR.instances['discussion-editor']
      let self = this
      editor.setData(content, () => {
        editor.focus()
        let range = editor.createRange()
        range.moveToElementEditEnd(range.root)
        editor.getSelection().selectRanges([range])
        let iframe = $(self.$el).find('iframe')
        $('blockquote', iframe.contents()).css('font-style', 'normal').css('color', 'lightgrey')
          .css('font-family', 'Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Noto Sans CJK SC,WenQuanYi Micro Hei,Arial,sans-serif')
        $('blockquote > p', iframe.contents()).css('margin-top', '5px').css('margin-bottom', '5px')
      })
      this.task = undefined
      this.$refs[this.assignmentEditorId].reset()
    },
    updateContent(item) {
      const author = item.user
      let quote = ''
      if (item.type === 'draft-created' || item.type === 'draft-edited') {
        quote += `<span>文档</span>
                    <p><a href="http://ilaixi.net/user/${author.id}/">@${author.nickname}</a></p>`
      } else {
        if (item.task) {
          let deadline
          if (item.task.deadline) deadline = DateTime.DateMonth(item.task.deadline)
          else deadline = '未限期'
          quote +=
            `<span>任务</span>&nbsp;&nbsp;<a href="http://ilaixi.net/task/${item.task.id}/" class="task-link">${item.task.title}</a>&nbsp;&nbsp;&nbsp;&nbsp;<span class="emphasized-date">${deadline}</span>`
        }
        if (item.content) {
          let content = Html.unescapeHTML(item.content).replace(/(^> .*$)/gm, '').trim()
          quote += `<p>${content.replace(/(?:\r\n|\r|\n)/g, '</p>')}`
        }
        quote += `<p><a href="http://ilaixi.net/user/${author.id}/">@${author.nickname}</a></p>`
      }
      quote = '<blockquote>' + quote + '</blockquote>' + '<p></p>'
      this.showEditor(quote)
    },
    cancel() {
      $(this.$el).find('.real-textarea').hide()
      $(this.$el).find('.fake-textarea').show()
    },
    publish() {
      const draftId = this.draft.id
      if (!this.task) {
        let md = toMD(CKEDITOR.instances['discussion-editor'].getData())
        let taskId
        if (this.$route.params.tid) {
          taskId = this.$route.params.tid
        }
        const regex = />.*\(http:\/\/.*\/task\/(.*)\/\).*$/gm
        let match = regex.exec(md)
        if (match !== null) {
          if (!taskId) {
            taskId = match[1]
          }
          md = md.replace(regex, '').trim()
        }
        let data = Html.escapeHTML(md)
        let post = {
          draft_id: draftId,
          content: data,
          task_id: taskId,
          user: this.user,
          type: 'critique'
        }
        this.$store.dispatch('addPostToDraft', {
          post
        })
      } else {
        let data = stripHtml(CKEDITOR.instances['discussion-editor'].getData())
        let task = {
          title: data,
          assignee: this.task.assignee,
          deadline: this.task.deadline
        }
        this.$store.dispatch('createTask', {
          draftId,
          task
        }).then(task => {
          return this.$store.dispatch('getLatestDraftPost', task.draft_id)
        })
      }
      this.$refs[this.assignmentEditorId].reset()
      this.task = undefined
      CKEDITOR.instances['discussion-editor'].setData('')
      $(this.$el).find('.real-textarea').hide()
      $(this.$el).find('.fake-textarea').show()
    }
  }
}
</script>
