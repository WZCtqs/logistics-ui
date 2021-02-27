<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form ref="form"
               :model="form"
               label-width="100px"
               class="filter-item">
        <el-row>
          <el-col :span="12">
            <el-select class="filter-item"
                       v-model="selectType"
                       placeholder="请选择"
                       @change="handleFilterSelect">
              <el-option :data="item.value"
                         v-for="item in typeReq"
                         :key="item.id"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12"
                  v-if="selectType === 'customerName'">
            <el-select class="filter-item"
                       filterable
                       clearable
                       v-model="listQuery.customerName"
                       placeholder="客户名称"
                       @change="handleFilter">
              <el-option v-for="item in getCustomerReq"
                         :key="item.customerId"
                         :label="item.customerName"
                         :value="item.customerName">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12"
                  v-else-if="selectType === 'contact'">
            <el-select class="filter-item"
                       filterable
                       clearable
                       v-model="listQuery.contact"
                       placeholder="联系人名称"
                       @change="handleFilter">
              <el-option v-for="item in getCustomerReq"
                         :key="item.customerId"
                         :label="item.contact"
                         :value="item.contact">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleExport">导出
        </el-button>
        <!--<el-button v-if="tru_customer_upd"-->
                   <!--class="filter-item"-->
                   <!--style="margin-left: 10px;"-->
                   <!--type="primary"-->
                   <!--size="mini"-->
                   <!--@click="handleUpdate">编辑-->
        <!--</el-button>-->
        <el-button v-if="tru_customer_del"
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
        <el-button v-if="tru_customer_del"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleBlackList">移出黑名单
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
                       label="客户id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.customerId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="客户名称">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="联系人">
        <template slot-scope="scope">
          <span>{{ scope.row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="联系人邮箱">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.email }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="客户地址">
        <template slot-scope="scope">
          <span>{{ scope.row.customerAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="客户类型">
        <template slot-scope="scope">
          <span v-if="scope.row.customerType === '0'">集装箱客户</span>
          <span v-if="scope.row.customerType === '1'">普货客户</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="付款方式">
        <template slot-scope="scope">
          <span v-if="scope.row.payWay === '1'">月结</span>
          <span v-if="scope.row.payWay === '0'">单结</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | moment('YYYY-MM-DD') }}</span>
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
        <el-form-item label="客户id"
                      prop="username"
                      v-if="false">
          <el-input v-model="form.customerId"
                    placeholder="客户id"></el-input>
        </el-form-item>
        <el-form-item label="客户名字"
                      prop="customerName">
          <el-input v-model="form.customerName"
                    placeholder="客户名称"></el-input>
        </el-form-item>
        <!--<el-form-item label="业务员" prop="username">-->
        <!--<el-input v-model="form.saleman" placeholder="业务员"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="联系人"
                      prop="contact">
          <el-input v-model="form.contact"
                    placeholder="联系人"></el-input>
        </el-form-item>
        <!--<el-form-item label="职位" prop="username">-->
        <!--<el-input v-model="form.contactJob" placeholder="职位"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="联系电话"
                      prop="phone">
          <el-input v-model="form.phone"
                    placeholder="联系电话"></el-input>
        </el-form-item>
        <!--<el-form-item label="联系人邮箱" prop="username">-->
        <!--<el-input v-model="form.email" placeholder="联系人邮箱"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="客户地址"
                      prop="customerAddress">
          <el-input v-model="form.customerAddress"
                    placeholder="客户地址"></el-input>
        </el-form-item>
        <el-form-item label="客户类型"
                      prop="customerType">
          <!--<el-input v-model="form.customerType" placeholder="联系人邮箱"></el-input>-->
          <el-select class="filter-item"
                     v-model="form.customerType"
                     placeholder="请选择"
                     filterable>
            <el-option v-for="item in customertypeReq"
                       :key="item.id"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款方式"
                      prop="payWay">
          <!--<el-input v-model="form.payWay" placeholder="联系人邮箱"></el-input>-->
          <el-select class="filter-item"
                     v-model="form.payWay"
                     placeholder="请选择">
            <el-option v-for="item in paywayReq"
                       :key="item.id"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
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
                   @click="create('form')">确 定</el-button>
        <el-button v-else
                   type="primary"
                   @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addObj,
    customerTypeObj,
    delObj,
    expObj,
    fetchList,
    getselectTrustCustomerBlackObj,
    payWayObj,
    putObj,
    setTrustByIds
  } from '@/api/tru_customer'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
  name: 'table_tru_customer',
  directives: {
    waves
  },
  data() {
    // let lilv = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('利率不能为空'))
    //   } else {
    //     const reg = /^\d+(\.\d+)?$/
    //     if (reg.test(value)) {
    //       if (value < 100) {
    //         callback()
    //       } else {
    //         return callback(new Error('利率不能大于100'))
    //       }
    //     } else {
    //       return callback(new Error('请输入正确的利率'))
    //     }
    //   }
    // }
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    return {
      list: null,
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        isTrust: '1'
      },
      rules: {
        customerName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        // moneyRate: [
        //   { required: true, message: '请填写开票利率', trigger: 'blur' },
        //   { validator: lilv, trigger: 'blur' }
        // ],
        // customerType: [
        //   { required: true, message: '请选择客户类型', trigger: 'change' }
        // ],
        payWay: [
          { required: true, message: '请选择付款方式', trigger: 'change' }
        ]
      },
      form: {
        payWay: '',
        customerType: '',
        customerId: undefined,
        customerName: '',
        contact: '',
        phone: '',
        email: '',
        customerAddress: '',
        remark: '',
        createTime: '',
        isTrust: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      tru_customer_exp: false,
      tru_customer_add: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      typeReq: [{
        id: 0,
        value: 'customerName',
        label: '客户名称'
      }, {
        id: 1,
        value: 'contact',
        label: '联系人名称'
      }],
      selectType: 'customerName',
      multipleSelection: [],
      paywayReq: [],
      customertypeReq: [],
      getCustomerReq: []
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
    this.tru_customer_exp = this.permissions['tru_customer_exp']
    this.tru_customer_add = this.permissions['tru_customer_add']
    this.tru_customer_upd = this.permissions['tru_customer_upd']
    this.tru_customer_del = this.permissions['tru_customer_del']
    this.handlePayWayObj()
    this.handleCustomerTypeObj()
    this.selectAllCustomerList()
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
    handleFilterSelect() {
      this.listQuery.page = 1
      this.listQuery.customerName = ''
      this.listQuery.contact = ''
      this.getList()
    },
    handleExport() {
      let str = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        str += this.multipleSelection[i].customerId + ','
      }
      if (this.multipleSelection.length >= 1) {
        str = str.substring(0, str.length - 1)
      } else {
        str = 'allH'
      }
      if (this.multipleSelection.length !== 0) {
        expObj(str).then(response => {
          const blob = new Blob([response.data])
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
          const fileName = nowDate + '-黑名单客户信息.xls'
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
          this.$notify({
            title: '成功',
            message: '导出成功',
            type: 'success',
            duration: 2000
          })
        })
      } else {
        this.$notify({
          title: '提示',
          message: '请选择要导出的数据',
          type: 'warning',
          duration: 2000
        })
      }
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
        this.form.customerId = row.customerId
        this.form.customerName = row.customerName
        this.form.saleman = row.saleman
        this.form.contact = row.contact
        this.form.contactJob = row.contactJob
        this.form.phone = row.phone
        this.form.payWay = row.payWay
        this.form.customerType = row.customerType
        this.form.customerAddress = row.customerAddress
        this.form.createTime = row.createTime
        this.form.remark = row.remark
        this.form.isTrust = row.isTrust
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行修改',
          type: 'error',
          duration: 2000
        })
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
        this.$confirm('是否要删除选中的黑名单客户信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].customerId + ','
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
        })
      }
    },
    handleBlackList() {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要移出的客户',
          type: 'warn',
          duration: 2000
        })
      } else {
        let str = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          str += this.multipleSelection[i].customerId + ','
        }
        str = str.substring(0, str.length - 1)
        const setObj = {
          ids: str,
          isTrust: 0
        }
        setTrustByIds(setObj).then(response => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '拉黑成功',
            type: 'success',
            duration: 2000
          })
        })
      }
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
            .then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '创建成功',
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
          this.form.isTrust = '1'
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
            } else {
              this.$message.error(res.data.msg)
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
        customerId: undefined,
        payWay: '',
        customerType: '',
        customerName: '',
        contact: '',
        phone: '',
        email: '',
        customerAddress: '',
        remark: '',
        createTime: '',
        isTrust: '1'
      }
    },
    handleCustomerTypeObj() {
      customerTypeObj().then(res => {
        this.customertypeReq = res.data
      })
    },
    handlePayWayObj() {
      payWayObj().then(res => {
        this.paywayReq = res.data
      })
    },
    selectAllCustomerList() {
      getselectTrustCustomerBlackObj().then(res => {
        this.getCustomerReq = res.data
      })
    }
  }
}
</script>
