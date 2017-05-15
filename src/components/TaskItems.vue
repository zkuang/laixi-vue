<template>
  <section class="ui grid task-items">
    <div class="thirteen wide column section">
      <h3 class="taskitem-list-header">任务</h3>
      <ul class="taskitem-list">
        <task-item v-for="task in uncheckedTasks" :key="task.id" :task="Object.assign({}, task)" :disabled="draft.removed" :create="false"></task-item>
        <task-item ref="task-create-form" v-for="task in placeholderTasks" :key="task.id" :task="Object.assign({}, task)" :create="true"></task-item>
      </ul>
      <p class="sixteen wide column task-actions"><a style="cursor:pointer;" disabled="true" @click="createTask">添加新任务</a><a v-show="!isAllTasks" style="cursor:pointer;" :disabled="draft.removed" @click="allTasks">查看所有任务</a></p>
      <ul class="taskitem-list">
        <task-item v-for="task in checkedTasks" :key="task.id" :task="Object.assign({}, task)" :disabled="draft.removed"></task-item>
      </ul>
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
  .taskitem-list {
    padding-left: .6rem;
    margin-left: -8.5rem;
  }

  .taskitem-list > li {
    line-height: 2.5rem;
    list-style: none;
    padding-top: auto;
    padding-bottom: auto;
  }

  .taskitem-list-header {
    color: gray;
    font-weight: normal;
    padding-left: .25em;
  }

  .task-items p > a:last-child {
    float: right;
  }

  .task-items p {
    font-size: 1.1em;
  }

  .ui.grid.task-items > .section > .task-actions {
    padding-bottom: 0;
  }

</style>

<script>
  import {mapGetters} from 'vuex'
  import TaskItem from './TaskItem'
  import TaskAssignmentEditor from './TaskAssignmentEditor'

  export default {
    name: 'TaskItems',
    components: {
      'task-item': TaskItem,
      'assignment-editor': TaskAssignmentEditor
    },
    computed: {
      ...mapGetters([
        'tasks',
        'draft'
      ]),
      uncheckedTasks() {
        return this.tasks.filter(task => {
          return task.checked === false && task.id !== 'undefined'
        })
      },
      checkedTasks() {
        return this.tasks.filter(task => {
          return task.checked === true && task.id !== 'undefined'
        })
      },
      placeholderTasks() {
        return this.tasks.filter(task => {
          return task.id === 'undefined'
        })
      },
      isAllTasks() {
        console.log(this.$route.name === 'TaskList')
        return this.$route.name === 'TaskList'
      }
    },
    mounted() {
      $(this.$el).find('.assignment').popup({
        lastResort: 'right center',
        position: 'right center',
        hoverable: true,
        on: 'click'
      })
    },
    methods: {
      createTask() {
        this.$refs['task-create-form'][0].setEditable(true)
      },
      allTasks() {
        this.$router.push(`/drafts/${this.$route.params.did}/tasks`)
      }
    }
  }
</script>
