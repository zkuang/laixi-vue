<template>
<section class="ui grid task-items">
  <div class="thirteen wide column section">
    <h3 class="taskitem-list-header">任务</h3>
    <ul class="taskitem-list">
      <p v-show="showNoTask">
        目前没有任务
      </p>
      <task-item v-for="task in uncheckedTasks" :key="task.id" :task="Object.assign({}, task)" :disabled="draft.removed" :create="false"></task-item>
      <task-item ref="task-create-form" v-for="task in placeholderTasks" :key="task.id" :task="Object.assign({}, task)" :create="true" @editDone="this.editing = false"></task-item>
    </ul>
    <p class="sixteen wide column task-actions"><a style="cursor:pointer;" disabled="true" @click="createTask">添加新任务</a><a v-show="!isAllTasks" style="cursor:pointer;" :disabled="draft.removed" @click="allTasks">查看已完成任务</a></p>
    <ul class="taskitem-list">
      <task-item v-for="task in checkedTasks" :key="task.id" :task="Object.assign({}, task)" :disabled="draft.removed"></task-item>
    </ul>
  </div>
  <div class="ui basic modal" id="task-deletion-modal">
    <div class="content">
      <p>你确定要删除这个任务吗？</p>
    </div>
    <div class="actions">
      <div class="ui inverted red ok approve button">确定</div>
      <div class="ui inverted cancel button">取消</div>
    </div>
  </div>
</section>
</template>

<style>
.taskitem-list {
  padding-left: .6rem;
  margin-left: -8.5rem;
}

.taskitem-list>p {
  margin-left: 8.2rem;
  color: #999999;
}

@media (max-width: 768px) {
  .taskitem-list {
    margin-left: 0;
  }
}

.taskitem-list>li {
  list-style: none;
  padding-top: auto;
  padding-bottom: auto;
  margin-bottom: 1em;
}

.taskitem-list>li:last-child {
  margin-bottom: 0;
}

.taskitem-list-header {
  color: gray;
  font-weight: normal;
  padding-left: 4px;
}

.task-items p>a:last-child {
  float: right;
}

.ui.grid.task-items {
  margin-top: -2.5em;
  margin-left: -18px;
}

.ui.grid.task-items>.section>.task-actions {
  padding-bottom: 0;
  padding-left: 4px;
}

.ui.grid.task-items>.section::after {
  padding-top: 0em !important;
}
</style>

<script>
import {
  mapGetters
} from 'vuex'
import TaskItem from './TaskItem'
import TaskAssignmentEditor from './TaskAssignmentEditor'

export default {
  name: 'TaskItems',
  components: {
    'task-item': TaskItem,
    'assignment-editor': TaskAssignmentEditor
  },
  data() {
    return {
      editing: false
    }
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
      return this.$route.name === 'TaskList'
    },
    showNoTask() {
      console.log(this.tasks.length === 0, this.editing)
      return (this.tasks.length === 0) && !this.editing
    }
  },
  methods: {
    createTask() {
      this.$refs['task-create-form'][0].setEditable(true)
    },
    allTasks() {
      this.$router.push({
        name: 'TaskList',
        params: {
          did: this.draft.id
        }
      })
    }
  }
}
</script>
