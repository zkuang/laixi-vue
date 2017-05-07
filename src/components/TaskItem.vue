<template>
  <li class="taskitem" :id="itemId" @mouseover="active" @mouseleave="deactive">
    <div class="task-actions">
      <button class="ui button">
        <i class="write icon"></i>
      </button>
      <button class="ui button">
        <i class="trash outline icon"></i>
      </button>
    </div>
    <span class="checkbox-wrapper" :class="{disabled}">
      <input type="checkbox" :checked="task.checked" :id="inputId" :disabled="disabled" @change="taskStateChange">
      <label class="disable-checkbox" :for="inputId"></label>
    </span>
    <label>{{task.title}}</label>
    <div class="task-content">
      <span class="assignment">
        <span>{{task.assignee.nickname}}</span>
        <span>{{dueDate}}</span>
      </span>
      <assignment-editor :ref="assignmentEditorId" :name="assignmentEditorId"></assignment-editor>
    </div>
  </li>
</template>

<style>
  .taskitem {
    font-size: 1.15em;
    width: 80%;
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
    float: right;
    width: 45%;
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

  .assignment:hover {
    color: black;
  }
</style>

<script>
  import {DateTime} from '../utils'
  import TaskAssignmentEditor from './TaskAssignmentEditor'

  export default {
    name: 'TaskItem',
    props: ['task', 'disabled'],
    components: {
      'assignment-editor': TaskAssignmentEditor
    },
    computed: {
      dueDate () {
        return DateTime.DateFromNow(this.task.deadline)
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
      console.log('mounted.............')
      if (!this.disabled) {
        let self = this
        $(this.$el).find('.assignment').popup({
          lastResort: 'right center',
          position: 'right center',
          hoverable: true,
          on: 'click',
          onShow() {
            if (self.task.assignee) {
              self.$refs[self.assignmentEditorId].setSelection(self.task.assignee.id)
              return true
            }
          }
        })
      }
    },
    watch: {
      disabled(isDisabled) {
        if (isDisabled) {
          $(this.$el).find('.assignment').popup('destroy')
        } else {
          let self = this
          $(this.$el).find('.assignment').popup({
            lastResort: 'right center',
            position: 'right center',
            hoverable: true,
            on: 'click',
            onShow() {
              if (self.task.assignee) {
                self.$refs[self.assignmentEditorId].setSelection(self.task.assignee.id)
                return true
              }
            }
          })
        }
      }
    },
    methods: {
      active () {
        if (this.disabled) {
          return
        }
        $(this.$el).addClass('active')
      },
      deactive () {
        $(this.$el).removeClass('active')
      },
      taskStateChange () {
        this.task.checked = $(`#${this.inputId}`).is(':checked')
        this.$store.dispatch('updateTask', this.task)
      }
    }
  }
</script>
