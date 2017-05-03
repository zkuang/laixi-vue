<template>
  <section class="ui grid task-items">
    <div class="thirteen wide column section">
      <h3 class="taskitem-list-header">任务</h3>
      <ul class="taskitem-list">
        <task-item v-for="task in tasks" :key="task.id" :taskId="task.id"></task-item>
      </ul>
      <p class="sixteen wide column task-actions"><a>添加新任务</a><a>查看已完成任务</a></p>
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
  import { mapGetters } from 'vuex'
  import TaskItem from './TaskItem'

  export default {
    name: 'TaskItems',
    components: {
      'task-item': TaskItem
    },
    computed: {
      ...mapGetters([
        'tasks',
        'draft'
      ])
    }
  }
</script>
