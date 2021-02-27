<template>
  <div class="app-container calendar-list-container">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">
          <i class="el-icon-date"></i> 总公司利润统计
        </span>
        <el-row>
          <el-col :span="9">
            <el-checkbox-group v-model="checkedCities1" @change="getVal" :max="1">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="9">
            <el-row>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="listQuery.ordStartTime"
                  :disabled="checkedCities1.length !=0"
                  style="width: 100%;"
                  @keyup.enter.native="handleFilter"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" align="center">--</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="listQuery.ordEndTime"
                  :disabled="checkedCities1.length !=0"
                  style="width: 100%;"
                  @keyup.enter.native="handleFilter"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="5" :push="1">
            <el-button type="primary" @click="getData" >生成数据</el-button>
            <el-button type="primary" @click="handleExp">导出</el-button>
          </el-col>
        </el-row>
        <div class="itemBox" v-if="show">
          <el-row>
            <el-col :span="6">
              <span class="itemSpan1">收支</span>
            </el-col>
            <el-col :span="6">
              <span class="itemSpan1">来源</span>
            </el-col>
            <el-col :span="6">
              <span class="itemSpan1 itemSpan0">费用明细</span>
            </el-col>
            <el-col :span="6">
              <span class="itemSpan1">金额</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span class="itemSpan1 itemSpan6">收入</span>
            </el-col>
            <el-col :span="6">
              <span class="itemSpan1 itemSpan6">运费收入</span>
            </el-col>
            <el-col :span="6">
              <span class="itemSpan1 itemSpan0">运输费</span>
              <span class="itemSpan1 itemSpan0">提货费</span>
              <span class="itemSpan1 itemSpan0">装货费</span>
              <span class="itemSpan1 itemSpan0">卸货费</span>
              <span class="itemSpan1 itemSpan0">提箱费</span>
              <span class="itemSpan1 itemSpan0">异常费用</span>
            </el-col>
            <el-col :span="6">
              <span class="itemSpan1 itemSpan0" v-if="table1.recTransportFee != null && table1.recTransportFee != ''">{{table1.recTransportFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.recPickFee != null && table1.recPickFee != ''">{{table1.recPickFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.recPackFee != null && table1.recPackFee != ''">{{table1.recPackFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.recReleaseFee != null && table1.recReleaseFee != ''">{{table1.recReleaseFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.recPickcnFee != null && table1.recPickcnFee != ''">{{table1.recPickcnFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.recExceptionFee != null && table1.recExceptionFee != ''">{{table1.recExceptionFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="rowItem">收入合计:{{totalFee1}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <span class="itemSpan1 itemSpan13">支出</span>
            </el-col>
            <el-col :span="6">
              <span class="itemSpan1 itemSpan6">承运车队支出</span>
              <span class="itemSpan1 itemSpan5">自有车支出</span>
              <span class="itemSpan1 itemSpan0">开票税额</span>
            </el-col>
            <el-col :span="6">
              <span class="itemSpan1 itemSpan0">运输费</span>
              <span class="itemSpan1 itemSpan0">装货费</span>
              <span class="itemSpan1 itemSpan0">卸货费</span>
              <span class="itemSpan1 itemSpan0">油费</span>
              <span class="itemSpan1 itemSpan0">异常费用</span>
              <span class="itemSpan1 itemSpan0">其他费用</span>

              <span class="itemSpan1 itemSpan0">油费</span>
              <span class="itemSpan1 itemSpan0">装货费</span>
              <span class="itemSpan1 itemSpan0">卸货费</span>
              <span class="itemSpan1 itemSpan0">异常费用</span>
              <span class="itemSpan1 itemSpan0">其他费用</span>
              <span class="itemSpan1 itemSpan0">开票税额</span>
            </el-col>
            <el-col :span="6">
              <span class="itemSpan1 itemSpan0" v-if="table1.payTeamTransportFee != null && table1.payTeamTransportFee != ''">{{table1.payTeamTransportFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.payTeamPackFee != null && table1.payTeamPackFee != ''">{{table1.payTeamPackFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.payTeamReleaseFee != null && table1.payTeamReleaseFee != ''">{{table1.payTeamReleaseFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.payTeamOilFee != null && table1.payTeamOilFee != ''">{{table1.payTeamOilFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.payTeamExceptionFee != null && table1.payTeamExceptionFee != ''">{{table1.payTeamExceptionFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.payTeamOtherFee != null && table1.payTeamOtherFee != ''">{{table1.payTeamOtherFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>

              <span class="itemSpan1 itemSpan0" v-if="table1.payPersonOilFee != null && table1.payPersonOilFee != ''">{{table1.payPersonOilFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.payPersonPackFee != null && table1.payPersonPackFee != ''">{{table1.payPersonPackFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.payPersonReleaseFee != null && table1.payPersonReleaseFee != ''">{{table1.payPersonReleaseFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.payPersonExceptionFee != null && table1.payPersonExceptionFee != ''">{{table1.payPersonExceptionFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
              <span class="itemSpan1 itemSpan0" v-if="table1.payPersonOtherFee != null && table1.payPersonOtherFee != ''">{{table1.payPersonOtherFee}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>

              <span class="itemSpan1 itemSpan0" v-if="table1.rate != null && table1.rate != ''">{{table1.rate}}</span>
              <span class="itemSpan1 itemSpan0" v-else >0</span>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" class="rowItem">支出合计:{{totalFee2}}</el-col>
          </el-row>

          <el-row>
            <el-col :span="24" class="rowItem">本期利润:{{totalLr}}</el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="分公司/网点利润统计">
        分公司/网点利润统计
      </el-tab-pane> -->
      <el-tab-pane label="车辆利润统计">
         <table2Components></table2Components>
      </el-tab-pane>
      <el-tab-pane label="单票货物利润统计">
        <table3Components></table3Components>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  commonApi,
  commonExpApi
} from "@/api/BudgetManage";
import waves from "@/directive/waves/index.js"; // 水波纹指令
// import shortOrderTable from "./shortOrder.vue";

import { mapGetters } from "vuex";
// import { defaultCoreCipherList, defaultCipherList } from "constants";
import table2Components from "./table2.vue";
import table3Components from "./table3.vue";


const cityOptions = ["近7天", "本月", "本季度", "半年"];

export default {
  name: "table",
  directives: {
    waves
  },
  data() {
    return {
      show: true,
      checkedCities1: ["近7天"],
      cities: cityOptions,
      list: [],
      total: null,
      listLoading: false,
      listQuery: {
        ordEndTime:null,
        ordStartTime:null,
        timeType: null,
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
    table2Components,
    table3Components
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
    // timeLong(newObj, oldObj) {
    //   if(newObj != "" && newObj != null){
    //     this.listQuery.ordStartTime=null
    //     this.listQuery.ordEndTime=null
    //   }
    // },
    // listQuery(newObj, oldObj){
    //   if(newObj.ordStartTime != null && newObj.ordStartTime != "" && newObj.ordEndTime != null && newObj.ordEndTime != ""){
    //     this.timeLong=null
    //   }
    // }
  },

  created() {
    // this.handleDept()
    this.selectLast7days_js();
    this.getdriverArr = this.permissions["getdriverArr"];
  },
  methods: {
    getVal(val) {
      if (val == "" || val == null) {
        this.show = false;
      } else {
        this.show = true;
        this.listQuery.ordStartTime=null
        this.listQuery.ordEndTime=null

        if (val == "近7天") {
          this.listQuery.timeType="WEEK";
        } else if (val == "本月") {
           this.listQuery.timeType="MONTH";
        } else if (val == "本季度") {
           this.listQuery.timeType="SEASON";
        } else if (val == "半年") {
          this.listQuery.timeType="HALF_A_YEAR";
        }

        this.commonApi_js()
      }
    },
    commonApi_js() {
         if (this.checkedCities1[0] == "近7天") {
          this.listQuery.timeType="WEEK";
        } else if (this.checkedCities1[0] == "本月") {
           this.listQuery.timeType="MONTH";
        } else if (this.checkedCities1[0] == "本季度") {
           this.listQuery.timeType="SEASON";
        } else if (this.checkedCities1[0] == "半年") {
          this.listQuery.timeType="HALF_A_YEAR";
        }
       // console.log(this.listQuery)
      commonApi(this.listQuery).then(res => {
        this.table1 = res.data;
        this.getTotalFee_js();
      });
    },

    getData() {
      this.show = true;
      commonApi(this.listQuery).then(res => {
        this.table1 = res.data;
        this.getTotalFee_js();
      });
    },
    getTotalFee_js() {
      
      this.table1.recTransportFee = this.getThisVal(
        this.table1.recTransportFee
      );
      this.table1.recPickFee = this.getThisVal(this.table1.recPickFee);
      this.table1.recPackFee = this.getThisVal(this.table1.recPackFee);
      this.table1.recReleaseFee = this.getThisVal(this.table1.recReleaseFee);
      this.table1.recPickcnFee = this.getThisVal(this.table1.recPickcnFee);
      this.table1.recExceptionFee = this.getThisVal(
        this.table1.recExceptionFee
      );

      this.totalFee1 =
        this.table1.recTransportFee +
        this.table1.recPickFee +
        this.table1.recPackFee +
        this.table1.recReleaseFee +
        this.table1.recPickcnFee +
        this.table1.recExceptionFee;

      this.table1.payTeamTransportFee = this.getThisVal(
        this.table1.payTeamTransportFee
      );
      this.table1.payTeamPackFee = this.getThisVal(this.table1.payTeamPackFee);
      this.table1.payTeamReleaseFee = this.getThisVal(
        this.table1.payTeamReleaseFee
      );
      this.table1.payTeamOilFee = this.getThisVal(this.table1.payTeamOilFee);
      this.table1.payTeamExceptionFee = this.getThisVal(
        this.table1.payTeamExceptionFee
      );
      this.table1.payTeamOtherFee = this.getThisVal(
        this.table1.payTeamOtherFee
      );

      this.table1.payPersonOilFee = this.getThisVal(
        this.table1.payPersonOilFee
      );
      this.table1.payPersonPackFee = this.getThisVal(
        this.table1.payPersonPackFee
      );
      this.table1.payPersonReleaseFee = this.getThisVal(
        this.table1.payPersonReleaseFee
      );
      this.table1.payPersonExceptionFee = this.getThisVal(
        this.table1.payPersonExceptionFee
      );
      this.table1.payPersonOtherFee = this.getThisVal(
        this.table1.payPersonOtherFee
      );

      this.table1.rate = this.getThisVal(this.table1.rate);

       this.totalFee2 =
        this.table1.payTeamTransportFee +
        this.table1.payTeamPackFee +
        this.table1.payTeamReleaseFee  +
        this.table1.payTeamOilFee +
        this.table1.payTeamExceptionFee +
        this.table1.payTeamOtherFee +
        this.table1.payPersonOilFee +
        this.table1.payPersonPackFee +
        this.table1.payPersonReleaseFee +
        this.table1.payPersonExceptionFee +
        this.table1.payPersonOtherFee+
        this.table1.rate
        this.totalLr=this.totalFee1-this.totalFee2
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
        downloadElement.download = nowDate + "-总公司利润统计.xls"; // xxx.xls/xxx.xlsx
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
         console.log(this.listQuery)
        
         commonExpApi(this.listQuery).then(res => {

            this.Expjs(res);

          });



    },

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
