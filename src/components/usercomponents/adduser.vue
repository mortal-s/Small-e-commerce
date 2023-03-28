<template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
    <el-form-item label="昵称" prop="role_name">
        <el-input v-model="ruleForm.role_name" />
      </el-form-item>
    <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
    <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"  />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="mobile">
        <el-input v-model="ruleForm.mobile" type="password" autocomplete="off"/>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交添加</el-button>
        <el-button @click="resetForm()">全部重置</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script  setup>
  import { reactive, ref } from 'vue'
   import username from '@/stores/username';
     //定义添加窗口的显示与隐藏标识
   let shows = ref(false)
    //定义添加窗口的表单初始数据
   let ruleForm = reactive({
    role_name:'',
    email: '',
    username:'',
    password:'',
    mobile: '',
 })
  //创建仓库数据
 const add = username()

   //接收父组件发送过来的自定义事件
  const emit = defineEmits(['sendHandle'])
   //进行一系列正则表达式 提示表单的合法性
  const usernames=(rule, value, callback)=>{
       if(value===''){
         callback(new Error('请输入昵称'))
       }else{
        callback()
       }
  }
  const mailboxs = (rule, value, callback) => {
    if (value==='') {
     return  callback(new Error('请输入邮箱'))
    } 
     if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
        callback(new Error('请输入正确的邮箱格式'))
      } else {
        callback()  
      }
  
  }
  const accounts = (rule, value, callback)=>{
      if(value===''){
      return callback(new Error('请输入用户名'))
      }
      if(!/^[0-9A-Za-z]{5,24}$/.test(value)){
         callback(new Error('请输入5-24位的纯数字或者字母'))
       }else{
        callback()  
       }
  }

  
  const validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      callback()
    }
  }
  const validatePass2 = (rule, value, callback) => {
    if (value === '') {
    return  callback(new Error('请再次输入密码'))
    } 
    if(value !== ruleForm.password) {
     callback(new Error("两次密码不一致"))
    } else {
      callback()
    }
  }
   const rules = reactive({
    role_name:[{validator: usernames,trigger: 'blur' }],
    email: [{ validator: mailboxs, trigger: 'blur' }],
    username:[{validator: accounts,trigger: 'blur'  }],
    password: [{ validator: validatePass, trigger: 'blur' }],
    mobile: [{ validator: validatePass2, trigger: 'blur' }],
  })
   //定义初始发送分页请求的数据
 let aa = reactive({
  pagenum:1,
   pagesize:8,
})
  //添加按钮的事件处理函数 以正则判断是否可以添加成功
  const submitForm = async() => {
    if(!/^[0-9A-Za-z]{5,24}$/.test(ruleForm.username)){
       alert('用户名错误')
       return
    }
    if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(ruleForm.email)){
       alert('邮箱错误')
        return
    }
    //通过自定义事件给父组件传入参数 参数是添加窗口的标识变量
    emit('sendHandle',shows)
    // 上传添加用户数据
    await add.adduse(ruleForm)
    // 刷新用户数据
    await  add.getusers(aa)
    //表单内容清空
      ruleForm.role_name='',
      ruleForm.email='',
      ruleForm.username='',
      ruleForm.password='',
      ruleForm.mobile= ''
  }

   // 重置按钮 清空表单内容
  let resetForm = () => {
     ruleForm.role_name='',
      ruleForm.email='',
      ruleForm.username='',
      ruleForm.password='',
      ruleForm.mobile= ''
    }
   
</script>
   <style lang="less" scoped>
   
   </style>