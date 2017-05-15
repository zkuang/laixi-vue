<template>
  <div class="doc-discussion">
    <div v-show="draft.removed" class="ui red message"><i class="large trash icon"></i>当前文文档在垃圾箱，处于锁定状态，不可修改。如需修改，可将文档先移出垃圾箱。</div>
    <breadcrumb></breadcrumb>
    <task-items class="task-items"></task-items>
  </div>
</template>

<style>

</style>

<script>
  import TaskItems from './TaskItems'
  import BreadCrumb from './BreadCrumb'
  import TaskAssignmentEditor from './TaskAssignmentEditor'
  import { mapGetters } from 'vuex'

  export default {
    name: 'DocDiscussion',
    components: {
      'task-items': TaskItems,
      'breadcrumb': BreadCrumb,
      'assignment-editor': TaskAssignmentEditor
    },
    beforeMount() {
      this.$store.dispatch('getDraftTasks', this.$route.params.did).then(() => {
        return this.$store.dispatch('getDraftPosts', this.$route.params.did)
      })
    },
    computed: {
      ...mapGetters([
        'draft'
      ])
    }
  }
</script>

