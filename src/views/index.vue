<template>
  <div>
    <div class="separate-body"></div>
    <b-container fluid style="padding-left: 0px">
      <b-row>
        <!-- Side bar -->
        <b-col cols="2" style="padding-right: 0px">
          <app-sidebar />
        </b-col>
        <!-- Body contents -->
        <b-col style="padding-left: 0px; padding-right: 0px">
          <div class="content-body">
            <router-view />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Sidebar from '../components/layout/Sidebar'

export default {
  components: {
    'app-sidebar': Sidebar
  }
}
</script>

<style lang="scss" scoped></style>
