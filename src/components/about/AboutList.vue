<template>
  <div class="about">
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
      // api 호출 직접호출
      axios.get('https://reqres.in/api/users').then(response => {
        console.log("axios 개별 호출");
        this.resultData = response.data;
        this.totalData = this.resultData.total;
        this.dataList = this.resultData.data;
        return response;
      }).catch(error => {
        const{ status } = error.response;
        console.log(status);
        console.log("error message", error);
        throw error
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
