<template>
  <div id="myvideo" width="100%" white>
    <side-bar></side-bar>
    <div class="fullscreenbtn">
      <button v-if="!inputStatus" @click="openFullScreen">전체화면 열기<v-icon>mdi-fullscreen</v-icon></button>
      <button v-if="inputStatus" @click="checkInputPassword">전체화면 닫기<v-icon>mdi-fullscreen-exit</v-icon></button>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

export default {
  name: 'AttendanceChcek',

  components: {
    SideBar
  },

  data: () => ({
    userPassword: Boolean,

    inputStatus: false
  }),

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
      var user = JSON.parse(localStorage.getItem('user'))
      await axios
        .post(
          process.env.VUE_APP_URL + `/pscheck/${user.id}`,
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
    }
  }
}
</script>

<style>
.fullscreenbtn {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
