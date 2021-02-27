<template>
  <div class="app-container calendar-list-container">
    <div id="distance-map"
         style="display: none;"></div>
    <div class="filter-container">
      <div class="header">普货手工录入订单</div>
      <!--<h1 class="title">普货订单录入</h1>-->
      <h2 class="cargoFormTitle">订单基本信息</h2>
      <el-form ref="form"
               label-width="100px"
               :model="form"
               :rules="rules">
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
                          prop="customerId">
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
                             type='text'></area-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="到货城市:"
                          prop="pickPlaceArray">
              <area-cascader :level="1"
                             v-model='form.pickPlaceArray'
                             :data="pcaa"
                             type='text'></area-cascader>
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
        <consignor-common @uploadConsignorData="uploadConsignorData"
                          ref='consignorInfo'
                          :consignorData="consignorDataList"></consignor-common>
        <consignee-common ref='consigneeInfo'
                          @uploadConsigneeData="uploadConsigneeData"
                          :consigneeData="consigneeDataList"></consignee-common>
        <h2 class="cargoFormTitle">货物信息</h2>
        <cargo-info v-for="(item,index) in items"
                    :key="index"
                    :index="index"
                    :items="items"
                    @deleteIndex="del"
                    @addIndex='add'
                    @uploadData='getData'></cargo-info>
        <el-row class="total">
          <el-col :span="1">合计</el-col>
          <el-col :span="5">总重量: <span class="totalFee">{{ totalWeight }}</span>吨</el-col>
          <el-col :span="5">总体积: <span class="totalFee">{{ totalVolumn }}</span>方</el-col>
          <el-col :span="5">总货值: <span class="totalFee">{{ totalValue }}</span>元</el-col>
          <el-col :span="5">总数量: <span class="totalFee">{{ totalNumber }}</span></el-col>
        </el-row>
        <h2 class="cargoFormTitle">应收费用</h2>
        <el-row>
          <el-col :span="6">
            <el-form-item label="结算方式:"
                          prop="balanceWay">
              <el-select class="filter-item"
                         filterable
                         v-model="form.balanceWay"
                         placeholder="结算方式">
                <el-option v-for="item in SettlementMethod"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-col :span="20">
              <el-form-item label="计费里程:"
                            prop="mchargedMileage">
                <el-input placeholder=""
                          v-model="form.mchargedMileage"
                          @change="handleWacthTransportFee"
                          onkeyup="value=value.replace(/[^\d.]/g,'')">
                  <template slot="append">公里</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3"
                    :offset="1">
              <el-button type="primary"
                         icon="el-icon-location-outline"
                         circle
                         @click="handleCalcMileage"></el-button>
            </el-col>
          </el-col>
          <el-col :span="6">
            <el-col :span="20">
              <el-form-item label="运输费用:"
                            prop="mtransportFee">
                <el-input placeholder="运输费用/元"
                          v-model="form.mtransportFee"
                          onkeyup="value=value.replace(/[^\d.]/g,'')">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3"
                    :offset="1">
              <el-button type="primary"
                         icon="el-icon-edit"
                         circle
                         @click="handleTransportFee"></el-button>
            </el-col>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提货费用:"
                          prop="mpickFee">
              <el-input placeholder="提货费用/元"
                        v-model="form.mpickFee"
                        onkeyup="value=value.replace(/[^\d.]/g,'')">
                <template slot="append">元</template>
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
                        onkeyup="value=value.replace(/[^\d.]/g,'')">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="卸货费用:"
                          prop="mreleaseFee">
              <el-input placeholder="卸货费用/元"
                        v-model="form.mreleaseFee"
                        onkeyup="value=value.replace(/[^\d.]/g,'')">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保险费用:"
                          prop="minsuranceFee">
              <el-input placeholder="保险费用/元"
                        v-model="form.minsuranceFee"
                        onkeyup="value=value.replace(/[^\d.]/g,'')">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他费用:"
                          prop="motherFee">
              <el-input placeholder="其他费用/元"
                        v-model="form.motherFee"
                        onkeyup="value=value.replace(/[^\d.]/g,'')">
                <template slot="append">元</template>
              </el-input>
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
                         v-model="form.isInvoice">
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
          <el-radio-group v-model="form.ordCommonTruck.truckType">
            <el-radio label="0"
                      @change="handleTruckTypeChange('0')">自有车</el-radio>
            <el-radio label="1"
                      @change="handleTruckTypeChange('1')">外调车</el-radio>
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
                           @change="handlePlateNumberChange(form.ordCommonTruck.plateNumber)">
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
                            prop="ordCommonTruck.mdriverId"
                            :rules="{ required: true, message: '主司机', trigger: 'change' }">
                <!--<el-input placeholder="主司机" v-model="form.ordCommonTruck.mdriverId"></el-input>-->
                <el-select class="filter-item"
                           v-model="form.ordCommonTruck.mdriverId"
                           filterable
                           placeholder="主司机">
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
                            prop="ordCommonTruck.sdriverId">
                <!--<el-input placeholder="副司机" v-model="form.ordCommonTruck.sdriverId"></el-input>-->
                <el-select class="filter-item"
                           v-model="form.ordCommonTruck.sdriverId"
                           filterable
                           placeholder="副司机">
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
                          v-model="form.ordCommonTruck.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="计费里程:"
                            prop="ordCommonTruck.chargedMileage">
                <el-input placeholder="计费里程"
                          v-model="form.ordCommonTruck.chargedMileage"
                          onkeyup="value=value.replace(/[^\d.]/g,'')">
                  <template slot="append">公里</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应付单价:"
                            prop="ordCommonTruck.payPrice">
                <el-input placeholder="应付单价"
                          v-model="form.ordCommonTruck.payPrice"
                          onkeyup="value=value.replace(/[^\d.]/g,'')">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="6">-->
            <!--<el-form-item label="油费:" prop="ordCommonTruck.oilFee">-->
            <!--<el-input placeholder="油费/元" v-model="form.ordCommonTruck.oilFee"-->
            <!--onkeyup="value=value.replace(/[^\d.]/g,'')">-->
            <!--<template slot="append">元</template>-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="装货费:" prop="ordCommonTruck.packFee">-->
            <!--<el-input placeholder="装货费/元" v-model="form.ordCommonTruck.packFee"-->
            <!--onkeyup="value=value.replace(/[^\d.]/g,'')">-->
            <!--<template slot="append">元</template>-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="卸货费:" prop="ordCommonTruck.releaseFee">-->
            <!--<el-input placeholder="卸货费/元" v-model="form.ordCommonTruck.releaseFee"-->
            <!--onkeyup="value=value.replace(/[^\d.]/g,'')">-->
            <!--<template slot="append">元</template>-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
          </el-row>
          <!--<el-row>-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="路桥费:" prop="ordCommonTruck.luqiaoFee">-->
          <!--<el-input placeholder="路桥费/元" v-model="form.ordCommonTruck.luqiaoFee"-->
          <!--onkeyup="value=value.replace(/[^\d.]/g,'')"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="保险费:" prop="ordCommonTruck.insuranceFee">-->
          <!--<el-input placeholder="保险费/元" v-model="form.ordCommonTruck.insuranceFee"-->
          <!--onkeyup="value=value.replace(/[^\d.]/g,'')"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="其它费用:" prop="ordCommonTruck.otherFee">-->
          <!--<el-input placeholder="其它费用/元" v-model="form.ordCommonTruck.otherFee"-->
          <!--onkeyup="value=value.replace(/[^\d.]/g,'')"></el-input>-->
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
                           clearable
                           @change="handleTruckTeamIdChange(form.ordCommonTruck.truckTeamId)">
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
                           @change="handlePlateNumberChangeC(form.ordCommonTruck.plateNumber)">
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
                            prop="ordCommonTruck.mdriverId"
                            :rules="{ required: true, message: '司机', trigger: 'change' }">
                <!--<el-input placeholder="司机" v-model="form.ordCommonTruck.mdriverId"></el-input>-->
                <el-select class="filter-item"
                           v-model="form.ordCommonTruck.mdriverId"
                           filterable
                           placeholder="司机"
                           clearable
                           @change="hanldemdriverIdIdChange(form.ordCommonTruck.mdriverId)">
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
                          v-model="form.ordCommonTruck.driverPhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="计费里程:"
                            prop="ordCommonTruck.chargedMileage">
                <el-input placeholder="计费里程"
                          v-model="form.ordCommonTruck.chargedMileage"
                          @change="handleCYSWacthTransportFee"
                          onkeyup="value=value.replace(/[^\d.]/g,'')">
                  <template slot="append">公里</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车型:"
                            prop="ordCommonTruck.vehicleType">
                <!--<el-input v-model="form.ordCommonTruck.vehicleType" placeholder="车型"></el-input>-->
                <el-select class="filter-item"
                           v-model="form.ordCommonTruck.vehicleType"
                           filterable
                           placeholder="车型">
                  <el-option v-for="item in truckType"
                             :key="item.id"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="车长:"
                            prop="ordCommonTruck.vehicleLength">
                <el-input v-model="form.ordCommonTruck.vehicleLength"
                          placeholder="车长"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="备注:"
                            prop="ordCommonTruck.remarks">
                <el-input placeholder="备注"
                          v-model="form.ordCommonTruck.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-col :span="20">
                <el-form-item label="运输费:"
                              prop="ordCommonTruck.transportFee">
                  <el-input placeholder="运输费/元"
                            v-model="form.ordCommonTruck.transportFee"
                            onkeyup="value=value.replace(/[^\d.]/g,'')">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3"
                      :offset="1">
                <el-button type="primary"
                           icon="el-icon-edit"
                           circle
                           @click="handleTruckTransportFee"></el-button>
              </el-col>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应付单价:"
                            prop="ordCommonTruck.payPrice">
                <el-input placeholder="应付单价"
                          v-model="form.ordCommonTruck.payPrice"
                          onkeyup="value=value.replace(/[^\d.]/g,'')">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="6">-->
            <!--<el-form-item label="装货费:" prop="ordCommonTruck.packFee">-->
            <!--<el-input placeholder="装货费/元" v-model="form.ordCommonTruck.packFee"-->
            <!--onkeyup="value=value.replace(/[^\d.]/g,'')">-->
            <!--<template slot="append">元</template>-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="保险费:" prop="ordCommonTruck.insuranceFee">-->
            <!--<el-input placeholder="保险费/元" v-model="form.ordCommonTruck.insuranceFee"-->
            <!--onkeyup="value=value.replace(/[^\d.]/g,'')">-->
            <!--<template slot="append">元</template>-->
            <!--</el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="6">-->
            <!--<el-form-item label="其它费用:" prop="ordCommonTruck.otherFee">-->
            <!--<el-input placeholder="其它费用/元" v-model="form.ordCommonTruck.otherFee"-->
            <!--onkeyup="value=value.replace(/[^\d.]/g,'')">-->
            <!--<template slot="append">元</template>-->
            <!--</el-input>-->
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
                  <el-radio-group v-model="form.ordCommonTruck.payType">
                    <el-radio label="0"
                              border
                              v-if="form.ordCommonTruck.payType === '0'">按单结</el-radio>
                    <el-radio label="1"
                              border
                              v-if="form.ordCommonTruck.payType === '1'">按月结</el-radio>
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
                              v-model="form.cashPayment"></el-input>
                  </el-col>
                  <el-col :span="3"
                          align="center">
                    <el-input size="mini"
                              v-model="form.oilPayment"></el-input>
                  </el-col>
                </el-row>
              </el-col>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div align="center">
        <el-button v-if="editStatus === false"
                   type="primary"
                   @click="submitForm('form')">立即创建</el-button>
        <el-button v-if="editStatus === true"
                   type="primary"
                   @click="upadtaForm('form')">立即更新</el-button>
        <el-button type="primary"
                   @click="upadtaFormT('form')"
                   v-else-if="editStatus === 'true'">提交</el-button>
        <el-button type="primary"
                   @click="cleanForm"
                   v-if="editStatus1 === true">清空</el-button>
        <el-button @click="sendDriverMsg('form')"
                   v-if="editStatus1 === true">发送司机</el-button>

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
                     clearable>
            <el-option v-for="(item, index) in ruleReq"
                       :key="item.index"
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
    <el-dialog title="计费规则"
               :visible.sync="CYSDialogVisible"
               width="30%"
               center>
      <el-form :model="ruleForm3"
               status-icon
               ref="ruleForm3"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="计费规则"
                      prop="pass">
          <el-select v-model="ruleForm3.value"
                     placeholder="请选择"
                     @change="handleCYSRulesReq"
                     clearable>
            <el-option v-for="(item, index) in ruleCYSReq"
                       :key="index"
                       :label="item.ruleName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="CYSDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="CYSDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import CargoInfo from './cargoInfo'
import consigneeCommon from '@/components/consigneeCommon/index'
import consignorCommon from '@/components/consignorCommon/index'
import {
  addObj,
  common_type,
  getAllTruckObj,
  getCustomerObj,
  getDetailByIdObj,
  getDetailListByIdObj,
  getDriverByPlateIdObj,
  getRateValidation,
  getTruckListByTeamIdObj,
  getTruckTeamObj,
  getZYTruckObj,
  ordAccountingRulesObj,
  ordCYSAccountingRulesObj,
  sendNewObj,
  truck_type,
  updateObj,
  updateObjT
} from '@/api/ordCommonGoods'
import { mapGetters } from 'vuex'
import ElTableHeader from 'element-ui'
import router from '@/router/router'
import { AreaSelect } from 'vue-area-linkage'
import { pca, pcaa } from 'area-data'
import 'vue-area-linkage/dist/index.css'

export default {
  components: { ElTableHeader, CargoInfo, AreaSelect, consigneeCommon, consignorCommon },
  data () {
    return {
      idReq: this.$route.params.id,
      editStatus: false,
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
          sdriverId: '',
          mdriverId: '',
          truckType: '0',
          plateNumber: '',
          chargedMileage: '',
          remarks: '',
          truckTeamId: '',
          driverPhone: '',
          vehicleType: '',
          vehicleLength: '',
          transportFee: '',
          payType: '0',
          totalFee: 0,
          payRate: '',
          payPrice: ''
        }
      },
      rules: {
        sendPlaceArray: [
          { required: true, message: '发货城市', trigger: 'change' }
        ],
        pickPlaceArray: [
          { required: true, message: '到货城市', trigger: 'change' }
        ],
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
          { required: true, message: '收货地址', trigger: 'change' }
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
      items: [{}],
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
      distanceReq: '',
      centerDialogVisible: false,
      ruleForm2: {
        value: ''
      },
      CYSDialogVisible: false,
      ruleForm3: {
        value: ''
      },
      rulesDetailReq: [],
      ruleReq: [],
      ruleCYSReq: [],
      rulesCYSDetailReq: [],
      teamName: '',
      getCustomerReq: [],
      truckType: []
    }
  },
  inject: ['reload'],
  mounted: function () {

    this.idReq = this.$route.query.id
    if (this.$route.query.aa === 1) {
      this.handleDetailById(this.idReq)
      this.editStatus = 'true'
      this.editStatus1 = false
    } else {
      this.editStatus1 = true
      if (this.idReq !== '' && this.idReq !== undefined) {
        this.handleDetailById(this.idReq)
        this.editStatus = true
      } else {
        if (window.sessionStorage.getItem('commonForm')) {
          this.form = JSON.parse(window.sessionStorage.getItem('commonForm'))
          this.consignorDataList = this.form.pickupAdds
          this.consigneeDataList = this.form.arrivalAdds
          if (this.form.commonGoodsInfos.length) {
            this.items = this.form.commonGoodsInfos
          }
        }
        this.dialogStatus = 'create'
        this.editStatus = false
      }
    }
  },
  computed: {
    ...mapGetters([
      'permissions'
    ]),
    totalFee () {
      const mtotalFeeReqTemp = (Number(this.form.mtransportFee) + Number(this.form.mpickFee) + Number(this.form.mpackFee) + Number(this.form.mreleaseFee) + Number(this.form.minsuranceFee) + Number(this.form.motherFee)).toFixed(2)
      if (isNaN(mtotalFeeReqTemp)) {
        return 0
      } else {
        this.form.mtotalFee = mtotalFeeReqTemp
        return mtotalFeeReqTemp
      }
    },
    ordCommonTruckTotalFee () {
      if (this.form.ordCommonTruck.truckType === '0') {
        // const ordCommonTruckTotalFeeTemp = (Number(this.form.ordCommonTruck.oilFee) + Number(this.form.ordCommonTruck.packFee) + Number(this.form.ordCommonTruck.releaseFee) + Number(this.form.ordCommonTruck.luqiaoFee) + Number(this.form.ordCommonTruck.insuranceFee) + Number(this.form.ordCommonTruck.otherFee)).toFixed(2)
        // if (isNaN(ordCommonTruckTotalFeeTemp)) {
        //   return 0
        // } else {
        //   this.form.ordCommonTruck.totalFee = ordCommonTruckTotalFeeTemp
        //   return ordCommonTruckTotalFeeTemp
        // }
        return 0
      } else if (this.form.ordCommonTruck.truckType === '1') {
        // const ordCommonTruckTotalFeeTemp = (Number(this.form.ordCommonTruck.transportFee) + Number(this.form.ordCommonTruck.releaseFee) + Number(this.form.ordCommonTruck.insuranceFee) + Number(this.form.ordCommonTruck.otherFee)).toFixed(2)
        // if (isNaN(ordCommonTruckTotalFeeTemp)) {
        //   return 0
        // } else {
        //   this.form.ordCommonTruck.totalFee = ordCommonTruckTotalFeeTemp
        //   return ordCommonTruckTotalFeeTemp
        // }
        return Number(this.form.ordCommonTruck.transportFee)
      }
    }
  },
  created () {
    this.ord_manualinput_upd = this.permissions['ord_manualinput_upd']
    this.common_typeList()
    this.handleGetTruckTeamList()
    this.handleGetZYTruckObj('0')
    this.handleGetCustomerObj()
    this.handleTruckType()
    this.handleRateValidation()
  },
  beforeRouteLeave (to, from, next) {
    if (window.sessionStorage.getItem('commonFormFlag') === '1') {
      window.sessionStorage.removeItem('commonForm')
      window.sessionStorage.removeItem('commonFormFlag')
    } else {
      window.sessionStorage.setItem('commonForm', JSON.stringify(this.form))
    }
    next()
  },
  methods: {
    handleTruckType: function () {
      truck_type().then(res => {
        this.truckType = res.data
      })
    },
    handleDetailById: function (id) {
      getDetailByIdObj(id).then(response => {
        this.getDetailByIdReq = response.data.data
        this.form.id = this.getDetailByIdReq.id
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
        this.consignorDataList = this.getDetailByIdReq.pickupAdds
        this.consigneeDataList = this.getDetailByIdReq.arrivalAdds
        if (this.getDetailByIdReq.ordCommonTruck) {
          this.form.ordCommonTruck = this.getDetailByIdReq.ordCommonTruck
        }
        if (this.getDetailByIdReq.ordCommonTruck !== null) {
          const truckIdReq = ''
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
                    this.form.ordCommonTruck.driverPhone = this.getDriverByPlateIdReq[i].phone
                  }
                }
              })
            })
          }
        }
        this.items = [{}]
        if (this.getDetailByIdReq.commonGoodsInfos.length) {
          this.items = this.getDetailByIdReq.commonGoodsInfos
        }
        if (this.getDetailByIdReq.ordCommonTruck) {
          this.form.ordCommonTruck = this.getDetailByIdReq.ordCommonTruck
        }
      })
    },
    hanldemdriverIdIdChange (value) {
      for (let i = 0; i < this.getDriverByPlateIdReq.length; i++) {
        if (this.getDriverByPlateIdReq[i].driverId === value) {
          this.form.ordCommonTruck.driverPhone = this.getDriverByPlateIdReq[i].phone
        }
      }
    },
    handlePlateNumberChange (value) {
      let truckIdReq
      for (let i = 0; i < this.getZYTruckReq.length; i++) {
        if (this.getZYTruckReq[i].plateNumber === value) {
          truckIdReq = this.getZYTruckReq[i].truckId
        }
      }
      this.form.ordCommonTruck.payType = '1'
      getDriverByPlateIdObj(truckIdReq).then(res => {
        this.getDriverByPlateIdReq = res.data
        this.form.ordCommonTruck.payRate = res.data[0].rate
      })
    },
    handlePlateNumberChangeC (value) {
      let truckIdReq = ''
      this.form.ordCommonTruck.driverPhone = ''
      for (let i = 0; i < this.getTruckListByTeamIdReq.length; i++) {
        if (this.getTruckListByTeamIdReq[i].plateNumber === value) {
          truckIdReq = this.getTruckListByTeamIdReq[i].truckId
          this.form.ordCommonTruck.vehicleLength = this.getTruckListByTeamIdReq[i].carLength
          this.form.ordCommonTruck.vehicleType = this.getTruckListByTeamIdReq[i].carAttribute
          if (this.getTruckListByTeamIdReq[i].attribute === '2') {
            this.form.ordCommonTruck.payType = '1'
          } else if (this.getTruckListByTeamIdReq[i].attribute === '1') {
            this.form.ordCommonTruck.payType = '0'
          }
        }
      }
      getDriverByPlateIdObj(truckIdReq).then(res => {
        this.getDriverByPlateIdReq = res.data
        this.form.ordCommonTruck.payRate = res.data[0].rate
      })
    },
    handleGetTruckTeamList () {
      getTruckTeamObj().then(res => {
        this.getTruckTeamReq = res.data
      })
    },
    handleTruckTeamIdChange (id) {
      this.form.ordCommonTruck.plateNumber = ''
      this.form.ordCommonTruck.mdriverId = ''
      this.form.ordCommonTruck.driverPhone = ''
      if (id !== '') {
        getTruckListByTeamIdObj(id).then(res => {
          this.getTruckListByTeamIdReq = res.data
        })
        let obj = {}
        obj = this.getTruckTeamReq.find((item) => {
          return item.truckTeamId === id
        })
        this.teamName = obj.teamName
      }
    },
    submitForm (formName) {
      const set = this.$refs
      const consigneeFormValidate = this.$refs.consigneeInfo.validateForm()
      const consignorFormValidate = this.$refs.consignorInfo.validateForm()
      set[formName].validate(valid => {
        if (valid && consigneeFormValidate && consignorFormValidate) {
          addObj(this.form)
            .then((res) => {
              if (res.data.data) {
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
                router.push({ path: '/order/ordCommonGoodsManger' })
                window.sessionStorage.setItem('commonFormFlag', '1')
              }
            })
        } else {
          this.$message.error('必填项不能为空')
          return false
        }
      })
    },
    upadtaForm (formName) {
      const set = this.$refs
      this.form.commonGoodsInfos = this.items
      const consigneeFormValidate = this.$refs.consigneeInfo.validateForm()
      const consignorFormValidate = this.$refs.consignorInfo.validateForm()
      set[formName].validate(valid => {
        if (valid && consigneeFormValidate && consignorFormValidate) {
          if (this.form.sendPlaceArray.length === 3 && this.form.pickPlaceArray.length === 3) {
            updateObj(this.form)
              .then((res) => {
                if (res.data) {
                  this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                  })
                  router.push({ path: '/order/ordCommonGoodsManger' })
                  window.sessionStorage.setItem('commonFormFlag', '1')
                }
              })
          } else {
            this.$message.error('请输入发货城市与收货城市')
            return false
          }
        } else {
          this.$message.error('必填项不能为空')
          return false
        }
      })
    },

    upadtaFormT (formName) {
      const set = this.$refs
      this.form.commonGoodsInfos = this.items
      const consigneeFormValidate = this.$refs.consigneeInfo.validateForm()
      const consignorFormValidate = this.$refs.consignorInfo.validateForm()
      set[formName].validate(valid => {
        if (valid && consigneeFormValidate && consignorFormValidate) {
          if (this.form.sendPlaceArray.length === 3 && this.form.pickPlaceArray.length === 3) {
            updateObjT(this.form)
              .then((res) => {
                if (res.data) {
                  this.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success',
                    duration: 2000
                  })
                  router.push({ path: '/orderCenter/ordCommonGoodsCenter' })
                  window.sessionStorage.setItem('commonFormFlag', '1')
                }
              })
          } else {
            this.$message.error('请输入发货城市与收货城市')
            return false
          }
        } else {
          this.$message.error('必填项不能为空')
          return false
        }
      })
    },
    cleanForm () {
      window.sessionStorage.removeItem('commonForm')
      window.sessionStorage.removeItem('commonFormFlag')
      this.reload()
    },
    common_typeList () {
      common_type().then(res => {
        this.common_typeReq = res.data
      })
    },
    add: function () {
      this.items.push({ goodsName: '' })
    },
    del: function () {
      if (this.items.length > 1) {
        this.items.splice(-1, 1)
      }
    },
    getData: function (val) {
      const index = val.index
      this.totalWeight = 0
      this.totalVolumn = 0
      this.totalValue = 0
      this.totalNumber = 0
      this.items[index] = val.data
      this.form.commonGoodsInfos = this.items
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].weight !== '' && this.items[i].weight !== undefined && !isNaN(this.items[i].weight)) {
          this.totalWeight += Number(this.items[i].weight)
        }
        if (this.items[i].volume !== '' && this.items[i].volume !== undefined && !isNaN(this.items[i].volume)) {
          this.totalVolumn += Number(this.items[i].volume)
        }
        if (this.items[i].value !== '' && this.items[i].value !== undefined && !isNaN(this.items[i].value)) {
          this.totalValue += Number(this.items[i].value)
        }
        if (this.items[i].packNum !== '' && this.items[i].packNum !== undefined && !isNaN(this.items[i].packNum)) {
          this.totalNumber += Number(this.items[i].packNum)
        }
      }
      this.totalWeight = this.totalWeight.toFixed(2)
      this.totalVolumn = this.totalVolumn.toFixed(2)
      this.totalValue = this.totalValue.toFixed(2)
      // this.totalNumber = this.totalNumber.toFixed(2)
    },
    handleTruckTypeChange: function (str) {
      this.form.ordCommonTruck.sdriverId = ''
      this.form.ordCommonTruck.mdriverId = ''
      // this.form.ordCommonTruck.truckType = ''
      this.form.ordCommonTruck.plateNumber = ''
      // this.form.ordCommonTruck.chargedMileage = ''
      this.form.ordCommonTruck.remarks = ''
      // this.form.ordCommonTruck.oilFee = ''
      // this.form.ordCommonTruck.packFee = ''
      // this.form.ordCommonTruck.releaseFee = ''
      // this.form.ordCommonTruck.luqiaoFee = ''
      // this.form.ordCommonTruck.insuranceFee = ''
      // this.form.ordCommonTruck.otherFee = ''
      this.form.ordCommonTruck.truckTeamId = ''
      // this.form.ordCommonTruck.driverId = ''
      this.form.ordCommonTruck.driverPhone = ''
      this.form.ordCommonTruck.vehicleType = ''
      this.form.ordCommonTruck.vehicleLength = ''
      this.form.ordCommonTruck.transportFee = ''
      this.form.ordCommonTruck.totalFee = 0
      getZYTruckObj(str).then(res => {
        this.getZYTruckReq = res.data
      })
    },
    handleGetZYTruckObj: function () {
      getZYTruckObj('0').then(res => {
        this.getZYTruckReq = res.data
      })
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
    sendDriverMsg: function (formName) {
      const set = this.$refs
      const consigneeFormValidate = this.$refs.consigneeInfo.validateForm()
      const consignorFormValidate = this.$refs.consignorInfo.validateForm()
      set[formName].validate(valid => {
        if (valid && consigneeFormValidate && consignorFormValidate) {
          getRateValidation().then(res => {
            if (!res.data) {
              this.$message.error('税率不能为空,请先前往系统设置界面设置税率')
            } else {
              sendNewObj(this.form)
                .then((res) => {
                  if (res.data.data) {
                    this.$notify({
                      title: '成功',
                      message: '发送成功',
                      type: 'success',
                      duration: 2000
                    })
                    router.push({ path: '/orderCenter/ordCommonGoodsCenter' })
                  } else {
                    this.$message.error(res.data.msg)
                  }
                })
            }
          })
        } else {
          this.$message.error('必填项不能为空')
          return false
        }
      })
    },
    // handleDistanceChange() {
    //   let origin = this.form.shipperCity
    //   let destination = this.form.pickerCity
    //   getDistancesObj(origin, destination).then(res => {
    //     if (res.data.data !== null) {
    //       this.form.mchargedMileage = parseInt(res.data.data)
    //       this.form.ordCommonTruck.chargedMileage = parseInt(res.data.data)
    //     }
    //   })
    // },
    handleTransportFee () {
      let str = ''
      if (this.form.customerId !== '') {
        for (let i = 0; i < this.getCustomerReq.length; i++) {
          if (this.getCustomerReq[i].customerId === this.form.customerId) {
            str = this.getCustomerReq[i].customerName
          }
        }
        ordAccountingRulesObj(str).then(res => {
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
    handleRulesReq (e) {
      getDetailListByIdObj(e).then(res => {
        this.rulesDetailReq = res.data
        const rulesDetailReqLength = this.rulesDetailReq.length
        if (rulesDetailReqLength !== 0) {
          if (Number(this.form.mchargedMileage) <= Number(this.rulesDetailReq[0].limitNum)) {
            this.form.mtransportFee = (this.rulesDetailReq[0].price * Number(this.form.mchargedMileage)).toFixed(2)
          } else if (Number(this.form.mchargedMileage) >= Number(this.rulesDetailReq[rulesDetailReqLength - 1].limitNum)) {
            this.form.mtransportFee = this.rulesDetailReq[rulesDetailReqLength - 1].price * Number(this.form.mchargedMileage)
          } else {
            for (let i = 0; i < (this.rulesDetailReq.length - 1); i++) {
              if ((Number(this.form.mchargedMileage) >= Number(this.rulesDetailReq[i].limitNum)) && (Number(this.form.mchargedMileage) < Number(this.rulesDetailReq[i + 1].limitNum))) {
                this.form.mtransportFee = (this.rulesDetailReq[i].price * Number(this.form.mchargedMileage)).toFixed(2)
              }
            }
          }
        }
      })
    },
    handleWacthTransportFee () {
      this.form.ordCommonTruck.chargedMileage = this.form.mchargedMileage
      if (this.rulesDetailReq.length !== 0) {
        const rulesDetailReqLength = this.rulesDetailReq.length
        if (Number(this.form.mchargedMileage) <= Number(this.rulesDetailReq[0].limitNum)) {
          this.form.mtransportFee = (this.rulesDetailReq[0].price * Number(this.form.mchargedMileage)).toFixed(2)
        } else if (Number(this.form.mchargedMileage) >= Number(this.rulesDetailReq[rulesDetailReqLength - 1].limitNum)) {
          this.form.mtransportFee = (this.rulesDetailReq[rulesDetailReqLength - 1].price * Number(this.form.mchargedMileage)).toFixed(2)
        } else {
          for (let i = 0; i < (this.rulesDetailReq.length - 1); i++) {
            if ((Number(this.form.mchargedMileage) >= Number(this.rulesDetailReq[i].limitNum)) && (Number(this.form.mchargedMileage) < Number(this.rulesDetailReq[i + 1].limitNum))) {
              this.form.mtransportFee = (this.rulesDetailReq[i].price * Number(this.form.mchargedMileage)).toFixed(2)
            }
          }
        }
      }
    },
    handleTruckTransportFee () {
      if (this.teamName !== '') {
        ordCYSAccountingRulesObj(this.teamName).then(res => {
          if (res.data.length > 0) {
            this.CYSDialogVisible = true
            this.ruleCYSReq = res.data
          } else {
            this.$message.error('不存在此承运商的计费规则')
          }
        })
      } else {
        this.$message.error('请先选择承运商')
      }
    },
    handleCYSRulesReq (e) {
      this.form.ordCommonTruck.chargedMileage = this.form.mchargedMileage
      getDetailListByIdObj(e).then(res => {
        this.rulesCYSDetailReq = res.data
        const rulesCYSDetailReqLength = this.rulesCYSDetailReq.length
        if (rulesCYSDetailReqLength !== 0) {
          if (Number(this.form.ordCommonTruck.chargedMileage) <= Number(this.rulesCYSDetailReq[0].limitNum)) {
            this.form.ordCommonTruck.transportFee = (this.rulesCYSDetailReq[0].price * Number(this.form.ordCommonTruck.chargedMileage)).toFixed(2)
            this.form.ordCommonTruck.payPrice = this.rulesCYSDetailReq[0].price
          } else if (Number(this.form.ordCommonTruck.chargedMileage) >= Number(this.rulesCYSDetailReq[rulesCYSDetailReqLength - 1].limitNum)) {
            this.form.ordCommonTruck.transportFee = (this.rulesCYSDetailReq[rulesCYSDetailReqLength - 1].price * Number(this.form.ordCommonTruck.chargedMileage)).toFixed(2)
            this.form.ordCommonTruck.payPrice = this.rulesCYSDetailReq[rulesCYSDetailReqLength - 1].price
          } else {
            for (let i = 0; i < (this.rulesCYSDetailReq.length - 1); i++) {
              if ((Number(this.form.ordCommonTruck.chargedMileage) >= Number(this.rulesCYSDetailReq[i].limitNum)) && (Number(this.form.ordCommonTruck.chargedMileage) < Number(this.rulesCYSDetailReq[i + 1].limitNum))) {
                this.form.ordCommonTruck.transportFee = (this.rulesCYSDetailReq[i].price * Number(this.form.ordCommonTruck.chargedMileage)).toFixed(2)
                this.form.ordCommonTruck.payPrice = this.rulesCYSDetailReq[i].price
              }
            }
          }
        }
      })
    },
    handleCYSWacthTransportFee () {
      if (this.rulesCYSDetailReq.length !== 0) {
        const rulesCYSDetailReqLength = this.rulesCYSDetailReq.length
        if (Number(this.form.ordCommonTruck.chargedMileage) <= Number(this.rulesCYSDetailReq[0].limitNum)) {
          this.form.ordCommonTruck.transportFee = (this.rulesCYSDetailReq[0].price * Number(this.form.ordCommonTruck.chargedMileage)).toFixed(2)
          this.form.ordCommonTruck.payPrice = this.rulesCYSDetailReq[0].price
        } else if (Number(this.form.ordCommonTruck.chargedMileage) >= Number(this.rulesCYSDetailReq[rulesCYSDetailReqLength - 1].limitNum)) {
          this.form.ordCommonTruck.transportFee = (this.rulesCYSDetailReq[rulesCYSDetailReqLength - 1].price * Number(this.form.ordCommonTruck.chargedMileage)).toFixed(2)
          this.form.ordCommonTruck.payPrice = this.rulesCYSDetailReq[rulesCYSDetailReqLength - 1].price
        } else {
          for (let i = 0; i < (this.rulesCYSDetailReq.length - 1); i++) {
            if ((Number(this.form.ordCommonTruck.chargedMileage) >= Number(this.rulesCYSDetailReq[i].limitNum)) && (Number(this.form.ordCommonTruck.chargedMileage) < Number(this.rulesCYSDetailReq[i + 1].limitNum))) {
              this.form.ordCommonTruck.transportFee = (this.rulesCYSDetailReq[i].price * Number(this.form.ordCommonTruck.chargedMileage)).toFixed(2)
              this.form.ordCommonTruck.payPrice = this.rulesCYSDetailReq[i].price
            }
          }
        }
      }
    },
    handleGetCustomerObj () {
      getCustomerObj().then(res => {
        this.getCustomerReq = res.data
      })
    },
    // handleAutocompletePick() {
    //   this.$nextTick(function() {
    //     var th = this
    //     var map = new BMap.Map('pickerAllmap')
    //     var str_picker = th.form.pickPlaceArray[0] + th.form.pickPlaceArray[2]
    //     if ((str_picker === undefined) && (str_picker === '')) {
    //       map.centerAndZoom('全国', 12)
    //     } else {
    //       map.centerAndZoom(str_picker, 12)
    //     }
    //     var ac = new BMap.Autocomplete({
    //       'input': 'suggestId',
    //       'location': map
    //     })
    //     ac.addEventListener('onconfirm', function(e) {
    //       var _value = e.item.value
    //       th.form.pickerCity = _value.province + _value.city + _value.district + _value.street + _value.business
    //     })
    //   })
    // },
    // handleAutocompleteShipper() {
    //   this.$nextTick(function() {
    //     var th = this
    //     var map = new BMap.Map('shipperAllmap')
    //     var str_shipper = th.form.sendPlaceArray[0] + th.form.sendPlaceArray[2]
    //     if ((str_shipper === undefined) && (str_shipper === '')) {
    //       map.centerAndZoom('全国', 12)
    //     } else {
    //       map.centerAndZoom(str_shipper, 12)
    //     }
    //     var ac = new BMap.Autocomplete({
    //       'input': 'suggestShipperId',
    //       'location': map
    //     })
    //     ac.addEventListener('onconfirm', function(e) {
    //       var _value = e.item.value
    //       th.form.shipperCity = _value.province + _value.city + _value.district + _value.street + _value.business
    //     })
    //   })
    // },
    handleCustomerChange (val) {
      for (let i = 0; i < this.getCustomerReq.length; i++) {
        if (this.getCustomerReq[i].customerId === val) {
          this.form.balanceWay = this.getCustomerReq[i].payWay
        }
      }
    },
    uploadConsigneeData (data) {
      this.form.arrivalAdds = data.data.arrivalAdds
    },
    uploadConsignorData (data) {
      this.form.pickupAdds = data.data.pickupAdds
    },
    handleCalcMileage () {
      this.$nextTick(function () {
        const _that = this
        const origin = this.$refs.consignorInfo.distanceData().origin
        const waypointsOri = this.$refs.consignorInfo.distanceData().waypoints
        const destination = this.$refs.consigneeInfo.distanceData().destination
        const waypointsDes = this.$refs.consigneeInfo.distanceData().waypoints
        const waypontsAll = [...waypointsOri, ...waypointsDes]
        const pway = []
        waypontsAll.forEach(item => {
          pway.push(new BMap.Point(parseFloat(item.lng), parseFloat(item.lat)))
        })
        var map = new BMap.Map('distance-map')
        var p1 = new BMap.Point(origin.lng, origin.lat)
        var p2 = new BMap.Point(destination.lng, destination.lat)
        var searchComplete = function (results) {
          if (driving.getStatus() !== BMAP_STATUS_SUCCESS) {
            return
          }
          var plan = results.getPlan(0)
          // alert(plan.getDistance(true))
          _that.form.mchargedMileage = parseInt(plan.getDistance(true))
          _that.form.ordCommonTruck.chargedMileage = parseInt(plan.getDistance(true))
        }
        var driving = new BMap.DrivingRoute(map, {
          renderOptions: { map: map, autoViewport: true },
          onSearchComplete: searchComplete
        })
        driving.search(p1, p2, { waypoints: pway })
      })
    }
  }
}
</script>
<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

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

/*
    .title {
      font-size: 16px;
      background-color: #2d8cf0;
      color: #fff;
      display: inline-block;
      padding-left: 24px;
      padding-right: 24px;
      border-radius: 8px;
    }
  */

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
</style>
