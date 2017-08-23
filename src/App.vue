<template>
<div v-show="dataReady" id="app">
  <router-view></router-view>
  <discussion-editor v-show="editorShouldShow" ref="editor" :user="getCurrentUser" class="discussion-editor"></discussion-editor>
  <div class="ui small modal" id="api-error-modal">
    <div class="content">
      <p>与服务器通信发生错误，请重试。</p>
    </div>
    <div class="actions">
      <div class="ui approve button">确定</div>
    </div>
  </div>
</div>
</template>

<script>
import DiscussionEditor from './components/DiscussionEditor'
import {
  mapGetters
} from 'vuex'
import EventBus from './EventBus'

export default {
  name: 'app',
  components: {
    'discussion-editor': DiscussionEditor
  },
  data() {
    return {
      dataReady: false
    }
  },
  mounted() {
    EventBus.$on('reply', item => {
      this.$refs.editor.updateContent(item)
    })

    EventBus.$on('api:error', response => {
      $(this.$el).find('#api-error-modal').modal({
        closable: true
      }).modal('show')
    })
    EventBus.$on('route:dataFetch', () => {
      this.dataReady = false
    })
    EventBus.$on('route:dataReady', () => {
      this.dataReady = true
    })
  },
  computed: {
    ...mapGetters([
      'draft',
      'getCurrentUser',
      'posts'
    ]),
    editorShouldShow() {
      return !this.draft.removed &&
        (this.$route.name !== 'DraftEdit' && this.$route.name !== 'DraftCreate')
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: .9rem;

  max-width: 1150px;
  margin-left: auto;
  margin-right: auto;
  padding-right: 3em;
}

#app .ui.breadcrumb {
  margin-bottom: 1.8em;
}
</style>
