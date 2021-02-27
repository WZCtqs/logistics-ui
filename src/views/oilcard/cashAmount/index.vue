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
      <div class="filter-container">
        <el-button v-if="cashAmount_exp"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleExp"
                   type="primary"
                   icon="edit"
                   size="mini">导出
        </el-button>
      </div>
    </div>
    <el-table :key='tableKey'
              :data="list"
              v-loading="listLoading"
              element-loading-text="给我一点时间"
              border
              fit
              show-summary
              highlight-current-row
              style="width: 100%">
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column align="center"
                       label="公司名称">
        <template slot-scope="scope">
          <span>{{ scope.row.majorCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="上月余额"
                       prop="lastAmount"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.lastAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="本月充值"
                       prop="rechargeSum"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.rechargeSum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="本月分配"
                       prop="distributeSum"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.distributeSum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="本月余额"
                       prop="monthAmount"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.monthAmount }}</span>
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
  </div>
</template>

<script>
import { fetchList, expObj } from '@/api/cashAmount'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'

export default {
  name: 'table_oil_apply',
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
      rules: {
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
      cashAmount_exp: false,
      textMap: {
      },
      tableKey: 0,
      multipleSelection: []

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
    const data = new Date()
    if (data.getMonth() < 9) {
      this.listQuery.yearMonth = data.getFullYear() + '-0' + (data.getMonth() + 1)
    } else {
      this.listQuery.yearMonth = data.getFullYear() + '-' + (data.getMonth() + 1)
    }
    this.getList()
    this.cashAmount_exp = this.permissions['cashAmount_exp']
    this.cashAmount_upd = this.permissions['cashAmount_upd']
    this.cashAmount_del = this.permissions['cashAmount_del']
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
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    handleExp () {
      const str = this.listQuery.yearMonth
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
          downloadElement.download = nowDate + '-公司油卡现金余额.xls'
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
    }
  }
}
</script>
