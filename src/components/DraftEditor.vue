<template>
<form class="ui form draft-editor">
  <input type="text" name="draft-title" maxlength="20" placeholder="输入标题" :value="title">
  <textarea type="text" name="draft-content" placeholder="输入内容" :value="content"></textarea>
  <div class="draft-editor-toolbar">
    <button class="ui basic button" @click.prevent="dismiss">关闭</button>
    <button class="ui basic positive button" @click.prevent="saveAndQuite">保存并关闭</button>
    <button class="ui basic positive button" @click.prevent="save">保存并继续修改</button>
  </div>
</form>
</template>

<style>
.ui.form.draft-editor {
  margin-left: auto;
  margin-right: auto;
  width: 705px;
  margin-bottom: 40px;
}

.ui.form.draft-editor input[type=text] {
  display: block;
  width: 80%;
  padding: 40px 0 30px;
  margin: 0 auto;
  border: 0;
  font-size: 22px;
  height: 22px;
  min-height: 22px;
  line-height: 1.4;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  resize: none;
  outline: 0;
  background: transparent;
}

.ui.form.draft-editor input[type=text]:focus {
  background: transparent;
}

.ui.form.draft-editor input[type=text]::placeholder {
  font-weight: normal;
}

.ui.form.draft-editor textarea:not([row]) {
  min-height: 600px;
  max-height: 600px;
  margin: 1em auto 0 auto;
  padding: 2em 10px 2em 15px;
  font-size: 16px;
  line-height: 1.6;
  border: none;
  border-radius: 0;
  border-top: 1px solid #e3e3e3;
  outline: 0;
  background: transparent;
  resize: none
}

.ui.form.draft-editor .draft-editor-toolbar {
  z-index: 100;
  border-top: 1px solid #e3e3e3;
  padding: 2em 0em;
  height: 4.8em;
}

.draft-editor-toolbar .button {
  float: right;
  margin-left: .8em !important;
}

.draft-editor-toolbar .button:first-child {
  float: right;
  margin-right: 15px !important;
}
</style>

<script>
import { mapGetters } from 'vuex'

// import { Html } from '../utils'

export default {
  name: 'draft-editor',
  computed: {
    title() {
      if (this.$route.name === 'DraftEdit') {
        return this.draft.title
      }
    },
    content() {
      if (this.$route.name === 'DraftEdit') {
        // return Html.rawEditUnescapeHTML(this.draft.rawContent)
        return this.draft.content
      }
    },
    ...mapGetters(['draft', 'project'])
  },
  methods: {
    save() {
      let text = $(this.$el).find('textarea:not([row])')
      let title = $(this.$el).find('input[type=text]')
      let contentTxt = text.val()
      let titleTxt = title.val()
      if (!contentTxt || !titleTxt) {
        return
      }
      if (contentTxt === this.draft.content && titleTxt === this.draft.title) {
        return
      }
      let draft = {}
      if (this.$route.name === 'DraftEdit') {
        draft = Object.assign({}, this.draft)
        // draft.content = Html.rawEscapeHTML(contentTxt)
        draft.content = contentTxt
        draft.title = titleTxt
        this.$store.dispatch('updateDraft', draft)
      } else {
        // draft.content = Html.rawEscapeHTML(contentTxt)
        draft.content = contentTxt
        draft.title = titleTxt
        draft.project_id = this.project.id
        this.$store.dispatch('createDraft', draft)
      }
    },
    saveAndQuite() {
      let text = $(this.$el).find('textarea:not([row])')
      let title = $(this.$el).find('input[type=text]')
      let contentTxt = text.val()
      let titleTxt = title.val()
      if (!contentTxt || !titleTxt) {
        return
      }
      if (contentTxt === this.draft.content && titleTxt === this.draft.title) {
        return
      }
      let draft = {}
      if (this.$route.name === 'DraftEdit') {
        draft = Object.assign({}, this.draft)
        // draft.content = Html.rawEscapeHTML(contentTxt)
        draft.content = contentTxt
        draft.title = titleTxt
        this.$store.dispatch('updateDraft', draft).then(() => {
          this.$router.push({
            name: 'DraftDiscussion',
            params: {
              did: this.draft.id
            }
          })
        })
      } else {
        // draft.content = Html.rawEscapeHTML(contentTxt)
        draft.content = contentTxt
        draft.title = titleTxt
        draft.project_id = this.project.id
        this.$store.dispatch('createDraft', draft).then(res => {
          this.$router.push({
            name: 'DraftDiscussion',
            params: {
              did: res.id
            }
          })
        })
      }
    },
    dismiss() {
      if (this.$route.name === 'DraftEdit') {
        this.$router.push({
          name: 'DraftDiscussion',
          params: {
            did: this.draft.id
          }
        })
      } else {
        window.location.href = `/project/${this.project.id}/drafts`
      }
    }
  }
}
</script>
