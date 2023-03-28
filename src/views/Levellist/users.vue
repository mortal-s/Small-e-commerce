<template>
    
        <div class="crumbs">
     <el-breadcrumb separator="/" style="height: 40px;">
    <el-breadcrumb-item :to="{ path: '/list/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
     </el-breadcrumb>
   
    <div class="tables">
        <el-input v-model="aa.query" placeholder="请输入内容"  style="width: 330px;height: 50px;"/>
        <el-button :icon="Search" style=" height:50px ;width: 50px;" @click="SEarch()" />
        <el-button  @click="centerDialogVisible = true" type="primary" style="height: 50px;">添加用户</el-button>
          <el-dialog v-model="centerDialogVisible" title="请填写用户信息" width="30%" center>
                <adduser @sendHandle="showjiemian"></adduser>
          </el-dialog>
          <el-dialog title="分配角色" width="70%" v-model="setRoleDialogVisible">
   	<div>
       <p>用户: {{ user.username }}</p>
       <p>角色: {{ user.role_name }}</p>
       <p>分配新的角色: 
           <el-select v-model="selectRoleId" placeholder="请选择">
                    <el-option
                      v-for="item in rolesList"
                      :key="item.id"
                      :label="item.roleName"
                      :value="item.id">
                    </el-option>
           </el-select>
       	</p>
    </div>
    <span class="dialog-footer">
        <el-button @click="ccc">取 消</el-button>
        <el-button type="primary" @click="confirmUserRole">确 定</el-button>
    </span>
</el-dialog>
     <el-dialog v-model="centerDialog" title="请修改用户信息" width="30%" center>
       
  <el-form
    
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" />
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.mobile"  type="password" autocomplete="off"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm()">提交修改</el-button>
      <el-button @click="resetForm()">全部清空</el-button>
    </el-form-item>
  </el-form>
  
         </el-dialog>
      <div class="example-pagination-block">
        <div class="userdata">
            <el-table :data="userInformation" style="width: 100%;margin-bottom: 30px;" current-row-key="id">
       <el-table-column fixed prop="id" label="ID" width="150" />
       <el-table-column prop="role_name" label="角色" width="150" />
       <el-table-column prop="username" label="用户名" width="150" />
       <el-table-column prop="mobile" label="密码" width="160" />
       <el-table-column prop="email" label="邮箱" width="190" />
    
      <el-table-column fixed="right"  label="操作" width="190">
      <template #default="scope">
         <!-- 删除用户按钮 -->
        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" :icon="Delete" size="mini" @click="Deletel(scope.row.id)">
            </el-button>
        </el-tooltip>
         <!-- 编辑用户按钮 -->
        <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" :icon="EditPen" size="mini" @click="Edit(scope.row.id)">
            </el-button>
        </el-tooltip>

         <!-- 分配角色按钮 -->
         <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" :icon="User" size="mini" @click="setRole(scope.row)">
            </el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
        </div>
  <el-pagination layout="prev, pager, next" :page-count="Math.ceil(pages)" v-model:current-page="sss" @update:current-page="b()"/>
   </div>
    </div>
   
    </div>
  
</template>

<script setup>
import adduser from '@/components/usercomponents/adduser.vue';
   import { Search } from '@element-plus/icons-vue';
  import { computed, reactive, ref,} from 'vue'
  import {storeToRefs} from 'pinia'
  import username from '@/stores/username';
  import { User,Delete,EditPen} from '@element-plus/icons-vue';
//定义 获取数据时的分页  pagenum为第几页  pagesize一页8组数据
  let aa = reactive({
      query:'',
      pagenum:1,
     pagesize:8,
})


//创建pinia 仓库实例对象 usernames  调用仓库里的方法  获取数据并渲染页面
     const usernames =username()
     usernames.getusers(aa)
     let {userInformation,page} =storeToRefs(usernames)
 ///把分页组件第几页的值 双向绑定 为的是拿到值 实现点击第几页 就拿第几页数据的效果
  let sss=ref()
    let b=()=>{
  aa.pagenum=sss.value,
  aa.pagesize=8
  usernames.getusers(aa)
}
    //计算总共有几页
     let pages= computed(()=>{
     return page.value.total/aa.pagesize
    })

   
      //搜索按钮 
      const SEarch = async()=>{
   await usernames.getusers(aa)
   }
     
/// 添加一个标识 用于判断 添加的弹出框是否显示
  const centerDialogVisible = ref(false)
   /// 定义showjiemian 函数 接收子组件传来的数据  然后重新定义centerDialogVisible标识的值 
   const showjiemian =(val)=>{
    centerDialogVisible.value=val.value
  }

  ///给删除按钮添加一个事件处理函数 删除id标识下的数据
  const Deletel=async (id)=>{
  await  usernames.DElete123(id)
  await  usernames.getusers(aa)
  }

  ///编辑页面 默认设置不让编辑页面显示
   const centerDialog =ref(false)
   let ruleForm = ref({
    email:'',
    username:'',
    mobile:''
})  
   ///定义一个变量 保存 所选id的值
   let uid = ref()
   ///给编辑按钮添加一个事件处理函数  通过标识判断让编辑页面的显示 进行数据的回显及编辑  以及将id值保存给uid
     const  Edit =async (id)=>{
    centerDialog.value=true
     await usernames.Getputuse(id)
    // ruleForm.value    =  await usernames.Getputuse(id)
      const { aaa} =storeToRefs(usernames)
       const cc = computed(()=>{
             return aaa.value
        })
        ruleForm.value=cc.value
          uid.value=id
   }
 
 ///根据正则一系列的判断 让输入框内的内容合法化
 const mailboxs = (rule, value, callback) => {
  if (value === "") {
    return callback(new Error("请输入邮箱"));
  }
  if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
  ) {
    callback(new Error("请输入正确的邮箱格式"));
  } else {
    callback();
  }
};
const accounts = (rule, value, callback) => {
  if (value === "") {
    return callback(new Error("请输入用户名"));
  }
  if (!/^[0-9A-Za-z]{5,24}$/.test(value)) {
    callback(new Error("请输入6-24位的纯数字或者字母"));
  } else {
    callback();
  }
};

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};
 
const rules = reactive({
  email: [{ validator: mailboxs, trigger: "blur" }],
  username: [{ validator: accounts, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
});
   //给编辑组件内 的确认提交按钮 提供一个事件处理函数  点击之后真正的修改数据 并且让编辑组件关闭
const submitForm = async () => {
  if (!/^[0-9A-Za-z]{5,24}$/.test(ruleForm.username)) {
    alert("用户名错误");
    return;
  }
     centerDialog.value=false
  await usernames.Putuse(uid.value,ruleForm.value)
  await usernames.getusers(aa);
};
  ///给编辑组件内 的清空按钮 提供一个事件处理函数 点击之后将输入框的数据全部清空
     let resetForm = () => {
  (ruleForm.value.email = ""), (ruleForm.value.username = ""), (ruleForm.value.mobile = "");
}; 
         //给用户分配角色
       const setRoleDialogVisible =ref(false)
         const user = ref({})
         const rolesList= ref([])
         const selectRoleId = ref('')
      const setRole= async (users)=>{
            // 1、先把用户的角色保存到data中,并在页面显示
            user.value = users;
          
            // 2、获取所有的角色
           await usernames.getrole()
            let {roles} =storeToRefs(usernames)
           
          rolesList.value = roles.value
            setRoleDialogVisible.value = true;
        }
        //确认分配按钮点击事件处理函数
        const confirmUserRole =async ()=>{
         await usernames.assignmentrole(user.value.id,{rid:selectRoleId.value})
         await  usernames.getusers(aa)
          setRoleDialogVisible.value = false
      
        }
        const ccc = ()=>{
          setRoleDialogVisible.value = false
      }
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
        height: 100%;
       box-shadow: 4px 4px 4px 4px grey;
       padding-top: 20px;
       padding-left: 20px; 
       padding-bottom: 50px;
       .userdata{
       margin-top: 40px;
       }
    
 
    }
</style>
  
