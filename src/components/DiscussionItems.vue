<template>
<section class="ui grid discussion-items">
  <ul class="thirteen wide column">
    <discussion-item v-for="item in items" key="item.id" :item="item" @reply="onReply"></discussion-item>
  </ul>
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
import DiscussionItem from './DiscussionItem'
export default {
  name: 'DiscussionItems',
  props: ['items'],
  components: {
    'discussion-item': DiscussionItem
  },
  methods: {
    onReply(item) {
      this.$emit('reply', item)
    }
  }
}
</script>
