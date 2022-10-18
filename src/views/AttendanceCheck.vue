<template>
  <div>
    <side-bar></side-bar>
    <div class="firstDiv">
      <div class="checkPageHeader">
        <h1>출석체크</h1>
        <div class="fullscreenbtn">
          <button v-if="!inputStatus" @click="openFullScreen">전체화면 열기<v-icon>mdi-fullscreen</v-icon></button>
          <button v-if="inputStatus" @click="checkInputPassword">
            전체화면 닫기<v-icon>mdi-fullscreen-exit</v-icon>
          </button>
        </div>
        <div style="display: flex; justify-content: flex-end">
          <div style="width: 220px">
            <h3 class="denger">경고!</h3>
            <h5 class="denger">출석 버튼 외에 조작은 하지마세요!</h5>
          </div>
        </div>
      </div>
      <div class="checkPageContent">
        <div class="timeDivP parent">
          <div id="time"></div>
        </div>
        <v-tabs v-model="vmodelTime">
          <!-- vmodelTime은 배열인 상태(key값이 배열로 들어가는듯?) -->
          <v-tab v-for="index in checkTimes" :key="index">
            {{ index }}
          </v-tab>
        </v-tabs>
        <div class="checkBox">
          <div v-for="student in computedStudents" :key="student.index" class="maleImgDiv">
            <div class="nameBox">
              <v-btn text style="font-size: 1.5em" @click="openStudentStatus(student)">{{ student.stuName }}</v-btn>
              <span>{{ student.attendTime }}</span>
              <v-btn text @click="displayDate(student)">출석하기</v-btn>
            </div>
          </div>
          <!-- <div class="femaleImgDiv"></div> -->
        </div>
      </div>
    </div>
    <LookupStudentModal
      :open-dialog="statusLookupModal"
      :item-object="itemObj"
      @closeDialog="closeStudentStatus"
    ></LookupStudentModal>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

import LookupStudentModal from '@/components/Modal/LookupStudentModal.vue'

export default {
  name: 'AttendanceChcek',

  components: {
    SideBar,
    LookupStudentModal
  },

  data: () => ({
    userPassword: Boolean,
    today: '',
    //전체화면 상태
    inputStatus: false,
    //모달 상태
    statusLookupModal: false,
    //모달 전달값
    itemObj: {},
    vmodelTime: null,
    //출석부 전체 가져오기
    students: [],
    //출석부 존재하는 시간 필터해서 넣기
    checkTimes: []
  }),

  computed: {
    checkStudents() {
      return this.student
    },
    //데이타에 students를 필터해서 student라는 배열을 새로 만들어줌 [checkTimes배열중 this.time번째랑 같으면]
    computedStudents() {
      console.log(this.vmodelTime)
      return this.students.filter(student => student.lessonDate === this.checkTimes[this.vmodelTime])
    }
  },
  mounted() {
    //시계 함수 테그 id가 time인곳에 나타나게함
    //로컬 시간을 가져온 방법
    this.timerInterval = setInterval(() => {
      const now = new Date()
      let years = now.getFullYear()
      let months = now.getMonth() + 1
      let dates = now.getDate()
      this.today = `${years}/${months}/${dates}`
      document.querySelector('#time').innerHTML = now.toLocaleString('ko-kr')
    }, 1000) // 1초마다 함수 실행되도록 설정
    this.getCheckList()
  },
  destroyed() {
    //setInterval(계속 반복된 함수를 지워주는 함수)
    clearInterval(this.timerInterval)
  },

  methods: {
    //전체화면 open
    openFullScreen() {
      this.inputStatus = true
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        /* Firefox */
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        /* Chrome, Safari, Opera */
        document.documentElement.webkitRequestFullscreen()
      } else if (document.documentElement.msRequestFullscreen) {
        /* IE/Edge */
        document.documentElement.msRequestFullscreen()
      }
    },
    //전체화면 close
    closeFullScreen() {
      this.inputStatus = false
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    },
    //입력받은 값을 post로 보내준 뒤 입력값과 유저의 password가 같으면 true를 반환받고  close함수 실행. false면 창 유지
    async checkInputPassword() {
      var inputPassword = prompt('암호를 입력해주세요')
      console.log(inputPassword)
      //로컬에 있는 user정보 확인하고 post할때 user.id를 사용하려고
      // var user = JSON.parse(localStorage.getItem('user'))
      //store를 사용하여 user정보를 불러와서 사용했다.
      let user = this.$store.getters.User
      await axios
        .post(
          process.env.VUE_APP_URL + `/pwCheck/${user.id}`,
          { id: user.id, inputPassword },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
        .then(response => {
          console.log('closeFullScreen - response : ', response, response.data.boolean)
          this.userPassword = response.data.boolean
          console.log('userPassword - response', this.userPassword)
        })
        .catch(error => {
          console.log('closeFullScreen - error : ', error)
        })
        .finally(() => {
          console.log('userPassword', this.userPassword)
          if (this.userPassword == true) {
            return (this.inputStatus = false), console.log('비밀번호 일치')
          } else {
            return this.openFullScreen()
          }
        })
    },
    //출석시간을 체크하기위한 함수
    //Date안 요소들을 가져와서 설정해준 방법
    async displayDate(student) {
      const now = new Date()
      let hours = now.getHours()
      let minutes = now.getMinutes()
      let seconds = now.getSeconds()
      let ampm = ''
      if (hours > 12) {
        hours -= 12
        ampm = '오후'
      } else if (hours == 12) {
        hours = 12
        ampm = '오후'
      } else {
        ampm = '오전'
      }
      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      student.attendTime = ampm + hours + ':' + minutes + ':' + seconds
      console.log(student.id)
      const userId = this.$store.getters.User.id
      await axios
        .patch(
          process.env.VUE_APP_URL + `/schedule/${userId}/today/${student.id}`,
          { attendTime: student.attendTime },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        .then(async response => {
          console.log('학생 정보 조회 response : ', response)
          this.closeModal()
        })
        .catch(error => {
          console.log('학생 정보 조회 error : ', error)
        })
    },
    openStudentStatus(items) {
      this.itemObj = items
      this.statusLookupModal = true
      console.log('모달클릭', this.statusLookupModal)
    },
    closeStudentStatus() {
      console.log('모달닫기', this.statusLookupModal)
      this.statusLookupModal = false
    },
    //출석부 가져오기
    async getCheckList() {
      const userId = this.$store.getters.User.id
      await axios
        .post(
          process.env.VUE_APP_URL + `/schedule/${userId}/today`,
          { lessonDate: this.today },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        .then(async response => {
          console.log('오늘 출석명단 조회 response : ', response)
          this.students = response.data.data

          let arr1 = []
          let arr2 = []
          for (let i = 0; i < this.students.length; i++) {
            if (arr1.includes(this.students[i].lessonDate)) {
              // console.log('<= 중복된 array갯수')
              continue
            } else {
              arr1.push(this.students[i].lessonDate)
            }
          }
          // console.log('arr1 중복 제거된 배열 :', arr1)
          const now = new Date()
          let years = now.getFullYear()
          let months = now.getMonth() + 1
          let dates = now.getDate()
          this.today = `${years}/${months}/${dates}`
          // console.log('오늘 날짜 :', this.today)
          for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].split('/')[2] == this.today.split('/')[2]) {
              arr2.push(arr1[i])
            }
          }
          // console.log('arr2 중복제거 후 오늘날자만 filter:', arr2)
          this.checkTimes = arr2
        })
        .catch(error => {
          console.log('학생 정보 조회 error : ', error)
        })
    }
  }
}
</script>

<style>
.firstDiv {
  width: 100%;
  height: 100vh;
}
.fullscreenbtn {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
  overflow: hidden;
}

.checkPageHeader {
  margin: 70px 100px 30px 100px;
  display: flex;
  align-content: flex-end;
  flex-direction: column;
}

.denger {
  width: 15vh;
  color: red;
  overflow: hidden;
}

.checkPageContent {
  width: 90%;
  height: 100%;
  padding: 0% 7% 0% 7%;
  margin: auto;
  background: url('../assets/images/background.png') no-repeat;
  background-size: 100% 140%;
}

.timeDivP {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 10%;
  font-family: 'Noto Serif', serif;
  font-size: 3em;
  width: 100%;
  overflow: hidden;
}

.tableStyle {
  width: 100%;
  margin: 10px auto;
  margin-top: 0px;
  /* border: 1px solid #000; */
  /* border-collapse: collapse; */
  table-layout: fixed;
}

.tableStyle v-btn {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: rgb(197, 149, 6);
  color: white;
  font-size: 18px;
  padding: 5px 0px;
}

.checkBox {
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
  height: 65%;
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 50% 50%;
  overflow: auto;
  font-family: 'Noto Serif', serif;
}

.maleImgDiv {
  width: 100%;
  height: 100%;
  background: url('../assets/images/male.png') no-repeat;
  background-size: 100% 100%;
  background-position: center bottom;
  display: grid;
  grid-template-columns: 10% 79% 12%;
  grid-template-rows: 46% 43% 11%;
  z-index: 10;
}
/* .femaleImgDiv {
  width: 100%;
  height: 100%;
  background: url('../assets/images/female.png') no-repeat;
  background-size: 100%;
  background-position: center bottom;
} */

.nameBox {
  width: 100%;
  height: 100%;
  border: 2px solid black;
  background-color: white;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  z-index: 0;
  display: grid;
  grid-template-rows: 30% 30% 40%;
  align-items: center;
  text-align: center;
  overflow: auto;
  font-family: 'Noto Serif', serif;
}
</style>
