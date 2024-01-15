<template>
  <div>
    <div  style="background-color: #42b983;width: 100%;height: 80px;">
      <div style="font-size: 16px;color: #fff;text-align: center;line-height: 80px;" >
      <font >支出：{{expend}}</font><font style="margin-left: 20px;"></font> <font>收入：{{income}}</font>
      </div>
    </div>
    <div class="app-container">
    <el-container >
    <el-header>
      <div style="background-color: #fff ; width: 100px;height: 40px;line-height:40px;text-align: center;border-radius:20px;box-shadow: 0 0 10px #ccc">
        <i class="el-icon-edit-outline" @click="showAdd" style="font-size: 16px;color: #1DD965;">记一笔</i>
      </div>
    
      <div>
        <ul class="infinite-list" v-infinite-scroll="getAccountBook" style="height: 500px;overflow:auto;background-color: background-color: rgb(66, 185, 131);">
          <li style="list-style: none;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="">
                <el-date-picker
                  @change="initData"
                  v-model="formInline.month"
                  type="month"
                  placeholder="选择月">
                </el-date-picker>
              </el-form-item>
            </el-form>
          </li>
          <li v-for="vo in list" class="infinite-list-item list-item-li">
            <div class="list-item-li-div">
              <el-row :gutter="20">
                <el-col :span="6" style="text-align: center;">
                  <i v-if="vo.type == 1" class="el-icon-shopping-cart-full" style="margin:0 auto;color: red;" />
                  <i v-if="vo.type == 2" class="el-icon-money" style="margin:0 auto;color:green;" />
                </el-col>
                <el-col :span="10">
                  <div style="line-height: 50px;font-size: 14px;padding-top: 20px;">{{vo.remark}}</div>
                  <div style="line-height: 20px;font-size: 8px;color: #ccc;">{{vo.datetime}}</div>
                </el-col>
                <el-col :span="4" v-if="vo.type == 1" style="font-size: 14px;color:red;padding-right: 20px;text-align: left;">{{vo.money}}</el-col>
                <el-col :span="4" v-if="vo.type == 2" style="font-size: 14px;color: green;padding-right: 20px;text-align: left;">+{{vo.money}}</el-col>
              </el-row>
            </div>
          </li>
        </ul>
      </div>
    </el-header>
    <el-main>
       
      <el-drawer
        title="记账"
        :before-close="handleClose"
        :visible.sync="drawer"
        :direction="direction"
        custom-class="demo-drawer"
        ref="drawer"
        size="65%"
        >
        <div style="margin: 0 auto; width: 86%;">
          <el-form :model="form">
            <el-form-item label="" label-width="5%">
              <el-radio-group v-model="form.type"  size="mini">
                <el-radio-button label="1">支出</el-radio-button>
                <el-radio-button label="2">收入</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="" label-width="1%">
              <div @click="selectFlag('zz')">
              <el-alert  style="height: 30px;width: 100px;float: left;margin: 1px;"
                :type="type.zz"
                center
                :closable="closable"
                description="转账">
              </el-alert>
              </div>
              <div @click="selectFlag('gw')">
                <el-alert  style="height: 30px;width: 100px;float: left;margin: 1px;"
                  :type="type.gw"
                  center
                  :closable="closable"
                  description="购物">
                </el-alert>
             </div>
             <div @click="selectFlag('tk')">
                <el-alert  style="height: 30px;width: 100px;float: left;margin: 1px;"
                  :type="type.tk"
                  center
                  :closable="closable"
                  description="退款">
                </el-alert>
             </div>
            </el-form-item>
            <el-form-item label="日期" label-width="20%">
              <el-date-picker
                v-model="form.datetime"
                type="datetime"
                placeholder="选择日期时间"
                default-time="00:00:00">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="金额" label-width="20%">
              <el-input v-model="form.money" placeholder="金额"></el-input>
            </el-form-item>
            <el-form-item label="备注" label-width="20%">
              <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>

            <el-form-item label="" label-width="25%">
              <el-button @click="handleClose">取 消</el-button>
              <el-button type="primary" @click="submitAccountBook" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </el-main>
    <el-footer></el-footer>
  </el-container>
  </div>
  </div>

  
  
</template>

<style>
body{
  background-color: #faf9f9;
}
.list-item-li{
  line-height: 100px;
  margin-top: 3px;
  margin-bottom: 5px;
  list-style: none;
  width: 100%;
}
.list-item-li-div{
  line-height: 100px;
  width: 98%;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1)
}
</style>
<script>

import { submitAccountBook,getTotalData,getAccountBook } from '@/api/tools'
import SelectAll from '@/components/SelectAll';
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

function getNowMonth() {
    var now = new Date(),
    y = now.getFullYear(),
    month = now.getMonth(),
    d = now.getDate(),
    h = now.getHours(),
    m = now.getMinutes(),
    s = now.getSeconds();
    return (y + "-" + (month + 1) );
 }
export default {
  components:{
    Pagination,
    SelectAll
  },
  data() {
    return {
      drawer:false,
      direction:'btt',
      form:{
        type:'1',
        flag:[]
      },
      type:{
        zz:'info',
        gw:'info',
        tk:'info',
      },
      loading:false,
      closable:false,
      expend:'0.00',
      income:'0.00',
      list:[],
      offset:1,
      total_page:1,
      formInline:{
        'month':getNowMonth()
      }
    }
  },
  created() {
    this.getTotalData();
  },
  methods:{
    initData(){
        this.getTotalData();
        this.offset =1;
        this.getAccountBook();
    },
    showAdd(){
      this.drawer = true;
      this.form={
        type:'1',
        flag:[]
      };
    },
    handleClose(){
      this.drawer = false
      this.form={
        type:'1',
        flag:[]
      };
    },
    submitAccountBook(){
      submitAccountBook(this.form).then(res=>{
        this.drawer = false
          this.$notify({
            title: 'Success',
            dangerouslyUseHTMLString: true,
            message: `
                <div>添加成功</div>
              `,
            type: 'success'
          });
          this.initData();
      })
    },
    selectFlag(flag){
      if(this.form.flag.includes(flag)){
        this.type[flag] = 'info';
        //删除元素
        this.form.flag = this.form.flag.filter(item => item != flag)
        console.log(this.form.flag)
      }else{
        this.type[flag] = 'success';
        this.form.flag.push(flag);
        console.log(this.form.flag)
      }
      
    },
    getTotalData(){
      getTotalData().then(res=>{
        this.expend = res.data.expend;
        this.income = res.data.income;
      });
    },
    getAccountBook(){
      if(this.offset > 0){
          getAccountBook({offset:this.offset,month:this.formInline.month}).then(res=>{
            if(this.offset == 1){
              this.list = res.data.list;
            }else{
              this.list.concat(res.data.list);
            }
            this.offset = res.data.next_offset;
            this.total_page = res.data.total_page;
        });
      }
    },
  }
}
</script>
