<template>
  <section class="ui grid discussion-editor">
    <div class="ten wide column">
      <div class="discussion-item-avatar">
        <img v-if="user" :src="user.avatar" class="ui avatar image"/>
      </div>
      <div class="editor-wrapper">
        <div contenteditable="true">
        </div>

        <div class="editor-actions">
          <div class="task-options">
            <i class="check circle large icon"></i>
            <a>分配任务</a>
          </div>
          <form class="ui popup form">
            <div class="field">
              <label>将任务指派给</label>
              <select name="select">
                <option v-for="user in users" value="user.id">{{user.username}}</option>
              </select>
            </div>
            <div class="field">
              <label>任务截止时间</label>
              <div class="ui calendar" id="due-date-picker">
                <div class="ui input left icon">
                  <i class="calendar icon"></i>
                  <input type="text" placeholder="Date">
                </div>
              </div>
            </div>
          </form>
          <div class="editor-buttons">
            <button class="ui secondary basic button">取消</button>
            <button class="ui teal basic button">发布</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>

  .discussion-editor .editor-actions {
    width: 100%;
    margin-top: 2rem;
  }

  .discussion-editor .editor-actions .task-options {
    display: inline-block;
  }

  .discussion-editor .editor-actions .editor-buttons {
    display: inline-block;
    float: right;
  }

  .discussion-editor .discussion-item-avatar .ui.avatar.image {
    margin-left: .8rem;
    width: 3.5rem;
    height: 3.5rem;
  }

  .ui.grid.discussion-editor {
    margin-bottom: 15rem;
  }

  .discussion-editor .discussion-item-avatar {
    display: inline-block;
    position: absolute;
  }

  .discussion-editor .editor-wrapper {
    display: inline-block;
    margin-left: 5rem;
    width: 100%;
  }

  .discussion-editor .editor-wrapper div[contenteditable=true] {
    border-radius: .3em;
    border: 1px solid gray;
    line-height: 1em;
    min-height: 5em;
    overflow-y: visible;
    padding: .5em;
  }

  .discussion-editor .editor-wrapper div[contenteditable=true]:focus {
    outline: none;
  }

  .discussion-editor .editor-wrapper div[contenteditable=true] blockquote {
    padding-left: 1rem;
    border-style: solid;
    border-color: #ccc;
    border-width: 0;
    border-left-width: .4rem;
  }
</style>

<script>
  import 'semantic-calendar/calendar'
  import 'semantic-calendar/calendar.css'
  export default {
    name: 'DiscussionEditor',
    props: ['user'],
    mounted () {
      $('.task-options').popup({
        lastResort: 'right center',
        position: 'right center',
        hoverable: true
      })
      $('#due-date-picker').calendar({
        type: 'date'
      })
    },
    computed: {
      users () {
        return this.$store.getters.users
      }
    }
  }
</script>
