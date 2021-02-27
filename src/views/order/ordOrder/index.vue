<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" label-width="100px" class="filter-item">
        <!--<div>-->
          <!--<addressCom :address1="address0"></addressCom>-->
        <!--</div>-->
        <el-col :span="6">
          <el-form-item label="订单号 " class="filter-item">
            <el-input
              @keyup.enter.native="handleFilter"
              class="filter-item"
              v-model="listQuery.orderId"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="客户名称 " class="filter-item">
            <el-input
              @keyup.enter.native="handleFilter"
              class="filter-item"
              v-model="listQuery.customerName"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="车牌号 " class="filter-item">
            <el-input
              @keyup.enter.native="handleFilter"
              class="filter-item"
              v-model="listQuery.plateNumber"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="箱号" class="filter-item">
            <el-input
              @keyup.enter.native="handleFilter"
              class="filter-item"
              v-model="listQuery.containerNo"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="舱位号" class="filter-item">
            <el-input
              @keyup.enter.native="handleFilter"
              class="filter-item"
              v-model="listQuery.classOrder"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="去/回程 " class="filter-item">
            <el-select
              class="filter-item"
              filterable
              placeholder="请选择"
              v-model="listQuery.type"
              @change="handleFilter"
              @keyup.enter.native="handleFilter"
              clearable="clearable"
            >
              <el-option
                v-for="item in OrderType"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-button
          v-if="ord_order_exp"
          class="filter-item"
          style="margin-left: 10px;"
          @click="handleExp"
          type="primary"
          icon="edit"
          size="mini"
        >导出
        </el-button>
        <el-button
          v-if="ord_order_uploads"
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="edit"
          size="mini"
          @click="importExe"
        >批量上传
        </el-button>
        <input type="file" @change="getFile($event)" style="display:none" ref="menuFile">

        <el-button
          v-if="ord_order_downloads"
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="edit"
          size="mini"
          @click="handleDownloadObj"
        >下载模板
        </el-button>
        <el-button
          v-if="ord_order_add"
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          size="mini"
          @click="handleCreate"
        >添加
        </el-button>
        <el-button
          v-if="ord_order_upd"
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          size="mini"
          @click="handleUpdate"
        >编辑
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
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="table-expand">
            <el-col :span="6">
              <el-form-item label="订单类型：">
                <span v-if="scope.row.type==null || scope.row.type==''">暂无</span>
                <span v-else>{{ scope.row.type }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="箱号：" class="table-expand">
                <span v-if="scope.row.containerNo==null || scope.row.containerNo==''">暂无</span>
                <span v-else>{{ scope.row.containerNo }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车辆类型：" class="table-expand">
                <span v-if="scope.row.truckAttribute==null || scope.row.truckAttribute==''">暂无</span>
                <span v-else>{{ scope.row.truckAttribute }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车牌号：" class="table-expand">
                <span v-if="scope.row.plateNumber==null || scope.row.plateNumber==''">暂无</span>
                <span v-else>{{ scope.row.plateNumber }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="司机：" class="table-expand">
                <span v-if="scope.row.driverVO != null">{{ scope.row.driverVO.driverName }}</span>
                <span v-else>暂无</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务员：" class="table-expand">
                <span v-if="scope.row.salesman==null || scope.row.salesman==''">暂无</span>
                <span v-else>{{ scope.row.salesman }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="调度员：" class="table-expand">
                <span v-if="scope.row.scheduleman==null || scope.row.scheduleman==''">暂无</span>
                <span v-else>{{ scope.row.scheduleman }}</span>
              </el-form-item>
            </el-col>

             <el-col :span="6">
              <el-form-item label="录单员：" class="table-expand">
                <span v-if="scope.row.createBy==null || scope.row.createBy==''">暂无</span>
                <span v-else>{{ scope.row.createBy }}</span>
              </el-form-item>
            </el-col>

            
          </el-form>
        </template>
      </el-table-column>

      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column align="center" label="订单id" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单来源">
        <template slot-scope="scope">
          <span v-if="scope.row.upstreamId !=null && scope.row.upstreamId != ''">箱行亚欧订单</span>
          <span v-if="scope.row.upstreamId==null || scope.row.upstreamId == ''"></span>
          ~{{scope.row.upstreamId}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上游订单提送货日期">
        <template slot-scope="scope">{{scope.row.pickupOrSendGoodsDate}}</template>
      </el-table-column>

      <el-table-column align="center" label="客户名称">
        <template slot-scope="scope">
          <span v-if="scope.row.customerVO != null">{{ scope.row.customerVO.customerName }}</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单编号">
        <template slot-scope="scope">
          <span @click="handleUpdate1(scope.row)" class="cursorcss">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="舱位号">
        <template slot-scope="scope">
          <span>{{ scope.row.classOrder }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="班列日期">
        <template slot-scope="scope">
          <!--<span>{{ scope.row.classDate  | parseTime('{y}-{m}-{d}') }}</span>-->
          <span>{{ scope.row.classDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="派车日期">
        <template slot-scope="scope">
          <span>{{scope.row.sendTruckDate}}</span>
          <!--<span>{{ scope.row.sendTruckDate | parseTime('{y}-{m}-{d}') }}</span>-->
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="订单类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="箱号">
        <template slot-scope="scope">
          <span>{{ scope.row.containerNo }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车辆类型">
        <template slot-scope="scope">
          <span>{{ scope.row.truckAttribute }}</span>
        </template>
        A
      </el-table-column>
      <el-table-column align="center" label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="司机">
        <template slot-scope="scope">
          <span v-if="scope.row.driverVO != null">{{ scope.row.driverVO.driverName }}</span>
          <span v-else></span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="业务员">
        <template slot-scope="scope">
          <span>{{ scope.row.salesman }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="调度员">
        <template slot-scope="scope">
          <span>{{ scope.row.scheduleman }}</span>
        </template>
      </el-table-column>-->

      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='0'">草稿</span>
          <span v-if="scope.row.status=='1'">待派车</span>
          <span v-if="scope.row.status=='2'">待接单</span>
          <span v-if="scope.row.status=='3'">待提箱</span>
          <span v-if="scope.row.status=='4'">提箱中</span>
          <span v-if="scope.row.status=='5'">待提货</span>
          <span v-if="scope.row.status=='6'">提货中</span>
          <span v-if="scope.row.status=='7'">运输中</span>
          <span v-if="scope.row.status=='8'">签收中</span>
          <span v-if="scope.row.status=='9'">已签收</span>
          <span v-if="scope.row.status=='10'">还箱中</span>
          <span v-if="scope.row.status=='11'">已还箱</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="sendMsg(scope.row)">发送司机</el-button>
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

    <el-dialog class="c_dialog80" :visible.sync="dialogFormVisible" center>
      <orderManager
        :orderManagerId="this.orderManagerId"
        :dialogStatus="this.dialogStatus"
        v-on:closeMain="closeMain"
      ></orderManager>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          size="medium"
          type="primary"
          class="bigButton"
        >关 闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span>是否确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBeforeDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import router from '@/router/router'
  import {
    addObj,
    delObj,
    downloadObj,
    expObj,
    fetchList,
    importObj,
    order_status,
    order_type,
    putObj,
    sendDriverObj,
    getRateValidation,
    truck_attribute
  } from '@/api/ord_order'
  import { orderType } from '@/api/orderManager'
  import orderManager from './orderManager.vue'
   import addressCom from './addressCom.vue'

  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_ord_order',
    directives: {
      waves
    },
    data() {
      return {
        centerDialogVisible: false,
        orderManagerId: null,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          status: '0',
          orderId: null,
          customerName: null,
          plateNumber: null
        },
        listQuery1: {
          status: '0',
          orderId: null,
          customerName: null,
          plateNumber: null,
          orderIds: null,
          containerNo: null,
          classOrder: null,
          type: null
        },
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
        form: {
          classDate: '',
          sendTruckDate: '',
          type: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        ord_order_add: true,
        ord_order_upd: false,
        ord_order_del: false,
        ord_order_exp: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        CarType: [],
        multipleSelection: [],
        OrderStatus: [],
        OrderType: [],
        typeReq: [],
        address0:{
              addType:'0',
              addressCity:'',
              addressDetailPlace:'',
              planTime:'',
              contacts:'',
              contactsPhone:'',

              sort:0,
              location:''

            },
      }
    },
    computed: {
      ...mapGetters(['permissions'])
    },
    components: {
      orderManager,
      addressCom
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
      this.truckList()
      this.orderStatusList()
      this.orderTypeList()
      this.ord_order_exp = this.permissions['ord_order_exp']
      this.ord_order_add = this.permissions['ord_order_add']
      this.ord_order_upd = this.permissions['ord_order_upd']
      this.ord_order_del = this.permissions['ord_order_del']
      this.ord_order_uploads = this.permissions['ord_order_uploads']
      this.ord_order_downloads = this.permissions['ord_order_downloads']
    },
    methods: {
      closeMain: function(obj) {
        alert(obj)
        this.dialogFormVisible = obj
        // location.reload()
        this.getList()
      },
      sendMsg: function(row) {
        let resObj = {
          orderId: row.orderId,
          driverId: row.driverId,
          driverPhone: row.driverPhone,
          plateNumber: row.plateNumber
        }
        if (row.driverId == null || row.driverId == '') {
          this.$notify({
            title: '提示',
            message: '抱歉，请先选择司机信息',
            type: 'warning',
            duration: 2000
          })
        } else {
          getRateValidation().then(res => {
            if (!res.data) {
              this.$message.error('税率不能为空,请先前往系统设置界面设置税率')
            } else {
              sendDriverObj(resObj).then(res => {
                if (res.data.data) {
                  this.$notify({
                    title: '成功',
                    message: '发送成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.getList()
                } else {
                  this.$message.error(res.data.msg)
                }
              })
            }
          })
        }
      },
      truckList() {
        truck_attribute().then(response => {
          this.CarType = response.data
        })
      },
      orderStatusList() {
        order_status().then(response => {
          this.OrderStatus = response.data
        })
      },
      orderTypeList() {
        order_type().then(response => {
          this.OrderType = response.data
        })
      },
      getList() {
        this.listLoading = false
        debugger
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleExp() {
        let str = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (i === this.multipleSelection.length - 1) {
            str += this.multipleSelection[i].orderId
          } else {
            str += this.multipleSelection[i].orderId + ','
          }
        }
        if (this.multipleSelection.length !== 0) {
          this.listQuery1.orderIds = str
          expObj(this.listQuery1).then(response => {
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
            downloadElement.download = nowDate + '-订单信息.xls' // xxx.xls/xxx.xlsx
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
            title: '提示',
            message: '请选择要导出的数据',
            type: 'warning',
            duration: 2000
          })
        }
      },
      handleDownloadObj() {
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
          downloadElement.download = nowDate + '-订单模板.xls' // xxx.xls/xxx.xlsx
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
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleBeforeDelete() {
        this.centerDialogVisible = false
        //   this.handleDelete()
      },
      handleDelete() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除的数据',
            type: 'warning',
            duration: 2000
          })
        } else {
          this.handleBeforeDelete()
          let orderIdarr = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            orderIdarr.push(this.multipleSelection[i].orderId)
          }
          let params = orderIdarr.join(',')
          delObj(params).then(response => {
            this.dialogFormVisible = false
            this.getList()
            if (response.data.data) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '提示',
                message: response.data.msg,
                type: 'warning',
                duration: 2000
              })
            }
          })
        }
      },
      handleUpdate1(obj) {
        this.multipleSelection = []
        this.multipleSelection.push(obj)
        this.handleUpdate()
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
          // router.push({ name: '集装箱订单创建', params: { orderId: this.multipleSelection[0].orderId } })
          router.push({
            path: '/order/orderManager',
            query: { orderId: this.multipleSelection[0].orderId }
          })
          // this.orderManagerId = this.multipleSelection[0].orderId;
          // this.dialogStatus = "update";
          // this.dialogFormVisible = true;
        } else {
          this.$notify({
            title: '警告',
            message: '只能选择一行数据进行修改',
            type: 'error',
            duration: 2000
          })
        }
      },
      handleCreate() {
        router.push({ path: '/order/orderManager' })
        this.resetTemp()
        this.orderManagerId = null
        this.dialogStatus = 'create'
        //  this.dialogFormVisible = true;
      },
      importExe() {
        this.$refs.menuFile.value = ''
        this.$refs.menuFile.click()
      },
      getFile(event) {
        this.upath = event.target.files[0]
        var zipFormData = new FormData()
        zipFormData.append('file', this.upath)
        this.loading = true
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
            this.$notify({
              title: '提示',
              message: res.data.msg,
              type: 'warning',
              duration: 2000
            })
          }
        })
      }
    }
  }
</script>
<style>
  .c_dialog80 .el-dialog {
    width: 80% !important;
    margin-top: 4vh !important;
    margin-left: 26vh;
    min-width: 1200px;
  }

  .c_dialog80 .el-dialog__header {
    padding: 0;
  }

  .bigButton {
    padding: 10px 50px;
  }

  .css_click {
    color: #2d8cf0;
    padding-bottom: 10px;
    cursor: pointer;
    text-decoration-line: underline;
  }

  .table-expand .el-form-item__label {
    color: #000;
    font-weight: bold;
    /* background: #e5e5e5; */
    padding: 2px 10px;
  }

  .table-expand .el-form-item__content {
    margin-left: 20px;
  }

  .cursorcss {
    color: #409EFF;
    cursor: pointer;
  }
</style>

