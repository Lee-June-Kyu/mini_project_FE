<template>
  <div>
    <side-bar></side-bar>
    <div class="schedulePageHeader">
      <h1>시간표 관리</h1>
      <div class="schedulePlusBtnBox">
        <v-btn class="schedulePlusBtn" @click="openCreateScheduleModal">시간표 추가</v-btn>
      </div>
    </div>
    <v-app id="inspire">
      <div class="contentBox">
        <v-sheet tile height="54" class="d-flex">
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-select v-model="type" :items="types" dense outlined hide-details class="ma-2" label="일/주/월"></v-select>
          <v-spacer> </v-spacer>
          <div class="ma-2">Wanni Schedule</div>
          <v-spacer> </v-spacer>
          <v-select
            v-model="weekday"
            :items="weekdays"
            dense
            outlined
            hide-details
            label="일주일단위"
            class="ma-2"
          ></v-select>

          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="value"
            :weekdays="weekday"
            :type="type"
            :events="events"
            event-overlap-mode="column"
            :event-overlap-threshold="30"
            :event-color="getEventColor"
            first-interval="13"
            interval-height="80"
            interval-count="10"
            @change="getEvents"
            @click="console.log('1')"
          ></v-calendar>
        </v-sheet>
      </div>
      <CreateScheduleModal :open-dialog="statusModal" @closeDialog="closeCreateScheduleModal"></CreateScheduleModal>
    </v-app>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import CreateScheduleModal from '@/components/Modal/CreateScheduleModal.vue'
import axios from 'axios'
export default {
  name: 'ScheduleView',

  components: {
    CreateScheduleModal,
    SideBar
  },
  data: () => ({
    statusModal: false,
    type: 'day',
    types: ['month', 'week', 'day'],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: '월~일', value: [1, 2, 3, 4, 5, 6, 0] },
      { text: '주중', value: [1, 2, 3, 4, 5] },
      { text: '주말', value: [6, 0] },
      { text: '월, 수, 금', value: [1, 3, 5] },
      { text: '화, 목, 토', value: [2, 4, 6] }
    ],
    value: '',
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    // names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
    allSchedule: [],
    tempSchedule: {}
  }),
  mounted() {
    this.getSchedules()
  },
  methods: {
    getEvents({ start, end }) {
      const events = []
      for (let [key, value] of Object.entries(this.tempSchedule)) {
        let startDate = new Date(key)
        let endDate = new Date(startDate.getTime())
        endDate.setHours(endDate.getHours() + 1)
        console.log(startDate)
        console.log(endDate)
        let students = value.split(',').slice(1).join(' ')
        console.log(students)
        events.push({
          // 이름 시작시간, 끝나는시간 , 색상
          // 이름은 스트링으로 길게 넣어야 할 듯함 !

          name: students,
          start: startDate,
          end: endDate,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: 2
        })
        this.events = events
      }
    },
    getEventColor(event) {
      return event.color
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    openCreateScheduleModal() {
      this.statusModal = true
    },
    closeCreateScheduleModal() {
      this.evnets = []
      this.tempSchedule = []
      this.getSchedules()
      this.statusModal = false
    },
    async getSchedules() {
      const userId = this.$store.getters.User.id
      await axios
        .get(process.env.VUE_APP_URL + `/schedule/${userId}/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('유저 스케줄 조회 response : ', response)
          this.allSchedule = response.data.data
          console.log('올 스케줄 : ', this.allSchedule)

          for (let i = 0; i < this.allSchedule.length; i++) {
            this.tempSchedule[`${this.allSchedule[i].lessonDate}`] += ',' + this.allSchedule[i].stuName
          }

          const events = []
          for (let [key, value] of Object.entries(this.tempSchedule)) {
            let startDate = new Date(key)
            let endDate = new Date(startDate.getTime())
            endDate.setHours(endDate.getHours() + 1)

            let students = value.split(',').slice(1).join(' ')

            events.push({
              // 이름 시작시간, 끝나는시간 , 색상
              // 이름은 스트링으로 길게 넣어야 할 듯함 !

              name: students,
              start: startDate,
              end: endDate,
              color: this.colors[this.rnd(0, this.colors.length - 1)],
              timed: 2
            })
            this.events = events
          }
        })
        .catch(error => {
          console.log('유저 스케줄 조회 error : ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.contentBox {
  width: 90%;
  height: 90%;
  margin: 5% 5% 3% 5%;
}
::v-deep .v-application--wrap {
  min-height: fit-content;
}

.schedulePageHeader {
  margin: 70px 100px 30px 100px;
  display: flex;
  align-content: flex-end;
  flex-direction: column;
}

.schedulePlusBtnBox {
  text-align: right;
}

.schedulePlusBtn {
  width: 100px;
}
</style>
