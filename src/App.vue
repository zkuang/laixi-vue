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
import {
  currentUser
} from './api/index'
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
  beforeCreate() {
    console.log(currentUser)
    this.$store.commit('setCurrentUser', currentUser)
    this.$store.dispatch('getDraftById', this.$route.params.did)
      .then(() => {
        return this.$store.dispatch('getProjectById', this.$route.params.pid)
      })
      .then(() => {
        return this.$store.dispatch('getProjectMembers', this.$route.params.pid)
      })
      .then(() => {
        if (this.$route.params.tid) {
          return this.$store.dispatch('getTaskById', this.$route.params.tid)
        } else {
          return undefined
        }
      })
  },
  computed: {
    ...mapGetters([
      'draft',
      'getCurrentUser'
    ]),
    draftEditing() {
      return this.$route.name === 'DraftEdit' || this.$route.name === 'DraftCreate' || this.$route.name === 'TaskList'
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
