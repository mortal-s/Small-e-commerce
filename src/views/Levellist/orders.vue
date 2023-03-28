<template>
    <div class="crumbs">
      <el-breadcrumb separator="/" style="height: 40px;">
    <el-breadcrumb-item :to="{ path: '/list/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    <el-breadcrumb-item>订单列表</el-breadcrumb-item>
     </el-breadcrumb>
    
          <div class="tables">
            <el-input v-model="aa.query" placeholder="请输入内容"  style="width: 330px;height: 50px;"/>
        <el-button :icon="Search" style=" height:50px ;width: 50px;" @click="SEarch()" />
        <el-button  @click="centerDialogVisible = true" type="primary" style="height: 50px;">根据订单查询物流信息</el-button>
            <div class="example-pagination-block">
               <div class="userdata">
            <el-table :data="orderslist" style="width: 100%;margin-bottom: 30px;" current-row-key="order_id">
              <el-table-column fixed prop="order_number" label="订单号" width="190" />
              <el-table-column  label="支付状态" width="120" >
                <template #default="scope">
               {{ (scope.row.pay_status==0) ?  "未支付" : "已支付" }}
                </template>
              </el-table-column>
              <el-table-column prop="is_send" label="是否发货" width="120" />
              <el-table-column prop="order_price" label="订单价格/￥" width="120" />
              <el-table-column prop="consignee_addr" label="订单地址" width="190" />
              <el-table-column label="创建时间" width="190" >
         <template #default="scope">
                {{ fordatemat(scope.row.create_time) }}
         </template>
        </el-table-column>
      <el-table-column fixed="right"  label="操作" width="150">
      <template #default="scope">
      <!-- 删除用户按钮 -->
           <el-tooltip effect="dark" content="修改订单状态" placement="top" :enterable="false">
            <el-button type="danger" :icon="EditPen" size="mini" @click="Delete(scope.row.order_id)">
            </el-button>
        </el-tooltip>
         <!-- 编辑用户按钮 -->
        <el-tooltip effect="dark" content="修改订单地址" placement="top" :enterable="false">
            <el-button type="primary" :icon="EditPen" size="mini" @click="Edit(scope.row.order_id)">
            </el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
        </div>
  <el-pagination class="page" layout="prev, pager, next" :page-count="Math.ceil(pages)" v-model:current-page="sss" @update:current-page="b()"/>
        </div>
          </div>
    </div>
</template>

<script setup>
  import { Search } from '@element-plus/icons-vue';
  import { computed, reactive, ref,} from 'vue'
  import {storeToRefs} from 'pinia'
  import orders  from '@/stores/orders'
  import { fordatemat} from '@/hooks/date'
  import { EditPen,CloseBold } from '@element-plus/icons-vue';
  //定义 获取数据时的分页  pagenum为第几页  pagesize一页8组数据
  let aa = reactive({
      query:'',
      pagenum:1,
     pagesize:6,
})


//创建pinia 仓库实例对象 usernames  调用仓库里的方法  获取数据并渲染页面
     const Orders =orders()
         Orders.getorder(aa)
     let {orderslist,page} =storeToRefs(Orders)
 ///把分页组件第几页的值 双向绑定 为的是拿到值 实现点击第几页 就拿第几页数据的效果
  let sss=ref()
    let b=()=>{
      aa.pagenum=sss.value,
      aa.pagesize=6
     Orders.getorder(aa)
}
    //计算总共有几页
     let pages= computed(()=>{
     return page.value.total/aa.pagesize
    })

   
      //搜索按钮 
      const SEarch = async()=>{
   await Orders.getorder(aa)
   }
</script>

<style lang="less" scoped>
.crumbs{
    padding-top: 20px;
      margin-left: 20px;
      .tables{
        margin-top: 20px;
        margin-left: 20px; 
        background-color: #ffffff;
        width: 1100px;
        
       box-shadow: 4px 4px 4px 4px grey;
       padding-top: 20px;
       padding-left: 20px; 
        .example-pagination-block{
          margin-top: 20px;
        }
        .page{
          padding-bottom: 20px;
        }
      }
  }
</style>