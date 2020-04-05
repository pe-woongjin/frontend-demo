<template>
  <div class="about">
    <h1>This is an about page</h1>
    <aboutList></aboutList>
  </div>
</template>

<script>
import aboutList from '@/components/about/AboutList.vue'

export default {
  name: 'Home',
  components: {
    aboutList
  }
}
</script>