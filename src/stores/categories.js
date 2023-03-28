import { defineStore } from "pinia";
import { getcategories,deletecategories,postcategories,getcategories2,getputcategories,putcategories,
  getattributes,getattributesd,postattributes,postdetail,deletedetail,getputattributes,putattributes} from '@/services/categories'

///创建商品分类仓库
const categories = defineStore('defineStore',{
     state:()=>({
            categorie:[

            ],
            categorie2:[

            ],
            attribute:[

            ],
            attributed:[

            ]
 }),
     
     actions:{
        //获取商品分类数据
         async getcategorie (value){
            let res = await getcategories(value)
            this.categorie=res.data.result

         },
         //删除商品分类数据
         async deletecategorie(id){
          let res = await deletecategories(id)
           if(res.meta.status!==200){
            ElMessage.error('删除失败')
           }else{
           ElMessage({
              message: '删除成功',
              type: 'success',
            })
           }   
         },
         //添加商品分类数据
         async postcategorie(value){
            let res = await postcategories(value)
           
            if(res.meta.status!=201){
                ElMessage.error('添加失败')
            }else{
                this.categorie.push(res.data)
                ElMessage({
                    message: '添加成功',
                    type: 'success',
                  })
            }
         },
         //获取2级商品分类
         async getcategorie2(value){
            let res = await getcategories2(value)
           this.categorie2=res.data.result
         },
         //获取要修改的数据
         async getputcategorie(id){
            let res =await getputcategories(id)
           return res.data
         },
         //修改商品分类数据
         async putcategorie(id,cat_name){
            let res  = await putcategories(id,cat_name)
            if(res.meta.status!=200){
                ElMessage.error('修改失败')
            }else{
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                  })
            }
         },
         //获取商品分类静态参数
         async getattribute(id,value){
          let res = await getattributes(id,value)
          if(res.data){
            res.data.forEach(item => {
              if(item.attr_vals){
                  item.attr_vals = item.attr_vals.split(' ');
              }else{
                  item.attr_vals = [];
              }
              // 按钮和文本框的切换
              item.inputVisible= false;
              // 文本框中输入的内容
              item.inputValue= '';
          });
          this.attribute=res.data
       }
          
         },
         //获取商品分类动态参数
         async getattributed(id,value){
          let res = await getattributesd(id,value)
         res.data.forEach(item => {
            if(item.attr_vals){
                item.attr_vals = item.attr_vals.split(' ');
            }else{
                item.attr_vals = [];
            }
            // 按钮和文本框的切换
            item.inputVisible= false;
            // 文本框中输入的内容
            item.inputValue= '';
        });
        this.attributed=res.data
      },
        //添加商品分类静态/动态属性
        async postattribute(id,value){
          let res =await postattributes(id,value)

          if(res.meta.status!=201){
            ElMessage.error('添加失败')
          }else{
            ElMessage({
                message: '添加成功',
                type: 'success',
              })
        }
        },
        //添加商品详情静态/动态属性
        async postdetails(id,attrId,value){
         let res = await postdetail(id,attrId,value)
         if(res.meta.status!=200){
            ElMessage.error('失败')
           }else{
            ElMessage({
                message: '成功',
                type: 'success',
              })
        }
        },
        //删除商品参数的静态/动态属性
        async deletedetails(id,attrid){
          let res = await deletedetail(id,attrid)
          if(res.meta.status!=200){
            ElMessage.error('删除失败')
          }else{
            ElMessage({
                message: '删除成功',
                type: 'success',
              })
        }
        },
        //获取要修改的商品参数静态/动态
        async getputattribute(id,attrId,value){
          let res = await getputattributes(id,attrId,value)
          if(res.meta.status!=200){
            ElMessage.error('网络错误')
          }else{
            ElMessage({
                message: '获取成功',
                type: 'success',
              })
              return res.data
        }
        },
        //修改商品的静态/动态参数
        async putattribute(id,attrId,value){
          let res = await putattributes(id,attrId,value)
        if(res.meta.status!=200){
            ElMessage.error('修改失败')
          }else{
            ElMessage({
              message: '获取成功',
              type: 'success',
            })
          }
        }
    }   
})
export default categories