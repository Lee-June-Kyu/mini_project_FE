<template>
  <v-dialog v-model="dialog" persistent max-width="1000">
    <v-card class="modal">
      <div class="modalHeader">
        <h2>학생 추가</h2>
        <v-btn icon text @click="closeModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <form>
        <v-text-field class="textField" label="학생 이름" outlined></v-text-field>
        <v-text-field class="textField" label="학생 학년" outlined></v-text-field>
        <v-text-field class="textField" label="학교 명" outlined></v-text-field>
        <v-text-field class="textField" label="학부모 연락처" outlined></v-text-field>
        <v-text-field class="textField" label="ETC" outlined></v-text-field>
        <div class="modalBottom">
          <div></div>
          <v-btn>추가하기</v-btn>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    openDialog: Boolean
  },
  computed: {
    dialog(props) {
      return props.openDialog
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeDialog')
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
