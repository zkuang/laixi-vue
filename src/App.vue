<template>
  <div id="app">
    <div class="ui breadcrumb">
      <a :href="document.project.uri" class="section">{{document.project.name}}</a>
      <div class="divider"> / </div>
      <div class="section">{{document.title}}</div>
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
        'document'
      ])
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
