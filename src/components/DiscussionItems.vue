<template>
<section class="ui grid discussion-items">
  <ul class="fourteen wide column">
    <div v-if="hasNextPage" class="show-more-post" @click="showMorePost">
      <i class="comment icon icon-posts-style"></i>
      <span class="show-post-txt">显示更多的{{ moreNumber }}条评论</span>
    </div>
    <discussion-item v-for="post in posts" key="post.id" :item="post" :disabled="draft.removed" :assignable="(post.type === 'critique' && (currentUser && currentUser.id === post.user.id))">
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

.discussion-items > ul > .show-more-post {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin: 0px 2.3em;
  margin-bottom: 1.5em;
  cursor: pointer;
}

.discussion-items > ul > .show-more-post > .icon-posts-style{
  font-size: 1.5em;
  color: #4183C4;
  transition: color .5s;
}

.discussion-items > ul > .show-more-post:hover > .icon-posts-style{
  color: #1e70bf;
}

.discussion-items > ul > .show-more-post > .show-post-txt {
  font-size: 1.25em;
  color: #4183C4;
  transition: color .5s;
}

.discussion-items > ul > .show-more-post:hover > .show-post-txt{
  color: #1e70bf;
}
</style>

<script>
import {
  mapGetters
} from 'vuex'
import { Page } from '@/utils.js'
import DiscussionItem from './DiscussionItem'
export default {
  name: 'DiscussionItems',
  components: {
    'discussion-item': DiscussionItem
  },
  methods: {
    showMorePost () {
      if (this.totalPosts - this.posts.length <= 0) return
      let routeName = this.$route.name
      if (routeName === 'DraftDiscussion') this.$store.dispatch('getDraftPosts', {draftId: this.$route.params.did, pageNumber: this.pageNumber + 1})
      if (routeName === 'TaskDiscussion') this.$store.dispatch('getTaskPosts', {draftId: this.$route.params.tid, pageNumber: this.pageNumber + 1})
    }
  },
  computed: {
    moreNumber() {
      let number = this.totalPosts - this.posts.length
      if (number < 0) return 0
      else return number
    },
    pageNumber() {
      return Page.getPageNumber(this.posts.length)
    },
    ...mapGetters({
      currentUser: 'getCurrentUser',
      posts: 'posts',
      draft: 'draft',
      totalPosts: 'totalPosts',
      hasNextPage: 'hasNextPage'
    })
  }
}
</script>
