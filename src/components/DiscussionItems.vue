<template>
<section class="ui grid discussion-items">
  <ul class="fourteen wide column">
    <discussion-item v-for="post in posts" key="post.id" :item="post" @reply="onReply" :disabled="draft.removed" :assignable="(post.type === 'critique' && (currentUser && currentUser.id === post.user.id))">
    </discussion-item>
  </ul>
  <div class="ui small modal" id="post-deletion-modal">
    <div class="content">
      <p>你确定要删除这条回复吗？</p>
    </div>
    <div class="actions">
      <div class="ui approve button">确定</div>
      <div class="ui cancel button">取消</div>
    </div>
  </div>
</section>
</template>

<style>
.discussion-items>ul {
  padding-left: 0;
}

.discussion-items>ul>li {
  line-height: 3rem;
  list-style: none;
  margin-bottom: 1rem;
}
</style>

<script>
import {
  mapGetters
} from 'vuex'
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
