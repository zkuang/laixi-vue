<template>
  <div class="task-discussion">
    <div v-show="draft.removed" class="ui red message"><i class="large trash icon"></i>当前文文档在垃圾箱，处于锁定状态，不可修改。如需修改，可将文档先移出垃圾箱。</div>
    <breadcrumb></breadcrumb>
    <task :task="task" class="task"></task>
    <discussion-items :items="posts" class="discussion-items" @reply="onReply"></discussion-items>
    <discussion-editor v-show="!draft.removed" ref="editor" :user="getCurrentUser" class="discussion-editor"></discussion-editor>
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
        'posts',
        'draft'
      ])
    }
  }
</script>
