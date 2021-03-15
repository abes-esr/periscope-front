import axios from "axios";

//Pour tester l'api -> https://reqres.in/
//Par defaut -> http://localhost:8080/api
export default axios.create({
  baseURL: "http://localhost:8081/api/v1",
  //baseURL: "http://cirse1-dev.v212.abes.fr:8134/periscope/api/v1/",
  headers: {
    "Content-type": "application/json"
  }
});


