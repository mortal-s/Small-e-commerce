import Myrequest from "@/services/request/request.js"
//发送商品相关的网络请求
function getcategories (value){
     let { type , pagenum,pagesize} =value
     return Myrequest.get({
        url:'/categories',
        params:{
            type, pagenum,pagesize
        }
     })
  }
  //删除商品相关分类
  function deletecategories(id){
     return Myrequest.delete({
        url:'/categories/'+id,
     })
  }
  //添加商品相关分类
  function postcategories(value){
    return Myrequest.post({
        url:'/categories',
        data:{
            ...value
        }
    })
  }
  //获取2级商品分类
  function getcategories2 (value){
    let { type , pagenum,pagesize} =value
    return Myrequest.get({
       url:'/categories',
       params:{
           type, pagenum,pagesize
       }
    })
 }
 //获取要修改的商品分类
  function getputcategories (id){
    return Myrequest.get({
        url:'/categories/'+id
    })
  }
  //发起修改商品分类
  function putcategories(id,cat_name){
     return Myrequest.put({
         url:'/categories/'+id,
         data:{
            cat_name,
         }
     })
  }
  //获取商品分类静态属性
  function getattributes(id,value){
    return Myrequest.get({
         url:'/categories/'+id+'/attributes',
         params:{
            sel:value
         }
    })
  }
  //获取商品分类动态参数
  function getattributesd(id,value){
    return Myrequest.get({
         url:'/categories/'+id+'/attributes',
         params:{
            sel:value
         }
    })
  }
  //添加商品分类静态/动态属性
  function postattributes(id,value){
    return Myrequest.post({
        url:'categories/'+id+'/attributes',
        data:{
           ...value
        }
    })
  }
  //添加商品分类静态/动态详情
   function postdetail(id,attrId,value){
      return Myrequest.put({
         url:'/categories/'+id+'/attributes/'+attrId,
         data:{
           ...value
         }
      })
   }
   //删除商品分类静态/动态详情
   function deletedetail(id,attrid){
      return Myrequest.delete({
         url:'/categories/'+id+'/attributes/'+attrid,
      })
   }
   //获取要删除的静态/动态参数
   function getputattributes(id,attrId,value){
      return Myrequest.get({
         url:'categories/'+id+'/attributes/'+attrId,
         params:{
          ...value
         }
      })
   }
   //修改静态/动态参数
   function putattributes(id,attrId,value){
      return Myrequest.put({
         url:'categories/'+id+'/attributes/'+attrId,
         data:{
          ...value
         }
      })
   }
   //
export {
    getcategories,
    deletecategories,
    postcategories,
    getcategories2,
    getputcategories,
    putcategories,
    getattributes,
    getattributesd,
    postattributes,
    postdetail,
    deletedetail,
    getputattributes,
    putattributes,
}