<template>
  <section class="ui grid discussion-items">
    <ul class="thirteen wide column">
      <discussion-item v-for="post in posts" key="post.id" :item="post" @reply="onReply" :disabled="draft.removed"
                       :assignable="(post.type === 'critique' && (currentUser && currentUser.id === post.user.id))">
      </discussion-item>
    </ul>
  </section>
</template>

<style>
  .discussion-items > ul {
    padding-left: 0;
  }

  .discussion-items > ul > li {
    line-height: 3rem;
    list-style: none;
    margin-bottom: 1rem;
  }
</style>

<script>
  import {mapGetters} from 'vuex'
  import DiscussionItem from './DiscussionItem'
  export default {
    name: 'DiscussionItems',
    components: {
      'discussion-item': DiscussionItem
    },
    computed: {
      ...mapGetters({
        currentUser: 'getCurrentUser',
        posts: 'posts',
        draft: 'draft'
      })
    },
    methods: {
      onReply(item) {
        this.$emit('reply', item)
      }
    }
  }
</script>
