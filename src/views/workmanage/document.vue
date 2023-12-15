<template>
  <div class="app-container">
    
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.keyword" placeholder="关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="success" @click="handleAddUser">新增文档</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top:30px;">
      <el-table-column
        prop="id"
        align="center"
        label="文档ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        align="center"
        width="280">
      </el-table-column>
  
      <el-table-column align="center" label="内容">
        <template slot-scope="scope">
          <a @click="showDetail(scope)">{{scope.row.contents_fmt}}</a>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small"  @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small"  @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination v-show="total>0" :total="total" :page.sync="formInline.page" :limit="formInline.limit" :auto-scroll="false" @pagination="onSearch"/>


    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑文档':'创建文档'">
      <el-form :model="userInfo" label-width="80px" label-position="left">
        <el-form-item label="标题">
          <el-input v-model="userInfo.title" placeholder="标题" />
        </el-form-item>
     
        <el-form-item label="内容">
          <el-input
            v-model="userInfo.contents"
            :autosize="{ minRows: 15, maxRows: 50}"
            type="textarea"
            placeholder="文档内容"
          />
        </el-form-item>

      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmUser">确认</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogDetailVisible" title="文档内容">
      <div style="width: 90%;margin: 10px auto;overflow:auto;">
        <pre>{{contents}}</pre>
      </div>
      
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogDetailVisible=false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
  
</template>

<style>
  a:hover {
    color: blue; /*鼠标移动到链接的颜色*/
    /*text-decoration: underline;*/
  }
</style>
<script>

import { getDocument,addDocument,updateDocument,delDocument } from '@/api/work'
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
        keyword:'',
        page:1,
        limit:20
      },
      roleOptions:[],
      statusOptions:[{id:1,name:'开启'},{id:2,name:'禁用'}],
      dialogVisible:false,
      dialogDetailVisible:false,
      contents:'',
      dialogType: 'new',
      userInfo:{
        title:'',
        contents:'',
      }
    }
  },
  created() {
    this.onSearch();
  },
  methods:{

    onSearch(){
      getDocument(this.formInline).then(res=>{
          this.tableData = res.data.list;
          this.total = res.data.count;
          console.log(this.total);
      });
    },
    handleAddUser(){
      this.dialogVisible = true;
      this.userInfo = {
        title:'',
        contents:''
      }
    },
    handleEdit(scope){
      this.dialogVisible = true;
      this.dialogType = 'edit';
      this.userInfo = scope.row;
    },

    handleDelete({ $index, row }){
      this.$confirm('确认删除文档?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await delDocument({id:row.id})
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
        addDocument(this.userInfo).then(res=>{
          this.dialogVisible = false
          this.userInfo = {
            title:'',
            contents:''
          }
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
        updateDocument(this.userInfo).then(res=>{
          this.dialogVisible = false,
          this.userInfo = {
            title:'',
            contents:''
          }
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
      
    },
    showDetail({ $index, row }){
      this.dialogDetailVisible = true;
      this.contents = row.contents;
    }
  }
}
</script>
