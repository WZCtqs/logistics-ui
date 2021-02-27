<template>
  <div class="app-container calendar-list-container">

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column align="center" label="id" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.loanId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="司机">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.truTruck === null"></span>
          <span v-else>{{ scope.row.truTruck.plateNumber }}</span> -->
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单号">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.applyDate | moment('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话">
        <template slot-scope="scope">
          <span>{{ scope.row.applySum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算方式">
        <template slot-scope="scope">
          <span>{{ scope.row.applyReason }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单类型">
        <template slot-scope="scope">
          <span>{{ scope.row.loanCardNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车辆类型">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="分公司名称">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentWay }}期</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提货地">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="送货地">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公里数">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单价">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="运输费">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提箱费">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="压车费">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="异常费用">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合计费用">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="利率">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="合计费用（含发票）">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="正常油卡费用">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="应付现金">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="运费油卡">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算状态">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算状态">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="司机反馈">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作">
        <template>
          <button type="primary" value="发送司机"></button>
          <button type="primary" value="费用分配"></button>
          <button type="primary" value="开票结算确认"></button>
           <button type="primary" value="不开票结算确认"></button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>


  </div>
</template>

<script>
  import { addObj, delObj, fetchList,getObj, putObj, fetchDeptSelect,repaymentRateSelect,selectDriverPlateNumberSelect } from '@/api/financialManagement'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'
  // import { defaultCoreCipherList, defaultCipherList } from 'constants';

  export default {
    props:{
        listQuery1:{
            type:Object,
            required:true
        }
    },
    name: 'table_loan',
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: false,
        listQuery: {

        },


        rules: {},
        form: {
          plateNumber: '',
          repaymentRate:null,
        },
        dialogFormVisible: false,
        dialogStatus: '',
        loan_upd: false,
        loan_del: false,
        financial_exp:false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        multipleSelection: []


      }
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '有效',
          1: '无效'
        }
        return statusMap[status]
      }
    },
    created() {
      //
      // this.listQuery=this.listQuery1
      // alert(JSON.stringify(this.listQuery))
      // this.getList(this.listQuery)
    },
    methods: {
       childMethod(flag) {
       alert()
      },
        getList(obj) {

          alert("ok")
        this.listLoading = true

        fetchList(this.listQuery).then(response => {
          this.list = response.data.records

          this.total = response.data.total
          this.listLoading = false
        })
      },
       handleSelectionChange(val) {
      this.multipleSelection = val;
      },
       handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
       },
       handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
    }
  }
</script>
