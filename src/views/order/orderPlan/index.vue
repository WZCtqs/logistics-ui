<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form ref="form"  label-width="100px" class="filter-item">
        <el-col :span="6">
          <el-form-item label="订单编号 " class="filter-item">
            <el-input
              @keyup.enter.native="handleFilter"
              class="filter-item"
              clearable
              v-model="listQuery.orderId"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="客户名称 " class="filter-item">
            <el-input
              @keyup.enter.native="handleFilter"
              class="filter-item"
              clearable
              v-model="listQuery.customerName"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="订单状态" class="filter-item">
            <el-select
              class="filter-item"
              filterable
              clearable
              placeholder="请选择"
              v-model="listQuery.status"
              @change="handleFilter"
            >
              <el-option
                v-for="item in statusReq"
                :key="item.id"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          @click="handleExport"
          type="primary"
          icon="edit"
          size="mini"
          v-if="ord_order_exp"
        >导出
        </el-button>
        <el-button
         v-if="ord_order_upd"
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          size="mini"
          @click="handleUpdate"
        >查看
        </el-button>
        <el-button
        v-if="ord_order_del"
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          size="mini"
          @click="handleDelete"
        >删除
        </el-button>
        <el-button
          class="filter-item"
          type="primary"
          size="mini"
          v-waves
          icon="search"
          @click="handleFilter"
        >搜索
        </el-button>
      </div>
    </div>
    <el-table
      :key="tableKey"
      :data="list"
      v-loading="listLoading"
      element-loading-text="给我一点时间"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="订单id" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单编号">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">
          <span>{{ scope.row.statusDec }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户名称">
        <template slot-scope="scope">
          <span>{{ scope.row.customerId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系人">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="始发地">
        <template slot-scope="scope">
          <span>{{ scope.row.pickupGoodsPlace }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="目的地">
        <template slot-scope="scope">
          <span>{{ scope.row.sendGoodsPlace }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="货物名称">
        <template slot-scope="scope">
          <span>{{ scope.row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="箱型*箱量">
        <template slot-scope="scope">
          <span>{{ scope.row.containerType }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提货时间">
        <template slot-scope="scope">
          <span>{{ scope.row.pickupGoodsDate }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      class="c_dialog80"
      :visible.sync="dialogVisible"
      center>
        <orderPlanManager :orderId="orderId" :orderStatus="orderStatus" v-on:closeMain="closeMain"></orderPlanManager>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="medium" type="primary" class="bigButton ">关 闭</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水
  import { fetchList, delObj, exportObj,getDetailByIdObj, getstatusTdObj } from '@/api/orderPlan'
  import orderPlanManager from './orderPlanManager.vue'
  import { mapGetters } from 'vuex'
  export default {
    directives: {
      waves
    },
    components: { orderPlanManager },
    data() {
      return {
        orderManagerId: null,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          status: null,
          orderId: null,
          customerName: null
        },
        tableKey: 0,
        rules: {
          orderId: [],
          classDate: [],
          sendTruckDate: [],
          containerNo: [
            {
              required: true,
              trigger: blur
            }
          ],
          type: [],
          driverId: [],
          customerName: [],
          salesman: [],
          status: [],
          remark: []
        },
        dialogVisible: false,
        ord_order_upd: true,
        ord_order_del: true,
        ord_order_exp: true,
        orderId:null,
        orderStatus:null,
        centerData:[],
        statusReq: []
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
      this.handleStatusTdObj()
      this.ord_order_exp = this.permissions["ord_order_exp"];
      this.ord_order_upd = this.permissions["ord_order_upd"];
      this.ord_order_del = this.permissions["ord_order_del"];
    },
    methods: {
       closeMain: function(obj) {
      this.dialogVisible = obj;
     // location.reload()
      this.getList();
    },
      handleStatusTdObj(){
        getstatusTdObj().then(res => {
          this.statusReq = res.data
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
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
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleExport() {
        let str = ''
        if (this.multipleSelection.length !== 0) {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].orderId + ','
          }
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
          const fileName = nowDate + '-集装箱订单计划.xls'
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
      handleUpdate() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要修改的数据',
            type: 'warning',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          if(this.multipleSelection[0].status !== '03'){
             this.orderId = this.multipleSelection[0].orderId
             this.orderStatus = this.multipleSelection[0].status
             this.dialogVisible = true
            // getDetailByIdObj(this.multipleSelection[0].orderId).then(res => {
            //   this.centerData = res.data.data
            //
            //   this.dialogVisible = true
            // })
          } else {
            this.$notify({
              title: '提示',
              message: '已撤销数据无法修改',
              type: 'warning',
              duration: 2000
            })
          }

         // router.push({ path: '/order/ordCommonGoods', query: { id: this.multipleSelection[0].id }})
        } else {
          this.$notify({
            title: '警告',
            message: '只能选择一行数据进行修改',
            type: 'error',
            duration: 2000
          })
        }
      },
      handleDelete(row) {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除的数据',
            type: 'warning',
            duration: 2000
          })
        } else {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].orderId + ','
          }
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
        }
      }
    }
  }
</script>
<style>
  .c_dialog80 .el-dialog{
    width: 80% !important;
    margin-top: 4vh !important;
    margin-left: 26vh;
    min-width: 1200px;
  }
  .c_dialog80 .el-dialog__header{
    padding: 0;
  }
</style>


