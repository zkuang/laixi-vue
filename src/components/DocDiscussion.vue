<template>
<div class="doc-discussion">
  <draft :draft="draft" class="document"></draft>
  <task-items class="task-items"></task-items>
  <discussion-items :items="posts" class="discussion-items" @reply="onReply"></discussion-items>
  <discussion-editor ref="editor" :user="getCurrentUser" class="discussion-editor"></discussion-editor>
</div>
</template>

<script>
import Draft from './Draft'
import TaskItems from './TaskItems'
import DiscussionItems from './DiscussionItems'
import DiscussionEditor from './DiscussionEditor'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'DocDiscussion',
  components: {
    draft: Draft,
    'task-items': TaskItems,
    'discussion-items': DiscussionItems,
    'discussion-editor': DiscussionEditor
  },
  beforeMount() {
    this.$store.dispatch('getDraftTasks', this.$route.params.id).then(() => {
      return this.$store.dispatch('getDraftPosts', this.$route.params.id)
    })
  },
  methods: {
    onReply(item) {
      this.$refs.editor.updateContent(item)
    }
  },
  computed: {
    ...mapGetters([
      'draft',
      'getCurrentUser',
      'posts'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.doc-discussion {
  padding-top: 1.8em;
}

.task-items {
  margin-top: 2em;
  margin-left: -50px;
}
</style>
