<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form ref="form"
               :model="form"
               label-width="100px"
               class="filter-item">
        <el-form-item label="合同编号"
                      class="filter-item">
          <el-input @keyup.enter.native="handleFilter"
                    style="width: 200px;"
                    class="filter-item"
                    placeholder="合同编号"
                    v-model="listQuery.contractNumber">
          </el-input>
        </el-form-item>
        <el-form-item label="合同状态"
                      class="filter-item">
          <el-select class="filter-item"
                     v-model="listQuery.status"
                     filterable
                     placeholder="请选择"
                     clearable
                     @keyup.enter.native="handleFilter"
                     @change="handleFilter">
            <el-option v-for="item in contract_Req"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="合同种类"
                      class="filter-item">
          <el-select class="filter-item"
                     v-model="listQuery.contractType"
                     filterable
                     placeholder="请选择"
                     clearable
                     @keyup.enter.native="handleFilter"
                     @change="handleFilter">
            <el-option v-for="item in contractType_Req"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <el-button v-if="contract_exp"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleExport"
                   type="primary"
                   icon="edit"
                   size="mini">导出
        </el-button>
        <el-button v-if="contract_add"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   @click="handleCreate">新增
        </el-button>
        <el-button v-if="contract_upd"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleUpdate">编辑
        </el-button>
        <el-button v-if="contract_del"
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
      <el-table-column type="expand"
                       fixed>
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="联系人:">
                  <span>{{ props.row.contact }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="联系方式:">
                  <span>{{ props.row.phone }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="业务员:">
                  <span>{{ props.row.saleman }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="提醒时间:">
                  <span>{{ props.row.remindDate | moment('YYYY-MM-DD') }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="到期时间:">
                  <span>{{ props.row.expiryDate | moment('YYYY-MM-DD') }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="客户状态:">
                  <span v-if="props.row.customerIsTrust =='1'">失信</span>
                  <span v-if="props.row.customerIsTrust =='0'">信任</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="备注:">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column align="center"
                       label="合同种类">
        <template slot-scope="scope">
          <!--<span>{{ scope.row.contractType }}</span>-->
          <span v-if="scope.row.contractType == 'HD'">货代合同</span>
          <span v-if="scope.row.contractType == 'GK'">挂靠合同</span>
          <span v-if="scope.row.contractType == 'CD'">车队合同</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="合同编号">
        <template slot-scope="scope">
          <span>{{ scope.row.contractNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="合同名称">
        <template slot-scope="scope">
          <span>{{ scope.row.contractName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="客户名称">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="联系人">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.contact }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="联系方式">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.phone }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="业务员">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.saleman }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="签订时间">
        <template slot-scope="scope">
          <span>{{ scope.row.signDate | moment('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="提醒时间">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.remindDate | moment('YYYY-MM-DD') }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="到期时间">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.expiryDate | moment('YYYY-MM-DD') }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="客户状态">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.customerIsTrust =='1'">失信</span>-->
      <!--<span v-if="scope.row.customerIsTrust =='0'">信任</span>-->

      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="合同状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status  === '0'">正常</span>
          <span v-else-if="scope.row.status  === '1'">临期</span>
          <span v-if="scope.row.status  === '2'">过期</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="合同复印件"
                       fixed
                       fixed="right"
                       width="100">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.contract_file }}</span> -->
          <!-- <span v-if="scope.row.licensePhotoArr === null">暂无</span>
          <span v-else-if="scope.row.licensePhotoArr === ''">暂无</span>
          <span v-else-if="scope.row.licensePhotoArr[0] === ''">暂无</span> -->
          <el-button size="mini"
                     type="primary"
                     @click="contractFile(scope.row.contractFile)">查看
          </el-button>
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
        <el-form-item label="合同编号"
                      prop="username">
          <el-input v-model="form.contractNumber"
                    placeholder="合同编号"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="合同名称"
                      prop="contractName">
          <el-input v-model="form.contractName"
                    placeholder="合同名称"></el-input>
        </el-form-item>
        <el-form-item label="合同类型"
                      prop="contractType">
          <el-radio-group v-model="form.contractType"
                          @change="emptycCustomerId">
            <el-radio :label="1">货代合同</el-radio>
            <el-radio :label="2">挂靠合同</el-radio>
            <el-radio :label="3">车队合同</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="客户名称"
                      prop="customerId"
                      v-model="form.contractType"
                      v-if="form.contractType === 1">
          <el-select class="filter-item"
                     filterable
                     placeholder="请选择客户名称"
                     v-model="form.customerId"
                     @change="salemanReq1(form.customerId)">
            <el-option v-for="item in selectAllCustomerReq"
                       :key="item.customerId"
                       :label="item.customerName"
                       :value="item.customerId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车队"
                      prop="customerId"
                      v-if="form.contractType === 3">
          <el-select class="filter-item"
                     filterable
                     placeholder="请选择车队"
                     v-model="form.customerId"
                     @change="salemanReq2(form.customerId)">
            <el-option v-for="item in selectAllTruckTeamReq"
                       :key="item.truckTeamId"
                       :label="item.teamName"
                       :value="item.truckTeamId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="挂靠"
                      prop="customerId"
                      v-if="form.contractType === 2">
          <el-select class="filter-item"
                     filterable
                     placeholder="请选择挂靠"
                     v-model="form.customerId"
                     @change="salemanReq3(form.customerId)">
            <el-option v-for="item in selectAllDriverReq"
                       :key="item.truckTeamId"
                       :label="item.teamName"
                       :value="item.truckTeamId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签订时间"
                      prop="signDate">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="form.signDate"
                          style="width: 100%;"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="业务员"
                      prop="username">
          <el-input v-model="form.saleman"
                    placeholder="业务员"></el-input>
        </el-form-item>
        <el-form-item label="到期时间"
                      prop="expiryDate">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="form.expiryDate"
                          style="width: 100%;"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="提醒时间"
                      prop="remindDate">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="form.remindDate"
                          style="width: 100%;"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="合同状态"
                      prop="status">
          <el-select class="filter-item"
                     filterable
                     placeholder="请选择"
                     v-model="form.status"
                     :disabled="true">
            <el-option v-for="item in contract_Req"
                       :key="item.id"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注"
                      prop="username">
          <el-input v-model="form.remark"
                    placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item label="联系人"
                      prop="contact">
          <el-input v-model="form.contact"
                    placeholder="联系人"></el-input>
        </el-form-item>
        <el-form-item label="联系方式"
                      prop="phone">
          <el-input v-model="form.phone"
                    placeholder="联系人"></el-input>
        </el-form-item>
        <h3>合同上传</h3>
        <div class="flexItem cm20">
          <div class="flexItems">
            <el-upload action="/truck/truckFile/localUpload"
                       list-type="picture-card"
                       :headers="headers"
                       :file-list="form.files"
                       :class="{disabled:uploadDisabled0}"
                       :on-preview="handlePictureCardPreview0"
                       :on-success="handleAvatarSuccess0"
                       :on-remove="handleRemove0">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible0"
                       append-to-body>
              <img width="100%"
                   :src="dialogImageUrl0"
                   alt="">
            </el-dialog>
            <div>合同证件</div>
          </div>
        </div>
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
    <el-dialog :visible.sync="imgTable">
      <span v-for="(item,index) in previewTableImg.split(',')"
            :key="index">
        <img width="100%"
             :src="item"
             alt="">
      </span>

      <div class="box">
        <el-button class="btn"
                   @click="cancel1()">关闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addObj,
  contract_status,
  contract_type,
  delObj,
  expObj,
  fetchList,
  getcustomerObj,
  getdriverObj,
  gettruckteamObj,
  isstatus_status,
  putObj,
  selectAllCustomer,
  selectAllDriver,
  selectAllTruckTeam
} from '@/api/contract'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'
import { getToken } from '@/util/auth'

export default {
  name: 'table_contract',
  directives: {
    waves
  },
  data () {
    return {
      list: null,
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      rules: {
        contractName: [
          { required: true, message: '请输入合同名称', trigger: 'blur' }
        ],
        contractType: [
          { required: true, message: '请选择合同类型', trigger: 'change' }
        ],
        customerId: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        signDate: [
          { required: true, message: '请选择签订时间', trigger: 'change' }
        ],
        expiryDate: [
          { required: true, message: '请选择到期时间', trigger: 'change' }
        ],
        remindDate: [
          { required: true, message: '请选择提醒时间', trigger: 'change' }
        ]
      },
      form: {
        contractType: 1,
        signDate: '',
        expiryDate: '',
        remindDate: '',
        customerId: '',
        files: [],
        id: '',
        contact: '',
        phone: ''
      },
      disable: false,
      dialogFormVisible: false,
      dialogStatus: '',
      dialogImageUrl0: '',
      dialogVisible0: false,
      contract_add: false,
      contract_upd: false,
      contract_del: false,
      contract_exp: false,
      previewTableImg: '',
      imgTable: false,
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      multipleSelection: [],
      CarStatusReq: [],
      // form_expiryDate: '',
      // form_signDate: '',
      // form_remindDate: '',
      form_status: '',
      contract_Req: [],
      contractType_Req: [],
      selectAllDriverReq: [],
      selectAllTruckTeamReq: [],
      selectAllCustomerReq: []
    }
  },
  computed: {
    ...mapGetters([
      'permissions'
    ]),
    uploadDisabled0: function () {
      return this.form.files.length > 0
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        0: '有效',
        1: '无效'
      }
      return statusMap[status]
    }
  },
  created () {
    this.getList()
    this.contract_add = this.permissions['contract_add']
    this.contract_exp = this.permissions['contract_exp']
    this.contract_upd = this.permissions['contract_upd']
    this.contract_del = this.permissions['contract_del']
    this.selectAllCustomerList()
    this.selectAllTruckTeamList()
    this.isstatus_statusList()
    this.contract_statusList()
    this.contract_typeList()
    this.selectAllDriverList()
  },
  methods: {
    getList () {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getList()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    handleExport () {
      let str = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        str += this.multipleSelection[i].contractNumber + ','
      }
      if (this.multipleSelection.length >= 1) {
        str = str.substring(0, str.length - 1)
      } else {
        str = 'all'
      }
      if (this.multipleSelection.length >= 1) {
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
          const fileName = nowDate + '-合同信息.xls'
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
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要修改的数据',
          type: 'warn',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {

        this.form.files = []
        const row = this.multipleSelection[0]
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.form.contractNumber = row.contractNumber
        this.form.contractName = row.contractName
        this.form.contact = row.contact
        this.form.phone = row.phone
        this.form.saleman = row.saleman
        this.form.signDate = row.signDate
        this.form.expiryDate = row.expiryDate
        this.form.remindDate = row.remindDate
        this.form.status = row.status
        this.form.remark = row.remark
        this.form_status = row.status
        this.form.customerId = row.customerId
        this.form.id = row.id
        if ((isNaN(row.contractFile))) {
          //  var obj4 = {
          //   name: '文件',
          //   url: row.contractFile
          // }
          // this.form.files.push(obj4)
          var arr = row.contractFile.split(',')
          for (var item in arr) {
            var obj4 = {
              name: '文件',
              url: arr[item]
            }
            this.form.files.push(obj4)
          }

        } else {
          this.form.files = []
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
    create (formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form)
            .then((res) => {
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
    cancel1 () {
      this.imgTable = false
    },
    cancel (formName) {
      this.dialogFormVisible = false
      const set = this.$refs
      set[formName].resetFields()
    },
    update (formName) {
      const set = this.$refs
      if (isNaN(this.form.truTruckfile)) {
        if (this.form.files.length === 0) {
          this.form.files = []
        } else {
          if (this.form.files[0].url) {
            let url = this.form.files[0].url
            this.form.files.splice(0)
            this.form.files.push(url)
          }
        }
      }

      this.form.status = this.form_status

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
            } else {
              this.$notify({
                title: '提示',
                message: res.data.msg,
                type: 'warning',
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
    resetTemp () {
      this.form = {
        contractNumber: undefined,
        contractName: '',
        // customerName: '',
        contact: '',
        phone: '',
        saleman: '',
        signDate: '',
        expiryDate: '',
        remindDate: '',
        status: '',
        remark: '',
        customerId: '',
        files: [],
        id: ''
      }
      this.form_status = ''
    },
    handleRemove0 (file, fileList) {
      this.form.files = []
    },
    handlePictureCardPreview0 (file) {
      this.dialogImageUrl0 = file.url
      this.dialogVisible0 = true
    },
    handleAvatarSuccess0 (res, file) {
      this.form.files.push(file.response.data)
    },
    contractFile (img) {
      if (img === undefined) {
        this.$notify({
          title: '警告',
          message: '暂无合同照片',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.imgTable = true
        this.previewTableImg = img
      }
    },
    isstatus_statusList () {
      isstatus_status().then(response => {
        this.CarStatusReq = response.data
      })
    },
    contract_typeList () {
      contract_type().then(response => {
        this.contractType_Req = response.data
      })
    },
    contract_statusList () {
      contract_status().then(response => {
        this.contract_Req = response.data
      })
    },
    selectAllCustomerList () {
      selectAllCustomer().then(response => {
        this.selectAllCustomerReq = response.data
      })
    },
    selectAllTruckTeamList () {
      selectAllTruckTeam().then(response => {
        this.selectAllTruckTeamReq = response.data
      })
    },
    selectAllDriverList () {
      selectAllDriver().then(response => {
        this.selectAllDriverReq = response.data
      })
    },
    emptycCustomerId () {
      this.form.customerId = null
      this.form.saleman = null
      this.form.contact = null
      this.form.phone = null
    },
    salemanReq1 (id) {
      if (id != null) {
        getcustomerObj(id).then(response => {
          this.form.saleman = response.data.saleman
          this.form.contact = response.data.contact
          this.form.phone = response.data.phone
        })
      }
    },
    salemanReq2 (id) {
      if (id != null) {
        gettruckteamObj(id).then(response => {
          this.form.saleman = response.data.saleman
          this.form.contact = response.data.contact
          this.form.phone = response.data.phone
        })
      }
    },
    salemanReq3 (id) {
      if (id != null) {
        getdriverObj(id).then(response => {
          this.form.saleman = null
          this.form.contact = response.data.driverName
          this.form.phone = response.data.phone
        })
      }
    },
    handleDelete () {
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
          str += this.multipleSelection[i].contractNumber + ','
        }
        str = str.substring(0, str.length - 1)
        this.$confirm('是否要删除选中的合同数据', '提示', {
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
</script>
<style>
.flexItem {
  margin-top: 20px;
  display: flex;
}

.flexItems {
  flex: 1;
  text-align: center;
}

.cm20 {
  padding-bottom: 20px;
}

.box {
  margin-top: 20px;
  display: flex;
}

.btn {
  flex: 1;
  text-align: center;
}
</style>
