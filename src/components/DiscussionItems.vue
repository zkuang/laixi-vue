<template>
<section class="ui grid discussion-items">
  <ul class="fourteen wide column">
    <div v-if="!noMore" class="show-more-post" @click="showMorePost">
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
import DiscussionItem from './DiscussionItem'
export default {
  name: 'DiscussionItems',
  components: {
    'discussion-item': DiscussionItem
  },
  created () {
    this.$store.commit('initShowPostNumber')
  },
  methods: {
    showMorePost () {
      if (this.totalPosts - this.showPostNumber <= 0) return
      let routeName = this.$route.name
      if (routeName === 'DraftDiscussion') this.$store.dispatch('getDraftPosts', this.$route.params.did)
      if (routeName === 'TaskDiscussion') this.$store.dispatch('getTaskPosts', this.$route.params.tid)
    }
  },
  computed: {
    moreNumber() {
      let number = this.totalPosts - this.showPostNumber
      if (number < 0) return 0
      else return number
    },
    noMore () {
      let isAll = (this.totalPosts - this.showPostNumber) > 0
      if (isAll) return false
      else return true
    },
    ...mapGetters({
      currentUser: 'getCurrentUser',
      posts: 'posts',
      draft: 'draft',
      totalPosts: 'totalPosts',
      showPostNumber: 'showPostNumber'
    })
  }
}
</script>
