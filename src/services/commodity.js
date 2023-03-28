import Myrequest from '@/services/request/request'
  
//获取商品列表请求
 function getgoods (value){
    return Myrequest.get({
        url:'/goods',
        params:{
          ...value
        }
    })
 }
 //获取商品动态所有参数
   function getallcate(id){
     return Myrequest.get({
        url:'/categories/'+id+'/attributes',
        params:{
          sel: 'many'
        }
     })
   }
   ///获取商品静态所有属性
   function getalljcate(id){
    return Myrequest.get({
       url:'/categories/'+id+'/attributes',
       params:{
        sel: 'only'
       }
    })
  }
  //添加商品 
  function postcate(value){
     return Myrequest.post({
      url:'/goods',
      data:{
        ...value
      }
     })
  }
  //删除商品
  function deletecate(id){
    return Myrequest.delete({
      url:'/goods/'+id
    })
  }
 export {
    getgoods,
    getallcate,
    getalljcate,
    postcate,
    deletecate
}