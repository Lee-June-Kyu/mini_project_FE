<template>
  <div>
    <side-bar></side-bar>
    <div class="schedulePageHeader"></div>
    <div class="historyContentArea">
      <div class="searchArea">
        <div class="searchName">이름 검색</div>
        <div class="searchArea__outer">
          <div class="searchArea__inner">
            <v-autocomplete v-model="stuName" class="ma-0" chips clearable filled solo :items="students" outlined>
            </v-autocomplete>
          </div>
          <v-btn class="searchBtn" height="50px" @click="searchStudent">검색</v-btn>
        </div>
      </div>
      <div v-if="searchStatus" class="contentTable">
        <div class="tableName">{{ tableStuName }}</div>

        <v-simple-table height="40vh">
          <template #default>
            <thead>
              <tr>
                <th class="text-left">날짜</th>
                <th class="text-left">출석 여부 및 시간</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="studentInfo in schedule" :key="studentInfo.date">
                <td>{{ studentInfo.lessonDate }}</td>
                <td>{{ studentInfo.attendTime }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'
export default {
  name: 'AttendanceHistory',

  components: {
    SideBar
  },
  data() {
    return {
      students: [],
      stuName: '',
      tableStuName: '',
      schedule: [],
      searchStatus: false
    }
  },
  mounted() {
    this.getStudents()
  },
  methods: {
    async searchStudent() {
      this.searchStatus = true
      const userId = this.$store.getters.User.id
      console.log(this.stuName)
      await axios
        .get(process.env.VUE_APP_URL + `/schedule/${userId}/history/${this.stuName}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async response => {
          console.log('학생 출결 조회 response : ', response)
          console.log(response.data.data)
          // this.schedule = response.data.data
          this.schedule = []
          const now = new Date()
          let years = now.getFullYear()
          let months = now.getMonth() + 1
          let dates = now.getDate()
          this.today = `${years}/${months}/${dates}`

          let tempObj = {}
          for (let i = 0; i < response.data.data.length; i++) {
            tempObj = {}
            tempObj.lessonDate = response.data.data[i].lessonDate
            if (now > new Date(`${response.data.data[i].lessonDate}`) && response.data.data[i].attendTime == '출석전') {
              tempObj.attendTime = '결석'
            } else if (now < new Date(`${response.data.data[i].lessonDate}`)) {
              tempObj.attendTime = '출석 예정'
            } else {
              tempObj.attendTime = response.data.data[i].attendTime
            }
            this.schedule.push(tempObj)
          }

          this.tableStuName = response.data.data[0].stuName
        })
        .catch(error => {
          console.log('학생 출결 조회 error : ', error)
        })
    },
    async getStudents() {
      const userId = this.$store.getters.User.id
      await axios
        .get(process.env.VUE_APP_URL + `/students/${userId}/info/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async response => {
          console.log('학생 정보 조회 response : ', response)
          // this.students = response.data.data
          for (let i = 0; i < response.data.data.length; i++) {
            this.students.push(response.data.data[i].stuName)
          }
        })
        .catch(error => {
          console.log('학생 정보 조회 error : ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.schedulePageHeader {
  margin: 70px 100px 30px 100px;
  display: flex;
  align-content: flex-end;
  flex-direction: column;
}
.historyContentArea {
  width: 70vw;
  height: 78vh;
  margin: auto;
  border-radius: 20px;
  padding: 15px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  background-color: rgba(239, 245, 239, 0.845);
}
.searchArea {
}
.searchArea__outer {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.searchArea__inner {
  display: flex;
  align-items: center;
  width: 90%;
  margin: auto;
}
$autocomplete-enclosed-input-margin-top: 0px;
.v-text-field__details {
  display: none;
}
.searchBtn {
  height: 30px;
  margin-bottom: 27px;
}
.searchName {
  font-size: xx-large;
  margin: 10px;
  margin-bottom: 20px;
  text-align: center;
  color: rgb(20, 24, 21);
}
.contentTable {
  border-radius: 20px;
  box-sizing: border-box;
  padding: 10px;
  background-color: #c0c3be6d;
}
.tableName {
  font-size: x-large;
  margin-bottom: 20px;
}
</style>
