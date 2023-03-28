<template>
  <canvas id="canvas"></canvas> 
<div class="big">
  <div class="login">
   <div class="imge"><img src="@/assets/img/223103-1602858663b194.jpg" alt="" style="width:180px;height:180px;"></div>
      <van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
    id="1"
    required="true"
      v-model="username"
      name="用户名"
      label="用户名:"
      placeholder="用户名"
      :rules="[{ pattern, message: '你的用户名格式有误' }]"
      style="background-color: 	#00CED1;"
    />
    <van-field 
    required="true"
    cc-number
        id="1"
      v-model="password"
      type="password"
      name="密码"
      label="密码:"
      placeholder="密码"
      :rules="[{validator, message: '你的密码格式错误'}]"
      style="background-color: 	#00CED1;"
    />
  </van-cell-group>
  <div style="margin-left: 330px;margin-top: 16px;">
    <van-button  color="linear-gradient(to right, #2F4F4F, #00FFFF)" native-type="submit">
      提交
    </van-button>&nbsp;&nbsp;&nbsp;&nbsp;
    <van-button color="linear-gradient(to right, #2F4F4F,#00FFFF)" @click="onsub">
      重置
    </van-button>
  </div>
</van-form>
</div>
    </div>
  
</template>

<script setup>

import axios from 'axios';
import { onMounted, ref, } from 'vue';
import { useRouter } from 'vue-router';

  //创建路由实例
const router=useRouter()
  //初始化定义账号输入框数据
const username = ref('');
 //初始化定义密码输入框数据
    const password = ref('');
    //定义账号正则表达式 并且去判断
    const pattern = /^[a-zA-Z0-9_-]{4,16}$/;
    const validator = (val) =>/^(0|[1-9][0-9]*)$/.test(val)
      //点击 发送登录 发送网络请求 传入账号密码数据 如果正确添加token 跳转路由
    const onSubmit = async (values)=>{
      let  {data:res} =await axios.post('http://localhost:8888/api/private/v1/login',{username:username.value,
        password:password.value }) 
       if(res.meta.status==200){
          window.sessionStorage.setItem('token',res.data.token)
          router.push('/list')
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
        }else{
          alert(res.meta.msg)
        }
       
   }
       //重置表单内容
   const onsub=()=>{
        password.value=''
        username.value=''
    }
    onMounted(()=>{
      const width = document.querySelector('#canvas').width = screen.availWidth;
        const height = document.querySelector('#canvas').height = screen.availHeight;
        // 获取 canvas 的绘图上下文
        const ctx = document.querySelector('#canvas').getContext("2d");
        // 创建一个大小为 width/10 的数组并填充为 0
        const arr = Array(Math.ceil(width / 10)).fill(0);
        // 创建一个字符串数组,用于存储字符。
        const str = "✧010101☹︎010101010101☠︎☸︎☣︎☢︎☯︎♾♲✰❤︎✦⚛︎☭☮︎⚔︎⚒︎☄︎✵0101010101011010101010101010101⚰︎☘︎⚘♨︎✞☺︎♘♞☆☃︎★☼☀︎☾◎☽0101011010101101☁︎™Ω℞№ℹ︎❂❁✡︎✣0101010101✶✺✷◦◉⦿☒✗☐☞◇☛⚙︎☑︎⌘✘✔︎".split("");
        ctx.font = "10px 优设标题黑";
        function rain() {
            // 设置颜色，并绘制一个全屏的矩形
            ctx.fillStyle = "rgba(0,0,20,0.05)";
            ctx.fillRect(0, 0, width, height);
            // 设置文字的颜色
            ctx.fillStyle = '#00c8aa';
            arr.forEach(function (value, index) {
                // 根据数组的索引值来绘制文字，x 坐标为索引值 * 10，y 坐标为 value + 10。
                ctx.fillText(str[Math.floor(Math.random() * str.length)], index * 10, value + 10);

                // 从上一次绘制的位置开始，将数组值设置为下一次绘制位置。
                arr[index] = value >= height || value > 8888 * Math.random() ? 0 : value + 10;
            });
        }
        // 每 30 毫秒执行一次 rain() 函数。
        setInterval(rain, 30); 
    })
   
    
</script>

<style lang="less" scoped>
    .big{
    
     
     
      .login{
        width: 550px;
        height: 350px;
        background-color: linear-gradient(to right, #2F4F4F,#40E0D0);
        position: absolute; left: 50%; top: 50%;
        transform: translate(-50%, -50%);  
        border-radius: 6%;
      }
      .imge{
        margin-top: -100px;
        margin-left: 180px;
          margin-bottom: 40px;
          border-radius: 50%;
          width: 200px;
          height: 200px;
          background-color:  #00CED1;
        img{
            margin: 10px;
            border-radius: 50%;
        }
      }
    }
  

        body {
            overflow: hidden;
        } 
</style>

