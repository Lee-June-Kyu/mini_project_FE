<template>
  <v-container fluid class="fill-height white">
    <v-row>
      <v-col cols="12" xs="12" sm="6" md="5" lg="4" class="ma-auto">
        <img class="logoimg" src="../../assets/logo.png" alt="로고이미지" />
        <br />
        <v-card class="pa-10">
          <v-card-title>Wanni</v-card-title>
          <v-card-subtitle>로그인</v-card-subtitle>
          <v-card-text>
            <ValidationObserver ref="signInForm" v-slot="{ handleSubmit, invalid, validate }">
              <form @submit.prevent="handleSubmit(signIn)">
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
                  <!-- <span class="errorText">{{ errors[0] }}</span> -->
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="비밀번호" rules="required">
                  <v-text-field
                    v-model="password"
                    outlined
                    type="password"
                    label="비밀번호"
                    placeholder="비밀번호"
                    color="#aed581"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
                <span>에러메세지(아이디 없거나 비밀번호가 일치하지 않습니다)</span>
                <div class="d-flex justify-space-between">
                  <v-btn text color="primary" class="pl-0" router to="signup">계정 만들기</v-btn>
                  <v-btn depressed color="primary" class="blue" type="submit" :disabled="invalid || !validate"
                    >로그인</v-btn
                  >
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

export default {
  name: 'SignIn',
  mixins: [Validate]
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
</style>
