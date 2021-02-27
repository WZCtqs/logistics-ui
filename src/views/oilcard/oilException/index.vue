<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px"
               class="filter-item">
        <el-form-item label="异常类型 "
                      class="filter-item">
          <el-select class="filter-item"
                     filterable
                     placeholder="请选择"
                     v-model="listQuery.exceptionType"
                     @change="handleFilter"
                     clearable>
            <el-option v-for="item in exceptionTypeReq"
                       :key="item.id"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-col :span="6">
          <el-form-item label="车辆类型 "
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.attribute"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in attributeReq"
                         :key="item.id"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="处理状态"
                        class="filter-item">
            <el-select class="filter-item"
                       v-model="listQuery.status"
                       @change="handleFilter"
                       filterable
                       placeholder="请选择"
                       clearable>
              <el-option v-for="item in statusReq"
                         :key="item.id"
                         :label="item.label"
                         :value="item.value">
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
                       v-model="listQuery.plateNumber"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in plateNumberReq"
                         :key="item.id"
                         :label="item.plateNumber"
                         :value="item.plateNumber">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="油卡号"
                        class="filter-item">
            <el-input @keyup.enter.native="handleFilter"
                      class="filter-item"
                      v-model="listQuery.oilCardId"
                      clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发起日期"
                        class="filter-item">
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.beginTime"
                              style="width: 100%;"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              clearable></el-date-picker>
            </el-col>
            <el-col class="line"
                    :span="2"
                    align="center">--
            </el-col>
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.endTime"
                              style="width: 100%;"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"
                              clearable></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-button v-if="oil_exception_exp"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleExp"
                   type="primary"
                   icon="edit"
                   size="mini">导出
        </el-button>
        <el-button v-if="oil_exception_add"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleCreate"
                   type="primary"
                   icon="edit"
                   size="mini">新增
        </el-button>
        <el-button v-if="oil_exception_upd"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleUpdate">编辑
        </el-button>
        <el-button v-if="oil_exception_del"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleDelete">删除
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
      <el-table-column type="expand" fixed>
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row>
              <el-col :span="7" :offset="3">
                <el-form-item label="联系方式:">
                  <span>{{ props.row.driverPhone }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="车辆类型:">
                  <span v-if="props.row.attribute === '0'">自有车</span>
                  <span v-if="props.row.attribute === '1'">挂靠车</span>
                  <span v-if="props.row.attribute === '2'">外调车</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="充值主卡号:">
                  <span>{{ props.row.majorNumber }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="3">
                <el-form-item label="补办卡分公司:">
                  <span>{{ props.row.makeupPlace }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="申请备注:">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="异常id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.exceptionId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="车辆类型">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.attribute === '0'">自有车</span>-->
      <!--<span v-if="scope.row.attribute === '1'">挂靠车</span>-->
      <!--<span v-if="scope.row.attribute === '2'">外调车</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="司机">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="联系方式">
        <template slot-scope="scope">
          <span>{{ scope.row.driverPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="异常发起日期">
        <template slot-scope="scope">
          <span>{{ scope.row.exceptionDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="异常类型">
        <template slot-scope="scope">
          <span v-if="scope.row.exceptionType === '1'">挂失</span>
          <span v-if="scope.row.exceptionType === '2'">解锁</span>
          <span v-if="scope.row.exceptionType === '3'">消磁</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="油卡号">
        <template slot-scope="scope">
          <span>{{ scope.row.oilCardNumber }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="充值主卡号">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.majorNumber }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="油卡类型">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.cardType }}</span> -->
          <span v-if="scope.row.cardType === '0'">普卡</span>
          <span v-if="scope.row.cardType === '1'">专卡限制车号</span>
          <span v-if="scope.row.cardType === '2'">柴油专用卡</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="补办油卡号">
        <template slot-scope="scope">
          <span>{{ scope.row.makeupCardNumber }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="补办卡分公司">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.makeupPlace }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="处理操作">
        <template slot-scope="scope">
          <el-button v-show="scope.row.status=='1'"
                     size="mini"
                     type="success">已处理
          </el-button>
          <el-button size="mini"
                     type="primary"
                     v-show="scope.row.status=='0'"
                     @click="handleBing(scope.row)">处理
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="申请备注">
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
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="100px">
        <el-form-item label="租户id"
                      prop="tenantId"
                      v-if="false">
          <el-input v-model="form.tenantId"
                    placeholder="租户id"></el-input>
        </el-form-item>
        <el-form-item label="油卡id"
                      prop="oilCardId"
                      v-if="false">
          <el-input v-model="form.oilCardId"
                    placeholder="油卡id"></el-input>
        </el-form-item>
        <el-form-item label="油卡号"
                      prop="oilCardNumber">
          <el-select class="filter-item"
                     v-model="form.oilCardNumber"
                     placeholder="请选择"
                     @change="getoilCardObjList(form.oilCardNumber)">
            <el-option v-for="item in allOilCardNumberReq"
                       :key="item.oilCardId"
                       :label="item.oilCardNumber"
                       :value="item.oilCardNumber">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号"
                      prop="plateNumber">
          <el-input v-model="form.plateNumber"
                    placeholder="车牌号"
                    :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="车辆类型"
                      prop="attribute">
          <!-- <el-input v-model="form.attribute" placeholder="车辆类型" ></el-input> -->
          <el-select class="filter-item"
                     filterable
                     placeholder="请选择"
                     v-model="form.attribute"
                     @keyup.enter.native="handleFilter"
                     clearable
                     :disabled="true">
            <el-option v-for="item in attributeReq"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="司机"
                      prop="driverName">
          <el-input v-model="form.driverName"
                    placeholder="司机"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系方式"
                      prop="driverPhone">
          <el-input v-model="form.driverPhone"
                    placeholder="联系方式"
                    :disabled="true"></el-input>
        </el-form-item>
        <!-- <el-form-item label="发起日期"
                      prop="username">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="form.exceptionDate"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item> -->
        <el-form-item label="油卡类型"
                      prop="username">
          <!-- <el-input v-model="form.cardType"
                    placeholder="油卡类型"></el-input> -->
          <el-select class="filter-item"
                     v-model="form.cardType"
                     placeholder="请选择"
                     clearable
                     :disabled="true">
            <el-option v-for="item in oilReq"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="异常类型"
                      prop="exceptionType">
          <el-select class="filter-item"
                     filterable
                     placeholder="请选择"
                     v-model="form.exceptionType"
                     @keyup.enter.native="handleFilter"
                     clearable>
            <el-option v-for="item in exceptionTypeReq"
                       :key="item.id"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="补办卡分公司"
                      prop="username">
          <el-input v-model="form.makeupPlace"
                    placeholder="补办卡分公司"></el-input>
        </el-form-item>
        <el-form-item label="申请备注"
                      prop="username">
          <el-input v-model="form.remark"
                    placeholder="申请备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="create('form')">确 定
        </el-button>
        <el-button v-else
                   type="primary"
                   @click="update('form')">修 改
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible1">
      <el-form :model="form1"
               :rules="rules"
               ref="form1"
               label-width="100px">
        <el-form-item label="副卡"
                      class="filter-item">
          <el-select class="filter-item"
                     filterable
                     placeholder="补办油卡号"
                     v-model="form1.makeupCardNumber"
                     clearable>
            <el-option v-for="item in fuoilCardReq"
                       :key="item.oilCardId"
                       :label="item.oilCardNumber"
                       :value="item.oilCardNumber">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="handleJy('form1')">确定
        </el-button>
        <el-button @click="cancel1()">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addObj,
    delObj,
    editStatusObj,
    expObj,
    fetchList,
    getallOilCardNumberObj,
    getattributeObj,
    getexceptionTypeObj,
    getOilcardNumObj,
    getoilCardObj,
    getoilObj,
    getplateNumberObj,
    getstatusObj,
    putObj
  } from '@/api/oil_exception'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_oil_exception',
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        makeupCardNumber: '',
        listQuery: {
          page: 1,
          limit: 20
        },
        rules: {
          oilCardNumber: [
            { required: true, message: '请选择油卡号', trigger: 'change' }
          ],
          exceptionType: [
            { required: true, message: '请选择油卡异常类型', trigger: 'change' }
          ]
        },
        form: {
          tenantId: '',
          truckId: '',
          truckOwner: '',
          attribute: '',
          driverName: '',
          driverPhone: '',
          oilCardId: '',
          plateNumber: '',
          truckOwnerPhone: '',
          exceptionDate: '',
          exceptionType: '',
          cardType: '',
          collarDate: '',
          collarPeople: '',
          makeupCardNumber: '',
          makeupPlace: '',
          status: '',
          remark: ''
        },
        form1: {
          makeupCardNumber: ''
        },
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogStatus: '',
        oil_exception_exp: false,
        oil_exception_add: false,
        oil_exception_upd: false,
        oil_exception_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        multipleSelection: [],
        exceptionTypeReq: [],
        attributeReq: '',
        oilCardNumber: '',
        statusReq: [],
        plateNumberReq: '',
        attribute: '',
        oilCardId: '',
        allOilCardNumber: '',
        oilReq: [],
        allOilCardNumberReq: [],
        oilCardReq: [],
        id: '',
        exceptionId: '',
        fuoilCardReq: []
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
      this.oil_exception_add = this.permissions['oil_exception_add']
      this.oil_exception_upd = this.permissions['oil_exception_upd']
      this.oil_exception_del = this.permissions['oil_exception_del']
      this.oil_exception_exp = this.permissions['oil_exception_exp']
      this.getexceptionTypeObjList()
      this.getattributeObjList()
      this.getstatusObjList()
      this.getplateNumberObjList()
      this.getoilObjList()
      this.getallOilCardNumberObjList()
    },
    methods: {
      getexceptionTypeObjList() {
        getexceptionTypeObj().then(response => {
          this.exceptionTypeReq = response.data
        })
      },
      getallOilCardNumberObjList() {
        getallOilCardNumberObj().then(response => {
          this.allOilCardNumberReq = response.data
        })
      },
      getoilObjList() {
        getoilObj().then(response => {
          this.oilReq = response.data
        })
      },
      getattributeObjList() {
        getattributeObj().then(response => {
          this.attributeReq = response.data
        })
      },
      getstatusObjList() {
        getstatusObj().then(response => {
          this.statusReq = response.data
        })
      },
      getplateNumberObjList() {
        getplateNumberObj().then(response => {
          this.plateNumberReq = response.data
        })
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
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleBing(row) {
        if (row.exceptionType === '1' || row.exceptionType === '3') {
          
          getOilcardNumObj(row.majorId).then(res => {
            
            if (res.data.length) {
              this.id = row.exceptionId
              this.makeupCardNumber = ''
              this.form1.makeupCardNumber = ''
              this.fuoilCardReq = res.data
              this.dialogFormVisible1 = true
            } else {
              this.$message.error('请先添加副卡，暂无多余副卡信息')
            }
          })
        } else {
          const obj = {
            exceptionId: row.exceptionId,
            cardNumber: row.oilCardNumber,
            oilCardId: row.oilCardId
          }
          editStatusObj(obj).then(response => {
            if (response.data.data) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '解锁成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      },
      handleJy(formName) {
        if (this.form1.makeupCardNumber !== '' && this.form1.makeupCardNumber !== null) {
          let obj = {
            exceptionId: this.id,
            cardNumber: this.form1.makeupCardNumber,
            oilCardId: null
          }
          this.fuoilCardReq.forEach(item =>{
            if (this.form1.makeupCardNumber === item.oilCardNumber) {
              obj.oilCardId = item.oilCardId
            }
          })
          const set = this.$refs
          set[formName].validate(valid => {
            if (valid) {
              editStatusObj(obj).then(response => {
                if (response.data.data) {
                  this.dialogFormVisible1 = false
                  this.getList()
                  this.$notify({
                    title: '通过',
                    message: '处理成功',
                    type: 'success',
                    duration: 2000
                  })
                }
              })
              // gettestOilCardNumber2Obj(obj.cardNumber).then(res => {
              //   if (res.data.data === true) {
              //   } else {
              //     this.$message.error('此油卡号已存在请更换')
              //   }
              // })
            }
          })
        } else {
          this.$message.error('请先填写补办油卡号')
        }
      },
      getoilCardObjList(oilCardNumber) {
        this.allOilCardNumberReq.forEach(item => {
          if (oilCardNumber === item.oilCardNumber) {
            getoilCardObj(item.oilCardId).then(response => {
              this.oilCardReq = response.data.data
              this.form.plateNumber = response.data.data.plateNumber
              this.form.driverName = response.data.data.driverName
              this.form.attribute = response.data.data.attribute
              this.form.driverPhone = response.data.data.driverPhone
              this.form.oilCardId = response.data.data.oilCardId
              this.form.cardType = response.data.data.cardType
              // this.form.plateNumber = response.data.data.plateNumber
            })
          }
        })
      },
      handleExp() {
        let str = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (i === this.multipleSelection.length - 1) {
            str += this.multipleSelection[i].exceptionId
          } else {
            str += this.multipleSelection[i].exceptionId + ','
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
            downloadElement.download = nowDate + '-油卡异常.xls'
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
      handleUpdate() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要修改的数据',
            type: 'warn',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          if (this.multipleSelection[0].status !== '1') {
            const row = this.multipleSelection[0]
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.form.oilCardNumber = row.oilCardNumber
            this.form.exceptionId = row.exceptionId
            this.form.truckId = row.truckId
            this.form.attribute = row.attribute
            this.form.plateNumber = row.plateNumber
            this.form.driverName = row.driverName
            this.form.driverPhone = row.driverPhone
            this.form.exceptionDate = row.exceptionDate
            this.form.exceptionType = row.exceptionType
            this.form.oilCardId = row.oilCardId
            this.form.cardType = row.cardType
            this.form.collarDate = row.collarDate
            this.form.collarPeople = row.collarPeople
            this.form.makeupCardNumber = row.makeupCardNumber
            this.form.makeupPlace = row.makeupPlace
            this.form.status = row.status
            this.form.remark = row.remark
          } else {
            this.$notify({
              title: '警告',
              message: '该条数据已处理禁止编辑',
              type: 'error',
              duration: 2000
            })
          }
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
            type: 'warn',
            duration: 2000
          })
        } else {
          var arr = this.multipleSelection.filter(item => {
            return item.status === '1'
          })
          if (arr.length === 0) {
            let str = ''
            for (let i = 0; i < this.multipleSelection.length; i++) {
              str += this.multipleSelection[i].exceptionId + ','
            }
            str = str.substring(0, str.length - 1)
            this.$confirm('是否要删除选中的油卡异常信息', '提示', {
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
            this.$notify.error('该条数据已处理禁止删除')
          }
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
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
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      cancel1() {
        this.dialogFormVisible1 = false
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
            return false
          }
        })
      },
      resetTemp() {
        this.form = {
          truckId: '',
          roleName: undefined,
          roleCode: undefined,
          roleDesc: undefined,
          oilCardNumber: '',
          plateNumber: ''

        }
      }
    }
  }
</script>
