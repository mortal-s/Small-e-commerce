import Myrequest from "@/services/request/request.js"

    ///发送请求左侧菜单数据请求
     function getlist (){
    return  Myrequest.get({url:'/menus'})
    }
     ///发送请求用户数据请求
     function getuser (value){
        let {query,pagenum, pagesize}=value
        return Myrequest.get({
            url:'/users',
            params:{
                query,pagenum, pagesize
          }
            })
     }
     ///发送添加数据请求
     function adduser (value){
       
         return Myrequest.post({
             url:'/users',
           data:{...value} 
         })
     }
     //发送删除数据请求
     function Deletes (id){
         return Myrequest.delete({
            url:'/users/'+id,
       })
      
     }
     //发送获取要修改的数据请求
     function getputuse(id){
      return Myrequest.get({
        url:'/users/'+id
   })  
     }
     //发送修改数据的请求
     function putuse (id,params){
      return Myrequest.put({
        url:'/users/'+id,
        data:{ ...params }
   })  
     }
     //发送获取权限等级数据的请求
     function getPermissions(type){
      return Myrequest.get({
        url:'/rights/'+type
    })
    }
    //获取角色权限列表
    function getroles(){
       return Myrequest.get({
               url:'/roles'
       }) 
    }
    //添加角色列表
    function postroles(value){
       return Myrequest.post({
         url:'roles',
         data:{
           ...value
         }
       })
    }
    //删除角色列表
    function deleteroles(id){
       return Myrequest.delete({
         url:'/roles/'+id
       })
    }
    //获取要修改的列表
     function getputroles(id){
      return  Myrequest.get({
         url:'/roles/'+id
      })
     }
    //编辑角色列表
    function putroles(id,params){
      return Myrequest.put({
         url:'/roles/'+id,
         data:{...params}
      })
    }
    //删除指定角色权限
    function deleterolesqx(roleId,rightId){
      return Myrequest.delete({
        url:'roles/'+roleId+'/rights/'+rightId
      })
    }
    //分配用户角色
    function assignmentroles(id,value){
      return Myrequest.put({
        url:'/users/'+id+'/role',
        data:{
           ...value
        }
      })
    }
    //分配角色权限
    function putrolesrights(roleId,value){
      return Myrequest.post({
        url:'/roles/'+roleId+'/rights',
        data:{
          ...value
         }
      })
    }
export {
    getlist,
    getuser,
    adduser,
    Deletes,
    getputuse,
    putuse,
    getPermissions,
    getroles,
    postroles,
    deleteroles,
    getputroles,
    putroles,
    deleterolesqx,
    assignmentroles,
    putrolesrights
}