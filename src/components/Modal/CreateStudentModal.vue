<template>
  <v-dialog v-model="dialog" persistent max-width="1000">
    <v-card class="modal">
      <div class="modalHeader">
        <h2>학생 추가</h2>
        <v-btn icon text @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <form>
        <v-text-field v-model="bodyObj.stuName" class="textField" label="학생 이름" outlined></v-text-field>
        <v-text-field v-model="bodyObj.stuGrade" class="textField" label="학생 학년" outlined></v-text-field>
        <v-text-field v-model="bodyObj.school" class="textField" label="학교 명" outlined></v-text-field>
        <v-text-field v-model="bodyObj.phoneNum" class="textField" label="학부모 연락처" outlined></v-text-field>
        <v-text-field v-model="bodyObj.etc" class="textField" label="기타메모" outlined></v-text-field>
        <div class="modalBottom">
          <div></div>
          <v-btn @click="createStudent">추가하기</v-btn>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    openDialog: Boolean
  },
  data() {
    return {
      bodyObj: {
        stuName: '',
        stuGrade: '',
        school: '',
        phoneNum: '',
        etc: ''
      }
    }
  },
  computed: {
    dialog(props) {
      return props.openDialog
    }
  },
  mounted() {
    this.initValue()
  },
  methods: {
    initValue() {
      this.bodyObj.stuName = ''
      this.bodyObj.stuGrade = ''
      this.bodyObj.school = ''
      this.bodyObj.phoneNum = ''
      this.bodyObj.etc = ''
    },
    closeModal() {
      this.initValue()
      this.$emit('closeDialog')
    },
    async createStudent() {
      let axiosbody = this.bodyObj
      await axios
        .post(process.env.VUE_APP_URL + `/students/${this.$store.getters.User.id}`, axiosbody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async response => {
          console.log('학생 정보 생성 response : ', response)
          this.closeModal()
        })
        .catch(error => {
          console.log('학생 정보 생성 error : ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  box-sizing: border-box;
}

.modalHeader {
  display: flex;
  margin: 0px 40px 40px 40px;
  padding-top: 40px;
  justify-content: space-between;
}

.textField {
  margin: auto;
  width: 90%;
}

.modalBottom {
  display: flex;
  justify-content: space-between;
  padding: 40px;
}
</style>
