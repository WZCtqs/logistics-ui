<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form ref="form"
               :model="form"
               label-width="100px"
               class="filter-item">
        <el-col :span="11">
          <el-form-item label="借款日期"
                        class="filter-item">
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.beginTime"
                              style="width: 100%;"
                              @keyup.enter.native="handleFilter"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-col>
            <el-col class="line"
                    :span="2"
                    align="center">--</el-col>
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.endTime"
                              style="width: 100%;"
                              @keyup.enter.native="handleFilter"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="姓名搜索"
                        class="filter-item">
            <el-input @keyup.enter.native="handleFilter"
                      style="width: 200px;"
                      class="filter-item"
                      placeholder="客户名称"
                      v-model="listQuery.driverName"
                      clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车牌搜索"
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       clearable
                       v-model="listQuery.plateNumber"
                       @change="handleFilter">
              <el-option v-for="item in plateNumberReq"
                         :key="item.truckId"
                         :label="item.plateNumber"
                         :value="item.plateNumber">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <!-- <el-button v-if="loan_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate"
                   type="primary" icon="edit" size="mini">新增
        </el-button>
        <el-button v-if="loan_upd" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleUpdate">编辑
        </el-button> -->
        <el-button v-if="loan_del"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleDelete">删除
        </el-button>
        <el-button class="filter-item"
                   type="primary"
                   size="mini"
                   v-waves
                   icon="search"
                   @click="handleFilter">搜索
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
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column align="center"
                       label="借款申请id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.loanId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车辆id"
                       v-if="false">
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
      <el-table-column align="center"
                       label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="申请日期">
        <template slot-scope="scope">
          <span>{{ scope.row.applyDate | moment('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="借款金额">
        <template slot-scope="scope">
          <span>{{ scope.row.applySum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="借款理由">
        <template slot-scope="scope">
          <span>{{ scope.row.applyReason }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="借款账号">
        <template slot-scope="scope">
          <span>{{ scope.row.loanCardNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="还款方式">
        <template slot-scope="scope">
          <span>{{ scope.row.repaymentWay }}期</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="借款状态">
        <template slot-scope="scope">
          <!--<span>{{ scope.row.status }}</span>-->
          <span v-if="scope.row.status === '0'">待审核</span>
          <span v-if="scope.row.status === '1'">拒绝</span>
          <span v-if="scope.row.status === '2'">通过</span>
          <span v-if="scope.row.status === '3'">还款完成</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="借款审核">
        <template slot-scope="scope">
          <el-button v-show="scope.row.status=='3'"
                     size="mini"
                     class="c1"
                     type="info">已审核
          </el-button>
          <el-button v-show="scope.row.status=='2'"
                     size="mini"
                     class="c2"
                     type="success">已通过
          </el-button>
          <el-button v-show="scope.row.status=='1'"
                     size="mini"
                     class="c3"
                     type="warning">已拒绝
          </el-button>
          <el-button size="mini"
                     type="primary"
                     v-show="scope.row.status=='0'"
                     class="c4"
                     @click="handleDetail(scope.row)">审核
          </el-button>
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
    <!-- <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="借款申请id" prop="username" v-if="false">
          <el-input v-model="form.loanId" placeholder="借款申请id"></el-input>
        </el-form-item>
        <el-form-item label="车辆id" prop="username" v-if="false">
          <el-input v-model="form.truckId" placeholder="车主"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" prop="username">
          <el-select v-model="form.truckId" filterable placeholder="车牌号">
            <el-option
              v-for="item in plateNumberReq"
              :key="item.id"
              :label="item.plateNumber"
              :value="item.truckId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款人" prop="username">
          <el-input v-model="form.applyMan" placeholder="借款人"></el-input>
        </el-form-item>
        <el-form-item label="申请日期" prop="username">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.applyDate"  format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="借款金额" prop="username">
          <el-input v-model="form.applySum" placeholder="借款金额"></el-input>
        </el-form-item>
        <el-form-item label="借款理由" prop="username">
          <el-input v-model="form.applyReason" placeholder="借款理由"></el-input>
        </el-form-item>
        <el-form-item label="借款账号" prop="username">
          <el-input v-model="form.loanCardNumber" placeholder="借款账号"></el-input>
        </el-form-item>
        <el-form-item v-if = 'false' label="借款状态" prop="username">
          <el-input v-model="form.status" placeholder="借款状态"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="username">
          <el-input v-model="form.remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog> -->

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible1">
      <h4 class="cargoFormTitle">借款审核</h4>

      <div class="div1">
        <el-row>
          <el-col :span="8">
            车牌号：{{plateNumber}}
          </el-col>
          <el-col :span="8">
            借款人：{{applyMan}}
          </el-col>
          <el-col :span="8">
            申请日期：{{applyDate}}
          </el-col>
          <el-col :span="8">
            借款金额：{{applySum}}
          </el-col>
          <el-col :span="8">
            借款账号：{{loanCardNumber}}
          </el-col>
          <el-col :span="24">
            借款理由：{{applyReason}}
          </el-col>
        </el-row>
      </div>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="handleTx">通过</el-button>
        <el-button @click="handleJy">拒绝</el-button>
        <el-button @click="cancel1()">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { addObj, delObj, exObj, fetchList, getplateNumberObj, putObj } from '@/api/loan'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'

export default {
  name: 'table_loan',
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      plateNumber: null,
      applyMan: null,
      applyDate: null,
      applySum: null,
      applyReason: null,
      loanCardNumber: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      rules: {},
      form: {
        loanId: '',
        status: '0'
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogStatus: '',
      loan_add: false,
      loan_upd: false,
      loan_del: false,
      loan_exp: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      plateNumberReq: [],
      multipleSelection: [],
      plateNumberOptions: []
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
    // this.loan_add = this.permissions['loan_add']
    // this.loan_upd = this.permissions['loan_upd']
    this.loan_del = this.permissions['loan_del']
    this.getplateNumberObjList()
  },
  methods: {
    getList() {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getplateNumberObjList() {
      getplateNumberObj().then(response => {
        this.plateNumberReq = response.data
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
    // handleUpdate() {
    //   if (this.multipleSelection.length === 0) {
    //     this.$notify({
    //       title: '提示',
    //       message: '请选择要修改的数据',
    //       type: 'warn',
    //       duration: 2000
    //     })
    //   } else if (this.multipleSelection.length === 1) {
    //     const row = this.multipleSelection[0]
    //     this.dialogStatus = 'update'
    //     this.dialogFormVisible = true
    //     this.form.loanId = row.loanId
    //     this.form.truckId = row.truckId
    //     this.form.applyMan = row.applyMan
    //     this.form.applyDate = row.applyDate
    //     this.form.plateNumber = row.plateNumber
    //     this.form.applySum = row.applySum
    //     this.form.applyReason = row.applyReason
    //     this.form.loanCardNumber = row.loanCardNumber
    //     this.form.status = row.status
    //     this.form.remark = row.remark
    //   } else {
    //     this.$notify({
    //       title: '警告',
    //       message: '只能选择一行数据进行修改',
    //       type: 'error',
    //       duration: 2000
    //     })
    //   }
    // },
    handleDelete() {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要删除的数据',
          type: 'warn',
          duration: 2000
        })
      } else {
        var arr = this.multipleSelection.filter(item => {
          return item.status !== '2'
        })
        if (arr.length > 0) {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].loanId + ','
          }
          str = str.substring(0, str.length - 1)
          this.$confirm('是否要删除选中的借款信息', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
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
          })
        } else {
          this.$notify.error('该条申请已审核通过禁止删除')
        }
      }
    },
    handleDetail(obj) {
      this.id = obj.loanId
      this.dialogFormVisible1 = true
      this.plateNumber = obj.plateNumber
      this.applyMan = obj.applyMan
      this.applyDate = (obj.applyDate).substring(0, 10)
      this.applySum = obj.applySum
      this.applyReason = obj.applyReason
      this.loanCardNumber = obj.loanCardNumber
      this.status = obj.status
    },
    handleTx() {
      const obj = {
        loanId: this.id,
        status: 2
      }
      exObj(obj).then(response => {
        if (response.data.data) {
          this.dialogFormVisible1 = false
          this.getList()
          this.$notify({
            title: '成功',
            message: '审核成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleJy() {
      const obj = {
        loanId: this.id,
        status: 1
      }
      exObj(obj).then(response => {
        if (response.data.data) {
          this.dialogFormVisible1 = false
          this.getList()
          this.$notify({
            title: '不通过',
            message: '审核成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    cancel1() {
      this.dialogFormVisible1 = false
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form)
            .then((res) => {
              alert(JSON.stringify(res.data))
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
          putObj(this.form).then(() => {
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
    },
    resetTemp() {
      this.form = {
        loanId: undefined,
        truckId: '',
        status: '0',
        applyMan: '',
        applyDate: '',
        applySum: '',
        applyReason: '',
        loanCardNumber: '',
      }
    }
  }
}
</script>
<style>
.cargoFormTitle {
  font-size: 14px;
  background-color: #2d8c94;
  color: #fff;
  padding-left: 24px;
  margin: 12px auto;
  border-radius: 6px;
}
</style>
