<template>
  <div class="app-container">
    
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="账号名">
        <el-input v-model="formInline.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item label="所属角色">
        <SelectAll v-model="formInline.roles" :options="roleOptions" placeholder="所属角色" value-key="id" label-key="name" />
      </el-form-item>
      <el-form-item label="状态">
        <SelectAll v-model="formInline.status" :options="statusOptions" placeholder="状态" value-key="id" label-key="name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="success" @click="handleAddUser">新增账号</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top:30px;">
      <el-table-column
        prop="id"
        align="center"
        label="用户ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名称"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column align="center" label="头像">
        <template slot-scope="scope" >
          <el-avatar :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="introduction"
        align="center"
        label="账户介绍">
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope" >
          <el-button type="success" disabled plain v-if="scope.row.status=='1'" size="small" >开启</el-button>
          <el-button type="danger"  disabled plain v-if="scope.row.status=='2'" size="small" >禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" :disabled="scope.row.id=='1' ? true : false" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" :disabled="scope.row.id=='1' ? true : false" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination v-show="total>0" :total="total" :page.sync="formInline.page" :limit="formInline.limit" :auto-scroll="false" @pagination="onSearch"/>


    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑账户':'创建账户'">
      <el-form :model="userInfo" label-width="80px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="userInfo.password" placeholder="用户密码" show-password/>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="userInfo.password_confirm" placeholder="确认密码" show-password/>
        </el-form-item>
        <el-form-item label="用户简介">
          <el-input
            v-model="userInfo.introduction"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="角色描述"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="userInfo.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属角色">
          <SelectAll v-model="userInfo.roles" :options="roleOptions" placeholder="所属角色" value-key="id" label-key="name" />
        </el-form-item>

        
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmUser">确认</el-button>
      </div>
    </el-dialog>

  </div>
  
</template>

<script>

import { getOptions as getRoleOptions } from '@/api/role'
import { getList,addUser,updateUser,deleteUser } from '@/api/user'
import SelectAll from '@/components/SelectAll';
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components:{
    Pagination,
    SelectAll
  },
  data() {
    return {
      tableData: [],
      total:0,
      formInline:{
        username:'',
        roles:[],
        status:[],
        page:1,
        limit:20
      },
      roleOptions:[],
      statusOptions:[{id:1,name:'开启'},{id:2,name:'禁用'}],
      dialogVisible:false,
      dialogType: 'new',
      userInfo:{
        username:'',
        password:'',
        password_confirm:'',
        introduction:'',
        status:1,
        roles:[]
      }
    }
  },
  created() {
    this.getRoleOptions();
    this.onSearch();
  },
  methods:{
    getRoleOptions(){
      getRoleOptions().then(res=>{
        this.roleOptions = res.data;
      });
    },
    onSearch(){
      getList(this.formInline).then(res=>{
          this.tableData = res.data.list;
          this.total = res.data.count;
          console.log(this.total);
      });
    },
    handleAddUser(){
      this.dialogVisible = true;
    },
    handleEdit(scope){
      this.dialogVisible = true;
      this.dialogType = 'edit';
      this.userInfo = scope.row;
    },

    handleDelete({ $index, row }){
      this.$confirm('确认删除用户?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteUser({id:row.id})
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.onSearch();
        })
        .catch(err => { console.error(err) })
    },
    confirmUser(){
      if(this.dialogType == 'new'){
        addUser(this.userInfo).then(res=>{
          this.dialogVisible = false
          this.$notify({
            title: 'Success',
            dangerouslyUseHTMLString: true,
            message: `
                <div>添加成功</div>
              `,
            type: 'success'
          })
          this.onSearch();
        });
      }else{
        updateUser(this.userInfo).then(res=>{
          this.dialogVisible = false
          this.$notify({
            title: 'Success',
            dangerouslyUseHTMLString: true,
            message: `
                <div>更新成功</div>
              `,
            type: 'success'
          })
          this.onSearch();
        });
      }
      
    }
  }
}
</script>
