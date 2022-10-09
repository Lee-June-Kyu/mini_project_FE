<template>
  <v-container fluid class="fill-height white">
    <v-row>
      <v-col cols="12" xs="12" sm="6" md="5" lg="4" class="ma-auto">
        <v-card outlined class="pa-10">
          <v-card-title>Wanni</v-card-title>
          <v-card-subtitle>로그인</v-card-subtitle>
          <v-card-text>
            <!-- <ValidationObserver
              ref="signInForm"
              v-slot="{ handleSubmit, invalid, validate }">
              <form @submit.prevent="handleSubmit(signIn)">
                <ValidationProvider
                  name="이메일"
                  rules="required|email"
                  v-slot="{ errors }">
                  <div class="mx-auto my-5">
                    <input
                      type="email"
                      class="inputStyle"
                      placeholder="이메일"
                      v-model="email" />
                    <span class="errorText">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  name="비밀번호"
                  rules="required"
                  v-slot="{ errors }">
                  <div class="mx-auto my-5">
                    <input
                      type="password"
                      class="inputStyle"
                      placeholder="비밀번호"
                      v-model="password" />
                    <span class="errorText">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>

                <div class="d-flex justify-space-between">
                  <v-btn text color="primary" class="pl-0" router to="signup"
                    >계정 만들기</v-btn
                  >
                  <v-btn
                    depressed
                    color="primary"
                    class="blue"
                    type="submit"
                    :disabled="invalid || !validate"
                    >로그인</v-btn
                  >
                </div>
              </form>
            </ValidationObserver> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {}
</script>

<style lang="scss" scoped></style>
