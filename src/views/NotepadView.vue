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
import axios from 'axios'
export default {
  name: 'Notepad',

  components: {
    SideBar
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
    this.getNotes()
  },
  methods: {
    async getNotes() {
      const userId = this.$store.getters.User.id
      await axios
        .post(
          process.env.VUE_APP_URL + `/comment/${userId}/today`,
          { date: '2022' },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        .then(async response => {
          console.log('메모 조회 response : ', response)
        })
        .catch(error => {
          console.log('메모 조회 error : ', error)
        })
    }
  }
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
