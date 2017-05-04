<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    beforeCreate() {
      this.$store.dispatch('getDraftById', this.$route.params.did)
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
    margin-bottom: 1.8em;
  }
</style>
