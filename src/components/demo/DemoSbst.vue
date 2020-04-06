<template>
  <div>
      <label for="basic-url">상세 화면</label>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="" readonly v-model="dataObj.name">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">category</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="" readonly v-model="dataObj.category">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">price</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="" readonly v-model="dataObj.price">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">regdtm</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="" readonly v-model="dataObj.regdtm">
        </div>
      </div>
      <div align="right">
        <!-- <button type="button" class="btn btn-secondary" @click="cancel">CANCEL</button> -->
      </div>
  </div>
</template>

<script>
import axios from "@/api/axios";

export default {
  name: "DemoSbst",
  data: function() {
    return {
      msg: "",
      id: "",
      dataObj: {
        id: "",
        name: "",
        category: "",
        price: 0,
        regdtm: 0
     }
    }
  },
  methods: {
    getSearch() {
      // api 호출
      let uri = '/v1/products/' + this.id
      axios.getApi(uri).then(res => {
        console.log("result", res);
        this.dataObj = res.data;
        this.dataObj.regdtm = this.dateConvert(this.dataObj.regdtm);
      });

    },
    dateConvert(date) {
      return this.$moment(date).format('YYYY-MM-DD hh:mm');
    }
  },
  created() {
    console.log("query: ", this.$route.query.id)
    this.id = this.$route.query.id;
    this.getSearch();
  }
}
</script>

<style lang="scss">

</style>
