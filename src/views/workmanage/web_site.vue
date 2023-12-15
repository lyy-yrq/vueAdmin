<template>
  <div class="app-container">
    
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="网站">
        <el-input v-model="formInline.site_name" placeholder="网站"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <!--
        <el-button type="success" @click="handleAddUser">新增网站</el-button>
        -->
      </el-form-item>
    </el-form>
    
    <el-row>
    <el-col :span="4" v-for="(val, index) in tableData" :key="index" style="margin: 20px;" >
      <el-card :body-style="{ padding: '10px' }" shadow="always">
        <img :src="val.site_img" class="image">
        <div style="padding: 5px;">
          <span>{{ val.site_name }}</span>
        
          <div class="bottom clearfix">
            <div class="description">{{ val.description }}</div>
            <hr/>
            <div  class="account">登录账号：{{ val.site_account }}</div>
            <div class="oper_btn">
              <el-button v-if="val.site_url" @click="openUrl(val.site_url)" type="text" class="button">[前往]</el-button>
              <el-button v-if="val.have_password == 1" type="text" @click="showDialog(val)" class="button">[查看密码]</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <Pagination v-show="total>0" :total="total" :page.sync="formInline.page" :limit="formInline.limit" :auto-scroll="false" @pagination="onSearch"/>

    <el-dialog :visible.sync="dialogVisible" title="验证密令">
      <el-form :model="userInfo" label-width="80px" label-position="left">
        <el-form-item label="密令" v-if="password === ''">
          <el-input v-model="userInfo.verify_code" show-password placeholder="输入密令" />
        </el-form-item>
        <el-form-item label="密码" v-if="password">
          {{password}}
        </el-form-item>
      </el-form>
      <div style="text-align:right;" v-if="password === ''">
        <el-button type="danger" @click="handleColse">取消</el-button>
        <el-button type="primary" @click="confirmVerify">确认</el-button>
      </div>
      <div style="text-align:right;" v-if="password">
        <el-button type="danger" @click="handleColse">关闭</el-button>
      </div>
    </el-dialog>

  </div>
  
</template>

<script>

import { getList,verify } from '@/api/work'
import SelectAll from '@/components/SelectAll';
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components:{
    Pagination,
    SelectAll
  },
  data() {
    return {
      currentDate: new Date(),
      tableData: [],
      total:0,
      password:'',
      formInline:{
        site_name:'',
        type:'work',
        page:1,
        limit:10
      },
      dialogVisible:false,
      dialogType: 'new',
      userInfo:{verify_code:'',id:0}
    }
  },
  created() {
    this.onSearch();
  },
  methods:{
    openUrl(url){
      window.open(url);
    },
    onSearch(){
      getList(this.formInline).then(res=>{
          this.tableData = res.data.list;
          this.total = res.data.count;
          console.log(this.total);
      });
    },
    showDialog(val){
      this.dialogVisible=true;
      this.userInfo.id = val.id;
      this.userInfo.verify_code = '';
    },
    handleColse(){
      this.password = '';
      this.userInfo.id = 0;
      this.dialogVisible=false;
    },
    confirmVerify(){
      verify(this.userInfo).then(res=>{
        this.password = res.data.site_password;
        this.showDialog(this.userInfo.id);
      });
    }
  }
}
</script>
<style>
  .description {
    font-size: 12px;
    color: #999;
  }
  .account {
    font-size: 13px;
    color: #999;
  }
  .oper_btn{
    margin-top: 13px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 200px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>