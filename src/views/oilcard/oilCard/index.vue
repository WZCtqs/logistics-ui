<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px"
               class="filter-item">
        <el-col :span="6">
          <el-form-item label="主卡号"
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.majorNumber"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in majorNumberReq"
                         :key="item.majorId"
                         :label="item.majorNumber"
                         :value="item.majorNumber">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
          <el-form-item label="车辆类型 "
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.attribute"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in carReq"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="油卡类型"
                        class="filter-item">
            <el-select class="filter-item"
                       v-model="listQuery.cardType"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       filterable
                       placeholder="请选择"
                       clearable>
              <el-option v-for="item in oilcardReq"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分公司"
                        class="filter-item">
            <el-input v-model="listQuery.openCardPlace"
                      @keyup.enter.native="handleFilter"
                      class="filter-item"
                      placeholder="分公司"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="司机"
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.driverName"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in driverReq"
                         :key="item.driverId"
                         :label="item.driverName"
                         :value="item.driverName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办卡日期"
                        class="filter-item">
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.beginTime"
                              style="width: 100%;"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              clearable></el-date-picker>
            </el-col>
            <el-col class="line"
                    :span="2"
                    align="center">--
            </el-col>
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.endTime"
                              style="width: 100%;"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              clearable></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-button v-if="oil_card_add"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleCreate">新增
        </el-button>
        <el-button v-if="oil_card_upd"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleUpdate">编辑
        </el-button>
        <el-button v-if="oil_card_del"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleDelete">删除
        </el-button>
        <el-button v-if="oil_card_exp"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleExp"
                   type="primary"
                   size="mini"
                   icon="edit">导出
        </el-button>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   @click="handleDownloadObj">下载模板
        </el-button>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   size="mini"
                   @click="importExe"
                   type="primary"
                   icon="edit">导入
        </el-button>
        <input type="file"
               @change="getFile($event)"
               style="display:none"
               ref="menuFile" />
        <el-button class="filter-item"
                   @click="handleFilter"
                   type="primary"
                   size="mini"
                   v-waves
                   icon="search">搜索
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
                       width="55"></el-table-column>
      <el-table-column type="expand"
                       fixed>
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="车辆类型:">
                  <span>{{ props.row.docOperator }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="联系方式:">
                  <span>{{ props.row.driverPhone }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="开卡日期:">
                  <span>{{ props.row.openDate }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="油卡数量:">
                  <span>{{ props.row.cardQuantity }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="退卡时间:">
                  <span>{{ props.row.returnDate }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="油卡id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.oilCardId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="油卡号">
        <template slot-scope="scope">
          <span>{{ scope.row.oilCardNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="充值主卡号">
        <template slot-scope="scope">
          <span>{{ scope.row.majorNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="司机">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车辆类型">
        <template slot-scope="scope">
          <span v-if="scope.row.attribute === '0'">自有车</span>
          <span v-if="scope.row.attribute === '1'">挂靠车</span>
          <span v-if="scope.row.attribute === '2'">外调车</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="联系方式">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.driverPhone }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="开卡日期">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.openDate }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="油卡类型">
        <template slot-scope="scope">
          <span v-if="scope.row.cardType === '0'">普卡</span>
          <span v-if="scope.row.cardType === '1'">专卡限制车号</span>
          <span v-if="scope.row.cardType === '2'">柴油专用卡</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="分公司">
        <template slot-scope="scope">
          <span>{{ scope.row.openCardPlace }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="油卡状态">
        <template slot-scope="scope">
          <span>{{ scope.row.cardStatus }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="油卡数量">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.cardQuantity }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="押金">
        <template slot-scope="scope">
          <span>{{ scope.row.deposit }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="退卡记录">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     v-if="scope.row.cardStatus === '正常'"
                     @click="handleDetail(scope.row)">退卡
          </el-button>
          <el-button size="mini"
                     type="primary"
                     v-else-if="scope.row.cardStatus === '退卡'">退卡成功
          </el-button>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="退卡时间">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.returnDate }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
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
               :visible.sync="dialogFormVisible1">
      <el-form :model="form1"
               :rules="rules"
               ref="form1"
               label-width="140px">
        <el-form-item label="主卡号"
                      prop="majorNumber">
          <!-- <el-input v-model="form1.majorNumber"
                    placeholder="主卡号"></el-input> -->
          <el-select class="filter-item"
                     filterable
                     placeholder="请选择"
                     v-model="form1.majorNumber"
                     clearable>
            <el-option v-for="item in majorNumberReq"
                       :key="item.majorId"
                       :label="item.majorNumber"
                       :value="item.majorNumber">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="副卡号"
                      prop="oilCardNumber">
          <el-input v-model="form1.oilCardNumber"
                    placeholder="副卡号"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form1')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="create('form1')">确 定
        </el-button>
        <el-button v-else
                   type="primary"
                   @click="update('form1')">修 改
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible">
      <h4 class="tags1">退卡记录</h4>
      <div class="oilcard-flexItem oilcard-cm20">
        <div class="flexItems">
          <el-upload :class="{disabledUp:uploadDisabled0}"
                     :file-list="form.licensePhotoArr"
                     :headers="headers"
                     :on-preview="handlePictureCardPreview0"
                     :on-remove="handleRemove0"
                     :on-success="handleAvatarSuccess0"
                     action="/oilcard/oilcardFile/localUpload"
                     list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible0"
                     append-to-body>
            <img width="100%"
                 :src="dialogImageUrl0"
                 alt="">
          </el-dialog>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="handleSubmit">提 交</el-button>
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addObj,
  delObj,
  expObj,
  fetchList,
  getcarObj,
  getmajorNumberObj,
  getoilcardObj,
  getplateNumberObj,
  getselectAllDriverObj,
  gettestOilCardNumberObj,
  putObj,
  returnCardObj
} from '@/api/oil_card'
import { importObj, downloadObj } from '@/api/deputyCard'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { getOilMajorNumberObj } from '@/api/oil_apply'
import { mapGetters } from 'vuex'
import { getToken } from '@/util/auth'

export default {
  name: 'table_oil_card',
  directives: {
    waves
  },
  data () {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        startTruckDate: null,
        endTruckDate: null
      },
      rules: {
        majorNumber: [
          { required: true, message: '请选择主卡号', trigger: 'blur' }
        ],
        oilCardNumber: [
          { required: true, message: '请输入油卡号', trigger: 'blur' }
        ]
      },
      form: {
        licensePhotoArr: []
      },
      form1: {
        majorNumber: '',
        oilCardNumber: ''
      },
      dialogVisible0: false,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogStatus: '',
      oil_card_add: false,
      oil_card_upd: false,
      oil_card_del: false,
      oil_card_exp: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      multipleSelection: [],
      oilcardReq: [],
      carReq: [],
      majorNumberReq: [],
      plateNumberReq: [],
      openDatereq: '',
      returnDatereq: '',
      dialogImageUrl0: '',
      returnCardReq: {},
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      driverReq: []
    }
  },
  computed: {
    ...mapGetters([
      'permissions'
    ]),
    uploadDisabled0: function () {
      return this.form.licensePhotoArr.length > 0
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
    this.getplateNumberObjList()
    this.oil_card_add = this.permissions['oil_card_add']
    this.oil_card_upd = this.permissions['oil_card_upd']
    this.oil_card_del = this.permissions['oil_card_del']
    this.oil_card_exp = this.permissions['oil_card_exp']
    this.getoilcardObjList()
    this.getcarObjList()
    this.getOilMajorNumberObjList()
    this.handleGetselectAllDriverObj()
    this.getmajorNumberObjList()
  },
  methods: {
    handleGetselectAllDriverObj () {
      getselectAllDriverObj().then(res => {
        this.driverReq = res.data
      })
    },
    getoilcardObjList () {
      getoilcardObj().then(response => {
        this.oilcardReq = response.data
      })
    },
    getplateNumberObjList () {
      getplateNumberObj().then(response => {
        this.plateNumberReq = response.data
      })
    },
    getcarObjList () {
      getcarObj().then(response => {
        this.carReq = response.data
      })
    },
    getList () {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getOilMajorNumberObjList () {
      getOilMajorNumberObj().then(response => {
        this.majorNumberReq = response.data
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
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
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible1 = true
    },
    create (formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          gettestOilCardNumberObj(this.form1.oilCardNumber).then(res => {
            if (res.data.data == false) {
              addObj(this.form1)
                .then((res) => {
                  if (res.data.data) {
                    this.dialogFormVisible1 = false
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
              this.$message.error('此油卡号已存在，请更换')
            }
          })
        } else {
          return false
        }
      })
    },
    resetTemp () {
      this.form1 = {
        majorNumber: '',
        oilCardNumber: ''
      }
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
        if (this.multipleSelection[0].cardStatus == '未使用') {
          const row = this.multipleSelection[0]
          this.dialogStatus1 = 'update'
          this.form1.oilCardId = row.oilCardId
          for (const i in this.majorNumberReq) {
            if (this.multipleSelection[0].majorNumber === this.majorNumberReq[i].majorNumber) {
              this.form1.majorId = this.majorNumberReq[i].majorId
            }
          }
          this.form1.majorNumber = row.majorNumber
          this.form1.oilCardNumber = row.oilCardNumber

          this.dialogFormVisible1 = true
        } else {
          this.$notify({
            title: '警告',
            message: '该条数据已审核禁止编辑',
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
    update (formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible1 = false
          this.form1.password = undefined
          putObj(this.form1).then((res) => {
            this.dialogFormVisible1 = false
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
    },
    // getmajorNumberObjList() {
    //   getmajorNumberObj().then(response => {
    //     this.majorNumberReq = response.data.data
    //   })
    // },
    handleExp () {
      let str = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (i === this.multipleSelection.length - 1) {
          str += this.multipleSelection[i].oilCardId
        } else {
          str += this.multipleSelection[i].oilCardId + ','
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
          downloadElement.download = nowDate + '-油卡基本信息.xls'
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
    cancel () {
      this.dialogFormVisible1 = false
    },
    handleRemove0 (file, fileList) {
      this.form.licensePhotoArr = []
    },
    handlePictureCardPreview0 (file) {
      this.dialogImageUrl0 = file.url
      this.dialogVisible0 = true
    },
    handleAvatarSuccess0 (res, file) {
      this.form.licensePhotoArr.push(file.response.data)
    },
    handleDelete (row) {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要删除的数据',
          type: 'warn',
          duration: 2000
        })
      } else {
        let delFlag = []
        this.multipleSelection.forEach(item => {
          if (item.cardStatus === '正常') {
            delFlag.push(item)
          }
        })
        if (!delFlag.length) {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].oilCardId + ','
          }
          str = str.substring(0, str.length - 1)
          this.$confirm('是否要删除选中的油卡基本信息', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delObj(str).then(response => {
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
          this.$notify.error('选择删除的数据包含禁止删除的油卡状态')
        }
      }
    },
    handleDetail (obj) {
      this.dialogFormVisible = true
      this.returnCardReq = {
        oilCardId: obj.oilCardId,
        majorId: obj.majorId,
        returnRecord: '',
        ownerDriverId: obj.ownerDriverId,
        oilCardNumber: obj.oilCardNumber
      }
    },
    handleSubmit () {
      this.returnCardReq.returnRecord = this.form.licensePhotoArr[0]
      returnCardObj(this.returnCardReq).then(res => {
        if (res.data.data) {
          this.dialogFormVisible = false
          this.getList()
          this.$notify({
            title: '成功',
            message: '退卡成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message.error(res.data.msg)
        }
      })
      // }
    },
    importExe () {
      this.$refs.menuFile.value = ''
      this.$refs.menuFile.click()
    },
    handleDownloadObj () {
      downloadObj().then(response => {
        //  alert(JSON.stringify(response));
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
        let blob = new Blob([response.data], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        })
        let downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.download = nowDate + '-主副卡模板.xls' // xxx.xls/xxx.xlsx
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)
        this.$notify({
          title: '成功',
          message: '模板下载成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    getFile (event) {
      this.upath = event.target.files[0]
      let zipFormData = new FormData()
      zipFormData.append('file', this.upath)
      importObj(zipFormData).then(res => {
        if (res.data.data) {
          this.getList()
          this.$notify({
            title: '成功',
            message: '导入成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data.msg
          })
        }
      })
    }
  }
}
</script>
<style>
.oilcard-flexItem {
  margin-top: 20px;
  display: flex;
  justify-items: center;
  align-items: center;
}

.oilcard-flexItem .flexItems {
  flex: 1;
  text-align: center;
}

.oilcard-cm20 {
  padding-bottom: 20px;
}

.disabledUp .el-upload--picture-card {
  display: none;
}
</style>

