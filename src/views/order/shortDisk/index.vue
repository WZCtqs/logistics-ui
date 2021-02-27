<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form ref="form" :model="listQuery" label-width="100px" class="filter-item">
        <el-col :span="6">
          <el-form-item label="运单号 " class="filter-item">
            <el-input @keyup.enter.native="handleFilter"
                      class="filter-item"
                      v-model="listQuery.orderId"></el-input>
          </el-form-item>
        </el-col>
 
        <el-col :span="6">
          <el-form-item label="路线" class="filter-item">
            <el-select
              class="filter-item"
              filterable
              placeholder="请选择"
              v-model="listQuery.transLine"
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="item in transLineList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务种类 " class="filter-item">
            <el-select
              class="filter-item"
              filterable
              placeholder="请选择"
              v-model="listQuery.shortType"
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="item in shortTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车牌号 " class="filter-item">
            <el-input @keyup.enter.native="handleFilter"
                      class="filter-item"
                      v-model="listQuery.plateNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务日期" class="filter-item">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="listQuery.orderDate" style="width: 100%;"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" align="center">--</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="listQuery.orderDateTo" style="width: 100%;"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-button class="filter-item" style="margin-left: 10px;" @click="importExe" type="primary" size="mini"
                   icon="edit">导入
        </el-button>
        <input type="file" @change="getFile($event)" style="display:none" ref="menuFile"/>
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleExp" type="primary" size="mini"
                   icon="edit">导出
        </el-button>
        <el-button v-if="ord_order_downloads" class="filter-item" style="margin-left: 10px;"
                   type="primary" icon="edit" size="mini" @click="handleDownloadObj">下载模板
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleFilter" type="primary" size="mini"
                   icon="edit">搜索
        </el-button>
        <el-button v-if="ord_short_order_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate"
                   size="mini" type="primary" icon="edit">添加
        </el-button>
        <el-button v-if="ord_short_order_upd" class="filter-item" style="margin-left: 10px;" @click="handleUpdate"
                   size="mini" type="primary" icon="edit">编辑
        </el-button>
        <el-button v-if="ord_short_order_upd" class="filter-item" style="margin-left: 10px;" @click="handleDetail"
                   size="mini" type="primary" icon="edit">查看
        </el-button>


        <el-button v-if="ord_short_order_del" class="filter-item" style="margin-left: 10px;" @click="handleDelete"
                   size="mini" type="primary" icon="edit">删除
        </el-button>
      </div>

    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column type="expand" fixed>
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row>
  
              <el-col :span="5" :offset="3">
                <el-form-item label="短驳次数:">
                  <span>{{ props.row.shortTransSum }}</span>
                </el-form-item>
              </el-col>
               <el-col :span="5">
                <el-form-item label="应收单价(元):">
                  <span>{{ props.row.recPrice }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="应收费用:">
                  <span>{{ props.row.receivables }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="5">
                <el-form-item label="应收备注:">
                  <span>{{ props.row.receivables }}</span>
                </el-form-item>
              </el-col>
             
            </el-row>
            <el-row>
            
 

              
              <el-col :span="5" :offset="3">
                <el-form-item label="应付单价(元):">
                  <span>{{ props.row.price }}</span>
                </el-form-item>
              </el-col>
               <el-col :span="5">
                <el-form-item label="应付单价:">
                  <span>{{ props.row.needPay }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="应付备注:">
                  <span>{{ props.row.needPayRemark }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>

       <el-table-column align="center" label="盘短订单编号">
        <template slot-scope="scope">
          <span @click="handleUpdate1(scope.row)" class="cursorcss">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      
       <el-table-column align="center" label="托运客户">
        <template slot-scope="scope">
          <span>{{ scope.row.customer }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="业务日期">
        <template slot-scope="scope">
          <span>{{ scope.row.orderDate }}</span>
        </template>
      </el-table-column>

        <el-table-column align="center" label="业务种类">
        <template slot-scope="scope">
          <span>{{ scope.row.shortType }}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="仓位号">
        <template slot-scope="scope">
          <span>{{ scope.row.classOrder }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="运输路线">
        <template slot-scope="scope">
          <span>{{ scope.row.transLine }}</span>
        </template>
      </el-table-column>

       
       <el-table-column align="center" label="班列日期">
        <template slot-scope="scope">
            <span>{{ scope.row.classDate | moment('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="空重箱">
        <template slot-scope="scope">
          <span>{{ scope.row.isHeavy }}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="集装箱号">
        <template slot-scope="scope">
          <span>{{ scope.row.containerNo }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="集装箱型">
        <template slot-scope="scope">
          <span>{{ scope.row.containerType }}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="集装箱量">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsSum }}</span>
        </template>
      </el-table-column>

       <el-table-column align="center" label="司机姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>

        

     

     

      <!--<el-table-column align="center" label="品名">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.goodsName }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column align="center" label="空重箱">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.isHeavy }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

    

      <!--<el-table-column align="center" label="路线">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.transLine }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>

     
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog class="c_dialog80" :visible.sync="dialogFormVisible" center>
      <shortDiskEdit :shortDiskEditId="this.shortDiskEditId" :currentState="this.currentState"
                     v-on:closeMain="closeMain"></shortDiskEdit>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="medium" type="primary"
                           class="bigButton">关 闭</el-button>
            </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>是否确定删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleBeforeDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addObj,
    delObj,
    downloadObj,
    expObj,
    fetchList,
    importObj,
    putObj,
    short_order_line,
    short_order_type
  } from '@/api/ord_short_order'
  import shortDiskEdit from './shortDiskEdit.vue'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_ord_short_order',
    directives: {
      waves
    },
    data() {
      return {
        centerDialogVisible: false,
        currentState: null,
        shortDiskEditId: null,
        shortTypeList: [],
        transLineList: [],
        multipleSelection: [],
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          orderId: null,
          orderDate: null,
          orderDateTo: null,
          shortType: null,
          transLine: null,
          plateNumber: null
        },
        rules: {},
         form: {
          classOrder:null,
          classDate:null,
          orderDate: null,
          customerId: null,
          customer: null,
          carrier: null,
          goodsName: null,
          containerNo: null,
          goodsSum: null,
          weight: null,
          isHeavy: null,
          shortType: null,
          transLine: null,
          receiverPeople: null,
          exception: null,
          remark: null,
          driverId: null,
          driverName: null,
          salesman: null,
          scheduleman: null,
          shortTransSum: null,
          recPrice: null,
          recOtherFee: null,
          recOutTimeFee: null,
          recParkingFee: null,
          receivables: null,
          receivablesRemark: null,
          price: null,
          payOtherFee: null,
          payOutTimeFee: null,
          payParkingFee: null,
          needPay: null,
          needPayRemark: null
        },
        dialogFormVisible: false,
        dialogStatus: '',
        ord_short_order_add: false,
        ord_short_order_upd: false,
        ord_short_order_del: false,
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
      this.ord_short_order_add = this.permissions['ord_short_order_add']
      this.ord_short_order_upd = this.permissions['ord_short_order_upd']
      this.ord_short_order_del = this.permissions['ord_short_order_del']
      this.ord_order_downloads = this.permissions['ord_order_downloads']
      this.getTransLineList()
      this.getShortTypeList()
    },
    components: {
      shortDiskEdit
    },
    methods: {
      closeMain: function(obj) {
        this.dialogFormVisible = obj
        this.getList()
      },
      handleDownloadObj() {

        downloadObj().then(response => {
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
          downloadElement.download = nowDate + '-订单模板.xls'　　　　　　　　　　// xxx.xls/xxx.xlsx
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
            this.$message.error(res.data.msg)
          }
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleUpdate1(obj){
          this.multipleSelection=[]
          this.multipleSelection.push(obj)
          this.handleUpdate()
      },
      handleUpdate() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要查看的数据',
            type: 'warning',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          this.dialogFormVisible = true
          this.currentState = false
          this.shortDiskEditId = this.multipleSelection[0].orderId
          //   router.push({ path: '/order/shortDiskEdit', query: { id:this.multipleSelection[0].orderId }})
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，只能选择一条数据',
            type: 'warning',
            duration: 2000
          })
        }
      },
      handleDetail() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要查看的数据',
            type: 'warning',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          this.dialogFormVisible = true
          this.currentState = true
          this.shortDiskEditId = this.multipleSelection[0].orderId
          //   router.push({ path: '/order/shortDiskEdit', query: { id:this.multipleSelection[0].orderId }})
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，只能选择一条数据',
            type: 'warning',
            duration: 2000
          })
        }
      },
      getTransLineList() {
        short_order_line().then(response => {
          this.transLineList = response.data
        })
      },
      getShortTypeList() {
        short_order_type().then(response => {
          this.shortTypeList = response.data
        })
      },

      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          for (var item in response.data.records) {
            var dateee = new Date(response.data.records[item].orderDate).toJSON()
            var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
            response.data.records[item].orderDate = date
          }
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
      handleExp() {
        let str = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (i === this.multipleSelection.length - 1) {
            str += this.multipleSelection[i].orderId
          } else {
            str += this.multipleSelection[i].orderId + ','
          }
        }
        this.listQuery.orderId = str
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '警告',
            message: '选择导出的数据',
            type: 'warning',
            duration: 2000
          })
        } else {
          expObj(this.listQuery).then(response => {
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

            downloadElement.download = nowDate + '-盘短订单信息.xls'　　　　　　　　　　// xxx.xls/xxx.xlsx

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
        }
      },
      handleBeforeDelete() {
        this.centerDialogVisible = false
        // this.handleDelete()
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
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].orderId + ','
          }
          str = str.substring(0, str.length - 1)
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
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.shortDiskEditId=null
        this.dialogFormVisible = true
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form)
              .then(() => {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
          } else {
            this.$message.error('必填项不能为空')
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      update(formName) {
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
            this.$message.error('必填项不能为空')
            return false
          }
        })
      }
    }
  }
</script>
<style>
  .el-table {
    overflow: scroll;
  }

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

    .cursorcss {
    color: #409EFF;
    cursor: pointer;
  }
</style>


