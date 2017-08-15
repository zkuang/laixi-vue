<template>
<section class="ui stackable two column grid">
  <div class="thirteen wide column draft-description section" id="draft">
    <h2>{{draft.title}}</h2>
    <pre v-html="content"></pre>
  </div>
  <div v-if="draft.removed" class="three wide column ui secondary vertical menu buttons">
    <div class="item">
      <a class="ui positive basic button" @click="undel">移除垃圾桶</a>
    </div>
  </div>
  <div v-else class="three wide column ui secondary vertical menu buttons">
    <div class="item">
      <a class="ui positive basic button" @click="edit">修改</a>
    </div>
    <div class="item">
      <a class="ui secondary basic button" :href="historyLink">修改历史</a>
    </div>
    <div class="item">
      <a class="ui secondary basic button" @click="print">打印</a>
    </div>
    <div class="item">
      <a class="ui negative basic button" @click="del">删除</a>
    </div>
  </div>
  <iframe name="print-frame" width="0" height="0" frameborder="0" src="about:blank"></iframe>
  <div class="ui small modal" id="draft-deletion-modal">
    <div class="content">
      <p>你确定要{{modalAction}}这个文档吗？</p>
    </div>
    <div class="actions">
      <div class="ui approve button">确定</div>
      <div class="ui cancel button">取消</div>
    </div>
  </div>
</section>
</template>

<style>
.draft-description>h2 {
  font-weight: normal;
  margin-bottom: 1.15em;
}

.draft-description>p {
  /*font-size: 1.2em;*/
  text-align: justify;
  min-height: 140px;
}

.ui.grid>.draft-description {
  padding-bottom: 2em !important;
  padding-top: 2em !important;
}

.ui.secondary.vertical.menu.buttons {
  margin-top: 0;
}

.ui.secondary.vertical.menu.buttons .item {
  padding: 0.78571429em 1.35em;
  margin-bottom: 0;
}

.ui.secondary.vertical.menu.buttons .item .button {
  padding: 0.75071429em 1.25em;
}
</style>

<script>
import { mapGetters } from 'vuex'
import { Html } from '../utils'

export default {
  name: 'Draft',
  methods: {
    edit() {
      this.$router.push({
        name: 'DraftEdit',
        params: {
          did: this.draft.id
        }
      })
    },
    print() {
      let printDivCSS = '<link href="/css/print-draft.css" rel="stylesheet" type="text/css">'
      window.frames['print-frame'].document.body.innerHTML = printDivCSS + document.getElementById('draft').innerHTML
      window.frames['print-frame'].window.focus()
      window.frames['print-frame'].window.print()
    },
    del() {
      let self = this
      $('#draft-deletion-modal').modal({
        closable: true,
        onApprove: function () {
          self.$store.dispatch('delDraft', self.draft.id)
          window.location.replace(`/project/${self.project.id}/drafts`)
        }
      }).modal('show')
    },
    undel() {
      let self = this
      $('#draft-deletion-modal').modal({
        closable: true,
        onApprove: function () {
          self.$store.dispatch('delDraft', self.draft.id)
          window.location.replace(`/project/${self.project.id}/drafts`)
        }
      }).modal('show')
    }
  },
  computed: {
    historyLink() {
      return `/draft/${this.draft.id}/versions/`
    },
    ...mapGetters([
      'draft',
      'project'
    ]),
    modalAction() {
      if (this.draft.removed) return '恢复'
      else return '删除'
    },
    content() {
      if (this.draft.content.indexOf('>') > -1 || this.draft.content.indexOf('<') > -1) {
        console.log(this.draft.content)
        let a = Html.rawEscapeHTML(this.draft.content)
        console.log(a)
        let b = Html.rawUnescapeHTML(a).replace(/&lt;(br *\/)&gt;/g, '<$1>')
        console.log(b)
        return b
      } else {
        return Html.rawUnescapeHTML(this.draft.content)
      }
    }
  }
}
</script>
