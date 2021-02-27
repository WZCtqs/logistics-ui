<template>
  <div class="app-container calendar-list-container">
    <el-table
      v-if="listQuery.orderType=='1'"
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left"
                   inline
                   class="table-expand">

            <el-col :span="6">
              <el-form-item label="司机：">
                <span v-if="scope.row.driverName==null || scope.row.driverName==''">暂无</span>
                <span v-else>{{ scope.row.driverName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话：">
                <span v-if="scope.row.driverPhone==null || scope.row.driverPhone==''">暂无</span>
                <span v-else>{{ scope.row.driverPhone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="订单类型：">
                <span v-if="scope.row.orderType==null || scope.row.orderType==''">暂无</span>
                <span v-else>{{ scope.row.orderType }}</span>
              </el-form-item>
            </el-col>


            <el-col :span="6">
              <el-form-item label="公里数：">
                <span v-if="scope.row.distance==null || scope.row.distance==''">暂无</span>
                <span v-else>{{ scope.row.distance }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="单价：">
                <span v-if="scope.row.perPrice==null || scope.row.perPrice==''">暂无</span>
                <span v-else>{{ scope.row.perPrice }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="运输费：">
                <span v-if="scope.row.transportFee==null || scope.row.transportFee==''">暂无</span>
                <span v-else>{{ scope.row.transportFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="装货费：">
                <span v-if="scope.row.pickcnFee==null || scope.row.pickcnFee==''">暂无</span>
                <span v-else>{{ scope.row.pickcnFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="卸货费：">
                <span v-if="scope.row.releaseFee==null || scope.row.releaseFee==''">暂无</span>
                <span v-else>{{ scope.row.releaseFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="异常费用：">
                <span v-if="scope.row.exFee==null || scope.row.exFee==''">暂无</span>
                <span v-else>{{ scope.row.exFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="利率：">
                <span v-if="scope.row.rateStr==null || scope.row.rateStr==''">暂无</span>
                <span v-else>{{ scope.row.rateStr }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="合计费用（含发票）：">
                <span v-if="scope.row.needPayByRate==null || scope.row.needPayByRate==''">暂无</span>
                <span v-else>{{ scope.row.needPayByRate }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="司机反馈：">
                <span v-if="scope.row.feedBack==null || scope.row.feedBack==''">暂无</span>
                <span v-else>{{ scope.row.feedBack }}</span>
              </el-form-item>
            </el-col>


            <el-col :span="9">
              <el-form-item label="提货地：">
                <span v-if="scope.row.pickGoodsPlace==null || scope.row.pickGoodsPlace==''">暂无</span>
                <span v-else>{{ scope.row.pickGoodsPlace }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="9">
              <el-form-item label="送货地：">
                <span v-if="scope.row.sendGoodsPlace==null || scope.row.sendGoodsPlace==''">暂无</span>
                <span v-else>{{ scope.row.sendGoodsPlace }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="正常油卡费用：">
                <span v-if="scope.row.carType==null || scope.row.carType==''">暂无</span>
                <span v-else>{{ scope.row.carType }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="应付现金：">
                <span v-if="scope.row.cash==null || scope.row.cash==''">暂无</span>
                <span v-else>{{ scope.row.cash }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="运费油卡：">
                <span v-if="scope.row.transOilFee==null || scope.row.transOilFee==''">暂无</span>
                <span v-else>{{ scope.row.transOilFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="备注：">
                <span v-if="scope.row.remarks==null || scope.row.remarks==''">暂无</span>
                <span v-else>{{ scope.row.remarks }}</span>
              </el-form-item>
            </el-col>



          </el-form>
        </template>
      </el-table-column>


      <el-table-column type="selection" width="55" :selectable="selectable"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>

      <el-table-column align="center" label="是否加入对账单">
        <template slot-scope="scope">
          <span v-if="scope.row.ifAddToYfbill=='0'">未加入</span>
          <span v-if="scope.row.ifAddToYfbill=='1'">已加入</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="订单号">
        <template slot-scope="scope">
          <span style="color:#409EFF;cursor:pointer"
                @click="handleDetail2(scope.row)">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="车辆类型">
        <template slot-scope="scope">
          <span v-if="scope.row.carType=='0'">自有车辆</span>
          <span v-else-if="scope.row.carType=='1'">挂靠车辆</span>
          <span v-else-if="scope.row.carType=='2'">外调车辆</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算方式">
        <template slot-scope="scope">
          <span>{{scope.row.settlement}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="合计费用">
        <template slot-scope="scope">
          <span>{{ scope.row.needPay }}</span>
        </template>
      </el-table-column>




      <el-table-column align="center" label="结算状态">
        <template slot-scope="scope">
          <span v-if="scope.row.needPayStatus=='0'">账单未分配</span>
          <span v-else-if="scope.row.needPayStatus=='1'">账单未发送</span>
          <span v-else-if="scope.row.needPayStatus=='2'">账单已发送</span>
          <span v-else-if="scope.row.needPayStatus=='3'"> 司机已反馈</span>
          <span v-else-if="scope.row.needPayStatus=='4'">司机已确认</span>
          <span v-else-if="scope.row.needPayStatus=='5'">司机已确认</span>
        </template>
      </el-table-column>


       <el-table-column align="center"
                       label="现金结算状态">
        <template slot-scope="scope">

          <el-tag type="success" v-if="scope.row.orderSettlementStatus.cashStatus==0">  未结算 </el-tag>
         <el-tag type="danger" v-if="scope.row.orderSettlementStatus.cashStatus==2">  已结算 </el-tag>
        </template>
      </el-table-column>



      <el-table-column align="center"
                       label="运费油卡充值">
        <template slot-scope="scope">
           <el-tag type="info" v-if="scope.row.settlement =='月结'"> 月结无 </el-tag>
           <el-tag type="warning" v-if="scope.row.settlement =='单结' && scope.row.orderSettlementStatus.oilStatus==1">  充值中 </el-tag>
           <el-tag type="danger" v-if="scope.row.settlement =='单结' && scope.row.orderSettlementStatus.oilStatus==2">  已结算 </el-tag>


          <el-button size="mini"
                     type="primary"
                     v-show="scope.row.settlement =='单结' && scope.row.orderSettlementStatus.oilStatus == 0"
                     @click="handleRecharge(scope.row)">去充值
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import { BillConfirm, delObj, fetchList, getObj, putObj, sendToDriver, totalObj } from '@/api/financialManagement'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    props: {
      listQuery1: {
        type: Object,
        required: true
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
        listQuery: {},
        cashTypearr: [
          {
            id: 0,
            label: '单结'
          },
          {
            id: 1,
            label: '月结'
          }
        ],
        orderTypearr: [
          {
            id: 0,
            label: '集装箱订单'
          },
          {
            id: 1,
            label: '普货订单'
          },
          {
            id: 2,
            label: '盘短订单'
          }
        ],
        rules: {},
        form: {
          plateNumber: '',
          repaymentRate: null
        },
        dialogFormVisible: false,
        dialogStatus: '',
        loan_upd: false,
        loan_del: false,
        financial_exp: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        multipleSelection: [],
        orderFeeSum: 0
      }
    },
    computed: {
      ...mapGetters(['permissions'])
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
      this.listQuery = this.listQuery1
      this.getList()
    },
    methods: {

      selectable(row, index) {
        // if (row.needPayStatus == "5") {
        //   return false;
        // }else{
        //   return true
        // }
        return true
      },
      handleDetail2(obj) {
        this.$emit('handleDetailPH', obj)
      },
      sendDriver(obj) {
        var params = {
          orderId: obj.orderId,
           plateNumber:obj.plateNumber
         // driverId: obj.driverId
        }
        sendToDriver(params).then(res => {
          if (res.data.data) {
            this.$notify({
              title: '成功',
              message: '发送成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      distributionFee(obj) {
        this.$emit('distributionFee', obj)
      },
      handleBillConfirm(row, ifInvoice) {
        var params = {
          orderId: row.orderId,
          ifInvoice: ifInvoice
        }
        BillConfirm(params).then(res => {
          if (res.data.data) {
            this.getList()
            this.$notify({
              title: '提示',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
        totalObj(this.listQuery).then(res => {
          this.orderFeeSum = res.data
          this.$emit('orderFeeSumUpdate', this.orderFeeSum)
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleRecharge(obj) {

            this.$emit('handleRecharge1', obj)

      }
    }
  }
</script>
