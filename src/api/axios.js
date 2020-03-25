import axios from "axios" 

axios.defaults.baseURL = "https://reqres.in" 
axios.defaults.headers.common["Authorization"] = "testcode" 
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8"

