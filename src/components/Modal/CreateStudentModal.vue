<template>
  <v-dialog v-model="dialog" persistent max-width="1000">
    <v-card class="modal">
      <div class="modalHeader light-green lighten-3">
        <h2 class="text-h5 white--text">학생 추가</h2>
        <v-btn icon text @click="closeModal">
          <v-icon class="text-h5 white--text">mdi-close</v-icon>
        </v-btn>
      </div>
      <ValidationObserver ref="signInForm" v-slot="{ handleSubmit, invalid, validate }">
        <form @submit.prevent="handleSubmit(createStudent)">
          <ValidationProvider v-slot="{ errors }" name="학생 이름" rules="required">
            <v-text-field
              v-model="bodyObj.stuName"
              class="textField"
              label="학생 이름"
              outlined
              maxlength="3"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="학년" rules="required|numeric">
            <v-text-field
              v-model="bodyObj.stuGrade"
              class="textField"
              label="학생 학년"
              outlined
              maxlength="1"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>

          <v-select v-model="bodyObj.stuGender" class="textField" :items="options" label="성별" outlined> </v-select>

          <ValidationProvider v-slot="{ errors }" name="학교 이름" rules="required">
            <v-text-field
              v-model="bodyObj.school"
              class="textField"
              label="학교 명"
              outlined
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="학부모 연락처" rules="required|numeric">
            <v-text-field
              v-model="bodyObj.phoneNum"
              :error-messages="errors"
              maxlength="11"
              class="textField"
              label="학부모 연락처"
              outlined
            ></v-text-field>
          </ValidationProvider>
          <v-text-field v-model="bodyObj.etc" class="textField" label="기타메모" outlined></v-text-field>
          <div class="modalBottom">
            <div></div>
            <v-btn type="submit" :disabled="invalid || !validate">추가하기</v-btn>
          </div>
        </form>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import Validate from '@/mixins/Validate.vue'
export default {
  mixins: [Validate],
  props: {
    openDialog: Boolean
  },
  data() {
    return {
      // selected: '',
      options: [
        // { value: null, text: '성별을 골라주세요.' },
        { value: '남', text: '남' },
        { value: '여', text: '여' }
      ],
      bodyObj: {
        stuName: '',
        stuGrade: '',
        school: '',
        phoneNum: '',
        etc: '',
        stuGender: ''
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
      this.bodyObj.stuGender = ''
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
  margin: 0px 0px 20px 0px;
  padding-top: 40px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 20px;
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
