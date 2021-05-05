import axios from 'axios';
export default axios.create({
   baseURL: 'https://www.sudoc.fr/services/holdings',
   headers: {
      'Content-type': 'application/json',
   },
});
