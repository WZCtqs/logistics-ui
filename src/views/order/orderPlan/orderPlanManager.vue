<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="header">下单管理</div>
      <h2 class="cargoFormTitle">订单基本信息</h2>
      <el-form ref="form" label-width="100px" :model="form" :rules="formRules">
        <el-row>
          <el-col :span="7">
            <el-form-item label="派车日期" prop="date">
              <el-date-picker
                type="date"
                placeholder="派车日期"
                v-model="form.sendTruckDate"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="班列日期" prop="date">
              <el-date-picker
                type="date"
                placeholder="班列日期"
                v-model="form.classDate"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :disabled="true"
              >></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承运单位" prop="containerNo">
              <el-input v-model="form.carrier" placeholder="承运单位" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户名称" prop="customerId">

              <el-input v-model="customerName" :disabled="true"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="去/回程 " class="filter-item">
              <el-select
                @change="getstate()"
                class="filter-item"
                filterable
                placeholder="请选择"
                v-model="form.type"
                :disabled="true"
                @keyup.enter.native="handleFilter"
              >
                <el-option
                  v-for="item in orderTypeReq"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="货物品名" prop="productName">
              <el-input v-model="form.productName" :disabled="true" placeholder="货物品名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="总毛重" prop="weight">
              <el-input v-model="form.weight" :disabled="true" placeholder="总毛重"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="总体积" prop="size">
              <el-input v-model="form.size" :disabled="true" placeholder="总体积"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="集装箱号" :disabled="true" prop="containerNo">
              <el-input v-model="form.containerNo" placeholder="集装箱号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="箱型" prop="containerType">
              <el-input v-model="form.containerType" :disabled="true" placeholder="箱型"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="箱量" prop="containerNum">
              <el-input v-model="form.containerNum" :disabled="true" placeholder="箱型"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="提箱地" class="bigSelect" prop="pickupConPlaceArray">
              <area-cascader
                :level="1"
                type="text"
                @change="getstate()"
                @input="getstate()"
                @blur="getstate()"
                placeholder="请选择地区"
                v-model="form.pickupConPlaceArray"
                :data="pcaa"
                :disabled="true"
              ></area-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="14" class="bigLabel">
            <el-form-item label="提箱地详细地址" class="bigSelect">
              <!-- <el-input v-model="form.pickupConDetailplace" placeholder="提箱地详细地址"></el-input> -->
              <template>
                <el-select
                  v-model="form.pickupConDetailplace"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod1"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in pickupConDetailplace_arr"
                    :key="item.uid"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10">
            <el-form-item label="还箱地址" class="bigSelect" prop="returnConPlaceArray">
              <area-cascader
                :level="1"
                type="text"
                @change="getstate()"
                placeholder="请选择地区"
                v-model="form.returnConPlaceArray"
                :data="pcaa"
                :disabled="true"
              ></area-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="14" class="bigLabel">
            <el-form-item label="还箱地详细地址" class="bigSelect">
              <!-- <el-input v-model="form.returnConDetailplace" placeholder="还箱地详细地址" @input="getstate()" @blur="getstate()"></el-input> -->
              <template>
                <el-select
                  v-model="form.returnConDetailplace"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod2"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in returnConDetailplace_arr"
                    :key="item.uid"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8" v-if="form.type === '0'">
            <el-form-item label="发货人" prop="contactReq">
              <el-input placeholder="发货人" :disabled="true" v-model="form.consignor"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.type === '0'">
            <el-form-item label="联系方式" prop="customerPhoneReq">
              <el-input placeholder="发货人联系方式" :disabled="true" v-model="form.consignorPhone"></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="8" v-if="form.type === '1'">
            <el-form-item label="发货人" prop="contactReq">
              <el-input placeholder="发货人" :disabled="true"  v-model="contactReq" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.type === '1'">
            <el-form-item label="联系方式" prop="customerPhoneReq">
              <el-input placeholder="发货人联系方式" :disabled="true" v-model="customerPhoneReq" ></el-input>
            </el-form-item>
          </el-col>
       </el-row>
        <el-row>
          <el-col :span="8" v-if="form.type === '1'">
            <el-form-item label="收货人" prop="consignee">
              <el-input v-model="form.consignee" :disabled="true" placeholder="收货人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.type === '1'">
            <el-form-item label="联系方式" prop="consigneePhone">
              <el-input v-model="form.consigneePhone" :disabled="true" placeholder="收货人联系方式"></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="8" v-if="form.type === '0'">
            <el-form-item label="收货人" prop="contactReq">
              <el-input placeholder="收货人" :disabled="true" v-model="contactReq"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="form.type === '0'">
            <el-form-item label="联系方式" prop="customerPhoneReq">
              <el-input placeholder="收货人联系方式" :disabled="true" v-model="customerPhoneReq"></el-input>
            </el-form-item>
          </el-col>
      </el-row>


        <el-row>
          <el-col :span="8">
            <el-form-item label="提货日期" prop="date">
              <el-date-picker
                type="date"
                placeholder="提货日期"
                v-model="form.pickupGoodsDate"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="提货地" class="bigSelect" prop="pickupGoodsPlaceArray">
              <area-cascader
                :level="1"
                type="text"
                @change="getstate()"
                placeholder="请选择地区"
                v-model="form.pickupGoodsPlaceArray"
                :data="pcaa"
                :disabled="true"
              ></area-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="bigLabel">
            <el-form-item label="提货地详细地址" class="bigSelect">
              <!-- <el-input v-model="form.pickupGoodsDetailplace" placeholder="提货地详细地址" @input="getstate()" @blur="getstate()"></el-input> -->
              <template>
                <el-select
                  v-model="form.pickupGoodsDetailplace"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod4"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in pickupGoodsDetailplace_arr"
                    :key="item.uid"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>

          <el-col :span="8">
            <el-form-item label="送货日期" prop="date">
              <el-date-picker
                type="date"
                placeholder="送货日期"
                v-model="form.sendGoodsDate"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :disabled="true"
              >></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="送货地址" class="sendAdress bigSelect" prop="sendGoodsPlaceArray">
              <area-cascader
                :level="1"
                type="text"
                @change="getstate()"
                placeholder="请选择地区"
                v-model="form.sendGoodsPlaceArray"
                :data="pcaa"
                :disabled="true"
              ></area-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="送货地详细地址" class="bigLabel">
              <!-- <el-input v-model="form.sendGoodsDetailplace" placeholder="送货地详细地址" @input="getstate()" @blur="getstate()"></el-input> -->
              <template>
                <el-select
                  v-model="form.sendGoodsDetailplace"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod3"
                  :disabled="true"
                >
                  <el-option
                    v-for="item in sendGoodsDetailplace_arr"
                    :key="item.uid"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-show="!isShow">
          <el-col :span="12">
            <el-form-item label="铅封号">
              <el-input placeholder :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="铅封是否完好">
              <el-input placeholder :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发/收货人签字及时间">
              <el-input placeholder :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="司机签字及时间">
              <el-input placeholder :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="!isShow">
          <el-col :span="24">
            <el-form-item label="注意事项">
              <el-input
                type="textarea"
                class="multyText"
                :disabled="true"
                value="
                1、在您收到箱子后，请核对铅封号，如果铅封号被换或者是损坏，请拍铅封号照取证，拒绝接收箱子并及时告知我们
                2、铅封号完好，并签字确认后视同货物合格
                3、承运单位按照国际货物运输相应法律法规运输货物，交箱时，需保持箱、封完整，且号码与装货时一致；
                4、此单一式2份，一份留存承运司机，一份留存郑州国际陆港承运部门
              "
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" :disabled="true" v-model="form.remark" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h2 class="cargoFormTitle">车辆信息</h2>
        <el-row>
          <el-col :span="6">
            <el-form-item label="车牌号" prop="plateNumberReq">
              <el-input v-model="plateNumberReq" placeholder="车牌号" disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="司机姓名" prop="driverId">
              <el-select
                class="filter-item"
                v-model="form.driverId"
                :disabled="disabledBool"
                filterable
                placeholder="司机姓名"
                @change="driverInfoReq(form.driverId)"
              >
                <el-option
                  v-for="item in fetchdriverSelectReq"
                  :key="item.driverId"
                  :label="item.driverName"
                  :value="item.driverId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系方式" prop="driverphoneReq">
              <el-input placeholder="司机联系方式" v-model="driverphoneReq" disabled="disabled"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="身份证号" prop="idcardNumberReq">
              <el-input placeholder="司机身份证号" v-model="idcardNumberReq" disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
            <el-form-item label="公里数">
              <el-input :disabled="true" placeholder v-model="form.kilometre"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应收单价">
              <!-- <el-input :disabled="disabledBool" @input="getFee" @blur="getFee" placeholder v-model="form.recPrice"></el-input> -->
              <el-col :span="20">
                 <el-input :disabled="form.kilometre==null || form.kilometre=='' || disabledBool" @input="getFee" @blur="getFee" placeholder v-model="form.recPrice"></el-input>
              </el-col>
              <el-col :span="4">
              <el-button :disabled="form.kilometre==null || form.kilometre==''" type="primary" icon="el-icon-edit" circle @click="handleTransportFee"></el-button>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应收费用">
              <el-input placeholder v-model="form.receivables" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结算方式">
              <el-select :disabled="disabledBool" class="filter-item" v-model="form.settlement" filterable placeholder="请选择">
                <el-option v-for="item in settlementList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="应付单价">
              <el-input :disabled="disabledBool" @input="getFee" @blur="getFee" placeholder v-model="form.payPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="应付费用">
              <el-input placeholder v-model="form.needPay" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提箱费">
              <el-input :disabled="disabledBool" placeholder v-model="form.pickcnFee"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="压车费">
              <el-input :disabled="disabledBool" placeholder v-model="form.parkingFee"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <h2 class="cargoFormTitle">附件上传</h2>
        <el-row>
          <el-col :span="24">
            <div class="grid-content">附件上传</div>
            <el-col :span="8">
              <el-upload
                class="upload-demo"
                action="/order/ordFile/localUpload"
                :headers="headers"
                :before-upload="beforeUpload"
                :on-success="handleAvatarSuccess"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :limit="1"
                list-type="picture"
                :disabled="disabledBool"
              >
                <el-button size="small" type="primary" v-if="ord_order_upload">上传提箱单</el-button>
              </el-upload>
            </el-col>
            <el-col :span="8">
              <el-upload
                class="upload-demo"
                action="/order/ordFile/localUpload"
                :headers="headers"
                :before-upload="beforeUpload1"
                :on-success="handleAvatarSuccess1"
                :on-preview="handlePreview"
                :on-remove="handleRemove1"
                :file-list="fileList1"
                :limit="1"
                list-type="picture"
                :disabled="disabledBool"
              >
             <el-button size="small" type="primary" v-if="ord_order_upload">上传公章</el-button>
              </el-upload>
            </el-col>
            <el-col :span="8">

              <el-upload
                class="upload-demo"
                action="/order/ordFile/localUpload"
                :headers="headers"
                :before-upload="beforeUpload2"
                :on-success="handleAvatarSuccess2"
                :on-preview="handlePreview"
                :on-remove="handleRemove2"
                :file-list="fileList2"
                :limit="8"
                list-type="picture"
                :disabled="disabledBool"
              >
                <el-button size="small" type="primary" v-if="ord_order_upload">上传其它文件</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
      <div align="center">
        <!-- <el-button
          type="primary"
          @click="updateForm('form')"
          :disabled="disabledBool"
        >立即更新</el-button> -->
        <!-- <el-button @click="sendMsg1('form')" :disabled="disabledBool" >发送司机</el-button> -->
                <!-- <el-button @click="sendMsg1('form')" :disabled="false" >发送司机</el-button> -->

      </div>
    </div>

    <el-dialog
      title="计费规则"
      :visible.sync="centerDialogVisible"
      width="30%"
       append-to-body
      center>
      <el-form :model="ruleForm2" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="计费规则" prop="pass">
          <el-select v-model="ruleForm2.value" placeholder="请选择" @change="handleRulesReq">
            <el-option
              v-for="(item, index) in ruleReq"
              :key="item.index"
              :label="item.ruleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { pca, pcaa } from "area-data"; // 城市数据
import "vue-area-linkage/dist/index.css"; // 样式
import {
  addObj,
  customerSelect,
  driverSelect,
  fetchCustomerSelect,
  fetchdriverSelect,
  orderType,
  putObj,
  sealStatus,
  selectByOrderId,
  sendDriverObj,
  sendDriverObj1,
  getDistance,
  cityLimitArr,
  uploadFiles,
  ordAccountingRulesObj,
  getDetailListByIdObj
} from "@/api/orderPlanDetail";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { getToken } from "@/util/auth";
import { mapGetters } from "vuex";
// import linkage from '@/components/linkage/linkage'
import router from "@/router/router";
export default {
 props:['orderId','orderStatus'],
  name: "orderManager",
  directives: {
    waves
  },
  components: {},
  data() {
    return {
      headers: {
        Authorization: "Bearer " + getToken()
      },
      dialogVisible:true,
        ruleForm2: {
          value: ''
        },
      centerDialogVisible:false,
      ruleReq:[],
    //  customerName:"陆港",
      customerName:"",
      fileList2: [],
      fileList1:[],
      ord_order_upload: false,
      fileList: [],
      addressState: null,
      distanceNum: null,
      settlementList: ["直接存", "月结", "单结"],
      distanceobj: {
        direction: null,
        city1: null,
        city2: null,
        city3: null
      },
      savedraft: false,
      orderTypeReq: [],
      upload_url: "/order/ordFile/localUpload", // 随便填一个，但一定要有
      isShow: true,
      pcaa: pcaa,
      value1: [],
      dialogStatus: "",
      idReq:null,
      orderStatusReq:null,
      methodsAccount: [
        { value: "单结", label: "单结" },
        { value: "月结", label: "月结" }
      ],
      pickupConDetailplace_arr: [],
      returnConDetailplace_arr: [],
      sendGoodsDetailplace_arr: [],
      pickupGoodsDetailplace_arr: [],
      form: {
        consignor:"",
        consignorPhone:"",
        salesman: "",
        scheduleman: "",
        sendTruckDate: "",
        classDate: "",
        carrier: "",
        classOrder: "",
        customerId: "",
        contact: "",
        phone: "",
        type: "",
        productName: "",
        containerType: "",
        containerNum: "",
        weight: "",
        size: "",
        receiverPeople: "",
        sealNumber: "",
        sendGoodsPlaceArray: [],
        sendGoodsDetailplace: null,
        sendGoodsDate: "",
        pickupGoodsPlaceArray: [],
        pickupGoodsDetailplace: null,
        pickupGoodsDate: "",
        returnConPlaceArray: [],
        returnConDetailplace: null,
        idcardNumber: "",
        plateNumber: "",
        pickupConPlaceArray: [],
        pickupConDetailplace: null,
        driverId: "",
        driverphone: "",
        sealStatus: "",
        remark: "",
        orderName: "",

        kilometre: null,
        price: null,
        recPrice: null,
        receivables: null,
        payPrice: null,
        needPay: null,
        pickcnFee: null,
        parkingFee: null,
        settlement: "",
        ordOrderFile: {
          pickupCnFile: null,
          officialSeal: null,
          otherFiles: []
        }
      },
      otherFiles_arr: [],
      formRules: {
        orderName: [
          { required: true, message: "请输入订单名称", trigger: "blur" }
        ],
        receiverPeople: [
          { required: true, message: "请输入收货人", trigger: "blur" }
        ],
        customerId: [
          { required: true, message: "请输入客户名称", trigger: "blur" }
        ],
        type1: [
          { required: true, message: "请输入订单类型", trigger:"change"}
        ],
        type: [
          { required: true, message: "请输入订单类型", trigger: "change" }
        ],
        driverId: [
          { required: true, message: "请输入司机姓名", trigger: "change" }
        ]
      },
      msg: [],
      type: [],
      fetchdriverSelectReq: [],
      fetchCustomerSelectReq: [],
      driverphoneReq: "",
      idcardNumberReq: "",
      plateNumberReq: "",
      driverIdReq: "",
      typeReq: "",
      customerNameReq: "",
      contactReq: "",
      customerPhoneReq: "",
      sealStatusReq: "",
      selectByOrderIdReq: "",
      id: "",
      pickupConRes: "",
      pickupRes: "",
      sendRes: "",
      returnRes: "",
      arr:[],
      disabledBool:true
    };
  },

  computed: {
    ...mapGetters(["permissions"])
  },
  filters: {},
  created() {
    this.savedraft = this.permissions["savedraft"];
    // this.ord_order_add = this.permissions['ord_order_add']
    // this.ord_order_update = this.permissions['ord_order_update']
    this.ord_order_upload = this.permissions["ord_order_upload"];
    this.order_typeList();
    this.fetchdriverSelectList();
    this.fetchCustomerSelectList();
    this.sealStatusList();
  },
  mounted: function() {
    this.idReq =  this.orderId
    this.orderStatusReq=this.orderStatus
    if(this.orderStatusReq=='02'){
      this.disabledBool=false
    }else{
      this.disabledBool=true
    }
    this.selectByOrderIdList(this.idReq);
  },
  watch:{
    orderId: {
        handler(newV, oldV) {
           this.idReq = newV
            this.idReq = this.orderId
    this.selectByOrderIdList(this.idReq);
                },
        deep: true
      },
    orderStatus:{
       handler(newV, oldV) {
           this.idReq = newV
            this.orderStatusReq = this.orderStatus
                },
        deep: true
    }
  },
  methods: {
     handleTransportFee() {
        if (this.customerName !== '') {

          ordAccountingRulesObj(this.customerName).then(res => {
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
    handleRulesReq(e) {
         getDetailListByIdObj(e).then(res => {
          this.rulesDetailReq = res.data
          const rulesDetailReqLength = this.rulesDetailReq.length
          if (rulesDetailReqLength !== 0) {
            if (Number(this.form.kilometre) <= Number(this.rulesDetailReq[0].limitNum)) {
              this.form.recPrice=this.rulesDetailReq[0].price
              this.form.receivables = (this.rulesDetailReq[0].price * Number(this.form.kilometre)).toFixed(2)
            } else if (Number(this.form.kilometre) >= Number(this.rulesDetailReq[rulesDetailReqLength - 1].limitNum)) {
                this.form.recPrice=this.rulesDetailReq[0].price
              this.form.receivables = this.rulesDetailReq[rulesDetailReqLength - 1].price * Number(this.form.kilometre)
            } else {
              for (let i = 0; i < (this.rulesDetailReq.length - 1); i++) {
                if ((Number(this.form.kilometre) >= Number(this.rulesDetailReq[i].limitNum)) && (Number(this.form.kilometre) < Number(this.rulesDetailReq[i + 1].limitNum))) {
                  this.form.receivables = (this.rulesDetailReq[i].price * Number(this.form.kilometre)).toFixed(2)
                    this.form.recPrice=this.rulesDetailReq[0].price
                }
              }
            }
          }
        })
      },
    beforeUpload(file) {

    },
    beforeUpload1(file) {

    },
    beforeUpload2(file) {

    },
    handleRemove(file, fileList) {
      this.form.ordOrderFile.officialSeal = null;
       this.fileList=[]
    },
    handleRemove1(file, fileList) {
      this.form.ordOrderFile.officialSeal = null;
             this.fileList1=[]

    },
    handleRemove2(file, fileList) {
      var deletItem = file.response.data[0];
      var itemDeletm = this.form.ordOrderFile.otherFiles.findIndex((value, index, arr) => {
        return value = deletItem
      })
      this.form.ordOrderFile.otherFiles.delete(itemDeletm)
    },
    handleAvatarSuccess(res, file) {
      this.form.ordOrderFile.pickupCnFile= file.response.data[0]
       var obj1 = {
              name: '上传公章',
              url: file.response.data[0]
            }
      this.fileList.push(obj1)
      return true;
    },
    handleAvatarSuccess1(res, file) {
      this.form.ordOrderFile.officialSeal = file.response.data[0]
       var obj1 = {
              name: '上传公章',
              url: file.response.data[0]
            }
      this.fileList1.push(obj1)
       return true;
    },
    handleAvatarSuccess2(res, file) {
      var obj1 = {
              name: '其他文件',
              url: file.response.data[0]
            }
      this.fileList2.push(obj1)

      this.arr.push(file.response.data[0])
      this.form.ordOrderFile.otherFiles=this.arr
      return true;
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(`已超出限制上传文件个数`);

      //  this.$message.warning(`已超出限制上传文件个数，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    remoteMethod1(query) {
      this.addressState = 1;
      this.remoteMethod(query);
    },
    remoteMethod2(query) {
      this.addressState = 2;
      this.remoteMethod(query);
    },
    remoteMethod3(query) {
      this.addressState = 3;
      this.remoteMethod(query);
    },
    remoteMethod4(query) {
      this.addressState = 4;
      this.remoteMethod(query);
    },

    remoteMethod(query) {
      let addressObj = "";
      if (this.addressState == 1) {
        addressObj = "pickupConDetailplace_arr";
      } else if (this.addressState == 2) {
        addressObj = "returnConDetailplace_arr";
      } else if (this.addressState == 3) {
        addressObj = "sendGoodsDetailplace_arr";
      } else if (this.addressState == 4) {
        addressObj = "pickupGoodsDetailplace_arr";
      }
      query = query.replace(/(^\s*)|(\s*$)/g, "");
      this.getLimitfunction(query);
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this[addressObj] = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this[addressObj] = [];
      }
    },
    getFee() {
      var kilometre = this.form.kilometre;
      var recPrice = this.form.recPrice;
      // var receivables=this.form.receivables
      var payPrice = this.form.payPrice;
      //  var needPay=this.form.needPay
      if (this.form.kilometre != "") {
        if (this.form.recPrice != "" && this.form.recPrice != null) {
          this.form.receivables = kilometre * recPrice;
        }
        if (this.form.payPrice != "" && this.form.payPrice != null) {
          this.form.needPay = kilometre * payPrice;
        }
      }
    },
    getstate() {
      this.distanceobj.direction = this.form.type;

      if (this.distanceobj.direction == 0) {
        this.distanceobj.city1 =
          this.form.pickupConPlaceArray.join() + this.form.pickupConDetailplace;
        this.distanceobj.city2 =
          this.form.pickupGoodsPlaceArray.join() +
          this.form.pickupGoodsDetailplace;
        this.distanceobj.city3 =
          this.form.sendGoodsPlaceArray.join() + this.form.sendGoodsDetailplace;
      } else {
        this.distanceobj.city1 =
          this.form.pickupConPlaceArray.join() +
          this.form.pickupGoodsDetailplace;
        this.distanceobj.city2 =
          this.form.sendGoodsPlaceArray.join() + this.form.sendGoodsDetailplace;
        this.distanceobj.city3 =
          this.form.returnConPlaceArray.join() + this.form.returnConDetailplace;
      }

      if (
        this.distanceobj.direction != null &&
        this.distanceobj.direction != "" &&
        this.distanceobj.city1 != "" &&
        this.distanceobj.city2 != "" &&
        this.distanceobj.city3 != ""
      ) {
        var params = {
          origin: this.distanceobj.city1,
          destination: this.distanceobj.city2
        };
        getDistance(params).then(response => {
          this.distanceNum = response.data.data;
          var params = {
            origin: this.distanceobj.city2,
            destination: this.distanceobj.city3
          };
          getDistance(params).then(response => {
            this.distanceNum += response.data.data + 50;
            this.form.kilometre = this.distanceNum;
          });
        });
      }
    },
    sendMsg: function(formName) {
      this.form.plateNumber = this.plateNumberReq;
      this.$refs[formName].validate(valid => {
        if (valid) {
          sendDriverObj(this.form).then(res => {

            if (res.data.data) {
              this.$notify({
                title: "成功",
                message: "发送成功",
                type: "success",
                duration: 2000
              });
              router.push({ path: "/order/sendedOrder" });
            }
          });
        } else {
          return false;
        }
      });
    },
    sendMsg1: function(formName) {
        this.$refs[formName].validate(valid => {
        if (valid) {
            let resObj = {
              orderId: this.idReq,
              driverId: this.form.driverId
            };
            sendDriverObj1(resObj).then(res => {
              if (res.data) {
                this.$notify({
                  title: "成功",
                  message: "发送成功",
                  type: "success",
                  duration: 2000
                });

                router.push({ path: "/orderCenter/sendedOrder" });
              }
            });
        } else {
          return false;
        }
      });


    },
    getLimitfunction(objquery) {
      let cityArr = [];
      let cityDetail = null;
      let cityDetailArr = [];
      if (this.addressState == 1) {
        cityArr = "pickupConPlaceArray";
        cityDetail = "pickupConDetailplace";
        cityDetailArr = "pickupConDetailplace_arr";
      } else if (this.addressState == 2) {
        cityArr = "returnConPlaceArray";
        cityDetail = "returnConDetailplace";
        cityDetailArr = "returnConDetailplace_arr";
      } else if (this.addressState == 3) {
        cityArr = "sendGoodsPlaceArray";
        cityDetail = "sendGoodsDetailplace";
        cityDetailArr = "sendGoodsDetailplace_arr";
      } else if (this.addressState == 4) {
        cityArr = "pickupGoodsPlaceArray";
        cityDetail = "pickupGoodsDetailplace";
        cityDetailArr = "pickupGoodsDetailplace_arr";
      }
      this[cityDetailArr] = [];
      this.form[cityDetail] = objquery;

      if (this.form[cityArr] != null && this.form[cityArr].length != 0) {
        if (
          this.form[cityArr][0] == "北京市" ||
          this.form[cityArr][0] == "天津市" ||
          this.form[cityArr][0] == "上海市" ||
          this.form[cityArr][0] == "重庆市"
        ) {
          var obj = {
            region: this.form[cityArr][0],
            query: this.form[cityDetail]
          };
        } else {
          var obj = {
            region: this.form[cityArr][1],
            query: this.form[cityDetail]
          };
        }
        cityLimitArr(obj).then(response => {
          this[cityDetailArr] = response.data;
        });
      }
      this.getstate();
    },
    selectByOrderIdList: function(id) {
      var obj=this.orderId
      selectByOrderId(obj).then(response => {
        const res = response.data;
        this.form = res;

        this.customerSelectList(this.form.customerId)
        if(this.form.ordOrderFile==null){
           this.form.ordOrderFile={
              pickupCnFile: null,
              officialSeal: null,
              otherFiles: []
            }
        }
        if(this.form.ordOrderFile.pickupCnFile != "" && this.form.ordOrderFile.pickupCnFile != null){
            var obj1 = {
              name: '上传公章',
              url: this.form.ordOrderFile.pickupCnFile
            }
           this.fileList.push(obj1)

        }
        if(this.form.ordOrderFile.officialSeal != "" && this.form.ordOrderFile.officialSeal != null){
           var obj1 = {
              name: '上传公章',
              url: this.form.ordOrderFile.officialSeal
            }
           this.fileList1.push(obj1)
         }
         this.fileList2=[]
        if(this.form.ordOrderFile.otherFiles != "" && this.form.ordOrderFile.otherFiles != null && this.form.ordOrderFile.otherFiles.length != 0){
           var arr=this.form.ordOrderFile.otherFiles
           var legthArr=0
           if(arr.length>8){
             legthArr=8
           }else{
             legthArr=arr.length
           }
           for(var i=0; i<legthArr;i++){
               var obj1 = {
              name: '上传其他文件',
              url:arr[i]
            }
             this.fileList2.push(obj1)
           }


        }
        // fetchCustomerSelect().then(response => {
        //
        //   this.fetchCustomerSelectReq = response.data;
        //       // this.contactReq = "ceshi123";
        //       // this.customerPhoneReq = "123ceshi";
        //   for (let i = 0; i < this.fetchCustomerSelectReq.length; i++) {
        //     if (this.fetchCustomerSelectReq[i].customerId === res.customerId) {
        //       this.contactReq = this.fetchCustomerSelectReq[i].contact;

        //       this.customerPhoneReq = this.fetchCustomerSelectReq[i].phone;
        //     }
        //   }
        // });
        fetchdriverSelect().then(response => {
          this.fetchdriverSelectReq = response.data;
          for (let i = 0; i < this.fetchdriverSelectReq.length; i++) {
            if (this.fetchdriverSelectReq[i].driverId === res.driverId) {
              this.driverphoneReq = this.fetchdriverSelectReq[i].phone;
              this.plateNumberReq = this.fetchdriverSelectReq[i].plateNumber;
              this.idcardNumberReq = this.fetchdriverSelectReq[i].idcardNumber;
            }
          }
        });
        this.pickupConRes = res.pickupConPlaceArray;
        this.pickupRes = res.pickupGoodsPlaceArray;
        this.sendRes = res.sendGoodsPlaceArray;
        this.returnRes = res.returnConPlaceArray;
      });
    },
    sealStatusList: function() {
      sealStatus().then(response => {
        this.sealStatusReq = response.data;
      });
    },
    driverInfoReq: function(id) {
      driverSelect(id).then(response => {
        if (response.data.phone) {
          this.driverphoneReq = response.data.phone;
        } else {
          this.driverphoneReq = "";
        }
        if (response.data.idcardNumber) {
          this.idcardNumberReq = response.data.idcardNumber;
        } else {
          this.idcardNumberReq = "";
        }
        if (response.data.plateNumber) {
          this.plateNumberReq = response.data.plateNumber;
        } else {
          this.plateNumberReq = "";
        }
      });
    },
    customerSelectList: function(id) {
      customerSelect(id).then(response => {

        if (response.data.phone) {
          this.customerPhoneReq = response.data.phone;
        } else {
          this.customerPhoneReq = "";
        }
        if (response.data.contact) {
          this.contactReq = response.data.contact;
        } else {
          this.contactReq = "";
        }
         if (response.data.customerName) {
                  this.customerName = response.data.customerName;

                } else {
                  this.contactReq = "";
                }
      });
    },
    headCall: function(msg) {
      this.msg = msg;
    },
    fetchdriverSelectList() {
      fetchdriverSelect().then(response => {
        this.fetchdriverSelectReq = response.data;
      });
    },
    fetchCustomerSelectList() {
      fetchCustomerSelect().then(response => {
        this.fetchCustomerSelectReq = response.data;
      });
    },
    order_typeList: function() {
      orderType().then(response => {
        this.orderTypeReq = response.data;
      });
    },

    updateForm(formName) {

      this.form.plateNumber = this.plateNumberReq;


      this.$refs[formName].validate(valid => {
        if (valid) {

          putObj(this.form).then((res) => {
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });

           // router.push({ path: "/order/orderPlan" });
           let flag = false;
           this.$emit('closeMain',flag);
          });
        } else {
          return false;
        }
      });
    },
    newFiles(file) {
      this.uploadForm.append("file[]", file);
      return false;
    }
  }
};
export function newExp(data) {
  return axios({
    method: "post", // 方式一定是post
    url: "你的后台接收函数路径",
    timeout: 20000,
    data: data // 参数需要是单一的formData形式
  });
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
