<template>
  <div>
    <side-bar></side-bar>
    <div class="homeTitle">
      <h1>Home</h1>
    </div>
    <div class="homeContentArea">
      <v-divider></v-divider>
      <div class="contentArea">
        <section class="useSection">
          <div class="sectionTitle">
            <span class="sectionMainTitle">어서오세요 Wanni입니다.</span>
            <span class="sectionMainDescription">아래의 사용법을 참고해주세요.</span>
          </div>
          <v-divider></v-divider>
          <div class="useDetailSection">
            <div class="useDetailSection--1">
              <v-icon x-large>mdi-numeric-1-circle-outline</v-icon>
              <div class="subDescription">
                <span class="subTitle">학생 추가</span
                ><span>우선 학생관리 탭을 눌러서 학생 정보를 추가해주세요.이제 학생 정보를 관리할 수 있습니다.</span>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="useDetailSection--2">
              <v-icon x-large>mdi-numeric-2-circle-outline</v-icon>
              <div class="subDescription">
                <span class="subTitle">시간표 추가</span><span>시간표 탭을 눌러서 원하는 시간표를 추가해주세요.</span
                ><span>시간표는 일/주/월 단위로 조회할 수 있습니다.</span>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="useDetailSection--3">
              <v-icon x-large>mdi-numeric-3-circle-outline</v-icon>
              <div class="subDescription">
                <span class="subTitle">출석 확인</span
                ><span>출석확인 탭을 누르면 편하게 출석 확인을 할수 있습니다.</span
                ><span>앞으로 편하게 출석확인이 가능합니다.</span>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="useDetailSection--4">
              <v-icon x-large>mdi-numeric-4-circle-outline</v-icon>
              <div class="subDescription">
                <span class="subTitle">출결 및 메모 확인</span
                ><span>학생들의 출결 정보와 당신의 메모도 확인할 수 있습니다.</span>
              </div>
            </div>
          </div>
        </section>
        <h2>오늘의 일정</h2>
        <section class="statsSection">
          <div class="statsSectionInner">
            <div class="innerSection subTitle">
              <div>수업 수</div>
              <div>8</div>
            </div>
            <v-divider vertical class="dividerVertical"></v-divider>
            <div class="innerSection subTitle">
              <div>출결 학생</div>
              <div>50</div>
            </div>
            <v-divider vertical class="dividerVertical"></v-divider>
            <div class="innerSection subTitle">
              <div>출결한 학생 수</div>
              <div>30</div>
            </div>
          </div>
        </section>
      </div>
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
.homeContentArea {
  margin: 0px 100px 50px 100px;
  width: 80%;
  height: 85vh;
  box-sizing: border-box;

  /* border: 1px solid black; */
}
.contentArea {
  width: 100%;
  height: 95%;
  background-color: #f1f8e9;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px;
  /* margin-top: 10px; */
  margin: 20px auto;
}

.useSection {
  /* margin-top: 50px; */
  /* margin-right: 10%; */
  /* padding: 15px 50px 15px 50px; */
  border-radius: 10px;
  border: 1px solid #9ccc65;
  box-sizing: border-box;
  margin-bottom: 50px;
}
.sectionTitle {
  background-color: #dcedc8;
  padding: 30px;
  border-radius: 10px 10px 0 0;
}
.sectionMainTitle {
  display: block;
  font-size: xx-large;
  font-weight: bolder;
}

.sectionMainDescription {
  font-size: large;
}
.useDetailSection {
  background-color: white;
  box-sizing: border-box;
  border-radius: 0px 0px 10px 10px;
  padding: 10px 30px 10px 30px;
}

.useDetailSection--1 {
  display: flex;
  align-items: center;
  /* background-color: gray; */
  border-radius: 10px;
  padding-left: 10px;
  height: 80px;
}
.useDetailSection--1:hover {
  background-color: #dcedc8;
}
.useDetailSection--2 {
  display: flex;
  align-items: center;
  padding-left: 10px;
  /* background-color: gray; */
  border-radius: 10px;
  height: 80px;
}
.useDetailSection--2:hover {
  background-color: #dcedc8;
}
.useDetailSection--3 {
  display: flex;
  align-items: center;
  padding-left: 10px;
  /* background-color: gray; */
  border-radius: 10px;
  height: 80px;
}
.useDetailSection--3:hover {
  background-color: #dcedc8;
}
.useDetailSection--4 {
  display: flex;
  align-items: center;
  padding-left: 10px;
  /* background-color: gray; */
  border-radius: 10px;
  height: 80px;
}
.useDetailSection--4:hover {
  background-color: #dcedc8;
}
.subTitle {
  display: block;
  font-size: x-large;
}
.subDescription {
  margin-left: 20px;
}
.statsSection {
  border: 1px solid #9ccc65;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 25%;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.statsSectionInner {
  width: 90%;
  height: 70%;
  /* background-color: aqua; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.dividerVertical {
  border-width: 1px !important;
  border-color: #9ccc65 !important;
  background-color: #9ccc65;
}
.innerSection {
  width: 20%;
  height: 100%;
  border: 1px solid #dcedc8;
  /* background-color: orange; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50%;
}
.innerSection:hover {
  background-color: #dcedc8;
}
</style>
