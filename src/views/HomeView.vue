<template>
  <div>
    <side-bar></side-bar>
    <div class="homeTitle">
      <h1>Home</h1>
    </div>
    <div class="contentArea">
      <v-divider></v-divider>
      <section class="useSection">
        <div><span>어서오세요 Wanni입니다. 아래의 사용법을 참고해주세요.</span></div>
        <v-divider></v-divider>
        <div>
          아이콘1<span>학생 추가</span><span>우선 학생관리 탭을 눌러서 학생 정보를 추가해주세요.</span
          ><span>이제 학생 정보를 관리할 수 있습니다.</span>
        </div>
        <div>
          아이콘2<span>시간표 추가</span><span>시간표 탭을 눌러서 원하는 시간표를 추가해주세요.</span
          ><span>시간표는 일/주/월 단위로 조회할 수 있습니다.</span>
        </div>
        <div>
          아이콘3<span>출석 확인</span><span>출석확인 탭을 누르면 편하게 출석 확인을 할수 있습니다.</span
          ><span>앞으로 편하게 출석확인이 가능합니다.</span>
        </div>
        <div>
          아이콘4<span>출결 및 메모 확인</span><span>학생들의 출결 정보와 당신의 메모도 확인할 수 있습니다.</span>
        </div>
      </section>
      <h2>오늘의 일정</h2>
      <section class="statsSection">
        <div></div>
        <div></div>
        <div></div>
      </section>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'

export default {
  name: 'Home',

  components: {
    SideBar
  }
}
</script>

<style>
.homeTitle {
  margin: 70px 100px 0px 100px;
}
.contentArea {
  margin: 0px 100px 50px 100px;
  width: 80vw;
  height: 80vh;
  /* border: 1px solid black; */
}
.useSection {
  margin-top: 50px;
  padding: 15px 50px 15px 50px;
  border-radius: 10px;
  border: 1px solid black;
  box-sizing: border-box;
}
</style>
