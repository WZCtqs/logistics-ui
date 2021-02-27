<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px"
               class="filter-item">
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单号"
                          class="filter-item">
              <el-input @keyup.enter.native="handleFilter"
                        style="width: 200px;"
                        class="filter-item"
                        placeholder="订单号"
                        v-model="listQuery.orderId">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称"
                          class="filter-item">
              <el-select class="filter-item"
                         v-model="listQuery.customerId"
                         clearable
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter"
                         filterable
                         placeholder="请选择">
                <el-option v-for="item in allCustomerReq"
                           :key="item.customerId"
                           :label="item.customerName"
                           :value="item.customerId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-button v-if="ord_common_goods_upd"
                   class="filter-item"
                   style="margin-left: 10px;"
                   size="mini"
                   @click="handleUpdate"
                   type="primary"
                   icon="edit">修改
        </el-button>
        <el-button v-if="ord_common_goods_del"
                   class="filter-item"
                   style="margin-left: 10px;"
                   size="mini"
                   @click="handleDelete"
                   type="primary"
                   icon="edit">删除
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
                   style="margin-left: 10px;"
                   size="mini"
                   @click="handleExport"
                   type="primary"
                   icon="edit">导出
        </el-button>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   size="mini"
                   @click="handleDownloadMB"
                   type="primary"
                   icon="edit">下载模板
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
                       width="55"
                       fixed>
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
                <el-form-item label="计费里程:">
                  <span>{{ props.row.mchargedMileage }}公里</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="总体积:">
                  <span>{{ props.row.sumVolume }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">

                <el-form-item label="总重量:">
                  <span>{{ props.row.sumWeight }}吨</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="车辆类型:">
                  <template v-if="props.row.ordCommonTruck !==null">
                    <span v-if="props.row.ordCommonTruck.truckType === '0'">自由车</span>
                    <span v-if="props.row.ordCommonTruck.truckType === '1'">外调车</span>
                  </template>
                  <span v-else></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="司机:">
                  <template v-if="props.row.ordCommonTruck !==null">
                    <span v-if="props.row.ordCommonTruck.driverVOS[0].driverName !== null">{{ props.row.ordCommonTruck.driverVOS[0].driverName }}</span>
                  </template>
                  <span v-else></span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="司机电话:">
                  <template v-if="props.row.ordCommonTruck!== null">
                    <span v-if="props.row.ordCommonTruck.driverVOS[0].phone !== null">{{ props.row.ordCommonTruck.driverVOS[0].phone }}</span>
                    <span v-else></span>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="发货时间:">
                  <template v-if="props.row.sendGoodsDate !== null">
                    <span>{{ props.row.sendGoodsDate | moment('YYYY-MM-DD') }}</span>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="收货时间:">
                  <template v-if="props.row.pickGoodsDate !== null">
                    <span>{{ props.row.pickGoodsDate | moment('YYYY-MM-DD') }}</span>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="收货时间:">
                  <span>{{ props.row.shipper }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="备注:">
                  <template v-if="props.row.ordCommonTruck !==null">
                    <span>{{ props.row.ordCommonTruck.remarks }}</span>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index"
                       width="50"
                       fixed>
      </el-table-column>
      <el-table-column align="center"
                       label="订单号"
                       fixed>
        <template slot-scope="scope">
          <span @click="handleUpdateByLink(scope.row.id)"
                class="C_Link">{{ scope.row.morderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="订单状态"
                       fixed>
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'">草稿状态</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="客户名称"
                       fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="发货城市">
        <template slot-scope="scope">
          <span>{{scope.row.sendGoodsPlace}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="收货城市">
        <template slot-scope="scope">
          <span>{{scope.row.pickGoodsPlace}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="车牌号">
        <template slot-scope="scope">
          <template v-if="scope.row.ordCommonTruck !== null">
            <span>{{ scope.row.ordCommonTruck.plateNumber }}</span>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="操作"
                       fixed="right"
                       align="center">
        <template slot-scope="scope">
          <el-button size="small"
                     type="success"
                     @click="handleSendDriver(scope.row)">发送司机
          </el-button>
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
import {
  delObj,
  downloadPhImportModelObj,
  exportObj,
  fetchList,
  getallCustomerObj,
  getRateValidation,
  importObj,
  sendNewByIdObj
} from '@/api/ordCommonGoods'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'
import router from '@/router/router'

export default {
  name: 'table_ord_common_goods',
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
      rules: {},
      form: {},
      ord_common_goods_upd: false,
      ord_common_goods_del: false,
      tableKey: 0,
      allCustomerReq: [],
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
    this.getList()
    this.ord_common_goods_upd = this.permissions['ord_common_goods_upd']
    this.ord_common_goods_del = this.permissions['ord_common_goods_del']
    this.hanleAllCustomer()
  },

  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    hanleAllCustomer () {
      getallCustomerObj().then(res => {
        this.allCustomerReq = res.data
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
    handleUpdate () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要修改的数据',
          type: 'warn',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        router.push({ path: '/order/ordCommonGoods', query: { id: this.multipleSelection[0].id } })
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行修改',
          type: 'error',
          duration: 2000
        })
      }
    },
    handleUpdateByLink (id) {
      router.push({ path: '/order/ordCommonGoods', query: { id: id } })
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
        const str = {}
        for (let i = 0; i < this.multipleSelection.length; i++) {
          str[this.multipleSelection[i].id] = this.multipleSelection[i].morderId
        }
        let status = true
        for (let i = 0; i < this.multipleSelection.length; i++) {
          str[this.multipleSelection[i].id] = this.multipleSelection[i].morderId
          if (this.multipleSelection[i].status === '2') {
            status = false
          }
        }
        this.$confirm('是否要删除订单数据', '提示', {
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
            } else {
              this.$notify.error('删除失败，请重新删除')
            }
          })
        })
      }
    },
    handleSendDriver (row) {
      if (row.ordCommonTruck !== null) {
        getRateValidation().then(res => {
          if (!res.data) {
            this.$message.error('税率不能为空,请先前往系统设置界面设置税率')
          } else {
            sendNewByIdObj(row.id).then(response => {
              this.getList()
              if (response.data.data) {
                this.$notify({
                  title: '成功',
                  message: '发送成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$message.error(response.data.msg)
              }
            })
          }
        })
      } else {
        this.$notify({
          title: '警告',
          message: '请完善订单信息后再发送给司机',
          type: 'warning',
          duration: 2000
        })
      }
    },
    // 导入
    importExe () {
      this.$refs.menuFile.value = ''
      this.$refs.menuFile.click()
    },
    getFile (event) {
      this.upath = event.target.files[0]
      const zipFormData = new FormData()
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

    handleDownloadMB () {
      downloadPhImportModelObj().then(response => {
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
        const fileName = nowDate + '-普货订单模板.xls'
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
    },
    handleExport () {
      let str = ''
      if (this.multipleSelection.length !== 0) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          str += this.multipleSelection[i].id + ','
        }
        exportObj(str).then(response => {
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
          const fileName = nowDate + '-普货订单信息.xls'
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
    }
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

.C_Link:visited {
  color: #660099;
}

.demo-table-expand .el-form-item__label {
  color: #99a9bf;
}
</style>
