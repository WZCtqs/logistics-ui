<template>
  <div class="app-container calendar-list-container">
    <div class="header">普货订单中心</div>
    <el-tabs type="border-card">
      <el-tab-pane label="订单详情"
                   class="goods-tab-pane">
        <div class="filter-container">
          <!--<h1 class="title">普货订单录入</h1>-->
          <el-form ref="form"
                   label-width="100px"
                   :model="form"
                   :rules="rules">
            <h2 class="cargoFormTitle">订单基本信息</h2>
            <el-row>
              <el-col :span="6">
                <el-form-item label="订单编号:"
                              prop="morderId">
                  <el-input placeholder="自动生成"
                            disabled="disabled"
                            v-model="form.morderId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户名称:"
                              prop="customerName">
                  <!--<el-input placeholder="客户名称" v-model="form.customerName" :disabled="editStatus"></el-input>-->
                  <el-select class="filter-item"
                             filterable
                             v-model="form.customerId"
                             placeholder="客户名称"
                             :disabled="editStatus"
                             @change="handleCustomerChange(form.customerId)">
                    <el-option v-for="item in getCustomerReq"
                               :key="item.customerId"
                               :label="item.customerName"
                               :value="item.customerId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="发货时间:"
                              prop="sendGoodsDate">
                  <el-date-picker type="date"
                                  placeholder="选择日期"
                                  v-model="form.sendGoodsDate"
                                  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd"
                                  :disabled="editStatus">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="到货时间:"
                              prop="pickGoodsDate">
                  <el-date-picker type="date"
                                  placeholder="选择日期"
                                  v-model="form.pickGoodsDate"
                                  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd"
                                  :disabled="editStatus">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="发货城市:"
                              prop="sendPlaceArray">
                  <area-cascader :level="1"
                                 v-model='form.sendPlaceArray'
                                 :data="pcaa"
                                 type='text'
                                 :disabled="editStatus"></area-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="到货城市:"
                              prop="pickPlaceArray">
                  <area-cascader :level="1"
                                 v-model='form.pickPlaceArray'
                                 :data="pcaa"
                                 type='text'
                                 :disabled="editStatus"></area-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="提货方式:"
                              prop="pickGoodsWay">
                  <el-select class="filter-item"
                             filterable
                             v-model="form.pickGoodsWay"
                             placeholder="提货方式"
                             :disabled="editStatus">
                    <el-option v-for="item in pickUpGoods"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="制单人员:"
                              prop="docOperator">
                  <el-input placeholder="自动生成"
                            v-model="form.docOperator"
                            :disabled="editStatus"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <h2 class="cargoFormTitle">收发货人信息</h2>
            <!--<el-row>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="收货人:" prop="picker">-->
            <!--<el-input placeholder="" v-model="form.picker" :disabled="editStatus"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="收货人电话:" prop="pickerPhone">-->
            <!--<el-input placeholder="" v-model="form.pickerPhone" :disabled="editStatus"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="收货地址:" prop="pickerCity">-->
            <!--&lt;!&ndash;<area-cascader :level="1" v-model='form.pickerCity' :data="pcaa" type='text'&ndash;&gt;-->
            <!--&lt;!&ndash;:disabled="editStatus"></area-cascader>&ndash;&gt;-->
            <!--<el-input placeholder="收货地址" v-model="form.pickerCity" :disabled="editStatus"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6" prop="pickerPlace">-->
            <!--<el-input placeholder="详细收货地址" v-model="form.pickerPlace" :disabled="editStatus"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="发货人:" prop="shipper">-->
            <!--<el-input placeholder="" v-model="form.shipper" :disabled="editStatus"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="发货人电话:" prop="shipperPhone">-->
            <!--<el-input placeholder="" v-model="form.shipperPhone" :disabled="editStatus"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="发货地址:" prop="shipperCity">-->
            <!--&lt;!&ndash;<area-cascader :level="1" v-model='form.shipperCity' :data="pcaa" type='text'&ndash;&gt;-->
            <!--&lt;!&ndash;:disabled="editStatus"></area-cascader>&ndash;&gt;-->
            <!--<el-input placeholder="收货地址" v-model="form.shipperCity" :disabled="editStatus"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6" prop="shipperPlace">-->
            <!--<el-input placeholder="详细发货地址" v-model="form.shipperPlace" :disabled="editStatus"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <consignor-common :editStatus="editStatus"
                              :consignorData="consignorDataList"></consignor-common>
            <consignee-common :editStatus="editStatus"
                              :consigneeData="consigneeDataList"></consignee-common>
            <h2 class="cargoFormTitle">货物信息</h2>
            <cargo-info v-for="(item,index) in items"
                        :key="index"
                        :editStatus="editStatus"
                        :index="index"
                        :items="items"
                        @uploadData="getData"></cargo-info>
            <el-row class="total">
              <el-col :span="1">合计</el-col>
              <el-col :span="3">总重量: <span class="totalFee">{{ totalWeight }}</span>吨</el-col>
              <el-col :span="3">总体积: <span class="totalFee">{{ totalVolumn }}</span>方</el-col>
              <el-col :span="3">总货值: <span class="totalFee">{{ totalValue }}</span>元</el-col>
              <el-col :span="3">总数量: <span class="totalFee">{{ totalNumber }}</span></el-col>
            </el-row>

            <h2 class="cargoFormTitle">应收费用</h2>
            <el-row>
              <el-col :span="6">
                <el-form-item label="结算方式:"
                              prop="balanceWay">
                  <el-select class="filter-item"
                             filterable
                             v-model="form.balanceWay"
                             placeholder="结算方式"
                             :disabled="editStatus">
                    <el-option v-for="item in SettlementMethod"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="计费里程:"
                              prop="mchargedMileage">
                  <el-input placeholder=""
                            v-model="form.mchargedMileage"
                            :disabled="editStatus"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="运输费用:"
                              prop="mtransportFee">
                  <el-input placeholder="运输费用/元"
                            v-model="form.mtransportFee"
                            onkeyup="value=value.replace(/[^\d.]/g,'')"
                            :disabled="editStatus"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="提货费用:"
                              prop="mpickFee">
                  <el-input placeholder="提货费用/元"
                            v-model="form.mpickFee"
                            onkeyup="value=value.replace(/[^\d.]/g,'')"
                            :disabled="editStatus">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="装货费用:"
                              prop="mpackFee">
                  <el-input placeholder="装货费用/元"
                            v-model="form.mpackFee"
                            onkeyup="value=value.replace(/[^\d.]/g,'')"
                            :disabled="editStatus"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="卸货费用:"
                              prop="mreleaseFee">
                  <el-input placeholder="卸货费用/元"
                            v-model="form.mreleaseFee"
                            onkeyup="value=value.replace(/[^\d.]/g,'')"
                            :disabled="editStatus"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="保险费用:"
                              prop="minsuranceFee">
                  <el-input placeholder="保险费用/元"
                            v-model="form.minsuranceFee"
                            onkeyup="value=value.replace(/[^\d.]/g,'')"
                            :disabled="editStatus"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="其他费用:"
                              prop="motherFee">
                  <el-input placeholder="其他费用/元"
                            v-model="form.motherFee"
                            onkeyup="value=value.replace(/[^\d.]/g,'')"
                            :disabled="editStatus"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="是否开票:"
                              prop="isInvoice">
                  <el-select class="filter-item"
                             filterable
                             placeholder="是否开票"
                             v-model="form.isInvoice"
                             :disabled="editStatus">
                    <el-option v-for="item in common_typeReq"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="total">
              <el-col :span="10">费用合计: <span class="totalFee">{{totalFee}}</span>元</el-col>
            </el-row>

            <h2 class="cargoFormTitle">车辆调度</h2>
            <el-form-item label="车辆类型:"
                          prop="">
              <el-radio-group v-model="form.ordCommonTruck.truckType"
                              :disabled="editStatus">
                <el-radio label="0">自有车</el-radio>
                <el-radio label="1">外调车</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-if="form.ordCommonTruck.truckType === '0'">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="车牌号:"
                                prop="ordCommonTruck.plateNumber"
                                :rules="{ required: true, message: '车牌号', trigger: 'change' }">
                    <el-select class="filter-item"
                               v-model="form.ordCommonTruck.plateNumber"
                               filterable
                               placeholder="车牌号"
                               :disabled="editStatus">
                      <el-option v-for="(item,index)  in getZYTruckReq"
                                 :key="item.truckId"
                                 :label="item.plateNumber"
                                 :value="item.plateNumber">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="主司机:"
                                prop="ordCommonTruck.mdriver"
                                :rules="{ required: true, message: '主司机', trigger: 'change' }">
                    <!--<el-input placeholder="主司机" v-model="form.ordCommonTruck.mdriver"></el-input>-->
                    <el-select class="filter-item"
                               v-model="form.ordCommonTruck.mdriver"
                               filterable
                               placeholder="主司机"
                               :disabled="editStatus">
                      <el-option v-for="item in getDriverByPlateIdReq"
                                 :key="item.driverId"
                                 :label="item.driverName"
                                 :value="item.driverId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="副司机:"
                                prop="ordCommonTruck.sdriver">
                    <!--<el-input placeholder="副司机" v-model="form.ordCommonTruck.sdriver"></el-input>-->
                    <el-select class="filter-item"
                               v-model="form.ordCommonTruck.sdriver"
                               filterable
                               placeholder="副司机"
                               :disabled="editStatus">
                      <el-option v-for="item in getDriverByPlateIdReq"
                                 :key="item.driverId"
                                 :label="item.driverName"
                                 :value="item.driverId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="备注:"
                                prop="ordCommonTruck.remarks">
                    <el-input placeholder="备注"
                              v-model="form.ordCommonTruck.remarks"
                              :disabled="editStatus"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="计费里程:"
                                prop="ordCommonTruck.chargedMileage">
                    <el-input placeholder="计费里程"
                              v-model="form.ordCommonTruck.chargedMileage"
                              :disabled="editStatus"></el-input>
                  </el-form-item>
                </el-col>
                <!--<el-col :span="6">-->
                <!--<el-form-item label="油费:" prop="ordCommonTruck.oilFee">-->
                <!--<el-input placeholder="油费/元" v-model="form.ordCommonTruck.oilFee"-->
                <!--onkeyup="value=value.replace(/[^\d.]/g,'')" :disabled="editStatus"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="6">-->
                <!--<el-form-item label="装货费:" prop="ordCommonTruck.packFee">-->
                <!--<el-input placeholder="装货费/元" v-model="form.ordCommonTruck.packFee"-->
                <!--onkeyup="value=value.replace(/[^\d.]/g,'')" :disabled="editStatus"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="6">-->
                <!--<el-form-item label="卸货费:" prop="ordCommonTruck.releaseFee">-->
                <!--<el-input placeholder="卸货费/元" v-model="form.ordCommonTruck.releaseFee"-->
                <!--onkeyup="value=value.replace(/[^\d.]/g,'')" :disabled="editStatus"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
              </el-row>
              <!--<el-row>-->
              <!--<el-col :span="6">-->
              <!--<el-form-item label="路桥费:" prop="ordCommonTruck.luqiaoFee">-->
              <!--<el-input placeholder="路桥费/元" v-model="form.ordCommonTruck.luqiaoFee"-->
              <!--onkeyup="value=value.replace(/[^\d.]/g,'')" :disabled="editStatus"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="6">-->
              <!--<el-form-item label="保险费:" prop="ordCommonTruck.insuranceFee">-->
              <!--<el-input placeholder="保险费/元" v-model="form.ordCommonTruck.insuranceFee"-->
              <!--onkeyup="value=value.replace(/[^\d.]/g,'')" :disabled="editStatus"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="6">-->
              <!--<el-form-item label="其它费用:" prop="ordCommonTruck.otherFee">-->
              <!--<el-input placeholder="其它费用/元" v-model="form.ordCommonTruck.otherFee"-->
              <!--onkeyup="value=value.replace(/[^\d.]/g,'')" :disabled="editStatus"></el-input>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--</el-row>-->
              <el-row class="total">
                <el-col :span="10">费用合计: <span class="totalFee">{{ordCommonTruckTotalFee}}</span>元</el-col>
              </el-row>
            </div>
            <div v-if="form.ordCommonTruck.truckType === '1'">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="承运商:"
                                prop="ordCommonTruck.truckTeamId">
                    <el-select class="filter-item"
                               v-model="form.ordCommonTruck.truckTeamId"
                               filterable
                               placeholder="承运商"
                               :disabled="editStatus">
                      <el-option v-for="item in getTruckTeamReq"
                                 :key="item.truckTeamId"
                                 :label="item.teamName"
                                 :value="item.truckTeamId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="车牌号:"
                                prop="ordCommonTruck.plateNumber"
                                :rules="{ required: true, message: '车牌号', trigger: 'change' }">
                    <el-select class="filter-item"
                               v-model="form.ordCommonTruck.plateNumber"
                               filterable
                               placeholder="车牌号"
                               :disabled="editStatus">
                      <el-option v-for="(item,index)  in getTruckListByTeamIdReq"
                                 :key="item.truckId"
                                 :label="item.plateNumber"
                                 :value="item.plateNumber">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="司机:"
                                prop="ordCommonTruck.driverId">
                    <!--<el-input placeholder="司机" v-model="form.ordCommonTruck.mdriver"></el-input>-->
                    <el-select class="filter-item"
                               v-model="form.ordCommonTruck.mdriverId"
                               filterable
                               placeholder="司机"
                               :disabled="editStatus">
                      <el-option v-for="item in getDriverByPlateIdReq"
                                 :key="item.driverId"
                                 :label="item.driverName"
                                 :value="item.driverId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="司机手机号:"
                                prop="ordCommonTruck.driverPhone">
                    <el-input placeholder="司机手机号"
                              v-model="form.ordCommonTruck.driverPhone"
                              :disabled="editStatus"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="车型:"
                                prop="ordCommonTruck.vehicleType">
                    <el-input v-model="form.ordCommonTruck.vehicleType"
                              placeholder="车型"
                              :disabled="editStatus"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="车长:"
                                prop="ordCommonTruck.vehicleLength">
                    <el-input v-model="form.ordCommonTruck.vehicleLength"
                              placeholder="车长"
                              :disabled="editStatus"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注:"
                                prop="ordCommonTruck.remarks">
                    <el-input placeholder="备注"
                              v-model="form.ordCommonTruck.remarks"
                              :disabled="editStatus"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="运输费:"
                                prop="ordCommonTruck.transportFee">
                    <el-input placeholder="运输费/元"
                              v-model="form.ordCommonTruck.transportFee"
                              onkeyup="value=value.replace(/[^\d.]/g,'')"
                              :disabled="editStatus"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="应付单价:"
                                prop="ordCommonTruck.payPrice">
                    <el-input placeholder="应付单价"
                              v-model="form.ordCommonTruck.payPrice"
                              :disabled="editStatus"
                              onkeyup="value=value.replace(/[^\d.]/g,'')">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <!--<el-col :span="6">-->
                <!--<el-form-item label="装货费:" prop="ordCommonTruck.packFee">-->
                <!--<el-input placeholder="装货费/元" v-model="form.ordCommonTruck.packFee"-->
                <!--onkeyup="value=value.replace(/[^\d.]/g,'')" :disabled="editStatus"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="6">-->
                <!--<el-form-item label="保险费:" prop="ordCommonTruck.insuranceFee">-->
                <!--<el-input placeholder="保险费/元" v-model="form.ordCommonTruck.insuranceFee"-->
                <!--onkeyup="value=value.replace(/[^\d.]/g,'')" :disabled="editStatus"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
                <!--<el-col :span="6">-->
                <!--<el-form-item label="其它费用:" prop="ordCommonTruck.otherFee">-->
                <!--<el-input placeholder="其它费用/元" v-model="form.ordCommonTruck.otherFee"-->
                <!--onkeyup="value=value.replace(/[^\d.]/g,'')" :disabled="editStatus"></el-input>-->
                <!--</el-form-item>-->
                <!--</el-col>-->
              </el-row>
              <el-row class="total">
                <el-col :span="24">
                  <el-col :span="6">
                    <div>
                      <el-form-item label="费用合计:"
                                    prop="">
                        <span class="totalFee">{{ordCommonTruckTotalFee}}</span>元
                      </el-form-item>
                    </div>
                    <el-form-item label="结算方式:"
                                  prop="ordCommonTruck.payType">
                      <el-radio-group v-model="form.ordCommonTruck.payType"
                                      :disabled="editStatus">
                        <el-radio label="0"
                                  border>按单结</el-radio>
                        <el-radio label="1"
                                  border>按月结</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="15"
                          v-if="form.ordCommonTruck.payType === '0'">
                    <el-row class="c_tableManual">
                      <el-col :span="3"
                              align="center"
                              class="c_tableManualTitle">付款方式</el-col>
                      <el-col :span="3"
                              align="center"
                              class="c_tableManualTitle">现金</el-col>
                      <el-col :span="3"
                              align="center"
                              class="c_tableManualTitle">油卡</el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3"
                              align="center">到付</el-col>
                      <el-col :span="3"
                              align="center">
                        <el-input size="mini"
                                  v-model="form.cashPayment"
                                  :disabled="editStatus"></el-input>
                      </el-col>
                      <el-col :span="3"
                              align="center">
                        <el-input size="mini"
                                  v-model="form.oilPayment"
                                  :disabled="editStatus"></el-input>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-col>
              </el-row>
            </div>
            <!--<h2 class="cargoFormTitle">单据信息</h2>-->
            <!--<div class="flexItem ">-->
            <!--<div class="flexItems" v-if="form.ordCommonFile.receiptNote !== ''">-->
            <!--<img :src="form.ordCommonFile.receiptNote" @click="handlePictureCardPreview">-->
            <!--<el-dialog :visible.sync="dialogVisiblePic" append-to-body>-->
            <!--<img width="100%" :src="dialogImageUrl" alt="">-->
            <!--</el-dialog>-->
            <!--<div>提货凭证</div>-->
            <!--</div>-->
            <!--<div class="flexItems">-->
            <!--暂无提货凭证-->
            <!--</div>-->
            <!--<div class="flexItems" v-if="form.ordCommonFile.receiptNote !== ''">-->
            <!--<img :src="form.ordCommonFile.receiptNote" @click="handlePictureCardPreview">-->
            <!--<el-dialog :visible.sync="dialogVisiblePic" append-to-body>-->
            <!--<img width="100%" :src="dialogImageUrl" alt="">-->
            <!--</el-dialog>-->
            <!--<div>签收凭证</div>-->
            <!--</div>-->
            <!--<div class="flexItems">-->
            <!--暂无签收凭证-->
            <!--</div>-->
            <!--</div>-->
            <h2 class="cargoFormTitle">司机位置记录</h2>
            <el-steps direction="vertical"
                      :active="1"
                      :space="90">
              <el-step v-for="(item,index) in listDriverLoaction"
                       :key="index"
                       :icon="index===0?'el-icon-location':'el-icon-circle-check'"
                       :description="'位置:' + item.logisticsAddress"
                       :title="'时间:' + item.logisticsTime"></el-step>
            </el-steps>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="异常费用">
        <template v-if="exceptionFees.length === 0">
          <div class="CnoData">
            <div class="CnoDataDiv">
              <i class="el-icon-document"></i>
              <div>暂无异常数据</div>
            </div>
          </div>
        </template>
        <template v-else>
          <el-card class="box-card"
                   v-for="(item,index) in exceptionFees"
                   :key="index">
            <h4 class="abnormalRecordTitle">异常费用{{index+1 }}</h4>
            <el-row>
              <el-col :span="8">
                异常类型：<span v-if="item.exceptionFeeType === '0'">过桥费</span>
                <span v-if="item.exceptionFeeType === '1'">压车费</span>
                <span v-if="item.exceptionFeeType === '2'">放空费</span>
              </el-col>
              <el-col :span="8">
                处理状态：<span v-if="item.auditing === '0'">未审核</span>
                <span v-if="item.auditing === '1'">通过</span>
                <span v-if="item.auditing === '2'">拒绝</span>
              </el-col>
              <el-col :span="8">
                上报时间：{{item.applyTime}}
              </el-col>
              <el-col :span="8">
                上报司机：{{item.driverName}}
              </el-col>
              <el-col :span="8">
                审核人：{{item.transactorName}}
              </el-col>
              <el-col :span="8">
                审核时间：{{item.handleTime}}
              </el-col>
              <el-col :span="8">
                异常费用金额：{{item.exceptionFee}}
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                异常费用凭证:
                <div>
                  <template v-for="itemFile in item.imgUrlFile">
                    <div class="goodsCenterImgReq">
                      <img :src="itemFile"
                           alt=""
                           @click="handleExceptionImgPre(itemFile)">
                    </div>
                  </template>
                </div>
                <el-dialog :visible.sync="dialogExceptionImgPre"
                           append-to-body>
                  <img width="100%"
                       :src="ExceptionImgPreImageUrl"
                       alt="">
                </el-dialog>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                异常费用备注:{{item.remark}}
              </el-col>
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
        <template v-if="exceptionConditions.length === 0">
          <div class="CnoData">
            <div class="CnoDataDiv">
              <i class="el-icon-document"></i>
              <div>暂无异常数据</div>
            </div>
          </div>
        </template>
        <template v-else>
          <el-card class="box-card"
                   v-for="(item,index) in exceptionConditions"
                   :key="index">
            <h4 class="abnormalRecordTitle">异常情况{{index+1 }}</h4>
            <el-row>
              <el-col :span="8">
                上报时间：{{item.submitDate}}
              </el-col>
              <el-col :span="8">
                上报司机：{{item.driver}}
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                异常情况:
                <div>
                  <template v-for="itemPath in item.paths">
                    <div class="goodsCenterImgReq">
                      <img :src="itemPath"
                           alt=""
                           @click="handleExceptionImgPre(itemPath)">
                    </div>
                  </template>
                </div>
                <el-dialog :visible.sync="dialogExceptionImgPre"
                           append-to-body>
                  <img width="100%"
                       :src="ExceptionImgPreImageUrl"
                       alt="">
                </el-dialog>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                异常费用备注:{{item.exRemarks}}
              </el-col>
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
        <div v-if="consignorDataList && consignorDataList.length>=1">
          <template v-for="(item,index) in consignorDataList">
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
        <h2 class="cargoFormTitle">签收凭证</h2>
        <div v-if="consigneeDataList && consigneeDataList.length>=1">
          <template v-for="(item,index) in consigneeDataList">
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
</template>
<script>
import CargoInfo from './cargoInfo'
import consigneeCommon from '@/components/consigneeCommon/index'
import consignorCommon from '@/components/consignorCommon/index'
import {
  common_type,
  getAllDriver,
  getAllTruckObj,
  getCustomerObj,
  getDriverByPlateIdObj,
  getTruckTeamObj,
  getZYTruckObj
} from '@/api/ordCommonGoods'
import { mapGetters } from 'vuex'
import ElTableHeader from 'element-ui'
import { AreaSelect } from 'vue-area-linkage'
import { pca, pcaa } from 'area-data'
import 'vue-area-linkage/dist/index.css'

export default {
  props: {
    centerData: {
      type: Object,
      default: Object
    }
  },
  components: { ElTableHeader, CargoInfo, AreaSelect, consigneeCommon, consignorCommon },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      idReq: this.$route.params.id,
      editStatus: true,
      ord_manualinput_upd: false,
      pca: pca,
      pcaa: pcaa,
      consignorDataList: [],
      consigneeDataList: [],
      form: {
        morderId: '',
        commonGoodsInfos: [],
        customerId: '',
        sendPlaceArray: [],
        pickPlaceArray: [],
        sendGoodsDate: '',
        pickGoodsDate: '',
        pickGoodsWay: '',
        docOperator: '',
        picker: '',
        pickerPhone: '',
        pickerCity: '',
        pickerPlace: '',
        shipper: '',
        shipperPhone: '',
        shipperCity: '',
        shipperPlace: '',
        balanceWay: '',
        mchargedMileage: '',
        mtransportFee: '',
        mpickFee: '',
        mpackFee: '',
        mreleaseFee: '',
        minsuranceFee: '',
        motherFee: '',
        isInvoice: '',
        mtotalFee: '',
        ordCommonTruck: {
          sdriver: '',
          mdriverId: '',
          truckType: '0',
          plateNumber: '',
          chargedMileage: '',
          remarks: '',
          oilFee: '',
          packFee: '',
          releaseFee: '',
          luqiaoFee: '',
          insuranceFee: '',
          otherFee: '',
          truckTeamId: '',
          driverId: '',
          driverPhone: '',
          vehicleType: '',
          vehicleLength: '',
          transportFee: '',
          payType: '0',
          totalFee: 0,
          payRate: '',
          payPrice: ''
        },
        ordCommonFile: {
          receiptNote: ''
        }
      },
      rules: {
        customerId: [
          { required: true, message: '客户名称', trigger: 'blur' }
        ],
        pickGoodsWay: [
          { required: true, message: '提货方式', trigger: 'change' }
        ],
        picker: [
          { required: true, message: '收货人', trigger: 'blur' }
        ],
        pickerPhone: [
          { required: true, message: '收货人电话', trigger: 'blur' }
        ],
        pickerCity: [
          { required: true, message: '提货方式', trigger: 'change' }
        ],
        shipper: [
          { required: true, message: '发货人', trigger: 'blur' }
        ],
        shipperPhone: [
          { required: true, message: '发货电话', trigger: 'blur' }
        ],
        shipperCity: [
          { required: true, message: '发货地址', trigger: 'change' }
        ],
        balanceWay: [
          { required: true, message: '结算方式', trigger: 'change' }
        ],
        plateNumber: [
          { required: true, message: '车牌号', trigger: 'blur' }
        ]
      },
      commonGoodsInfosReq: '',
      pickUpGoods: [{
        id: 0,
        label: '上门提货',
        value: '0'
      }, {
        id: 1,
        label: '派车直送',
        value: '1'
      }],
      orderMaker: [],
      SettlementMethod: [{
        id: 0,
        label: '单结',
        value: '0'
      }, {
        id: 1,
        label: '月结',
        value: '1'
      }],
      common_typeReq: [],
      selectedOptions2: [],
      selectedOptions3: [],
      fetchdriverSelectReq: [],
      totalWeight: 0,
      totalVolumn: 0,
      totalValue: 0,
      totalNumber: 0,
      getZYTruckReq: [],
      getTruckTeamReq: [],
      getDriverByPlateIdReq: [],
      getTruckListByTeamIdReq: [],
      getDetailByIdReq: [],
      items: [{}],
      listDriverLoaction: [],
      exceptionFees: [],
      exceptionConditions: [],
      dialogVisiblePic: false,
      dialogExceptionImgPre: false,
      ExceptionImgPreImageUrl: '',
      getCustomerReq: []
    }
  },
  inject: ['reload'],
  watch: {
    centerData: {
      handler (newV, oldV) {
        this.getDetailByIdReq = newV
        this.form.morderId = this.getDetailByIdReq.morderId
        this.form.customerId = this.getDetailByIdReq.customerId
        this.form.sendGoodsDate = this.getDetailByIdReq.sendGoodsDate
        this.form.pickGoodsDate = this.getDetailByIdReq.pickGoodsDate
        this.form.sendPlaceArray = this.getDetailByIdReq.sendPlaceArray
        this.form.pickPlaceArray = this.getDetailByIdReq.pickPlaceArray
        this.form.pickGoodsWay = this.getDetailByIdReq.pickGoodsWay
        this.form.docOperator = this.getDetailByIdReq.docOperator
        this.form.picker = this.getDetailByIdReq.picker
        this.form.pickerPhone = this.getDetailByIdReq.pickerPhone
        this.form.pickerCity = this.getDetailByIdReq.pickerCity
        this.form.pickerPlace = this.getDetailByIdReq.pickerPlace
        this.form.shipper = this.getDetailByIdReq.shipper
        this.form.shipperPhone = this.getDetailByIdReq.shipperPhone
        this.form.shipperCity = this.getDetailByIdReq.shipperCity
        this.form.shipperPlace = this.getDetailByIdReq.shipperPlace
        this.form.balanceWay = this.getDetailByIdReq.balanceWay
        this.form.mchargedMileage = this.getDetailByIdReq.mchargedMileage
        this.form.mtransportFee = this.getDetailByIdReq.mtransportFee
        this.form.mpickFee = this.getDetailByIdReq.mpickFee
        this.form.mpackFee = this.getDetailByIdReq.mpackFee
        this.form.mreleaseFee = this.getDetailByIdReq.mreleaseFee
        this.form.minsuranceFee = this.getDetailByIdReq.minsuranceFee
        this.form.motherFee = this.getDetailByIdReq.motherFee
        this.form.isInvoice = this.getDetailByIdReq.isInvoice
        if (this.getDetailByIdReq.ordCommonFile) {
          this.form.ordCommonFile.receiptNote = this.getDetailByIdReq.ordCommonFile.receiptNote
        } else {
          this.form.ordCommonFile.receiptNote = ''
        }
        if (this.getDetailByIdReq.ordCommonTruck) {
          this.form.ordCommonTruck = this.getDetailByIdReq.ordCommonTruck
        }
        let truckIdReq = ''
        if (this.getDetailByIdReq.ordCommonTruck !== null) {
          if (this.getDetailByIdReq.ordCommonTruck.truckType) {
            let truckIdReq
            getAllTruckObj().then(res => {
              this.getZYTruckReq = res.data
              for (let i = 0; i < this.getZYTruckReq.length; i++) {
                if (this.getZYTruckReq[i].plateNumber === this.getDetailByIdReq.ordCommonTruck.plateNumber) {
                  truckIdReq = this.getZYTruckReq[i].truckId
                }
              }
            }).then(() => {
              getDriverByPlateIdObj(truckIdReq).then(res => {
                this.getDriverByPlateIdReq = res.data
                for (let i = 0; i < this.getDriverByPlateIdReq.length; i++) {
                  if (this.getDriverByPlateIdReq[i].driverId === this.getDetailByIdReq.ordCommonTruck.mdriverId) {
                    this.form.ordCommonTruck.mdriverId = this.getDetailByIdReq.ordCommonTruck.mdriverId
                    this.form.ordCommonTruck.mdriver = this.getDetailByIdReq.ordCommonTruck.mdriverId
                    this.form.ordCommonTruck.driverPhone = this.getDriverByPlateIdReq[i].phone
                    this.form.ordCommonTruck.payRate = res.data[0].rate
                  }
                }
              })
            })
          }
        }
        this.items = []
        this.items = this.getDetailByIdReq.commonGoodsInfos
        this.consignorDataList = this.getDetailByIdReq.pickupAdds
        this.consigneeDataList = this.getDetailByIdReq.arrivalAdds

        this.exceptionFees = this.getDetailByIdReq.exceptionFees
        this.exceptionConditions = this.getDetailByIdReq.exceptionConditions
        for (let i = 0; i < this.getDetailByIdReq.ordOrderLogistics.length; i++) {
          if (this.getDetailByIdReq.ordOrderLogistics[i].logisticsAddress === null) {
            this.listDriverLoaction[i].logisticsAddress = '暂无位置消息'
          }
          this.listDriverLoaction[i].logisticsTime = this.getDetailByIdReq.ordOrderLogistics[i].logisticsTime.substring(0, 10)
        }
      },
      deep: true
    }
  },
  mounted () {
    this.getDetailByIdReq = this.centerData
    this.form.morderId = this.getDetailByIdReq.morderId
    this.form.customerId = this.getDetailByIdReq.customerId
    this.form.sendGoodsDate = this.getDetailByIdReq.sendGoodsDate
    this.form.pickGoodsDate = this.getDetailByIdReq.pickGoodsDate
    this.form.sendPlaceArray = this.getDetailByIdReq.sendPlaceArray
    this.form.pickPlaceArray = this.getDetailByIdReq.pickPlaceArray
    this.form.pickGoodsWay = this.getDetailByIdReq.pickGoodsWay
    this.form.docOperator = this.getDetailByIdReq.docOperator
    this.form.picker = this.getDetailByIdReq.picker
    this.form.pickerPhone = this.getDetailByIdReq.pickerPhone
    this.form.pickerCity = this.getDetailByIdReq.pickerCity
    this.form.pickerPlace = this.getDetailByIdReq.pickerPlace
    this.form.shipper = this.getDetailByIdReq.shipper
    this.form.shipperPhone = this.getDetailByIdReq.shipperPhone
    this.form.shipperCity = this.getDetailByIdReq.shipperCity
    this.form.shipperPlace = this.getDetailByIdReq.shipperPlace
    this.form.balanceWay = this.getDetailByIdReq.balanceWay
    this.form.mchargedMileage = this.getDetailByIdReq.mchargedMileage
    this.form.mtransportFee = this.getDetailByIdReq.mtransportFee
    this.form.mpickFee = this.getDetailByIdReq.mpickFee
    this.form.mpackFee = this.getDetailByIdReq.mpackFee
    this.form.mreleaseFee = this.getDetailByIdReq.mreleaseFee
    this.form.minsuranceFee = this.getDetailByIdReq.minsuranceFee
    this.form.motherFee = this.getDetailByIdReq.motherFee
    this.form.isInvoice = this.getDetailByIdReq.isInvoice
    if (this.getDetailByIdReq.ordCommonFile) {
      this.form.ordCommonFile.receiptNote = this.getDetailByIdReq.ordCommonFile.receiptNote
    } else {
      this.form.ordCommonFile.receiptNote = ''
    }
    if (this.getDetailByIdReq.ordCommonTruck) {
      this.form.ordCommonTruck = this.getDetailByIdReq.ordCommonTruck
    }
    this.items = [{}]
    if (this.getDetailByIdReq.commonGoodsInfos.length) {
      this.items = this.getDetailByIdReq.commonGoodsInfos
    }
    this.consignorDataList = this.getDetailByIdReq.pickupAdds
    this.consigneeDataList = this.getDetailByIdReq.arrivalAdds
    this.exceptionFees = this.getDetailByIdReq.exceptionFees
    this.exceptionConditions = this.getDetailByIdReq.exceptionConditions
    this.listDriverLoaction = this.getDetailByIdReq.ordOrderLogistics
    for (let i = 0; i < this.listDriverLoaction.length; i++) {
      if (this.listDriverLoaction[i].logisticsAddress === null) {
        this.listDriverLoaction[i].logisticsAddress = '暂无位置消息'
      }
      this.listDriverLoaction[i].logisticsTime = this.listDriverLoaction[i].logisticsTime.substring(0, 10)
    }
  },
  computed: {
    ...mapGetters([
      'permissions'
    ]),
    totalFee () {
      const mtotalFeeReqTemp = Number(this.form.mtransportFee) + Number(this.form.mpickFee) + Number(this.form.mpackFee) + Number(this.form.mreleaseFee) + Number(this.form.minsuranceFee) + Number(this.form.motherFee)
      if (isNaN(mtotalFeeReqTemp)) {
        return 0
      } else {
        this.form.mtotalFee = mtotalFeeReqTemp
        return mtotalFeeReqTemp
      }
    },
    ordCommonTruckTotalFee () {
      if (this.form.ordCommonTruck.truckType === '0') {
        // const ordCommonTruckTotalFeeTemp = Number(this.form.ordCommonTruck.oilFee) + Number(this.form.ordCommonTruck.packFee) + Number(this.form.ordCommonTruck.releaseFee) + Number(this.form.ordCommonTruck.luqiaoFee) + Number(this.form.ordCommonTruck.insuranceFee) + Number(this.form.ordCommonTruck.otherFee)
        // if (isNaN(ordCommonTruckTotalFeeTemp)) {
        //   return 0
        // } else {
        //   this.form.ordCommonTruck.totalFee = ordCommonTruckTotalFeeTemp
        //   return ordCommonTruckTotalFeeTemp
        // }
        return 0
      } else if (this.form.ordCommonTruck.truckType === '1') {
        // const ordCommonTruckTotalFeeTemp = Number(this.form.ordCommonTruck.transportFee) + Number(this.form.ordCommonTruck.releaseFee) + Number(this.form.ordCommonTruck.insuranceFee) + Number(this.form.ordCommonTruck.otherFee)
        const ordCommonTruckTotalFeeTemp = Number(this.form.ordCommonTruck.transportFee)
        if (isNaN(ordCommonTruckTotalFeeTemp)) {
          return 0
        } else {
          this.form.ordCommonTruck.totalFee = ordCommonTruckTotalFeeTemp
          return ordCommonTruckTotalFeeTemp
        }
      }
    }
  },
  created () {
    this.ord_manualinput_upd = this.permissions['ord_manualinput_upd']
    this.common_typeList()
    this.handleGetCustomerObj()
    this.handleGetZYTruckList()
    this.handleGetTruckTeamList()
  },
  methods: {
    handleGetZYTruckList () {
      getZYTruckObj().then(res => {
        this.getZYTruckReq = res.data
      })
    },
    handleGetTruckTeamList () {
      getTruckTeamObj().then(res => {
        this.getTruckTeamReq = res.data
      })
    },
    common_typeList () {
      common_type().then(res => {
        this.common_typeReq = res.data
      })
    },
    getData: function (val) {
      let index = val.index
      this.totalWeight = 0
      this.totalVolumn = 0
      this.totalValue = 0
      this.totalNumber = 0
      this.items[index] = val.data
      this.form.commonGoodsInfos = this.items
      this.form.pickupAdds = this.consignorDataList
      this.form.exceptionFees = this.consigneeDataList
      this.exceptionConditions = this.getDetailByIdReq.exceptionConditions
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].weight !== '' && this.items[i].weight !== undefined && !isNaN(this.items[i].weight)) {
          this.totalWeight += parseFloat(this.items[i].weight)
        }
        if (this.items[i].volume !== '' && this.items[i].volume !== undefined && !isNaN(this.items[i].volume)) {
          this.totalVolumn += parseFloat(this.items[i].volume)
        }
        if (this.items[i].value !== '' && this.items[i].value !== undefined && !isNaN(this.items[i].value)) {
          this.totalValue += parseFloat(this.items[i].value)
        }
        if (this.items[i].packNum !== '' && this.items[i].packNum !== undefined && !isNaN(this.items[i].packNum)) {
          this.totalNumber += Number(this.items[i].packNum)
        }
      }
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.currentTarget.currentSrc
      this.dialogVisiblePic = true
    },
    handleExceptionImgPre (file) {
      this.ExceptionImgPreImageUrl = file.currentTarget.currentSrc
      this.dialogExceptionImgPre = true
    },
    handleGetCustomerObj () {
      getCustomerObj().then(res => {
        this.getCustomerReq = res.data
      })
    }
  }
}
</script>
<style>
.header {
  padding-left: 12px;
  margin-bottom: 12px;
  font-size: 18px;
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

.total {
  text-align: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.total .totalFee {
  font-size: 20px;
  color: #00a4bd;
  font-weight: 700;
  padding-right: 13px;
}

.c_tableManualTitle {
  background-color: #8c939d;
}

.c_tableManualTitle {
  line-height: 30px;
  margin-bottom: 5px;
}

.c_tableManual {
  margin-top: 20px;
}

.c_tableManualTitle:nth-child(1) {
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  border-right: 1px solid #eeeeee;
}

.c_tableManualTitle:nth-child(3) {
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  border-left: 1px solid #eeeeee;
}

.area-select {
  width: 100% !important;
  height: 40px;
}

.area-select:focus {
  border-color: #1572e3;
}

.area-select .area-selected-trigger {
  padding-top: 0;
  padding-bottom: 0;
  line-height: 40px;
}

.flexItem {
  margin-top: 20px;
  display: flex;
}

.flexItems {
  flex: 1;
  text-align: center;
}

.disabled .el-upload--picture-card {
  display: none;
}

.abnormalRecordTitle {
  color: #409eff;
  padding: 20px 20px 20px 0px;
}

.abnormalRecordTitle .el-col {
  padding: 16px auto;
}

.goods-tab-pane {
  min-height: 500px;
}

.CnoData {
  position: relative;
  min-height: 500px;
}

.CnoDataDiv {
  text-align: center;
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.CnoDataDiv i {
  font-size: 2em;
}

.goodsCenterImgReq {
  width: 150px;
  max-height: 180px;
  padding: 20px;
  display: inline-block;
}

.goodsCenterImgReq img {
  width: 100%;
}
</style>
