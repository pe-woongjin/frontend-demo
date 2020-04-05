<template>
  <div class="demo">
    <h1>Demo page</h1>
    <demoList></demoList>
  </div>
</template>

<script>
// @ is an alias to /src
import demoList from '@/components/demo/DemoList.vue'

export default {
  name: 'Demo',
  components: { demoList },
  data: function() {
    return {
     type: ""
    }
  }
}
</script>
