<template>
  <li class="taskitem" @mouseover="active" @mouseleave="deactive">
    <div class="task-actions">
      <button class="ui button">
        <i class="write icon"></i>
      </button>
      <button class="ui button">
        <i class="trash outline icon"></i>
      </button>
    </div>
    <input type="checkbox" :checked="done">
    <label>{{title}}</label>
    <div class="task-content">
      <span>
        <span>{{author}}</span>
        <span>{{dueDate}}</span>
      </span>
    </div>
  </li>
</template>

<style>
  .taskitem {
    font-size: 1.15em;
    width: 80%;
  }

  .taskitem .task-actions {
    display: inline-block;
    border: 1px solid lightgray;
    border-right: none;
    border-radius: .5em;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    line-height: 2.2rem;
    margin-right: 1.2rem;
    visibility: hidden;
  }

  .taskitem.active .task-actions {
    visibility: visible;
  }

  .taskitem .task-actions .ui.button {
    background: transparent;
    font-size: 1.2em;
    padding: .1em 0;
  }

  .taskitem .task-actions .ui.button:first-child {
    padding-left: 1.2em;
  }

  .taskitem input {
    margin-right: 1.2rem;
    font-size: 1.6rem;
  }

  .taskitem .task-content {
    float: right;
    width: 45%;
    height: 100%;
  }

  .taskitem .task-content > span {
    display: inline-block;
    margin-left: .4rem;
    background: #e8e8e8;
    border-radius: 1rem;
    line-height: 1.8rem;
    font-size: .9em;
    text-align: center;
    vertical-align: middle;
    padding-left: 1.2em;
    padding-right: 1.2em;
  }

  .taskitem span > span {
    margin-top: auto;
    margin-bottom: auto;
  }

  .taskitem span > span:first-child {
    margin-right: .52rem;
  }

</style>

<script>
  export default {
    name: 'TaskItem',
    props: ['taskId'],
    data () {
      return this.$store.getters.getTaskById(this.taskId)
    },
    methods: {
      active () {
        $(this.$el).addClass('active')
      },
      deactive () {
        $(this.$el).removeClass('active')
      }
    }
  }
</script>
