import axios from "axios";

//Pour tester l'api -> https://reqres.in/
//Par defaut -> http://localhost:8080/api
export default axios.create({
  baseURL: "https://reqres.in/",
  headers: {
    "Content-type": "application/json"
  }
});
