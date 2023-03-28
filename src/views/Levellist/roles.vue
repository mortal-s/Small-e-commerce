<template>
      <div class="crumbs">
     <el-breadcrumb separator="/" style="height: 40px;">
    <el-breadcrumb-item :to="{ path: '/list/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
     </el-breadcrumb>
     <div class="tables">
      <el-button  @click="centerDialogVisible = true" type="primary" style="height: 50px;">添加角色</el-button>
      <el-dialog v-model="centerDialogVisible" title="请填写角色信息" width="30%" center>
                <addroles @showaddroles="showjiemian"></addroles>
          </el-dialog>
    <el-dialog v-model="ishow" title="修改角色信息" width="30%" center>
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
</el-dialog>

   <el-dialog v-model="Permissionsshow" title="分配权限" width="60%" center>
  <el-tree ref="treeObj" :data="permissions" node-key="id" show-checkbox :props="defaultProps"  default-expand-all/>
    <el-button type="primary" @click="submit()">确认</el-button>
      <el-button @click="reset()">关闭</el-button>
  </el-dialog>
      <el-table  row-key="id"  :expand-row-keys="a"  :data="roles" border style="width: 100%" class="table" >
    <el-table-column type="expand" width="80">
      <template #default="props">
        <el-row v-for="p1 in props.row.children" :key="p1.id">
            <el-col :span="5">
               <el-tag  closable  @close="deleteRights(props.row.id,p1.id)" >{{ p1.authName }}</el-tag>
                <i class="lightgreen-box"></i>
            </el-col>
         <el-col :span="19">
            <el-row v-for="p2 in p1.children" :key="p2.id">
            <el-col :span="6">
               <el-tag type="success"   closable  @close="deleteRights(props.row.id,p2.id)">{{ p2.authName }}</el-tag>
                <i class="lightgreen-box"></i>
            </el-col>
              <el-col :span="18">
               <el-tag type="danger" v-for="p3 in p2.children" :key="p3.id" closable  @close="deleteRights(props.row.id,p3.id)">{{ p3.authName }}</el-tag>
                   <i class="lightgreen-box"></i>
              </el-col>
           </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column label="角色名称" prop="roleName" width="300"/>
    <el-table-column label="角色描述" prop="roleDesc" width="300" />
    <el-table-column  prop=""  label="角色操作" width="300">
      <template #default="scope">
       <!-- 删除用户按钮 -->
        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
            <el-button type="danger" :icon="CloseBold" size="mini" @click="Delete(scope.row.id)">
            </el-button>
        </el-tooltip>
         <!-- 编辑用户按钮 -->
        <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
            <el-button type="primary" :icon="EditPen" size="mini" @click="Edit(scope.row.id)">
            </el-button>
        </el-tooltip>

         <!-- 分配角色按钮 -->
         <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
            <el-button type="warning" :icon="User" size="mini" @click="Permissionss(scope.row)">
            </el-button>
        </el-tooltip>
      </template>
    </el-table-column>
      </el-table>
    </div>
    </div>
    
</template>

<script setup>
     import { ref,reactive,computed, onMounted, nextTick, } from 'vue';
     import username from '@/stores/username';
     import { storeToRefs } from 'pinia';
     import addroles from '@/components/usercomponents/addroles.vue';
     import { User,CloseBold,EditPen} from '@element-plus/icons-vue';
     
      //创建仓库实例
        const Username=username()
        //获取角色列表
        Username.getrole()
        //拿到角色列表数据
        let {roles} =storeToRefs(Username)
        //定义添加框的显示的标识
        const centerDialogVisible=ref(false)
        //自定义事件的处理函数接收子组件的数据 用于修改添加框的标识
        const showjiemian=(val)=>{
          centerDialogVisible.value=val
        }
        //根据id删除角色  并且刷新角色数据
        const Delete=async (id)=>{
          await  Username.Deleterole(id)
          await  Username.getrole()
       }
        ///定义修改窗口表单的数据
         let postroles =ref({
          roleName:'',
           roleDesc:''
        })  
        ///定义变量保存修改角色的id 用于修改使用
         let uid = ref()
         ///定义修改窗口的开启或隐藏
         let ishow=ref(false)
          ///根据id 获取要编辑角色的数据 并且打开修改窗口 数据回显
         const Edit = async(id)=>{
            ishow.value=true
            uid.value=id
          postroles.value= await Username.getputrole(id)
         }
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
///确认按钮 关闭修改窗口 修改数据 并且刷新数据
const submitForm = async ()=>{
           ishow.value=false
         await Username.putrole(uid.value,postroles.value)
         await Username.getrole()
        }
        //重置按钮 让表单内容清空
      const resetForm = ()=>{
       postroles.value.roleName='',
       postroles.value.roleDesc=''
 }
    
         //发送树状权限数据请求
            Username.Permiss('tree')
            //拿到在仓库的树状权限数据 
            let { permissions } = storeToRefs(Username)
            //定义每个权限层级的名字
            const defaultProps = {
            children: 'children',
            label: 'authName',
           }
            //获取树状组件节点
               let treeObj = ref()
            //定义一个数组 初始化初始选中的权限
            let privilegeIds =ref([])
      ///定义递归函数 获取3级权限的数据
    let  getprivilegelevel3= (nodes,privilegeIdss)=>{
                  
             if(nodes.children &&nodes.children.length >0){
              for(let item of nodes.children){
                 getprivilegelevel3(item,privilegeIdss)
              }
             }else{
              privilegeIdss.push(nodes.id)
             }
        }
   
     let Permissionsshow=ref(false)
     let rid = ref()
     //点击分配权限按钮的事件处理函数
    const Permissionss= (role)=>{
        //点击分配权限按钮显示 权限窗口
        Permissionsshow.value=true  
        rid.value=role.id
       nextTick(()=>{
          getprivilegelevel3(role,privilegeIds.value)
      treeObj.value.setCheckedKeys(privilegeIds.value,true)
        })
     
  }
   
 
    ///确认按钮事件处理函数
      const submit =async ()=>{
      // 构造一个数组
        let rightsIds = [   
          ...treeObj.value.getCheckedKeys(),
          ...treeObj.value.getHalfCheckedKeys()
              ];
      // 拼接成一个idsd字符串，用逗号分隔
         let rightsIdsStr = rightsIds.join(',');
         await  Username.putrolesright(rid.value,{rids:rightsIdsStr})
         await Username.getrole()
          privilegeIds.value.length=0
         Permissionsshow.value=false
      }
      //关闭按钮事件处理函数
      const reset =()=>{
        Permissionsshow.value=false
        privilegeIds.value.length=0
      } 
      //删除指定角色的权限
      const a = ref([])
      const deleteRights = async(id,iid)=>{
        a.value.push(id)
       await Username.deleteroleqx(id,iid)
       await Username.getrole()
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
        .el-tag{
          margin-top: 15px;
        }
       }
      }
  }
</style>