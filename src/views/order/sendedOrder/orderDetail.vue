<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> 下单管理
          </span>
          <div>订单编号:{{form.orderId}} 订单状态:{{form.statusDec}}</div>
          <h2 class="cargoFormTitle">订单基本信息</h2>
          <el-form ref="form"
                   label-width="100px"
                   :disabled="true"
                   :model="form"
                   :rules="formRules">
            <el-row>
              <el-col :span="6">
                <el-form-item label="派车日期"
                              prop="date">
                  <el-date-picker type="date"
                                  placeholder="派车日期"
                                  v-model="form.sendTruckDate"
                                  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </el-col>

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
                                  value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="去/回程 "
                              class="filter-item">
                  <el-select class="filter-item"
                             filterable
                             placeholder="请选择"
                             v-model="form.type"
                             @keyup.enter.native="handleFilter"
                             clearable>
                    <el-option v-for="item in orderTypeReq"
                               :key="item.id"
                               :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="16">
                <el-form-item label="承运单位"
                              prop="containerNo">

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
              <el-col :span="6">
                <el-form-item label="铅封号"
                              prop="date">
                  <el-input v-model="form.sealNumber"
                            placeholder="铅封号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="集装箱号"
                              prop="containerNo">
                  <el-input v-model="form.containerNo"
                            placeholder="集装箱号"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="总体积"
                              prop="size">
                  <el-input v-model="form.size"
                            placeholder="总体积"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="箱型"
                              prop="containerType">
                  <el-input v-model="form.containerType"
                            placeholder="箱型"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="箱量"
                              prop="containerNum">
                  <el-input v-model="form.containerNum"
                            placeholder="箱型"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="总毛重"
                              prop="weight">
                  <el-input v-model="form.weight"
                            placeholder="总毛重"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6"
                      v-if="form.type=='0'">
                <el-form-item label="提箱地"
                              class="bigSelect"
                              prop="pickupConPlace">
                  <el-input v-model="form.pickupConPlace"
                            placeholder="提箱地"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18"
                      v-if="form.type=='0'">
                <el-form-item label="提箱详细地址"
                              class="bigSelect"
                              prop="pickupConDetailplace">
                  <el-input v-model="form.pickupConDetailplace"
                            placeholder="提箱详细地址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6"
                      v-if="form.type=='1'">
                <el-form-item label="还箱地址"
                              class="bigSelect"
                              prop="returnConPlace">
                  <el-input v-model="form.returnConPlace"
                            placeholder="还箱地址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18"
                      v-if="form.type=='1'">
                <el-form-item label="还箱详细地址"
                              class="bigSelect"
                              prop="returnConDetailplace">
                  <el-input v-model="form.returnConDetailplace"
                            placeholder="还箱详细地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- <addressCom ref="addressCom" :consignorData="consignorData" :editStatus="editFlag"></addressCom>
            <addressCom1 ref="addressCom1" :consigneeData="consigneeData" :editStatus="editFlag"></addressCom1> -->

            <addressCom ref="addressCom"
                        :pickupAddsForm="form"
                        :ableStr="true"></addressCom>
            <addressCom1 ref="addressCom1"
                         :arrivalAddsForm="form"
                         :ableStr="true"></addressCom1>

            <el-row v-show="!isShow">
              <el-col :span="12">
                <el-form-item label="铅封号">
                  <el-input placeholder></el-input>
                </el-form-item>
              </el-col>
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
            <h2 class="cargoFormTitle">司机信息</h2>
            <el-row>
              <el-col :span="8">
                <el-form-item label="车牌号"
                              prop="plateNumberReq">
                  <el-input v-model="form.plateNumber"
                            placeholder="车牌号"
                            disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="司机姓名"
                              prop="driverId">

                  <el-input v-model="form.driverName"
                            placeholder="车牌号"
                            disabled="disabled"></el-input>

                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系方式"
                              prop="driverphoneReq">
                  <el-input placeholder="司机联系方式"
                            v-model="form.driverPhone"
                            disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="身份证号"
                              prop="idcardNumberReq">
                  <el-input placeholder="司机身份证号"
                            v-model="form.driverVO.idcardNumber"
                            disabled="disabled"></el-input>
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
            <h2 class="cargoFormTitle">附件查看</h2>
            <el-row>
              <el-col :span="24">
                <a class="download_a"
                   v-if="form.ordOrderFile.pickupCnFile != null"
                   :href='form.ordOrderFile.pickupCnFile'
                   download="提箱单原件预览">提箱单原件预览</a>
                <a class="download_a1"
                   v-if="form.ordOrderFile.pickupCnFile == null"
                   @click="Tigmsg">提箱单原件预览</a>

                <a class="download_a"
                   v-if="form.ordOrderFile.officialSeal != null"
                   :href='form.ordOrderFile.officialSeal'
                   download="提箱单公章预览">提箱单公章预览</a>
                <a class="download_a1"
                   v-if="form.ordOrderFile.officialSeal == null"
                   @click="Tigmsg">提箱单公章预览</a>

                <a class="download_a"
                   v-if="form.ordOrderFile.pickupCnNewfile != null"
                   :href='form.ordOrderFile.pickupCnNewfile'
                   download="提箱单预览">提箱单预览</a>
                <a class="download_a1"
                   v-if="form.ordOrderFile.pickupCnNewfile == null"
                   @click="Tigmsg">提箱单预览</a>

                <a class="download_a"
                   v-if="form.ordOrderFile.sendTruckFile != null"
                   :href='form.ordOrderFile.sendTruckFile'
                   download="派车单预览">派车单预览</a>
                <a class="download_a1"
                   v-if="form.ordOrderFile.sendTruckFile == null"
                   @click="Tigmsg">派车单预览</a>

                <a class="download_a1"
                   v-if="form.ordOrderFile.receiptPng == null"
                   @click="handleQsd(form.ordOrderFile.receiptPng)">签收单查看<em> </em></a>
                <span v-show="form.ordOrderFile.receiptPng != null"
                      v-for="(item,index) in form.ordOrderFile.receiptPng"
                      :key="index">
                  {{form.ordOrderFile.receiptPng.length}}
                  <a class="download_a"
                     v-bind:href='item'
                     download="派车单预览">派车单预览{{index}}</a>
                </span>
              </el-col>
            </el-row>
            <h2 class="cargoFormTitle">费用明细</h2>
            <el-row>
              <el-col :span="8">
                <el-form-item label="公里数">
                  <el-input placeholder
                            v-model="form.kilometre"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="应收单价">
                  <el-input placeholder
                            v-model="form.recPrice"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="应收费用">
                  <el-input placeholder
                            v-model="form.receivables"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结算方式">

                  <span v-if="form.settlement=='0'">
                    <el-input placeholder
                              value="单结"></el-input>
                  </span>
                  <span v-if="form.settlement=='1'">
                    <el-input placeholder
                              value="月结"></el-input>
                  </span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="应付单价">
                  <el-input placeholder
                            v-model="form.payPrice"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="应付费用">
                  <el-input placeholder
                            v-model="form.needPay"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item label="提箱费">
                  <el-input placeholder v-model="form.pickcnFee"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="压车费">
                  <el-input placeholder v-model="form.parkingFee"></el-input>
                </el-form-item>
              </el-col> -->
            </el-row>
            <!-- <h2 class="cargoFormTitle">司机位置记录</h2>
            <el-row
              v-for="(item,index) in form.ordOrderLogistics1"
              :key="index"
              style="border-bottom:1px solid #eee; background:#f5f5f5;"
            >
              <el-col :span="10">
                <el-form-item label="时间">{{item.logisticsTime | moment('YYYY-MM-DD')}}</el-form-item>
              </el-col>
              <el-col :span="2">

              </el-col>
              <el-col :span="12">
                <el-form-item label="位置">{{item.logisticsAddress}}</el-form-item>
              </el-col>
            </el-row> -->

            <h2 class="cargoFormTitle">司机位置记录</h2>
            <el-steps direction="vertical"
                      :active="1"
                      :space="90">
              <el-step v-for="(item,index) in form.ordOrderLogistics1"
                       :key="index"
                       :icon="index===0?'el-icon-location':'el-icon-circle-check'"
                       :description="'位置:' + item.logisticsAddress"
                       :title="'时间:' + item.logisticsTime.substring(0, 10)"></el-step>
            </el-steps>

          </el-form>
          <div align="center"></div>
        </el-tab-pane>
        <el-tab-pane label="异常费用">
          <template v-if="form.ordExceptionFees.length === 0">
            <div class="CnoData">
              <div class="CnoDataDiv">
                <i class="el-icon-document"></i>
                <div>暂无异常数据</div>
              </div>
            </div>
          </template>
          <template v-else>
            <el-card class="box-card"
                     v-for="(item,index) in form.ordExceptionFees"
                     :key="index">
              <h4 class="abnormalRecordTitle">异常费用{{index+1 }}</h4>
              <el-row>
                <el-col :span="8">
                  异常类型：
                  <span v-if="item.exceptionFeeType === '0'">过桥费</span>
                  <span v-if="item.exceptionFeeType === '1'">压车费</span>
                  <span v-if="item.exceptionFeeType === '2'">放空费</span>
                </el-col>
                <el-col :span="8">
                  处理状态：
                  <span v-if="item.auditing === '0'">未审核</span>
                  <span v-if="item.auditing === '1'">通过</span>
                  <span v-if="item.auditing === '2'">拒绝</span>
                </el-col>
                <el-col :span="8">
                  <!-- 上报时间：{{item.applyTime}} -->
                  <el-row>
                    <el-col :span="8">上报时间:</el-col>
                    <el-col :span="12">
                      {{item.applyTime | moment('YYYY-MM-DD')}}

                    </el-col>
                  </el-row>
                </el-col>
                <!-- <el-col :span="8">上报司机：{{item.driverName}}</el-col> -->
                <el-col :span="8">审核人：{{item.transactorName}}</el-col>
                <el-col :span="8">
                  <!-- 审核时间：{{item.handleTime}} -->
                  <el-row>
                    <el-col :span="8">审核时间:</el-col>
                    <el-col :span="12">
                      {{item.handleTime | moment('YYYY-MM-DD')}}

                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="8">异常费用金额：{{item.exceptionFee}}</el-col>
              </el-row>
              <el-row>
                <el-col>异常费用凭证:
                  <!-- {{item.imgUrl}} -->
                  <el-row>
                    <el-col :span="24">
                      <span v-for="item1 in item.imgUrlFile"
                            :key="item1">
                        <img v-bind:src="item1"
                             style="width:auto; height:165px; margin-right:15px;" />
                      </span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col>异常费用备注:{{item.remark}}</el-col>
                <!-- <el-col>状态信息:{{item.orderStatus}}</el-col> -->
                <el-col v-if="item.orderStatus=='1'">状态信息：待派车</el-col>
                <el-col v-if="item.orderStatus=='2'">状态信息：待接单</el-col>
                <el-col v-if="item.orderStatus=='3'">状态信息：待提箱</el-col>
                <el-col v-if="item.orderStatus=='4'">状态信息：提箱中</el-col>
                <el-col v-if="item.orderStatus=='5'">状态信息：待提货</el-col>
                <el-col v-if="item.orderStatus=='6'">状态信息：提货中</el-col>
                <el-col v-if="item.orderStatus=='7'">状态信息：运输中</el-col>
                <el-col v-if="item.orderStatus=='8'">状态信息：签收中</el-col>
                <el-col v-if="item.orderStatuss=='9'">状态信息：已签收</el-col>
                <el-col v-if="item.orderStatus=='10'">状态信息：还箱中</el-col>
                <el-col v-if="item.orderStatus=='11'">状态信息：已还箱</el-col>
                <el-col v-if="item.orderStatus=='12'">状态信息：已提交</el-col>
              </el-row>
            </el-card>
          </template>
        </el-tab-pane>
        <el-tab-pane label="异常情况">
          <template v-if="form.ordExceptionConditions.length === 0">
            <div class="CnoData">
              <div class="CnoDataDiv">
                <i class="el-icon-document"></i>
                <div>暂无异常数据</div>
              </div>
            </div>
          </template>
          <template v-else>
            <el-card class="box-card"
                     v-for="(item,index) in form.ordExceptionConditions"
                     :key="index">
              <h4 class="abnormalRecordTitle">异常情况{{index+1 }}</h4>
              <el-row>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="4">上报时间:</el-col>
                    <el-col :span="16">
                      {{item.submitDate | moment('YYYY-MM-DD')}}

                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="8">上报司机:{{item.driver}}</el-col>
              </el-row>
              <el-row>
                <el-col>异常情况:
                  <img v-bind:src="oecFile"
                       style="width:auto; height:65px;">
                  <el-row>
                    <el-col :span="24">
                      <span v-for="item1 in item.paths"
                            :key="item1">
                        <img v-bind:src="item1"
                             style="width:auto; height:165px; margin-right:15px" />
                      </span>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col>异常费用备注:{{item.exRemarks}}</el-col>
                <el-col v-if="item.orderStatus=='1'">状态信息：待派车</el-col>
                <el-col v-if="item.orderStatus=='2'">状态信息：待接单</el-col>
                <el-col v-if="item.orderStatus=='3'">状态信息：待提箱</el-col>
                <el-col v-if="item.orderStatus=='4'">状态信息：提箱中</el-col>
                <el-col v-if="item.orderStatus=='5'">状态信息：待提货</el-col>
                <el-col v-if="item.orderStatus=='6'">状态信息：提货中</el-col>
                <el-col v-if="item.orderStatus=='7'">状态信息：运输中</el-col>
                <el-col v-if="item.orderStatus=='8'">状态信息：签收中</el-col>
                <el-col v-if="item.orderStatuss=='9'">状态信息：已签收</el-col>
                <el-col v-if="item.orderStatus=='10'">状态信息：还箱中</el-col>
                <el-col v-if="item.orderStatus=='11'">状态信息：已还箱</el-col>
                <el-col v-if="item.orderStatus=='12'">状态信息：已提交</el-col>
              </el-row>
            </el-card>
          </template>
        </el-tab-pane>
        <el-tab-pane label="单据信息">
          <h2 class="cargoFormTitle">提货凭证</h2>
          <div v-if="consignorData && consignorData.length>=1">
            <template v-for="(item,index) in consignorData">
              <div :key="index">
                <p>提货地址：{{item.addressDetailPlace}}</p>
                <template v-for="(itemFile,itemIndex) in item.fileArray">

                  <img :src="itemFile"
                       alt=""
                       :key="itemIndex">
                </template>
              </div>
            </template>
          </div>
          <div v-else>
            <p>暂无提货凭证</p>
          </div>
          <h2 class="cargoFormTitle">提箱凭证</h2>
          <div>
            <template>
              <div>
                <p>提箱地址：{{form.pickHnAddress.addressCity}}{{form.pickHnAddress.addressDetailPlace}}</p>
                <p>上传时间：{{form.pickHnAddress.successTime}}</p>
                <p>备注：{{form.pickHnAddress.remark }}</p>
                <!-- <template v-for="(itemFile,itemIndex) in item.fileArray">
                  <img :src="itemFile"
                       alt=""
                       :key="itemIndex">
                </template> -->
              </div>
            </template>
          </div>
          <!-- <div v-else>
            <p>暂无提箱凭证</p>
          </div> -->
          <h2 class="cargoFormTitle">签收凭证</h2>
          <div v-if="consigneeData && consigneeData.length>=1">
            <template v-for="(item,index) in consigneeData">
              <div :key="index">
                <p>{{item.addressDetailPlace}}</p>
                <template v-for="items in item.fileArray">
                  <img :src="items"
                       alt=""
                       class="FileImg">
                </template>
              </div>
            </template>
          </div>
          <div v-else>
            <p>暂无签收凭证</p>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>
<script>
import { pcaa } from 'area-data' // 城市数据
import 'vue-area-linkage/dist/index.css' // 样式
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
  sendDriverObj
} from '@/api/orderManager'
import waves from '@/directive/waves/index.js' // 水波纹指令
import addressCom from '@/views/order/ordOrder/addressCom.vue'
import addressCom1 from '@/views/order/ordOrder/addressCom1.vue'
import { mapGetters } from 'vuex'
import { debuglog } from 'util';
// import linkage from '@/components/linkage/linkage'
export default {
  props: ['orderDetailId'],
  name: 'orderManager',
  directives: {
    waves
  },

  data () {
    return {
      settlementList: [{ 'value': '0', 'label': '单结' }, { 'value': '1', 'label': '月结' }],
      editFlag: true,
      orderTypeReq: [],
      upload_url: 'aaa', // 随便填一个，但一定要有
      isShow: true,
      pcaa: pcaa,
      value1: [],
      dialogStatus: '',
      idReq: this.$route.params.id,
      methodsAccount: [
        { value: '单结', label: '单结' },
        { value: '月结', label: '月结' }
      ],
      ordOrderLogistics: [],
      ordExceptionArrary: [],
      form: {
        ordExceptionConditions: [],
        ordExceptionFees: [],
        ordOrderLogistics1: [],
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
        weight: '',
        size: '',
        receiverPeople: '',
        sealNumber: '',
        sendGoodsPlaceArray: [],
        sendGoodsPlace: null,
        sendGoodsDetailplace: null,
        sendGoodsDate: '',
        pickupGoodsPlaceArray: [],
        pickupGoodsDetailplace: null,
        pickupGoodsPlace: null,
        pickupGoodsDate: '',
        returnConPlaceArray: [],
        returnConPlace: null,
        returnConDetailplace: null,
        idcardNumber: '',
        plateNumber: '',
        pickupConPlaceArray: [],
        pickupConPlace: null,
        pickupConDetailplace: null,
        driverId: '',
        driverphone: '',
        sealStatus: '',
        remark: '',
        orderName: '',
        driverPhone: '',
        DriverVO: null,
        driverNam: ''
      },
      formRules: {
        orderName: [
          { required: true, message: '请输入订单名称', trigger: 'blur' }
        ],
        receiverPeople: [
          { required: true, message: '请输入收货人', trigger: 'blur' }
        ],
        customerId: [
          { required: true, message: '请输入客户名称', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请输入订单类型', trigger: 'change' }
        ],
        driverId: [
          { required: true, message: '请输入司机姓名', trigger: 'change' }
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
      consignorData: [],
      consignorData1: [],
      consigneeData: []
    }
  },
  components: { addressCom, addressCom1 },
  computed: {
    ...mapGetters(['permissions'])
  },
  filters: {},
  created () {
    // this.ord_order_add = this.permissions['ord_order_add']
    // this.ord_order_update = this.permissions['ord_order_update']
    this.order_typeList()
    this.fetchdriverSelectList()
    this.fetchCustomerSelectList()
    this.sealStatusList()
  },
  mounted: function () {
    this.idReq = this.orderDetailId
    this.selectByOrderIdList(this.idReq)
  },
  watch: {
    orderDetailId: {
      handler (newV, oldV) {
        this.idReq = newV
        this.idReq = this.orderDetailId
        this.selectByOrderIdList(this.idReq)
      },
      deep: true
    }
  },
  methods: {
    Tigmsg () {
      this.$notify({
        title: '提示',
        message: '暂无可预览的文件',
        type: 'warning',
        duration: 2000
      })
    },
    handleQsd (objarr) {

      if (objarr == null || objarr.length == 0) {
        this.$notify({
          title: '提示',
          message: '暂无可预览的文件',
          type: 'warning',
          duration: 2000
        })
      } else {
        for (var i = 0; i < objarr.length; i++) {
          var aLink = document.createElement('a')
          var blob = new Blob([objarr[i]])
          var evt = document.createEvent('HTMLEvents')
          evt.initEvent('click', false, false)//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
          aLink.download = '签收单' + i
          aLink.href = URL.createObjectURL(blob)
          aLink.dispatchEvent(evt)
        }
      }
    },
    selectByOrderIdList: function (id) {
      selectByOrderId(id).then(response => {
        let res = response.data
        if (res.ordOrderLogistics) {
          for (var i = 0; i < res.ordOrderLogistics.length; i++) {
            var orderStatus = res.ordOrderLogistics[i].orderStatus
            if (orderStatus > 2) {
              this.ordOrderLogistics.push(res.ordOrderLogistics[i])
            }
          }
        }
        this.form = res
        // this.$refs.addressCom.pickupAddsForm=this.form
        // debugger
        // this.$refs.addressCom1.arrivalAddsForm=this.form

        this.form.ordOrderLogistics1 = this.ordOrderLogistics
        this.consignorData = this.form.pickupAdds
        console.log(this.form.pickHnAddress)
        debugger
        this.consignorData1 = this.form.pickHnAddress
        this.consigneeData = this.form.arrivalAdds
        this.ordOrderLogistics1 = this.form.ordExceptionConditions
        fetchCustomerSelect().then(response => {
          this.fetchCustomerSelectReq = response.data
          for (let i = 0; i < this.fetchCustomerSelectReq.length; i++) {
            if (this.fetchCustomerSelectReq[i].customerId === res.customerId) {
              this.contactReq = this.fetchCustomerSelectReq[i].contact
              this.customerPhoneReq = this.fetchCustomerSelectReq[i].phone
            }
          }
        })
        fetchdriverSelect().then(response => {
          this.fetchdriverSelectReq = response.data
          for (let i = 0; i < this.fetchdriverSelectReq.length; i++) {
            if (this.fetchdriverSelectReq[i].driverId === res.driverId) {
              this.driverphoneReq = this.fetchdriverSelectReq[i].phone
              this.plateNumberReq = this.fetchdriverSelectReq[i].plateNumber
              this.idcardNumberReq = this.fetchdriverSelectReq[i].idcardNumber
            }
          }
        })
        this.pickupConRes = res.pickupConPlaceArray
        this.pickupRes = res.pickupGoodsPlaceArray
        this.sendRes = res.sendGoodsPlaceArray
        this.returnRes = res.returnConPlaceArray
      })
    },
    sealStatusList: function () {
      sealStatus().then(response => {
        this.sealStatusReq = response.data
      })
    },
    driverInfoReq: function (id) {
      // driverSelect(id).then(response => {
      //   if (response.data.phone) {
      //     this.driverphoneReq = response.data.phone;
      //   } else {
      //     this.driverphoneReq = "";
      //   }
      //   if (response.data.idcardNumber) {
      //     this.idcardNumberReq = response.data.idcardNumber;
      //   } else {
      //     this.idcardNumberReq = "";
      //   }
      //   if (response.data.plateNumber) {
      //     this.plateNumberReq = response.data.plateNumber;
      //   } else {
      //     this.plateNumberReq = "";
      //   }
      // });
    },
    customerSelectList: function (id) {
      customerSelect(id).then(response => {
        if (response.data.phone) {
          this.customerPhoneReq = response.data.phone
        } else {
          this.customerPhoneReq = ''
        }
        if (response.data.contact) {
          this.contactReq = response.data.contact
        } else {
          this.contactReq = ''
        }
      })
    },
    headCall: function (msg) {
      this.msg = msg
    },
    fetchdriverSelectList () {
      fetchdriverSelect().then(response => {
        this.fetchdriverSelectReq = response.data
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

    newFiles (file) {
      this.uploadForm.append('file[]', file)
      return false
    }
  }
}

export function newExp (data) {
  return axios({
    method: 'post', // 方式一定是post
    url: '你的后台接收函数路径',
    timeout: 20000,
    data: data // 参数需要是单一的formData形式
  })
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

.download_a {
  padding: 5px 8px;
  background: #409eff;
  color: #fff;
  cursor: pointer;
}

.download_a1 {
  padding: 5px 8px;
  background: #999;
  color: #fff;
  cursor: pointer;
}
</style>
