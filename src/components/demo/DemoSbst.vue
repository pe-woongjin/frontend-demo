<template>
  <div>
      <label for="basic-url">상세 화면</label>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">id</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="" readonly>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="" readonly>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">category</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="" readonly>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">price</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="" readonly>
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">regdtm</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="" readonly>
        </div>
      </div>
      <div align="right">
        <!-- <button type="button" class="btn btn-secondary" @click="cancel">CANCEL</button> -->
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
  },
  created() {
    console.log("query: ", this.$route.query.id)
  }
}
</script>

<style lang="scss">

</style>
