<template>
  <div><side-bar></side-bar>학생관리페이지</div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
export default {
  name: 'Student',

  components: {
    SideBar
  },

  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          schoolName: 159,
          grade: 4,
          phoneNumber: '010-1234-1234'
        },
        {
          name: 'Ice cream sandwich',
          schoolName: 237,
          grade: 4,
          phoneNumber: '010-1234-1234'
        },
        {
          name: 'Eclair',
          schoolName: 262,
          grade: 4,
          phoneNumber: '010-1234-1234'
        },
        {
          name: 'Cupcake',
          schoolName: 305,
          grade: 4,
          phoneNumber: '010-1234-1234'
        },
        {
          name: 'Gingerbread',
          schoolName: 356,
          grade: 4,
          phoneNumber: '010-1234-1234'
        },
        {
          name: 'Jelly bean',
          schoolName: 375,
          grade: 4,
          phoneNumber: '010-1234-1234'
        },
        {
          name: 'Lollipop',
          schoolName: 392,
          grade: 4,
          phoneNumber: '010-1234-1234'
        },
        {
          name: 'Honeycomb',
          schoolName: 408,
          grade: 4,
          phoneNumber: '010-1234-1234'
        },
        {
          name: 'Donut',
          schoolName: 452,
          grade: 4,
          phoneNumber: '010-1234-1234'
        },
        {
          name: 'KitKat',
          schoolName: 518,
          grade: 4,
          phoneNumber: '010-1234-1234'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.studentPageContent {
  width: 80%;
  padding: 50px;
  border: 3px solid black;
}
</style>
