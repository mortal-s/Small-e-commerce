<template>
   <div class="crumbs">
      <el-breadcrumb separator="/" style="height: 40px;">
    <el-breadcrumb-item :to="{ path: '/list/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
     </el-breadcrumb>
    
 <div class="tables">
        <el-input v-model="aa.query" placeholder="请输入内容"  style="width: 330px;height: 50px;"/>
        <el-button :icon="Search" style=" height:50px ;width: 50px;" @click="SEarch()" />
        <el-button  @click="centerDialogVisible = true" type="primary" style="height: 50px;">添加商品</el-button>
          <el-dialog v-model="centerDialogVisible" title="请填写商品信息" width="80%" center>
          
            <el-form :model="addGoodsForm" :rules="addGoodsFormRules" ref="addGoodsFormRef" 
                     label-width="100px" label-position="top">
            <el-steps :active="activeindex" finish-status="success" align-center :space="200">
              <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>

         <el-tabs :tab-position="tabPosition" style="height:420px" v-model="activeindex"
           :before-leave="beforeTabLeave"  @tab-click="tabClicked">
                <el-tab-pane label="基本信息" name="0">
                  <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="addGoodsForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="addGoodsForm.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="addGoodsForm.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="addGoodsForm.goods_number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat">
                          
                             <div style="font-size: 18px;margin-top: 20px;">
                              选择商品的分类:
                                   <el-cascader 
                                   v-model="addGoodsForm.goods_cat"
                               :options="categorie" 
                                  :props="props" 
                             @change="categoryHandlerChanged"
                                   clearable  
                                   style="width: 300px;"/>
                              </div>
                        </el-form-item>
                </el-tab-pane>
		        		<el-tab-pane label="商品参数" name="1">
                    <!-- 渲染表单的Item项 -->
                 <el-form-item :label="item.attr_name" v-for="item in allcate1" :key="item.attr_id">
                    <!-- 复选框组 -->
               <el-checkbox-group v-model="item.attr_vals">
                    <el-checkbox :label="param" v-for="(param,index) in item.attr_vals" :key="index" border>
                    </el-checkbox>
               </el-checkbox-group>
                 </el-form-item>
                </el-tab-pane>
		       	  	<el-tab-pane label="商品属性" name="2">
                  	<!-- 渲染表单的Item项 -->
                <el-form-item :label="item.attr_name" v-for="item in allcate2" :key="item.attr_id">
                <!-- 输入框 -->
                <el-input v-model="item.attr_vals"></el-input>
                </el-form-item>
                </el-tab-pane>
		        		<el-tab-pane label="商品图片" name="3">
                  <el-upload
                action="http://localhost:8888/api/private/v1/upload"
                :on-preview="handlePreview"
                list-type="picture"
                 :headers=headersObj
                 :on-success="uploadImageSuccess"
                 :on-remove="uploadImageRemove">
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
               </el-tab-pane>
               <el-dialog
            title="图片预览对话框"
            v-model="previewDialogVisible"
            width="50%"
            show-close>
            <img :src="previewImageUrl" class="previewImage"/>
              </el-dialog>
		         		<el-tab-pane label="商品内容" name="4">
                  <el-button type="primary" class="addGoodsBtn"  @click="addGoods">添加商品</el-button>
                </el-tab-pane>
            </el-tabs>
          </el-form>
       
       </el-dialog>
   
      <div class="example-pagination-block">
        <div class="userdata">
  <el-table :data="goodslist" style="width: 100%;margin-bottom: 30px;" current-row-key="goods_id">
       
       <el-table-column prop="goods_name" label="商品名称" width="350" />
       <el-table-column prop="goods_price" label="价格/￥" width="170" />
       <el-table-column prop="goods_weight" label="重量/kg" width="170" />
       <el-table-column label="创建时间" width="170">
         <template #default="props">
              {{ fordatemat(props.row.upd_time) }}
         </template>
        </el-table-column>
       <el-table-column fixed="right"  label="操作" width="170">
      <template #default="scope">
       <!-- 删除用户按钮 -->
         <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" :icon="CloseBold" size="mini" @click="Delete(scope.row.goods_id)">
            </el-button>
        </el-tooltip>
         <!-- 编辑用户按钮 -->
        <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" :icon="EditPen" size="mini" @click="Edit(scope.row.goods_id)">
            </el-button>
        </el-tooltip>
      </template>
      </el-table-column>
  </el-table>
        </div>
      <el-pagination class="page" layout="prev, pager, next" :page-count="Math.ceil(pages)" v-model:current-page="sss" @update:current-page="b()"/>
   </div>
    </div>
  </div>
</template>

<script setup>

  import { Search,EditPen,CloseBold } from '@element-plus/icons-vue';
  import { computed, nextTick, reactive, ref,} from 'vue'
  import {storeToRefs} from 'pinia'
  import commodity from '@/stores/commodity'
  import {fordatemat} from '@/hooks/date'
  import categories from '@/stores/categories';
  import _ from 'lodash';

//定义 获取数据时的分页  pagenum为第几页  pagesize一页8组数据
  let aa = reactive({
      query:'',
      pagenum:1,
     pagesize:4,
})
  //定义次级联选择器分页数据
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
    
//创建pinia 仓库实例对象 usernames  调用仓库里的方法  获取数据并渲染页面
     const Commodity =commodity()
      Commodity.getgood(aa)
     let {goodslist,page} =storeToRefs(Commodity)
       //计算总共有几页
 let pages= computed(()=>{
     return page.value.total/aa.pagesize
    })

  ///把分页组件第几页的值 双向绑定 为的是拿到值 实现点击第几页 就拿第几页数据的效果
  let sss=ref()
    let b=()=>{
  aa.pagenum=sss.value,
  aa.pagesize=4
  Commodity.getgood(aa)
}
       //搜索按钮 
    const SEarch = async()=>{
    await Commodity.getgood(aa)
   }
 
             /// 添加一个标识 用于判断 添加的弹出框是否显示
          const centerDialogVisible = ref(false)
              //步骤条的设置
             const activeindex = ref(0)
            ///标签条的设置
             const tabPosition = ref('left')
                // 添加商品表单对象
           const addGoodsForm=ref({
                  //商品名字
                    goods_name: '',
                    //商品价格
                    goods_price: 0,
                    //商品重量
                    goods_weight: 0,
                    //商品数量
                    goods_number: 0,
                    //三级选择器
                    goods_cat: [],
                    //照片数组
                    pics: [],
                    //动态参数和静态属性
                    attrs:[],
                    //商品内容
                    goods_introduce: '',
                    
                })
                // 添加商品校验规则
            const  addGoodsFormRules= reactive({
                goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
                goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
                goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
                goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
                goods_cat: [{ required: true, message: '请输入商品分类', trigger: 'blur' }]
                })
                //商品分类的次级选择器的属性
          const props = {expandTrigger: 'hover', value: 'cat_id', label: 'cat_name',children: 'children'}
            //当用户在基本信息栏目并且用户没有选择商品分类的时候，是不能让用户切换到下一个标签页的
          const  beforeTabLeave=(activeName,oldActiveName)=>{
            if(oldActiveName === '0' && addGoodsForm.value.goods_cat.length !== 3 && addGoodsForm.value.goods_name===''){
              ElMessage.error('请先选择商品分类和输入商品名称！')
                    return false;
            }                                                                                                 
          }
         
         //商品的静态/动态 数据获取渲染 
        let allcate1=ref([])
        let allcate2=ref({})
         const tabClicked = ()=>{
          nextTick(async ()=>{
            if(activeindex.value == 1){
              let allcate = await Commodity.getallcates(addGoodsForm.value.goods_cat[2])
                 allcate1.value=allcate
               }else if (activeindex.value ==2){
               let jallcate = await  Commodity.getalljcates(addGoodsForm.value.goods_cat[2])
               allcate2.value=jallcate
           }
        })
       }
       // 文件上传组件的请求头
    const  headersObj=ref({
       Authorization: window.sessionStorage.getItem('token')
                }) 
       //图片的添加 处理事件函数
        const uploadImageSuccess = (response)=>{
          let picInfo = {
             pic: response.data.tmp_path
                }
          addGoodsForm.value.pics.push(picInfo)
        }
        //图片的删除 处理事件函数
        const  uploadImageRemove = (file)=>{
          // 1、获取要删除的图片的临时路径
          let filePath = file.response.data.tmp_path;
                // 2、找到这个图片在 pics 数组中的索引项
                let index = addGoodsForm.value.pics.findIndex(item=>{
                    item.pic == filePath
                });
                // 3、使用数组的 splice 方法,从数组中移除
                addGoodsForm.value.pics.splice(index,1);
        }
             
          //图片预览界面
          const  previewImageUrl  = ref('')
          const   previewDialogVisible= ref(false)
          // 处理图片预览事件
         const handlePreview = (file)=>{
          previewImageUrl.value=file.response.data.url
              previewDialogVisible.value=true
         }
         //添加商品按钮
         const addGoods =async ()=>{
          let goodsObj = _.cloneDeep(addGoodsForm.value);
               goodsObj.goods_cat = goodsObj.goods_cat.join(',');

             // 处理动态参数
             allcate1.value.forEach(item=>{
              let obj = {
                    attr_id: item.attr_id,
                   attr_value: item.attr_vals.join(' ')
                        }
               addGoodsForm.value.attrs.push(obj);
                    })
                    // 处理静态属性
                    allcate2.value.forEach(item=>{
                        let obj = {
                            attr_id: item.attr_id,
                            attr_value: item.attr_vals
                        }
                        addGoodsForm.value.attrs.push(obj);
                    })
                    // 最后将数据赋值给新对象
                    goodsObj.attrs = addGoodsForm.value.attrs
                    //将新对象作为参数 提交添加
                  await  Commodity.postcates(goodsObj)
                    //刷新页面数据
                 await   Commodity.getgood(aa)
                    //添加完成后关闭页面
                    centerDialogVisible.value=false
         }
         ///删除商品
         const Delete =async (id)=>{
        await  Commodity.deletecates(id)
         await Commodity.getgood(aa)
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
      padding-bottom: 40px;
       .userdata{
       margin-top: 40px;
       }
      
     .demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
      }
      .previewImage{
        width: 100%
    }

  }
</style>
  
