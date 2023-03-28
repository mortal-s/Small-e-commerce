<template>
    <div class="BOX">
    <div class="BOX1"></div>
    <div class="BOX2"></div>
    <div class="BOX3"></div>
    <div class="BOX4"></div>
   </div>
</template>

<script setup>
         
</script>

<style lang="less" scoped>
       *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
       }
      .BOX{
        overflow:auto;
        height: 692px;
        overflow-y:scroll;
        width: 100%;
      }
       .BOX1{
        width: 100%;
        height: 695px;
        background-attachment: fixed;
        background-position: center center;
        background-size: cover;
            background-image: url(@/assets/img/1.jpg);
            margin-bottom: 20px;   
          
       }
       .BOX2{
        width: 100%;
        height: 675px;
        background-attachment: fixed;
        background-position: center center;
        background-size: cover;
            background-image: url(@/assets/img/2.jpg);
            margin-bottom: 20px;    
           
       }
       .BOX3{
        width: 100%;
        height: 675px;
        background-attachment: fixed;
        background-position: center center;
        background-size: cover;
            background-image: url(@/assets/img/3.png);
            margin-bottom: 20px;  
           
       }
       .BOX4{
        width: 100%;
        height: 675px;
        background-attachment: fixed;
        background-position: center center;
        background-size: cover;
            background-image: url(@/assets/img/1.jpg);
           
           
       }
       ::-webkit-scrollbar{display:none}
</style>