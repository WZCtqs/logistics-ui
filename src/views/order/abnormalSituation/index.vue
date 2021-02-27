<template>
  <div class="app-container calendar-list-container">
    <el-form ref="form"
             :model="form"
             label-width="100px"
             class="filter-item">
      <el-col :span="6">
        <el-form-item label="订单号 "
                      class="filter-item">
          <el-input @keyup.enter.native="handleFilter"
                    class="filter-item"
                    v-model="listQuery.orderId"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="10">
        <el-form-item label="提交时间 "
                      class="filter-item">
          <el-col :span="11">
            <el-date-picker type="date"
                            placeholder="开始时间"
                            v-model="listQuery.fromDate"
                            style="width: 100%;"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
          <el-col class="line"
                  :span="2"
                  align="center">--</el-col>
          <el-col :span="11">
            <el-date-picker type="date"
                            placeholder="结束时间"
                            v-model="listQuery.toDate"
                            style="width: 100%;"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-col>

    </el-form>
    <div class="filter-container">
      <el-button class="filter-item"
                 @click="search"
                 style="margin-left: 10px;"
                 type="primary"
                 icon="edit"
                 size="mini">
        搜索
      </el-button>

      <el-button v-if="ord_exception_condition_exp"
                 class="filter-item"
                 style="margin-left: 10px;"
                 @click="handleExp"
                 type="primary"
                 icon="edit"
                 size="mini">导出
      </el-button>
      <el-button v-if="ord_exception_condition_del"
                 class="filter-item"
                 style="margin-left: 10px;"
                 @click="handleDelete"
                 type="primary"
                 icon="edit"
                 size="mini">删除
      </el-button>
      <el-button class="filter-item"
                 style="margin-left: 10px;"
                 @click="handleDetail"
                 type="primary"
                 icon="edit"
                 size="mini">查看
      </el-button>

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
      <el-table-column align="center"
                       label="订单编号">
        <template slot-scope="scope">
          <span v-if="ord_exception_condition_upd"
                style="cursor: pointer; color: rgb(64, 158, 255);"
                @click="handleUpdate1(scope.row)">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="司机">
        <template slot-scope="scope">
          <span>{{ scope.row.driver }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="司机电话">
        <template slot-scope="scope">
          <span>{{ scope.row.driverPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="订单起始地">
        <template slot-scope="scope">
          <span>{{ scope.row.orderRoute }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="提交时间">
        <template slot-scope="scope">
          <span>{{ scope.row.submitDate | moment('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.exRemarks }}</span>
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
      <h4 class="tags1">异常记录</h4>

      <div class="div1">
        <el-row>
          <el-col :span="12">
            上报时间：{{submitDate | moment('YYYY-MM-DD')}}
          </el-col>
          <el-col :span="12">
            上报司机：{{driver}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            异常情况：
            <el-row>
              <el-col :span="6"
                      v-for="item in paths"
                      :key="item">
                <img v-bind:src="item"
                     style="width:auto; height:65px;" />
              </el-col>
            </el-row>
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
        <el-button @click="cancel()">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示"
               :visible.sync="centerDialogVisible"
               width="30%"
               center>
      <span>是否确定删除？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleBeforeDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addObj, delObj, expObj, fetchList, getDetail, putObj } from '@/api/abnormalSituation'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'

export default {
  name: 'table_ord_exception_condition',
  directives: {
    waves
  },
  data () {
    return {
      centerDialogVisible: false,
      paths: null,
      activeName2: 'first',
      submitDate: null,
      driver: null,
      oecFile: null,
      exRemarks: null,
      multipleSelection: [],
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        fromDate: null,
        toDate: null,
        orderId: null
      },
      rules: {},
      form: {},
      dialogFormVisible: false,
      dialogStatus: '',
      ord_exception_condition_exp: false,
      ord_exception_condition_upd: false,
      ord_exception_condition_del: false,
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
    this.ord_exception_condition_exp = this.permissions['ord_exception_condition_exp']
    this.ord_exception_condition_add = this.permissions['ord_exception_condition_add']
    this.ord_exception_condition_upd = this.permissions['ord_exception_condition_upd']
    this.ord_exception_condition_del = this.permissions['ord_exception_condition_del']
    if (this.$route.query.orderId != null && this.$route.query.orderId != undefined) {
      this.listQuery.orderId = this.$route.query.orderId
      this.handleFilter()
    }
  },
  methods: {
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    search () {
      this.getList()
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleDetail () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要查看的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        let obj = this.multipleSelection[0]
        this.handleUpdate1(obj)
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行查看',
          type: 'error',
          duration: 2000
        })
      }
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getList()
    },
    handleBeforeDelete () {
      this.centerDialogVisible = false
      // this.handleDelete()
    },
    handleDelete () {
      let str = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        str += this.multipleSelection[i].id + ','
      }
      str = str.substring(0, str.length - 1)
      delObj(str)
        .then(response => {
          this.dialogFormVisible = false
          this.getList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
    },
    handleCreate () {
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
      if (this.multipleSelection.length >= 1) {
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
          let blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
          let downloadElement = document.createElement('a')
          let href = window.URL.createObjectURL(blob)
          downloadElement.href = href
          downloadElement.download = nowDate + '-异常订单信息.xls'
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
          message: '选择导出的数据',
          type: 'warning',
          duration: 2000
        })
      }
    },
    handleUpdate1 (obj) {
      let id = obj.id
      this.dialogFormVisible = true
      getDetail(id)
        .then((res) => {
          this.submitDate = res.data.data.submitDate
          this.driver = res.data.data.driver
          this.oecFile = res.data.data.oecFile
          this.exRemarks = res.data.data.exRemarks
          this.orderStatus = res.data.data.orderStatus
          this.paths = res.data.data.paths
        })
    },
    cancel () {
      this.dialogFormVisible = false
    },
    update (formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          this.form.password = undefined
          putObj(this.form).then(() => {
            this.dialogFormVisible = false
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
    }
  }
}
</script>
<style>
.tags1 {
  padding: 5px 8px;
  background: #409eff;
  color: #fff;
}

.div1 {
  background: #f5f5f5;
  padding: 15px 12px;
}
</style>

