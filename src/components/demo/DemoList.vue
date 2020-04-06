<template>
  <div class="demo">
    <div align="right">
      <button type="button" class="btn btn-dark" @click="search">Search</button> &nbsp;&nbsp;
      <button type="button" class="btn btn-secondary" @click="clear">Clear</button>
    </div>
    <br>
    <div v-if="dataList.size === 0">
        <noDataPage></noDataPage>
    </div>
    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">category</th>
            <th scope="col">price</th>
            <th scope="col">regdtm</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataList" :key="item.id" @click="sbstbtn(item)">
            <th scope="row">{{item.name}}</th>
            <td>{{item.category}}</td>
            <td>{{item.price}}</td>
            <td>{{dateConvert(item.regdtm)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <br>
    <div align="right">
      <button type="button" class="btn btn-dark" @click="add">add</button>
    </div>    
  </div>
</template>

<script>
import axios from "@/api/axios";
import noDataPage from "../common/NoDataPage.vue";

export default {
  name: "DemoList",
  components: { noDataPage },
  data: function() {
    return {
      dataList: []
    }
  },
  methods: {
    search() {
      // api 호출
      axios.getApi('/v1/products').then(res => {
        this.dataList = res.data;
        console.log(">>", this.dataList);
      });
    },
    clear() {
      console.log("데이터 초기화");
      this.resultData = {};
      this.totalData = 0;
      this.dataList = [];
    },
    add() {
      console.log("데이터 추가");
      this.$router.push({name : "DemoCreate"});
    },
    sbstbtn(item) {
      console.log("데이터 확인 : ", item);
      this.$router.push({ name: "DemoSbst", query: {id: item.id } });
    },
    dateConvert(date) {
      return this.$moment(date).format('YYYY-MM-DD hh:mm');
    }
  },
  created() {
    console.log(process.env)
    this.clear();
    this.search();
  }
}
</script>
