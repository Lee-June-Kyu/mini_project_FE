<template>
  <div>
    <side-bar></side-bar>
    <div>
      <div class="studentPageHeader">
        <h1>학생 관리</h1>
        <div class="studentPlusBtnBox">
          <v-btn class="studentPlusBtn" @click="openCreateStudentModal">학생 추가</v-btn>
        </div>
      </div>
      <div class="studentPageContent">
        <v-card>
          <v-card-title>
            학생 리스트
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="학생 이름 검색"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-simple-table fixed-header height="60vh">
            <template>
              <thead>
                <tr>
                  <th class="text-left">이름</th>
                  <th class="text-left">학교</th>
                  <th class="text-left">학년</th>
                  <th class="text-left">학부모 연락처</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filterStudents" :key="item.id" @click="openLookupStudentModal(item)">
                  <td>{{ item.stuName }}</td>
                  <td>
                    {{ item.school }}
                  </td>
                  <td>{{ item.stuGrade }}</td>
                  <td>{{ item.phoneNum }}</td>
                  <td><v-btn @click.stop="deleteStudent(item.id)">삭제</v-btn></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </div>
    </div>
    <CreateStudentModal :open-dialog="statusModal" @closeDialog="closeCreateStudentModal"></CreateStudentModal>
    <LookupStudentModal
      :open-dialog="statusLookupModal"
      :item-object="itemObj"
      @closeDialog="closeLookupStudentModal"
    ></LookupStudentModal>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import CreateStudentModal from '@/components/Modal/CreateStudentModal.vue'
import LookupStudentModal from '@/components/Modal/LookupStudentModal.vue'
import axios from 'axios'

export default {
  name: 'Student',

  components: {
    CreateStudentModal,
    LookupStudentModal,
    SideBar
  },

  data() {
    return {
      search: '',
      headers: [
        {
          text: '이름',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: '학교', value: 'schoolName' },
        { text: '학년', value: 'grade' },
        { text: '학부모 연락처', value: 'phoneNumber' }
      ],
      students: [],
      statusModal: false,
      statusLookupModal: false,
      itemObj: {}
    }
  },
  computed: {
    filterStudents() {
      if (this.students.length == 0) {
        return 0
      } else {
        return this.students.filter(student => {
          return student.stuName.includes(this.search)
        })
      }
    }
  },
  mounted() {
    this.getStudents()
  },
  methods: {
    openCreateStudentModal() {
      this.statusModal = true
    },
    closeCreateStudentModal() {
      this.getStudents()
      this.statusModal = false
    },
    openLookupStudentModal(items) {
      console.log('학생 정보 조회')
      this.itemObj = Object.assign({}, items)
      this.statusLookupModal = true
    },
    closeLookupStudentModal() {
      this.getStudents()
      this.statusLookupModal = false
    },
    async deleteStudent(id) {
      await axios
        .delete(process.env.VUE_APP_URL + `/students/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(async response => {
          console.log('학생 정보 삭제 response : ', response)
          this.getStudents()
        })
        .catch(error => {
          console.log('학생 정보 삭제 error : ', error)
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
          this.students = resStudents
          // for (let i = 0; i < resStudents.length; i++) {
          //   let tempObj = {}
          //   tempObj['id'] = resStudents[i].id
          //   tempObj['name'] = resStudents[i].stuName
          //   tempObj['schoolName'] = resStudents[i].school
          //   tempObj['grade'] = resStudents[i].stuGrade
          //   tempObj['phoneNumber'] = resStudents[i].phoneNum
          //   tempObj['etc'] = resStudents[i].etc
          //   this.students.push(tempObj)
          // }
        })
        .catch(error => {
          console.log('학생 정보 조회 error : ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.studentPageContent {
  width: 90%;
  padding: 5%;
  padding-bottom: 0px;
  padding-top: 10px;
  margin: auto;
}
.studentPageHeader {
  margin: 70px 100px 30px 100px;
  display: flex;
  align-content: flex-end;
  flex-direction: column;
}

.studentPlusBtnBox {
  text-align: right;
}

.studentPlusBtn {
  width: 100px;
}
</style>
