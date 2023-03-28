<template>
    <div class="crumbs">
      <el-breadcrumb separator="/" style="height: 40px;">
    <el-breadcrumb-item :to="{ path: '/list/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
     </el-breadcrumb>
          <div class="tables">
            <el-button  @click="centerDialogVisible = true" type="primary" style="height: 50px;">添加分类</el-button>
              <!-- //添加页的默认隐藏界面 -->
          <el-dialog v-model="centerDialogVisible" title="请填写商品分类" width="70%" center>
           <div  style="width:400px;margin-bottom: 50px;">
             输入商品分类:<el-input v-model="cat_names" style="width:280px;margin-left: 10px;"/>
            </div>
           <div>
             请选择要加入的总分类:
             <el-cascader 
             :options="categorie2" 
             :props="props" 
             @change="getfatherid"
             change-on-select 
             />
           </div>
           <el-button type="primary" @click="submit()">确认</el-button>
           <el-button @click="reset()">关闭</el-button>
          </el-dialog>
           <!-- //编辑页的默认隐藏界面 -->
          <el-dialog v-model="Editshow" title="请修改商品分类" width="70%" center>
           <div  style="width:400px;margin-bottom: 50px;">
            请修改商品分类:<el-input v-model="EditCategories.cat_name" style="width:280px;margin-left: 10px;"/>
            </div>
         <el-button type="primary" @click="submitput()">确认</el-button>
           <el-button @click="resetput()">关闭</el-button>
          </el-dialog>
         
      <vxe-table border="inner"  
              
              
          :column-config="{resizable: true}"
          :tree-config="{ rowField: 'cat_id', parentField: 'id'}"
          :data="categorie"
         class="table"
         >
          <vxe-column field="cat_name" title="分类名称" tree-node></vxe-column>
          <vxe-column field="" title="是否有效">
            <template #default="{ row }">
             <el-button v-if="row.cat_deleted" type="success" :icon="Close" circle />
            <el-button v-if="!row.cat_deleted" type="success" :icon="Check" circle />
           </template>
          </vxe-column>
          
          <vxe-column field="cat_level" title="排序">
           <template #default="{ row }">
            {{row.cat_level}}级
           </template>
          </vxe-column>
        <vxe-column field="" title="操作">
            <template #default="{ row }">
         <!-- 删除用户按钮 -->
           <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" :icon="CloseBold" size="mini" @click="Delete(row.cat_id)">
            </el-button>
        </el-tooltip>
         <!-- 编辑用户按钮 -->
        <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" :icon="EditPen" size="mini" @click="Edit(row.cat_id)">
            </el-button>
        </el-tooltip>
            </template>
          </vxe-column>
         </vxe-table>
     
   
          </div>
    </div>
</template>

<script setup>
    import { Close,Check } from '@element-plus/icons-vue';
        import { ref } from 'vue';
      import categories from '@/stores/categories';
import { storeToRefs } from 'pinia';
import { EditPen,CloseBold } from '@element-plus/icons-vue';
      //获取全部等级商品分类配置
        let pagination =ref({
          type:3,
          pagenum:1,
          pagesize:20
        })
        //创建实例仓库
          const Categories =categories()
          //发送网络请求
          Categories.getcategorie(pagination.value)
          const {categorie }  = storeToRefs(Categories)

          //删除按钮点击事件处理函数
         
         let Delete=async (id)=>{
              
         await Categories.deletecategorie(id)
         await Categories.getcategorie(pagination.value)
          }
          //获取2级商品分类配置
          let pagination2 =ref({
          type:2,
          pagenum:1,
          pagesize:20
        })
         //  次级联选择器的一些配置
         const props = {
            expandTrigger: 'hover',
            label:'cat_name',
            value:'cat_id',
           }
           //双向绑定输入的分类数据
           const cat_names =ref()
          //发送仓库里的网络请求 获取2级商品分类
          Categories.getcategorie2(pagination2.value)
          const {categorie2 }  = storeToRefs(Categories)
          //定义添加组件是否显示的标识变量
          const centerDialogVisible =ref(false)
       
           //定义要添加的默认参数 //在没有触发选择框时 如果直接添加就是添加0级组件 把默认值设置成0就行了
              const postparams =ref({
            cat_pid:0,
            cat_name:'',
            cat_level:0
          })
          //当添加输入框的内容发生变化时事件处理函数
         const getfatherid = (value)=>{
         if(value.length===0){
            postparams.value.cat_pid=0
            postparams.value.cat_name=cat_names.value
            postparams.value.cat_level=0
          }else if(value.length===1){
            postparams.value.cat_pid=value[0]//也可以写成length-1
            postparams.value.cat_name=cat_names.value
            postparams.value.cat_level=1
          }else if(value.length===2){
            postparams.value.cat_pid=value[1],//也可以写成length-1
            postparams.value.cat_name=cat_names.value
            postparams.value.cat_level=2
          }
        
         }
         //确认按钮的事件处理函数
          const submit = async()=>{
            //发送仓库里的上传添加请求
          await  Categories.postcategorie(postparams.value)
          await  Categories.getcategorie(pagination.value)
          cat_names.value=''
          centerDialogVisible.value=false
         }
         //关闭按钮的事件处理函数
         const reset = ()=>{
          cat_names.value=''
          centerDialogVisible.value=false 
         }
         //编辑界面的显示标识
         const Editshow = ref(false)
         //编辑页面输入框双向绑定数据
         const EditCategories=ref({})
         //定义一个保存id的变量 提供给确认修改方法请求后台传参使用
         let cid = ref() 
         //编辑按钮的事件处理函数
         const Edit = async (id)=>{
          cid.value=id
          //先将数据保存起来
          EditCategories.value=await Categories.getputcategorie(id)
          Editshow.value=true
         }
         //确认事件处理函数
         const submitput =async()=>{
          await Categories.putcategorie(cid.value,EditCategories.value.cat_name)  
          await Categories.getcategorie(pagination.value)
            Editshow.value=false 
         }
         const resetput = ()=>{
          Editshow.value=false
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
        height: 100%;
       box-shadow: 4px 4px 4px 4px grey;
       padding-top: 20px;
       padding-left: 20px; 
       padding-bottom: 50px;
       .table{
        margin-top: 20px;
       }
      }
  }

</style>