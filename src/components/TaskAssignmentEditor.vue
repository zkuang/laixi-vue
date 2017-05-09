<template>
  <form class="task-assignment ui popup form">
    <div class="field">
      <label>将任务指派给</label>
      <select name="assignment" @change="setAssignee">
        <option value="unknown">未指派</option>
        <option v-for="user in users" :value="user.id">{{user.nickname}}</option>
      </select>
    </div>
    <div class="field">
      <label>任务截止时间</label>
      <div class="ui calendar" :id="datePickerId">
        <div class="ui input left icon">
          <i class="calendar icon"></i>
          <input type="text" placeholder="Date">
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import 'semantic-calendar/calendar'
  import 'semantic-calendar/calendar.css'
  import {mapGetters} from 'vuex'
  import moment from 'moment'
  export default {
    name: 'TaskAssignmentEditor',
    props: ['name'],
    data () {
      return {
        assignment: {
          assignee: undefined,
          deadline: undefined
        }
      }
    },
    mounted() {
      let assignment = this.assignment
      $(this.$el).find(`#date-picker-${this.name}`).calendar({
        type: 'date',
        onChange: function (date, text, mode) {
          if (date) {
            assignment.deadline = moment(date)
          }
        }
      })
    },
    computed: {
      ...mapGetters(['users']),
      datePickerId() {
        return `date-picker-${this.name}`
      }
    },
    methods: {
      setSelection(value) {
        $(this.$el).find('select[name="assignment"]').val(value)
      },
      getData() {
        return Object.assign({}, this.assignment)
      },
      setAssignee(e) {
        this.assignment.assignee = this.users.find(user => {
          return user.id === e.target.value
        })
      }
    }
  }
</script>
