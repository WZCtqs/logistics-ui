<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form ref="form" :model="listQuery" label-width="100px" class="filter-item">
        <el-col :span="11">
          <el-form-item label="借款日期" class="filter-item">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="listQuery.beginTime"
                              style="width: 100%;" format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2" align="center">--</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="listQuery.endTime"
                              style="width: 100%;" format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="姓名搜索" class="filter-item">
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="客户名称"
                      v-model="listQuery.driverName">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车牌搜索" class="filter-item">
            <el-select class="filter-item"
                       filterable
                       clearable
                       v-model="listQuery.plateNumber"
                       @change="handleFilter">
              <el-option
                v-for="item in plateNumberOptions"
                :key="item.truckId"
                :label="item.plateNumber"
                :value="item.plateNumber"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-button class="filter-item" style="margin-left: 10px;"
                   type="primary" icon="edit" size="mini" @click="handleRate">借款利率设置
        </el-button>
        <el-button v-if="repayment_upd" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleUpdate">查看
        </el-button>
        <el-button v-if="repayment_del" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleDelete">删除
        </el-button>
        <el-button class="filter-item" type="primary" size="mini" v-waves icon="search" @click="handleFilter">搜索
        </el-button>
      </div>
    </div>
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
      <el-table-column align="center" label="借款人">
        <template slot-scope="scope">
          <span v-if="scope.row.isDriver === 0">{{ scope.row.driverName }}</span>
          <span v-if="scope.row.isDriver === 1">{{ scope.row.truckOwnName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="借款时间">
        <template slot-scope="scope">
          <span>{{ scope.row.applyDate | moment('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="借款金额">
        <template slot-scope="scope">
          <span>{{ scope.row.applySum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="借款理由">
        <template slot-scope="scope">
          <span>{{ scope.row.applyReason }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="借款账号">
        <template slot-scope="scope">
          <span>{{ scope.row.loanCardNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="借款状态">
        <template slot-scope="scope">
          <!--<span>{{ scope.row.status }}</span>-->
          <span v-if="scope.row.status === '0'">待审核</span>
          <span v-if="scope.row.status === '1'">拒绝</span>
          <span v-if="scope.row.status === '2'">通过</span>
          <span v-if="scope.row.status === '3'">还款完成</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="还款方式">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentWay }}期</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="还款日期">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentDate | moment('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="本月还款金额">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentMoney }}</span>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">

        <el-form-item label="借款总额">
          <el-input v-model="form.applySum" :disabled="true" placeholder="借款总额"></el-input>
        </el-form-item>
        <el-form-item label="还款方式">
          <el-select
            class="filter-item"
            v-model="form_repaymentWay"
            filterable
            placeholder="还款方式"
            :disabled="true"
            @change="handleRepaymentWay(form_repaymentWay)"
          >
            <el-option
              v-for="item in repaymentRateSelect"
              :key="item.rateId"
              :label="item.label"
              :value="item.rate"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款利率">
          <!-- <el-input v-model="form.repaymentRate" placeholder="借款利率" :disabled="true"></el-input> -->
          <el-input v-model="form.repaymentRate" placeholder="0.00" type="number" :disabled="true">
            <template slot="append">%</template>
          </el-input>

        </el-form-item>
        <el-form-item label="还款总额">
          <el-input v-model="totalMoney" placeholder="还款总额" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="还款期数">
          <el-input v-model="form.returnPeriod" placeholder="还款期数" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="每期还款金额">
          <el-input v-model="form.repaymentMoney" placeholder="每期还款金额" :disabled="true"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">关 闭</el-button>
        <!--<el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>-->
        <!--<el-button v-else type="primary" @click="update('form')">修 改</el-button>-->
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible1">
      <el-dialog
        width="30%"
        title="修改利率"
        :visible.sync="innerVisible"
        append-to-body>
        <el-row style="margin-top:15px;">
          <el-col :span="8">
            {{item_label}}
          </el-col>
          <el-col :span="16">
            <!-- <el-input type="number" placeholder="" v-model="item_value"></el-input> -->
            <el-input v-model="item_value" placeholder="0.00" type="number">
              <template slot="append">%</template>
            </el-input>

          </el-col>
          <el-col :span="1">
          </el-col>
        </el-row>
        <el-row style="margin-top:15px;">
          <el-col :span="24" style="text-align:center">
            <el-button type="button" @click="cancel">取消</el-button>
            <el-button type="primary" @click="handleEditRate">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>

      <el-form label-width="100px">
        <div v-for="item in repaymentRateSelect"
             :key="item.rateId">
          <el-row style="margin-top:15px;">
            <el-col :span="4">
              {{item.label}}
            </el-col>
            <el-col :span="14">
              <el-input placeholder="" v-model="item.rate" :disabled="true">
                <template slot="append">%</template>
              </el-input>

            </el-col>
            <el-col :span="1">
            </el-col>
            <el-col :span="5" style="text-align:center">
              <el-button type="primary" @click="hanldeRatePre(item)">修 改</el-button>
            </el-col>
          </el-row>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">关闭</el-button>

      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>是否确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBeforeDelete">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    addObj,
    delObj,
    EditRepaymentRate,
    fetchDeptSelect,
    fetchList,
    getObj,
    putObj,
    repaymentRateSelect,
    selectDriverPlateNumberSelect
  } from '@/api/repaymentManagement'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_loan',
    directives: {
      waves
    },
    data() {
      return {
        centerDialogVisible: false,
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          plateNumber: null,
          beginTime: null,
          endTime: null,
          driverName: null
        },
        rules: {},
        form: {
          loanId: null,
          applySum: null,
          repaymentWay: null,
          repaymentRate: null,
          returnPeriod: null,
          repaymentMoney: null
        },
        dialogFormVisible: false,
        dialogFormVisible1: false,
        innerVisible: false,
        item_label: null,
        item_id: null,
        item_value: null,
        dialogStatus: '',
        loan_add: false,
        loan_upd: false,
        loan_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        multipleSelection: [],
        plateNumberOptions: [],
        repaymentRateSelect: [],
        DriverPlateNumberSelect: [],
        DriverPlateNumberid: null,
        form_repaymentWay: null,
        form_applyMan: null,
        totalMoney: null
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
      this.getList()
      this.handleDept()
      this.repayment_upd = this.permissions['repayment_upd']
      this.repayment_del = this.permissions['repayment_del']
      // 编辑弹框
      repaymentRateSelect().then(res => {
        this.repaymentRateSelect = res.data
      })
      selectDriverPlateNumberSelect().then(res => {
        this.DriverPlateNumberSelect = res.data
      })
    },
    methods: {
      handleEditRate() {
        var obj = {
          rateId: this.item_id,
          rate: this.item_value
        }
        EditRepaymentRate(obj).then((res) => {
          if (res.data) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.innerVisible = false
            repaymentRateSelect().then(res => {
              this.repaymentRateSelect = res.data
            })
            selectDriverPlateNumberSelect().then(res => {
              this.DriverPlateNumberSelect = res.data
            })
          }
        })
      },
      hanldeRatePre(obj) {
        this.innerVisible = true
        this.item_label = obj.label
        this.item_id = obj.rateId
        this.item_value = obj.rate
      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
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
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleUpdate() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要修改的数据',
            type: 'warn',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          const row = this.multipleSelection[0]
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.form.loanId = row.loanId
          getObj(row.loanId).then(res => {
            this.form.applySum = res.data.applySum
            this.form.repaymentRate = res.data.repaymentRate
            this.form.returnPeriod = res.data.returnPeriod
            this.form.repaymentMoney = res.data.repaymentMoney
            this.handleRepaymentSum(res.data.repaymentMoney, res.data.returnPeriodSum)
            this.form_repaymentWay = this.multipleSelection[0].repaymentWay+'期'
          })
        } else {
          this.$notify({
            title: '警告',
            message: '只能选择一行数据进行修改',
            type: 'error',
            duration: 2000
          })
        }
      },
      // 设置还款利率
      handleRate() {
        this.dialogFormVisible1 = true
      },
      handleBeforeDelete() {
        this.centerDialogVisible = false
       // this.handleDelete()
      },
      handleDelete() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除的数据',
            type: 'warn',
            duration: 2000
          })
        } else {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].loanId + ','
          }
          str = str.substring(0, str.length - 1)
          delObj(str).then(response => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      },
      resetTemp() {
        this.form_applyMan = null
        this.form_repaymentWay = null
        this.form = {
          loanId: null,
          applyMan: null,
          applySum: null,
          applyReason: null,
          loanCardNumber: null,
          status: 0,
          repaymentWay: null,
          repaymentRate: null,
          applyDate: null,
          plateNumber: null
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleDept() {
        fetchDeptSelect().then(response => {
          this.plateNumberOptions = response.data
        })
      },
      handleDeptValue(plateNumber) {
        this.form.truckId = plateNumber
      },
      handleRepaymentWay(obj) {
        var id = obj
        var id = obj
        this.form.repaymentWay = obj
        var arr = this.repaymentRateSelect
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == id) {
            this.form.repaymentRate = arr[i].value
          }
        }
      },
      handleRepaymentSum(obj, obj1) {
        if (obj != null && obj != '' && obj1 != null && obj1 != '') {
          this.totalMoney = obj * obj1
        }
      },
      //  handleDriverPlateNumber(obj){
      //     var id=obj
      //    this.form.applyMan=this.DriverPlateNumberid
      //  },
      create(formName) {
        const set = this.$refs
        this.form.applyMan = this.form_applyMan
        this.form.repaymentWay = this.form_repaymentWay
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form)
              .then((res) => {
                if (res.data.data) {
                  this.dialogFormVisible = false
                  this.getList()
                  this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                  })
                }

              })
          } else {
            this.$message.error('必填项不能为空')
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible1 = false
        this.dialogFormVisible = false
        this.innerVisible = false
        const set = this.$refs
        this.item_label = null
        this.item_id = null
        this.item_value = null
        set[formName].resetFields()
      },
      update(formName) {
        this.form.applyMan = this.form_applyMan
        this.form.repaymentWay = this.form_repaymentWay
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
            putObj(this.form).then((res) => {
              if (res.data.data) {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
              }

            })
          } else {
            this.$message.error('必填项不能为空')
            return false
          }
        })
      }

    }
  }
</script>
