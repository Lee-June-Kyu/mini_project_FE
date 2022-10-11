<template>
  <v-app>
    <v-main class="mainBackground">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
<style>
.mainBackground {
  background: url('images/main.png') no-repeat;
  background-size: 100%;
}
</style>
