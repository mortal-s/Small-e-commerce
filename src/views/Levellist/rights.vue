<template>
    <div class="crumbs">
     <el-breadcrumb separator="/" style="height: 40px;">
    <el-breadcrumb-item :to="{ path: '/list/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
     </el-breadcrumb>
    
    <div class="tables">
    <div class="userdata">
      <el-table :data="permissions" style="width: 100%">
        <el-table-column prop="path" label="权限路径" width="250" />
    <el-table-column prop="authName" label="权限名字" width="250" />
    <el-table-column prop="level" label="权限等级" width="250" >
        <template #default="scope"  >
            <template v-for="i in levels" :key="i.id">
                <el-tag v-if="i.id==scope.row.level" :type="i.zz" > {{scope.row.level +'级'}}</el-tag>
            </template>
      </template>
      
        </el-table-column>
       </el-table>
      </div>
   </div>
    </div>
</template>

<script setup>
import username from "@/stores/username";
import { storeToRefs } from "pinia";
     
    //自定义一个数组 给不同的层级设置不同的按钮类型
     const levels =  [
        {id:0,zz:''}  ,
         {id:1,zz:'success'},
         {
           id:2,zz:'warning'
         } ]
         //创建仓库实例
        const  UsePermiss= username()
        //获取list类型的权限数据
          UsePermiss.Permiss('list')
          //拿到list类型的权限数据进行渲染
       let { permissions} = storeToRefs(UsePermiss)
     
</script>

<style lang="less" scoped>
  .crumbs{
     padding-top: 20px;
      margin-left: 20px;
   }
    .tables{
        margin-top: 20px;
        margin-left: 20px; 
        background-color: #ffffff;
        width: 1100px;
         box-shadow: 4px 4px 4px 4px grey;
       padding-top: 20px;
       padding-left: 20px; 
       padding-bottom: 50px;
       .userdata{
       margin-top: 40px;
       .example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
       }
    }
</style>