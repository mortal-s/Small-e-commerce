<template>
    <div class="crumbs">
      <el-breadcrumb separator="/" style="height: 40px;">
    <el-breadcrumb-item :to="{ path: '/list/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>数据统计</el-breadcrumb-item>
    <el-breadcrumb-item>数据报表</el-breadcrumb-item>
     </el-breadcrumb>
          <div id="tables">
          
          </div>
    </div>
</template>

<script setup>
     import * as echarts from 'echarts'
     import echartss from '@/stores/echarts';
import {  onMounted,ref } from 'vue'
     //创建仓库实例
  const Getechart = echartss()
    //定义初始化 echarts数据变量
let  cdata = ref({})
 //创建一个方法 接收仓库里返回的promise  
let  getStates=async ()=>{
  cdata.value = await Getechart.getechart()
}
  //创建echarts 实例 通过init初始化dom节点
   let $echarts = echarts
   //定义onMouted生命周期函数 当dom渲染完毕时才可以获取dom节点
     onMounted(()=>{
      getStates().then(()=>{
        let myecharts=$echarts.init(document.getElementById("tables"))
     myecharts.setOption({
      title:{
        text:'用户来源'
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis:
          {
            boundaryGap: false,
           type:'category',
           data:cdata.value.xAxis[0].data
         }
        ,
      yAxis:{
          type:cdata.value.yAxis[0].type
         },
    series:[
          {  
            name:cdata.value.series[0].name,
            type:'line',
            data:cdata.value.series[0].data,
           
          
          }, {  
            name:cdata.value.series[1].name,
            type:'line',
            data:cdata.value.series[1].data,
           
           
          },{  
            name:cdata.value.series[2].name,
            type:'line',
            data:cdata.value.series[2].data,
           
           
          }, {  
            name:cdata.value.series[3].name,
            type:'line',
            data:cdata.value.series[3].data,
           
          
          }, {  
            name:cdata.value.series[4].name,
            type:'line',
            data:cdata.value.series[4].data,
           
            
          }
         ]
        
     })
      })
  })
</script>

<style lang="less" scoped>
 .crumbs{
    padding-top: 20px;
      margin-left: 20px;
      #tables{
        margin-top: 20px;
        margin-left: 20px; 
        background-color: #ffffff;
        width: 900px;
        height:580px;
       box-shadow: 4px 4px 4px 4px grey;
       padding-top: 20px;
       padding-left: 20px; 
     
      }
  }
</style>
 
