<template>
  <div>
    <side-bar></side-bar>
    <div class="container">
      <h1>회원 정보</h1>
      <div class="innerContainer">
        <span class="redStar">* </span><span>이름</span>
        <v-text-field v-model="name" dense outlined color="light-green lighten-4"></v-text-field>
        <span class="redStar">* </span><span>학원 이름</span>
        <v-text-field v-model="className" dense outlined color="light-green lighten-4"></v-text-field>
        <span class="redStar">* </span><span>연락처</span>
        <v-text-field v-model="phoneNum" outlined dense color="light-green lighten-4"></v-text-field>
        <span class="redStar">* </span><span>비밀번호</span>
        <v-text-field v-model="password" outlined dense color="light-green lighten-4" type="password"></v-text-field>
        <div class="btnArea">
          <v-btn color="error" class="myPageBtn" large @click="deleteUser">탈퇴</v-btn>
          <v-btn color="primary" class="myPageBtn" large @click="updateInfo">저장</v-btn>
        </div>
      </div>
    </div>
    <DeleteUserModal :open-dialog="statusModal" :user-id="uId" @closeDialog="closeModal"></DeleteUserModal>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import DeleteUserModal from '@/components/Modal/DeleteUserModal.vue'
import axios from 'axios'

export default {
  name: 'Mypage',

  components: {
    SideBar,
    DeleteUserModal
  },

  data() {
    return {
      name: '',
      className: '',
      phoneNum: '',
      password: '',
      statusModal: false
    }
  },
  computed: {
    uId() {
      return this.$store.getters.User.id
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    closeModal() {
      this.statusModal = false
    },
    deleteUser() {
      this.statusModal = true
    },
    async updateInfo() {
      if (this.loading) return
      this.loading = true

      // let user = JSON.parse(localStorage.getItem('user'))
      let user = this.$store.getters.User

      const axiosBody = {
        password: this.password,
        name: this.name,
        phoneNum: this.phoneNum,
        className: this.className
      }
      console.log('회원정보수정 axiosBody : ', axiosBody)

      await axios
        .patch(process.env.VUE_APP_URL + `/auth/${user.id}`, axiosBody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async response => {
          console.log('회원정보수정 response : ', response)
          user.name = axiosBody.name
          user.className = axiosBody.className
          this.$store.dispatch('actUserInfo', user)
          // localStorage.setItem('user', JSON.stringify(user))
        })
        .catch(error => {
          console.log('회원정보수정 error : ', error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async getUserInfo() {
      if (this.loading) return
      this.loading = true
      const userId = this.$store.getters.User.id
      await axios
        .get(process.env.VUE_APP_URL + `/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async response => {
          console.log('회원정보조회 response : ', response)
          this.name = response.data.data.name
          this.className = response.data.data.className
          this.phoneNum = response.data.data.phoneNum
        })
        .catch(error => {
          console.log('회원정보조회 error : ', error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 5% 10% 3% 10%;
}

.innerContainer {
  border: 3px solid #dcedc8;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  height: 70vh;
  box-sizing: border-box;
  padding: 50px;
}

h1 {
  margin-bottom: 3%;
}

.btnArea {
  margin-top: 50px;
  display: flex;
  flex-direction: row-reverse;
}

.redStar {
  color: red;
}
.myPageBtn {
  margin: 10px;
}
</style>
