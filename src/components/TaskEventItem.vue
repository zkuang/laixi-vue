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
  <a class="task-link" @click="navigateToTask">{{item.task.title}}</a>
  <!-- <span class="emphasized-date">{{dueDate}}</span> -->
  <div class="ui image label">
    <img v-if="hasBeenAssigned" :src="item.task.assignee.headimgurl" /> 
    <span v-if="!hasBeenAssigned">未指派</span>
    {{ dueDate }}
  </div>
</div>
</template>

<style>
</style>


<script>
import {
  DateTime
} from '../utils'

export default {
  name: 'TakeEventItem',
  props: ['item'],
  methods: {
    navigateToTask() {
      let name
      for (name in CKEDITOR.instances) {
        if (name !== 'discussion-editor') {
          let instance = CKEDITOR.instances[name]
          instance.removeAllListeners()
          instance.destroy()
          CKEDITOR.remove(instance)
        }
      }
      console.log('pushing to task discussion')
      this.$router.push({
        name: 'TaskDiscussion',
        params: {
          tid: this.item.task.id
        }
      })
    }
  },
  computed: {
    hasBeenAssigned() {
      if (this.item.task.assignee === null) return false
      else return true
      // return this.item.type === 'task-created' && this.item.task.assignee
    },
    dueDate() {
      if (this.item.task.deadline) {
        return DateTime.DateMonth(this.item.task.deadline)
      } else {
        return '未限时'
      }
    },
    createdDate() {
      return DateTime.DateMonthYearTime(this.item.date)
    },
    content() {
      if (this.item.type === 'task-created') return '创建了任务'
      if (this.item.type === 'task-unchecked') return '重新打开了任务'
      if (this.item.type === 'task-checked') return '完成了任务'
      if (this.item.type === 'task-edited') return '更新了任务'
    }
  }
}
</script>
