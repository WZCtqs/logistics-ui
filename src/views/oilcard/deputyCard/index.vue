<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px"
               class="filter-item">
        <!-- <el-col>
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
        </el-col> -->
        <el-col>
          <el-form-item label="主卡号"
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.majorNumber"
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
      </el-form>
      <div class="filter-container">
        <el-button v-if="deputy_card_downloads"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   @click="handleDownloadObj">下载模板
        </el-button>
        <el-button v-if="deputy_card_import"
                   class="filter-item"
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
        <el-button v-if="deputy_card_exp"
                   class="filter-item"
                   style="margin-left: 10px;"
                   size="mini"
                   @click="handleExp"
                   type="primary"
                   icon="edit">导出
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
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column align="center"
                       label="主卡名">
        <template slot-scope="scope">
          <span>{{ scope.row.majorName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="主卡号">
        <template slot-scope="scope">
          <span>{{ scope.row.majorNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="油卡号">
        <template slot-scope="scope">
          <span>{{ scope.row.oilCardNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="油卡状态"
                       prop="cardStatus">
        <template slot-scope="scope">
          <span>{{ scope.row.cardStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="油卡所属公司">
        <template slot-scope="scope">
          <span>{{ scope.row.majorCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="持卡人">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
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
import { fetchList, getmajorNumberObj, importObj, downloadObj, expObj } from '@/api/deputyCard'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'

export default {
  name: 'table_major_month_recharge',
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
        limit: 20
      },
      rules: {
      },
      form: {
      },
      dialogStatus: '',
      // recharge_exp: false,
      textMap: {

      },
      tableKey: 0,
      majorNumberReq: []
    }
  },
  computed: {
    ...mapGetters([
      'permissions'
    ])
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
    this.getmajorNumberObjList()
    this.deputy_card_exp = this.permissions['deputy_card_exp']
    this.deputy_card_import = this.permissions['deputy_card_import']
    this.deputy_card_downloads = this.permissions['deputy_card_downloads']
  },
  methods: {
    getList () {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
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
    getmajorNumberObjList () {
      getmajorNumberObj().then(response => {
        this.majorNumberReq = response.data
      })
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
          message: '导出成功',
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
    },

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
      } else {
        this.$notify({
          title: '失败',
          message: '请选择一行数据进行导出操作',
          type: 'error',
          duration: 2000
        })
      }
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
