<template>
<div class="task-log">
  <span class="discussion-item-avatar">
    <i class="grey check circle icon"></i>
  </span>
  <div class="event-log-content-wrapper">
    <div class="event-log-content">
      <span class="time-span">{{createdDate}}</span>
      <span class="username">{{item.user.nickname}}</span>
      <span v-if="hasBeenAssigned">为</span>
      <span v-if="hasBeenAssigned" class="username">{{item.task.assignee.nickname}}</span>
      <span>{{content}}</span>
      <a class="task-link" v-show="notInTask" @click="navigateToTask">{{item.task.title}}</a>
    </div>

    <!-- <span class="emphasized-date">{{dueDate}}</span> -->
    <div class="ui image label assignment-label" v-show="notInTask">
      <img v-if="hasBeenAssigned" :src="item.task.assignee.headimgurl" />
      <span v-if="!hasBeenAssigned">未指派</span> {{ dueDate }}
    </div>
  </div>
</div>
</template>

<style>
.task-link {
  color: black;
}
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
      if (!this.item.task.assignee || this.item.task.assignee.id === null) return false
      else return true
      // return this.item.type === 'task-created' && this.item.task.assignee
    },
    dueDate() {
      if (!this.item.task.deadline) return '未限期'
      return DateTime.DateMonth(this.item.task.deadline)
    },
    createdDate() {
      return DateTime.DateMonthYearTime(this.item.date)
    },
    content() {
      if (this.item.type === 'task-created') return '创建了任务'
      if (this.item.type === 'task-unchecked') return '重新打开了任务'
      if (this.item.type === 'task-checked') return '完成了任务'
      if (this.item.type === 'task-edited') return '更新了任务'
    },
    notInTask() {
      return this.$route.name !== 'TaskDiscussion'
    }
  }
}
</script>
