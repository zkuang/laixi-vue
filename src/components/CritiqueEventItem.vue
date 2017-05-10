<template>
  <div class="comment">
    <div class="discussion-item-avatar">
      <img :src="avatar" class="ui avatar image" />
    </div>
    <div class="discussion-item-content">
      <div class="critique-content">
        <p><span class="username">{{item.user.nickname}}</span> <span class="time-span">{{createdDate}}</span></p>
        <div v-html="markdownContent"></div>
      </div>
      <div class="critique-editor">
        <textarea :name="id" :id="id" rows="4" cols="120"></textarea>
        <div class="editor-actions">
          <div class="editor-buttons">
            <button class="ui secondary basic button" @click="dismiss">取消</button>
            <button class="ui teal basic button" @click="save">发布</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  blockquote > p > span {
    line-height: 2em;
  }

  .comment .critique-editor {
    display: none;
    width: 100%;
  }

</style>

<script>
  import VueMarkdown from 'vue-markdown'
  import {DateTime} from '../utils'
  import toMD from 'to-markdown'

  export default {
    name: 'CritiqueItem',
    props: ['item'],
    components: {
      markdown: VueMarkdown
    },
    methods: {
      save() {
        this.hideEditor()
        let data = toMD(CKEDITOR.instances[this.id].getData())
        const regex = />.*\(http:\/\/.*\/documents\/.*\/tasks\/(.*)\).*$/gm
        const draftId = this.$route.params.did
        let match = regex.exec(data)
        let taskId
        if (match !== null) {
          taskId = match[1]
          data = data.replace(regex, '').trim()
        }
        let post = {
          id: this.item.id,
          draft_id: draftId,
          content: data,
          task_id: taskId,
          user: this.$store.getters.getCurrentUser,
          type: 'critique'
        }
        this.$emit('critique-save', post)
      },
      dismiss() {
        this.hideEditor()
        this.$emit('critique-dismiss')
      },
      showEditor() {
        let md = markdownit({
          html: true,
          breaks: true
        })
        let content = md.render(this.content)
        $(this.$el).find('.critique-content').hide()
        $(this.$el).find('.critique-editor').show()
        $(this.$el).find('.cke_top').hide()
        CKEDITOR.instances[this.id].setData(content)
      },
      hideEditor() {
        $(this.$el).find('.critique-editor').hide()
        $(this.$el).find('.critique-content').show()
        $(this.$el).find('.cke_top').hide()
      }
    },
    mounted() {
      CKEDITOR.replace(this.id)
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
            content = `> <span>任务 <a href="http://localhost:8080/documents/${this.item.task.draft_id}/tasks/${this.item.task.id}">${this.item.task.title}</a> <span class="emphasized-date">${DateTime.DateMonth(this.item.task.deadline)}</span></span>`
            if (!this.item.content.startsWith('>')) {
              content += `\n> [@${this.item.task.creator.nickname}](http://localhost:8080)\n`
            }
            content += `\n${this.item.content}`
          } else {
            content = this.item.content
          }
          return content
        }
      },
      markdownContent() {
        let md = markdownit({
          html: true,
          breaks: true
        })
        return md.render(this.content)
      },
      id() {
        return `critique-${this.item.id}`
      }
    }
  }
</script>
