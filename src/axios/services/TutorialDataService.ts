import http from '../config/http-common';

//On utilisera la couche service directement dans les classes, situées dans le dossier store
class TutorialDataService {
   getTest() {
      return http.get('api/users?page=2');
   }

   getAll() {
      return http.get('/tutorials');
   }

   get(id: string) {
      return http.get(`/tutorials/${id}`);
   }

   create(data: any) {
      return http.post('/tutorials', data);
   }

   update(id: string, data: any) {
      return http.put(`/tutorials/${id}`, data);
   }

   delete(id: string) {
      return http.delete(`/tutorials/${id}`);
   }

   deleteAll() {
      return http.delete(`/tutorials`);
   }

   findByTitle(title: string) {
      return http.get(`/tutorials?title=${title}`);
   }
}

export default new TutorialDataService();
