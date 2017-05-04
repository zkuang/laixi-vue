<template>
  <div class="ui breadcrumb">
    <a href="http://localhost:8080" class="section">{{project.name}}</a>
    <div class="divider"> / </div>
    <div class="section">{{draft.title}}</div>
    <div v-if="task.id" class="divider"> / </div>
    <div v-if="task.id" class="section"> {{taskBreadCrumb}} </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'BreadCrumb',
    computed: {
      ...mapGetters([
        'draft',
        'project',
        'task'
      ]),
      taskBreadCrumb() {
        return `任务：${this.$store.getters.task.title}`
      }
    }
  }

</script>
