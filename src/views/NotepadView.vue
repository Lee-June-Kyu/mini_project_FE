<template>
  <div>
    <side-bar></side-bar>
    <div class="schedulePageHeader"></div>
    <div class="historyContentArea">
      <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="날짜 선택"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(date)"> OK </v-btn>
        </v-date-picker>
      </v-dialog>
      <div class="contentBox">
        <v-card
          v-for="(note, i) in tempNotes"
          :key="i"
          class="mx-auto cardbox amber accent-1"
          max-width="500"
          width="250px"
          elevation="7"
          outlined
        >
          <v-card-title> {{ note.date }} </v-card-title>

          <v-card-subtitle> {{ note.time }} 메모 </v-card-subtitle>

          <v-card-actions>
            <v-btn color="deep-orange darken-4" text> 자세히보기 </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="note.show = !note.show">
              <v-icon>{{ note.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="note.show">
              <v-divider></v-divider>

              <v-card-text>
                {{ note.description }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </div>
    </div>
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
    return {
      // date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      modal: false,
      show: false,
      content: '아무말',
      notes: [],
      notes2: [
        { date: '2022년 10월 20일', time: '2', description: '아무말', show: false },
        { date: '2022년 10월 20일', time: '2', description: '아무말', show: false },
        { date: '2022년 10월 20일', time: '2', description: '아무말', show: false },
        { date: '2022년 10월 20일', time: '2', description: '아무말', show: false },
        { date: '2022년 10월 20일', time: '2', description: '아무말', show: false },
        { date: '2022년 10월 20일', time: '2', description: '아무말', show: false },
        { date: '2022년 10월 20일', time: '2', description: '아무말', show: false },
        { date: '2022년 10월 20일', time: '2', description: '아무말', show: false }
      ]
    }
  },
  computed: {
    tempNotes() {
      let tArray = []
      for (let i = 0; i < this.notes.length; i++) {
        if (
          this.date.split('-')[0] == this.notes[i].date.split(' ')[0].split('년')[0] &&
          this.date.split('-')[1] == this.notes[i].date.split(' ')[1].split('월')[0] &&
          this.date.split('-')[2] == this.notes[i].date.split(' ')[2].split('일')[0]
        ) {
          tArray.push(this.notes[i])
        }
      }
      return tArray
      // return this.notes.filter(note => {
      //   this.date.split('-')[0] == note.date.split(' ')[0].split('년')[0] ||
      //     this.date.split('-')[1] == note.date.split(' ')[1].split('월')[0] ||
      //     this.date.split('-')[2] == note.date.split(' ')[2].split('일')[0]
      // })
    }
  },
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
          let tempArray = response.data.data
          let tempObj = {}
          for (let i = 0; i < tempArray.length; i++) {
            tempObj = {}

            tempObj['date'] = `${tempArray[i].date.split('/')[0]}년 ${tempArray[i].date.split('/')[1]}월 ${
              tempArray[i].date.split('/')[2]
            }일`
            tempObj['time'] = `${Number(tempArray[i].createdAt.split('-')[2].split('T')[1].split(':')[0]) + 9 - 12}시 ${
              tempArray[i].createdAt.split('-')[2].split('T')[1].split(':')[1]
            }분`
            tempObj['description'] = tempArray[i].message
            tempObj['show'] = false
            this.notes.push(tempObj)
          }
        })
        .catch(error => {
          console.log('메모 조회 error : ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
// .schedulePageHeader {
//   margin: 70px 100px 30px 100px;
//   display: flex;
//   align-content: flex-end;
//   flex-direction: column;
// }
.historyContentArea {
  background: url('../assets/images/notepad.png') 50% 0% / cover no-repeat;
  // background-color: white;
  width: 70vw;
  height: 100vh;
  margin: auto;
  // border: 1px solid black;
  border-radius: 20px;
  padding: 15px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 100px;
  padding-top: 150px;
}
.contentBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  align-content: flex-start;
  gap: 50px 30px;
}
.contentBox {
  // margin: 20px;
}
</style>
