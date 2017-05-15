<template>
  <section class="ui stackable two column grid">
    <div class="thirteen wide column draft-description section" id="draft">
      <h2>{{draft.title}}</h2>
      <p v-html="draft.content"></p>
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
  </section>
</template>

<style>
  .draft-description > h2 {
    font-weight: normal;
    font-size: 1.65em;
    margin-bottom: 1.15em;
  }

  .draft-description > p {
    font-size: 1.2em;
    text-align: justify;
  }

  .draft-description {
    padding-bottom: 2em;
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

  export default {
    name: 'Draft',
    methods: {
      edit() {
        this.$router.push({name: 'DraftEdit', params: {did: this.$route.params.did}})
      },
      print() {
        let printDivCSS = '<link href="/static/print-draft.css" rel="stylesheet" type="text/css">'
        window.frames['print-frame'].document.body.innerHTML = printDivCSS + document.getElementById('draft').innerHTML
        window.frames['print-frame'].window.focus()
        window.frames['print-frame'].window.print()
      },
      del() {
        let draft = Object.assign({}, this.draft)
        draft.removed = true
        this.$store.dispatch('updateDraft', draft)
      },
      undel() {
        let draft = Object.assign({}, this.draft)
        draft.removed = false
        this.$store.dispatch('updateDraft', draft)
      }
    },
    computed: {
      historyLink() {
        return `/document/history/${this.$route.params.did}`
      },
      ...mapGetters([
        'draft'
      ])
    }
  }
</script>
