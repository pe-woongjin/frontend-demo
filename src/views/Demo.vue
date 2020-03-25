<template>
  <div class="about">
    <h1>Demo page</h1>
    <button type="button" class="btn btn-dark" @click="click">Search</button>
    <button type="button" class="btn btn-secondary" @click="clear">Clear</button>
    <div v-if="totalData === 0">
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
          <tr v-for="item in dataList" :key="item.id">
            <th scope="row">{{item.id}}</th>
            <td>{{item.email}}</td>
            <td>{{item.first_name}}</td>
            <td>{{item.last_name}}</td>
          </tr>
        </tbody>
      </table>
    </div>    
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Demo",
  data: function() {
    return {
      resultData: {},
      totalData: 0,
      dataList: []
    }
  },
  methods: {
    click() {
      axios.get('/api/users').then(res => { 
        console.log(res.data)
        this.resultData = res.data;
        this.totalData = this.resultData.total;
        this.dataList = this.resultData.data;
      })
    },
    clear() {
      console.log("데이터 초기화");
      this.resultData = {};
      this.totalData = 0;
      this.dataList = [];
    }
  },
  created() {
    console.log(process.env)
  }
}
</script>
