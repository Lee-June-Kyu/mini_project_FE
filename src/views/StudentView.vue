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
          <v-simple-table fixed-header height="450px">
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
                <tr v-for="item in filterStudents" :key="item.grade" @click="openLookupStudentModal(item)">
                  <td>{{ item.name }}</td>
                  <td>
                    {{ item.schoolName }}
                  </td>
                  <td>{{ item.grade }}</td>
                  <td>{{ item.phoneNumber }}</td>
                  <td><v-btn @click.stop="deleteStudent">삭제</v-btn></td>
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
      students: [
        {
          name: '이준규',
          schoolName: '준규초',
          grade: 1,
          phoneNumber: '010-1234-1234'
        },
        {
          name: '원영준',
          schoolName: '준규초',
          grade: 2,
          phoneNumber: '010-1234-1234'
        },
        {
          name: '이상훈',
          schoolName: '준규초',
          grade: 3,
          phoneNumber: '010-1234-1234'
        },
        {
          name: '최은택',
          schoolName: '준규초',
          grade: 4,
          phoneNumber: '010-1234-1234'
        },
        {
          name: '김민혁',
          schoolName: '준규초',
          grade: 5,
          phoneNumber: '010-1234-1234'
        },
        {
          name: '박승규',
          schoolName: '준규초',
          grade: 6,
          phoneNumber: '010-1234-1234'
        },
        {
          name: '옥윤성',
          schoolName: '준규초',
          grade: 7,
          phoneNumber: '010-1234-1234'
        },
        {
          name: '박태환',
          schoolName: '준규초',
          grade: 8,
          phoneNumber: '010-1234-1234'
        },
        {
          name: '이준재',
          schoolName: '준규초',
          grade: 9,
          phoneNumber: '010-1234-1234'
        },
        {
          name: '이준당',
          schoolName: '준규초',
          grade: 10,
          phoneNumber: '010-1234-1234'
        }
      ],
      statusModal: false,
      statusLookupModal: false,
      itemObj: {}
    }
  },
  computed: {
    filterStudents() {
      return this.students.filter(p => {
        return p.name.includes(this.search)
      })
    }
  },
  methods: {
    openCreateStudentModal() {
      this.statusModal = true
    },
    closeCreateStudentModal() {
      this.statusModal = false
    },
    openLookupStudentModal(items) {
      console.log('학생 정보 조회')
      this.itemObj = items
      this.statusLookupModal = true
    },
    closeLookupStudentModal() {
      this.statusLookupModal = false
    },
    deleteStudent() {
      console.log('학생 삭제')
    }
  }
}
</script>

<style lang="scss" scoped>
.studentPageContent {
  width: 90%;
  padding: 50px;
  padding-top: 10px;
  margin: auto;
}
.studentPageHeader {
  margin: 80px 100px 30px 100px;
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
