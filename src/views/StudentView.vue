<template>
  <div>
    <side-bar></side-bar>
    <div>
      <div class="studentPageHeader">
        <h1>학생 관리</h1>
        <v-btn>학생 추가</v-btn>
      </div>
      <v-divider></v-divider>
      <div class="studentPageContent">
        <v-simple-table fixed-header height="80%">
          <template>
            <thead>
              <tr>
                <th class="text-left">이름</th>
                <th class="text-left">학교</th>
                <th class="text-left">학년</th>
                <th class="text-left">학부모 연락처</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.schoolName }}</td>
                <td>{{ item.grade }}</td>
                <td>{{ item.phoneNumber }}</td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
  </div>
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
