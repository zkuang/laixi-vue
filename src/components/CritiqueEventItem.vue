<template>
  <div class="comment">
    <div class="discussion-item-avatar">
      <img :src="avatar" class="ui avatar image" />
    </div>
    <div class="discussion-item-content">
      <p><span class="username">{{item.user.nickname}}</span> <span class="time-span">{{createdDate}}</span></p>
      <markdown>{{content}}</markdown>
    </div>
  </div>
</template>

<style>
  blockquote > p > span {
    line-height: 2em;
  }

</style>

<script>
  import VueMarkdown from 'vue-markdown'
  import {DateTime} from '../utils'
  export default {
    name: 'CritiqueItem',
    props: ['item'],
    components: {
      markdown: VueMarkdown
    },
    computed: {
      avatar() {
        return this.item.user.headimgurl
      },
      createdDate() {
        return DateTime.DateMonthYear(this.item.created)
      },
      content() {
        if (!this.item.task) {
          return this.item.content
        } else {
          let content
          if (!this.$route.params.tid) {
            content = `> <span>任务 <a href="http://localhost:8080">${this.item.task.title}</a> <span class="emphasized-date">${DateTime.DateMonth(this.item.deadline)}</span></span>`
            if (!this.item.content.startsWith('>')) {
              content += `\n> [@${this.item.task.creator.nickname}](http://localhost:8080)\n`
            }
            content += `\n${this.item.content}`
          } else {
            content = this.item.content
          }
          return content
        }
      }
    }
  }
</script>
