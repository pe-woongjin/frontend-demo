import axios from "axios" 

axios.defaults.baseURL = process.env.VUE_APP_API 
axios.defaults.headers.common["Authorization"] = "testcode" 
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8"

