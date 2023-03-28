import {  defineStore} from 'pinia'
import  { getlist,getuser,adduser,Deletes,getputuse,
   putuse,getPermissions,getroles,postroles,deleteroles,getputroles,
   putroles,deleterolesqx,assignmentroles,putrolesrights
    } from '@/services/username'




    const username = defineStore('username',{
       state:()=>({
             lists:[

             ],
             userInformation:[

             ],
             addusers:{

             },
             permissions:[

             ],
             aaa:{

             },
             roles:[

             ],
             rolesper:{

             },
             page:{
              
             }
           
       }),
      
       actions:{
             //获取左侧菜单栏数据
            async getlists (){
               let res = await getlist()
              this.lists=res.data
            },
            //获取用户数据
            async getusers(value){
               let res = await getuser(value)
               if(res.meta.status!=200){
                  ElMessage.error('获取失败')
            }else{
               this.userInformation=res.data.users
               this.page=res.data
           }   
              
            },
            //获取添加用户数据
            async adduse (value){
               let res = await adduser(value)
               if(res.meta.status!=201){
                     ElMessage.error('添加失败')
               }else{
                  this.addusers=res.data 
                  this.userInformation.push(this.addusers)
                   ElMessage({
                    message: '添加成功',
                    type: 'success',
                  })
               }   
             },
            //根据id删除用户
            async DElete123 (id){
             let res= await Deletes(id)
             if(res.meta.status!=200){
               ElMessage.error('删除失败')
         }else{
              ElMessage({
              message: '删除成功',
              type: 'success',
            })
         } 
             },
             //获取要编辑的用户数据
             async Getputuse (id){
               let res = await getputuse(id)
                 this.aaa =res.data
             },
             //编辑用户数据
             async Putuse (id,params){
               let res =await putuse(id,params)
               if(res.meta.status!=200){
                  ElMessage.error('修改失败')
            }else{
               ElMessage({
                 message: '修改成功',
                 type: 'success',
               })
            } 
            },
             //获取权限等级
             async Permiss (type){
               let res =await getPermissions(type)
                if(res.meta.status!=200){
                     ElMessage.error('获取列表失败')
               }else{
                 this.permissions=res.data
               } 
             },
             //获取角色数据
             async getrole(){
               let res =await getroles()
               if(res.meta.status!=200){
                  ElMessage.error('获取列表失败')
            }else{
               this.roles=res.data
           } 
         },
             //添加角色数据
             async postrole(value){
               let res = await postroles(value)
                if(res.meta.status!=201){
                  ElMessage.error('添加失败')
            }else{
               this.roles.push(res.data)
               ElMessage({
                 message: '添加成功',
                 type: 'success',
               })
            } 
                
             },
             //根据id删除角色
             async Deleterole(id){
             let res= await deleteroles(id)
             if(res.meta.status!=200){
                   return ElMessage.error('删除失败')
             }else{
               ElMessage({
                  message: '删除成功',
                  type: 'success',
                })
             } 
             },
             //获取要修改的角色数据
             async getputrole(id){
               let res = await getputroles(id)
               return res.data
             },
             //修改角色数据
             async putrole(id,params){
               let res = await putroles(id,params)
               if(res.meta.status!=200){
                  return ElMessage.error('删除失败')
            }else{
                ElMessage({
                 message: '修改成功',
                 type: 'success',
               })
           } 
            },
               //删除指定角色权限
               async deleteroleqx(roleId,rightId){
                let res = await deleterolesqx(roleId,rightId)
                if(res.meta.status!=200){
                  ElMessage.error('删除失败')
                }else{
                  ElMessage({
                    message: '删除成功',
                    type: 'success',
                  })
                }
               },
               //分配用户角色
              async assignmentrole(id,value){
                let res = await assignmentroles(id,value)
               if(res.meta.status!==200){
                 return  ElMessage.error(res.meta.msg)
                }else{
                  ElMessage({
                    message: res.meta.msg,
                    type: 'success',
                  })
                }
              },
              // 分配角色权限
              async putrolesright(id,value){
                let res =await putrolesrights(id,value)
                  console.log(res)
                if(res.meta.status!=200){
                  ElMessage.error('分配失败')
                }else{
                  ElMessage({
                    message:'分配成功',
                    type:'success'
                  })
                }
              }
}

    });
 export default username

