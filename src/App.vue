<template>
  <div id="app">
    <div class="ui breadcrumb">
      <a href="http://localhost:8080" class="section">{{project.name}}</a>
      <div class="divider"> / </div>
      <div class="section">{{draft.title}}</div>
      <div v-if="task.id" class="divider"> / </div>
      <div v-if="task.id" class="section"> {{taskBreadCrumb}} </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    computed: {
      ...mapGetters([
        'draft',
        'project',
        'task'
      ]),
      taskBreadCrumb() {
        return `任务：${this.$store.getters.task.title}`
      }
    },
    beforeCreate() {
      this.$store.dispatch('getDraftById', 'eac35a689bca4e40b96aea1b23ae198a')
        .then(() => {
          return this.$store.dispatch('getProjectById', '38d622955372466ba04c1ee18141daf0')
        })
        .then(() => {
          return this.$store.dispatch('getProjectMembers', '38d622955372466ba04c1ee18141daf0')
        })
        .then(() => {
          if (this.$route.params.tid) {
            return this.$store.dispatch('getTaskById', this.$route.params.tid)
          } else {
            return undefined
          }
        })
        .then(() => {
          this.$store.commit('setCurrentUser', this.$store.state.users[0])
        })
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: .9rem;
  }

  #app .ui.breadcrumb {
    font-size: 1.12em;
  }
</style>
