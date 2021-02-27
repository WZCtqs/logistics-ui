<template>
  <div class="app-container calendar-list-container">
    <div id="allmap"
         style="display:none"></div>

    <div class="filter-container">
      <div class="header">下单管理</div>
      <h2 class="cargoFormTitle">订单基本信息</h2>
      <el-form ref="form"
               label-width="100px"
               :model="form"
               :rules="formRules"
               :disabled="!ord_order_upd">
        <el-row>
          <!-- <el-col :span="7">
            <el-form-item label="派车日期" prop="date">
              <el-date-picker
                type="date"
                placeholder="派车日期"
                v-model="form.sendTruckDate"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col> -->

          <el-col :span="6">
            <el-form-item label="货物品名"
                          prop="productName">
              <el-input v-model="form.productName"
                        placeholder="货物品名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="班列日期"
                          prop="date">
              <el-date-picker type="date"
                              placeholder="班列日期"
                              v-model="form.classDate"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd">>
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="去/回程 "
                          class="type1"
                          prop="type">
              <el-select class="filter-item"
                         filterable
                         placeholder="请选择"
                         v-model="form.type"
                         @keyup.enter.native="handleFilter">
                <el-option v-for="item in orderTypeReq"
                           :key="item.id"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="客户名称"
                          prop="customerId">
              <el-select class="filter-item"
                         v-model="form.customerId"
                         filterable
                         placeholder="客户名称"
                         @change="customerSelectList(form.customerId)">
                <el-option v-for="item in fetchCustomerSelectReq"
                           :key="item.customerId"
                           :label="item.customerName"
                           :value="item.customerId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="承运单位">
              <el-col :span="16">
                <el-input v-model="form.carrier"
                          placeholder="承运单位"></el-input>
              </el-col>
              <el-col :span="8">
                <el-input v-model="form.classOrder"
                          placeholder="舱位号"></el-input>
              </el-col>

            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="总毛重"
                          prop="weight">
              <el-input type="number"
                        v-model="form.weight"
                        placeholder="总毛重"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"
                  v-if="form.type=='0'">
            <el-form-item label="总体积"
                          prop="size">
              <el-input type="number"
                        v-model="form.size"
                        placeholder="总体积"></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="8" v-if="form.type === '1'">
            <el-form-item label="集装箱号" prop="containerNo">
              <el-input v-model="form.containerNo" placeholder="集装箱号"></el-input>
            </el-form-item>
          </el-col> -->

          <el-col :span="6">
            <el-form-item label="集装箱号"
                          prop="containerNo"
                          v-if="form.type==1">
              <el-input v-model="form.containerNo"
                        placeholder="集装箱号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="箱型"
                          prop="containerType">
              <!-- <el-input v-model="form.containerType" placeholder="箱型"></el-input> -->

              <el-select class="filter-item"
                         filterable
                         placeholder="请选择"
                         v-model="form.containerType">
                <el-option v-for="item in containerTypeReq"
                           :key="item.id"
                           :label="item.containerType"
                           :value="item.containerType"></el-option>
              </el-select>

            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="箱量"
                          prop="containerNum">
              <el-input type="number"
                        v-model="form.containerNum"
                        placeholder="箱量"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6"
                  v-if="form.type=='1'">
            <el-form-item label="铅封号">
              <el-input placeholder
                        v-model="form.sealNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8"
                  v-if="form.type==0">
            <el-form-item label="提箱地"
                          class="bigSelect"
                          prop="pickupConPlaceArray">
              <area-cascader :level="1"
                             type="text"
                             placeholder="请选择地区"
                             v-model="form.pickupConPlaceArray"
                             :data="pcaa"></area-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="10"
                  class="bigLabel"
                  v-if="form.type==0">
            <el-form-item label="提箱地详细地址"
                          class="bigSelect">

              <el-input placeholder="请输入关键词"
                        v-model="form.pickupConDetailplace"
                        @focus="handleAutocompletePick"
                        id="suggestId"
                        :disabled="form.pickupConPlaceArray.length==0"></el-input>
              <div id="pickerAllmap"></div>

            </el-form-item>
          </el-col>

          <el-col :span="8"
                  v-if="form.type==1">
            <el-form-item label="还箱地址"
                          class="bigSelect"
                          prop="returnConPlaceArray">
              <area-cascader :level="1"
                             type="text"
                             placeholder="请选择地区"
                             v-model="form.returnConPlaceArray"
                             :data="pcaa"></area-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="10"
                  class="bigLabel"
                  v-if="form.type==1">
            <el-form-item label="还箱地详细地址"
                          class="bigSelect">

              <el-input placeholder="请输入关键词"
                        v-model="form.returnConDetailplace"
                        @focus="handleAutocompleteBack"
                        id="suggestIdBack"
                        :disabled="form.returnConPlaceArray.length==0"></el-input>
              <div id="backAllmap"></div>

            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="录单员"
                          class="bigSelect">
              <el-input placeholder="自动生成"
                        v-model="form.createBy"
                        :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <addressCom ref="addressCom"
                    :pickupAddsForm="form"
                    @getstate1="getstate"
                    :ableStr="false"></addressCom>
        <addressCom1 ref="addressCom1"
                     :arrivalAddsForm="form"
                     @getstate2="getstate"
                     :ableStr="false"></addressCom1>

        <el-row v-show="!isShow">

          <el-col :span="12">
            <el-form-item label="铅封是否完好">
              <el-input placeholder></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发/收货人签字及时间">
              <el-input placeholder></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="司机签字及时间">
              <el-input placeholder></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="!isShow">
          <el-col :span="24">
            <el-form-item label="注意事项">
              <el-input type="textarea"
                        class="multyText"
                        value="
                1、在您收到箱子后，请核对铅封号，如果铅封号被换或者是损坏，请拍铅封号照取证，拒绝接收箱子并及时告知我们
                2、铅封号完好，并签字确认后视同货物合格
                3、承运单位按照国际货物运输相应法律法规运输货物，交箱时，需保持箱、封完整，且号码与装货时一致；
                4、此单一式2份，一份留存承运司机，一份留存郑州国际陆港承运部门
              "></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注"
                          prop="remark">
              <el-input type="textarea"
                        v-model="form.remark"
                        placeholder="备注"></el-input>
              <!-- <el-input type="textarea" v-model="form.receiverRemark" placeholder="备注"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
        <h2 class="cargoFormTitle">车辆信息</h2>
        <el-row>

          <el-col :span="8">
            <el-form-item label="车牌号"
                          prop="truckId">

              <el-select class="filter-item"
                         v-model="truckId"
                         filterable
                         placeholder="车牌号"
                         clearable
                         @change="getDriverByPlateIdJs(truckId)">
                <el-option v-for="item in form.plateNumberReqArr"
                           :key="item.truckId"
                           :label="item.plateNumber"
                           :value="item.truckId"></el-option>
              </el-select>

            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="司机姓名"
                          prop="driverId">
              <el-select class="filter-item"
                         v-model="form.driverId"
                         filterable
                         placeholder="司机姓名"
                         clearable
                         @change="driverInfoReq(form.driverId)">
                <el-option v-for="item in fetchdriverSelectReq"
                           :key="item.driverId"
                           :label="item.driverName"
                           :value="item.driverId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式"
                          prop="driverphoneReq">
              <el-input placeholder="司机联系方式"
                        v-model="driverphoneReq"
                        :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="8">
            <el-form-item label="身份证号"
                          prop="idcardNumberReq">
              <el-input placeholder="司机身份证号"
                        v-model="idcardNumberReq"
                        :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="结算方式">
              <el-select class="filter-item"
                         v-model="form.settlement"
                         filterable
                         placeholder=""
                         :disabled="true">
                <el-option v-for="item in settlementList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <!-- <el-row v-if="form.upstreamId != null && form.upstreamId != ''">
          <el-col :span="24">
            <el-card> 箱行亚欧订单（司机提示）:{{form.upstreamRemark}}</el-card>

          </el-col>
        </el-row> -->
        <!-- <el-row>
          <el-col :span="6">
            <el-form-item label="业务员">
              <el-input placeholder="业务员" v-model="form.salesman"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="调度员">
              <el-input placeholder="调度员" v-model="form.scheduleman"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
        <h2 class="cargoFormTitle">费用明细</h2>
        <el-row>
          <el-col :span="6">
            <el-col :span="20">
              <el-form-item label="应收公里数"
                            prop="kilometre">
                <el-input type="number"
                          placeholder
                          v-model="form.kilometre"
                          @input="getFee"
                          @keyup.native="kilometreNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary"
                         icon="el-icon-location-outline"
                         circle
                         @click="getstate"></el-button>
            </el-col>
          </el-col>

          <el-col :span="6">
            <el-form-item label="应收单价">
              <el-col :span="20">
                <el-input type="number"
                          :disabled="form.kilometre==null || form.kilometre=='' || form.kilometre<0"
                          @input="getFee"
                          @blur="getFee"
                          placeholder
                          v-model="form.recPrice"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button :disabled="form.kilometre==null || form.kilometre==''"
                           type="primary"
                           icon="el-icon-edit"
                           circle
                           @click="handleTransportFee"></el-button>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应收费用">
              <el-input placeholder
                        v-model="form.receivables"
                        :disabled="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="结算方式"
                          prop="settlement">
              <el-select class="filter-item"
                         v-model="form.balanceWay"
                         filterable
                         placeholder=""
                         :disabled="true">
                <el-option v-for="item in settlementList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>

            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="应付公里数"
                          prop="kmYf">
              <el-input type="number"
                        placeholder
                        v-model="form.kmYf"
                        @input="getFee"
                        @keyup.native="kilometreNumber"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="应付单价">
              <!-- <el-input @input="getFee" @blur="getFee" placeholder v-model="form.payPrice"></el-input> -->

              <el-col :span="20">
                <el-input type="number"
                          :disabled="form.kilometre==null || form.kilometre=='' || form.kilometre<0"
                          @input="getFee"
                          @blur="getFee"
                          placeholder
                          v-model="form.payPrice"></el-input>
              </el-col>
              <el-col :span="4">
                <el-button :disabled="form.kilometre==null || form.kilometre==''"
                           type="primary"
                           icon="el-icon-edit"
                           circle
                           @click="handleTransportFee1"></el-button>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应付费用">
              <el-input placeholder
                        v-model="form.needPay"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="提箱费">
              <el-input type="number" placeholder v-model="form.pickcnFee"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="压车费">
              <el-input type="number" placeholder v-model="form.parkingFee"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>

        <h2 class="cargoFormTitle">附件上传</h2>
        <el-row>
          <el-col :span="24">
            <div class="grid-content">附件上传</div>
            <el-col :span="8">
              <el-upload class="upload-demo"
                         action="/order/ordFile/localUpload"
                         :headers="headers"
                         :before-upload="beforeUpload"
                         :on-success="handleAvatarSuccess"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :file-list="fileList"
                         :limit="1"
                         list-type="picture">
                <el-button size="small"
                           type="primary"
                           v-if="ord_order_upload">上传提箱单</el-button>
              </el-upload>
            </el-col>
            <el-col style="padding-right:20px"
                    :span="7">
              <el-upload class="upload-demo"
                         action="/order/ordFile/localUpload"
                         :headers="headers"
                         :before-upload="beforeUpload1"
                         :on-success="handleAvatarSuccess1"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove1"
                         :file-list="fileList1"
                         :limit="1"
                         list-type="picture">
                <el-button size="small"
                           type="primary"
                           v-if="ord_order_upload">上传公章</el-button>
              </el-upload>
            </el-col>
            <el-col :span="8">

              <el-upload class="upload-demo"
                         action="/order/ordFile/localUpload"
                         :headers="headers"
                         :before-upload="beforeUpload2"
                         :on-success="handleAvatarSuccess2"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove2"
                         :file-list="fileList2"
                         :limit="8"
                         list-type="picture">
                <el-button size="small"
                           type="primary"
                           v-if="ord_order_upload">上传其它文件</el-button>
                <div slot="tip"
                     class="el-upload__tip">只能上传png、jpg、gif、bmp、jpeg文件，且不超过500kb</div>
              </el-upload>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
      <div align="center">
        <el-button type="primary"
                   @click="submitForm('form')"
                   v-if="dialogStatus === 'create'">存草稿</el-button>
        <el-button type="primary"
                   @click="updateForm('form')"
                   :disabled="!ord_order_upd"
                   v-else-if="dialogStatus === 'update'">立即更新
        </el-button>

        <el-button type="primary"
                   @click="updateFormT('form')"
                   :disabled="!ord_order_upd"
                   v-else-if="dialogStatus === 'tijiao'">提交
        </el-button>

        <el-button @click="sendMsg('form')"
                   v-if="dialogStatus === 'create'">发送司机</el-button>
        <el-button @click="sendMsg('form')"
                   v-else-if="dialogStatus === 'update'">发送司机</el-button>
        <el-button @click="sendMsg2('form')">订单补录</el-button>
      </div>
    </div>

    <el-dialog title="计费规则"
               :visible.sync="centerDialogVisible"
               width="30%"
               center>
      <el-form :model="ruleForm2"
               status-icon
               ref="ruleForm2"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="计费规则"
                      prop="pass">
          <el-select v-model="ruleForm2.value"
                     placeholder="请选择"
                     @change="handleRulesReq"
                     clearable="clearable">
            <el-option v-for="(item, index) in ruleReq"
                       :key="index"
                       :label="item.ruleName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { pca, pcaa } from 'area-data' // 城市数据
import 'vue-area-linkage/dist/index.css' // 样式
import {
  addObj,
  cityLimitArr,
  customerSelect,
  driverSelect,
  fetchCustomerSelect,
  fetchdriverSelect,
  getDetailListByIdObj,
  getDistance,
  getRateValidation,
  ordAccountingRulesObj,
  ordAccountingRulesObj1,
  orderType,
  containerType,
  putObj,
  putObjT,
  sealStatus,
  selectByOrderId,
  sendDriverObj,
  sendDriverObj1,
  sendDriverObj2,
  uploadFiles,
  getAllEnableTruck,
  getDriverByPlateId
} from '@/api/orderManager'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { getToken } from '@/util/auth'
import { mapGetters } from 'vuex'
import router from '@/router/router'
import addressCom from './addressCom.vue'
import addressCom1 from './addressCom1.vue'
import { AreaSelect } from 'vue-area-linkage'

export default {
  name: 'orderManager',
  directives: {
    waves
  },
  components: { AreaSelect, addressCom, addressCom1 },
  data () {
    var checkPhone = (rule, value, callback) => {
      let valid_rule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
      if (valid_rule.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入正确的手机号'))
      }
    }
    var checkNumber = (rule, value, callback) => {
      if (value <= 0 || parseFloat(value) == 'NaN') {
        return callback(new Error('公里数只能为非负数'))
      } else if (value == null || parseFloat(value) == "") {
        return callback(new Error('公里数不能为空'))
      } else {
        callback()
      }
    }

    var containerNoCheck = (rule, value, callback) => {
      if ((value == '' || value == null) && (this.form.type == 1)) {
        return callback(new Error('回程的箱号不能为空'))
      } else {
        callback()
      }
    }
    return {
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      ruleForm2: {
        value: ''
      },
      kmNum: 0,

      returnCon: true,
      sendGoods: true,
      pickupGoods: true,
      pickupCon: true,


      pca: pca,
      rulsNum: null,
      centerDialogVisible: false,
      ruleReq: [],
      fileList2: [],
      fileList1: [],
      ord_order_upload: false,
      fileList: [],
      addressState: null,
      distanceNum: null,
      settlementList: [{ 'value': '0', 'label': '单结' }, { 'value': '1', 'label': '月结' }],
      distanceobj: {
        direction: null,
        city1: null,
        city2: null,
        city3: null
      },
      savedraft: false,
      orderTypeReq: [],
      containerTypeReq: [],
      upload_url: '/order/ordFile/localUpload', // 随便填一个，但一定要有
      isShow: true,
      pcaa: pcaa,
      value1: [],
      dialogStatus: '',
      idReq: this.$route.query.orderId,
      methodsAccount: [
        { value: '单结', label: '单结' },
        { value: '月结', label: '月结' }
      ],
      pickupConDetailplace_arr: [],
      returnConDetailplace_arr: [],
      sendGoodsDetailplace_arr: [],
      pickupGoodsDetailplace_arr: [],
      customerName: null,
      form: {
        pickupAdds: [
          {
            addType: '0',
            addressCity: '',
            addressDetailPlace: '',
            planTime: '',
            contacts: '',
            contactsPhone: '',
            ssqArray: [],
            sort: 0,
            location: ''

          },
        ],
        arrivalAdds: [
          {

            addType: '1',
            addressCity: '',
            addressDetailPlace: '',
            planTime: '',
            contacts: '',
            contactsPhone: '',
            ssqArray: [],
            sort: 0,
            location: ''
          }
        ],
        plateNumberReqArr: [],
        truckId: '',
        salesman: '',
        scheduleman: '',
        sendTruckDate: '',
        classDate: '',
        carrier: '',
        classOrder: '',
        customerId: '',
        contact: '',
        phone: '',
        type: '',
        productName: '',
        containerType: '',
        containerNum: '',
        consignor: null,
        consignorPhone: null,
        consignee: null,
        consigneePhone: null,
        weight: '',
        size: '',
        receiverPeople: '',
        sealNumber: '',
        sendGoodsPlaceArray: [],
        sendGoodsDetailplace: null,
        sendGoodsDate: '',
        pickupGoodsPlaceArray: [],
        pickupGoodsDetailplace: null,
        pickupGoodsDate: '',
        returnConPlaceArray: [],
        returnConDetailplace: null,
        idcardNumber: '',
        plateNumber: '',
        pickupConPlaceArray: [],
        pickupConDetailplace: null,
        driverId: '',
        driverphone: '',
        sealStatus: '',
        remark: '',
        orderName: '',
        kmYf: null,
        kilometre: null,
        price: null,
        recPrice: null,
        receivables: null,
        payPrice: null,
        needPay: null,
        pickcnFee: null,
        parkingFee: null,
        settlement: '',
        balanceWay: '',
        ordOrderFile: {
          pickupCnFile: null,
          officialSeal: null,
          otherFiles: []
        },
        payRate: ''
      },
      truckId: null,
      trunckAttribute: '',
      otherFiles_arr: [],
      formRules: {
        kilometre: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        kmYf: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        containerNo: [
          { validator: containerNoCheck, trigger: 'blur' }
        ],
        orderName: [
          { required: true, message: '请输入订单名称', trigger: 'blur' }
        ],
        receiverPeople: [
          { required: true, message: '请输入收货人', trigger: 'blur' }
        ],
        pickupConPlaceArray: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        returnConPlaceArray: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        pickupGoodsPlaceArray: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        sendGoodsPlaceArray: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ],
        customerId: [
          { required: true, message: '请输入客户名称', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择去/回程', trigger: 'change' }
        ],
        driverId: [
          { required: true, message: '请输入司机姓名', trigger: 'change' }
        ],
        truckId: [
          { required: true, message: '请输入车牌号', trigger: 'change' }
        ],
        settlement: [
          { required: true, message: '请选择结算方式', trigger: 'change' }
        ],
        consignorPhone: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        consigneePhone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      },
      msg: [],
      type: [],
      fetchdriverSelectReq: [],
      fetchCustomerSelectReq: [],
      driverphoneReq: '',
      idcardNumberReq: '',
      plateNumberReq: '',
      driverIdReq: '',
      driverName: null,
      typeReq: '',
      customerNameReq: '',
      contactReq: '',
      customerPhoneReq: '',
      sealStatusReq: '',
      selectByOrderIdReq: '',
      id: '',
      pickupConRes: '',
      pickupRes: '',
      sendRes: '',
      returnRes: '',
      arr: [],
      payRate: '',
      ord_order_upd: '',

      origin0: {},
      waypoints0: [],

      origin1: {},
      waypoints1: [],

      distanceNum1: 0,


    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  filters: {},
  created () {

    this.ord_order_upd = this.permissions['ord_order_upd']
    this.savedraft = this.permissions['savedraft']
    // this.ord_order_add = this.permissions['ord_order_add']
    // this.ord_order_update = this.permissions['ord_order_update']
    this.ord_order_upload = this.permissions['ord_order_upload']
    this.order_typeList()
    this.containerTypeReqList()
    // this.fetchdriverSelectList()
    this.fetchCustomerSelectList()
    this.sealStatusList()
    this.getAllEnableTruckJs()


  },
  mounted: function () {
    this.idReq = this.$route.query.orderId
    if (this.$route.query.aa == 1) {
      this.selectByOrderIdList(this.idReq)
      this.dialogStatus = 'tijiao'
    } else {
      this.idReq = this.$route.query.orderId

      if (this.idReq !== '' && this.idReq !== undefined && this.idReq !== null) {

        this.selectByOrderIdList(this.idReq)
        this.dialogStatus = 'update'
      } else {
        if (window.sessionStorage.getItem('containerForm')) {
          this.form = JSON.parse(window.sessionStorage.getItem('containerForm'))
          this.fetchdriverSelectReq = JSON.parse(window.sessionStorage.getItem('fetchdriverSelectReq'))

        }
        this.dialogStatus = 'create'
      }
    }
    this.handleRateValidation()


  },
  beforeRouteLeave (to, from, next) {
    if (window.sessionStorage.getItem('containerFormFlag') === '1') {
      window.sessionStorage.removeItem('containerForm')
      window.sessionStorage.removeItem('fetchdriverSelectReq')

      window.sessionStorage.removeItem('containerFormFlag')
    } else {
      window.sessionStorage.setItem('containerForm', JSON.stringify(this.form))
      window.sessionStorage.setItem('fetchdriverSelectReq', JSON.stringify(this.fetchdriverSelectReq))

    }
    next()
  },
  methods: {
    getAllEnableTruckJs () {
      getAllEnableTruck().then(response => {
        this.form.plateNumberReqArr = response.data
      })
    },
    kilometreNumber () {
      this.form.kilometre = parseInt(this.form.kilometre)
    },
    handleRateValidation () {
      getRateValidation().then(res => {
        if (!res.data) {
          this.$message({
            message: '税率不能为空,请先前往系统设置界面设置税率',
            type: 'warning'
          })
        }
      })
    },
    handleRulesReq (e) {

      getDetailListByIdObj(e).then(res => {
        this.rulesDetailReq = res.data


        const rulesDetailReqLength = this.rulesDetailReq.length

        if (rulesDetailReqLength !== 0) {


          if (this.rulsNum == 0) {
            if (Number(this.form.kilometre) <= Number(this.rulesDetailReq[0].limitNum)) {

              this.form.recPrice = this.rulesDetailReq[0].price
              this.form.receivables = (this.rulesDetailReq[0].price * Number(this.form.kilometre)).toFixed(2)
            } else if (Number(this.form.kilometre) >= Number(this.rulesDetailReq[rulesDetailReqLength - 1].limitNum)) {
              this.form.recPrice = this.rulesDetailReq[rulesDetailReqLength - 1].price
              this.form.receivables = this.rulesDetailReq[rulesDetailReqLength - 1].price * Number(this.form.kilometre)
            } else {
              for (let i = 0; i < (this.rulesDetailReq.length - 1); i++) {
                if ((Number(this.form.kilometre) >= Number(this.rulesDetailReq[i].limitNum)) && (Number(this.form.kilometre) < Number(this.rulesDetailReq[i + 1].limitNum))) {
                  this.form.receivables = (this.rulesDetailReq[i].price * Number(this.form.kilometre)).toFixed(2)
                  this.form.recPrice = this.rulesDetailReq[0].price
                }
              }
            }
          } else if (this.rulsNum == 1) {
            if (Number(this.form.kilometre) <= Number(this.rulesDetailReq[0].limitNum)) {
              this.form.payPrice = this.rulesDetailReq[0].price
              this.form.needPay = (this.rulesDetailReq[0].price * Number(this.form.kilometre)).toFixed(2)
            } else if (Number(this.form.kilometre) >= Number(this.rulesDetailReq[rulesDetailReqLength - 1].limitNum)) {
              this.form.payPrice = this.rulesDetailReq[0].price
              this.form.needPay = (this.rulesDetailReq[rulesDetailReqLength - 1].price * Number(this.form.kilometre)).toFixed(2)
            } else {
              for (let i = 0; i < (this.rulesDetailReq.length - 1); i++) {
                if ((Number(this.form.kilometre) >= Number(this.rulesDetailReq[i].limitNum)) && (Number(this.form.kilometre) < Number(this.rulesDetailReq[i + 1].limitNum))) {
                  this.form.needPay = (this.rulesDetailReq[i].price * Number(this.form.kilometre)).toFixed(2)
                  this.form.payPrice = this.rulesDetailReq[0].price
                }
              }
            }
          }
        }
      })
    },
    handleTransportFee () {
      // this.rulsNum = 0
      // if (this.customerName !== '' && this.customerName !== null) {
      //   ordAccountingRulesObj('发货方', this.customerName).then(res => {
      //     if (res.data.length > 0) {
      //       this.centerDialogVisible = true
      //       this.ruleReq = res.data
      //       this.ruleForm2.value = res.data[0].id
      //     } else {
      //       this.$message.error('不存在此客户的计费规则')
      //     }
      //   })
      // } else {
      //   this.$message.error('请先输入客户名称')
      // }

      this.rulsNum = 0
      let str = ''
      if (this.form.customerId !== '') {
        for (let i = 0; i < this.fetchCustomerSelectReq.length; i++) {
          if (this.fetchCustomerSelectReq[i].customerId === this.form.customerId) {
            str = this.fetchCustomerSelectReq[i].customerName
          }
        }
        ordAccountingRulesObj('发货方', str).then(res => {
          if (res.data.length > 0) {
            this.centerDialogVisible = true
            this.ruleReq = res.data
          } else {
            this.$message.error('不存在此客户的计费规则')
          }
        })
      } else {
        this.$message.error('请先输入客户名称')
      }
    },
    handleTransportFee1 () {
      this.rulsNum = 1

      if (this.form.driverId !== '' && this.form.driverId !== null) {
        ordAccountingRulesObj1('承运商', this.form.driverId).then(res => {
          if (res.data.length > 0) {
            this.centerDialogVisible = true
            this.ruleReq = res.data
          } else {
            this.$message.error('不存在对应的计费规则')
          }
        })
      } else {
        this.$message.error('请先输入司机名称')
      }
    },
    beforeUpload (file) {
      var name = file.name;
      var file_name = name.split(".")[name.split(".").length - 1];
      if (file_name != "pdf") {
        this.$message.error("上传文件必须为PDF！")
        return false
      }
    },
    beforeUpload1 (file) {
      var name = file.name;
      var file_name = name.split(".")[name.split(".").length - 1];

      if (file_name != "png") {
        this.$message.error("只能上传png文件！")

        return false
      }
    },
    beforeUpload2 (file) {

      var name = file.name;
      var file_name = name.split(".")[name.split(".").length - 1];

      if (file.size > 512000) {
        this.$message.error("上传的文件大小不能超过500kb！")
        return false
      }
      if (file_name != "png" && file_name != "jpg" && file_name != "gif" && file_name != "bmp" && file_name != "jpeg") {
        this.$message.error("只能上传png、jpg、gif、bmp、jpeg文件！")
        return false
      }
    },
    handleRemove (file, fileList) {
      this.form.ordOrderFile.officialSeal = null
      this.fileList = []
    },
    handleRemove1 (file, fileList) {
      this.form.ordOrderFile.officialSeal = null
      this.fileList1 = []
    },
    handleRemove2 (file, fileList) {
      this.form.ordOrderFile.otherFiles = []
      this.fileList2 = fileList
      for (var item in this.fileList2) {
        var str = this.fileList2[item].url
        this.form.ordOrderFile.otherFiles.push(str)
      }

    },
    handleAvatarSuccess (res, file) {
      // this.form.ordOrderFile.pickupCnFile = file.response.data[0]
      this.form.ordOrderFile.pickupCnFile = file.response.data
      var obj1 = {
        name: '上传提箱单',
        // url: file.response.data[0]
        url: file.response.data
      }
      this.fileList.push(obj1)
      return true
    },
    handleAvatarSuccess1 (res, file) {
      // this.form.ordOrderFile.officialSeal = file.response.data[0]
      this.form.ordOrderFile.officialSeal = file.response.data

      var obj1 = {
        name: '上传公章',
        // url: file.response.data[0]
        url: file.response.data
      }
      this.fileList1.push(obj1)
      return true
    },
    handleAvatarSuccess2 (res, file) {
      var obj1 = {
        name: '其他文件',
        // url: file.response.data[0]
        url: file.response.data
      }
      this.fileList2.push(obj1)

      this.arr.push(file.response.data)


      this.form.ordOrderFile.otherFiles = []
      for (var item in this.fileList2) {
        var str = this.fileList2[item].url
        this.form.ordOrderFile.otherFiles.push(str)
      }


      //  this.form.ordOrderFile.otherFiles.push(file.response.data)
      return true
    },
    handlePreview (file) {

    },
    handleExceed (files, fileList) {
      this.$message.warning(`已超出限制上传文件个数`)
    },
    remoteMethod1 (query) {
      this.addressState = 1
      this.remoteMethod(query)
    },
    remoteMethod2 (query) {
      this.addressState = 2
      this.remoteMethod(query)
    },
    remoteMethod3 (query) {
      this.addressState = 3
      this.remoteMethod(query)
    },
    remoteMethod4 (query) {
      this.addressState = 4
      this.remoteMethod(query)
    },
    remoteMethod (query) {
      let addressObj = ''
      if (this.addressState == 1) {
        addressObj = 'pickupConDetailplace_arr'
      } else if (this.addressState == 2) {
        addressObj = 'returnConDetailplace_arr'
      } else if (this.addressState == 3) {
        addressObj = 'sendGoodsDetailplace_arr'
      } else if (this.addressState == 4) {
        addressObj = 'pickupGoodsDetailplace_arr'
      }
      query = query.replace(/(^\s*)|(\s*$)/g, '')
      this.getLimitfunction(query)
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          if (this.list) {
            this[addressObj] = this.list.filter(item => {
              return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
            })
          }
        }, 200)
      } else {
        this[addressObj] = []
      }
    },
    getFee () {

      var kilometre = this.form.kilometre
      var kmYf = this.form.kmYf
      var recPrice = this.form.recPrice
      // var receivables=this.form.receivables
      var payPrice = this.form.payPrice

      if (kilometre < 0 || kmYf < 0) {
        this.$notify({
          title: '提示',
          message: '公里数不能为负数',
          type: 'warning',
          duration: 2000
        })
      } else if (recPrice < 0) {
        this.$notify({
          title: '提示',
          message: '应收单价不能为负数',
          type: 'warning',
          duration: 2000
        })
      } else if (payPrice < 0) {
        this.$notify({
          title: '提示',
          message: '应付单价不能为负数',
          type: 'warning',
          duration: 2000
        })
      } else {
        if (this.form.kilometre != '') {
          if (this.form.recPrice != '' && this.form.recPrice != null) {
            this.form.receivables = (kilometre * recPrice).toFixed(2)
          }
          if (this.form.payPrice != '' && this.form.payPrice != null) {
            this.form.needPay = (kmYf * payPrice).toFixed(2)
          }
        }
      }
    },

    comjs (obj1, obj2) {
      var params = {
        origin: obj1,
        destination: obj2
      }

      getDistance(params).then(response => {

        this.distanceNum1 += response.data.data
      })
    },
    stateNum1 (obj, obj1) {
      var arr = obj
      for (var item in arr) {
        if (Number(item) + 1 < arr.length) {
          var a1 = arr[item].ssqArray.join(",") + arr[item].addressDetailPlace
          var a2 = arr[item].ssqArray.join(",") + arr[Number(item) + 1].addressDetailPlace
          var params = {
            origin: a1,
            destination: a2
          }

          getDistance(params).then(response => {
            this.distanceNum1 += response.data.data

            if (item == arr.length - 1 && obj1 == 1 && this.form.arrivalAdds.length > 1) {
              this.stateNum1(this.form.arrivalAdds, 2)
            }

            if (item == arr.length - 1 && obj1 == 2) {
              this.distanceNum += this.distanceNum1
              this.form.kilometre = this.distanceNum.toFixed(0)
              this.form.kmYf = this.form.kilometre
            } else if (item == arr.length - 1 && obj1 == 1 && this.form.arrivalAdds.length == 1) {
              this.distanceNum += this.distanceNum1
              this.form.kilometre = this.distanceNum.toFixed(0)
              this.form.kmYf = this.form.kilometre
            }
          })
        }

      }
    },


    getstate () {

      //driverId
      let flag1 = false
      let flag2 = false
      this.$refs.addressCom.$refs['pickupAddsForm'].validate((valid) => {
        flag1 = valid
      })
      this.$refs.addressCom1.$refs['arrivalAddsForm'].validate((valid) => {
        flag2 = valid
      })

      this.$refs["form"].validate(valid => {
        // if (valid && flag) {
        if (flag1 && flag2) {

          for (var item in this.$refs.addressCom.pickupAddsForm.pickupAdds) {
            this.$refs.addressCom.pickupAddsForm.pickupAdds[item].sort = Number(item)
          }
          for (var item in this.$refs.addressCom1.arrivalAddsForm.arrivalAdds) {
            this.$refs.addressCom1.arrivalAddsForm.arrivalAdds[item].sort = Number(item)
          }
          this.form.pickupAdds = this.$refs.addressCom.pickupAddsForm.pickupAdds
          this.form.arrivalAdds = this.$refs.addressCom1.arrivalAddsForm.arrivalAdds


          if (this.form.returnConPlaceArray.length == 0) {
            this.returnCon = true
          } else {
            this.returnCon = false
          }

          if (this.form.pickupConPlaceArray.length == 0) {
            this.pickupCon = true
          } else {
            this.pickupCon = false
          }

          this.distanceobj.direction = this.form.type

          if (this.distanceobj.direction == 0) {

            this.distanceobj.city1 =
              this.form.pickupConPlaceArray.join() + this.form.pickupConDetailplace
            // this.distanceobj.city2 =
            //   this.form.pickupGoodsPlaceArray.join() +
            //   this.form.pickupGoodsDetailplace

            this.distanceobj.city2 =
              this.form.pickupAdds[0].ssqArray.join(",") + this.form.pickupAdds[0].addressDetailPlace

            this.distanceobj.city3 =
              this.form.pickupAdds[this.form.pickupAdds.length - 1].ssqArray.join(",") + this.form.pickupAdds[this.form.pickupAdds.length - 1].addressDetailPlace

            this.distanceobj.city4 =
              this.form.arrivalAdds[0].ssqArray.join(",") + this.form.arrivalAdds[0].addressDetailPlace
          } else {
            // this.distanceobj.city1 =
            //   this.form.pickupConPlaceArray.join() +
            //   this.form.pickupGoodsDetailplace
            // this.distanceobj.city2 =
            //   this.form.sendGoodsPlaceArray.join() + this.form.sendGoodsDetailplace

            this.distanceobj.city1 = this.form.pickupAdds[this.form.pickupAdds.length - 1].ssqArray.join(",") + this.form.pickupAdds[this.form.pickupAdds.length - 1].addressDetailPlace

            this.distanceobj.city2 = this.form.arrivalAdds[0].ssqArray.join(",") + this.form.arrivalAdds[0].addressDetailPlace

            this.distanceobj.city3 = this.form.arrivalAdds[this.form.arrivalAdds.length - 1].ssqArray.join(",") + this.form.arrivalAdds[this.form.arrivalAdds.length - 1].addressDetailPlace

            this.distanceobj.city4 =
              this.form.returnConPlaceArray.join() + this.form.returnConDetailplace
          }
          if (
            this.distanceobj.direction != null &&
            this.distanceobj.direction != '' &&
            this.distanceobj.city1 != '' &&
            this.distanceobj.city2 != '' &&
            this.distanceobj.city3 != '' &&
            this.distanceobj.city4 != '' &&
            this.distanceobj.city1 != null &&
            this.distanceobj.city2 != null &&
            this.distanceobj.city3 != null &&
            this.distanceobj.city4 != null
          ) {
            var params = {
              origin: this.distanceobj.city1,
              destination: this.distanceobj.city2
            }

            if (params.origin != '' && params.origin != 'null' && params.origin != '' && params.origin != 'null') {
              getDistance(params).then(response => {
                this.distanceNum = response.data.data
                var params = {
                  origin: this.distanceobj.city3,
                  destination: this.distanceobj.city4
                }

                if (params.origin != '' && params.origin != 'null' && params.origin != '' && params.origin != 'null') {
                  getDistance(params).then(response => {
                    this.distanceNum += response.data.data + 50
                    this.form.kilometre = this.distanceNum.toFixed(0)
                    this.form.kmYf = this.form.kilometre

                    this.distanceNum1 = 0
                    if (this.form.pickupAdds.length > 1) {
                      this.stateNum1(this.form.pickupAdds, 1)
                    } else if (this.form.arrivalAdds.length > 1) {
                      this.stateNum1(this.form.arrivalAdds, 2)
                    }


                  })
                }
              })
            }
          }
        }

      })


    },

    handleAutocompletePick () {
      if (this.form.pickupConPlaceArray.length == 0) {
        this.pickupCon = true
        this.$notify({
          title: '提示',
          message: '请先选在前边对应的省市区地址。',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.$nextTick(function () {
          var th = this
          var map = new BMap.Map('pickerAllmap')
          var str_picker = th.form.pickupConPlaceArray[0] + th.form.pickupConPlaceArray[2]
          if ((str_picker === undefined) && (str_picker === '')) {
            map.centerAndZoom('全国', 12)
          } else {
            map.centerAndZoom(str_picker, 12)
          }
          var ac = new BMap.Autocomplete({
            'input': 'suggestId',
            'location': map
          })
          ac.addEventListener('onconfirm', function (e) {
            var _value = e.item.value
            th.form.pickupConDetailplace = _value.province + _value.city + _value.district + _value.street + _value.business
          })
        })
      }

    },

    handleAutocompleteBack () {
      if (this.form.returnConPlaceArray.length == 0) {
        this.returnCon = true
        this.$notify({
          title: '提示',
          message: '请先选在前边对应的省市区地址。',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.$nextTick(function () {
          var th = this
          var map = new BMap.Map('backAllmap')
          var str_picker = th.form.returnConPlaceArray[0] + th.form.returnConPlaceArray[2]
          if ((str_picker === undefined) && (str_picker === '')) {
            map.centerAndZoom('全国', 12)
          } else {
            map.centerAndZoom(str_picker, 12)
          }
          var ac = new BMap.Autocomplete({
            'input': 'suggestIdBack',
            'location': map
          })
          ac.addEventListener('onconfirm', function (e) {
            var _value = e.item.value
            th.form.returnConDetailplace = _value.province + _value.city + _value.district + _value.street + _value.business
          })
        })
      }

    },

    handleAutocompletepickupGoods () {
      if (this.form.pickupGoodsPlaceArray.length == 0) {
        this.pickupGoods = true
        this.$notify({
          title: '提示',
          message: '请先选在前边对应的省市区地址。',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.$nextTick(function () {
          var th = this
          var map = new BMap.Map('pickupGoodsAllmap')
          var str_picker = th.form.pickupGoodsPlaceArray[0] + th.form.pickupGoodsPlaceArray[2]
          if ((str_picker === undefined) && (str_picker === '')) {
            map.centerAndZoom('全国', 12)
          } else {
            map.centerAndZoom(str_picker, 12)
          }
          var ac = new BMap.Autocomplete({
            'input': 'suggestIdpickupGoods',
            'location': map
          })
          ac.addEventListener('onconfirm', function (e) {
            var _value = e.item.value
            th.form.pickupGoodsDetailplace = _value.province + _value.city + _value.district + _value.street + _value.business
          })
        })
      }

    },

    handleAutocompletesendGoods () {

      if (this.form.sendGoodsPlaceArray.length == 0) {

        this.sendGoods = true
        this.$notify({
          title: '提示',
          message: '请先选在前边对应的省市区地址。',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.$nextTick(function () {
          var th = this
          var map = new BMap.Map('sendGoodsAllmap')
          var str_picker = th.form.sendGoodsPlaceArray[0] + th.form.sendGoodsPlaceArray[2]
          if ((str_picker === undefined) && (str_picker === '')) {
            map.centerAndZoom('全国', 12)
          } else {
            map.centerAndZoom(str_picker, 12)
          }
          var ac = new BMap.Autocomplete({
            'input': 'suggestIdsendGoods',
            'location': map
          })
          ac.addEventListener('onconfirm', function (e) {
            var _value = e.item.value
            th.form.sendGoodsDetailplace = _value.province + _value.city + _value.district + _value.street + _value.business
          })
        })
      }

    },

    // 订单补录
    sendMsg2: function (formName) {
      debugger
      console.log(this.form)
      this.form.truckId = this.truckId
      this.form.driverPhone = this.driverphoneReq
      this.form.plateNumber = this.plateNumberReq
      window.sessionStorage.setItem('containerFormFlag', '1')
      for (var item in this.$refs.addressCom.pickupAddsForm.pickupAdds) {
        this.$refs.addressCom.pickupAddsForm.pickupAdds[item].sort = Number(item)
      }
      for (var item in this.$refs.addressCom1.arrivalAddsForm.arrivalAdds) {
        this.$refs.addressCom1.arrivalAddsForm.arrivalAdds[item].sort = Number(item)
      }

      this.form.pickupAdds = this.$refs.addressCom.pickupAddsForm.pickupAdds
      this.form.arrivalAdds = this.$refs.addressCom1.arrivalAddsForm.arrivalAdds

      let flag1 = false
      let flag2 = false
      this.$refs.addressCom.$refs['pickupAddsForm'].validate((valid) => {
        flag1 = valid
      })
      this.$refs.addressCom1.$refs['arrivalAddsForm'].validate((valid) => {
        flag2 = valid
      })

      // console.log(this.form)
      //
      this.$refs[formName].validate(valid => {
        if (valid && flag1 && flag2) {

          getRateValidation().then(res => {
            if (!res.data) {
              this.$message.error('税率不能为空,请先前往系统设置界面设置税率')
            } else {
              sendDriverObj2(this.form).then(res => {
                if (res.data.data) {
                  this.$notify({
                    title: '成功',
                    message: '发送成功',
                    type: 'success',
                    duration: 2000
                  })
                  router.push({ path: '/orderCenter/sendedOrder' })
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
          })
        } else {
          return false
        }
      })
    },


    sendMsg: function (formName) {
      debugger
      console.log(this.form)
      this.form.truckId = this.truckId
      this.form.driverPhone = this.driverphoneReq
      this.form.plateNumber = this.plateNumberReq
      window.sessionStorage.setItem('containerFormFlag', '1')
      for (var item in this.$refs.addressCom.pickupAddsForm.pickupAdds) {
        this.$refs.addressCom.pickupAddsForm.pickupAdds[item].sort = Number(item)
      }
      for (var item in this.$refs.addressCom1.arrivalAddsForm.arrivalAdds) {
        this.$refs.addressCom1.arrivalAddsForm.arrivalAdds[item].sort = Number(item)
      }

      this.form.pickupAdds = this.$refs.addressCom.pickupAddsForm.pickupAdds
      this.form.arrivalAdds = this.$refs.addressCom1.arrivalAddsForm.arrivalAdds

      let flag1 = false
      let flag2 = false
      this.$refs.addressCom.$refs['pickupAddsForm'].validate((valid) => {
        flag1 = valid
      })
      this.$refs.addressCom1.$refs['arrivalAddsForm'].validate((valid) => {
        flag2 = valid
      })

      // console.log(this.form)
      //
      this.$refs[formName].validate(valid => {
        if (valid && flag1 && flag2) {

          getRateValidation().then(res => {
            if (!res.data) {
              this.$message.error('税率不能为空,请先前往系统设置界面设置税率')
            } else {
              sendDriverObj(this.form).then(res => {
                if (res.data.data) {
                  this.$notify({
                    title: '成功',
                    message: '发送成功',
                    type: 'success',
                    duration: 2000
                  })
                  router.push({ path: '/orderCenter/sendedOrder' })
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
          })
        } else {
          return false
        }
      })
    },
    sendMsg1: function (formName) {
      this.form.driverPhone = this.driverphoneReq
      this.form.driverName = this.driverName
      this.form.plateNumber = this.plateNumberReq

      this.$refs[formName].validate(valid => {
        if (valid) {
          let resObj = {
            orderId: this.idReq,
            driverId: this.form.driverId
          }
          sendDriverObj1(resObj).then(res => {
            if (res.data) {
              this.$notify({
                title: '成功',
                message: '发送成功',
                type: 'success',
                duration: 2000
              })
              router.push({ path: '/orderCenter/sendedOrder' })
            }
          })
        } else {
          return false
        }
      })
    },
    getLimitfunction (objquery) {
      let cityArr = []
      let cityDetail = null
      let cityDetailArr = []
      if (this.addressState == 1) {
        cityArr = 'pickupConPlaceArray'
        cityDetail = 'pickupConDetailplace'
        cityDetailArr = 'pickupConDetailplace_arr'
      } else if (this.addressState == 2) {
        cityArr = 'returnConPlaceArray'
        cityDetail = 'returnConDetailplace'
        cityDetailArr = 'returnConDetailplace_arr'
      } else if (this.addressState == 3) {
        cityArr = 'sendGoodsPlaceArray'
        cityDetail = 'sendGoodsDetailplace'
        cityDetailArr = 'sendGoodsDetailplace_arr'
      } else if (this.addressState == 4) {
        cityArr = 'pickupGoodsPlaceArray'
        cityDetail = 'pickupGoodsDetailplace'
        cityDetailArr = 'pickupGoodsDetailplace_arr'
      }
      this[cityDetailArr] = []
      this.form[cityDetail] = objquery

      if (this.form[cityArr] != null && this.form[cityArr].length != 0) {
        if (
          this.form[cityArr][0] == '北京市' ||
          this.form[cityArr][0] == '天津市' ||
          this.form[cityArr][0] == '上海市' ||
          this.form[cityArr][0] == '重庆市'
        ) {
          var obj = {
            region: this.form[cityArr][0],
            query: this.form[cityDetail]
          }
        } else {
          var obj = {
            region: this.form[cityArr][1],
            query: this.form[cityDetail]
          }
        }
        cityLimitArr(obj).then(response => {
          this[cityDetailArr] = response.data
        })
      }
      this.getstate()
    },
    selectByOrderIdList: function (id) {

      selectByOrderId(id).then(response => {

        const res = response.data
        this.form = res

        if (this.form.pickupAdds.length == 0) {
          var obj = {
            addType: '0',
            addressCity: '',
            addressDetailPlace: '',
            planTime: '',
            contacts: '',
            contactsPhone: '',

            sort: 0,
            location: ''

          }

          this.form.pickupAdds.push(obj)
        }

        if (this.form.arrivalAdds.length == 0) {
          var obj1 = {

            addType: '1',
            addressCity: '',
            addressDetailPlace: '',
            planTime: '',
            contacts: '',
            contactsPhone: '',

            sort: 0,
            location: ''
          }

          this.form.arrivalAdds.push(obj1)
        }

        this.$refs.addressCom.pickupAddsForm.pickupAdds = this.form.pickupAdds
        this.$refs.addressCom1.arrivalAddsForm.arrivalAdds = this.form.arrivalAdds
        if (this.form.ordOrderFile == null) {
          this.form.ordOrderFile = {
            pickupCnFile: null,
            officialSeal: null,
            otherFiles: []
          }
        }
        if (this.form.type == '1') {
          this.contactReq = this.form.consignor
          this.customerPhoneReq = this.form.consignorPhone
        } else if (this.form.type == '0') {
          this.contactReq = this.form.consignee
          this.customerPhoneReq = this.form.consigneePhone
        }

        if (this.form.ordOrderFile.pickupCnFile != '' && this.form.ordOrderFile.pickupCnFile != null) {
          var obj1 = {
            name: '上传公章',
            url: this.form.ordOrderFile.pickupCnFile
          }
          this.fileList.push(obj1)
        }
        if (this.form.ordOrderFile.officialSeal != '' && this.form.ordOrderFile.officialSeal != null) {
          var obj1 = {
            name: '上传公章',
            url: this.form.ordOrderFile.officialSeal
          }
          this.fileList1.push(obj1)
        }
        this.fileList2 = []
        if (this.form.ordOrderFile.otherFiles != '' && this.form.ordOrderFile.otherFiles != null && this.form.ordOrderFile.otherFiles.length != 0) {
          var arr = this.form.ordOrderFile.otherFiles
          var legthArr = 0
          if (arr.length > 8) {
            legthArr = 8
          } else {
            legthArr = arr.length
          }
          for (var i = 0; i < legthArr; i++) {
            var obj1 = {
              name: '上传其它文件',
              url: arr[i]
            }
            this.fileList2.push(obj1)
          }
        }


        //获取客户结算方式
        if (this.form.customerId == '' || this.form.customerId == null) {
          this.form.customerId == null
        } else {
          this.customerSelectList(this.form.customerId)
        }

        //获取车牌号、司机、等信息
        getAllEnableTruck().then(response => {

          this.form.plateNumberReqArr = response.data


          for (var item in this.form.plateNumberReqArr) {
            if (this.form.plateNumberReqArr[item].plateNumber == this.form.plateNumber) {
              this.form.truckId = this.form.plateNumberReqArr[item].truckId
              this.truckId = this.form.plateNumberReqArr[item].truckId
              //   this.form.driverId=this.form.driverVO.driverId
              if (this.form.plateNumberReqArr[item].attribute == '0' || this.form.plateNumberReqArr[item].attribute == '1') {
                this.form.settlement = '1'
              } else if (this.form.plateNumberReqArr[item].attribute == '2') {
                this.form.settlement = '0'
              }
              this.form.driverId = ''
              this.getDriverByPlateIdJs(this.truckId)
            } else {
              this.form.truckId = ''
              this.form.driverId = ''
            }
          }


        })

        //   this.plateNumberReq = response.data.plateNumber
        //   this.driverphoneReq = response.data.driverVO.phone
        //   this.idcardNumberReq = response.data.driverVO.idcardNumber


        this.pickupConRes = res.pickupConPlaceArray
        this.pickupRes = res.pickupGoodsPlaceArray
        this.sendRes = res.sendGoodsPlaceArray
        this.returnRes = res.returnConPlaceArray
      })
    },
    getDriverByPlateIdJs (plateId) {
      this.form.truckId = this.truckId
      this.fetchdriverSelectReq = []
      this.form.driverId = ''
      for (var item in this.form.plateNumberReqArr) {
        if (this.form.plateNumberReqArr[item].truckId == plateId) {

          if (this.form.plateNumberReqArr[item].attribute == '0' || this.form.plateNumberReqArr[item].attribute == '1') {
            this.form.settlement = '1'
          } else if (this.form.plateNumberReqArr[item].attribute == '2') {
            this.form.settlement = '0'
          }
        }
      }

      if (plateId != '' && plateId != null) {
        getDriverByPlateId(plateId).then(res => {

          if (res.data.length == 0) {
            this.fetchdriverSelectReq = []
            this.driverphoneReq = ''
            this.idcardNumberReq = ''
            this.form.driverId = ''
          } else {
            this.fetchdriverSelectReq = res.data

            if (this.form.driverVO.driverId) {
              for (var item in this.fetchdriverSelectReq) {
                if (this.fetchdriverSelectReq[item].driverId == this.form.driverVO.driverId) {
                  this.form.driverId = this.form.driverVO.driverId
                  this.driverInfoReq(this.form.driverId)
                }
              }
            } else {
              this.form.driverId = ''
            }
          }
        })

      } else {
        this.truckId = ''
        this.driverphoneReq = ''
        this.idcardNumberReq = ''
        this.form.driverId = ''
      }


    },
    sealStatusList: function () {
      sealStatus().then(response => {
        this.sealStatusReq = response.data
      })
    },
    driverInfoReq: function (id) {

      if (id != '' && id != null) {
        driverSelect(id).then(response => {


          if (response.data.phone) {
            this.driverphoneReq = response.data.phone
            // this.form.driverphone = response.data.phone
          } else {
            this.driverphoneReq = ''
            this.form.driverphone = ''
          }
          if (response.data.idcardNumber) {
            this.idcardNumberReq = response.data.idcardNumber
            //  this.form.idcardNumber = response.data.idcardNumber
          } else {
            this.idcardNumberReq = ''
          }
          if (response.data.plateNumber) {
            this.plateNumberReq = response.data.plateNumber
          } else {
            this.plateNumberReq = ''
          }
          if (response.data.driverName) {
            this.driverName = response.data.driverName
          } else {
            this.driverName = ''
          }
          if (response.data.rate) {
            this.payRate = response.data.rate
            this.form.payRate = response.data.rate
          } else {
            this.payRate = ''
          }
        })
      } else {
        this.form.driverId = ''
        this.idcardNumberReq = ''
        this.idcardNumberReq = ''
      }

    },
    matchContact: function (obj) {
    },
    customerSelectList: function (id) {
      if (this.form.type == '' || this.form.type == null || this.form.type == undefined) {
        this.form.customerId = null
        this.$notify({
          title: '提示',
          message: '请选择去/回程',
          type: 'warning',
          duration: 2000
        })
      } else {
        customerSelect(id).then(response => {

          if (response.data.payWay) {
            this.form.balanceWay = response.data.payWay
          } else {
            this.form.balanceWay = ''
          }
          if (response.data.phone) {
            this.customerPhoneReq = response.data.phone
          } else {
            this.customerPhoneReq = ''
          }
          this.form.settlement = response.data.payWay
          // if (response.data.payWay == '0') {
          //   this.form.settlement = '1'
          // }else if (response.data.payWay == '1') {悠闲
          //   this.form.settlement = '0'
          // } else {
          //   this.form.settlement = ''
          // }
          if (response.data.contact) {
            this.contactReq = response.data.contact
          } else {
            this.contactReq = ''
          }
          if (response.data.customerName) {
            // alert(this.customerName)
            this.customerName = response.data.customerName
          } else {
            this.contactReq = ''
          }
          if (this.form.type == '1') {
            this.form.consignor = response.data.contact
            this.form.consignorPhone = response.data.phone
          } else if (this.form.type == '0') {
            this.form.consignee = response.data.contact
            this.form.consigneePhone = response.data.phone
          }
        })
      }
    },
    headCall: function (msg) {
      this.msg = msg
    },
    fetchdriverSelectList () {
      fetchdriverSelect().then(response => {
        this.fetchdriverSelectReq = response.data
        for (let i = 0; i < this.fetchdriverSelectReq.length; i++) {
          if (this.fetchdriverSelectReq[i].driverId === response.driverId) {
            this.driverphoneReq = this.fetchdriverSelectReq[i].phone
            this.plateNumberReq = this.fetchdriverSelectReq[i].plateNumber
          }
        }
      })
    },
    fetchCustomerSelectList () {
      fetchCustomerSelect().then(response => {
        this.fetchCustomerSelectReq = response.data
      })
    },
    order_typeList: function () {
      orderType().then(response => {
        this.orderTypeReq = response.data
      })
    },
    containerTypeReqList: function () {
      containerType().then(response => {
        this.containerTypeReq = response.data

      })
    },
    submitForm (formName) {
      this.form.truckId = this.truckId
      this.form.plateNumber = this.plateNumberReq


      for (var item in this.$refs.addressCom.pickupAddsForm.pickupAdds) {
        this.$refs.addressCom.pickupAddsForm.pickupAdds[item].sort = Number(item)
      }
      for (var item in this.$refs.addressCom1.arrivalAddsForm.arrivalAdds) {
        this.$refs.addressCom1.arrivalAddsForm.arrivalAdds[item].sort = Number(item)
      }

      this.form.pickupAdds = this.$refs.addressCom.pickupAddsForm.pickupAdds
      this.form.arrivalAdds = this.$refs.addressCom1.arrivalAddsForm.arrivalAdds


      let flag1 = false
      let flag2 = false
      this.$refs.addressCom.$refs['pickupAddsForm'].validate((valid) => {
        flag1 = valid
      })
      this.$refs.addressCom1.$refs['arrivalAddsForm'].validate((valid) => {
        flag2 = valid
      })
      console.log(this.form)

      this.$refs[formName].validate(valid => {

        if (valid && flag1 && flag2) {
          window.sessionStorage.setItem('containerFormFlag', '1')
          addObj(this.form).then(res => {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            router.push({ path: '/order/ordOrder' })
          })
        } else {
          return false
        }
      })
    },
    updateForm (formName) {
      this.form.truckId = this.truckId
      this.form.plateNumber = this.plateNumberReq
      for (var item in this.$refs.addressCom.pickupAddsForm.pickupAdds) {
        this.$refs.addressCom.pickupAddsForm.pickupAdds[item].sort = Number(item)
      }
      for (var item in this.$refs.addressCom1.arrivalAddsForm.arrivalAdds) {
        this.$refs.addressCom1.arrivalAddsForm.arrivalAdds[item].sort = Number(item)
      }
      this.form.pickupAdds = this.$refs.addressCom.pickupAddsForm.pickupAdds

      this.form.arrivalAdds = this.$refs.addressCom1.arrivalAddsForm.arrivalAdds


      let flag1 = false
      let flag2 = false
      this.$refs.addressCom.$refs['pickupAddsForm'].validate((valid) => {
        flag1 = valid
      })
      this.$refs.addressCom1.$refs['arrivalAddsForm'].validate((valid) => {
        flag2 = valid
      })
      this.$refs[formName].validate(valid => {
        if (valid && flag1 && flag2) {
          putObj(this.form).then((res) => {
            if (res.data.data) {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              router.push({ path: '/order/ordOrder' })
            }
          })
        } else {
          return false
        }
      })
    },


    updateFormT (formName) {
      this.form.truckId = this.truckId
      this.form.plateNumber = this.plateNumberReq
      for (var item in this.$refs.addressCom.pickupAddsForm.pickupAdds) {
        this.$refs.addressCom.pickupAddsForm.pickupAdds[item].sort = Number(item)
      }
      for (var item in this.$refs.addressCom1.arrivalAddsForm.arrivalAdds) {
        this.$refs.addressCom1.arrivalAddsForm.arrivalAdds[item].sort = Number(item)
      }
      this.form.pickupAdds = this.$refs.addressCom.pickupAddsForm.pickupAdds

      this.form.arrivalAdds = this.$refs.addressCom1.arrivalAddsForm.arrivalAdds


      let flag1 = false
      let flag2 = false
      this.$refs.addressCom.$refs['pickupAddsForm'].validate((valid) => {
        flag1 = valid
      })
      this.$refs.addressCom1.$refs['arrivalAddsForm'].validate((valid) => {
        flag2 = valid
      })
      this.$refs[formName].validate(valid => {
        if (valid && flag1 && flag2) {
          putObjT(this.form).then((res) => {
            if (res.data.data) {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              router.push({ path: '/orderCenter/sendedOrder' })
            }
          })
        } else {
          return false
        }
      })
    },

    newFiles (file) {
      this.uploadForm.append('file[]', file)
      return false
    }
  }
}
</script>

<style>
.header {
  padding-left: 12px;
  margin-left: 12px;
  margin-bottom: 24px;
}

.header:before {
  content: " ";
  width: 4px;
  height: 12px;
  border-left: 4px solid #2d8cf0;
  margin-right: 12px;
}

.cargoFormTitle {
  font-size: 14px;
  background-color: #2d8c94;
  color: #fff;
  padding-left: 24px;
  margin: 12px auto;
  border-radius: 6px;
}

.area-select .area-selected-trigger {
  line-height: 30px;
  padding: 0 18px 0 8px;
}

.bigSelect .area-select.large {
  width: 100%;
}

.multyText > .el-textarea__inner {
  height: 120px;
  padding-top: 0;
  padding-bottom: 0;
}

.upload-tag .el-upload-dragger {
  width: 125px;
  height: 85px;
}

.bigLabel .el-form-item__label {
  width: 220px !important;
}

.bigLabel .el-form-item__content {
  margin-left: 220px !important;
}
</style>
