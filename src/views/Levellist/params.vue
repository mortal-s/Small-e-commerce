<template>
   <div class="crumbs">
    <el-breadcrumb separator="/" style="height: 40px;">
    <el-breadcrumb-item :to="{ path: '/list/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>分类参数</el-breadcrumb-item>
     </el-breadcrumb>
    <div class="tables">
            <el-alert title="！！注意：只能为第三类分级设置相关参数" type="warning" :closable="false"/>
            <div style="font-size: 18px;margin-top: 20px;width: 500px;">
             选择商品的分类:
             <el-cascader 
             clearable
             :options="categorie" 
             :props="props" 
             @change="getfatherid"
            style="width: 300px;"/>
           </div>
           <!-- 切换标签页 -->
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
             <!-- 修改输入页面 -->
          
             <el-dialog v-model="showedit" title="请填写动态参数" width="70%" center>
           <div  style="width:500px;margin-bottom: 50px;">
            <div>
              修改参数:<el-input v-model="editdata.attr_name" style="width:280px;margin-left: 10px;"/>
            </div>
            </div>
           <el-button type="primary" @click="submits()">确认</el-button>
           <el-button @click="resetds()">关闭</el-button>
           </el-dialog>
          <!-- 动态参数页 -->
           <el-tab-pane label="动态参数" name="first">
              <!-- 动态添加页面 -->
            <el-button type="primary" @click="cid ? attributedshow = true : iss()">添加参数</el-button>
            <el-dialog v-model="attributedshow" title="请填写动态参数" width="70%" center>
           <div  style="width:500px;margin-bottom: 50px;">
            <div>
              输入动态参数名称:<el-input v-model="attr_name" style="width:280px;margin-left: 10px;"/>
            </div>
            </div>
           <el-button type="primary" @click="submitd()">确认</el-button>
           <el-button @click="resetd()">关闭</el-button>
          </el-dialog>
         
      <el-table row-key="attr_id"  :expand-row-keys="a" :data="attributed" border style="width: 100%" class="table" current-row-key="attr_id" >
    <el-table-column type="expand" width="80">
      <template #default="props">
    <div class="attr_vals">
     <el-tag  
     class="attr_vals_item"
     v-for="p1,index in props.row.attr_vals"
    :key="index"
     closable
    :disable-transitions="false"
    @close="handleClose(props.row,index)"
  >
     {{p1}}
      </el-tag>
      <el-input
    v-if="props.row.inputVisible"
    v-model="props.row.inputValue"
    size="small"
    @keyup.enter="handleInputConfirm(props.row)"
    @blur="handleInputConfirm(props.row)"
    style="height: 30px;width:100px;margin-top: 18px;"
  />
  <el-button v-else class="button-new-tag" size="small" @click="showInput(props.row)">
    + New Tag
  </el-button>
    </div>
   
      </template>
    </el-table-column>
    <el-table-column label="参数名称" prop="attr_name" width="500"/>
    <el-table-column  prop=""  label="操作" width="500">
      <template #default="scope">
        <!-- 删除用户按钮 -->
   <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" :icon="CloseBold" size="mini" @click="Delete(scope.row)">
            </el-button>
        </el-tooltip>
         <!-- 编辑用户按钮 -->
        <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" :icon="EditPen" size="mini" @click="Edit(scope.row)">
            </el-button>
        </el-tooltip>
      </template>
    </el-table-column>
       </el-table>
           </el-tab-pane>

           <!-- 静态参数页 -->
          <el-tab-pane label="静态属性" name="second">
            <!-- 静态添加页面 -->
            <el-button type="primary" @click="cid ? attributeshow = true : iss()">添加属性</el-button>
            <el-dialog v-model="attributeshow" title="请填写静态属性" width="70%" center>
           <div  style="width:500px;margin-bottom: 50px;">
             <div>
              输入静态属性名称:<el-input v-model="attr_name" style="width:280px;margin-left: 10px;"/>
             </div>
            </div>
           <el-button type="primary" @click="submit()">确认</el-button>
           <el-button @click="reset()">关闭</el-button>
          </el-dialog>
            <el-table  row-key="attr_id"  :expand-row-keys="a"  :data="attribute" border style="width: 100%" class="table" current-row-key="attr_id" >
            <el-table-column type="expand" width="80">
              <template #default="props">
       <div class="attr_vals">
        <el-tag  
     class="attr_vals_item"
     v-for="p1,index in props.row.attr_vals"
    :key="index"
     closable
    :disable-transitions="false"
    @close="handleClose(props.row,index)"
  >
     {{p1}}
      </el-tag>
      <el-input
    v-if="props.row.inputVisible"
    v-model="props.row.inputValue"
    size="small"
    @keyup.enter="handleInputConfirm(props.row)"
    @blur="handleInputConfirm(props.row)"
    style="height: 30px;width:100px;margin-top: 18px;"
  />
  <el-button v-else class="button-new-tag" size="small" @click="showInput(props.row)">
    + New Tag
  </el-button>
        </div>
          </template>
            </el-table-column>
            <el-table-column label="参数名称" prop="attr_name" width="500"/>
            <el-table-column  prop=""  label="操作" width="500">
      <template #default="scope">
   <!-- 删除用户按钮 -->
   <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" :icon="CloseBold" size="mini" @click="Delete(scope.row)">
            </el-button>
        </el-tooltip>
         <!-- 编辑用户按钮 -->
        <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" :icon="EditPen" size="mini" @click="Edit(scope.row)">
            </el-button>
        </el-tooltip>
      </template>
            </el-table-column>
            </el-table>
          </el-tab-pane>
         </el-tabs>
     </div>
    
    </div>
</template>

<script setup>
 import categories from '@/stores/categories';
 import {  ref } from 'vue';
 import { storeToRefs } from 'pinia';
 import { EditPen,CloseBold } from '@element-plus/icons-vue';
//初始显示动态参数
 const activeName = ref('first')
 //定义分页数据
 let pagination =ref({
          type:3,
          pagenum:1,
          pagesize:20
        })
     //创建实例仓库
     const Categories =categories()
     //发送网络请求 获取次级联选择器数据
     Categories.getcategorie(pagination.value)
     const {categorie }  = storeToRefs(Categories)
     //次级联选择器的一些配置
    const props = {
         expandTrigger: 'hover',
        label:'cat_name',
        value:'cat_id',
        }

      //初始化一个变量  保存分类id 做其他界面交互需要使用
      const cid =ref()

     //当次级联选择器内容发生变化时事件处理函数
        const getfatherid =async (value)=>{
              cid.value=value[2]
         await Categories.getattribute(value[2],'only')
         await Categories.getattributed(value[2],'many')
       }   
         ///从仓库获取静态分类数据
       const { attribute} = storeToRefs(Categories)
       ///从仓库获取动态分类数据
       const { attributed }= storeToRefs(Categories)

       //双向绑定添加输入框数据
       const attr_name = ref('')
       //设置添加动态参数输入框的显示标识
       const attributedshow = ref(false)
       //设置添加静态属性输入框的显示标识
       const attributeshow =  ref(false)
       //用户如果没有选择商品分类就不能打开添加输入框 而是弹出让用户选择分类
       const iss =()=>{
        alert('请选择商品分类之后再添加')
       }
       // 动态参数确认按钮点击事件处理函数
       const  submitd= async ()=>{
        attributedshow.value=false
        await  Categories.postattribute(cid.value,{attr_name:attr_name.value,attr_sel:'many'})
        await  Categories.getattributed(cid.value,'many')
        attr_name.value=''
       }
       // 动态参数关闭按钮点击事件处理函数
       const  resetd=()=>{
        attributedshow.value=false
        }
       //静态属性的确认按钮点击事件处理函数
       const submit = async ()=>{
        attributeshow.value=false
      await  Categories.postattribute(cid.value,{attr_name:attr_name.value,attr_sel:'only'})
      await  Categories.getattribute(cid.value,'only')
      attr_name.value=''
       }
        // 静态属性关闭按钮点击事件处理函数
        const  reset=()=>{
          attributeshow.value=false
       }
       //删除参数按钮事件处理函数
      const Delete =async (value)=>{
      
        await  Categories.deletedetails(cid.value,value.attr_id)
        await Categories.getattribute(cid.value,'only')
        await Categories.getattributed(cid.value,'many')
      }
      
     //详情参数添加项的显示与隐藏
        const a = ref([])
      const showInput = (value)=>{
     
         a.value.push(value.attr_id)
        value.inputVisible=true
         
      }
       //详情参数的添加事件处理函数
       const handleInputConfirm = async(value)=>{
        value.attr_vals.push(value.inputValue)
        await  Categories.postdetails(cid.value,value.attr_id,{attr_name:value.attr_name,
                attr_sel:value.attr_sel,
                attr_vals:value.attr_vals.join(' ')})
              
         await Categories.getattribute(cid.value,'only')
         await Categories.getattributed(cid.value,'many')
      
         value.inputVisible=false
       }
    
       //编辑界面显示与隐藏
       const showedit = ref(false)
      //初始化编辑界面数据
      const editdata = ref({
        attr_id:'',
        attr_name:'',
        attr_sel:'',
     })
       //编辑按钮事件处理函数
       const Edit =async (value)=>{
      editdata.value= await Categories.getputattribute(cid.value,value.attr_id,{attr_sel:value.attr_sel})
        showedit.value=true
       }
       //编辑页面 确认按钮事件处理函数
         const submits = async ()=>{
          await Categories.putattribute(cid.value,editdata.value.attr_id,{attr_name:editdata.value.attr_name,attr_sel:editdata.value.attr_sel})
          await Categories.getattribute(cid.value,'only')
         await Categories.getattributed(cid.value,'many')
         showedit.value=false
         }
         //编辑页面关闭按钮事件处理函数
        const  resetds=()=>{
          showedit.value=false  
        }
     //属性详情的删除事件处理函数
     const  handleClose = async(value,index)=>{
             value.attr_vals.splice(index,1)
             a.value.push(value.attr_id)
        await  Categories.postdetails(cid.value,value.attr_id,{attr_name:value.attr_name,
                attr_sel:value.attr_sel,
                attr_vals:value.attr_vals.join(' ')})
         await Categories.getattribute(cid.value,'only')
         await Categories.getattributed(cid.value,'many')
        
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
  .el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}
 .demo-tabs{
  margin-top: 30px;
 }
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  
}
.attr_vals{
   display: flex;
   .attr_vals_item{
    margin: 20px;
   }
   .button-new-tag{
    margin: 20px;
   }
}
</style>