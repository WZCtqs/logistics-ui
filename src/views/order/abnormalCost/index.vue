<template>
  <div class="app-container calendar-list-container">
    <el-form ref="form"
             :model="form"
             label-width="100px"
             class="filter-item">
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单号 "
                        class="filter-item">
            <el-input @keyup.enter.native="handleFilter"
                      class="filter-item"
                      v-model="listQuery.orderId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="异常类型 "
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       clearable
                       v-model="listQuery.exceptionFeeType"
                       @change="handleFilter">
              <el-option v-for="item in exceptionFeeTypeReq"
                         :key="item.id"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审核状态 "
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       clearable
                       placeholder="请选择"
                       v-model="listQuery.auditing"
                       @change="handleFilter">
              <el-option v-for="item in auditingReq"
                         :key="item.id"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="filter-container">
      <el-button class="filter-item"
                 type="primary"
                 size="mini"
                 v-waves
                 icon="search"
                 @click="handleFilter">搜索
      </el-button>
      <el-button v-if="ord_exception_fee_del"
                 class="filter-item"
                 style="margin-left: 10px;"
                 type="primary"
                 size="mini"
                 @click="handleDelete">删除
      </el-button>
      <el-button v-if="ord_exception_fee_exp"
                 class="filter-item"
                 style="margin-left: 10px;"
                 @click="handleExp"
                 type="primary"
                 size="mini">导出
      </el-button>
      <!-- <el-button @click="handleAbnormalFee"
                 class="filter-item"
                 icon="edit"
                 size="mini"
                 style="margin-left: 10px;"
                 type="primary">添加异常费用
      </el-button> -->
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
                <el-form-item label="司机电话:">
                  <span>{{ props.row.driverPhone }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="订单起始地:">
                  <span>{{ props.row.startPlace }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="申请备注:">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="处理人:">
                  <span>{{ props.row.transactorName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="上报人:">
                  <span>{{ props.row.applyBy }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="处理时间:">
                  <span>{{ props.row.handleTime }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="订单异常主键">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="订单编号">
        <template slot-scope="scope">
          <span class="C_Link"
                @click="handleUpdate1(scope.row)">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="司机">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="司机电话">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.driverPhone }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="订单起始地">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.startPlace }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="申请时间">
        <template slot-scope="scope">
          <span>{{ scope.row.applyTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="申请异常费用类型">
        <template slot-scope="scope">
          <span>{{ scope.row.exceptionFeeType }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="申请异常费用金额 ">
        <template slot-scope="scope">
          <span>{{ scope.row.exceptionFee }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="申请备注">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.remark }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="审核状态">
        <template slot-scope="scope">
          <span>{{ scope.row.auditing }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="处理人">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.transactorName }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="上报人">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.transactor }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="处理时间">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.handleTime }}</span>-->
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
               :visible.sync="dialogFormVisible">
      <h4 class="cargoFormTitle">异常记录</h4>

      <div class="div1">
        <el-row>
          <el-col :span="8">
            异常费用类型：
            <span v-if="exceptionFeeType === '0'">过桥费</span><span v-if="exceptionFeeType === '1'">压车费</span><span v-if="exceptionFeeType === '2'">放空费</span>
          </el-col>
          <el-col :span="8">
            处理状态：<span v-if="auditing === '0'">未处理</span><span v-if="auditing === '1'">通过</span><span v-if="auditing === '2'">拒绝</span>
          </el-col>
          <el-col :span="8">
            上报时间：{{applyTime}}
          </el-col>
          <el-col :span="8">
            上报司机：{{transactor}}
          </el-col>
          <el-col :span="8">
            审核人：{{transactorName}}
          </el-col>
          <el-col :span="8">
            审核时间：{{handleTime}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            异常费用金额：{{exceptionFee}}
          </el-col>
          <el-col :span="24">
            <!-- 异常费用凭证：<img v-bind:src="imgUrl"
                 style="width:auto; height:65px;" /> -->
            <span v-for="(item,index) in imgUrl"
                  :key="index">
              <img width="100%"
                   :src="item"
                   style="width:auto; height:65px;"
                   alt="">

              <el-popover placement="right"
                          width="400"
                          trigger="click">
                <img width="100%"
                     :src="item"
                     style="width:auto; height:550px;"
                     alt="">
                <el-button slot="reference"
                           size="mini"
                           icon="el-icon-zoom-in"></el-button>

              </el-popover>
            </span>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            异常情况备注：{{exRemarks}}
          </el-col>
          <el-col v-if="orderStatus=='1'">状态信息：待派车</el-col>
          <el-col v-if="orderStatus=='2'">状态信息：待接单</el-col>
          <el-col v-if="orderStatus=='3'">状态信息：待提箱</el-col>
          <el-col v-if="orderStatus=='4'">状态信息：提箱中</el-col>
          <el-col v-if="orderStatus=='5'">状态信息：待提货</el-col>
          <el-col v-if="orderStatus=='6'">状态信息：提货中</el-col>
          <el-col v-if="orderStatus=='7'">状态信息：运输中</el-col>
          <el-col v-if="orderStatus=='8'">状态信息：签收中</el-col>
          <el-col v-if="orderStatus=='9'">状态信息：已签收</el-col>
          <el-col v-if="orderStatus=='10'">状态信息：还箱中</el-col>
          <el-col v-if="orderStatus=='11'">状态信息：已还箱</el-col>
          <el-col v-if="orderStatus=='12'">状态信息：已提交</el-col>
        </el-row>
      </div>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="handleTx"
                   v-if="auditing === '0'">通过
        </el-button>
        <el-button @click="handleJy"
                   v-if="auditing === '0'">拒绝
        </el-button>
        <el-button @click="cancel()">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="创建异常费用"
               :visible.sync="abnormalDialogVisible">
      <el-form :model="abnormalForm"
               :rules="rules"
               ref="abnormalForm"
               label-width="100px">
        <el-form-item label="订单号"
                      prop="orderId">
          <el-input v-model="abnormalForm.orderId"
                    placeholder="orderId"
                    disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="异常类型"
                      prop="exceptionFeeType">
          <el-select class="filter-item"
                     filterable
                     clearable
                     placeholder="请选择"
                     v-model="abnormalForm.exceptionFeeType">
            <el-option v-for="item in exceptionFeeTypeReq"
                       :key="item.id"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="异常费用"
                      prop="exceptionFee">
          <el-input v-model="abnormalForm.exceptionFee"
                    placeholder="异常费用"></el-input>
        </el-form-item>
        <el-form-item label="备注"
                      prop="remark">
          <el-input v-model="abnormalForm.remark"
                    placeholder="备注"></el-input>
        </el-form-item>
        <div class="flexItem cm20">
          <div class="flexItems">
            <el-upload :class="{disabled:uploadDisabled0}"
                       :file-list="abnormalForm.licensePhotoArr"
                       :headers="headers"
                       :on-preview="handlePictureCardPreview0"
                       :on-remove="handleRemove0"
                       :on-success="handleAvatarSuccess0"
                       action="/order/ordFile/localUpload"
                       list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible0"
                       append-to-body>
              <img :src="dialogImageUrl0"
                   alt=""
                   width="100%">
            </el-dialog>
            <div>上传凭证</div>
          </div>
        </div>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="abnormalCancel('abnormalForm')">取 消</el-button>
        <el-button type="primary"
                   @click="abnormalCreate('abnormalForm')">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { auditing, delObj, exceptionFeeType, exObj, expObj, fetchList, getDetail } from '@/api/ord_exception_fee'
import { addAbnormal } from '@/api/ordCommonGoods'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'
import { getToken } from '@/util/auth'

export default {
  name: 'table_ord_exception_fee',
  directives: {
    waves
  },
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      abnormalForm: {
        orderId: '',
        exceptionFeeType: '',
        exceptionFee: '',
        remark: '',
        imgUrlFile: []
      },
      dialogVisible0: false,
      abnormalDialogVisible: false,
      dialogImageUrl0: false,
      list: null,
      total: null,
      exceptionFeeType: null,
      submitDate: null,
      auditing: null,
      applyTime: null,
      transactor: null,
      transactorName: null,
      handleTime: null,
      exceptionFee: null,
      imgUrl: null,
      exRemarks: null,
      id: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        orderId: null
      },
      rules: {},
      form: {},
      dialogFormVisible: false,
      dialogStatus: '',
      ord_exception_fee_add: false,
      ord_exception_fee_upd: false,
      ord_exception_fee_del: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      exceptionFeeTypeReq: [],
      auditingReq: [],
      multipleSelection: [],
      orderId: ''
    }
  },
  computed: {
    ...mapGetters([
      'permissions'
    ]),
    uploadDisabled0: function () {
      return this.abnormalForm.imgUrlFile.length > 2
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
  watch: {},
  mounted () {
    if (this.$route.query.id) {
      this.abnormalForm.orderId = this.$route.query.id
      this.abnormalDialogVisible = true
    }
  },
  created () {

    this.getList()
    this.ord_exception_fee_exp = this.permissions['ord_exception_fee_exp']
    this.ord_exception_fee_add = this.permissions['ord_exception_fee_add']
    this.ord_exception_fee_upd = this.permissions['ord_exception_fee_upd']
    this.ord_exception_fee_del = this.permissions['ord_exception_fee_del']
    this.isPassed = this.permissions['isPassed']
    this.exceptionFeeTypeList()
    this.auditingList()
    if (this.$route.query.orderId != null && this.$route.query.orderId != undefined) {
      this.listQuery.orderId = this.$route.query.orderId
      this.handleFilter()
    }
  },
  methods: {
    handleAbnormalFee () {
      this.abnormalForm = {
        orderId: '',
        exceptionFeeType: '',
        exceptionFee: '',
        remark: '',
        imgUrlFile: []
      }
      this.abnormalDialogVisible = true
    },
    abnormalCreate (formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addAbnormal(this.abnormalForm).then(res => {
            if (res.data.data) {
              this.$notify({
                title: '成功',
                message: '异常费用新增成功',
                type: 'success',
                duration: 2000
              })
              this.abnormalDialogVisible = false
              this.getList()
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          this.$message.error('请填写必填项')
          return false
        }
      })
    },
    abnormalCancel () {
      this.abnormalDialogVisible = false
    },
    handleRemove0 (file, fileList) {
      this.abnormalForm.imgUrlFile = fileList
    },
    handlePictureCardPreview0 (file) {
      this.dialogImageUrl0 = file.url
      this.dialogVisible0 = true
    },
    handleAvatarSuccess0 (res, file) {
      this.abnormalForm.imgUrlFile.push(file.response.data)
    },
    getList () {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    exceptionFeeTypeList () {
      exceptionFeeType().then(response => {
        this.exceptionFeeTypeReq = response.data
      })
    },
    auditingList () {
      auditing().then(response => {
        this.auditingReq = response.data
      })
    },
    handleTx () {
      const obj = {
        id: this.id,
        auditing: 1,
        orderId: this.orderId
      }
      if (this.auditing === '0') {
        exObj(obj).then(response => {
          if (response.data.data) {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '审核成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      } else {
        this.$notify({
          title: '警告',
          message: '已审核',
          type: 'success',
          duration: 2000
        })
      }
    },
    handleJy () {
      const obj = {
        id: this.id,
        auditing: 2,
        orderId: this.orderId
      }
      if (this.auditing === '0') {
        exObj(obj).then(response => {
          if (response.data.data) {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '不通过',
              message: '审核成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      } else {
        this.$notify({
          title: '警告',
          message: '已审核',
          type: 'success',
          duration: 2000
        })
      }
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
    handleDelete () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要删除的数据',
          type: 'warn',
          duration: 2000
        })
      } else {
        var arr = this.multipleSelection.filter(item => {
          return item.auditing !== '通过'
        })
        if (arr.length > 0) {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].id + ','
          }
          str = str.substring(0, str.length - 1)
          this.$confirm('是否要删除选中的异常费用', '提示', {
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
          this.$notify.error('该条异常费用已审核通过禁止删除')
        }
      }
    },
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleExp () {
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
          downloadElement.download = nowDate + '-异常费用信息.xls'
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
      this.dialogFormVisible = false
    },
    handleUpdate1 (obj) {
      const id = obj.id
      this.dialogFormVisible = true
      this.orderId = obj.orderId
      getDetail(id)
        .then((res) => {
          this.id = res.data.data.id
          var time = res.data.data.submitDate
          var d = new Date(time)
          var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          this.exceptionFeeType = res.data.data.exceptionFeeType
          this.submitDate = times
          this.auditing = res.data.data.auditing
          this.applyTime = res.data.data.applyTime
          this.transactor = res.data.data.driverName
          this.transactorName = res.data.data.transactorName
          this.handleTime = res.data.data.handleTime
          this.exceptionFee = res.data.data.exceptionFee
          if (res.data.data.imgUrl) {
            if (res.data.data.imgUrl.length) {
              this.imgUrl = res.data.data.imgUrl.split(',')
            }
          }
          this.exRemarks = res.data.data.remark
          this.orderStatus = res.data.data.orderStatus
        })
    }
    // create(formName) {
    //   const set = this.$refs
    //   set[formName].validate(valid => {
    //     if (valid) {
    //       addObj(this.form)
    //         .then(() => {
    //           this.dialogFormVisible = false
    //           this.getList()
    //           this.$notify({
    //             title: '成功',
    //             message: '创建成功',
    //             type: 'success',
    //             duration: 2000
    //           })
    //         })
    //     } else {
    //       this.$message.error('必填项不能为空')
    //       return false
    //     }
    //   })
    // }
  }
}
</script>
<style>
.C_Link {
  color: #2866bd;
}

.C_Link:hover {
  text-decoration: underline;
  color: #2866bd;
  cursor: pointer;
}

.cargoFormTitle {
  font-size: 14px;
  background-color: #2d8c94;
  color: #fff;
  padding-left: 24px;
  margin: 12px auto;
  border-radius: 6px;
}

.demo-table-expand .el-form-item__label {
  color: #99a9bf;
}

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
</style>
