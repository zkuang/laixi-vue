<template>
  <div class="task-discussion">
    <task :task="task" :document="document" class="task"></task>
    <discussion-items :items="discussions" class="discussion-items"></discussion-items>
    <!--<discussion-editor :user="getCurrentUser" class="discussion-editor"></discussion-editor>-->
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

  export default {
    name: 'TaskDiscussion',
    components: {
      task: Task,
      'discussion-items': DiscussionItems
    },
    beforeMount () {
      this.$store.dispatch('getDocumentById', this.$route.params.did)
      const params = {did: this.$route.params.did, tid: this.$route.params.tid}
      this.$store.dispatch('getTaskByIdInDocument', params)
    },
    computed: {
      ...mapGetters([
        'document',
        'task',
        'getCurrentUser'
      ]),
      discussions () {
        return this.task.discussions
      }
    }
  }
</script>
