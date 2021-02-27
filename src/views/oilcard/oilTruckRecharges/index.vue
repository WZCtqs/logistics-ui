<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px"
               class="filter-item">
        <el-col :span="8">
          <el-form-item label="月份选择"
                        class="filter-item">
            <el-date-picker type="month"
                            placeholder="选择日期"
                            v-model="listQuery.rechargeTime"
                            @change="handleFilter"
                            style="width: 100%;"
                            format="yyyy 年 MM 月"
                            value-format="yyyy-MM"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车辆类型 "
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.attribute"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in attributeReq"
                         :key="item.id"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车牌号码"
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.plateNumber"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in plateNumberReq"
                         :key="item.id"
                         :label="item.plateNumber"
                         :value="item.plateNumber">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-button v-if="oilTruckRecharges_exp"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleExp"
                   type="primary"
                   icon="edit"
                   size="mini">导出
        </el-button>
      </div>
    </div>
    <el-table :key='tableKey'
              :data="list"
              v-loading="listLoading"
              element-loading-text="给我一点时间"
              border
              fit
              highlight-current-row
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column align="center"
                       label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="卡数量">
        <template slot-scope="scope">
          <span>{{ scope.row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车辆类别"
                       prop="lastCash"
                       sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.attribute === '0'">自有车辆</span>
          <span v-if="scope.row.attribute === '1'">挂靠车辆</span>
          <span v-if="scope.row.attribute === '2'">外调车辆</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="充值详情">
        <template slot-scope="scope">
          <el-button type="success"
                     round
                     size="small"
                     @click="handleDetailList(scope.row)">充值详情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="上月结余"
                       prop="lastAmount">
        <template slot-scope="scope">
          <span>{{ scope.row.lastAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="财务分配数"
                       prop="rechargeSum">
        <template slot-scope="scope">
          <span>{{ scope.row.rechargeSum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="本月已充值">
        <template slot-scope="scope">
          <span>{{ scope.row.distributeSum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="本月运费油卡余额">
        <template slot-scope="scope">
          <span>{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading"
         class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <el-dialog title="本月运费油卡充值情况"
               :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="plateNumber"
                         label="车牌号"
                         width="150"></el-table-column>
        <el-table-column property="recharge"
                         label="财务充值数"
                         width="200">
        </el-table-column>
        <el-table-column property="rechargeTime"
                         label="充值日期">
          <template slot-scope="scope">
            <span>{{ scope.row.rechargeTime | moment('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>
        <el-table-column property="balance"
                         label="运费油卡余额"></el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination @size-change="handleGridSizeChange"
                       @current-change="handleGridCurrentChange"
                       :current-page.sync="gridListQuery.page"
                       :page-sizes="[10,20,30, 50]"
                       :page-size="gridListQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="gridTotal">
        </el-pagination>
      </div>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="dialogTableVisible = false">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { expObj, fetchDetailList, fetchList } from '@/api/oilTruckRecharges'
  import { getattributeObj, getplateNumberObj } from '@/api/oil_exception'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_oil_apply',
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          rechargeTime: '',
          attribute: '',
          plateNumber: '',
          page: 1,
          limit: 20
        },
        gridListQuery: {
          page: 1,
          limit: 20
        },
        oilTruckRecharges_exp: false,
        tableKey: 0,
        attributeReq: [],
        plateNumberReq: [],
        dialogTableVisible: false,
        gridData: [],
        multipleSelection: [],
        gridTotal: 0
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
      const data = new Date()
      if (data.getMonth() < 9) {
        this.listQuery.rechargeTime = data.getFullYear() + '-0' + (data.getMonth() + 1)
      } else {
        this.listQuery.rechargeTime = data.getFullYear() + '-' + (data.getMonth() + 1)
      }
      this.getList()
      this.oilTruckRecharges_exp = this.permissions['oilTruckRecharges_exp']
      this.getattributeObjList()
      this.getplateNumberObjList()
    },
    methods: {
      getList() {
        this.listLoading = false
        fetchList(this.listQuery).then(response => {
          // this.list = response.data
          // console.log(this.list)
          // this.listLoading = false
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      getattributeObjList() {
        getattributeObj().then(response => {
          this.attributeReq = response.data
        })
      },
      getplateNumberObjList() {
        getplateNumberObj().then(response => {
          this.plateNumberReq = response.data
        })
      },
      handleExp() {
        let ids = ''
        if (this.multipleSelection.length > 0) {
          this.multipleSelection.forEach(item => {
            ids += item.truckMonthId + ','
          })
          ids = ids.substring(0, ids.length - 1)
        } else {
          ids = 'all'
        }
        expObj(this.listQuery, ids).then(response => {
          var date = new Date()
          var year = date.getFullYear()
          var month = date.getMonth() + 1
          var day = date.getDate()
          if (month < 10) {
            month = '0' + month
          }
          if (day < 10) {
            day = '0' + day
          }
          var nowDate = year + '-' + month + '-' + day
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          const downloadElement = document.createElement('a')
          const href = window.URL.createObjectURL(blob)
          downloadElement.href = href
          downloadElement.download = nowDate + '-车辆运费油卡.xls'
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement)
          window.URL.revokeObjectURL(href)
          this.$notify({
            title: '成功',
            message: '导出成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      handleDetailList(row) {
        fetchDetailList(row.truckId).then(res => {
          this.gridData = res.data.records
          this.gridTotal = res.data.total
          this.listLoading = false
          this.dialogTableVisible = true
        })
      },
      handleGridSizeChange(val) {
        this.gridListQuery.limit = val
        this.handleDetailList()
      },
      handleGridCurrentChange(val) {
        this.gridListQuery.page = val
        this.handleDetailList()
      }
    }
  }
</script>
