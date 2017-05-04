<template>
  <div class="task-discussion">
    <breadcrumb></breadcrumb>
    <task :task="task" class="task"></task>
    <discussion-items :items="posts" class="discussion-items" @reply="onReply"></discussion-items>
    <discussion-editor ref="editor" :user="getCurrentUser" class="discussion-editor"></discussion-editor>
  </div>
</template>

<style>
  .task-discussion {
    padding-top: 1.8em;
  }

  .discussion-items {
    margin-top: 0!important;
  }
</style>

<script>
  import { mapGetters } from 'vuex'
  import Task from './Task'
  import DiscussionItems from './DiscussionItems'
  import DiscussionEditor from './DiscussionEditor'
  import BreadCrumb from './BreadCrumb'

  export default {
    name: 'TaskDiscussion',
    components: {
      task: Task,
      'discussion-items': DiscussionItems,
      'discussion-editor': DiscussionEditor,
      'breadcrumb': BreadCrumb
    },
    beforeMount () {
      this.$store.dispatch('getTaskPosts', this.$route.params.tid)
    },
    methods: {
      onReply(item) {
        this.$refs.editor.updateContent(item)
      }
    },
    computed: {
      ...mapGetters([
        'task',
        'getCurrentUser',
        'posts'
      ])
    }
  }
</script>
