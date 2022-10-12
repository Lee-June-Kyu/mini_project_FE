<template>
  <nav>
    <!-- 내브바 서랍 메뉴 -->
    <v-navigation-drawer app permanent class="light-green lighten-4 navbarInfo">
      <v-list nav dense>
        <br />
        <br />
        <v-list-item>
          <img alt="" />
          <div class="navbarUserInfoBox">
            <v-list-item-title>
              <br />
              <span class="navBarUserInfoTitle">안녕하세요 OOO님</span>
              <br />
              <span class="navBarUserInfoComment"> Wanni 입니다.</span>
              <br />
              <br />
              <br />
            </v-list-item-title>
            <div class="navbarUserBtnBox">
              <v-btn plain class="mypageBtn" x-small @click="goMyPage">마이페이지</v-btn>
              <v-btn plain class="signoutBtn" x-small>로그아웃</v-btn>
            </div>
          </div>
        </v-list-item>
        <br />
        <v-divider></v-divider>
        <v-list-item link @click="goHome">
          <v-list-item-icon>
            <v-icon>mdi-home-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>홈 페이지</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link @click="goAttendPage">
          <v-list-item-icon>
            <v-icon>mdi-calendar-check</v-icon>
          </v-list-item-icon>
          <v-list-item-title>출석체크</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link @click="goStudentPage">
          <v-list-item-icon>
            <v-icon>mdi-account-school</v-icon>
          </v-list-item-icon>
          <v-list-item-title>학생 관리</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link @click="goSchedulePage">
          <v-list-item-icon>
            <v-icon>mdi-calendar-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>시간표 관리</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link @click="goAttendHistoryPage">
          <v-list-item-icon>
            <v-icon>mdi-calendar-search</v-icon>
          </v-list-item-icon>
          <v-list-item-title>출결 관리</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link @click="goNotepadPage">
          <v-list-item-icon>
            <v-icon>mdi-note-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>메모 관리</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: 'SideBar',

  data: () => ({
    //
  }),
  items: [
    {
      name: '한개'
    }
  ],
  methods: {
    goHome() {
      this.$router.push('/')
    },
    goMyPage() {
      this.$router.push('/mypage')
    },
    goAttendPage() {
      this.$router.push('/attend')
    },
    goAttendHistoryPage() {
      this.$router.push('/attendHistory')
    },
    goStudentPage() {
      this.$router.push('/student')
    },
    goSchedulePage() {
      this.$router.push('/schedule')
    },
    goNotepadPage() {
      this.$router.push('/notepad')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbarUserInfoBox {
  border: 1px solid black;
  border-radius: 30px;
  background-color: #aed581;
  opacity: 0.7;
  box-sizing: border-box;
  width: 95%;
  height: 120px;
}

.navbarUserBtnBox {
  display: flex;
  justify-content: flex-end;
}

.navBarUserInfoTitle {
  font-size: 18px;
  font-weight: bolder;
  margin: 30px;
}

.navBarUserInfoComment {
  font-weight: bolder;
  font-size: 15px;
  margin: 30px;
}

.mypageBtn,
.signoutBtn {
  margin: 1px;
  font-size: 10px;
  font-weight: 800;
}

.navbarInfo {
  background: url('../images/sidebar.png') no-repeat;
}
</style>
