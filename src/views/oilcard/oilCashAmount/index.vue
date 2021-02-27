<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form ref="form"
               :model="form"
               label-width="100px"
               class="filter-item">
        <el-col :span="24">
          <el-form-item label="月份选择"
                        class="filter-item">
            <el-col :span="24">
              <el-date-picker type="month"
                              placeholder="选择日期"
                              v-model="listQuery.yearMonth"
                              @change="handleFilter"
                              style="width: 100%;"
                              format="yyyy 年 MM 月"
                              value-format="yyyy-MM"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-button v-if="oil_cashAmount_exp"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleExp"
                   type="primary"
                   icon="edit"
                   size="mini">导出
        </el-button>
        <el-button v-if="oil_cashAmount_add"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleCreate"
                   type="primary"
                   icon="edit"
                   size="mini">添加
        </el-button>
        <el-button v-if="oil_cashAmount_upd"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleUpdate"
                   type="primary"
                   icon="edit"
                   size="mini">编辑
        </el-button>
        <el-button v-if="oil_cashAmount_del"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleDelete"
                   type="primary"
                   icon="edit"
                   size="mini">删除
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
              show-summary
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"></el-table-column>
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column align="center"
                       label="公司名称">
        <template slot-scope="scope">
          <span>{{ scope.row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="上月余额"
                       prop="lastCash"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.lastCash }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="本月充值"
                       prop="rechargeCash"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.rechargeCash }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="本月分配"
                       prop="distributeCash"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.distributeCash }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="本月余额"
                       prop="cashAmount"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.cashAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
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
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="100px">
        <el-form-item label="公司名称"
                      prop="company">
          <el-input v-model="form.company"
                    placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="本月充值"
                      prop="rechargeCash">
          <el-input v-model="form.rechargeCash"
                    placeholder="本月充值"
                    type="number"></el-input>
        </el-form-item>
        <el-form-item label="备注"
                      prop="username">
          <el-input v-model="form.remark"
                    placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="create('form')">确 定
        </el-button>
        <el-button v-else
                   type="primary"
                   @click="update('form')">修 改
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { addObj, delObj, expObj, fetchList, getoilCashAmountObj, putObj } from '@/api/oil_cashAmount'
  import waves from '@/directive/waves/index.js' // 水波纹指令
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
          page: 1,
          limit: 20,
          yearMonth: ''
        },
        rules: {
          company: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          rechargeCash: [
            { required: true, message: '请输入充值金额', trigger: 'blur' }
          ]
        },
        form: {
          id: '',
          tenantId: '',
          company: '',
          lastCash: '',
          rechargeCash: '',
          distributeCash: '',
          cashAmount: '',
          remark: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        oil_cashAmount_exp: false,
        oil_cashAmount_add: false,
        oil_cashAmount_upd: false,
        oil_cashAmount_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        yearMonth: '',
        multipleSelection: [],
        updateDate: ''
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
        this.listQuery.yearMonth = data.getFullYear() + '-0' + (data.getMonth() + 1)
      } else {
        this.listQuery.yearMonth = data.getFullYear() + '-' + (data.getMonth() + 1)
      }
      this.getList()
      this.oil_cashAmount_exp = this.permissions['oil_cashAmount_exp']
      this.oil_cashAmount_add = this.permissions['oil_cashAmount_add']
      this.oil_cashAmount_upd = this.permissions['oil_cashAmount_upd']
      this.oil_cashAmount_del = this.permissions['oil_cashAmount_del']
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
      handleDelete(row) {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除的数据',
            type: 'warn',
            duration: 2000
          })
        } else {
          // const multiLength = this.multipleSelection.filter(item => item.cardNum > 0)
          if (this.multipleSelection[0].yearMonth !== this.listQuery.yearMonth) {
            this.$notify({
              title: '警告',
              message: '不能对非本月的数据进行删除',
              type: 'error',
              duration: 2000
            })
          } else {
            let str = ''
            for (let i = 0; i < this.multipleSelection.length; i++) {
              str += this.multipleSelection[i].id + ','
            }
            str = str.substring(0, str.length - 1)
            this.$confirm('是否要删除选中的加油现金余额信息', '提示', {
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
          }
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      resetTemp() {
        this.form = {
          truckId: '',
          roleName: undefined,
          roleCode: undefined,
          roleDesc: undefined,
          company: '',
          rechargeCash: '',
          remark: ''
        }
      },
      create(formName) {
        const set = this.$refs
        const data = new Date()
        const dataFullYear = data.getFullYear()
        const dataMonth = data.getMonth() < 9 ? ('0' + (data.getMonth() + 1)) : data.getMonth() + 1
        this.updateDate = dataFullYear + '-' + dataMonth
        const validTemp = {
          yearMonth: this.updateDate,
          company: this.form.company
        }
        set[formName].validate(valid => {
          if (valid) {
            getoilCashAmountObj(validTemp).then((response) => {
              if (response.data.data === true) {
                addObj(this.form).then((res) => {
                  if (res.data.data) {
                    this.dialogFormVisible = false
                    this.getList()
                    this.$notify({
                      title: '成功',
                      message: '创建成功',
                      type: 'success',
                      duration: 2000
                    })
                  } else {
                    return false
                  }
                })
              } else {
                this.$message.error('此主油卡号已注册，请更换')
              }
            })
          }
        })
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
          this.form.id = row.id
          this.form.tenantId = row.tenantId
          this.form.company = row.company
          this.form.cashAmount = row.cashAmount
          this.form.distributeCash = row.distributeCash
          this.form.lastCash = row.lastCash
          this.form.rechargeCash = row.rechargeCash
          this.form.remark = row.remark
          this.form.yearMonth = row.yearMonth
        } else {
          this.$notify({
            title: '警告',
            message: '只能选择一行数据进行修改',
            type: 'error',
            duration: 2000
          })
        }
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      handleExp() {
        let str = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (i === this.multipleSelection.length - 1) {
            str += this.multipleSelection[i].id
          } else {
            str += this.multipleSelection[i].id + ','
          }
        }
        if (str !== '') {
          expObj(str).then(response => {
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
            downloadElement.download = nowDate + '-加油现金余额.xls'
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
        } else {
          this.$notify({
            title: '失败',
            message: '请选择一行数据进行导出操作',
            type: 'error',
            duration: 2000
          })
        }
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
            return false
          }
        })
      }
    }
  }
</script>
