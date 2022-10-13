<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card class="modal" elevation="15" outlined shaped tile>
      <v-card-title class="grey lighten-1 modalHeader">
        <h2 class="text-h5 white--text">회원 탈퇴</h2>
        <v-btn icon text dark @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="cardContent">
        <span class="mainSpan">정말로 삭제 하시겠습니까 ?</span>
        <div>
          <v-btn class="buttons" large @click="deleteUser">예</v-btn>
          <v-btn class="buttons" large @click="closeModal">아니요</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    openDialog: Boolean,
    userId: Number
  },
  computed: {
    dialog(props) {
      return props.openDialog
    },
    uId(props) {
      return props.userId
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeDialog')
    },
    async deleteUser() {
      await axios
        .delete(process.env.VUE_APP_URL + `/auth/${this.uId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async response => {
          console.log('회원정보삭제 response : ', response)
          this.$store.dispatch('actUserInfo', {})
          localStorage.removeItem('token')
          this.$emit('closeDialog')
          this.$router.push('/signin')
        })
        .catch(error => {
          console.log('회원정보삭제 error : ', error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.cardContent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  flex-direction: column;
}
.mainSpan {
  color: red;
  font-size: 25px;
  margin: 30px;
  text-decoration: underline;
}
.buttons {
  margin: 30px;
}
.modalHeader {
  display: flex;
  justify-content: space-between;
}
</style>
