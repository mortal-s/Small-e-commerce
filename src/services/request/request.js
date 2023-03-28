import axios from "axios";
class Myrequest {
  constructor(){
        this.instance=axios.create({
             baseURL:'http://localhost:8888/api/private/v1',
             timeout:2000
        })
        this.instance.interceptors.request.use(config =>{
          config.headers['Authorization'] = window.sessionStorage.getItem('token')
          return config
        })
      }
      
      request(config){
       
        return new Promise((resolve,reject)=>{
             this.instance.request(config).then(result =>{
                resolve(result.data)
             }).catch(error=>{
                 reject(error)
             })
        })
    }
      get(config){
        return this.request({method:'GET',...config})
      }
      post(config){
        return this.request({method:'POST',...config})
      }
      delete(config){
         return this.request({method:'DELETE',...config})
      }
      put(config){
        return this.request({method:'PUT',...config})
      }
}
export default new Myrequest()