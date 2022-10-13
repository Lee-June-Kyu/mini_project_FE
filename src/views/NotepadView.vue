<template>
  <div>
    <side-bar></side-bar>알림장
    {{ userInfo }}
    <v-btn @click="gogo">gogo</v-btn>
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
    return {
      user: {
        id: 1,
        name: 'lee',
        className: 'june'
      },
      ddd: {}
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.User
    }
  },
  methods: {
    gogo() {
      this.$store.dispatch('actUserInfo', this.userInfo)
      console.log(this.$store.getters.User)
      this.ddd = this.$store.getters.User
    }
  }
}
</script>

<style lang="scss" scoped></style>
