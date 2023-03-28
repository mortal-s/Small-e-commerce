import { defineStore } from "pinia";

import { getgoods,getallcate,getalljcate,postcate,deletecate } from '@/services/commodity'
//创建商品列表仓库
const commodity = defineStore('commodity',{
      state:()=>{
        return ({
            goodslist:[

            ],
            page:{

            },
            allcate:[

            ], 
            jallcate:[

            ],

        })
      },
      actions:{
           //获取商品列表
          async getgood(value){
            let res = await getgoods(value)
            this.goodslist = res.data.goods
              this.page=res.data
          },
         //获取商品所有动态分类 
         async getallcates(id){
          let res = await getallcate(id)
          if(res.data){
            res.data.forEach(item => {
              if(item.attr_vals){
                  item.attr_vals = item.attr_vals.split(' ');
              }else{
                  item.attr_vals = [];
              }
         });
             return res.data
       }
     },
         //获取商品所有静态分类
         async getalljcates(id){
          let res = await getalljcate(id)
          return res.data
       },
       //添加商品
       async postcates(value){
        let res = await postcate(value)
         if(res.meta.status!=201){
          ElMessage.error(res.meta.msg)
         }else{
          ElMessage({
            message: '添加成功',
            type: 'success',
          })
         }
       },
       //删除商品
       async deletecates(id){
        let res = await deletecate(id)
       if(res.meta.status!=200){
          ElMessage.error('删除失败')
        }else{
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
        }
       }
    }
})
export default commodity