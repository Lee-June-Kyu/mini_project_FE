<template>
  <v-container fluid class="fill-height #C5E1A">
    <v-row>
      <v-col cols="12" xs="12" sm="6" md="5" lg="4" class="ma-auto">
        <img class="logoimg" src="../../assets/logo.png" alt="로고이미지" />
        <br />
        <v-card class="pa-10">
          <v-card-title>Wanni</v-card-title>
          <v-card-subtitle>회원가입</v-card-subtitle>
          <v-card-text>
            <ValidationObserver ref="signUpForm" v-slot="{ handleSubmit, invalid, validate }">
              <form @submit.prevent="handleSubmit(signUp)">
                <ValidationProvider v-slot="{ errors }" name="이메일" rules="required|email">
                  <v-text-field
                    v-model="email"
                    outlined
                    type="email"
                    label="이메일"
                    placeholder="example@uvc.co.kr"
                    color="#aed581"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="비밀번호" rules="required|min:6">
                  <v-text-field
                    v-model="password"
                    outlined
                    type="password"
                    label="비밀번호"
                    color="#aed581"
                    placeholder="6자리 이상"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="비밀번호 확인" rules="required|confirmed:비밀번호">
                  <v-text-field
                    v-model="confirmPassword"
                    outlined
                    type="password"
                    label="비밀번호 확인"
                    color="#aed581"
                    placeholder="위 입력한 비밀번호와 동일하게 입력"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="선생님 성함" rules="required">
                  <v-text-field
                    v-model="teacherName"
                    outlined
                    maxlength="11"
                    label="선생님 성함"
                    color="#aed581"
                    placeholder="선생님 성함(원어민 선생님도 가능한 한국이름 입력"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="선생님 연락처" rules="required|numeric">
                  <v-text-field
                    v-model="teacherNumber"
                    maxlength="11"
                    outlined
                    label="선생님 연락처"
                    color="#aed581"
                    placeholder="-없이 입력 ex) 01099426866"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="클래스 이름" rules="required">
                  <v-text-field
                    v-model="className"
                    outlined
                    label="클래스 이름"
                    color="#aed581"
                    placeholder="ex)뿌리학원"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
                <span class="err">{{ errorMessage }}</span>
                <div class="d-flex justify-end">
                  <v-btn
                    depressed
                    right
                    color="primary"
                    class="blue"
                    type="submit"
                    :loading="loading"
                    :disabled="invalid || !validate"
                    @click="signUp"
                    >가입하기
                  </v-btn>
                </div>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Validate from '@/mixins/Validate.vue'
import axios from 'axios'

export default {
  name: 'SignUp',
  mixins: [Validate],
  data() {
    return {
      email: '',
      password: '',
      teacherName: '',
      teacherNumber: '',
      className: '',
      confirmPassword: '',
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    async signUp() {
      if (this.loading) return
      this.loading = true

      const axiosBody = {
        email: this.email,
        password: this.password,
        name: this.teacherName,
        phoneNum: this.teacherNumber,
        className: this.className
      }
      console.log('auth/register - axiosBody : ', axiosBody)

      await axios
        .post(process.env.VUE_APP_URL + '/join/', axiosBody)
        .then(async response => {
          console.log('auth/login - response : ', response)
          localStorage.setItem('token', response.data.token)

          this.$router.push('/signin')
        })
        .catch(error => {
          console.log('auth/login - error : ', error)

          // 에러문구 표시
          this.$refs.signUpForm.setErrors({
            이메일: ['이미 가입된 이메일입니다.']
          })
          this.errorMessage = '회원가입이 실패했습니다. 이메일을 확인 해주세요.'
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
.logoimg {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 70%;
  height: 100%;
  padding: 15px 20px;
  margin: 5px auto;
}
.err {
  color: red;
}
</style>
