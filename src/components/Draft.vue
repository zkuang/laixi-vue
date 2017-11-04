<template>
<section class="ui stackable two column grid">
  <div class="thirteen wide pc thirteen wide tablet column draft-description section" id="draft">
    <h4>{{draft.title}}</h4>
    <pre v-html="content" class="draft-content-pre"></pre>
  </div>
  <div v-if="draft.removed" class="three wide column ui secondary vertical menu buttons">
    <div class="item">
      <a class="ui positive basic button" @click="undel">移出归档</a>
    </div>
    <div class="item">
      <a class="ui secondary basic button" :href="historyLink">修改历史</a>
    </div>
  </div>
  <div v-else class="three wide computer three wide tablet sixteen wide mobile column ui secondary vertical menu buttons">
    <div class="item">
      <a class="ui positive basic button fluid" @click="edit">修改</a>
    </div>
    <div class="item">
      <a class="ui secondary basic button fluid" :href="historyLink">历史</a>
    </div>
    <div class="item">
      <a class="ui secondary basic button fluid" @click="print">打印</a>
    </div>
    <div class="item">
      <a class="ui negative basic button fluid" @click="del">删除</a>
    </div>
  </div>
  <iframe name="print-frame" width="0" height="0" frameborder="0" src="about:blank"></iframe>
  <div class="ui basic modal" id="draft-deletion-modal">
    <div class="content">
      <p v-show="!draft.removed">
        为保留完整工作记录，维护各方利益，删除的文档将会放在归档了。
      </p>
      <p>{{modalAction}}</p>
    </div>
    <div class="actions">
      <div class="ui inverted cancel button">取消</div>
      <div class="ui red inverted ok approve button">确定</div>
    </div>
  </div>
</section>
</template>

<style>
.draft-description>h4 {
  font-weight: normal;
  margin-bottom: 1.15em;
  font-size: 18px;
}

.draft-description>.draft-content-pre {
  font-size: 16px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  overflow-x: auto;
  max-width: 720px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Noto Sans CJK SC, WenQuanYi Micro Hei, Arial, sans-serif;
  line-height: 2;
  min-height: 132px;
}

.draft-description>p {
  /*font-size: 1.2em;*/
  text-align: justify;
  min-height: 140px;
}

.ui.grid>.draft-description {
  padding-bottom: 2em !important;
  padding-top: 1em !important;
}

.ui.secondary.vertical.menu.buttons {
  margin-top: 0;
}

.ui.secondary.vertical.menu.buttons .item {
  padding: 0.78571429em 0 0.78571429em 1.35em;
  margin-bottom: 0;
  margin-right: 0;
  margin-left: 28px;
}

/*.ui.secondary.vertical.menu.buttons .item .button {
  padding: 0.75071429em 1.25em;
}*/
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
          window.location.replace(`/project/${self.project.id}/archive/`)
        }
      }).modal('show')
    },
    undel() {
      let self = this
      $('#draft-deletion-modal').modal({
        closable: true,
        onApprove: function () {
          self.draft.removed = false
          self.$store.dispatch('undelDraft', self.draft.id)
          // window.location.replace(`/draft/${self.draft.id}`)
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
      if (this.draft.removed) return '确定将文档移出归档?'
      else return '确定将文档归档?'
    },
    content() {
      if (this.draft.content.indexOf('>') > -1 || this.draft.content.indexOf('<') > -1) {
        console.log(this.draft.content)
        // let a = Html.rawEscapeHTML(this.draft.content)
        // let b = Html.rawUnescapeHTML(a).replace(/&lt;(br *\/)&gt;/g, '<$1>')
        // return b
        return Html.escapeHTML(this.draft.content).replace(/(?:\r\n|\r|\n)/g, '<br />')
      } else {
        // return Html.rawUnescapeHTML(this.draft.content)
        return this.draft.content
      }
    }
  }
}
</script>
