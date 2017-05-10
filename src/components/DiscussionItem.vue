<template>
<li class="discussion-item" :class="style" @mouseover="active" @mouseleave="deactive">
  <taskitem :item="item" v-if="isTask" class="task-log">
  </taskitem>
  <draftitem :item="item" v-else-if="isDraft" class="doc-log">
  </draftitem>
  <critiqueitem :item="item" v-else class="comment">
  </critiqueitem>
  <div class="right floated ui icon buttons">
    <button class="ui button" @click="reply">
        <i class="reply icon"></i>
      </button>
    <button :class="{hidden: notEditable}" class="ui button has-popup">
        <i class="content icon"></i>
      </button>
  </div>

</li>
</template>

<style>
.discussion-item {
  font-size: 1.5em;
  color: gray;
}

.discussion-item>div:first-child {
  display: inline-block;
  width: 90%;
}

.discussion-item>.ui.buttons {
  display: none;
}

.discussion-item.active>.ui.buttons {
  display: inline-flex;
}

.discussion-item .ui.icon.buttons .button {
  background: transparent;
  padding: .5em;
  color: lightgrey;
}

.discussion-item .ui.icon.buttons .button>i.icon {
  font-size: 1.2em;
}

.discussion-item .task-log {
  color: black;
}

.discussion-item>div>span {
  font-size: .8em;
}

.discussion-item>div.task-log .time-span,
.discussion-item>div.doc-log .time-span {
  color: gray;
  font-size: 1.2rem;
  margin-left: 5rem;
}

.discussion-item>div.task-log .username {
  font-weight: bold;
}

.discussion-item>div.comment .username {
  font-size: 1.1em;
}

.discussion-item>div .task-link {
  font-size: 1.1rem;
  font-weight: bold;
}

.discussion-item span {
  white-space: pre;
}

.discussion-item>div>span.discussion-item-avatar {
  font-size: 1.08em;
}

.discussion-item>div>span.discussion-item-avatar>i {
  margin: 0 .5rem 0 2rem;
}

.discussion-item .discussion-item-avatar .ui.avatar.image {
  width: 3.5rem;
  height: 3.5rem;
  margin-left: .8rem;
}

.discussion-item .discussion-item-avatar {
  display: inline-block;
  position: absolute;
}

.discussion-item .discussion-item-content {
  display: inline-block;
  margin-left: 5.5rem;
}

.discussion-item .comment {
  font-size: medium;
  position: relative;
}

.emphasized-date {
  background: #e2e2e2;
  border-radius: 1em;
}

.discussion-item .emphasized-date {
  font-size: 1rem;
  padding: .4rem 1.2rem .2rem 1.2rem;
  color: #3D3E3F;
  margin-left: .5em;
}

.discussion-item-content .username {
  color: black;
}

.discussion-item-content .content {
  color: black;
}

.discussion-item-content blockquote {
  display: block;
  margin-left: 0;
  padding-left: 1rem;
  border-style: solid;
  border-color: #ccc;
  border-width: 0;
  border-left-width: .4rem;
}

.discussion-item-content blockquote p {
  margin-bottom: 0;
}

.right.floated.ui.icon.buttons .button {
  margin-top: .5em;
}

.ui.button.in-popup {
  background: transparent;
  display: block;
  padding: .5em;
  margin-right: 0;
}

.ui.button.hidden {
  visibility: hidden;
}

.ui.button.in-popup:hover {
  background: transparent;
  color: red;
}

.ui.button.in-popup i.icon {
  font-size: 1.2em;
}
</style>

<script>

import DraftItem from './DraftEventItem'
import TaskItem from './TaskEventItem'
import CritiqueItem from './CritiqueEventItem'
export default {
  name: 'DiscussionItem',
  props: ['item', 'disabled'],
  components: {
    draftitem: DraftItem,
    taskitem: TaskItem,
    critiqueitem: CritiqueItem
  },
  methods: {
    active() {
      if (this.disabled) {
        return
      }
      $(this.$el).addClass('active')
    },
    deactive() {
      $(this.$el).removeClass('active')
    },
    reply() {
      this.$emit('reply', this.item)
    }
  },
  mounted() {
    $('.has-popup').popup({
      position: 'bottom center',
      hoverable: true,
      html: `<div><button class="ui button in-popup">修改</button><button class="ui button in-popup">删除</button></div>`
    })
  },
  computed: {
    isTask() {
      console.log(`${this.item.id} ${this.item.type}`)
      return this.item.type === 'task-created' || this.item.type === 'task-edited' ||
        this.item.type === 'task-checked' || this.item.type === 'task-unchecked'
    },
    isDraft() {
      return this.item.type === 'draft-created' || this.item.type === 'draft-edited'
    },
    style() {
      if (this.isDraft) return 'discussion-doc-log'
      else if (this.isTask) return 'discussion-task-log'
      else return 'discussion-comment-log'
    },
    notEditable () {
      if (this.item.type !== 'critique') return true
      const currentUser = this.$store.getters.getCurrentUser
      if (!currentUser) return true
      else return currentUser.id !== this.item.user.id
    }
  }
}
</script>
