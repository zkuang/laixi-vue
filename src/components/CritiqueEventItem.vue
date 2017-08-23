<template>
<div class="comment">
  <div class="discussion-item-avatar">
    <img :src="avatar" class="ui avatar image" />
  </div>
  <div class="discussion-item-content">
    <div class="critique-content">
      <p class="critique-meta"><span class="username">{{item.user.nickname}}</span> <span class="time-span">{{createdDate}}</span></p>
      <p v-html="markdownContent" class="critique-detail"></p>
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
blockquote>p>span {
  line-height: 2em;
}

.comment .critique-editor {
  display: none;
  width: 100%;
}

.critique-content .critique-meta span {
  font-weight: bold;
  font-size: 14px;
}

.critique-content .critique-detail {
  font-size: 14px;
}
</style>

<script>
import VueMarkdown from 'vue-markdown'
import { DateTime, Html } from '../utils'
import toMD from 'to-markdown'
import { mapGetters } from 'vuex'

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
      console.log(CKEDITOR.instances[this.id].getData())
      console.log(Html.mdEscapeHTML(CKEDITOR.instances[this.id].getData()))
      console.log(toMD(Html.mdEscapeHTML(CKEDITOR.instances[this.id].getData())))
      let data = Html.escapeHTML(toMD(Html.mdEscapeHTML(CKEDITOR.instances[this.id].getData())))
      const regex = />.*\(http:\/\/.*\/task\/(.*)\/\).*$/gm
      const draftId = this.draft.id
      let match = regex.exec(data)
      let taskId
      if (match !== null) {
        taskId = match[1]
        data = data.replace(regex, '').trim()
      }
      console.log(data)
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
      let content
      if (this.content.indexOf('<') > -1) {
        content = Html.mdUnescapeHTML(md.render(this.content))
      } else {
        content = md.render(Html.unescapeHTML(this.content))
      }
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
      'getCurrentUser',
      'draft'
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
    markdownContent() {
      let md = markdownit({
        html: true,
        breaks: true
      })
      if (this.item.content.indexOf('<') > -1) {
        return Html.mdUnescapeHTML(md.render(this.item.content))
      } else {
        return md.render(Html.unescapeHTML(this.item.content))
      }
    },
    id() {
      return `critique-${this.item.id}`
    }
  }
}
</script>
