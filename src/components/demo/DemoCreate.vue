<template>
  <div>
      <label for="basic-url">신규 화면</label>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">id</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="input" v-model="demoData.id" maxlength="5">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">name</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="input" v-model="demoData.name" maxlength="30">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">category</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="input" v-model="demoData.category" maxlength="50">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">price</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="input" v-model="demoData.price" maxlength="50">
        </div>
      </div>
      <div align="right">
        <button type="button" class="btn btn-primary" @click="save">SAVE</button>&nbsp;&nbsp;
        <button type="button" class="btn btn-secondary" @click="cancel">CANCEL</button>
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
      demoData : {
        id: "",
        name: "",
        category: "",
        price: 0,
        regdtm: 0
     }
    }
  },
  methods: {  
    save() {
      console.log("저장", this.demoData);
      if (isNaN(this.demoData.price)) {
        alert("가격은 숫자만 입력 가능합니다.")
        return;
      }
      // default value
      this.demoData.regdtm = Date.now();

      // 저장
      axios.postApi("/v1/products", this.demoData).then(res => {
        console.log("postApi 결과", res)
        if (res.status === 200 || res.status === 201) {
          alert("저장 성공");
          this.$router.push({ name: "Demo" });
        } else {
          alert("저장 실패");
        }
      });
    },
    cancel() {
      this.$router.push({ name: "Demo" });
    }
  },
  created() {
    // 초기화
    this.demoData = {
        id: "",
        name: "",
        category: "",
        price: 0,
        regdtm: 0
     };
  }
}
</script>

<style lang="scss">

</style>
