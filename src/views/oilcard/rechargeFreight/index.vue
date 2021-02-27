<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px"
               class="filter-item">
        <el-col :span="6">
          <el-form-item label="主卡号"
                        class="filter-item">
            <el-input @keyup.enter.native="handleFilter"
                      class="filter-item"
                      v-model="listQuery.majorNumber"
                      clearable
                      placeholder="填写主卡号">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="油卡类型"
                        class="filter-item">
            <el-select class="filter-item"
                       v-model="listQuery.cardType"
                       filterable
                       placeholder="请选择"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in oilcardTypeReq"
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
                       @keyup.enter.native="handleFilter"
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
          <el-form-item label="司机"
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.driverName"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in driverReq"
                         :key="item.driverId"
                         :label="item.driverName"
                         :value="item.driverName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="油卡号"
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.oilCardNumber"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in allOilCardNumberReq"
                         :key="item.oilCardId"
                         :label="item.oilCardNumber"
                         :value="item.oilCardNumber">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="充值日期"
                        class="filter-item">
            <el-date-picker type="date"
                            placeholder="选择日期"
                            v-model="listQuery.rechargeTime"
                            @keyup.enter.native="handleFilter"
                            @change="handleFilter"
                            style="width: 100%;"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            clearable></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-button v-if="oil_recharge_exp"
                   class="filter-item"
                   style="margin-left: 10px;"
                   size="mini"
                   @click="handleExp"
                   type="primary"
                   icon="edit">导出
        </el-button>
        <el-button v-if="oil_recharge_add"
                   class="filter-item"
                   style="margin-left: 10px;"
                   size="mini"
                   @click="handleCreate"
                   type="primary"
                   icon="edit">添加
        </el-button>
        <el-button v-if="oil_recharge_upd"
                   class="filter-item"
                   style="margin-left: 10px;"
                   size="mini"
                   @click="handleUpdate"
                   type="primary"
                   icon="edit">编辑
        </el-button>
        <el-button v-if="oil_recharge_del"
                   class="filter-item"
                   style="margin-left: 10px;"
                   size="mini"
                   @click="handleDelete"
                   type="primary"
                   icon="edit">删除
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
                <el-form-item label="车辆类型:">
                  <span v-if="props.row.attribute === '0'">自有车</span>
                  <span v-if="props.row.attribute === '1'">挂靠车</span>
                  <span v-if="props.row.attribute === '2'">外调车</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="油卡类型:">
                  <span v-if="props.row.cardType === '0'">普卡</span>
                  <span v-if="props.row.cardType === '1'">专卡限制车号</span>
                  <span v-if="props.row.cardType === '2'">柴油专用卡</span>
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
                <el-form-item label="充值主卡号:">
                  <span>{{ props.row.majorNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="充值类型:">
                  <span>{{ props.row.rechargeType }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="本月订单数:">
                  <span>{{ props.row.monthOrderNum }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="本月已充值:">
                  <span>{{ props.row.monthRechargeSum }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="审核备注:">
                  <span>{{ props.row.failRemark }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="充值id"
                       v-if="false">
        <template slot-props="scope">
          <span>{{ scope.row.rechargeId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="油卡id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.oilCardId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="主卡id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.majorId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车辆id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.truckId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车辆号码">
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
                       label="申请日期">
        <template slot-scope="scope">
          <span>{{ scope.row.applyDate }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="油卡类型">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.cardType === '0'">普卡</span>-->
      <!--<span v-if="scope.row.cardType === '1'">专卡限制车号</span>-->
      <!--<span v-if="scope.row.cardType === '2'">柴油专用卡</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
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
      <!--<el-table-column align="center"-->
      <!--label="分公司">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.openCardPlace }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="运费油卡余额">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="申请充值金额">
        <template slot-scope="scope">
          <span>{{ scope.row.rechargeSum }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="充值类型">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.rechargeType }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="本月订单数">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.monthOrderNum }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="本月已充值">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.monthRechargeSum }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="是否建议充值">
        <template slot-scope="scope">
          <span>{{ scope.row.isSuggestRecharge }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="审核状态"
                       width='180'>
        <template slot-scope="scope">
          <el-button v-show="scope.row.isPassed=='1'"
                     size="mini"
                     type="success">已通过
          </el-button>
          <el-button v-show="scope.row.isPassed=='2'"
                     size="mini"
                     type="warning">已拒绝
          </el-button>
          <el-row>
            <el-col :span="10">
              <el-button size="mini"
                         type="primary"
                         v-show="scope.row.isPassed=='0'"
                         @click="handleTx(scope.row)">通过
              </el-button>
            </el-col>
            <el-col :span="10"
                    :offset="4">
              <el-button size="mini"
                         type="primary"
                         v-show="scope.row.isPassed=='0'"
                         @click="handleBing(scope.row)">拒绝
              </el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="充值操作"
                       width="110">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     v-show="scope.row.isPassed=='1' & scope.row.rechargeDate== null"
                     @click="handleRecharge(scope.row)">充值
          </el-button>
          <el-button size="mini"
                     type="primary"
                     v-show="scope.row.rechargeDate !== null"
                     @click="handleRechargePrint(scope.row)">打印小票
          </el-button>
        </template>
        <!-- <template slot-scope="scope">
            <span>{{ scope.row.rechargeDate }}</span>
        </template> -->
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="审核备注">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.failRemark }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
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
        <el-form-item label="充值id"
                      prop="username"
                      v-if="false">
          <el-input v-model="form.rechargeId"
                    placeholder="充值id"></el-input>
        </el-form-item>
        <el-form-item label="油卡id"
                      prop="username"
                      v-if="false">
          <el-input v-model="form.oilCardId"
                    placeholder="油卡id"></el-input>
        </el-form-item>
        <el-form-item label="主卡id"
                      prop="username"
                      v-if="false">
          <el-input v-model="form.majorId"
                    placeholder="主卡id"></el-input>
        </el-form-item>
        <el-form-item label="车辆id"
                      prop="username"
                      v-if="false">
          <el-input v-model="form.truckId"
                    placeholder="车辆id"></el-input>
        </el-form-item>
        <el-form-item label="油卡号"
                      prop="oilCardNumber">
          <!-- <el-input v-model="form.oilCardNumber" placeholder="油卡号"></el-input> -->
          <el-select class="filter-item"
                     v-model="form.oilCardNumber"
                     placeholder="请选择"
                     @change="getoilCardObjList(form.oilCardNumber)">
            <el-option v-for="item in allOilCardNumberReq"
                       :key="item.oilCardId"
                       :label="item.oilCardNumber"
                       :value="item.oilCardId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="油卡类型"
                      prop="username">
          <!-- <el-input v-model="form.cardType" placeholder="油卡类型" :disabled="true"></el-input> -->
          <el-select class="filter-item"
                     v-model="form.cardType"
                     placeholder="请选择"
                     clearable
                     :disabled="true">
            <el-option v-for="item in oilcardTypeReq"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值主卡号"
                      prop="username">
          <el-input v-model="form.majorId"
                    placeholder="充值主卡号"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="车辆号码"
                      prop="username">
          <el-input v-model="form.plateNumber"
                    placeholder="车辆号码"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="车辆类型"
                      prop="username">
          <!-- <el-input v-model="form.attribute" placeholder="车辆类型" :disabled="true"></el-input> -->
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
        <el-form-item label="司机"
                      prop="username">
          <el-input v-model="form.driverName"
                    placeholder="司机"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分公司"
                      prop="username">
          <el-input v-model="form.openCardPlace"
                    placeholder="分公司"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="运费油卡余额"
                      prop="username">
          <el-input v-model="form.amount"
                    placeholder="运费油卡余额"
                    :disabled="true"></el-input>
        </el-form-item>
        <!-- <el-form-item label="申请日期"
                      prop="username">
          <el-date-picker type="date"
                          placeholder="选择日期"
                          v-model="form.applyDate"
                          style="width: 100%;"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item> -->
        <el-form-item label="申请充值金额"
                      prop="rechargeSum">
          <el-input v-model="form.rechargeSum"
                    placeholder="充值金额"
                    type="number"></el-input>
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
      <h4 class="tags1">拒绝理由</h4>
      <div class="flexItem cm20">
        <el-form :model="form1"
                 :rules="rules"
                 ref="form1"
                 label-width="100px">
          <el-input placeholder="请输入内容"
                    v-model="failRemark"
                    clearable>
          </el-input>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="handleJy()">发送司机</el-button>
        <el-button @click="cancel1()">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="油卡充值小票"
               :visible.sync="dialogPrintFormVisible">
      <div class="pay-print"
           ref="print">
        <!-- <p class="pay-print-time">报销单号:</p> -->
        <el-row>
          <h1 class="pay-print-header">油卡充值回单</h1>
          <p class="pay-print-time">打印日期:{{printForm.createTime | moment('YYYY-MM-DD')}}</p>
        </el-row>
        <!-- <el-row>
          <el-col :span="8">打印日期:</el-col>
          <el-col :span="16"></el-col>
        </el-row> -->
        <el-row>
          <el-col :span="8">主卡号:</el-col>
          <el-col :span="16">{{printForm.majorNumber}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">副卡号:</el-col>
          <el-col :span="16">{{printForm.oilCardNumber}}</el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="8">报销单号:</el-col>
          <el-col :span="16">{{printForm.reimburseNum}}</el-col>
        </el-row> -->
        <el-row>
          <el-col :span="8">车牌号:</el-col>
          <el-col :span="16">{{printForm.plateNumber}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">车辆类型:</el-col>
          <el-col :span="16"
                  v-if="printForm.attribute === '0'">自有车</el-col>
          <el-col :span="16"
                  v-if="printForm.attribute === '1'">挂靠车</el-col>

          <el-col :span="16"
                  v-if="printForm.attribute === '2'">外调车</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">油卡所属公司:</el-col>
          <el-col :span="16">{{printForm.openCardPlace}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">充值类型:</el-col>
          <el-col :span="16">运费油卡充值</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">充值金额:</el-col>
          <el-col :span="16">{{printForm.rechargeSum}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">充值日期:</el-col>
          <el-col :span="16">{{printForm.rechargeDate}}</el-col>
        </el-row>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="handlePrint">打印回单</el-button>
        <el-button @click="dialogPrintFormVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addObj,
  bindingOrderObj,
  delObj,
  expObj,
  fetchList,
  getallOilCardNumberObj,
  getcarObj,
  getoilCardObj,
  getoilcardTypeObj,
  passedObj,
  putObj,
  rechargeRObj,
  getselectAllDriverObj
} from '@/api/rechargeFreight'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'

export default {
  name: 'table_oil_recharge',
  directives: {
    waves
  },
  data () {
    return {
      list: null,
      total: null,
      listLoading: true,
      failRemark: '',
      listQuery: {
        page: 1,
        limit: 20
      },
      rules: {
        oilCardNumber: [
          { required: true, message: '请输入油卡号', trigger: 'blur' }
        ],
        rechargeSum: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ]
      },
      form1: {},
      form: {
        oilCardId: '',
        truckId: '',
        rechargeId: '',
        plateNumber: '',
        driverName: '',
        attribute: '',
        majorNumber: '',
        oilCardNumber: '',
        cardType: '',
        openCardPlace: '',
        majorId: '',
        rechargeType: '1',
        applyDate: '',
        rechargeSum: '',
        ownerDriverId: '',
        monthOrderNum: '',
        monthRechargeSum: '',
        isSuggestRecharge: '',
        isPassed: '',
        failRemark: '',
        isRechargeed: '',
        rechargeDate: '',
        tenantId: '',
        amount: '',
        payType: [],
        orderId: ''

      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogStatus: '',
      dialogPrintFormVisible: false,
      oil_recharge_add: false,
      oil_recharge_upd: false,
      oil_recharge_del: false,
      oil_card_exp: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      carReq: [],
      oilcardTypeReq: [],
      multipleSelection: [],
      allOilCardNumberReq: [],
      id: '',
      ownerDriverId: '',
      driverReq: [],
      printForm: {
        majorNumber: '',
        createTime: ''
      }
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
    this.getcarObjList()
    this.getoilcardTypeObjList()
    this.getallOilCardNumberObjList()
    this.handleGetselectAllDriverObj()
    this.oil_recharge_add = this.permissions['oil_recharge_add']
    this.oil_recharge_upd = this.permissions['oil_recharge_upd']
    this.oil_recharge_del = this.permissions['oil_recharge_del']
    this.oil_recharge_exp = this.permissions['oil_recharge_exp']
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
    getcarObjList () {
      getcarObj().then(response => {
        this.carReq = response.data
      })
    },
    handleGetselectAllDriverObj () {
      getselectAllDriverObj().then(res => {
        this.driverReq = res.data
      })
    },
    getoilcardTypeObjList () {
      getoilcardTypeObj().then(response => {
        this.oilcardTypeReq = response.data
      })
    },
    getallOilCardNumberObjList () {
      getallOilCardNumberObj().then(response => {
        this.allOilCardNumberReq = response.data
      })
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
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
    handleBing (obj) {
      this.id = obj.rechargeId
      this.ownerDriverId = obj.truckId
      this.failRemark = ''
      this.dialogFormVisible1 = true
    },
    handleTx (row) {
      const obj = {
        rechargeId: row.rechargeId,
        majorId: row.majorId,
        ownerDriverId: row.ownerDriverId,
        isPassed: 1,
        truckId: row.truckId,
        oilCardId: row.oilCardId,
        rechargeSum: row.rechargeSum,
        rechargeType: row.rechargeType
      }
      this.$confirm('是否要通过审核', '提示', {
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
          } else {
            this.$message.error(response.data.msg)
          }
        })
      })
    },
    handleJy () {
      const obj = {
        rechargeId: this.id,
        isPassed: 2,
        failRemark: this.failRemark,
        ownerDriverId: this.ownerDriverId
      }
      passedObj(obj).then(response => {
        if (response.data.data) {
          this.dialogFormVisible1 = false
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
    handleRecharge (row) {
      const obj = {
        rechargeId: row.rechargeId,
        majorId: row.majorId,
        truckId: row.truckId,
        rechargeType: row.rechargeType,
        rechargeSum: row.rechargeSum,
        monthOrderNum: row.monthOrderNum,
        monthRechargeSum: row.monthRechargeSum
      }
      this.$confirm('是否充值', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rechargeRObj(obj).then(response => {
          if (response.data.data) {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '充值成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify.error(response.data.msg)
          }
        })
      })
    },
    handleRechargePrint (row) {
      this.printForm.majorNumber = row.majorNumber
      this.printForm.oilCardNumber = row.oilCardNumber
      this.printForm.plateNumber = row.plateNumber
      this.printForm.attribute = row.attribute
      this.printForm.openCardPlace = row.openCardPlace
      this.printForm.transportCost = row.transportCost
      this.printForm.rechargeSum = row.rechargeSum
      this.printForm.rechargeDate = row.rechargeDate
      this.printForm.reimburseNum = row.reimburseNum
      this.printForm.orderId = row.orderId
      this.printForm.createTime = Date.now()
      this.dialogPrintFormVisible = true
    },
    handlePrint () {
      this.$print(this.$refs.print)
    },
    handleExp () {
      let str = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (i === this.multipleSelection.length - 1) {
          str += this.multipleSelection[i].rechargeId
        } else {
          str += this.multipleSelection[i].rechargeId + ','
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
          downloadElement.download = nowDate + '-运费油卡充值.xls'
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
    handleUpdate () {
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
          this.dialogFormVisible = true
          this.form.oilCardId = row.oilCardId
          this.form.rechargeId = row.rechargeId
          this.form.plateNumber = row.plateNumber
          this.form.truckOwner = row.truckOwner
          this.form.attribute = row.attribute
          this.form.majorNumber = row.majorNumber
          this.form.oilCardNumber = row.oilCardNumber
          this.form.cardType = row.cardType
          this.form.openCardPlace = row.openCardPlace
          this.form.cardType = row.cardType
          this.form.applyDate = row.applyDate
          this.form.rechargeSum = row.rechargeSum
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
    handleDelete (row) {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要删除的数据',
          type: 'warn',
          duration: 2000
        })
      } else {
        var arr = this.multipleSelection.filter(item => {
          return item.rechargeDate === null
        })
        if (arr.length > 0) {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].rechargeId + ','
          }
          str = str.substring(0, str.length - 1)
          this.$confirm('是否要删除选中的运费油卡信息', '提示', {
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
              }
            })
          })
        } else {
          this.$notify.error('该条申请已完成充值禁止删除')
        }
      }
    },
    handleCreate () {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    create (formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          if (this.form.ownerDriverId !== null) {
            bindingOrderObj(this.form.ownerDriverId).then((response) => {
              if (response.data.payType === '单结') {
                if (response.data.orderId !== null) {
                  this.form.orderId = response.data.orderId
                  addObj(this.form).then((res) => {
                    if (res.data.data) {
                      this.dialogFormVisible = false
                      this.getList()
                      this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success',
                        duration: 2000
                      })
                    } else {
                      this.$notify({
                        title: '失败',
                        message: res.data.msg,
                        type: 'error',
                        duration: 2000
                      })
                    }
                  })
                } else {
                  this.$notify({
                    title: '失败',
                    message: '没有正在进行的订单，无法创建充值申请',
                    type: 'error',
                    duration: 2000
                  })
                }
              } else {
                addObj(this.form).then((res) => {
                  if (res.data.data) {
                    this.dialogFormVisible = false
                    this.getList()
                    this.$notify({
                      title: '成功',
                      message: '创建成功',
                      type: 'success',
                      duration: 2000
                    })
                  } else {
                    this.$notify({
                      title: '失败',
                      message: res.data.msg,
                      type: 'error',
                      duration: 2000
                    })
                  }
                })
              }
            })
          } else {
            this.$notify({
              title: '失败',
              message: '司机不能为空',
              type: 'warning',
              duration: 2000
            })
          }
        }
      })
    },
    resetTemp () {
      this.form = {
        oilCardId: '',
        orderId: '',
        truckId: '',
        driverName: '',
        rechargeId: '',
        plateNumber: '',
        truckOwner: '',
        attribute: '',
        majorNumber: '',
        oilCardNumber: '',
        cardType: '',
        openCardPlace: '',
        majorId: '',
        rechargeType: '1',
        applyDate: '',
        rechargeSum: '',
        ownerDriverId: '',
        monthOrderNum: '',
        monthRechargeSum: '',
        isSuggestRecharge: '',
        isPassed: '',
        failRemark: '',
        isRechargeed: '',
        rechargeDate: '',
        tenantId: ''

      }
    },
    getoilCardObjList (id) {
      debugger
      getoilCardObj(id).then(response => {
        debugger
        this.oilCardReq = response.data.data
        this.form.plateNumber = response.data.data.plateNumber
        this.form.majorNumber = response.data.data.majorNumber
        this.form.majorId = response.data.data.majorId
        this.form.cardType = response.data.data.cardType
        this.form.driverName = response.data.data.driverName
        this.form.attribute = response.data.data.attribute
        this.form.oilCardId = response.data.data.oilCardId
        this.form.truckId = response.data.data.truckId
        this.form.openCardPlace = response.data.data.openCardPlace
        this.form.amount = response.data.data.amount
        
        this.form.ownerDriverId = response.data.data.ownerDriverId
      })
    },
    cancel1 () {
      this.dialogFormVisible1 = false
    },
    cancel (formName) {
      this.dialogFormVisible = false
      const set = this.$refs
      set[formName].resetFields()
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
