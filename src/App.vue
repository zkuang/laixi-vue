<template>
  <div id="app">
    <router-view></router-view>
    <discussion-editor v-show="!draft.removed && !draftEditing" ref="editor" :user="getCurrentUser" class="discussion-editor"></discussion-editor>
  </div>
</template>

<script>
  import DiscussionEditor from './components/DiscussionEditor'
  import { mapGetters } from 'vuex'
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
    },
    beforeCreate() {
      this.$store.dispatch('getDraftById', this.$route.params.did)
        .then(() => {
          return this.$store.dispatch('getProjectById', '38d622955372466ba04c1ee18141daf0')
        })
        .then(() => {
          return this.$store.dispatch('getProjectMembers', '38d622955372466ba04c1ee18141daf0')
        })
        .then(() => {
          if (this.$route.params.tid) {
            return this.$store.dispatch('getTaskById', this.$route.params.tid)
          } else {
            return undefined
          }
        })
        .then(() => {
          this.$store.commit('setCurrentUser', this.$store.state.users[0])
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
