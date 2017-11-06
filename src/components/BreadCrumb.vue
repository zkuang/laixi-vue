<template>
<div class="ui breadcrumb">
  <a :href="projLink" class="section">{{project.name}}</a>
  <div class="divider"> / </div>
  <router-link :to="draftLink" class="section ellipsis">{{draft.title}}</router-link>
  <div v-if="hasTask" class="divider"> / </div>
  <div v-if="hasTask" class="section ellipsis"> {{taskBreadCrumb}} </div>
</div>
</template>

<style>
.ui.breadcrumb .section.ellipsis {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  name: 'BreadCrumb',
  computed: {
    ...mapGetters([
      'draft',
      'project',
      'task'
    ]),
    hasTask() {
      return this.$route.params.tid || this.$route.name === 'TaskList'
    },
    projLink() {
      return `/project/${this.project.id}/drafts`
    },
    draftLink() {
      return `/draft/${this.draft.id}`
    },
    taskBreadCrumb() {
      if (this.$route.name === 'TaskDiscussion') {
        return `任务：${this.$store.getters.task.title}`
      } else {
        return '所有任务'
      }
    }
  }
}
</script>
