<template>
  <div class="doc-discussion">
    <document :document="document" class="document"></document>
    <task-items class="task-items"></task-items>
    <discussion-items class="discussion-items"></discussion-items>
    <discussion-editor :user="getCurrentUser" class="discussion-editor"></discussion-editor>
  </div>
</template>

<script>
  import Document from './Document'
  import TaskItems from './TaskItems'
  import DiscussionItems from './DiscussionItems'
  import DiscussionEditor from './DiscussionEditor'
  import {mapGetters} from 'vuex'

  export default {
    name: 'DocDiscussion',
    components: {
      document: Document,
      'task-items': TaskItems,
      'discussion-items': DiscussionItems,
      'discussion-editor': DiscussionEditor
    },
    beforeMount () {
      this.$store.dispatch('getDocumentById', this.$route.params.id)
    },
    computed: {
      ...mapGetters([
        'document',
        'getCurrentUser'
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
