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
        <v-text-field v-model="teacherNumber" outlined dense color="light-green lighten-4"></v-text-field>
        <span class="redStar">* </span><span>비밀번호</span>
        <v-text-field v-model="password" outlined dense color="light-green lighten-4" type="password"></v-text-field>
        <div class="btnArea">
          <v-btn color="primary">저장</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'Mypage',

  components: {
    SideBar
  },

  data() {
    return {
      name: '나선생',
      className: '뿌리학원',
      teacherNumber: '010-1234-1234',
      password: '123456789'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 5% 5% 3% 5%;
}

.innerContainer {
  border: 3px solid #dcedc8;
  border-radius: 10px;
  background-color: white;
  width: 100%;
  height: 100%vh;
  box-sizing: border-box;
  padding: 50px;
}

h1 {
  margin-bottom: 3%;
}

.btnArea {
  display: flex;
  flex-direction: row-reverse;
}

.redStar {
  color: red;
}
</style>
