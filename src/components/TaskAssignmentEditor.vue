<template>
<form class="ui popup form task-assignment">
  <div class="field set-position-relative">
    <label>将任务指派给</label>
    <select name="assignment" @change="setAssignee">
      <option value="null" :selected="assignment.assignee == null || assignment.assignee == undefined">未指派</option>
      <option v-for="user in users" :value="user.id">{{user.nickname}}</option>
    </select>
    <div class="clear">
      <i class="remove icon" @click="clearAssignee"></i>
    </div>
  </div>
  <div class="field">
    <label>任务截止时间</label>
    <div class="ui calendar set-position-relative" :id="datePickerId">
      <div class="ui input left icon">
        <i class="calendar icon"></i>
        <input type="text" :value="calendarTime" placeholder="Date">
      </div>
      <div class="clear">
        <i class="remove icon" @click="clearDeadline"></i>
      </div>
    </div>
  </div>
</form>
</template>

<style>
.ui.popup.form.task-assignment select {
  height: 40px;
  background: none;
}

.clear {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.set-position-relative {
  position: relative!important;
}
</style>


<script>
import 'semantic-calendar/calendar'
import 'semantic-calendar/calendar.css'
import {
  mapGetters
} from 'vuex'
import moment from 'moment'
import { DateTime } from '@/utils.js'
export default {
  name: 'TaskAssignmentEditor',
  props: ['name', 'task'],
  data() {
    return {
      assignment: {
        assignee: {},
        deadline: undefined
      }
    }
  },
  mounted() {
    let assignment = this.assignment
    $(this.$el).find(`#date-picker-${this.name}`).calendar({
      type: 'date',
      minDate: new Date(),
      formatter: {
        date: (date, settings) => {
          return `${new Date(date).getFullYear()}年${DateTime.DateMonth(date)}`
        }
      },
      onChange: function (date, text, mode) {
        if (date) {
          assignment.deadline = moment(date)
        } else {
          assignment.deadline = 'null'
        }
      }
    })
  },
  computed: {
    ...mapGetters(['users']),
    datePickerId() {
      return `date-picker-${this.name}`
    },
    calendarTime() {
      if (!this.task) return ''
      if (this.task.deadline) return DateTime.DateGetCalendarEn(this.task.deadline)
      else return ''
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
      console.log(e)
      if (e.target.value === 'null') {
        this.assignment.assignee.id = 'null'
      } else {
        this.assignment.assignee = JSON.parse(JSON.stringify(this.users.find(user => {
          return user.id === e.target.value
        })))
      }
    },
    reset() {
      this.assignment.assignee = {}
      this.assignment.deadline = undefined
    },
    setDate(date) {
      if (!date) {
        $(this.$el).find(`#${this.datePickerId}`).calendar('clear')
      } else {
        $(this.$el).find(`#${this.datePickerId}`).calendar('set date', date.toDate(), true, false)
      }
    },
    clearAssignee() {
      this.setSelection('null')
      this.assignment.assignee.id = 'null'
    },
    clearDeadline() {
      this.setDate(false)
      this.assignment.deadline = 'null'
    }
  }
}
</script>
