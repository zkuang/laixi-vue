<template>
<section class="ui stackable two column grid">
  <div class="thirteen wide column task-description section">
    <div class="task-msg-detail">
      <div class="detail" @mouseover="activeCtrl = true" @mouseout="activeCtrl = false">
        <div v-show="activeCtrl" class="task-detail-ctrl">
          <button class="ui button btn-style" @click="editTitle">
            <i class="write icon"></i>
          </button>
          <button class="ui button btn-style">
            <i class="trash outline icon"></i>
          </button>
        </div>
        <span class="checkbox-wrapper" :class="{disabled: draft.removed}">
          <input type="checkbox" :checked="task.checked" :id="taskId" :disabled="draft.removed">
          <label class="disable-checkbox" :for="taskId"></label>
        </span>
        <span v-show="!editTaskTitle" class="task-title">{{task.title}}</span>
        <input v-show="editTaskTitle" class="task-title-input" type="text">
        <div class="task-content">
          <span>
            <span v-if="isAssigned">{{task.assignee.nickname}}</span>
            <span v-if="!isAssigned">未指派</span>
            <span>{{dueDate}}</span>
          </span>
        </div>
      </div>
    </div>
    <div v-show="editTaskTitle" class="task-edit-actions">
      <button class="ui positive button" @click="save">保存修改</button>
      <button class="ui basic button" @click="editTaskTitle = false">取消</button>
    </div>
    <div class="task-detail">
      <div class="break-word" v-if="task.description && !editing" v-html="task.description.replace(/(?:\r\n|\r|\n)/g, '<br />')">

      </div>
      <div v-show="editing" class="task-description-editor">
        <textarea maxlength="5000" placeholder="任务描述" @keyup="autoGrow" :value="task.description">
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
.task-description .task-msg-detail{
  margin-left: -7rem;
  position: relative;
}
.task-description .task-msg-detail .detail{
  margin-left: 7rem;
  position: relative;
}
.task-description .task-msg-detail .detail .task-detail-ctrl{
  position: absolute;
  display: inline-flex;
  top: 0;
  right: 100%;
  height: 100%;
  padding-left: 5px;
  background-color: transparent;
  border: 1px solid lightgray;
  border-right: none;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}
.task-description .task-msg-detail .detail .task-detail-ctrl .btn-style{
  background-color: transparent;
  padding: 0;
  padding-left:15px;
}
.task-description .task-msg-detail .task-title-input{
  font-size: 1.2rem;
  border: none;
  border-bottom: 1px dashed black;
  padding: 0;
  margin: 0;
}
.task-description .task-msg-detail .task-title-input:focus{
  outline: none;
}
.break-word{
  overflow-wrap: break-word;
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
      editing: false,
      activeCtrl: false,
      editTaskTitle: false
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
      if (this.editTaskTitle) {
        let taskTitle = $(`.task-title-input`).val()
        if (task.title !== taskTitle) task.title = taskTitle
      }
      let self = this
      task.description = description
      this.$store.dispatch('updateTask', task).then(task => {
        self.editTaskTitle = false
        self.editing = false
        this.$store.dispatch('getLatestTaskPost', task.id)
      })
    },
    cancel() {
      this.editing = false
    },
    editTitle () {
      this.editTaskTitle = true
      $(`.task-title-input`).val(this.task.title)
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
