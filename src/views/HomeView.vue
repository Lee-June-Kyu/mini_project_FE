<template>
  <div>
    <side-bar></side-bar>
    홈화면
    <hello-world />
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import HelloWorld from '../components/HelloWorld'

export default {
  name: 'Home',

  components: {
    HelloWorld,
    SideBar
  }
}
</script>
