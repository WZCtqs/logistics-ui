<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container billListcss1">
      <el-form ref="form"
               :model="form"
               label-width="100px"
               class="filter-item">
        <el-row v-if="payType==0">
          <el-col :span="8">
            <el-form-item label="客户名称"
                          class="filter-item">
              <el-select v-model="listQuery.customerName"
                         filterable
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter"
                         clearable>
                <el-option v-for="item in customerArr"
                           :key="item.customerId"
                           :label="item.customerName"
                           :value="item.customerName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="创建时间"
                          class="filter-item">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.paramDate"
                              style="width: 100%;"
                              @keyup.enter.native="handleFilter"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="订单类型"
                          class="filter-item">
              <el-select v-model="listQuery.orderType"
                         filterable
                         placeholder="-请选择-"
                         @change="handleFilter"
                         @keyup.enter.native="handleFilter">
                <el-option v-for="item in orderTypearr"
                           :key="item.id"
                           :label="item.label"
                           :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="payType==1">
          <el-col :span="6">
            <el-form-item label="创建时间">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery1.createTime"
                              style="width: 100%;"
                              @keyup.enter.native="handleFilter"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车牌号"
                          class="filter-item">
              <el-select class="filter-item"
                         filterable
                         clearable
                         placeholder="请选择"
                         v-model="listQuery1.plateNumber"
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in getAllTruckReq"
                           :key="item.truckId"
                           :label="item.plateNumber"
                           :value="item.plateNumber">
                </el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="车牌号">-->
            <!--<el-select v-model="listQuery1.driverId"-->
            <!--filterable-->
            <!--@keyup.enter.native="handleFilter"-->
            <!--@change="handleFilter">-->
            <!--<el-option v-for="item in driverArr"-->
            <!--:key="item.driverId"-->
            <!--:label="item.driverName"-->
            <!--:value="item.driverId"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
          </el-col>
          <el-col :span="6">
            <el-form-item label="车主">
              <el-select v-model="listQuery1.truckownName"
                         filterable
                         clearable
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in getAllTruTruckOwnReq"
                           :key="item.id"
                           :label="item.truckownName"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="司机姓名">
              <el-select v-model="listQuery1.driverId"
                         filterable
                         clearable
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in driverArr"
                           :key="item.driverId"
                           :label="item.driverName"
                           :value="item.driverId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-button class="filter-item"
                   type="primary"
                   size="mini"
                   v-waves
                   icon="search"
                   @click="handleFilter">搜索
        </el-button>

        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   v-if="Exp0 && payType==0"
                   @click="handleExp()">对账单详情导出
        </el-button>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   v-if="Exp1 && payType==1"
                   @click="handleExp()">对账单详情导出
        </el-button>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   v-if="deleteObj && payType==0"
                   @click="handleDelete">删除
        </el-button>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   v-if="deleteObj1 && payType==1"
                   @click="centerDialogVisible = true">删除
        </el-button>

        <!--<el-button-->
        <!--class="filter-item"-->
        <!--style="margin-left: 10px;"-->
        <!--type="primary"-->
        <!--icon="edit"-->
        <!--size="mini"-->
        <!--v-if="SettlementProcessShow && payType==0"-->
        <!--@click="handleYFDZD('1')"-->
        <!--&gt;发送对账单-->
        <!--</el-button>-->

        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   @click="handleDetail()">查看
        </el-button>

        <!-- 单挑操作按钮 -->
        <!-- <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="edit"
          size="mini"
          @click="sendDriver()"
          v-if="SettlementProcessShow1 && payType==1"
        >发送对账单</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="edit"
          size="mini"
          @click="distributionFee1()"
          v-if="payType==1"
        >费用分配</el-button> -->

        <!--<el-button-->
        <!--class="filter-item"-->
        <!--style="margin-left: 10px;"-->
        <!--type="primary"-->
        <!--icon="edit"-->
        <!--size="mini"-->
        <!--v-if="InvoiceSettlementConfirmation && payType==0"-->
        <!--@click="handleYFDZD('2')"-->
        <!--&gt;开票结算确认-->
        <!--</el-button>-->
        <!--<el-button-->
        <!--class="filter-item"-->
        <!--style="margin-left: 10px;"-->
        <!--type="primary"-->
        <!--icon="edit"-->
        <!--size="mini"-->
        <!--v-if="InvoiceSettlementConfirmationN && payType==0"-->
        <!--@click="handleYFDZD('3')"-->
        <!--&gt;不开票结算确认-->
        <!--</el-button>-->

        <!-- <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="edit"
          size="mini"
          v-if="InvoiceSettlementConfirmation1 && payType==1"
          @click="handleBillConfirm('1')"
        >开票结算确认</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="edit"
          size="mini"
          v-if="InvoiceSettlementConfirmationN1 && payType==1"
          @click="handleBillConfirm('0')"
        >不开票结算确认</el-button> -->
      </div>
    </div>

    <el-tabs v-model="payType"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="应收费用账单"
                   name="0">
        <el-table v-if="payType==0"
                  :key="tableKey"
                  :data="list"
                  v-loading="listLoading"
                  element-loading-text="给我一点时间"
                  border
                  max-height="600"
                  fit
                  highlight-current-row
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection"
                           width="55"
                           :selectable="selectable"></el-table-column>
          <el-table-column align="center"
                           label="对账单编号">
            <template slot-scope="scope">
              <span style="color:#409EFF;cursor:pointer"
                    @click="handleDetail1(scope.row)">{{ scope.row.accountPayId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="日期范围">
            <template slot-scope="scope">
              <span>{{ scope.row.payDateStart | moment('YYYY-MM-DD') }}~{{ scope.row.payDateEnd | moment('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="客户名称">
            <template slot-scope="scope">
              <span>{{ scope.row.customerName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="订单数量">
            <template slot-scope="scope">
              <span>{{ scope.row.orderAmount }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="订单类型">
            <template slot-scope="scope">
              <span>{{ scope.row.orderType}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="利率">
            <template slot-scope="scope">
              <span>{{ scope.row.rate }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="合计费用（含发票）">
            <template slot-scope="scope">
              <span>{{ scope.row.totalFee }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="对账单状态">
            <template slot-scope="scope">
              <span v-if="scope.row.settlementStatus=='0'">未结算</span>
              <span v-if="scope.row.settlementStatus=='1'">已提交</span>
              <span v-if="scope.row.settlementStatus=='2'">普通结算</span>
              <span v-if="scope.row.settlementStatus=='3'">开票结算</span>
              <span v-if="scope.row.settlementStatus=='4'">司机已确认</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="创建日期">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | moment('YYYY-MM-DD')}}</span>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="!listLoading && payType==0"
             class="pagination-container">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page"
                         :page-sizes="[10,20,30, 50]"
                         :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total"></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="应付费用账单"
                   name="1">
        <!-- <payableList v-on:distributionFee="distributionFee" :listQuery1="listQuery" ref="payableList"></payableList> -->
        <payableList :listQuery1="this.listQuery1"
                     ref="payableList"></payableList>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="textMap[1].title"
               :visible.sync="dialogFormVisible0">
      <el-form :model="listQuery"
               :rules="rules"
               ref="form0"
               label-width="100px"
               :disabled="true">
        <el-form-item label="司机名称">
          <el-input v-model="driverName"
                    placeholder="司机名称"></el-input>
        </el-form-item>
        <el-form-item label="订单类型">
          <!-- <el-input v-model="listQuery.orderType" placeholder="订单类型"></el-input> -->
          <span v-if="listQuery.orderType=='0'">集装箱</span>
          <span v-if="listQuery.orderType=='1'">普货</span>
        </el-form-item>
        <el-form-item label="订单数量">
          <el-input v-model="multipleSelection.length"
                    placeholder="订单数量"></el-input>
        </el-form-item>
        <el-form-item label="日期范畴">
          <el-input v-model="listQuery.ordStartTime"
                    placeholder="开始时间"></el-input>
          -
          <el-input v-model="listQuery.ordEndTime"
                    placeholder="结束时间"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary"
                   @click="createYFDZDjs()">确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 分配费用 -->
    <el-dialog :title="textMap[0].title"
               :visible.sync="dialogFormVisible1">
      <el-form :model="distributionFee_obj"
               :rules="rules"
               ref="form1"
               label-width="100px">
        <el-form-item label="合计费用">
          <el-col :span="10">
            <el-select v-model="distributionFee_shui"
                       filterable
                       placeholder="-请选择-"
                       @change="change_transOilFee()">
              <el-option v-for="item in distributionFee_shuiArr"
                         :key="item.id"
                         :label="item.label"
                         :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span v-if="distributionFee_shui=='0'">{{distributionFee_obj.totalFee}}元</span>
            <span v-if="distributionFee_shui=='1'">{{distributionFee_obj.totalFeeRate}}元</span>
          </el-col>
        </el-form-item>
        <el-form-item label="现金分配">
          <el-col :span="10">
            <el-input type="number"
                      @input="change_transOilFee()"
                      v-model="distributionFee_obj.payCash"
                      placeholder="现金分配"></el-input>
          </el-col>
          元
          <span v-if="!distributionFee_Status"
                style="color:red">(分配的现金不能大于费用合计)</span>
        </el-form-item>
        <el-form-item label="运费油卡分配">
          <el-col :span="10">
            <el-input v-model="distributionFee_obj.freightOilcardFee"
                      placeholder="运费油卡分配"
                      :disabled="true"></el-input>
          </el-col>
          元 （合计费用-现金分配）
        </el-form-item>
        <el-form-item label="正常油卡费用">
          <el-col :span="10">
            <el-input v-model="distributionFee_obj.normalOilcardFee"
                      placeholder="正常油卡费用"
                      :disabled="true"></el-input>
          </el-col>
          元 （正常油卡充值中提取的针对该订单的费用）
        </el-form-item>
        <el-form-item label="应付现金">
          <el-col :span="10">
            <el-input v-model="distributionFee_obj.needPayCash"
                      placeholder="应付现金"
                      :disabled="true"></el-input>
          </el-col>
          元 （分配现金金额-正常油卡费用）
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel_distributionFee()">取消分配</el-button>
        <el-button type="primary"
                   @click="distributionFee_js()">确定分配
        </el-button>
      </div>
    </el-dialog>

    <!-- 应付费用列表 -->
    <el-dialog :title="textMap[2].title"
               :visible.sync="dialogFormVisible2"
               width="80%">
      <el-col :span="6">对账单编号：{{orderObject.accountPayId}}</el-col>
      <el-col :span="6">客户名称：{{orderObject.customerName}}</el-col>
      <el-col :span="6">订单数量：{{orderObject.orderAmount}}</el-col>
      <el-col :span="6">订单类型：{{orderObject.orderType}}</el-col>
      <el-col :span="4">合计费用：{{orderObject.totalFee}}</el-col>
      <el-col :span="10">对账订单日期范围：{{orderObject.payDateStart | moment('YYYY-MM-DD')}}~{{orderObject.payDateEnd |
        moment('YYYY-MM-DD')}}
      </el-col>
      <el-col :span="8">创建时间：{{orderObject.createTime | moment('YYYY-MM-DD')}}</el-col>
      <el-table :key="tableKey2"
                :data="itemArr"
                v-loading="listLoading"
                element-loading-text="给我一点时间"
                border
                fit
                highlight-current-row
                style="width: 100%"
                @selection-change="handleSelectionChange">
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-button class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       icon="edit"
                       size="mini"
                       v-if="removeOrder0"
                       @click="removeOrderjs(scope.row,orderObject)">移除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="订单编号">
          <template slot-scope="scope">
            <span>{{scope.row.orderId}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="订单日期">
          <template slot-scope="scope">
            <span>{{scope.row.classDate | moment('YYYY-MM-DD')}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="货物品名"
                         v-if="this.orderType=='集装箱'">
          <template slot-scope="scope">
            <span>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="舱位号"
                         v-if="this.orderType=='集装箱'">
          <template slot-scope="scope">
            <span>{{scope.row.classOrder}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="箱号"
                         v-if="this.orderType=='集装箱'">
          <template slot-scope="scope">
            <span>{{scope.row.containerNo}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="箱型"
                         v-if="this.orderType=='集装箱'">
          <template slot-scope="scope">
            <span>{{scope.row.containerType}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="箱量"
                         v-if="this.orderType=='集装箱'">
          <template slot-scope="scope">
            <span>{{scope.row.containerNum}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="提空箱地"
                         v-if="this.orderType=='集装箱'">
          <template slot-scope="scope">
            <span>{{scope.row.pickupConPlace}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="提货地">
          <template slot-scope="scope">
            <span>{{scope.row.pickupGoodsDetailplace}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="落重箱地（卸货地）">
          <template slot-scope="scope">
            <span>{{scope.row.sendGoodsDetailplace}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="里程数（公里）">
          <template slot-scope="scope">
            <span>{{scope.row.kilometre}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="单价（元）">
          <template slot-scope="scope">
            <span>{{scope.row.recPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="运输费">
          <template slot-scope="scope">
            <span>{{scope.row.receivables}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="提箱费（元）"
                         v-if="this.orderType=='集装箱'">
          <template slot-scope="scope">
            <span>{{scope.row.pickcnFee}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="压车费（元）"
                         v-if="this.orderType=='集装箱'">
          <template slot-scope="scope">
            <span>{{scope.row.parkingFee}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="提货费"
                         v-if="this.orderType=='普货'">
          <template slot-scope="scope">
            <span>{{scope.row.pickFee}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="装货费"
                         v-if="this.orderType=='普货'">
          <template slot-scope="scope">
            <span>{{scope.row.packFee}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="卸货费"
                         v-if="this.orderType=='普货'">
          <template slot-scope="scope">
            <span>{{scope.row.releaseFee}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="保险费"
                         v-if="this.orderType=='普货'">
          <template slot-scope="scope">
            <span>{{scope.row.insuranceFee}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="异常费用（元）">
          <template slot-scope="scope">
            <span>{{scope.row.exceptionFee}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="订单价格（元）">
          <template slot-scope="scope">
            <span>{{scope.row.orderFee}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="税率（%）">
          <template slot-scope="scope">
            <span>{{scope.row.rate}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="合计费用（元）">
          <template slot-scope="scope">
            <!-- <span>{{scope.row.totalFee}}</span> -->
                        <span>{{scope.row.needPay}}</span>

          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="发票（账单）号">
          <template slot-scope="scope">
            <span></span>
          </template>
        </el-table-column>-->
        <el-table-column align="center"
                         label="备注">
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer"
           class="dialog-footer">
        <!-- <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   v-if="SettlementProcessShow && payType==0"
                   @click="handleYFDZD('1')">发送对账单
        </el-button> -->

        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   :disabled="orderObject.settlementStatus ==='2' || orderObject.settlementStatus ==='3'"
                   @click="dialogFormVisible3 = true">结算
        </el-button>
        <el-button @click="cancel2()">关 闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示"
               :visible.sync="centerDialogVisible"
               width="30%"
               center>
      <span>是否确定删除？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleBeforeDelete">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="结算方式"
               :visible.sync="dialogFormVisible3">
      <el-form label-width="100px">
        <el-row>
          <el-col :span="24">
            <h3 class="jsTxt">请选择对应的结算内容和结算方式。</h3>
          </el-col>
          <el-col :span="24"
                  class="jsTxt">
            <el-button class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       icon="edit"
                       size="mini"
                       v-if="InvoiceSettlementConfirmation && payType==0"
                       @click="handleYFDZD('3')">开票结算确认
            </el-button>
            <el-button class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       icon="edit"
                       size="mini"
                       v-if="InvoiceSettlementConfirmationN && payType==0"
                       @click="handleYFDZD('2')">不开票结算确认
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  import {
    BillConfirm,
    delObj,
    delObj1,
    distributionFee_function,
    excel,
    exportExpensespayable,
    fetchList,
    getdriverList,
    removeOrder,
    selectAllCustomers,
    selectOrderByBill,
    send_function,
    SettlementProcess
  } from '@/api/billList'
  import { getAllTruckObj, getAllTruTruckOwnObj } from '@/api/ordCommonGoods'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import payableList from './payable.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: 'table_loan',
    directives: {
      waves
    },
    data() {
      return {
        dialogFormVisible3: false,
        centerDialogVisible: false,
        readOrEdit: '',
        activeName2: 'first',
        payType: 0,
        distributionFee_shui: '0',
        list: [],
        list1: [],
        list2: [],
        total: null,
        listLoading: false,
        orderType_state: 0,
        currentStatus: 'detail',
        driverName: null,
        listQuery: {
          page: 1,
          limit: 20,
          customerName: null,
          paramDate: null,
          orderType: null
        },
        listQuery1: {
          page: 1,
          limit: 20,
          driverId: null,
          createTime: null
        },
        itemObj: {},
        itemArr: [],
        driverArr: [],
        customerArr: [],
        cashTypearr: [
          {
            id: '0',
            label: '单结'
          },
          {
            id: '1',
            label: '月结'
          }
        ],
        distributionFee_obj: {},
        distributionFee_shuiArr: [
          {
            id: '0',
            label: '不含税'
          },
          {
            id: '1',
            label: '含税'
          }
        ],
        orderTypearr: [
          {
            id: '0',
            label: '集装箱订单'
          },
          {
            id: '1',
            label: '普货订单'
          }
        ],
        rules: {},
        form: {
          plateNumber: '',
          repaymentRate: null
        },
        form1: {},
        objYFDZD: {},
        dialogFormVisible: false,
        dialogFormVisible0: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        getAllTruckReq: [],
        getAllTruTruckOwnReq: [],
        dialogStatus: '',
        getdriverArr: false,
        loan_upd: false,
        loan_del: false,
        financial_exp: false,
        textMap: [
          {
            id: 0,
            title: '费用分配'
          },
          {
            id: 1,
            title: '生成对账单'
          },
          {
            id: 2,
            title: '应收对账单详情'
          }
        ],
        tableKey: 0,
        tableKey2: 2,
        multipleSelection: [],
        plateNumberOptions: [],
        repaymentRateSelect: [],
        DriverPlateNumberSelect: [],
        DriverPlateNumberid: null,
        form_repaymentWay: null,
        form_applyMan: null,
        selectAllCustomers: false,
        selectExpensespayableList: false,
        deleteObj: false,
        deleteObj1: false,
        selectOrderByBill_obj: false,
        orderType: null,
        orderObject: {},
        SettlementProcess_str: null,
        SettlementProcessShow: false,
        SettlementProcessShow1: false,
        InvoiceSettlementConfirmation: false,
        InvoiceSettlementConfirmationN: false,
        InvoiceSettlementConfirmation1: false,
        InvoiceSettlementConfirmationN1: false,
        Exp0: false,
        Exp1: false,
        removeOrder0: false,
        distributionFee_Status: true
      }
    },
    components: {
      payableList
    },
    computed: {
      ...mapGetters(['permissions'])
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
      this.selectAllCustomersList()
      this.handleAllTruckInfo()
      this.handleAllTruTruckOwnInfo()
      this.SettlementProcessShow = this.permissions['SettlementProcessShow']
      this.SettlementProcessShow1 = this.permissions['SettlementProcessShow1']
      this.selectOrderByBill_obj = this.permissions['selectOrderByBill_obj']
      this.InvoiceSettlementConfirmation = this.permissions[
        'InvoiceSettlementConfirmation'
        ]
      this.InvoiceSettlementConfirmationN = this.permissions[
        'InvoiceSettlementConfirmationN'
        ]
      this.InvoiceSettlementConfirmation1 = this.permissions[
        'InvoiceSettlementConfirmation1'
        ]
      this.InvoiceSettlementConfirmationN1 = this.permissions[
        'InvoiceSettlementConfirmationN1'
        ]
      this.Exp0 = this.permissions['Exp0']
      this.Exp1 = this.permissions['Exp1']
      this.removeOrder0 = this.permissions['removeOrder0']
      this.deleteObj = this.permissions['deleteObj']
      this.deleteObj1 = this.permissions['deleteObj1']
      this.selectAllCustomers = this.permissions['selectAllCustomers']
      this.selectExpensespayableList = this.permissions[
        'selectExpensespayableList'
        ]
      this.getList()
      // 获取司机列表
      var obj = {
        tenantId: null
      }
      getdriverList(obj).then(res => {
        this.driverArr = res.data
        if (this.driverArr.length != 0) {
          this.listQuery.driverId = this.driverArr[0].driverId
          this.driverName = this.driverArr[0].driverName
        }
        this.getList()
      })
      this.listQuery.page = 1
    },
    methods: {
      handleAllTruckInfo() {
        getAllTruckObj().then(res => {
          this.getAllTruckReq = res.data
        })
      },
      handleAllTruTruckOwnInfo() {
        getAllTruTruckOwnObj().then(res => {
          this.getAllTruTruckOwnReq = res.data
        })
      },
      selectAllCustomersList() {
        selectAllCustomers().then(res => {
          this.customerArr = res.data
          //  console.log(res)
        })
      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },

      handleClick(tab, event) {
        this.handleFilter()
      },
      selectable(row, index) {
        // if (row.needPayStatus == "5") {
        //   return false;
        // } else {
        //   return true;
        // }
        return true
      },
      handleBillConfirm(obj) {
        if (this.payType == 1) {
          this.multipleSelection = this.$refs.payableList.multipleSelection
        }
        if (this.listQuery.orderType == '1') {
          this.multipleSelection = this.$refs.payableList.multipleSelection
        }
        if (this.multipleSelection.length == 0) {
          this.$notify({
            title: '提示',
            message: '抱歉,请选择你要操作的数据',
            type: 'warning',
            duration: 2000
          })
        } else if (this.multipleSelection.length > 1) {
          this.$notify({
            title: '提示',
            message: '抱歉，目前只支持单选操作',
            type: 'warning',
            duration: 2000
          })
        } else {
          if (this.payType == 1) {
            var row = this.multipleSelection[0]
            if (row.settlementStatus == '已结算') {
              this.$notify({
                title: '提示',
                message: '账单已结算，不能执行此操作',
                type: 'warning',
                duration: 2000
              })
            }
          }
        }
      },
      handleYFDZD(object_num) {
        // if (this.payType == 1) {
        //   this.multipleSelection = this.$refs.payableList.multipleSelection
        // }
        // if (this.multipleSelection.length == 0) {
        //   this.$notify({
        //     title: '提示',
        //     message: '请勾选你要选择的数据',
        //     type: 'warning',
        //     duration: 2000
        //   })
        // } else {
        //   if (this.multipleSelection.length == 1) {
        if (
          this.orderObject.settlementStatus == '2' ||
          this.orderObject.settlementStatus == '3'
        ) {
          this.$notify({
            title: '提示',
            message: '抱歉，当前帐单已结算，不支持您当前的操作',
            type: 'warning',
            duration: 2000
          })
        } else {
          if (object_num == '1') {
            if (this.payType == 0) {
              var obj = {
                accountPayId: this.orderObject.accountPayId,
                orderType: this.orderObject.orderType,
                settlementStatus: object_num
              }
              SettlementProcess(obj).then(res => {
                if (res.data) {
                  this.dialogFormVisible3 = false
                  this.dialogFormVisible2 = false
                  this.$notify({
                    title: '提示',
                    message: '操作成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.getList()
                }
              })
            }
          } else if (
            (
              object_num == '2') ||
            object_num == '3'
          ) {
            if (this.payType == 0) {
              var obj = {
                accountPayId: this.orderObject.accountPayId,
                orderType: this.orderObject.orderType,
                settlementStatus: object_num
              }
              SettlementProcess(obj).then(res => {
                if (res.data) {
                  this.dialogFormVisible3 = false
                  this.dialogFormVisible2 = false
                  this.$notify({
                    title: '提示',
                    message: '操作成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.getList()
                }
              })
            }
          }
        }
        // } else {
        //   this.$notify({
        //     title: '提示',
        //     message: '抱歉，只能勾选一条数据',
        //     type: 'warning',
        //     duration: 2000
        //   })
        // }
        // }
      },
      createYFDZDjs() {
        var orderIds = []
        for (var i = 0; i < this.multipleSelection; i++) {
          var orderId = this.multipleSelection[i].orderId
          orderIds.push(orderId)
        }
        var ordStartTime = this.listQuery.ordStartTime
        var ordEndTime = this.listQuery.ordEndTime
        var driverId = this.listQuery.driverId
        var params = {
          orderIds: orderIds,
          ordStartTime: ordStartTime,
          ordEndTime: ordEndTime,
          driverId: driverId
        }
        createYFDZD().then(res => {
          if (res.data.data) {
            this.dialogFormVisible0 = false
            this.$notify({
              title: '提示',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      },
      handleExp() {
        if (this.payType == 1) {
          this.multipleSelection = this.$refs.payableList.multipleSelection
        }
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要查看的数据',
            type: 'warning',
            duration: 2000
          })
        } else {
          if (this.payType == 0) {
            if (this.multipleSelection.length === 1) {
              var params = {
                accountPayId: this.multipleSelection[0].accountPayId
              }
              exportExpensespayable(params).then(response => {
                this.exportjs(response, '收')
              })
            } else {
              this.$notify({
                title: '提示',
                message: '请选择一条要查看的数据',
                type: 'warning',
                duration: 2000
              })
            }
          } else if (this.payType == 1) {
            if (this.multipleSelection.length === 1) {
              var params = {
                accountPayId: this.multipleSelection[0].accountPayId,
                orderType: this.multipleSelection[0].orderType
              }
              excel(params).then(response => {
                this.exportjs(response, '付')
              })
            } else {
              this.$notify({
                title: '提示',
                message: '请选择一条要查看的数据',
                type: 'warning',
                duration: 2000
              })
            }
          }
        }
      },
      exportjs(response, obj) {
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
        downloadElement.download = nowDate + '-应' + obj + '费用账单.xls' // xxx.xls/xxx.xlsx
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
      },
      // updateBilljs() {
      //   var transportFee = null
      //   var oilFee = null
      //   var pickcnFee = null
      //   var packFee = null
      //   var releaseFee = null
      //   if (this.itemObj.transportFee != null) {
      //     transportFee = Number(this.itemObj.transportFee)
      //   }
      //   if (this.itemObj.oilFee != null) {
      //     oilFee = Number(this.itemObj.oilFee)
      //   }
      //   if (this.itemObj.pickcnFee != null) {
      //     pickcnFee = Number(this.itemObj.pickcnFee)
      //   }
      //   if (this.itemObj.packFee != null) {
      //     packFee = Number(this.itemObj.packFee)
      //   }
      //   if (this.itemObj.releaseFee != null) {
      //     releaseFee = Number(this.itemObj.releaseFee)
      //   }
      //
      //   var params = {
      //     orderId: this.itemObj.orderId,
      //     transportFee: this.itemObj.transportFee,
      //     oilFee: this.itemObj.oilFee,
      //     pickcnFee: this.itemObj.pickcnFee,
      //     packFee: this.itemObj.packFee,
      //     releaseFee: this.itemObj.releaseFee
      //   }
      //   updateBill(params).then(res => {
      //     if (res.data.data) {
      //       this.dialogFormVisible2 = false
      //       this.$notify({
      //         title: '成功',
      //         message: '操作成功',
      //         type: 'success',
      //         duration: 2000
      //       })
      //     }
      //   })
      // },
      handleDetail1(row) {
        this.dialogFormVisible2 = true
        this.orderType = row.orderType
        var params = {
          accountPayId: row.accountPayId,
          orderType: row.orderType
        }
        this.orderObject = row

        selectOrderByBill(params).then(response => {
          this.dialogFormVisible2 = true

          this.itemArr = response.data.orderList
        })
      },
      handleDetail() {
        this.readOrEdit = 'read'

        if (this.payType == '1') {
          this.multipleSelection = this.$refs.payableList.multipleSelection

        }
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要查看的数据',
            type: 'warning',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          if (this.payType == '1') {
            this.$refs.payableList.handleDetail1(this.multipleSelection[0])
          } else if (this.payType == '0') {
            this.handleDetail1(this.multipleSelection[0])
          }
        } else {
          this.$notify({
            title: '提示',
            message: '请选择一条要查看的数据',
            type: 'warning',
            duration: 2000
          })
        }
      },
      sendDriver() {
        // if (this.payType == 1) {
        //   this.multipleSelection = this.$refs.payableList.multipleSelection;
        // }
        // if (this.listQuery.orderType == "1") {
        //   this.multipleSelection = this.$refs.payableList.multipleSelection;
        // }
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要操作的数据',
            type: 'warning',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          if (
            this.payType == 1 &&
            this.multipleSelection[0].settlementStatus != '已结算'
          ) {
            var obj = this.multipleSelection[0]
            var params = {
              id: obj.id
            }
            send_function(params).then(res => {
              if (res.data) {
                this.$refs.payableList.getList()
                this.$notify({
                  title: '成功',
                  message: '发送成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          } else {
            this.$notify({
              title: '提示',
              message: '抱歉，账单已结算，不支持当前操作',
              type: 'warning',
              duration: 2000
            })
          }
        } else {
          this.$notify({
            title: '提示',
            message: '请选择一条要操作的数据',
            type: 'warning',
            duration: 2000
          })
        }
      },
      cancel_distributionFee() {
        this.dialogFormVisible1 = false
        if (this.payType == 1) {
          this.distributionFee_obj = {}
          this.$refs.payableList.getList()
        }
      },
      distributionFee_js() {
        if (!this.distributionFee_Status) {
          this.$notify({
            title: '提示',
            message: '分配的现金不能大于费用合计',
            type: 'warning',
            duration: 2000
          })
        } else {
          if (this.payType == 1) {
            var params = {
              id: this.distributionFee_obj.id,
              // totalFee:this.distributionFee_obj.totalFee,
              // totalFeeRate:this.distributionFee_obj.totalFeeRate,
              normalOilcardFee: this.distributionFee_obj.normalOilcardFee,
              payCash: this.distributionFee_obj.payCash,
              needPayCash: this.distributionFee_obj.needPayCash,
              freightOilcardFee: this.distributionFee_obj.freightOilcardFee,
              useRate: this.distributionFee_shui
            }
            distributionFee_function(params).then(res => {
              if (res.data.data) {
                this.dialogFormVisible1 = false
                if (this.payType == 1) {
                  this.distributionFee_obj = {}
                  this.$refs.payableList.getList()
                }
                this.$notify({
                  title: '成功',
                  message: '费用分配成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        }
      },
      change_transOilFee() {
        if (
          this.distributionFee_obj.payCash >
          this.distributionFee_obj.totalFee &&
          this.distributionFee_shui == '0'
        ) {
          this.distributionFee_Status = false
        } else if (
          this.distributionFee_obj.payCash >
          this.distributionFee_obj.totalFeeRate &&
          this.distributionFee_shui == '1'
        ) {
          this.distributionFee_Status = false
        } else {
          this.distributionFee_obj.totalFee = Number(
            this.distributionFee_obj.totalFee
          )
          this.distributionFee_obj.payCash = Number(
            this.distributionFee_obj.payCash
          )
          this.distributionFee_obj.totalFeeRate = Number(
            this.distributionFee_obj.totalFeeRate
          )
          this.distributionFee_obj.normalOilcardFee = Number(
            this.distributionFee_obj.normalOilcardFee
          )
          if (this.distributionFee_shui == '0') {
            this.distributionFee_obj.freightOilcardFee =
              this.distributionFee_obj.totalFee -
              this.distributionFee_obj.payCash
          } else if (this.distributionFee_shui == '1') {
            this.distributionFee_obj.freightOilcardFee =
              this.distributionFee_obj.totalFeeRate -
              this.distributionFee_obj.payCash
          }
          this.distributionFee_obj.needPayCash =
            this.distributionFee_obj.payCash -
            this.distributionFee_obj.normalOilcardFee
        }
      },
      distributionFee1() {
        // if (this.payType == 1) {
        //   this.multipleSelection = this.$refs.payableList.multipleSelection;
        // }
        this.readOrEdit = 'Edit'
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要操作的数据',
            type: 'warning',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          if (this.multipleSelection[0].settlementStatus == '已结算') {
            this.$notify({
              title: '提示',
              message: '账单已结算，不能执行此操作',
              type: 'warning',
              duration: 2000
            })
          } else {
            this.dialogFormVisible1 = true
            this.distributionFee_obj = this.multipleSelection[0]
          }
        } else {
          this.$notify({
            title: '提示',
            message: '请选择一条要操作的数据',
            type: 'warning',
            duration: 2000
          })
        }
      },
      distributionFee(obj) {
        // alert(JSON.stringify(obj));
        this.dialogFormVisible1 = true
        this.distributionFee_obj = obj
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
        if (this.multipleSelection.length != 0) {
          this.driverName = this.multipleSelection[0].driverName
        }
      },
      handleFilter() {
        this.listQuery.page = 1
        if (this.payType == 1) {
          this.$refs.payableList.getList(this.listQuery)
        } else if (this.payType == 0) {
          this.getList()
        }
      },
      handleUpdate() {
        this.currentStatus = 'update'
        this.handleDetail()
      },

      handleBeforeDelete() {
        this.centerDialogVisible = false
        // this.handleDelete();
      },
      handleDelete() {
        if (this.payType == 1) {
          this.multipleSelection = this.$refs.payableList.multipleSelection
        }
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除的数据',
            type: 'warning',
            duration: 2000
          })
        } else {
          let strArr = []
          var accountPayIds = []
          var settlementStatusArr = []
          for (let i = 0; i < this.multipleSelection.length; i++) {
            strArr.push(this.multipleSelection[i].id)
            accountPayIds.push(this.multipleSelection[i].accountPayId)
            if (
              this.multipleSelection[i].settlementStatus == '已结算' &&
              this.payType == 1
            ) {
              settlementStatusArr++
            } else if (
              this.multipleSelection[i].settlementStatus == '2' ||
              (this.multipleSelection[i].settlementStatus == '3' &&
                this.payType == 0)
            ) {
              settlementStatusArr++
            }
          }
          if (settlementStatusArr != 0) {
            this.$notify({
              title: '提示',
              message: '抱歉，您只能删除未结算的账单',
              type: 'warning',
              duration: 2000
            })
          } else {
            if (this.payType == 0) {
              delObj(strArr.join(',')).then(response => {
                if (response.data) {
                  this.getList()
                  this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                  })
                }
              })
            } else if (this.payType == 1) {
              var delObj1Params = {
                accountPayIds: accountPayIds
              }
              delObj1(accountPayIds).then(response => {
                if (response.data.data) {
                  this.$refs.payableList.getList()
                  this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                  })
                }
              })
            }
          }
        }
      },
      // handleDept() {
      //   fetchDeptSelect().then(response => {
      //     this.plateNumberOptions = response.data
      //   })
      // },
      handleDeptValue(plateNumber) {
        this.form.truckId = plateNumber
      },
      handleRepaymentWay(obj) {
        var id = obj
        var id = obj
        this.form.repaymentWay = obj
        var arr = this.repaymentRateSelect
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == id) {
            this.form.repaymentRate = arr[i].value
          }
        }
      },
      handleApplyMan(obj) {
        var arr = this.DriverPlateNumberSelect
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].driverId == obj) {
            this.form.plateNumber = arr[i].plateNumber
          }
        }
      },

      cancel() {
        this.dialogFormVisible0 = false
        this.objYFDZD = {}
      },
      cancel2() {
        this.dialogFormVisible2 = false
      },
      removeOrderjs(obj_row,dzdobj2) {
        console.log(dzdobj2)
        debugger
        if (dzdobj2.settlementStatus != '2' && dzdobj2.settlementStatus != '3') {
          var params = {
            accountPayNumber: this.orderObject.accountPayId,
            orderNumber: obj_row.orderId
          }
          removeOrder(params).then(res => {
            if (res.data) {
              this.dialogFormVisible2 = false
              this.$notify({
                title: '成功',
                message: '移除成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        } else {
          this.$notify({
            title: '提示',
            message: '账单已结算，不允许执行当前操作',
            type: 'warning',
            duration: 2000
          })
        }
      },
      handleYFJS() {
        this.$confirm('请选择结算方式', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '开票结算',
          confirmButtonText: '开票结算',
          cancelButtonText: '不开票结算'
        })
          .then(() => {
            this.handleYFDZD('3')
          })
          .catch(action => {
            if (action !== 'cancel') {
              this.handleYFDZD('2')
            }
          })
      }
    }
  }
</script>
<style>
  .billListcss1 .el-tabs__header {
    margin-bottom: 1px;
  }

  .billListcss1 .el-tabs__item.is-active {
    background: #409eff;
    color: #fff;
  }

  .jsTxt {
    width: 100%;
    text-align: center;
    height: 90px;
    line-height: 90px;
  }
</style>
