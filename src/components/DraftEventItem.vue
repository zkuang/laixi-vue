<template>
<div class="doc-log">
  <span class="discussion-item-avatar">
    <i v-if="isDraftCreate" class="grey add circle icon"></i>
    <i v-else class="grey write square icon"></i>
  </span>
  <div class="event-log-content-wrapper">
    <div class="event-log-content">
      <span class="time-span">{{createdDate}}</span>
      <span class="username">{{item.user.nickname}}</span>
      <span>{{content}}</span>
    </div>
  </div>
</div>
</template>

<style>
.doc-log span.username {
  font-weight: bold;
}
</style>


<script>
import {
  DateTime
} from '../utils'
export default {
  name: 'DraftEventItem',
  props: ['item'],
  computed: {
    isDraftCreate() {
      return this.item.type === 'draft-created'
    },
    content() {
      if (this.item.type === 'draft-created') return '添加了文档'
      if (this.item.type === 'draft-edited') return '编辑了文档'
    },
    createdDate() {
      return DateTime.DateMonthYearTime(this.item.date)
    }
  }
}
</script>
