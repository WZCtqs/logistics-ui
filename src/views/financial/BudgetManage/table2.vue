<template>
  <div class="app-container calendar-list-container">


        <el-row>
          <el-col :span="9">
            <el-checkbox-group v-model="checkedCities1" @change="getVal" :max="1">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-col>


            <el-col :span="4">
              <el-input v-model="listQuery.plateNumber" placeholder="车牌号">
              </el-input>
            </el-col>

          <el-col :span="9" :push="1">
            <el-row>
              <el-col :span="11">
                <el-date-picker
                  :disabled="checkedCities1.length !=0"
                  type="date"
                  placeholder="开始日期"
                  v-model="listQuery.beginTime"
                  @keyup.enter.native="handleFilter"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" align="center">--</el-col>
              <el-col :span="11">
                <el-date-picker
                  :disabled="checkedCities1.length !=0"
                  type="date"
                  placeholder="结束日期"
                  v-model="listQuery.endTime"
                  @keyup.enter.native="handleFilter"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions1"
                ></el-date-picker>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="5">
            <el-button type="primary" @click="getData">生成数据</el-button>
            <el-button type="primary" @click="handleExp">导出</el-button>
          </el-col>
        </el-row>
        <div class="itemBox" v-if="show">
          <el-row>
            <el-col :span="4">
              <span class="itemSpan1">车牌号</span>
            </el-col>
             <el-col :span="4">
              <span class="itemSpan1">里程数</span>
            </el-col>
             <el-col :span="4">
              <span class="itemSpan1">订单数</span>
            </el-col>
             <el-col :span="3">
              <span class="itemSpan1">应收总费用</span>
            </el-col>
             <el-col :span="3">
              <span class="itemSpan1">应付总费用</span>
            </el-col>
             <el-col :span="3">
              <span class="itemSpan1">开票税额</span>
            </el-col>
             <el-col :span="3">
              <span class="itemSpan1">利润合计</span>
            </el-col>
          </el-row>

          <div :data="list" v-for="(item,index) in list" :key="index">
            <el-row>
                    <el-col :span="4">
                      <span class="itemSpan1">{{item.plateNumber}}</span>
                    </el-col>
                    <el-col :span="4">
                      <span class="itemSpan1">{{item.kilometre}}</span>
                    </el-col>
                    <el-col :span="4">
                      <span class="itemSpan1">{{item.orderSum}}</span>
                    </el-col>
                    <el-col :span="3">
                      <span class="itemSpan1">{{item.receivable}}</span>
                    </el-col>
                    <el-col :span="3">
                      <span class="itemSpan1">{{item.expensesPay}}</span>
                    </el-col>
                    <el-col :span="3">
                      <span class="itemSpan1">{{item.rate}}</span>
                    </el-col>
                    <el-col :span="3">
                      <span class="itemSpan1">{{item.receivable-item.expensesPay-item.rate}}</span>
                    </el-col>

            </el-row>
          </div>
           <h4 align="center" v-show="list.length==0">
             抱歉，暂无生成的数据
           </h4>


        </div>

  </div>
</template>

<script>
import {
  commonApi,
  commonExpApi
} from "@/api/BudgetManage1";
import waves from "@/directive/waves/index.js"; // 水波纹指令
// import shortOrderTable from "./shortOrder.vue";

import { mapGetters } from "vuex";
// import { defaultCoreCipherList, defaultCipherList } from "constants";
import table2Components from "./table2.vue";

const cityOptions = ["近7天", "本月", "本季度", "半年"];

export default {
  name: "table",
  directives: {
    waves
  },
  data() {
    return {
      num1:12,
      num2:5,
      show: true,
      checkedCities1: [],
      cities: cityOptions,
      list: [],
      total: null,
      listLoading: false,
      listQuery: {
        plateNumber:null,
        beginTime:null,
        endTime:null,
        timeType: null,
      },
       pickerOptions1: {
          disabledDate:(time) => {
               return time.getTime() < Date.parse(this.listQuery.beginTime) - 8.64e7;
          }
        },
      rules: {},
      form: {},
      dialogFormVisible: false,
      dialogStatus: "",
      multipleSelection: [],
      table1: {},
      table2:{},
      totalFee1: 0,
      totalFee2: 0,
      totalLr: 0
    };
  },
  components: {
    table2Components
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "有效",
        1: "无效"
      };
      return statusMap[status];
    }
  },
  watch: {

  },

  created() {
    // this.handleDept()
     this.getList(this.listQuery)
    this.getdriverArr = this.permissions["getdriverArr"];
  },
  methods: {
    getVal(val) {
      if (val == "" || val == null) {
        this.show = false;
      } else {
        this.show = true;
        this.listQuery.beginTime = null;
        this.listQuery.endTime = null;


         if (val == "近7天") {
          this.listQuery.timeType="WEEK";
        } else if (val == "本月") {
           this.listQuery.timeType="MONTH";
        } else if (val == "本季度") {
           this.listQuery.timeType="SEASON";
        } else if (val == "半年") {
          this.listQuery.timeType="HALF_A_YEAR";
        }

        this.getList(this.listQuery)

      }
    },

    getList(params){
        this.show = true;
        
        commonApi(params).then(res => {
        this.list = res.data;
        
       });
    },

    getData() {
      this.show = true;
      this.getList(this.listQuery)
    },

    getThisVal(obj) {
      if (obj != null && obj != "") {
        obj = Number(obj);
        return obj;
      } else {
        obj = 0;
        return obj;
      }
    },

    selectable(row, index) {
      if (row.needPayStatus == "5") {
        return false;
      } else {
        return true;
      }
    },
    Expjs(response){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        var nowDate = year + "-" + month + "-" + day;
        let blob = new Blob([response.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        let downloadElement = document.createElement("a");
        let href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = nowDate + "-车辆利润统计.xls"; // xxx.xls/xxx.xlsx
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
        this.$notify({
          title: "成功",
          message: "导出成功",
          type: "success",
          duration: 2000
        });

    },
    handleExp() {

        if (this.checkedCities1[0] == "近7天") {
          this.listQuery.timeType="WEEK";
        } else if (this.checkedCities1[0] == "本月") {
           this.listQuery.timeType="MONTH";
        } else if (this.checkedCities1[0] == "本季度") {
           this.listQuery.timeType="SEASON";
        } else if (this.checkedCities1[0] == "半年") {
          this.listQuery.timeType="HALF_A_YEAR";
        }
         commonExpApi(this.listQuery).then(res => {
            this.Expjs(res);
          });
      }
  }
};
</script>
<style >
.itemBox {
  border: 1px solid #ccc;
  margin-top: 30px;
}
.itemSpan1 {
  display: inline-block;
  width: 100%;
  height: 35px;
  line-height: 35px;
  border: 1px solid #ccc;
  border-left: none;
  border-top: none;
  text-align: center;
}
.itemSpan0 {
  border-left: 1px solid #ccc;
}
.itemSpan6 {
  height: 215px;
  line-height: 215px;
}
.itemSpan5 {
  height: 180px;
  line-height: 180px;
}
.rowItem {
  text-align: center;
  border: 1px solid #ccc;
  border-top: none;
}
.itemSpan13 {
  height: 432px;
  line-height: 465px;
}
</style>
