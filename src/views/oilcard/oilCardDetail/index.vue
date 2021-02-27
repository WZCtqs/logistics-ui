<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px"
               class="filter-item">
        <el-col :span="6">
          <el-form-item label="月份选择"
                        class="filter-item">
            <el-col>
              <el-date-picker type="month"
                              placeholder="选择日期"
                              v-model="listQuery.yearMonth"
                              @keyup.enter.native="handleFilter"
                              @change="handleFilter"
                              style="width: 100%;"
                              format="yyyy 年 MM 月"
                              value-format="yyyy-MM"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主卡号"
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.majorId"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in majorNumberReq"
                         :key="item.majorId"
                         :label="item.majorNumber"
                         :value="item.majorId">
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
                       v-model="listQuery.truckId"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in plateNumberReq"
                         :key="item.truckId"
                         :label="item.plateNumber"
                         :value="item.truckId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="充值类型"
                        class="filter-item">
            <el-select class="filter-item"
                       v-model="listQuery.rechargeType"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       filterable
                       placeholder="请选择"
                       clearable>
              <el-option v-for="item in oilcardTypeReq"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-form>
      <div>
        <el-button v-if="oil_card_exp"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleExp"
                   type="primary"
                   size="mini"
                   icon="edit">导出
        </el-button>
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
      <el-table-column align="center"
                       label="油卡充值id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.rechargeId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="主卡号">
        <template slot-scope="scope">
          <span>{{ scope.row.majorNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="副卡号">
        <template slot-scope="scope">
          <span>{{ scope.row.oilCardNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车牌类别">
        <template slot-scope="scope">
          <span>{{ scope.row.attribute }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="充值日期">
        <template slot-scope="scope">
          <span>{{ scope.row.rechargeDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="所属公司">
        <template slot-scope="scope">
          <span>{{ scope.row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="订单号">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="报销单号">
        <template slot-scope="scope">
          <span>{{ scope.row.reimburseNum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="吨位/班列">
        <template slot-scope="scope">
          <span>{{ scope.row.containerNo }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="油卡数量">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.cardQuantity }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="总运费">
        <template slot-scope="scope">
          <span>{{ scope.row.totalTransportCost }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="充值金额">
        <template slot-scope="scope">
          <span>{{ scope.row.rechargeSum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="充值类型">
        <template slot-scope="scope">
          <span>{{ scope.row.rechargeType }}</span>
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
  </div>
</template>

<script>
import { expObj, fetchList, getmajorNumberObj, getplateNumberObj, getoilcardTypeObj } from '@/api/oil_cardDetail'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'
import { getToken } from '@/util/auth'

export default {
  name: 'table_oil_cardDetail',
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
        yearMonth: ''
      },
      rules: {},
      form: {
      },
      dialogStatus: '',
      oil_card_exp: false,
      textMap: {

      },
      tableKey: 0,
      yearMonth: '',
      majorNumberReq: [],
      plateNumberReq: [],
      oilcardTypeReq: [],
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters([
      'permissions'
    ]),
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
    const data = new Date()
    if (data.getMonth() < 9) {
      this.listQuery.yearMonth = data.getFullYear() + '-0' + (data.getMonth() + 1)
    } else {
      this.listQuery.yearMonth = data.getFullYear() + '-' + (data.getMonth() + 1)
    }
    this.getList()
    this.getmajorNumberObjList()
    this.getplateNumberObjList()
    this.getoilcardTypeObjList()
    this.oil_card_exp = this.permissions['oil_card_exp']
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
    getmajorNumberObjList () {
      getmajorNumberObj().then(response => {
        this.majorNumberReq = response.data.data
      })
    },
    getplateNumberObjList () {
      getplateNumberObj().then(response => {
        this.plateNumberReq = response.data
      })
    },
    getoilcardTypeObjList () {
      getoilcardTypeObj().then(response => {
        this.oilcardTypeReq = response.data
      })
    },
    handleExp () {
      let str = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (i === this.multipleSelection.length - 1) {
          str += this.multipleSelection[i].rechargeId
        } else {
          str += this.multipleSelection[i].rechargeId + ','
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
          downloadElement.download = nowDate + '-油卡充值明细.xls'
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

