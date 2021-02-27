<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div>
        <el-button v-if="invoice_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate"
                   type="primary" icon="edit" size="mini">新增
        </el-button>
        <el-button v-if="invoice_upd" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleUpdate">编辑
        </el-button>
        <el-button v-if="invoice_del" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleDelete">删除
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
      <el-table-column align="center" label="" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发票抬头">
        <template slot-scope="scope">
          <span>{{ scope.row.invoiceTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开票金额">
        <template slot-scope="scope">
          <span>{{ scope.row.invoiceValue }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开具类型">
        <template slot-scope="scope">
          <span v-if="scope.row.invoiceType === '0'">专票</span>
          <span v-if="scope.row.invoiceType === '1'">普票</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="税务账号">
        <template slot-scope="scope">
          <span>{{ scope.row.syAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开户银行">
        <template slot-scope="scope">
          <span>{{ scope.row.bankName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开户银行账号">
        <template slot-scope="scope">
          <span>{{ scope.row.bankAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册地点">
        <template slot-scope="scope">
          <span>{{ scope.row.registPlace }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册电话">
        <template slot-scope="scope">
          <span>{{ scope.row.registPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮寄地址">
        <template slot-scope="scope">
          <span>{{ scope.row.postPlace }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="快递单号">
        <template slot-scope="scope">
          <span>{{ scope.row.postNumber }}</span>
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
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="" prop="username" v-if="false">
          <el-input v-model="form.id" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="发票抬头" prop="invoiceTitle">
          <el-input v-model="form.invoiceTitle" placeholder="发票抬头"></el-input>
        </el-form-item>
        <el-form-item label="开票金额" prop="invoiceValue">
          <el-input v-model.number="form.invoiceValue" placeholder="开票金额" type="number"></el-input>
        </el-form-item>
        <el-form-item label="开具类型" prop="invoiceType">
          <el-select v-model="form.invoiceType" placeholder="请选择">
            <el-option
              key="0"
              label="专票"
              value="0">
            </el-option>
            <el-option
              key="1"
              label="普票"
              value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="税务账号" prop="syAccount">
          <el-input v-model="form.syAccount" placeholder="税务账号"></el-input>
        </el-form-item>
        <el-form-item label="开户银行" prop="bankName">
          <el-input v-model="form.bankName" placeholder="开户银行"></el-input>
        </el-form-item>
        <el-form-item label="开户银行账号" prop="bankAccount">
          <el-input v-model="form.bankAccount" placeholder="开户银行账号" type="number"></el-input>
        </el-form-item>
        <el-form-item label="注册地点" prop="registPlace">
          <el-input v-model="form.registPlace" placeholder="注册地点"></el-input>
        </el-form-item>
        <el-form-item label="注册电话" prop="registPhone">
          <el-input v-model="form.registPhone" placeholder="注册电话"></el-input>
        </el-form-item>
        <el-form-item label="邮寄地址" prop="postPlace">
          <el-input v-model="form.postPlace" placeholder="邮寄地址"></el-input>
        </el-form-item>
        <el-form-item label="快递单号" prop="postNumber">
          <el-input v-model="form.postNumber" placeholder="快递单号" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { addObj, delObj, fetchList, putObj } from '@/api/invoice'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_invoice',
    directives: {
      waves
    },
    data() {
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'))
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      }
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },

        rules: {
          invoiceTitle: [
            { required: true, message: '请填写发票抬头', trigger: 'blur' }
          ],
          invoiceValue: [
            { required: true, message: '请填写开票金额', trigger: 'blur' },
            { type: 'number', message: '开票金额必须为数字值' }
          ],
          invoiceType: [
            { required: true, message: '请选择开具类型', trigger: 'change' }
          ],
          syAccount: [
            { required: true, message: '请填写税务账号', trigger: 'blur' }
          ],
          bankName: [
            { required: true, message: '请填写开户银行', trigger: 'blur' }
          ],
          registPlace: [
            { required: true, message: '请填写注册地点', trigger: 'blur' }
          ],
          registPhone: [
            { required: true, message: '请填写注册电话', trigger: 'blur' },
            { validator: checkPhone, trigger: 'blur' }
          ],
          bankAccount: [
            { required: true, message: '请填写开户行账号', trigger: 'blur' }
          ]
        },
        form: {
          id: null,
          invoiceTitle: '',
          invoiceValue: '',
          invoiceType: '',
          syAccount: '',
          bankName: '',
          bankAccount: '',
          registPlace: '',
          registPhone: '',
          postPlace: '',
          postNumber: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        invoice_add: false,
        invoice_upd: false,
        invoice_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
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
      this.invoice_add = this.permissions['invoice_add']
      this.invoice_upd = this.permissions['invoice_upd']
      this.invoice_del = this.permissions['invoice_del']
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
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
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
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
            str += this.multipleSelection[i].id + ','
          }
          str = str.substring(0, str.length - 1)
          this.$confirm('是否要删除选中的发票维护信息', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delObj(str).then(response => {
              this.dialogFormVisible = false
              this.getList()
              if (response.data.data) {
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
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.resetTemp()
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
          this.form.invoiceTitle = row.invoiceTitle
          this.form.invoiceValue = row.invoiceValue
          this.form.invoiceType = row.invoiceType
          this.form.syAccount = row.syAccount
          this.form.bankName = row.bankName
          this.form.bankAccount = row.bankAccount
          this.form.registPlace = row.registPlace
          this.form.registPhone = row.registPhone
          this.form.postPlace = row.postPlace
          this.form.postNumber = row.postNumber
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
                } else {
                  this.$message.error(res.data.msg)
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
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            return false
          }
        })
      },
      resetTemp() {
        this.form = {
          id: null,
          invoiceTitle: '',
          invoiceValue: '',
          invoiceType: '',
          syAccount: '',
          bankName: '',
          bankAccount: '',
          registPlace: '',
          registPhone: '',
          postPlace: '',
          postNumber: ''
        }
      }
    }
  }
</script>
