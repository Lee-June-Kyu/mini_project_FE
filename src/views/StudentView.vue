<template>
  <div>
    <side-bar></side-bar>
    <div>
      <div class="studentPageHeader">
        <h1 class="aaa">학생 리스트</h1>
        <v-btn class="studentPlusBtn" @click="openCreateStudentModal">학생 추가</v-btn>
        <!-- <div class="studentPlusBtnBox">
          
        </div> -->
      </div>
      <div class="studentPageContent">
        <v-card>
          <v-card-title>
            <div></div>
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
                  <th class="text-center">이름</th>
                  <th class="text-center">학교</th>
                  <th class="text-center">학년</th>
                  <th class="text-center">학부모 연락처</th>
                  <th class="text-center">삭제</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filterStudents" :key="item.id" class="bbb" @click="openLookupStudentModal(item)">
                  <td class="text-center">{{ item.stuName }}</td>
                  <td class="text-center">
                    {{ item.school }}
                  </td>
                  <td class="text-center">{{ item.stuGrade }}</td>
                  <td class="text-center">{{ item.phoneNum }}</td>
                  <td class="text-center">
                    <v-btn color="pink closeBtn" dark fab x-small @click.stop="deleteStudent(item.id)"
                      ><v-icon dark> mdi-close </v-icon></v-btn
                    >
                  </td>
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
  margin-top: 0;
  width: 90%;
  padding: 0 5%;
  padding-bottom: 0px;
  padding-top: 10px;
  margin: auto;
}
.studentPageHeader {
  margin: 50px 8vw 30px 8vw;
  display: flex;
  align-content: flex-end;
  justify-content: space-between;
  align-items: center;
  // flex-direction: column;
}

.studentPlusBtnBox {
  text-align: right;
}

.studentPlusBtn {
  width: 100px;
}
.aaa {
  display: inline;
}
.v-text-field {
  width: 30px;
}
.closeBtn:hover {
  transform: scale(1.2);
}
</style>
