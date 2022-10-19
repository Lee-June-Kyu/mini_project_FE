<template>
  <div>
    <side-bar></side-bar>
    <div class="schedulePageHeader">
      <h1>출결 히스토리</h1>
    </div>
    <div class="historyContentArea">
      <div class="searchArea">
        <div class="searchName">이름 검색</div>
        <div class="searchArea__outer">
          <div class="searchArea__inner">
            <v-autocomplete
              v-model="stuName"
              class="ma-0"
              chips
              clearable
              filled
              rounded
              solo
              :items="students"
              outlined
            >
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
          this.schedule = response.data.data
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
  border: 1px solid black;
  border-radius: 20px;
  padding: 15px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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
}
.contentTable {
  border: 1px solid black;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 10px;
  background-color: #dcedc8;
}
.tableName {
  font-size: x-large;
  margin-bottom: 20px;
}
</style>
