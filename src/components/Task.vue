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
        <span>{{task.assignee.nickname}}</span>
        <span>{{dueDate}}</span>
      </span>
      </div>
      <div class="task-detail">
        <div v-if="task.description" v-html="task.description.replace(/(?:\r\n|\r|\n)/g, '<br />')">

        </div>
      </div>
    </div>
    <div v-if="!draft.removed" class="three wide column ui secondary vertical menu buttons">
      <div class="item">
        <div class="ui positive basic button">编辑</div>
      </div>
      <div class="item">
        <div class="ui negative basic button" @click="delTask">删除</div>
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
    min-height: 3.8rem;
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

  .task-description .task-content > span {
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

  .task-description > span > span {
    margin-top: auto;
    margin-bottom: auto;
  }

  .task-description span > span:first-child {
    margin-right: .52rem;
  }
</style>

<script>
  import {mapGetters} from 'vuex'
  import {DateTime} from '../utils'
  export default {
    name: 'Task',
    props: ['task'],
    methods: {
      delTask() {
        let self = this
        $('#task-deletion-modal').modal({
          closable: true,
          onApprove: function () {
            self.$store.dispatch('delTask', self.task)
            self.$router.push(`/documents/${self.task.draft_id}`)
          }
        }).modal('show')
      }
    },
    computed: {
      dueDate() {
        return DateTime.DateMonth(this.task.deadline)
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
