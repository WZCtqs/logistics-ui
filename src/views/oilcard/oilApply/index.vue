<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px"
               class="filter-item">
        <el-col :span="6">
          <el-form-item label="油卡类型"
                        class="filter-item">
            <el-select class="filter-item"
                       v-model="listQuery.applyCardType"
                       @change="handleFilter"
                       filterable
                       placeholder="请选择"
                       clearable>
              <el-option v-for="item in oilcardReq"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="车辆类型 "
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.attribute"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in carReq"
                         :key="item.value"
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
                       v-model="listQuery.truckId"
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
        <el-col :span="12">
          <el-form-item label="办卡日期"
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
        <el-button v-if="oil_apply_exp"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleExp"
                   type="primary"
                   icon="edit"
                   size="mini">导出
        </el-button>
        <el-button v-if="oil_apply_add"
                   class="filter-item"
                   style="margin-left: 10px;"
                   @click="handleCreate"
                   type="primary"
                   size="mini"
                   icon="edit">油卡申请
        </el-button>
        <el-button v-if="oil_apply_upd"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleUpdate">编辑
        </el-button>
        <el-button v-if="oil_apply_del"
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
      <el-table-column type="expand"
                       fixed>
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="联系方式:">
                  <span>{{ props.row.driverPhone }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="发放日期:">
                  <span>{{ props.row.getDate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="分公司:">
                  <span>{{ props.row.openCardPlace }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="已持卡数量:">
                  <span>{{ props.row.truckApplied }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="申请备注:">
                  <span>{{ props.row.applyRemark }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="申请卡号:">
                  <span>{{ props.row.oilCardNumber }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="充值主卡号:">
                  <span>{{ props.row.majorNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="押金:">
                  <span>{{ props.row.deposit }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="申请id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.applyId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车辆类型">
        <template slot-scope="scope">
          <span v-if="scope.row.attribute === '0'">自有车</span>
          <span v-if="scope.row.attribute === '1'">挂靠车</span>
          <span v-if="scope.row.attribute === '2'">外调车</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="司机">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="联系方式">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.driverPhone }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="申请日期">
        <template slot-scope="scope">
          <span>{{ scope.row.applyDate }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="发放日期">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.getDate }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="申请油卡类型">
        <template slot-scope="scope">
          <span v-if="scope.row.applyCardType === '0'">普卡</span>
          <span v-if="scope.row.applyCardType === '1'">专卡限制车号</span>
          <span v-if="scope.row.applyCardType === '2'">柴油专用卡</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="分公司">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.openCardPlace }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="已持卡数量">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.truckApplied }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="申请备注">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.applyRemark }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="审核"
                       width="200">
        <template slot-scope="scope">
          <el-button v-show="scope.row.isPassed=='1'"
                     size="mini"
                     type="success">已通过
          </el-button>
          <el-button v-show="scope.row.isPassed=='2'"
                     size="mini"
                     type="warning">已拒绝
          </el-button>
          <el-button size="mini"
                     type="primary"
                     v-show="scope.row.isPassed=='0'"
                     @click="handleTx(scope.row)">通过
          </el-button>
          <el-button size="mini"
                     type="primary"
                     v-show="scope.row.isPassed=='0'"
                     @click="handleBing1(scope.row)">拒绝
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="绑定">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     v-if="scope.row.isPassed=='1' & scope.row.getStatus=='0'"
                     @click="handleBing(scope.row)">绑定
          </el-button>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="申请卡号">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.oilCardNumber }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="充值主卡号">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.majorNumber }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="押金">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.deposit }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="发放状态">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.getStatus }}</span> -->
          <el-button size="mini"
                     type="primary"
                     v-show="scope.row.isPassed=='1' & scope.row.getStatus=='0' "
                     @click="handleFf(scope.row)"
                     :disabled="sendDis">发放
          </el-button>
          <el-button size="mini"
                     type="primary"
                     v-show="scope.row.getStatus=='1'">已发放
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
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="140px">
        <el-form-item label="申请id"
                      prop="username"
                      v-if="false">
          <el-input v-model="form.applyId"
                    placeholder="申请id"></el-input>
        </el-form-item>
        <el-form-item label="车牌号"
                      prop="truckId">
          <el-select class="filter-item"
                     filterable
                     placeholder="请选择"
                     v-model="form.truckId"
                     clearable
                     @change="getselectByTruckIdObjList(form.truckId)">
            <el-option v-for="item in plateNumberxReq"
                       :key="item.truckId"
                       :label="item.plateNumber"
                       :value="item.truckId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆类型"
                      prop="username">
          <!-- <el-input v-model="form.attribute"
                    placeholder="车辆类型"
                    :disabled="true"></el-input> -->
          <el-select class="filter-item"
                     filterable
                     placeholder="请选择"
                     v-model="form.attribute"
                     @keyup.enter.native="handleFilter"
                     clearable
                     :disabled="true">
            <el-option v-for="item in carReq"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="车主"
                      prop="username">
          <el-input v-model="form.truckOwner"
                    placeholder="车主"
                    :disabled="true"></el-input>
        </el-form-item> -->
        <el-form-item label="司机"
                      prop="ownerDriverId">
          <el-select class="filter-item"
                     filterable
                     placeholder="请选择"
                     v-model="form.ownerDriverId"
                     clearable
                     @change="getselectByDriverIdObjList(form.ownerDriverId)">
            <el-option v-for="item in getDriverByPlateIdReq"
                       :key="item.driverId"
                       :label="item.driverName"
                       :value="item.driverId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式"
                      prop="username">
          <el-input v-model="form.driverPhone"
                    placeholder="联系方式"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请油卡类型"
                      prop="applyCardType">
          <el-select class="filter-item"
                     v-model="form.applyCardType"
                     placeholder="请选择"
                     clearable>
            <el-option v-for="item in oilcardReq"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分公司"
                      prop="openCardPlace">
          <el-input v-model="form.openCardPlace"
                    placeholder="分公司"></el-input>
        </el-form-item>
        <!--<el-form-item label="已持卡数量"-->
        <!--prop="truckApplied">-->
        <!--<el-input v-model="form.truckApplied"-->
        <!--placeholder="已持卡数量"-->
        <!--type="number"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="申请备注"
                      prop="username">
          <el-input v-model="form.applyRemark"
                    placeholder="申请备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   :disabled="btnLoading"
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
        <el-col :span="12">
          <el-form-item label="绑定主卡"
                        class="filter-item"
                        prop="majorId">
            <el-select class="filter-item"
                       v-model="form1.majorId"
                       @change="OilCardChange(form1.majorId)"
                       placeholder="请选择"
                       clearable>
              <el-option v-for="item in getOilMajorNumberReq"
                         :key="item.majorId"
                         :label="item.majorNumber"
                         :value="item.majorId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="副卡"
                        class="filter-item"
                        prop="oilCardNumber">
            <el-select class="filter-item"
                       v-model="form1.oilCardNumber"
                       placeholder="请选择副卡号">
              <el-option v-for="item in OilCardReq"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="押金"
                        class="filter-item"
                        prop="deposit">
            <el-input style="width: 200px;"
                      class="filter-item"
                      placeholder="押金"
                      v-model="form1.deposit">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer"
           class="dialog-footer"
           style="margin-top:100px;">
        <el-button type="primary"
                   @click="ybing('form1')">确 定
        </el-button>
        <el-button @click="cancel1()">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible2">
      <h4 class="tags1">拒绝理由</h4>
      <div class="flexItem cm20">
        <el-form :model="form2"
                 :rules="rules"
                 ref="form2"
                 label-width="100px">
          <el-input placeholder="请输入内容"
                    v-model="isPassedRemark"
                    clearable>
          </el-input>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="handleJy()">发送司机</el-button>
        <el-button @click="cancel2()">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addObj,
    bingingCardObj,
    delObj,
    expObj,
    fetchList,
    getcarObj,
    getoilcardObj,
    getoilCardObj,
    getOilMajorNumberObj,
    getplateNumberObj,
    getplateNumberxObj,
    getselectByDriverIdObj,
    getselectByTruckIdObj,
    getselectDriverPlateIdObj,
    gettestOilCardNumber2Obj,
    isSendObj,
    passedObj,
    putObj
  } from '@/api/oil_apply'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'
  // import { defaultCoreCipherList } from 'constants';

  export default {
    name: 'table_oil_apply',
    directives: {
      waves
    },
    data() {
      return {
        OilCardReq: [],
        list: null,
        total: null,
        listLoading: true,
        isPassedRemark: '',
        listQuery: {
          page: 1,
          limit: 20
        },
        rules: {
          truckId: [
            { required: true, message: '请选择车牌号', trigger: 'change' }
          ],
          dirverName: [
            { required: true, message: '请选择司机', trigger: 'change' }
          ],
          applyCardType: [
            { required: true, message: '请选择申请油卡类型', trigger: 'change' }
          ],
          // truckApplied: [
          //   { required: true, message: '请输入已持卡数量', trigger: 'blur' }
          // ],
          majorId: [
            { required: true, message: '请选择主卡号', trigger: 'change' }
          ],
          oilCardNumber: [
            { required: true, message: '请输入副卡号', trigger: 'blur' }
          ],
          deposit: [
            { required: true, message: '请输入押金', trigger: 'blur' }
          ],
          openCardPlace: [
            { required: true, message: '请输入油卡办卡分公司', trigger: 'blur' }
          ],
          ownerDriverId: [
            { required: true, message: '请选择司机', trigger: 'blur' }
          ]
        },
        form1: {
          applyId: '',
          oilCardNumber: '',
          majorId: '',
          majorNumber: '',
          deposit: ''
        },
        form2: {
          isPassedRemark: ''
        },
        form: {
          applyId: '',
          truckId: '',
          ownerDriverId: '',
          attribute: '',
          driverPhone: '',
          truckOwner: '',
          truckOwnerPhone: '',
          applyCardType: '',
          openCardPlace: '',
          // truckApplied: '',
          applyRemark: ''
        },
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        dialogStatus: '',
        oil_apply_add: false,
        oil_apply_upd: false,
        oil_apply_del: false,
        oil_apply_exp: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        oilcardReq: [],
        oilplaceReq: [],
        plateNumberReq: [],
        getOilMajorNumberReq: [],
        carReq: [],
        attribute: [],
        truckOwner: [],
        truckOwnerPhone: [],
        plateNumberxReq: [],
        getDriverByPlateIdReq: [],
        applyCardType: [],
        openCardPlace: [],
        truckApplied: [],
        applyRemark: [],
        multipleSelection: [],
        applyId: '',
        id: '',
        sendDis: false,
        btnLoading: false
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
      this.getcarObjList()
      this.getoilcardObjList()
      this.getplateNumberObjList()
      this.getOilMajorNumberObjList()
      this.getplateNumberxObjList()
      this.oil_apply_add = this.permissions['oil_apply_add']
      this.oil_apply_upd = this.permissions['oil_apply_upd']
      this.oil_apply_del = this.permissions['oil_apply_del']
      this.oil_apply_exp = this.permissions['oil_apply_exp']
    },
    methods: {
      getList() {
        this.listLoading = false
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
      getoilcardObjList() {
        
        getoilcardObj().then(response => {
          this.oilcardReq = response.data
        })
      },
      getcarObjList() {
        getcarObj().then(response => {
          this.carReq = response.data
        })
      },
      getplateNumberObjList() {
        getplateNumberObj().then(response => {
          this.plateNumberReq = response.data
        })
      },
      getplateNumberxObjList() {
        getplateNumberxObj().then(response => {
          this.plateNumberxReq = response.data
        })
      },

      getOilMajorNumberObjList() {
        getOilMajorNumberObj().then(response => {
          this.getOilMajorNumberReq = response.data
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
      handleBing(obj) {
        this.id = obj.applyId
        this.form1.majorId = obj.majorId
        this.form1.oilCardNumber = obj.oilCardNumber
        this.form1.deposit = obj.deposit
        this.dialogFormVisible1 = true
      },
      handleBing1(obj) {
        this.id = obj.applyId
        // this.ownerDriverId = obj.truckId
        this.dialogFormVisible2 = true
      },
      handleExp() {
        let str = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (i === this.multipleSelection.length - 1) {
            str += this.multipleSelection[i].applyId
          } else {
            str += this.multipleSelection[i].applyId + ','
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
            downloadElement.download = nowDate + '-油卡申领发放.xls'
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
          if (this.multipleSelection[0].isPassed !== '1' & this.multipleSelection[0].isPassed !== '2') {
            const row = this.multipleSelection[0]
            this.dialogStatus = 'update'
            this.form.applyId = row.applyId
            for (const i in this.plateNumberReq) {
              if (this.multipleSelection[0].plateNumber === this.plateNumberReq[i].plateNumber) {
                this.form.truckId = this.plateNumberReq[i].truckId
              }
            }
            this.plateNumber = row.plateNumber
            this.form.attribute = row.attribute
            let truckTeamIdReq = ''
            this.form.driverPhone = row.driverPhone
            // this.form.truckOwner = row.truckOwner
            // this.form.truckOwnerPhone = row.truckOwnerPhone
            this.form.applyDate = row.applyDate
            this.form.applyCardType = row.applyCardType
            this.form.openCardPlace = row.openCardPlace
            // this.form.truckApplied = row.truckApplied
            this.form.applyRemark = row.applyRemark
            getselectByTruckIdObj(row.truckId).then(response => {
              this.form.attribute = response.data.attribute
              this.form.truckId = response.data.truckId
              truckTeamIdReq = response.data.truckTeamId
            }).then(() => {
              getselectDriverPlateIdObj(row.truckId, truckTeamIdReq).then(res => {
                this.getDriverByPlateIdReq = res.data
                for (let i = 0; i < this.getDriverByPlateIdReq.length; i++) {
                  if (this.getDriverByPlateIdReq[i].driverName === row.driverName) {
                    this.form.ownerDriverId = this.getDriverByPlateIdReq[i].driverId
                  }
                }
              })
            })
            this.dialogFormVisible = true
          } else {
            this.$notify({
              title: '警告',
              message: '该条数据已审核禁止编辑',
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
            return item.getStatus === '0'
          })
          if (arr.length > 0) {
            let str = ''
            for (let i = 0; i < this.multipleSelection.length; i++) {
              str += this.multipleSelection[i].applyId + ','
            }
            str = str.substring(0, str.length - 1)
            this.$confirm('是否要删除选中的油卡申领发放信息', '提示', {
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
            this.$notify.error('申请卡号已发送司机禁止删除')
          }
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.btnLoading = false
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            addObj(this.form)
              .then((res) => {
                this.btnLoading = false
                if (res.data.data) {
                  this.dialogFormVisible = false
                  this.getList()
                  this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                  })
                }
              }).catch(() => {
              this.btnLoading = false
            })
          } else {
            return false
          }
        })
      },
      ybing(formName) {
        const obj = {
          applyId: this.id,
          oilCardNumber: this.form1.oilCardNumber,
          majorId: this.form1.majorId,
          majorNumber: this.form1.majorNumber,
          deposit: this.form1.deposit
        }
        const set = this.$refs
        this.$confirm('是否确认绑定', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          set[formName].validate(valid => {
            if (valid) {
              gettestOilCardNumber2Obj(obj.oilCardNumber).then(res => {
                if (res.data.data === true) {
                  bingingCardObj(obj).then(response => {
                    if (response.data.data) {
                      this.dialogFormVisible1 = false
                      this.getList()
                      this.$notify({
                        title: '成功',
                        message: '绑定成功',
                        type: 'success',
                        duration: 2000
                      })
                    } else {
                      return false
                    }
                  })
                } else {
                  this.$message.error('此油卡号已存在，请更换')
                }
              })
            }
          })
        })
      },
      handleTx(row) {
        const obj = {
          applyId: row.applyId,
          ownerDriverId: row.ownerDriverId,
          isPassed: 1
        }
        this.$confirm('是否通过审核', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          passedObj(obj).then(response => {
            if (response.data.data) {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '审核成功',
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      },
      handleJy() {
        const obj = {
          applyId: this.id,
          isPassed: 2,
          isPassedRemark: this.isPassedRemark,
          ownerDriverId: this.ownerDriverId
        }
        passedObj(obj).then(response => {
          if (response.data.data) {
            this.dialogFormVisible2 = false
            this.getList()
            this.$notify({
              title: '不通过',
              message: '审核成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleFf(row) {
        const obj = {
          applyId: row.applyId,
          getStatus: 1
        }
        if (row.oilCardNumber !== null) {
          this.sendDis = true
          this.$confirm('是否确认发放', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            isSendObj(obj).then(response => {
              this.dialogFormVisible = false
              this.sendDis = false
              this.$notify({
                title: '成功',
                message: '发放成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
          }).catch(action => {
            this.sendDis = false
          })
        } else {
          this.$notify({
            title: '失败',
            message: '请先绑定主副卡号再发放',
            type: 'error',
            duration: 2000
          })
        }
      },
      resetTemp() {
        this.form = {
          applyId: '',
          truckId: '',
          ownerDriverId: '',
          attribute: '',
          truckOwner: '',
          truckOwnerPhone: '',
          applyDate: '',
          applyCardType: '',
          openCardPlace: '',
          // truckApplied: '',
          applyRemark: '',
          oilCardNumber: '',
          majorId: '',
          majorNumber: '',
          deposit: '',
          driverPhone: ''
        }
      },
      OilCardChange(id) {
        
        this.form1.oilCardNumber = ''
        let arr = this.getOilMajorNumberReq.filter(item => {
          return item.majorId === id
        })
        getoilCardObj(arr[0].majorNumber).then(response => {
          this.OilCardReq = response.data.data
        })
      },
      getselectByTruckIdObjList(value) {
        let truckTeamIdReq = ''
        getselectByTruckIdObj(value).then(response => {
          // this.form.truckOwner = response.data.truckOwner
          this.form.attribute = response.data.attribute
          this.form.truckId = response.data.truckId
          // this.form.truckOwnerPhone = response.data.truckOwnerPhone
          truckTeamIdReq = response.data.truckTeamId
        }).then(() => {
          getselectDriverPlateIdObj(value, truckTeamIdReq).then(res => {
            this.getDriverByPlateIdReq = res.data
          })
        })
      },
      getselectByDriverIdObjList(value) {
        if (value !== '') {
          getselectByDriverIdObj(value).then(response => {
            this.form.driverPhone = response.data.phone
          })
        }
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      cancel1() {
        this.dialogFormVisible1 = false
      },
      cancel2() {
        this.dialogFormVisible2 = false
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
            putObj(this.form).then((res) => {
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
