import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common = { "X-Requested-With": "XMLHttpRequest" };
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";

const getApi = (url) => {
    return axios.get(url).then(response => {
        console.log("axios GetApi request success");
        return response;
    }).catch(error => {
        const{ status } = error.response;
        console.log(status);
        console.log("axios GetApi error message", error);
        throw error
    })
  }

const postApi = (url, param) => {
  return axios.post(url, param).then(response => {
      console.log("axios PostApi request success");
      return response;
  }).catch(error => {
      const{ status } = error.response;
      console.log(status);
      console.log("axios PostApi error message", error);
      throw error
  })
}

  
export default {
  getApi,
  postApi
};