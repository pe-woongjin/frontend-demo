<template>
  <div>
      <label for="basic-url">신규 화면</label>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="input">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">category</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="input">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">price</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="input">
        </div>
      </div>
      <div align="right">
        <button type="button" class="btn btn-primary" @click="save">SAVE</button>
        <button type="button" class="btn btn-secondary" @click="cancel">CANCEL</button>
      </div>
  </div>
</template>

<script>
export default {
  name: "DemoSbst",
  data: function() {
    return {
     msg: ""
    }
  },
  methods: {  
    save() {
      console.log("저장");
    },
    cancel() {
      this.$router.push({ name: "Demo" });
    }
  },
  created() {
  }
}
</script>

<style lang="scss">

</style>
