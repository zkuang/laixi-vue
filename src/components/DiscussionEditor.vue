<template>
  <div class="discussion-editor">
    <div class="discussion-item-avatar">
      <img :src="avatar" class="circle avatar"/>
    </div>
    <div>
      <textarea rows="5"></textarea>

    </div>
  </div>
</template>

<style>

</style>

<script>
  export default {
    name: 'DiscussionEditor',
    props: ['user'],
    computed: {
      avatar () {
        return this.user.avatar
      }
    }
  }
</script>
