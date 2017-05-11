<template>
  <li class="taskitem" :id="itemId" @mouseover="active" @mouseleave="deactive">
    <div class="task-actions">
      <button class="ui button" @click="edit">
        <i class="write icon"></i>
      </button>
      <button class="ui button" @click="del">
        <i class="trash outline icon"></i>
      </button>
    </div>
    <div class="task-detail" v-if="!create && !editable">
      <span class="checkbox-wrapper" :class="{disabled}">
        <input type="checkbox" :checked="task.checked" :id="inputId" :disabled="disabled" @change="taskStateChange">
        <label class="disable-checkbox" :for="inputId"></label>
      </span>
      <label>{{task.title}}</label>
      <div class="task-content">
        <span class="assignment" :class="{diasbled: task.checked}">
          <span>{{assignee}}</span>
          <span>{{dueDate}}</span>
        </span>
        <assignment-editor :ref="assignmentEditorId" :name="assignmentEditorId"></assignment-editor>
      </div>
    </div>
    <div class="task-detail" v-if="editable">
      <span class="checkbox-wrapper disabled">
            <input type="checkbox" id="create-task-input" disabled="true">
            <label class="disable-checkbox" for="create-task-input"></label>
          </span>
      <input type="text">
      <div class="task-content">
            <span class="assignment" :class="{diasbled: task.checked}">
              <span>{{assignee}}</span>
              <span>{{dueDate}}</span>
            </span>
        <assignment-editor :ref="assignmentEditorId" :name="assignmentEditorId"></assignment-editor>
      </div>
    </div>
    <div v-if="editable" class="task-edit-actions">
      <button class="ui positive button" @click="save">保存修改</button>
      <button class="ui basic button" @click="dismiss">取消</button>
    </div>
  </li>
</template>

<style>
  .taskitem {
    font-size: 1.15em;
    width: 100%;
  }

  .taskitem .task-actions {
    display: inline-block;
    border: 1px solid lightgray;
    border-right: none;
    border-radius: .5em;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    line-height: 2.2rem;
    margin-right: 1.2rem;
    visibility: hidden;
  }

  .taskitem .task-detail {
    display: inline-block;
    margin-right: 1.2rem;
    width: 80%;
  }

  .taskitem .task-detail > label {
    display: inline-block;
    min-width: 14em;
  }

  .taskitem .task-edit-actions {
    margin-left: 9em;
  }

  .taskitem .task-detail input {
    border: none;
    border-bottom: dashed 1px #aeb3b9;
    min-width: 20em;
  }

  .taskitem .task-detail input:focus {
    outline: none;
  }

  .taskitem.active .task-actions {
    visibility: visible;
  }

  .taskitem .task-actions .ui.button {
    background: transparent;
    font-size: 1.2em;
    padding: .1em 0;
  }

  .taskitem .task-actions .ui.button:first-child {
    padding-left: 1.2em;
  }

  .taskitem .checkbox-wrapper {
    margin-right: 1.2rem;
  }

  .taskitem .task-content {
    display: inline-block;
    height: 100%;
  }

  .taskitem span > span {
    margin-top: auto;
    margin-bottom: auto;
  }

  .taskitem span > span:first-child {
    margin-right: .52rem;
  }

  .assignment {
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
    color: gray;
    cursor: pointer;
  }

  .assignment.diasbled {
    cursor: default;
  }

  .assignment:hover {
    color: black;
  }
</style>

<script>
  import {DateTime} from '../utils'
  import TaskAssignmentEditor from './TaskAssignmentEditor'
  import {mapGetters} from 'vuex'
  export default {
    name: 'TaskItem',
    props: ['task', 'disabled', 'create'],
    data() {
      return {
        editable: false,
        switched: false,
        dirty: false
      }
    },
    components: {
      'assignment-editor': TaskAssignmentEditor
    },
    computed: {
      ...mapGetters(['tasks']),
      dueDate () {
        if (!this.task.deadline) return ''
        else return DateTime.DateFromNow(this.task.deadline)
      },
      assignee () {
        if (this.task.assignee) return this.task.assignee.nickname
        else return '未指派'
      },
      itemId () {
        return `task-${this.task.id}`
      },
      inputId () {
        return `task-input-${this.task.id}`
      },
      assignmentEditorId() {
        return `taskitem-assignmenteditor-${this.task.id}`
      }
    },
    mounted() {
      console.log('mounted')
      if (!this.disabled && !this.task.checked) {
        this.setupPopups()
      }
    },
    updated() {
      if (!this.task.checked && !this.disabled) {
        this.setupPopups()
      }
      if (this.editable && this.switched) {
        $(this.$el).find('.task-detail > input').val(this.task.title)
        this.switched = false
      }
    },
    watch: {
      disabled(isDisabled) {
        if (isDisabled) {
          $(this.$el).find('.assignment').popup('destroy')
        } else {
          if (!this.task.checked) {
            this.setupPopups()
          }
        }
      }
    },
    methods: {
      active () {
        if (this.disabled || this.editable || this.create) {
          return
        }
        $(this.$el).addClass('active')
      },
      deactive () {
        $(this.$el).removeClass('active')
      },
      save () {
        let self = this
        let title = $(this.$el).find('.task-detail > input').val()
        if (!title) return
        if (title !== this.task.title) {
          this.task.title = title
          this.dirty = true
        }
        if (this.dirty) {
          if (!this.create) {
            this.$store.dispatch('updateTask', this.task).then(() => {
              self.dirty = false
            }).catch(() => {
              self.dirty = false
            })
          } else {
            this.$store.dispatch('createTask', {draftId: this.$route.params.dId, task: this.task}).then(() => {
              self.dirty = false
            }).catch(() => {
              self.dirty = false
            })
          }
        }
        this.editable = false
        this.switched = true
      },
      dismiss () {
        let self = this
        this.editable = false
        this.switched = true
        const task = this.tasks.find(t => {
          return t.id === self.task.id
        })
        this.task.assignee = task.assignee
        this.task.title = task.title
        this.task.deadline = task.deadline
        let ass = $(this.$el).find('.assignment')
        ass.find('span:first-child').text(this.task.assignee.nickname)
        ass.find('span:last-child').text(DateTime.DateFromNow(this.task.deadline))
      },
      edit () {
        this.editable = true
        this.switched = true
        $(this.$el).removeClass('active')
      },
      setEditable (editable) {
        if (this.editable !== editable) {
          this.switched = true
          this.editable = editable
        }
      },
      taskStateChange () {
        let isCheck = $(this.$el).find(`#${this.inputId}`).is(':checked')
        if (isCheck !== this.task.checked) {
          this.task.checked = isCheck
          this.$store.dispatch('updateTask', this.task)
        }
      },
      setupPopups() {
        console.log('setup popup...........')
        let self = this
        $(this.$el).find('.assignment').popup({
          lastResort: 'right center',
          position: 'right center',
          hoverable: true,
          on: 'click',
          onShow() {
            if (self.task.assignee) {
              self.$refs[self.assignmentEditorId].setSelection(self.task.assignee.id)
            }
            return true
          },
          onHide() {
            function updateAssignment() {
              let assignment = self.$refs[self.assignmentEditorId].getData()
              if (self.task.deadline && assignment.deadline && assignment.deadline.diff(self.task.deadline, 'days') === 0) {
                assignment.deadline = undefined
              }
              if (assignment.deadline) {
                self.task.deadline = assignment.deadline.format()
              }
              if (!self.task.assignee || (assignment.assignee && assignment.assignee.id !== self.task.assignee.id)) {
                self.task.assignee = assignment.assignee
              } else {
                assignment.assignee = undefined
              }
              return (assignment.assignee || assignment.deadline)
            }

            if (!self.editable) {
              if (updateAssignment()) {
                self.$store.dispatch('updateTask', self.task)
              }
            } else {
              if (updateAssignment()) {
                let ass = $(self.$el).find('.assignment')
                if (self.task.assignee) ass.find('span:first-child').text(self.task.assignee.nickname)
                if (self.task.deadline) ass.find('span:last-child').text(DateTime.DateFromNow(self.task.deadline))
              }
            }
            return true
          }
        })
      },
      del() {
        let self = this
        $('#task-deletion-modal').modal({
          closable: true,
          onApprove: function () {
            self.$store.dispatch('delTask', self.task)
          }
        }).modal('show')
      }
    }
  }
</script>
