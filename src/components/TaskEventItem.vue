<template>
  <div class="task-log">
    <span class="discussion-item-avatar">
        <i class="grey check circle icon"></i>
      </span>
    <span class="time-span">{{createdDate}}</span>
    <span class="username">{{item.task.creator.nickname}}</span>
    <span v-if="isTaskCreate">为</span>
    <span v-if="isTaskCreate" class="username">{{item.task.assignee.nickname}}</span>
    <span>{{content}}</span>
    <a class="task-link">{{item.task.title}}</a>
    <span class="emphasized-date">{{dueDate}}</span>
  </div>
</template>

<style>

</style>


<script>
  import {DateTime} from '../utils'

  export default {
    name: 'TakeEventItem',
    props: ['item'],
    computed: {
      isTaskCreate() {
        return this.item.type === 'task-created'
      },
      dueDate () {
        return DateTime.DateMonth(this.item.task.deadline)
      },
      createdDate () {
        return DateTime.DateMonthYearTime(this.item.created)
      },
      content () {
        if (this.item.type === 'task-created') return '创建了任务'
        if (this.item.type === 'task-unchecked') return '重新打开了任务'
        if (this.item.type === 'task-checked') return '完成了任务'
        if (this.item.type === 'task-edited') return '更新了任务'
      }
    }
  }
</script>
