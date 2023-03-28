<template>
    <div class="big">
      <div class="top">
            <div class="top1">电商后台管理系统</div>
            <div class="top2"><button @click="quit">退出</button></div>
       </div>
       <div style="float: left;">
    <el-radio-group v-model="isCollapse" style="margin: 20px;">
      <el-radio-button :label="false"> >> </el-radio-button>
      <el-radio-button :label="true">{{ '<<' }}</el-radio-button>
    </el-radio-group>
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse"  unique-opened="true">
  <template v-for="  i in  lists " :key="i.id">
      <el-sub-menu :index="i.id">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ i.authName }}</span>
        </template>
        <template v-for=" o in i.children" :key="o.id">
    <router-link :to="'/list/'+o.path"><el-menu-item :index="o.id"> <el-icon><location /></el-icon>{{o.authName}}</el-menu-item></router-link>
         </template>
    </el-sub-menu>
    </template>
     </el-menu>
    </div>
     <div class="route">
         <router-view/>
      </div>
      
    </div>
   
</template>
<script  setup>
  import { ref} from 'vue'
  import { useRouter } from 'vue-router';
  import {Location} from '@element-plus/icons-vue'
 
  import {storeToRefs} from 'pinia'
  import  username from '@/stores/username'
    //创建仓库实例
  const  uname =username()
  //获取左侧菜单栏数据
     uname.getlists()
     //拿到左侧菜单栏数据渲染页面
 let {lists} = storeToRefs(uname)
   //收缩展开标签
  const isCollapse = ref(true)
   //创建router实例 跳转路由需要使用
  let router=useRouter() 
    //给退出按钮的事件处理函数 清除token 并且跳转路由 
 const quit=()=>{
    window.sessionStorage.clear();
    router.push('/login')
  }
      
         
</script>
<style lang="less" scoped>
.big{
     width: 100%;
   
     .top{
            width:100%;
            background:linear-gradient(125deg,#00A1FF,#75AABE,#B0A8B9);
          
            .top1{
              display: inline-block;
             
            font-size: 38px;
             line-height: 100px;
             height: 100px;
             margin-left: 30px;
             background: linear-gradient(135deg,#D6E5EB,#6b9aac, #B0A8B9);
             -webkit-background-clip: text;
             -webkit-text-fill-color: transparent;
            } 
          .top2{
            display: inline-block;
            margin-left: 1000px;
                button{
              height: 50px;
              width: 100px;
              border-radius: 20px;
              border: none;
              background-color: #0096C1;
              color: #fff;
                }
             }
          }
     .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
    } 
.route{
  background-color:#fff;
  margin-left: 200px;
   width:86.5%;
   }

}

</style>

  
 
  

