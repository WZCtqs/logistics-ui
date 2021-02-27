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

      <el-table-column align="center" label="车队名称">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单号222">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单类型">
        <template slot-scope="scope">
          <span>{{ scope.row.applyDate  | moment('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务日期">
        <template slot-scope="scope">
          <span>{{ scope.row.applySum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="托运客户">
        <template slot-scope="scope">
          <span>{{ scope.row.applyReason }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="品名">
        <template slot-scope="scope">
          <span>{{ scope.row.loanCardNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="空重箱">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务种类">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentWay }}期</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="路线">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="短驳次数">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="短驳费">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="超时费">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="压车费">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="其他费用">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="正常油卡">
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
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
           <button type="primary" value="发送司机"></button>
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
            type:Array,
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
          page: 1,
          limit: 20,
          plateNumber:null,
          beginTime:null,
          endTime:null,
          driverName:null,
          cashType:null
        },
        cashTypearr:[
            {
                id:0,
                label:"单结"
            },{
                id:1,
                label:"月结"
            }
        ],
        orderTypearr:[
            {
                id:0,
                label:"集装箱订单"
            },{
                id:1,
                label:"普货订单"
            },{
                id:2,
                label:"盘短订单"
            }

        ],
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
      this.listQuery=this.listQuery1

    },
    methods: {
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
