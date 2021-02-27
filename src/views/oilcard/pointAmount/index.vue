<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px"
               class="filter-item">
        <el-col>
          <el-form-item label="申请日期"
                        class="filter-item">
            <el-col>
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
        <el-button v-if="pointAmount_exp"
                   class="filter-item"
                   style="margin-left: 10px;"
                   size="mini"
                   @click="handleExp"
                   type="primary"
                   icon="edit">导出
        </el-button>
        <el-button v-if="pointAmount_add"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   @click="handleCreate">新增
        </el-button>
        <el-button v-if="pointAmount_update"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleUpdate">编辑
        </el-button>
        <el-button v-if="pointAmount_delete"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleDelete">删除
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
              show-summary
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"></el-table-column>
      <el-table-column align="center"
                       label="月份">
        <template slot-scope="scope">
          <span>{{ scope.row.yearMonth }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="公司名称">
        <template slot-scope="scope">
          <span>{{ scope.row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="上月余额"
                       prop="lastPoint"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.lastPoint }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="本月增加"
                       prop="addPoint"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.addPoint }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="本月分配"
                       prop="distributePoint"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.distributePoint }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="本月余额"
                       prop="pointAmount"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.pointAmount }}</span>
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
               label-width="140px">
        <el-form-item label="公司名称"
                      prop="company"
                      :disable="companyDis">
          <el-input v-model="form.company"
                    placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="本月新增"
                      prop="addPoint">
          <el-input v-model="form.addPoint"
                    placeholder="本月新增"
                    type="number"></el-input>
        </el-form-item>
        <el-form-item label="本月合计分配"
                      prop="distributePoint">
          <el-input v-model="form.distributePoint"
                    placeholder="本月合计分配"
                    type="number"></el-input>
        </el-form-item>
        <el-form-item label="备注"
                      prop="remark">
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
  import { addObj, delObj, expObj, fetchList, putObj, validatorObj } from '@/api/pointAmount'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
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
          addPoint: [
            { required: true, message: '请输入本月增加', trigger: 'blur' }
          ],
          distributePoint: [
            { required: true, message: '请输入本月分配', trigger: 'blur' }
          ]
        },
        form: {
          id: null,
          company: '',
          addPoint: '',
          distributePoint: '',
          remark: '',
          yearMonth: this.updateDate
        },
        dialogStatus: '',
        recharge_exp: false,
        tableKey: 0,
        multipleSelection: [],
        pointAmount_exp: false,
        pointAmount_add: false,
        pointAmount_update: false,
        pointAmount_delete: false,
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        updateDate: '',
        companyDis: false
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
      this.pointAmount_exp = this.permissions['pointAmount_exp']
      this.pointAmount_add = this.permissions['pointAmount_add']
      this.pointAmount_update = this.permissions['pointAmount_update']
      this.pointAmount_delete = this.permissions['pointAmount_delete']
      const data = new Date()
      if (data.getMonth() < 9) {
        this.updateDate = data.getFullYear() + '-0' + (data.getMonth() + 1)
      } else {
        this.updateDate = data.getFullYear() + '-' + (data.getMonth() + 1)
      }
      this.listQuery.yearMonth = this.updateDate
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = false
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
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
      handleExp() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要导出的数据',
            type: 'warn',
            duration: 2000
          })
        } else {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].id + ','
          }
          str = str.substring(0, str.length - 1)
          // if (this.listQuery.yearMonth !== '' && this.listQuery.yearMonth !== null) {
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
            downloadElement.download = nowDate + '-油卡充值汇总.xls'
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
          // } else {
          //   this.$notify({
          //     title: '警告',
          //     message: '请选择申请日期',
          //     type: 'error',
          //     duration: 2000
          //   })
          // }
        }
      },
      handleFilter() {
        this.getList()
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.companyDis = false
        this.dialogFormVisible = true
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
          if (this.multipleSelection[0].yearMonth === this.updateDate) {
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.form.id = row.id
            this.form.company = row.company
            this.form.addPoint = row.addPoint
            this.form.distributePoint = row.distributePoint
            this.form.remark = row.remark
            this.companyDis = true
          } else {
            this.$notify({
              title: '警告',
              message: '只能修改本月数据',
              type: 'error',
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
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            const data = new Date()
            const dataFullYear = data.getFullYear()
            const dataMonth = data.getMonth() < 9 ? ('0' + (data.getMonth() + 1)) : data.getMonth() + 1
            this.updateDate = dataFullYear + '-' + dataMonth
            const validTemp = {
              yearMonth: this.updateDate,
              company: this.form.company
            }
            validatorObj(validTemp).then(response => {
              if (response.data.data) {
                addObj(this.form)
                  .then((res) => {
                    this.dialogFormVisible = false
                    this.getList()
                    if (res.data.data) {
                      this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success',
                        duration: 2000
                      })
                    }
                  })
              } else {
                this.$message.error('此公司名称已经存在')
              }
            })
          } else {
            this.$message.error('必填项不能为空')
            return false
          }
        })
      },
      cancel1() {
        this.imgTable = false
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        this.form.status = this.form_status
        set[formName].validate(valid => {
          if (valid) {
            putObj(this.form).then((res) => {
              this.dialogFormVisible = false
              this.getList()
              if (res.data.data) {
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
      },
      resetTemp() {
        this.form = {
          company: '',
          addPoint: '',
          distributePoint: '',
          remark: ''
        }
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
            this.$confirm('是否要删除选中的公司积分余额信息', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              delObj(str).then(response => {
                if (response.data.data) {
                  this.dialogFormVisible = false
                  this.getList()
                  this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                  })
                }
              })
            })
          }
        }
      }
    }
  }
</script>
