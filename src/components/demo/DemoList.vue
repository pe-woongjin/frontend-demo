<template>
  <div class="demo">
    <div align="right">
      <button type="button" class="btn btn-dark" @click="search">Search</button> &nbsp;&nbsp;
      <button type="button" class="btn btn-secondary" @click="clear">Clear</button>
    </div>
    <br>
    <div v-if="totalData === 0">
        <noDataPage></noDataPage>
    </div>
    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Email</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataList" :key="item.id" @click="sbstbtn(item)">
            <th scope="row">{{item.id}}</th>
            <td>{{item.email}}</td>
            <td>{{item.first_name}}</td>
            <td>{{item.last_name}}</td>
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
      resultData: {},
      totalData: 0,
      dataList: []
    }
  },
  methods: {
    search() {
      // api 호출
      axios.getApi('/api/users').then(res => {
        this.resultData = res.data;
        this.totalData = this.resultData.total;
        this.dataList = this.resultData.data;
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
    }
  },
  created() {
    console.log(process.env)
    this.clear();
  }
}
</script>
