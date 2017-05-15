<template>
  <div class="comment">
    <div class="discussion-item-avatar">
      <img :src="avatar" class="ui avatar image"/>
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
  import {mapGetters} from 'vuex'

  export default {
    name: 'CritiqueItem',
    props: ['item'],
    components: {
      markdown: VueMarkdown
    },
//    mounted() {
//      let self = this
//      setTimeout(() => {
//        if (self.editable && !CKEDITOR.instances[self.id]) {
//          CKEDITOR.replace(self.id)
//        }
//      }, 500)
//    },
    methods: {
      save() {
        let data = toMD(CKEDITOR.instances[this.id].getData())
        const regex = />.*\(http:\/\/.*\/projects\/.*\/drafts\/.*\/tasks\/(.*)\).*$/gm
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
        this.hideEditor()
        setTimeout(() => {
          this.destroyEditor()
        }, 200)
      },
      dismiss() {
        this.hideEditor()
        this.destroyEditor()
        this.$emit('critique-dismiss')
      },
      showEditor() {
        let md = markdownit({
          html: true,
          breaks: true
        })
        let content = md.render(this.content)
        CKEDITOR.replace(this.id)
        setTimeout(() => {
          $(this.$el).find('.critique-content').hide()
          $(this.$el).find('.critique-editor').show()
          $(this.$el).find('.cke_top').hide()
          CKEDITOR.instances[this.id].setData(content)
        }, 100)
      },
      hideEditor() {
        $(this.$el).find('.critique-editor').hide()
        $(this.$el).find('.critique-content').show()
      },
      destroyEditor() {
        let instance = CKEDITOR.instances[this.id]
        instance.removeAllListeners()
        instance.destroy()
        CKEDITOR.remove(instance)
        $(this.$el).find(`#cke_${this.id}`).remove()
      }
    },
    computed: {
      ...mapGetters([
        'getCurrentUser'
      ]),
      editable() {
        return (this.getCurrentUser && this.getCurrentUser.id === this.item.user.id)
      },
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
            content = `> <span>任务 <a href="http://localhost:8080/projects/${this.$route.params.pid}/drafts/${this.item.task.draft_id}/tasks/${this.item.task.id}">${this.item.task.title}</a> <span class="emphasized-date">${DateTime.DateMonth(this.item.task.deadline)}</span></span>`
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
