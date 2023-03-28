


<script setup>
       import username from '@/stores/username';
import { storeToRefs } from 'pinia';

   //获取父组件传过来的默认权限数据
  defineProps({
      privilegeIds:{
         type:Array,
         default:[]
      }
     })
        
      
       
        
         
</script>

<style lang="less" scoped>
     
</style>
