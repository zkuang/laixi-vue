<template>
<div class="doc-discussion">
  <div v-show="draft.removed" class="ui red message"><i class="large trash icon"></i>当前文文档在垃圾箱，处于锁定状态，不可修改。如需修改，可将文档先移出垃圾箱。</div>
  <breadcrumb></breadcrumb>
  <draft class="document"></draft>
  <task-items class="task-items"></task-items>
  <discussion-items class="discussion-items"></discussion-items>
</div>
</template>

<script>
import Draft from './Draft'
import TaskItems from './TaskItems'
import DiscussionItems from './DiscussionItems'
import BreadCrumb from './BreadCrumb'
import TaskAssignmentEditor from './TaskAssignmentEditor'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'DocDiscussion',
  components: {
    draft: Draft,
    'task-items': TaskItems,
    'discussion-items': DiscussionItems,
    'breadcrumb': BreadCrumb,
    'assignment-editor': TaskAssignmentEditor
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
.task-items {
  margin-top: 2em;
  margin-left: -50px;
}
</style>
