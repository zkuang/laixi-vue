<template>
<div class="ui breadcrumb">
  <router-link :to="projLink" class="section">{{project.name}}</router-link>
  <div class="divider"> / </div>
  <router-link :to="draftLink" class="section">{{draft.title}}</router-link>
  <div v-if="hasTask" class="divider"> / </div>
  <div v-if="hasTask" class="section"> {{taskBreadCrumb}} </div>
</div>
</template>

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
      return `/project/${this.project.id}`
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
