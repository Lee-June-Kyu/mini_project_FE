<template>
  <v-dialog v-model="dialog" persistent max-width="1000" max-height="1000">
    <v-card class="modal">
      <v-card-title class="light-green lighten-3 modalHeader">
        <h2 class="text-h5 white--text">메모</h2>
        <v-btn icon text dark @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <div class="modalContent">
        <h1>{{ getItem }}일자 메모사항</h1>
        <h3>comment히스토리</h3>
        <div class="textareaHistory">
          <div v-for="(getCo, i) in getComments" :key="i">
            <span>메세지 : {{ getCo.message }} &nbsp;&nbsp;&nbsp;</span>
            <span>작성시간 :{{ getCo.createdAt }}</span>
          </div>
        </div>
        <h3>내용입력</h3>
        <textarea id="textarea" placeholder="내용" class="textarea"></textarea>

        <div class="commentContent">
          <div></div>
          <v-btn class="updateBtn" @click="updateComment">작성완료</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    openDialog: Boolean,
    itemObject: String
  },
  data() {
    return {
      inputStatus: false,
      getComments: []
    }
  },
  computed: {
    dialog(props) {
      return props.openDialog
    },
    getItem(props) {
      return props.itemObject
    }
  },
  mounted() {
    this.getComment()
  },
  methods: {
    closeModal() {
      this.inputStatus = !this.inputStatus
      this.$emit('closeDialog')
    },
    async updateComment() {
      var textarea = document.getElementById('textarea')
      console.log('입력한 내용 :', textarea.value)
      let axiosbody = {
        date: this.getItem,
        message: textarea.value
      }
      const userId = this.$store.getters.User.id
      await axios
        .post(process.env.VUE_APP_URL + `/comment/${userId}`, axiosbody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          console.log('updateComment - response : ', response, response.data)
          this.closeModal()
          this.getComment()
          alert('코멘트 작성 완료')
        })
        .catch(error => {
          console.log('updateComment post error : ', error)
        })
    },
    async getComment() {
      const userId = this.$store.getters.User.id
      await axios
        .post(
          process.env.VUE_APP_URL + `/comment/${userId}/today`,
          { date: this.getItem },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        .then(response => {
          console.log('getComment - response : ', response, response.data.data)
          this.getComments = response.data.data
          // for (let i = 0; i < this.getConmments.length; i++) {
          //   this.getConmments[i]
          // }
        })
        .catch(error => {
          console.log('getComment error : ', error)
        })
    }
  }
}
</script>

<style>
.modal {
  box-sizing: border-box;
  padding-bottom: 50px;
}

.modalHeader {
  display: flex;
  padding: 40px;
  justify-content: space-between;
}

.modalContent {
  width: 800px;
  height: 50vh;
  margin: auto;
  padding: 50px;
  padding-bottom: 100px;
  margin-bottom: 100px;
}
.inputContent {
  height: 100%;
  width: 100%;
}
.textareaHistory {
  height: 80%;
  width: 100%;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 10px;
  background-color: #ececec;
  overflow: scroll;
}
.textarea {
  height: 20%;
  width: 100%;
  border: 2px solid rgb(0, 0, 0);
  border-radius: 10px;
  background-color: #ececec;
}

.commentContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.updateBtn {
  margin: 20px;
}
</style>
