<template>
  <v-dialog v-model="dialog" persistent max-width="1000" max-height="1000">
    <v-card class="modal">
      <v-card-title class="light-green lighten-3 modalHeader">
        <h2 class="text-h5 white--text">학생 세부 정보 조회</h2>
        <v-btn icon text dark @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <div class="modalContent">
        <div class="studentContent">
          <span>이름</span>
          <span v-if="!inputStatus">{{ getItem.name }}</span>
          <input v-else v-model="getSubItem.name" type="text" class="updateInput" />
        </div>
        <v-divider class="dividers"></v-divider>
        <div class="studentContent">
          <span>학교</span> <span v-if="!inputStatus">{{ getItem.schoolName }}</span>
          <input v-else v-model="getSubItem.schoolName" type="text" class="updateInput" />
        </div>
        <v-divider class="dividers"></v-divider>
        <div class="studentContent">
          <span>학년</span> <span v-if="!inputStatus">{{ getItem.grade }}</span>
          <input v-else v-model="getSubItem.grade" type="text" class="updateInput" />
        </div>
        <v-divider class="dividers"></v-divider>
        <div class="studentContent">
          <span>부모님 연락처</span> <span v-if="!inputStatus">{{ getItem.phoneNumber }}</span>
          <input v-else v-model="getSubItem.phoneNumber" type="text" class="updateInput" />
        </div>
        <v-divider class="dividers"></v-divider>
        <div class="studentContent">
          <div></div>
          <v-btn v-if="!inputStatus" class="updateBtn" @click="changeStatus">수정하기</v-btn>
          <v-btn v-if="inputStatus" class="updateBtn" @click="updateInfo">수정완료</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    openDialog: Boolean,
    itemObject: Object
  },
  data() {
    return {
      inputStatus: false
    }
  },
  computed: {
    dialog(props) {
      return props.openDialog
    },
    getItem(props) {
      return props.itemObject
    },
    getSubItem() {
      return this.getItem
    }
  },
  methods: {
    closeModal() {
      this.inputStatus = false
      this.$emit('closeDialog')
    },
    changeStatus() {
      this.inputStatus = true
    },
    updateInfo() {
      console.log('수정완료')
      this.inputStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  box-sizing: border-box;
  padding-bottom: 50px;
}

.modalHeader {
  display: flex;
  padding: 40px;
  justify-content: space-between;
}

.textField {
  margin: auto;
  width: 90%;
}

.modalBottom {
  display: flex;
  justify-content: space-around;
  padding: 40px;
}

.modalContent {
  width: 800px;
  height: 200px;
  margin: auto;
  padding: 50px;
  padding-bottom: 100px;
  margin-bottom: 100px;
}
.studentContent {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dividers {
  margin-bottom: 15px;
}
.updateBtn {
  margin: 20px;
}
.updateInput {
  width: 200px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: #c5e1a5;
}
</style>
