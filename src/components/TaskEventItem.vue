<template>
  <div class="task-log">
    <span class="discussion-item-avatar">
        <i class="grey check circle icon"></i>
      </span>
    <span class="time-span">{{createdDate}}</span>
    <span class="username">{{item.user.nickname}}</span>
    <span v-if="hasBeenAssigned">为</span>
    <span v-if="hasBeenAssigned" class="username">{{item.task.assignee.nickname}}</span>
    <span>{{content}}</span>
    <router-link :to="taskLink" class="task-link">{{item.task.title}}</router-link>
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
      hasBeenAssigned() {
        return this.item.type === 'task-created' && this.item.task.assignee
      },
      dueDate () {
        if (this.item.task.deadline) {
          return DateTime.DateMonth(this.item.task.deadline)
        } else {
          return '未限时'
        }
      },
      createdDate () {
        return DateTime.DateMonthYearTime(this.item.created)
      },
      taskLink () {
        return `/documents/${this.$route.params.did}/tasks/${this.item.task.id}`
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
