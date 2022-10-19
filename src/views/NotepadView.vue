<template>
  <div>
    <side-bar></side-bar>
    <div class="schedulePageHeader">
      <h1>메모 히스토리</h1>
    </div>
    <div class="historyContentArea"></div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
export default {
  name: 'Notepad',

  components: {
    SideBar
  },
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.schedulePageHeader {
  margin: 70px 100px 30px 100px;
  display: flex;
  align-content: flex-end;
  flex-direction: column;
}
.historyContentArea {
  width: 70vw;
  height: 78vh;
  margin: auto;
  border: 1px solid black;
  border-radius: 20px;
  padding: 15px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
