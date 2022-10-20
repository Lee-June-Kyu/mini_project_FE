<template>
  <div>
    <side-bar v-if="sidebarStatue"></side-bar>
    <div class="firstDiv">
      <div class="checkPageHeader">

        <h1>출석체크</h1>
        <v-btn @click="closeSideBar">사이드바 닫기</v-btn>
        <v-btn @click="openSideBar">사이드바 열기</v-btn>
        <div class="fullscreenbtn">
          <button v-if="!inputStatus" @click="openFullScreen">전체화면 열기<v-icon>mdi-fullscreen</v-icon></button>
          <button v-if="inputStatus" @click="checkInputPassword">
            전체화면 닫기<v-icon>mdi-fullscreen-exit</v-icon>
          </button>
        </div>
        <div>
          <div class="itemBox">
            <div>
              <button style="display: flex; align-items: flex-end" @click="openNotePadStatus">
                <v-icon size="5vh">mdi-plus-circle-outline</v-icon>코멘트 추가하기
              </button>
            </div>
            <div style="width: 20vh">
              <h3 class="denger">경고!</h3>
              <h5 class="denger">학생은 출석 버튼 외에 조작은 하지마세요!</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="checkPageContent">
        <div class="timeDivP parent">
          <div id="time"></div>
        </div>
        <div>
          <div class="tabsDiv">
            <div v-for="(targetTime, i) in haveTime" :key="i">
              <button class="tabBtn" @click="onClickTab(i)">
                {{ targetTime }}
              </button>
            </div>
          </div>
        </div>

        <div class="checkBox">
          <div v-for="student in computedStudents" :key="student.index" class="maleImgDiv">
            <div class="nameBox">
              <span text style="font-size: 1.5em">{{ student.stuName }}</span>
              <span>{{ student.attendTime }}</span>
              <v-btn text class="hove" @click="displayDate(student)">출석하기</v-btn>
            </div>
          </div>
          <!-- <div class="femaleImgDiv"></div> -->
        </div>
      </div>
    </div>
    <NotepadModal
      :open-dialog="statusNotePadModal"
      :item-object="today"
      @closeDialog="closeNotePadStatus"
    ></NotepadModal>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

import NotepadModal from '@/components/Modal/NotepadModal.vue'

export default {
  name: 'AttendanceChcek',

  components: {
    SideBar,
    NotepadModal
  },

  data: () => ({
    userPassword: Boolean,
    today: '',
    //전체화면 상태
    inputStatus: false,
    //모달 상태
    statusNotePadModal: false,

    vmodelTime: null,
    //출석부 전체 가져오기
    students: [],
    //전체학생가져오기
    //출석부 존재하는 시간 필터해서 넣기
    checkTimes: [],
    haveTime: ['2시', '3시', '4시', '5시', '6시', '7시', '8시', '9시']
    sidebarStatue: true

  }),

  computed: {
    //데이타에 students를 필터해서 student라는 배열을 새로 만들어줌 [checkTimes배열중 this.time번째랑 같으면]
    computedStudents() {
      // console.log('클릭한 인덱스', this.vmodelTime)
      // console.log('this.checkTime에 값 잘 들어왔는지?', this.checkTimes)
      return this.checkTimes.filter(student => student.lessonDate.split('/')[3].split(':')[0] == this.vmodelTime + 14)
    }
    // tt(val) {
    //   // val.split('/')[3].split(':')[0] - 12
    //   console.log(val)
    //   return '2'
    // }
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
    //스캐쥴 시간 탭 클릭
    onClickTab(i) {
      this.vmodelTime = i
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
    openNotePadStatus() {
      this.statusNotePadModal = true

      console.log('모달클릭', this.statusLookupModal)
    },
    closeNotePadStatus() {
      console.log('모달닫기', this.statusLookupModal)
      this.statusNotePadModal = false
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
          //---------------------------------------------------------------------------------------------
          // console.log('오늘 출석명단 조회 response : ', response)
          // this.students = response.data.data

          // let arr1 = []
          // let arr2 = []
          // let temp = []
          // // temp안에 중복값이 있으면(includes) true반환해서 continue(반복문 처음으로 돌아감), 동일 값이 없으면 false(else)를 타서 배열에 넣어줌
          // for (let i = 0; i < this.students.length; i++) {
          //   if (temp.includes(this.students[i].lessonDate)) {
          //     console.log('<= 중복된 array갯수')
          //     continue
          //   } else {
          //     arr1.push(this.students[i])
          //     temp.push(this.students[i].lessonDate)
          //   }
          // }
          // console.log('arr1에 넣어준 학생 정보', arr1)
          // console.log('temp 중복 제거된 배열', temp)
          // const now = new Date()
          // let years = now.getFullYear()
          // let months = now.getMonth() + 1
          // let dates = now.getDate()
          // this.today = `${years}/${months}/${dates}`
          // // console.log('오늘 날짜 :', this.today)
          // for (let i = 0; i < arr1.length; i++) {
          //   if (arr1[i].lessonDate.split('/')[2] == this.today.split('/')[2]) {
          //     arr2.push(arr1[i])
          //   }
          // }
          // console.log('arr2= 중복제거 후 오늘 날자만 filter:', arr2)

          // this.checkTimes = arr2
          //------------------------------------------------------------------------------------------------
          // 로직이 바껴서 새로 다시 작성함
          // console.log('오늘 출석명단 조회 response : ', response)
          this.students = response.data.data

          let arr2 = []

          const now = new Date()
          let years = now.getFullYear()
          let months = now.getMonth() + 1
          let dates = now.getDate()
          this.today = `${years}/${months}/${dates}`
          // console.log('오늘 날짜 :', this.today)
          for (let i = 0; i < this.students.length; i++) {
            if (this.students[i].lessonDate.split('/')[2] == this.today.split('/')[2]) {
              arr2.push(this.students[i])
            }
          }
          // console.log('arr2= 중복제거 후 오늘 날자만 filter:', arr2)

          this.checkTimes = arr2
        })
        .catch(error => {
          console.log('학생 정보 조회 error : ', error)
        })
    },
    closeSideBar() {
      this.sidebarStatue = false
    },
    openSideBar() {
      this.sidebarStatue = true
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
  margin: 0px 100px 30px 100px;
  display: flex;
  align-content: flex-end;
  flex-direction: column;
}

.itemBox {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.denger {
  width: 16vh;
  color: red;
  overflow: hidden;
}

.checkPageContent {
  width: 90%;
  height: 100%;
  padding: 0% 3% 0% 3%;
  margin: auto;
  background: url('../assets/images/background.png') no-repeat;
  background-size: 100% 140%;
  cursor: url('../assets/images/hover.png') 0 0, pointer;
}

.timeDivP {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: auto;
  font-family: 'Noto Serif', serif;
  font-size: 2.5em;
  width: 100%;
  overflow: hidden;
  padding: 3.5% 0% 0% 0%;
}

.tabsDiv {
  display: grid;
  grid-template-columns: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;
  background: url('../assets/images/toolbarback.png') no-repeat;
  background-size: 100%;
  padding: 6% 1% 0% 1%;
  height: auto;
}

.tabBtn {
  width: 100%;
  height: auto;
  background: url('../assets/images/tabsback.png') no-repeat;
  background-size: 100% 100%;
  background-color: transparent;
  background-color: bisque;
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
  background-size: 100% 100%;
  background-position: center bottom;
  display: grid;
  grid-template-columns: 10% 79% 12%;
  grid-template-rows: 46% 43% 11%;
  z-index: 10;
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

button {
  /* 생략 */
  margin: 0;
  padding: 0.5rem 1rem;

  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  display: inline-block;
  width: auto;

  border: none;
  border-radius: 4px;
}
button.tabBtn:active,
button.tabBtn:hover,
button.tabBtn:focus {
  background: url('../assets/images/tabsback.png') no-repeat;
  background-size: 100% 100%;
  background-color: transparent;
  background-color: rgb(167, 139, 105);
  outline: 1;
  cursor: url('../assets/images/hover.png') 0 0, pointer;
}
.hove {
  background: url('../assets/images/tabsback.png') no-repeat;
  background-size: 100% 100%;
  height: auto;
  width: 100%;
}

.hove:active,
.hove:hover,
.hove:focus {
  background: url('../assets/images/tabsback.png') no-repeat;
  background-size: 100% 100%;
  background-color: transparent;
  background-color: rgb(193, 191, 189);
  cursor: url('../assets/images/hover.png') 0 0, pointer;
}
</style>
