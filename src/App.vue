<template>
<div id="app">
  <router-view></router-view>
  <discussion-editor v-show="!draft.removed && !draftEditing" ref="editor" :user="getCurrentUser" class="discussion-editor"></discussion-editor>
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
  mounted() {
    EventBus.$on('reply', item => {
      this.$refs.editor.updateContent(item)
    })

    EventBus.$on('api:error', response => {
      $(this.$el).find('#api-error-modal').modal({
        closable: true
      }).modal('show')
    })
  },
  computed: {
    ...mapGetters([
      'draft',
      'getCurrentUser'
    ]),
    draftEditing() {
      return this.$route.name === 'DraftEdit' || this.$route.name === 'DraftCreate'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: .9rem;
}

#app .ui.breadcrumb {
  font-size: 1.12em;
  margin-bottom: 1.8em;
}
</style>
