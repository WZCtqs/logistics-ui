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
      <div class="filter-container">
        <el-button v-if="recharge_exp"
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
              show-summary>
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column align="center"
                       label="日期">
        <template slot-scope="scope">
          <span>{{ scope.row.yearMonth }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="充值明细">
        <template slot-scope="scope">
          <span>{{ scope.row.rechrageSort }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="金额"
                       prop="monthRechargeSum"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.monthRechargeSum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList, expObj } from '@/api/recharge_sum'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'

export default {
  name: 'table_major_month_recharge',
  directives: {
    waves
  },
  data () {
    return {
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        yearMonth: ''
      },
      rules: {
      },
      form: {
      },
      dialogStatus: '',
      recharge_exp: false,
      textMap: {

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
    this.recharge_exp = this.permissions['recharge_exp']
  },
  methods: {
    getList () {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
      })
    },
    handleExp () {
      const str = this.listQuery.yearMonth
      if(this.list.length != 0){
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
          title: '警告',
          message: '暂无数据，无法导出',
          type: 'warning',
          duration: 2000
        })
      }

    },

    handleFilter () {
      this.getList()
    }
  }
}
</script>
