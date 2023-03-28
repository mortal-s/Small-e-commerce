<template>
  <el-form
  :model="postroles"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
  <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="postroles.roleName" />
    </el-form-item>
  <el-form-item label="角色描述" prop="roleDesc">
      <el-input v-model="postroles.roleDesc" />
    </el-form-item>
  <el-form-item>
      <el-button type="primary" @click="submitForm()">提交添加</el-button>
      <el-button @click="resetForm()">全部重置</el-button>
    </el-form-item>
  </el-form>
</template>


<script setup>
   import username from '@/stores/username';
import { ref,reactive } from 'vue';
    let postroles =ref({
      roleName:'',
      roleDesc:''
    })
     ///根据正则一系列的判断 让输入框内的内容合法化
 
const accounts = (rule, value, callback) => {
  if (value === "") {
    return callback(new Error("请输入角色名"));
  }
  if (!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(value)) {
    callback(new Error("角色名只支持中文英文数字下划线！"));
  } else {
    callback();
  }
};

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入角色描述信息"));
  } else {
    callback();
  }
};
 
const rules = reactive({
  roleName: [{ validator: accounts, trigger: "blur" }],
  roleDesc: [{ validator: validatePass, trigger: "blur" }],
});
   //创建仓库实例
const Username = username()
  //定义要传过去的数据
  let  shows=false
 //通过defineEmits 接收父组件自定义事件 通过事件处理函数 以父组件自定义的事件标识将数据传给父组件
const emit = defineEmits(['showaddroles'])
//添加事件处理函数  添加数据 上传数据 并且刷新数据 
  const submitForm = async ()=>{
   await Username.postrole(postroles.value)
   await Username.getrole()
    postroles.value.roleName=''
    postroles.value.roleDesc=''
    emit('showaddroles',shows)
  }
 const resetForm =()=>{
    postroles.value.roleName=''
    postroles.value.roleDesc=''
 }

</script>


<style lang="less" scoped>

</style>

