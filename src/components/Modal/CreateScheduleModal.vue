<template>
  <v-dialog v-model="dialog" persistent max-width="1000">
    <v-card class="modal">
      <div class="modalHeader">
        <h2>스케줄 추가</h2>
        <v-btn icon text @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <form>
        <h3>날짜 선택</h3>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Day"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              dense
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
        </v-menu>
        <v-simple-table fixed-header height="300px">
          <template #default>
            <thead>
              <tr>
                <th class="text-left">강의 시간</th>
                <th class="text-left">학생 목록</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in items" :key="item.name">
                <td>{{ item }}</td>
                <td>
                  <v-container fluid>
                    <v-select v-model="studentsValue[i]" :items="students" label="학생 선택" multiple>
                      <template #selection="{ item, index }">
                        <v-chip v-if="index === 0">
                          <span>{{ item }}</span>
                        </v-chip>
                        <span v-if="index === 1" class="grey--text text-caption">
                          (+{{ studentsValue[i].length - 1 }} others)
                        </span>
                      </template>
                    </v-select>
                  </v-container>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="modalBottom">
          <div></div>
          <v-btn @click="createSchedule">추가하기</v-btn>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    openDialog: Boolean
  },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      menu: false,
      items: ['2시', '3시', '4시', '5시', '6시', '7시', '8시', '9시', '10시'],
      students: [],
      studentsValue: [[], [], [], [], [], [], [], [], []]
    }
  },
  computed: {
    dialog(props) {
      return props.openDialog
    }
  },
  mounted() {
    this.initData()
    this.getStudents()
  },
  methods: {
    initData() {
      this.studentsValue = [[], [], [], [], [], [], [], [], []]
    },
    closeModal() {
      this.$emit('closeDialog')
    },
    async createSchedule() {
      console.log(this.date)
      let tempDate = this.date.replace(/-/g, '/')
      console.log(this.studentsValue)
      const userId = this.$store.getters.User.id
      let axiosBody = { daySchedule: [] }
      console.log(...this.studentsValue[0])
      for (let i = 0; i < 9; i++) {
        let tempStudents = ''
        // for (let j = 0; j < this.studentsValue[i].length; j++) {
        //   console.log(tempStudents)
        //   tempStudents += this.studentsValue[j]
        //   console.log(tempStudents)
        // }
        tempStudents += this.studentsValue[i]
        if (tempStudents == '') {
          continue
        }
        axiosBody.daySchedule.push({ lessonDate: tempDate + `/${i + 14}:00`, stuList: tempStudents })
        tempStudents = ''
      }
      console.log('스케줄 생성 axiosbody:', axiosBody)
      await axios
        .post(process.env.VUE_APP_URL + `/schedule/${userId}`, axiosBody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async response => {
          console.log('스케줄 추가 response : ', response)
          this.initData()
          this.closeModal()
        })
        .catch(error => {
          console.log('스케줄 추가 error : ', error)
        })
    },
    async getStudents() {
      const userId = this.$store.getters.User.id
      await axios
        .get(process.env.VUE_APP_URL + `/students/${userId}/info/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async response => {
          console.log('학생 정보 조회 response : ', response)
          let resStudents = response.data.data
          for (let i = 0; i < resStudents.length; i++) {
            this.students.push(resStudents[i].stuName)
          }
        })
        .catch(error => {
          console.log('학생 정보 조회 error : ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  box-sizing: border-box;
}

.modalHeader {
  display: flex;
  margin: 0px 40px 40px 40px;
  padding-top: 40px;
  justify-content: space-between;
}

.textField {
  margin: auto;
  width: 90%;
}

.modalBottom {
  display: flex;
  justify-content: space-between;
  padding: 40px;
}
</style>
