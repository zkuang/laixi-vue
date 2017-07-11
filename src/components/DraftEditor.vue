<template>
<form class="ui form draft-editor">
  <input type="text" name="draft-title" placeholder="文档标题" :value="title">
  <textarea type="text" name="draft-content" placeholder="文档内容" :value="content"></textarea>
  <div class="draft-editor-toolbar">
    <button class="ui positive button" @click.prevent="save">保存</button>
    <button class="ui basic button" @click.prevent="dismiss">取消</button>
  </div>
</form>
</template>

<style>
.ui.form.draft-editor {
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  background: #f5f5dc;
}

.ui.form.draft-editor input[type=text] {
  display: block;
  width: 80%;
  padding: 30px 0 20px;
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

.ui.form.draft-editor textarea:not([row]) {
  min-height: 600px;
  max-height: 600px;
  margin: 1em auto 0 auto;
  padding: 0 50px 60px;
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
  padding: 1em 3em;
}
</style>

<script>
import {
  mapGetters
} from 'vuex'
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
        return this.draft.rawContent
      }
    },
    ...mapGetters(['draft'])
  },
  methods: {
    save() {
      let text = $(this.$el).find('textarea:not([row])')
      let title = $(this.$el).find('input[type=text]')
      let contentTxt = text.val()
      let titleTxt = title.val()
      if (!contentTxt || !titleTxt) {
        console.log('should show error message')
        return
      }
      if (contentTxt === this.draft.title && titleTxt === this.draft.title) {
        console.log('no changes......')
        return
      }
      let draft
      if (this.$route.name === 'DraftEdit') {
        draft = Object.assign({}, this.draft)
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
      }
    },
    dismiss() {
      this.$router.push({
        name: 'DraftDiscussion',
        params: {
          did: this.draft.id
        }
      })
    }
  }
}
</script>
