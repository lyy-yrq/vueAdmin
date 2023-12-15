<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <div>
        <el-form-item label="" style="padding-right: 0px;margin-right: 0px;">
          <el-input placeholder="请输入时间戳" v-model="formInline.timestamp">
            <template slot="prepend">时间戳</template>
          </el-input>
        </el-form-item>
        <el-form-item style="padding-left: 0px;margin-left: 0px;padding-right: 0px;margin-right: 0px;" label="">
          <el-button type="info" plain @click="timestampToTime" >转换>></el-button>
        </el-form-item>
        <el-form-item style="padding-left: 0px;margin-left: 0px;" label="">
          <el-input placeholder="" v-model="formInline.timeformat">
            <template slot="append">北京时间</template>
          </el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="" style="padding-right: 0px;margin-right: 0px;">
          <el-date-picker
            v-model="formInline.time"
            type="datetime"
            placeholder="选择日期时间"
            default-time="">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="padding-left: 0px;margin-left: 0px;padding-right: 0px;margin-right: 0px;" label="">
          <el-button type="info" plain @click="timeToTimestamp" >转换>></el-button>
        </el-form-item>
        <el-form-item style="padding-left: 0px;margin-left: 0px;" label="">
          <el-input placeholder="" v-model="formInline.timestamp_format">
            <template slot="append">时间戳</template>
          </el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
  
</template>

<script>

import { timestampToTime,timeToTimestamp } from '@/api/tools'
import SelectAll from '@/components/SelectAll';
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  components:{
    Pagination,
    SelectAll
  },
  data() {
    return {
      formInline:{
        timestamp:'',
        timeformat:'',
        time:'',
        timestamp_format:''
      },
    }
  },
  created() {

  },
  methods:{
    timestampToTime(){
      timestampToTime(this.formInline).then(res=>{
        this.formInline.timeformat = res.data;
      });
    },
    timeToTimestamp(){
      timeToTimestamp(this.formInline).then(res=>{
        this.formInline.timestamp_format = res.data;
      });
    }
  }
}
</script>
