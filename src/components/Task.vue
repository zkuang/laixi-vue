<template>
<section class="ui stackable two column grid">
  <div class="thirteen wide column task-description section">
    <span class="checkbox-wrapper" :class="{disabled: draft.removed}">
        <input type="checkbox" :checked="task.checked" :id="taskId" :disabled="draft.removed">
        <label class="disable-checkbox" :for="taskId"></label>
      </span>
    <span class="task-title">{{task.title}}</span>
    <div class="task-content">
      <span>
        <span v-if="isAssigned">{{task.assignee.nickname}}</span>
        <span v-if="!isAssigned">未指派</span>
      <span>{{dueDate}}</span>
      </span>
    </div>
    <div class="task-detail">
      <div v-if="task.description && !editing" v-html="task.description.replace(/(?:\r\n|\r|\n)/g, '<br />')">

      </div>
      <div v-show="editing" class="task-description-editor">
        <textarea @keyup="autoGrow" :value="task.description">
        </textarea>
      </div>
    </div>
  </div>
  <div v-if="!draft.removed && !editing" class="three wide column ui secondary vertical menu buttons">
    <div class="item">
      <div class="ui positive basic button" @click="setEdit">编辑</div>
    </div>
    <div class="item">
      <div class="ui negative basic button" @click="delTask">删除</div>
    </div>
  </div>
  <div v-if="!draft.removed && editing" class="three wide column ui secondary vertical menu buttons">
    <div class="item">
      <div class="ui positive basic button" @click="save">保存</div>
    </div>
    <div class="item">
      <div class="ui negative basic button" @click="cancel">取消</div>
    </div>
  </div>
  <div class="ui small modal" id="task-deletion-modal">
    <div class="content">
      <p>你确定要删除这个任务吗？</p>
    </div>
    <div class="actions">
      <div class="ui approve button">确定</div>
      <div class="ui cancel button">取消</div>
    </div>
  </div>
</section>
</template>

<style>
.task-description {
  line-height: 2em;
  vertical-align: text-top;
}

.task-description span.task-title {
  display: inline-block;
  font-size: 1.5em;
}

.task-description .task-detail {
  margin-top: 1rem;
  margin-left: 4rem;
  min-height: 4.8rem;
  font-size: 1.2em;
}

.task-description .task-content {
  display: inline-block;
  font-size: 1.2em;
}

.task-description input {
  margin-right: 1.2rem;
  margin-left: 1.2rem;
  font-size: 4em;
}

.task-description .task-content>span {
  display: inline-block;
  margin-left: .4rem;
  background: #e8e8e8;
  border-radius: 1rem;
  line-height: 1.8rem;
  font-size: .9em;
  text-align: center;
  vertical-align: middle;
  padding-left: 1.2em;
  padding-right: 1.2em;
  margin-top: -.5em;
}

.task-description>span>span {
  margin-top: auto;
  margin-bottom: auto;
}

.task-description span>span:first-child {
  margin-right: .52rem;
}

.task-description .task-description-editor {
  margin-left: -0.15em;
  width: 100%;
  min-height: 3rem;
  margin-top: -0.15em;
  margin-bottom: 0;
}

.task-description .task-description-editor>textarea {
  resize: none;
  border: none;
  width: 100%;
  height: auto;
  overflow: hidden;
}
</style>

<script>
import {
  mapGetters
} from 'vuex'
import {
  DateTime
} from '../utils'
import Vue from 'vue'
export default {
  name: 'Task',
  data() {
    return {
      editing: false
    }
  },
  props: ['task'],
  mounted () {
    this.$nextTick(() => {
      console.log(this.task)
    })
  },
  methods: {
    delTask() {
      let self = this
      $('#task-deletion-modal').modal({
        closable: true,
        onApprove: function() {
          self.$store.dispatch('delTask', self.task)
          self.$router.push({
            name: 'DraftDiscussion',
            params: {
              did: self.task.draft_id
            }
          })
        }
      }).modal('show')
    },
    setEdit() {
      this.editing = true
      Vue.nextTick(() => {
        $(this.$el).find('.task-description-editor > textarea').focus()
      })
    },
    autoGrow() {
      let ele = $(this.$el).find('.task-description-editor > textarea')
      if (ele.get(0).scrollHeight - ele.height() !== 4) {
        ele.height(ele.get(0).scrollHeight + 10)
      }
    },
    save() {
      let description = $(this.$el).find('.task-description-editor > textarea').val()
      let task = Object.assign({}, this.task)
      let self = this
      task.description = description
      this.$store.dispatch('updateTask', task).then(task => {
        self.editing = false
        this.$store.dispatch('getLatestPost', task.draft_id)
      })
    },
    cancel() {
      this.editing = false
    }
  },
  computed: {
    dueDate() {
      return DateTime.DateMonth(this.task.deadline)
    },
    isAssigned () {
      if (this.task.assignee && this.task.assignee.id != null) return true
      return false
    },
    ...mapGetters([
      'draft'
    ]),
    taskId() {
      return `task${this.task.id}`
    }
  }
}
</script>
