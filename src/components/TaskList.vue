<template>
<div class="doc-discussion">
  <div v-show="draft.removed" class="ui red message"><i class="large trash icon"></i>当前文文档在垃圾箱，处于锁定状态，不可修改。如需修改，可将文档先移出垃圾箱。</div>
  <breadcrumb></breadcrumb>
  <task-items class="task-items"></task-items>
  <!-- <discussion-items class="discussion-items"></discussion-items> -->
</div>
</template>

<style>
.doc-discussion .ui.grid.task-items {
  margin-top: 0;
}
</style>

<script>
import TaskItems from './TaskItems'
import BreadCrumb from './BreadCrumb'
import TaskAssignmentEditor from './TaskAssignmentEditor'
import DiscussionItems from './DiscussionItems'

import {
  mapGetters
} from 'vuex'

export default {
  name: 'DocDiscussion',
  components: {
    'task-items': TaskItems,
    'breadcrumb': BreadCrumb,
    'assignment-editor': TaskAssignmentEditor,
    'discussion-items': DiscussionItems
  },
  computed: {
    ...mapGetters([
      'draft'
    ])
  }
}
</script>
