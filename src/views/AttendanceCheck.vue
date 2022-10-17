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
        <div class="checkBox">
          <div v-for="student in students" :key="student.index" class="maleImgDiv">
            <div class="nameBox">
              <v-btn text style="font-size: 1.5em" @click="openStudentStatus(student)">{{ student.name }}</v-btn>
              <span>{{ student.checkTime }}</span>
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

    inputStatus: false,
    statusLookupModal: false,
    itemObj: {},

    students: [
      {
        name: '이준규',
        schoolName: '준규초',
        grade: 1,
        phoneNumber: '010-1234-1234',
        checkTime: '출석전'
      },
      {
        name: '원영준',
        schoolName: '준규초',
        grade: 2,
        phoneNumber: '010-1234-1234',
        checkTime: '출석전'
      },
      {
        name: '이상훈',
        schoolName: '준규초',
        grade: 1,
        phoneNumber: '010-1234-1234',
        checkTime: '출석전'
      }
    ]
  }),

  computed: {
    checkStudents() {
      return this.student
    }
  },
  mounted() {
    //시계 함수 테그 id가 time인곳에 나타나게함
    //로컬 시간을 가져온 방법
    this.timerInterval = setInterval(() => {
      const now = new Date()
      document.querySelector('#time').innerHTML = now.toLocaleString('ko-kr')
    }, 1000) // 1초마다 함수 실행되도록 설정
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
    displayDate(student) {
      const now = new Date()
      let hours = now.getHours()
      let minutes = now.getMinutes()
      let seconds = now.getSeconds()
      let ampm = ''
      console.log(hours)
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
      student.checkTime = ampm + hours + ':' + minutes + ':' + seconds
    },
    openStudentStatus(items) {
      this.itemObj = items
      this.statusLookupModal = true
      console.log('모달클릭', this.statusLookupModal)
    },
    closeStudentStatus() {
      console.log('모달닫기', this.statusLookupModal)
      this.statusLookupModal = false
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
  height: 13%;
  margin-bottom: 4%;
  font-family: 'Noto Serif', serif;
  font-size: 3em;
  width: 100%;
  overflow: hidden;
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
