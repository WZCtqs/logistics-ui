<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" label-width="100px" class="filter-item">
        <el-col :span="11">
          <el-form-item label="借款日期" class="filter-item">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="listQuery.beginTime"
                              style="width: 100%;" @keyup.enter.native="handleFilter" format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="2" align="center">--</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="listQuery.endTime"
                              style="width: 100%;" @keyup.enter.native="handleFilter" format="yyyy 年 MM 月 dd 日"
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
        <el-button v-if="loan_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate"
                   type="primary" icon="edit" size="mini">新增
        </el-button>
        <el-button v-if="loan_upd" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleUpdate">编辑
        </el-button>
        <el-button v-if="loan_del" class="filter-item" style="margin-left: 10px;"
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
      <el-table-column align="center" label="借款申请id" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.loanId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车辆id" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.truckId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="借款人">
        <template slot-scope="scope">
          <span v-if="scope.row.isDriver === 0">{{ scope.row.driverName }}</span>
          <span v-if="scope.row.isDriver === 1">{{ scope.row.truckOwnName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车牌号">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.truTruck === null"></span>
          <span v-else>{{ scope.row.truTruck.plateNumber }}</span> -->
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请日期">
        <template slot-scope="scope">
          <span>{{ scope.row.applyDate | moment('YYYY-MM-DD') }}</span>
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
      <el-table-column align="center" label="还款利率">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentRate }}</span>
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
      <el-form :model="form" ref="form" label-width="100px" :rules="formRules">
        <el-form-item label="借款类型"
        prop="isDriver">
        <el-radio-group v-model="form.isDriver">
          <el-radio :label="0">司机</el-radio>
          <el-radio :label="1">车主</el-radio>
        </el-radio-group>
        </el-form-item>
        <el-form-item label="借款申请人" prop="applyMan"  v-if="form.isDriver=== 0" >
          <el-select
            class="filter-item"
            v-model="form.applyMan"
            filterable
            placeholder="借款申请人"
            @change="handleApplyMan(form.applyMan)"
          >
            <el-option
              v-for="item in DriverPlateNumberSelect"
              :key="item.driverId"
              :label="item.driverName"
              :value="item.driverId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号" v-if="form.isDriver=== 0">
          <el-input v-model="form.plateNumber" placeholder="车牌号" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="借款申请人" prop="applyMan"  v-if="form.isDriver=== 1" >
          <el-select
            class="filter-item"
            v-model="form.applyMan"
            filterable
            placeholder="借款申请人"
          >
            <el-option
              v-for="item in truckOwnArr"
              :key="item.id"
              :label="item.truckownName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款金额" prop="applySum">
          <el-input type="number" v-model="form.applySum" placeholder="借款金额"></el-input>
        </el-form-item>
        <el-form-item label="借款理由" prop="applyReason">
          <el-input v-model="form.applyReason" placeholder="借款理由"></el-input>
        </el-form-item>
        <el-form-item label="借款账号" prop="loanCardNumber">
          <el-input v-model="form.loanCardNumber" placeholder="借款账号"></el-input>
        </el-form-item>
        <el-form-item label="借款时间">
          <el-date-picker
            type="date"
            placeholder="借款时间"
            v-model="form.applyDate"
            :disabled="true"
            :default-value="form.applyDate"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="借款状态" prop="username">
          <el-input v-model="form.status" placeholder="借款状态"></el-input>
        </el-form-item> -->
        <el-form-item label="还款方式" prop="repaymentWay">
          <el-select
            class="filter-item"
            v-model="form.repaymentWay"
            filterable
            placeholder="还款方式"
            @change="handleRepaymentWay(form.repaymentWay)"
          >
            <el-option
              v-for="item in repaymentRateSelect"
              :key="item.rateId"
              :label="item.label"
              :value="item.rateId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
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
    fetchDeptSelect,
    fetchList,
    getObj,
    putObj,
    repaymentRateSelect,
    selectDriverPlateNumberSelect
  } from '@/api/loanManage'
  import {
    allTruTruckOwn
  } from '@/api/tru_truck'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'
  // import { defaultCipherList } from 'constants'

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
        formRules: {
          applySum: [
            { required: true, message: '请输入借款金额', trigger: 'blur' }
          ],
          applyReason: [
            { required: true, message: '请输入借款理由', trigger: 'blur' }
          ],
          loanCardNumber: [
            { required: true, message: '请输入借款账号', trigger: 'blur' }
          ],
          applyMan: [
            { required: true, message: '请选择借款申请人', trigger: 'change' }
          ],
          repaymentWay: [
            { required: true, message: '请选择还款方式', trigger: 'change' }
          ]
        },
        msg: [],
        form: {
          plateNumber: '',
          repaymentRate: null,
          repaymentWay: undefined,
          applyMan: undefined,
          applyDate: ''
        },

        dialogFormVisible: false,
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
        truckOwnArr: []
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
      this.loan_add = this.permissions['loan_add']
      this.loan_upd = this.permissions['loan_upd']
      this.loan_del = this.permissions['loan_del']
      //新增、编辑弹框
      repaymentRateSelect().then(res => {
        this.repaymentRateSelect = res.data
      })
      selectDriverPlateNumberSelect().then(res => {
        this.DriverPlateNumberSelect = res.data
      })
      this.getAllOwn()
    },
    watch: {
      dialogFormVisible(newObj, oldObj) {
        if (this.dialogFormVisible == true) {
          this.getApplayDate()
        }
      }
    },
    methods: {
      getApplayDate() {
        let date = new Date()
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        let time = y + '-' + m + '-' + d
        this.form.applyDate = time
      },
      getAllOwn() {
        allTruTruckOwn().then(res => {
          this.truckOwnArr = res.data
          console.log(this.truckOwnArr)
        })
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
            type: 'warning',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          const row = this.multipleSelection[0]
          if (row.status === '0') {
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.form.loanId = row.loanId
            getObj(row.loanId).then(res => {
              // this.form.applyMan = res.data.applyMan
              this.form.isDriver = res.data.isDriver
              this.form.applySum = res.data.applySum
              this.form.applyReason = res.data.applyReason
              this.form.loanCardNumber = res.data.loanCardNumber
              this.form.repaymentRate = res.data.repaymentRate
              // this.form.applyDate = res.data.applyDate
              this.form.plateNumber = res.data.plateNumber
              this.handleApplyMan(res.data.applyMan)
              this.form.applyMan = res.data.applyMan
              this.form.repaymentWay = res.data.repaymentWay
            })
          } else if (row.status === '1') {
            this.$notify({
              title: '警告',
              message: '此订单已经拒绝,无法修改',
              type: 'warning',
              duration: 2000
            })
          } else if (row.status === '2') {
            this.$notify({
              title: '警告',
              message: '此订单已经通过,无法修改',
              type: 'warning',
              duration: 2000
            })
          } else if (row.status === '3') {
            this.$notify({
              title: '警告',
              message: '此订单已经还款完成,无法修改',
              type: 'warning',
              duration: 2000
            })
          }

        } else {
          this.$notify({
            title: '警告',
            message: '只能选择一行数据进行修改',
            type: 'error',
            duration: 2000
          })
        }
      },
      handleBeforeDelete() {
        this.centerDialogVisible = false
        //  this.handleDelete()
      },
      handleDelete() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除的数据',
            type: 'warning',
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
        this.form = {
          loanId: null,
          isDriver: null,
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
        var arr = this.repaymentRateSelect
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].rateId === id) {
            this.form.repaymentRate = arr[i].rate
          }
        }
      },
      handleApplyMan(obj) {
        var arr = this.DriverPlateNumberSelect
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].driverId === obj) {
            if (arr[i].driverId === obj) {
              this.form.plateNumber = arr[i].plateNumber
            }
          }
        }
      },
      create(formName) {
        const set = this.$refs
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
            // this.$message.error('必填项不能为空')
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
            putObj(this.form).then((res) => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
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
