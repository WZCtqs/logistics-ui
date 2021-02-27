<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">

      <el-form ref="form"
               :model="form"
               label-width="100px"
               class="filter-item">

        <el-row>
          <el-col :span="7">
            <el-form-item label="司机姓名"
                          class="filter-item">
              <el-select v-model="listQuery.driverId"
                         filterable
                         clearable
                         placeholder="请选择"
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in driverArr"
                           :key="item.driverId"
                           :label="item.driverName"
                           :value="item.driverId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="车牌号"
                          class="filter-item">
              <el-select class="filter-item"
                         filterable
                         placeholder="请选择"
                         v-model="listQuery.plateNumber"
                         clearable
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in getAllTruckReq"
                           :key="item.truckId"
                           :label="item.plateNumber"
                           :value="item.plateNumber">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="订单号"
                          class="filter-item">
              <el-input @keyup.enter.native="handleFilter"
                        style="width: 200px;"
                        class="filter-item"
                        placeholder="订单号"
                        v-model="listQuery.orderId"></el-input>

              <span v-if="searchMore">
                <el-tooltip class="item"
                            effect="dark"
                            content="收起"
                            placement="bottom">
                  <el-button icon="el-icon-caret-top"
                             size="small"
                             circle
                             @click="searchMore=!searchMore"></el-button>
                </el-tooltip>
              </span>
              <!-- <el-tooltip class="item" effect="dark" content="点击后可展开更多查询条件" placement="top-start">
        <el-button
                class="filter-item"
                  style="margin-left: 10px;"
                  type="primary"
                  icon="edit"
                  size="mini"
                  v-if="!searchMore"
                  @click="searchMore=!searchMore"
                >
                 展开
                </el-button>
      </el-tooltip> -->
              <span v-if="!searchMore">
                <el-tooltip class="item"
                            effect="dark"
                            content="更多搜索条件"
                            placement="bottom">
                  <el-button icon="el-icon-caret-bottom"
                             size="small"
                             circle
                             @click="searchMore=!searchMore"></el-button>
                </el-tooltip>
              </span>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7"
                  v-if="searchMore">
            <el-form-item label="结算方式"
                          class="filter-item">
              <el-select v-model="listQuery.settlement"
                         filterable
                         clearable
                         placeholder="-请选择-"
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in cashTypearr"
                           :key="item.id"
                           :label="item.label"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="7"
                  v-if="searchMore">
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
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="7"
                  v-if="searchMore">
            <el-form-item label="现金结算状态"
                          class="filter-item">
              <el-select v-model="listQuery.cashStatus"
                         filterable
                         clearable
                         placeholder="-请选择-"
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in cashJstypearr"
                           :key="item.id"
                           :label="item.label"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="7"
                  v-if="searchMore">
            <el-form-item label="运费结算状态"
                          class="filter-item">
              <el-select v-model="listQuery.oilStatus"
                         filterable
                         clearable
                         placeholder="-请选择-"
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in transportJstypearr"
                           :key="item.id"
                           :label="item.label"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="7"
                  v-if="searchMore">
            <el-form-item label="对账单状态:"
                          class="filter-item">
              <el-select class="filter-item"
                         filterable
                         placeholder="请选择"
                         v-model="listQuery.ifAddToYfbill"
                         clearable
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in ifAddToYfbillList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="7"
                  v-if="searchMore">
            <el-form-item label="去/回程 "
                          class="filter-item"
                          v-if="listQuery.orderType === '0'">
              <el-select class="filter-item"
                         filterable
                         clearable
                         placeholder="请选择"
                         v-model="listQuery.type"
                         @change="handleFilter"
                         @keyup.enter.native="handleFilter">
                <el-option v-for="(item,index) in OrderType"
                           :key="index"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7"
                  v-if="searchMore">

            <el-form-item label="箱号 "
                          class="filter-item"
                          v-if="listQuery.orderType === '0'">
              <el-input @keyup.enter.native="handleFilter"
                        style="width: 200px;"
                        class="filter-item"
                        placeholder="箱号"
                        v-model="listQuery.containerNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7"
                  v-if="searchMore">
            <el-form-item label="舱位号"
                          class="filter-item"
                          v-if="listQuery.orderType === '0'">
              <el-input @keyup.enter.native="handleFilter"
                        style="width: 200px;"
                        class="filter-item"
                        placeholder="舱位号"
                        v-model="listQuery.classOrder"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7"
                  v-if="searchMore">
            <el-form-item label="车辆类型 "
                          class="filter-item"
                          v-if="listQuery.orderType === '0'">
              <el-select filterable
                         placeholder="请选择"
                         v-model="listQuery.truckAttribute"
                         clearable
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option :key="item.id"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in CarType"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>

          <el-col :span="7"
                  v-if="searchMore">
            <el-form-item label="客户名称:"
                          v-if="listQuery.orderType === '0'"
                          class="filter-item">
              <el-select class="filter-item"
                         filterable
                         placeholder="请选择"
                         v-model="listQuery.customerId"
                         clearable
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in customerReq"
                           :key="item.customerId"
                           :label="item.customerName"
                           :value="item.customerId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12"
                  v-if="searchMore && listQuery.orderType=='0'">
            <el-form-item label="班列日期"
                          class="filter-item">
              <el-col :span="11">
                <el-date-picker type="date"
                                placeholder="班列开始日期"
                                v-model="listQuery.blStartTime"
                                style="width: 100%;"
                                @keyup.enter.native="handleFilter"
                                @change="handleFilter"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
              <el-col class="line"
                      :span="2"
                      align="center">--
              </el-col>
              <el-col :span="11">
                <el-date-picker type="date"
                                placeholder="班列结束日期"
                                v-model="listQuery.blEndTime"
                                style="width: 100%;"
                                @keyup.enter.native="handleFilter"
                                @change="handleFilter"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>
      <div class="expensesPayFlex">
        <div>
          <el-button class="filter-item"
                     style="margin-left: 10px;"
                     type="primary"
                     icon="edit"
                     size="mini"
                     v-if="exportNeedPayBill"
                     @click="handleExp()">导出
          </el-button>

          <el-button class="filter-item"
                     style="margin-left: 10px;"
                     type="primary"
                     icon="edit"
                     size="mini"
                     v-if="YFDZDstr"
                     @click="handleYFDZD">生成对账单
          </el-button>
          <el-button class="filter-item"
                     style="margin-left: 10px;"
                     type="primary"
                     icon="edit"
                     size="mini"
                     @click="handleDetail()">查看
          </el-button>

        </div>
        <div>
          <el-tag>订单费用合计:{{orderFeeSum}}</el-tag>
        </div>
      </div>
    </div>

    <el-table v-if="listQuery.orderType=='0'"
              :key="tableKey"
              :data="list"
              v-loading="listLoading"
              element-loading-text="给我一点时间"
              border
              fit
              highlight-current-row
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="table-expand">
            <el-col :span="6">
              <el-form-item label="箱号：">
                <span v-if="props.row.containerNo==null || props.row.containerNo==''">暂无</span>
                <span v-else>{{ props.row.containerNo }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="舱位号：">
                <span v-if="props.row.classOrder==null || props.row.classOrder==''">暂无</span>
                <span v-else>{{ props.row.classOrder }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="车牌号：">
                <span v-if="props.row.plateNumber==null || props.row.plateNumber==''">暂无</span>
                <span v-else>{{ props.row.plateNumber }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="电话：">
                <span v-if="props.row.driverPhone==null || props.row.driverPhone==''">暂无</span>
                <span v-else>{{ props.row.driverPhone }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="公里数：">
                <!-- <span v-if="props.row.carType != '0'">{{ props.row.distance }}</span>
                 <span v-if="props.row.carType == '0'"></span> -->

                <span v-if="props.row.distance==null || props.row.distance==''">暂无</span>
                <span v-else>{{ props.row.distance }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="单价：">
                <!-- <span v-if="props.row.carType != '0'">{{ props.row.perPrice }}</span>
                <span v-if="props.row.carType == '0'"></span> -->

                <span v-if="props.row.perPrice==null || props.row.perPrice==''">暂无</span>
                <span v-else>{{ props.row.perPrice }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="运输费：">
                <!-- <span v-if="props.row.carType != '0'">{{ props.row.transportFee }}</span>
                <span v-if="props.row.carType == '0'"></span> -->
                <span v-if="props.row.transportFee==null || props.row.transportFee==''">暂无</span>
                <span v-else>{{ props.row.transportFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="提箱费：">
                <!-- <span v-if="props.row.carType != '0'">{{ props.row.pickcnFee }}</span>
                <span v-if="props.row.carType == '0'"></span> -->
                <span v-if="props.row.pickcnFee==null || props.row.pickcnFee==''">暂无</span>
                <span v-else>{{ props.row.pickcnFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="ETC费：">
                <!-- <span v-if="props.row.carType != '0'">{{ props.row.ycFee }}</span>
                <span v-if="props.row.carType == '0'"></span> -->

                <span v-if="props.row.etcFee==null || props.row.etcFee==''">暂无</span>
                <span v-else>{{ props.row.etcFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="压车费：">
                <!-- <span v-if="props.row.carType != '0'">{{ props.row.ycFee }}</span>
                <span v-if="props.row.carType == '0'"></span> -->

                <span v-if="props.row.ycFee==null || props.row.ycFee==''">暂无</span>
                <span v-else>{{ props.row.ycFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="异常费用：">
                <span v-if="props.row.exFee==null || props.row.exFee==''">暂无</span>
                <span v-else>{{ props.row.exFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="利率：">
                <!-- <span v-if="props.row.carType != '0'">{{ props.row.rateStr }}</span>
                <span v-if="props.row.carType == '0'"></span> -->

                <span v-if="props.row.rateStr==null || props.row.rateStr==''">暂无</span>
                <span v-else>{{ props.row.rateStr }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="合计费用（含发票）：">
                <!-- <span v-if="props.row.carType != '0'">{{ props.row.needPayByRate }}</span>
                <span v-if="props.row.carType == '0'"></span> -->

                <span v-if="props.row.needPayByRate==null || props.row.needPayByRate==''">暂无</span>
                <span v-else>{{ props.row.needPayByRate }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="现金结算时间：">
                <template v-if="props.row.settlements">
                  <span v-if="props.row.settlements.length == 0">暂无</span>
                  <span v-else-if="props.row.settlements.length == 1">

                    <span v-if="props.row.settlements[0].settlementType === 'cash'">
                      {{ props.row.settlements[0].settlementTime| moment('YYYY-MM-DD')}}
                    </span>
                    <span v-else>暂无</span>
                  </span>
                  <span v-else>{{props.row.settlements[0].settlementTime | moment('YYYY-MM-DD')}}</span>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="现金结算人：">
                <template v-if="props.row.settlements">
                  <span v-if="props.row.settlements.length == 0">暂无</span>
                  <span v-else-if="props.row.settlements.length == 1">
                    <span v-if="props.row.settlements[0].settlementType === 'cash'">{{props.row.settlements[0].createBy}}</span>
                    <span v-else>暂无</span>
                  </span>
                  <span v-else>{{props.row.settlements[0].createBy}}</span>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="油卡:">
                <template v-if="props.row.settlements">
                  <span v-if="props.row.settlements.length == 0">未结算</span>
                  <span v-else-if="props.row.settlements.length == 1">
                    <span v-if="props.row.settlements[0].settlementType === 'oil'">已结算</span>
                    <span v-else>未结算</span>
                  </span>
                  <span v-else>已结算</span>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="油卡结算时间：">
                <template v-if="props.row.settlements">
                  <span v-if="props.row.settlements.length == 0">暂无</span>
                  <span v-else-if="props.row.settlements.length == 1">
                    <span v-if="props.row.settlements[0].settlementType === 'oil'">{{props.row.settlements[0].settlementTime | moment('YYYY-MM-DD')}}</span>
                    <span v-else>暂无</span>
                  </span>
                  <span v-else>{{props.row.settlements[0].settlementTime | moment('YYYY-MM-DD')}}</span>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="油卡结算人：">
                <template v-if="props.row.settlements">
                  <span v-if="props.row.settlements.length == 0">暂无</span>
                  <span v-else-if="props.row.settlements.length == 1">
                    <span v-if="props.row.settlements[0].settlementType === 'oil'">{{props.row.settlements[0].createBy}}</span>
                    <span v-else>暂无</span>
                  </span>
                  <span v-else>{{props.row.settlements[0].createBy}}</span>
                </template>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="车辆类型：">
                <span v-if="props.row.carType=='0'">自有车辆</span>
                <span v-else-if="props.row.carType=='1'">挂靠车辆</span>
                <span v-else-if="props.row.carType=='2'">外调车辆</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="分公司名称：">
                <span v-if="props.row.branchCName==null || props.row.branchCName==''">暂无</span>
                <span v-else>{{ props.row.branchCName }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="司机反馈：">
                <span v-if="props.row.feedBack==null || props.row.feedBack==''">暂无</span>
                <span v-else>{{ props.row.feedBack }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="正常油卡费用：">
                <span>{{ props.row.commonOilFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="应付现金：">
                <span>{{ props.row.cash }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="运费油卡：">
                <span>{{ props.row.transOilFee }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="备注：">
                <span v-if="props.row.remarks==null || props.row.remarks==''">暂无</span>
                <span v-else>{{ props.row.remarks }}</span>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-col :span="2">
                提货地：
              </el-col>
              <el-col :span="22">
                <span v-if="props.row.pickupAdds.length ==0 || props.row.pickupAdds.length==null">暂无</span>
                <span v-else
                      style="background:#f00;width:100%;">
                  <span v-for="(item,index) in props.row.pickupAdds"
                        :key="index">
                    <el-col :span="5"> {{item.addressCity}}</el-col>
                    <el-col :span="1"> <i v-if="index != (props.row.pickupAdds.length-1)">-</i></el-col>
                  </span>

                </span>
              </el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="2">
                送货地：
              </el-col>
              <el-col :span="22">
                <span v-if="props.row.arrivalAdds.length ==0 || props.row.arrivalAdds.length==null">暂无</span>
                <span v-else
                      style="background:#f00;width:100%;">
                  <span v-for="(item,index) in props.row.arrivalAdds"
                        :key="index">
                    <el-col :span="5"> {{item.addressCity}}</el-col>
                    <el-col :span="1"> <i v-if="index != (props.row.arrivalAdds.length-1)">-</i></el-col>
                  </span>

                </span>
              </el-col>

            </el-col>

          </el-form>
        </template>
      </el-table-column>

      <el-table-column type="selection"
                       width="55"
                       :selectable="selectable"></el-table-column>

      <el-table-column align="center"
                       label="是否加入对账单">
        <template slot-scope="scope">
          <span v-if="scope.row.ifAddToYfbill=='0'">未加入</span>
          <span v-if="scope.row.ifAddToYfbill=='1'">已加入</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="车主">
        <template slot-scope="scope">
          <span>{{ scope.row.truckownName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="司机">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="订单号">
        <template slot-scope="scope">
          <span style="color:#409EFF;cursor:pointer"
                @click="handleDetail2(scope.row)">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="去/回程">
        <template slot-scope="scope">
          <span v-if="scope.row.type=='0'">去程</span>
          <span v-if="scope.row.type=='1'">回程</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="班列日期">
        <template slot-scope="scope">
          <span v-if="scope.row.classDate !== null">{{ scope.row.classDate| moment('YYYY-MM-DD')}}</span>
          <span v-else></span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="结算方式">
        <template slot-scope="scope">
          <span>{{scope.row.settlement}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="订单类型">
        <template slot-scope="scope">
          <span>{{ scope.row.orderType }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="合计费用">
        <template slot-scope="scope">
          <span>{{ scope.row.needPay }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="结算状态">
        <template slot-scope="scope">
          <span v-if="scope.row.needPayStatus=='0'">账单未分配</span>
          <span v-else-if="scope.row.needPayStatus=='1'">账单未发送</span>
          <span v-else-if="scope.row.needPayStatus=='2'">账单已发送</span>
          <span v-else-if="scope.row.needPayStatus=='3'"> 司机已反馈</span>
          <span v-else-if="scope.row.needPayStatus=='4'">司机已确认</span>
          <span v-else-if="scope.row.needPayStatus=='5'">司机已确认</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="现金结算状态">
        <template slot-scope="scope">
          <span v-if="scope.row.orderSettlementStatus">
            <el-tag type="success"
                    v-if="scope.row.orderSettlementStatus.cashStatus==0"> 未结算 </el-tag>
            <el-tag type="danger"
                    v-if="scope.row.orderSettlementStatus.cashStatus==2"> 已结算 </el-tag>
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="运费油卡充值">
        <template slot-scope="scope">
          <el-tag type="info"
                  v-if="scope.row.settlement =='月结'"> 月结无 </el-tag>
          <el-tag type="warning"
                  v-if="scope.row.settlement =='单结' && scope.row.orderSettlementStatus.oilStatus==1"> 充值中 </el-tag>
          <el-tag type="danger"
                  v-if="scope.row.settlement =='单结' && scope.row.orderSettlementStatus.oilStatus==2"> 已结算 </el-tag>

          <el-button size="mini"
                     type="primary"
                     v-show="scope.row.settlement =='单结' && scope.row.orderSettlementStatus.oilStatus == 0"
                     @click="handleRecharge(scope.row)">去充值
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div v-show="!listLoading && listQuery.orderType=='0'"
         class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]"
                     :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"></el-pagination>
    </div>

    <commonOrderTable v-if="listQuery.orderType=='1'"
                      v-on:distributionFee="distributionFee"
                      @handleDetailPH="handleDetail2"
                      :listQuery1="listQuery"
                      @orderFeeSumUpdate='handleOrderFeeSumUpdate'
                      @handleRecharge1='handleRecharge'
                      ref="commonOrderTable"></commonOrderTable>

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
          <el-input v-model="driverId"
                    placeholder="司机id"
                    v-if="listQuery.orderType=='3111'"></el-input>
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
          <el-input v-model="listQuery.blStartTime"
                    placeholder="开始时间"></el-input>
          -
          <el-input v-model="listQuery.blEndTime"
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

        <el-form-item label="税率">
          <el-col :span="10">
            <el-select v-model="rate"
                       filterable
                       placeholder="-请选择-"
                       @change="change_transOilFee()">
              <el-option v-for="item in shuilvArr"
                         :key="item.id"
                         :label="item.taxRate"
                         :value="item.taxRate"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span>%</span>
          </el-col>

        </el-form-item>

        <el-form-item label="运输费">
          <el-col :span="10">
            <el-select v-model="distributionFee_shui1"
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
            <span>{{transportFee}}元 </span>
          </el-col>
        </el-form-item>

        <el-form-item label="压车费">
          <el-col :span="10">
            <el-select v-model="distributionFee_shui2"
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
            <span>{{ycFee}}元</span>
          </el-col>
        </el-form-item>
        <el-form-item label="合计费用">
          {{distributionFee_obj.exFee + transportFee + ycFee}}
          <!-- <el-col :span="10">
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
            <span v-if="distributionFee_shui=='0'">{{distributionFee_obj.needPay}}元</span>
            <span v-if="distributionFee_shui=='1'">{{distributionFee_obj.needPayByRate}}元</span>
          </el-col> -->
        </el-form-item>
        <el-form-item label="现金分配">
          <el-col :span="10">
            <el-input type="number"
                      @input="change_transOilFee()"
                      v-model="distributionFee_obj.payCash"
                      placeholder="现金分配"></el-input>
          </el-col>
          元 <span v-if="!distributionFee_Status"
                style="color:red">(分配的现金不能大于费用合计)</span>
        </el-form-item>
        <el-form-item label="运费油卡分配">
          <el-col :span="10">
            <el-input v-model="distributionFee_obj.transOilFee"
                      placeholder="运费油卡分配"
                      :disabled="true"></el-input>
          </el-col>
          元 （合计费用-现金分配）
        </el-form-item>
        <el-form-item label="正常油卡费用">
          <el-col :span="10">
            <el-input v-model="distributionFee_obj.commonOilFee"
                      placeholder="正常油卡费用"
                      :disabled="true"></el-input>
          </el-col>
          元 （正常油卡充值中提取的针对该订单的费用）
        </el-form-item>

        <el-form-item label="油卡押金">
          <el-col :span="10">
            <el-input type="number"
                      @input="change_transOilFee()"
                      v-model="distributionFee_obj.oilPledge"
                      placeholder="油卡押金"></el-input>
          </el-col>
          元 <span v-if="!distributionFee_Status1"
                style="color:red">(油卡押金不能大于应付现金)</span>
        </el-form-item>

        <el-form-item label="ETC费用">
          <el-col :span="10">
            <el-input type="number"
                      @input="change_transOilFee()"
                      v-model="distributionFee_obj.etcFee"
                      placeholder="ETC费用"></el-input>
          </el-col>
          元 <span v-if="!distributionFee_Status2"
                style="color:red">(ETC费用不能大于应付现金)</span>
        </el-form-item>

        <el-form-item label="输入运费油卡">
          <el-col :span="10">
            <el-input type="number"
                      @input="change_transOilFee()"
                      v-model="distributionFee_obj.oidCardFee"
                      placeholder="输入运费油卡"></el-input>
          </el-col>
          元 <span v-if="!distributionFee_Status1"
                style="color:red">(运费油卡不能大于应付现金)</span>
        </el-form-item>

        <el-form-item label="应付现金">
          <el-col :span="10">
            <el-input v-model="distributionFee_obj.cash"
                      placeholder="应付现金"
                      :disabled="true"></el-input>
          </el-col>

          元 （分配现金金额-ETC费用-油卡押金-运费油卡）
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
    <el-dialog :title="readOrEdit == 'read' ? '应付费用列表' : '调账' "
               :visible.sync="dialogFormVisible2"
               width="80%">
      <el-form :model="itemObj"
               :rules="rules"
               ref="form2"
               label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单编号:">
              {{itemObj1.orderId}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="账单状态:">
              <!-- 0:未发送，1：已发送，2：司机已确认 3：司机已反馈 4：未结算 5：已结算 -->
              <!-- <span v-if="itemObj1.needPayStatus=='0'">未发送</span>
              <span v-if="itemObj1.needPayStatus=='1'">已发送</span>
              <span v-if="itemObj1.needPayStatus=='2'">司机已确认</span>
              <span v-if="itemObj1.needPayStatus=='3'">司机已反馈</span>
              <span v-if="itemObj1.needPayStatus=='4'">未结算</span>
              <span v-if="itemObj1.needPayStatus=='5'">已结算</span> -->

              <span v-if="itemObj1.needPayStatus=='0'">账单未分配</span>
              <span v-else-if="itemObj1.needPayStatus=='1'">账单未发送</span>
              <span v-else-if="itemObj1.needPayStatus=='2'">账单已发送</span>
              <span v-else-if="itemObj1.needPayStatus=='3'">司机已反馈</span>
              <span v-else-if="itemObj1.needPayStatus=='4'">司机已确认</span>
              <span v-else-if="itemObj1.needPayStatus=='5'">司机已确认</span>

            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="司机姓名:">
              {{itemObj1.driverName}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="司机联系方式:">
              {{itemObj1.driverPhone}}
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="订单日期:">
              {{ itemObj1.orderDate | moment('YYYY-MM-DD hh:mm:ss ')}}

            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单类型:">
              {{itemObj1.orderType}}
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="公里数:">
              {{itemObj1.distance}}
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="单价:">
              {{itemObj1.perPrice}}
            </el-form-item>
          </el-col>

          <el-col :span="4">
            <el-form-item label="运输费:">
              {{itemObj1.transportFee}}
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="提货地址:">
              {{itemObj1.pickGoodsPlace}}

            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="送货地址:">
              {{itemObj1.sendGoodsPlace}}
            </el-form-item>
          </el-col>

          <span v-for="item in itemObj1.exceptionFeeList"
                :key="item.id">
            <el-col :span="6">
              <el-form-item :label="item.exceptionFeeType">
                {{item.exceptionFee}}
              </el-form-item>
            </el-col>
          </span>

        </el-row>

        <h5 v-if="readOrEdit=='Edit'"
            style="background:#409EFF; color:#fff; padding:1px 15px; font-size:16px; margin-bottom:30px;">应付费用调账</h5>
        <el-row v-if="readOrEdit=='Edit'">
          <el-col :span="6">
            <el-form-item label="公里数">
              <el-input type="number"
                        v-model="itemObj.distance"
                        @input="handleYsf"
                        placeholder="公里数"
                        :disabled="currentStatus=='detail'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="单价">
              <el-input v-model="itemObj.perPrice"
                        placeholder="单价"
                        @input="handlePerPrice"></el-input>
            </el-form-item>
          </el-col>

          <!-- <el-row>
          <el-col :span="6">
            <el-form-item label="装货费" v-if="itemObj.orderType=='普货'">
              <el-input
                type="number"
                v-model="itemObj.packFee"
                placeholder="装货费"
                :disabled="currentStatus=='detail'"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="油费" v-if="itemObj.orderType=='普货'">
              <el-input
                type="number"
                v-model="itemObj.oilFee"
                placeholder="油费"
                :disabled="currentStatus=='detail'"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->

          <!-- <el-col :span="6">
            <el-form-item label="提箱费">
              <el-input
                type="number"
                v-model="itemObj.pickcnFee"
                placeholder="提箱费"
                :disabled="currentStatus=='detail'"
              ></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="6">
            <el-form-item label="运输费">
              <el-input type="number"
                        v-model="itemObj.transportFee"
                        placeholder="运输费"
                        :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="利率">
              <el-input v-model="itemObj.moneyRate"
                        placeholder="利率"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row v-if="readOrEdit=='Edit'">
          <!-- <el-col :span="6">
            <el-form-item label="卸货费" v-if="itemObj.orderType=='普货'">
              <el-input
                type="number"
                v-model="itemObj.releaseFee"
                placeholder="卸货费"
                :disabled="currentStatus=='detail'"
              ></el-input>
            </el-form-item>
          </el-col>-->
          <!-- <el-col :span="6">
            <el-form-item label="压车费">
              <el-input v-model="itemObj.ycFee" placeholder="压车费"></el-input>
            </el-form-item>
          </el-col>-->

          <!-- <el-col :span="6">
            <el-form-item label="还箱费">
              <el-input v-model="form.loanCardNumber" placeholder="还箱费"></el-input>
            </el-form-item>
          </el-col>-->
          <!-- <el-col :span="6">
            <el-form-item label="放空费">
              <el-input v-model="itemObj.fkFee" placeholder="放空费"></el-input>
            </el-form-item>
          </el-col>-->
          <span v-for="item in itemObj.exceptionFeeList"
                :key="item.id">
            <el-col :span="6">
              <el-form-item :label="item.exceptionFeeType">
                <el-input type="number"
                          v-model="item.exceptionFee"
                          placeholder="异常费用"
                          :disabled="currentStatus=='detail'"></el-input>
              </el-form-item>
            </el-col>
          </span>

        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer"
           v-if="readOrEdit=='Edit'">
        <el-button @click="cancel2()"
                   v-if="readOrEdit=='read'">关 闭
        </el-button>
        <el-button @click="cancel2()"
                   v-if="readOrEdit=='Edit'">取 消
        </el-button>
        <el-button type="primary"
                   @click="updateBilljs()"
                   v-if="readOrEdit=='Edit'">确 定
        </el-button>
      </div>
      <div slot="footer"
           class="dislog-footer"
           v-if="readOrEdit=='read'">
        <el-button v-if="this.itemObj.settlement=='单结' && this.updateBill2"
                   class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   :disabled="this.itemObj.orderSettlementStatus.cashStatus==2"
                   @click="handleUpdate">调账
        </el-button>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   v-if="this.itemObj.settlement=='单结' && distributionFeeStr"
                   :disabled="this.itemObj.orderSettlementStatus.cashStatus==2"
                   @click="distributionFee1()">费用分配
        </el-button>

        <!-- 单挑操作按钮 -->
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   v-if="this.itemObj.settlement=='单结' && sendStr"
                   :disabled="this.itemObj.orderSettlementStatus.cashStatus==2"
                   @click="sendDriver()">发送账单
        </el-button>

        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   v-if="this.itemObj.settlement=='单结' && this.itemObj.needPayStatus!='5'"
                   :disabled="this.itemObj.orderSettlementStatus.cashStatus==2"
                   @click="jiesuan">结算
        </el-button>

        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   v-if="this.itemObj.settlement=='单结' && this.itemObj.needPayStatus=='5'"
                   @click="handlePrint">打印回执单
        </el-button>

        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   v-if="this.itemObj.settlement=='月结' && distributionFeeStr1"
                   @click="openEtcdialog">ETC费用分配
        </el-button>

      </div>
    </el-dialog>

    <!-- 确认结算弹框 -->
    <el-dialog title="结算方式"
               :visible.sync="dialogFormVisible3">
      <el-form :model="itemObj"
               :rules="rules"
               ref="form2"
               label-width="100px">
        <el-row>

          <el-col :span="24"
                  class="jsTxt">
            <el-form-item label="报销单号">
              <el-input v-model="itemObj.repaynumber"
                        placeholder="报销单号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24"
                  class="jsTxt">
            <el-button class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       icon="edit"
                       size="mini"
                       v-if="BillConfirmStr"
                       @click="handleBillConfirm('1')">结算确认
            </el-button>
            <!-- <el-button class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       icon="edit"
                       size="mini"
                       v-if="BillConfirmStrN"
                       @click="handleBillConfirm('0')">不开票结算确认
            </el-button> -->
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- etcFee费用分配弹框 -->
    <el-dialog title="ETC费用分配"
               :visible.sync="etcFeeDialog">
      <el-form :model="itemObj"
               :rules="rules"
               label-width="100px">
        <el-row>

          <el-col :span="24">
            <el-form-item label="ETC费用：">
              <el-input v-model="itemObj.etcFee"
                        placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24"
                  class="jsTxt">
            <el-button class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       icon="edit"
                       size="mini"
                       @click="handleetcFee">确认分配
            </el-button>
            <el-button class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       icon="edit"
                       size="mini"
                       @click="cancelETC">取消
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 打印现金结算回单 -->
    <el-dialog title="现金结算回单"
               :visible.sync="dialogPrintFormVisible">
      <div class="pay-print"
           ref="print">
        <p class="pay-print-time">报销单号:{{itemObj.repaynumber}}</p>
        <el-row>
          <h1 class="pay-print-header">现金结算回单</h1>
          <p class="pay-print-time">回单生成时间: {{itemObj.createTimeprint | moment('YYYY-MM-DD')}}</p>
        </el-row>
        <el-row>
          <el-col :span="8">车牌号:</el-col>
          <el-col :span="16">{{itemObj.plateNumber }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">司机:</el-col>
          <el-col :span="16">{{itemObj.driverName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">订单日期:</el-col>
          <el-col :span="16">
            {{itemObj.orderDate | moment('YYYY-MM-DD') }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">订单类型:</el-col>
          <el-col :span="16">{{itemObj.orderType}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">合计费用:</el-col>
          <el-col :span="16">{{itemObj.needPayByRate }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">现金结算费用:</el-col>
          <el-col :span="16">{{itemObj.cash }}</el-col>
        </el-row>

        <el-row>
          <el-col :span="8">订单号:</el-col>
          <el-col :span="16">{{itemObj.orderId }}</el-col>
        </el-row>

        <el-row v-if="itemObj.orderType=='集装箱'">
          <el-col :span="8">去回程:</el-col>
          <el-col :span="16"
                  v-if="itemObj.type==0">去程</el-col>
          <el-col :span="16"
                  v-if="itemObj.type==1">回程</el-col>
        </el-row>

        <el-row v-for="(item,index) in itemObj.pickupAdds"
                :key="index">
          <el-col :span="8">提货地:</el-col>
          <el-col :span="16">
            {{item.addressCity}}
            <i v-if="index != (itemObj.pickupAdds.length-1)">-</i>

          </el-col>
        </el-row>

        <el-row v-for="(item,index) in itemObj.arrivalAdds"
                :key="index">
          <el-col :span="8">送货地:</el-col>
          <el-col :span="16">
            {{item.addressCity}}
            <i v-if="index != (itemObj.arrivalAdds.length-1)">-</i>

          </el-col>
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
  BillConfirm,
  createYFDZD,
  detailObj,
  distributionFee_function,
  etcFeeApi,
  fetchList,
  getdriverList,
  getObj,
  ordersExport,
  sendToDriver,
  totalObj,
  updateBill,
  shuilvList
} from '@/api/financialManagement'
import router from '@/router/router'

import { getCustomerObj } from '@/api/expensesPay'
import { getAllTruckObj } from '@/api/ordCommonGoods'
import { truck_attribute } from '@/api/sendedOrder'
import waves from '@/directive/waves/index.js' // 水波纹指令
import commonOrderTable from './commonOrder.vue'
import { mapGetters } from 'vuex'
// import shortOrderTable from "./shortOrder.vue";

export default {
  name: 'table_loan',
  directives: {
    waves
  },
  data () {
    return {
      dialogPrintFormVisible: false,
      orderFeeSum: [],
      customerReq: [],
      checked1: false,
      checked1Status: false,
      checked2: false,
      checked2Status: false,
      searchMore: false,
      readOrEdit: 'read',
      distributionFee_shui: '0',
      distributionFee_shui1: '0',
      rate: null,
      shuilvArr: [],
      distributionFee_shui2: '0',
      list: [],
      list1: [],
      list2: [],
      total: null,
      listLoading: false,
      orderType_state: 0,
      currentStatus: 'detail',
      driverName: null,
      driverId: null,
      heightnum: null,
      getAllTruckReq: [],
      OrderType: [
        {
          value: '0',
          label: '去程'
        },
        {
          value: '1',
          label: '回程'
        }
      ],
      listQuery: {
        page: 1,
        limit: 20,
        blStartTime: null,
        blEndTime: null,
        driverId: null,
        plateNumber: null,
        orderId: null,
        settlement: null,
        orderType: '0',
        type: null,
        containerNo: null,
        classOrder: null,
        truckAttribute: null,
        customerId: '',
        oilStatus: '',
        cashStatus: '',
        ifAddToYfbill: ''
      },
      ifAddToYfbillList: [
        { label: '未加入', value: '0' },
        { label: '已加入', value: '1' }
      ],
      CarType: [],
      itemObj: {},
      itemObj1: {},
      driverArr: [],
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

      cashJstypearr: [
        {
          id: '0',
          label: '未结算'
        },
        {
          id: '1',
          label: '已结算'
        }
      ],

      transportJstypearr: [

        {
          id: '0',
          label: '未结算'
        },
        {
          id: '1',
          label: '充值中'
        },
        {
          id: '2',
          label: '已结算'
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
      dialogFormVisible3: false,
      etcFeeDialog: false,
      dialogStatus: '',
      getdriverArr: false,
      updateBill2: false,
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
          title: '应付费用列表'
        }
      ],
      tableKey: 0,
      multipleSelection: [],
      plateNumberOptions: [],
      repaymentRateSelect: [],
      DriverPlateNumberSelect: [],
      DriverPlateNumberid: null,
      form_repaymentWay: null,
      form_applyMan: null,
      exportNeedPayBill: false,
      YFDZDstr: false,
      sendStr: false,
      distributionFeeStr: false,
      distributionFeeStr1: false,
      BillConfirmStr: false,
      BillConfirmStrN: false,
      distributionFee_Status: true,
      distributionFee_Status1: true,
      distributionFee_Status2: true,
      transportFee: 0,
      ycFee: 0
    }
  },
  components: {
    commonOrderTable
    // shortOrderTable
  },
  computed: {
    ...mapGetters(['permissions'])
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
    // var height1 = window.screen.height
    // if (height1 > 800) {
    //   this.heightnum = 600
    // } else {
    //   this.heightnum = 400
    // }
    // this.handleDept()
    this.getdriverArr = this.permissions['getdriverArr']
    this.updateBill2 = this.permissions['updateBill2']
    this.financial_exp = this.permissions['financial_exp']
    this.exportNeedPayBill = this.permissions['exportNeedPayBill']
    this.YFDZDstr = this.permissions['YFDZDstr']
    this.sendStr = this.permissions['sendStr']
    this.distributionFeeStr = this.permissions['distributionFeeStr']
    this.distributionFeeStr1 = this.permissions['distributionFeeStr1']
    this.BillConfirmStr = this.permissions['BillConfirmStr']
    this.BillConfirmStrN = this.permissions['BillConfirmStrN']
    this.handleGetCustomerObj()
    this.shuilvFunction()
    var obj = {
      tenantId: null
    }
    getdriverList(obj).then(res => {
      this.driverArr = res.data
      if (this.driverArr.length != 0) {
        // this.listQuery.driverId = this.driverArr[0].driverId;
        // this.driverName = this.driverArr[0].driverName;
      }
      this.getList()
    })
    this.listQuery.page = 1
    this.truckList()
    this.handleAllTruckInfo()
  },
  watch: {
    // itemObj:{
    //     handler(newValue){
    //         // do something...
    //     },
    //     deep:true // 深度监听
    // }
  },
  methods: {
    shuilvFunction () {
      shuilvList().then(res => {
        this.shuilvArr = res.data

      })
    },

    handleGetCustomerObj () {
      getCustomerObj().then(res => {
        this.customerReq = res.data
      })
    },
    truckList () {
      truck_attribute().then(response => {
        this.CarType = response.data
      })
    },
    handleYsf () {
      this.itemObj.transportFee = this.itemObj.perPrice * this.itemObj.distance
    },
    handlePerPrice () {
      this.itemObj.transportFee = this.itemObj.perPrice * this.itemObj.distance
    },
    selectable (row, index) {
      // if (row.needPayStatus == "5") {
      //   return false;
      // } else {
      //   return true;
      // }
      return true
    },
    handleAllTruckInfo () {
      getAllTruckObj().then(res => {
        this.getAllTruckReq = res.data
      })
    },
    handleBillConfirm (ifInvoice) {

      this.dialogPrintFormVisible = true

      if (this.listQuery.orderType == '1') {
        this.multipleSelection = this.$refs.commonOrderTable.multipleSelection
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
        var row = this.multipleSelection[0]

        if (row.needPayStatus != '4') {
          this.$notify({
            title: '提示',
            message: '抱歉，账单只有在‘司机已确认’状态下才允许结算',
            type: 'warning',
            duration: 2000
          })
        } else {
          if (row.settlement == '月结') {
            this.$notify({
              title: '提示',
              message: '抱歉，当前操作只支持单结',
              type: 'warning',
              duration: 2000
            })
          } else if (row.ifAddToYfbill == '1') {
            this.$notify({
              title: '提示',
              message: '该账单已生成对账单，请到对账单列表中执行此操作',
              type: 'warning',
              duration: 2000
            })
          } else if (row.settlement == '单结') {
            var settlementTypestr = []
            if (this.checked1 && !this.checked1Status) {
              settlementTypestr.push('cash')
            }
            if (this.checked2 && !this.checked2Status) {
              settlementTypestr.push('oil')
            }
            // var params = {
            //   orderId: row.orderId,
            //   ifInvoice: ifInvoice,
            //   settlementType: settlementTypestr.join(',')
            // }
            var params = {
              orderId: row.orderId,
              repaynumber: this.itemObj.repaynumber
            }
            BillConfirm(params).then(res => {
              if (res.data.data) {
                this.$notify({
                  title: '提示',
                  message: '操作成功',
                  type: 'success',
                  duration: 2000
                })
                this.dialogPrintFormVisible = true
                this.dialogFormVisible1 = false
                this.dialogFormVisible2 = false
                this.dialogFormVisible3 = false
                if (this.listQuery.orderType == '0') {
                  this.getList()
                } else if (this.listQuery.orderType == '1') {
                  this.$refs.commonOrderTable.getList()
                }
              }
            })
          }
        }
      }
    },

    handleetcFee () {
      var params = {
        orderId: this.itemObj.orderId,
        etcFee: this.itemObj.etcFee

      }
      etcFeeApi(params).then(res => {
        if (this.listQuery.orderType == '1') {
          this.multipleSelection = this.$refs.commonOrderTable.multipleSelection
        }

        if (res.data.data) {
          this.dialogFormVisible2 = false
          this.etcFeeDialog = false
          if (this.listQuery.orderType == '1') {
            this.$refs.commonOrderTable.getList()
          } else if (this.listQuery.orderType == '0') {
            this.getList()
          }
          this.$notify({
            title: '提示',
            message: 'ETC费用分配成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '提示',
            message: res.data.msg,
            type: 'warning',
            duration: 2000
          })
        }
      })
    },
    handleYFDZD () {
      this.driverName = this.multipleSelection[0].driverName
      this.driverName = this.listQuery.driverId
      this.dialogFormVisible0 = true
      if (this.listQuery.orderTypType == '1') {
        this.multipleSelection = this.$refs.commonOrderTable.multipleSelection
      }
      if (this.multipleSelection.length == 0) {
        this.$notify({
          title: '提示',
          message: '请勾选你要选择的数据',
          type: 'warning',
          duration: 2000
        })
      } else {
        var settlement_0 = 0
        var orderStatus = 0
        var ifAddToYfbillNum = 0
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var item = this.multipleSelection[i]
          if (item.settlement == '0' || item.settlement == '单结') {
            settlement_0++
          }
          if (item.needPayStatus == '5' || item.needPayStatus == '账单已结算') {
            orderStatus++
          }
          if (item.ifAddToYfbill == '1') {
            ifAddToYfbillNum++
          }
        }
        if (settlement_0 == 0 && orderStatus == 0 && ifAddToYfbillNum == 0) {
          this.driverName = this.multipleSelection[0].driverName
          this.driverName = this.listQuery.driverId
          if (this.listQuery.blEndTime != null && this.listQuery.blEndTime != "" && this.listQuery.blStartTime != null && this.listQuery.blStartTime != "") {
            this.dialogFormVisible0 = true
          } else {
            this.$message.error("请选择查询条件中的班列日期。")
          }

        } else if (ifAddToYfbillNum != 0) {
          this.$notify({
            title: '提示',
            message: '你勾选的费用列表包含已生成对账单的数据，请检查后再执行此操作.',
            type: 'warning',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '提示',
            message: '生成对账单只能选择月结(未结算状态)的订单.',
            type: 'warning',
            duration: 2000
          })
        }
      }
    },
    createYFDZDjs () {
      debugger

      var orderIds = []
      var plateNumber = this.multipleSelection[0].plateNumber
      if (this.multipleSelection[0].length == 1) {
        var obj = {
          orderId: this.multipleSelection[0].orderId,
        }
        orderIds.push(orderId)
        var params = {
          orderIds: orderIds,
          plateNumber: plateNumber,
          driverId: this.listQuery.driverId
        }
        debugger
        console.log(params)
        createYFDZD(params).then(res => {
          if (res.data.data) {
            if (this.listQuery.orderType == '1') {
              this.$refs.commonOrderTable.getList()
            } else if (this.listQuery.orderType == '1') {
              this.getList()
            }
            this.dialogFormVisible0 = false
            this.$notify({
              title: '提示',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      } else {
        var ckNum = 0
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var plateNumber = this.multipleSelection[0].plateNumber
          if (i != 0 && plateNumber != this.multipleSelection[i].plateNumber) {
            ckNum++
          } else {
            orderIds.push(this.multipleSelection[i].orderId)
          }
        }
        debugger
        if (ckNum == 0) {
          var params = {
            orderIds: orderIds,
            plateNumber: plateNumber,
            driverId: this.listQuery.driverId
          }
          console.log(params)
          createYFDZD(params).then(res => {
            if (this.listQuery.orderType == '1') {
              this.$refs.commonOrderTable.getList()
            } else {
              this.getList()
            }
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
        } else {
          this.$notify({
            title: '提示',
            message: '请选择同一辆车来生成对账单',
            type: 'error',
            duration: 2000
          })
        }
      }
    },
    handleExp () {
      if (this.listQuery.orderType == '1') {
        this.multipleSelection = this.$refs.commonOrderTable.multipleSelection
      }
      var arr0 = []
      var arr1 = this.multipleSelection
      for (var i = 0; i < arr1.length; i++) {
        arr0.push(arr1[i].orderId)
      }
      var params = {
        orderType: this.listQuery.orderType,
        ids: arr0.join(',')
      }
      ordersExport(params).then(response => {
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
        downloadElement.download = nowDate + '-应付账单.xls' // xxx.xls/xxx.xlsx
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
    updateBilljs () {
      var arr = []
      if (this.itemObj.exceptionFeeList.length != 0) {
        for (var i = 0; i < this.itemObj.exceptionFeeList.length; i++) {
          var arrItem = {
            id: this.itemObj.exceptionFeeList[i].id,
            exceptionFee: this.itemObj.exceptionFeeList[i].exceptionFee
          }
          arr.push(arrItem)
        }
      }
      if (this.itemObj.carType == '0') {
        var params = {
          distance: null,
          orderId: this.itemObj.orderId,
          transportFee: null,
          exceptionFeeList: arr
        }
      } else {
        var params = {
          distance: this.itemObj.distance,
          orderId: this.itemObj.orderId,
          transportFee: this.itemObj.transportFee,
          exceptionFeeList: arr,
          moneyRate: this.itemObj.moneyRate,
          payPrice: this.itemObj.perPrice
        }
      }
      updateBill(params).then(res => {
        if (res.data.data) {
          this.dialogFormVisible2 = false
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        }
        if (this.listQuery.orderType == '0') {
          this.getList()
        } else if (this.listQuery.orderType == '1') {
          this.$refs.commonOrderTable.getList()
        }
      })
    },
    handleDetail2 (obj) {
      debugger
      this.multipleSelection = []
      if (this.listQuery.orderType == '1') {
        this.$refs.commonOrderTable.multipleSelection = []
        this.$refs.commonOrderTable.multipleSelection.push(obj)
      } else {
        this.multipleSelection.push(obj)
      }

      this.handleDetail()
    },
    handleDetail1 () {
      this.readOrEdit = 'Edit'
      if (this.listQuery.orderType == '1') {
        this.multipleSelection = this.$refs.commonOrderTable.multipleSelection
      }
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要查看的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        var orderStatus = 0
        if (this.multipleSelection[0].needPayStatus == '5' || this.multipleSelection[0].needPayStatus == '账单已结算') {
          this.dialogFormVisible2 = false
          this.$notify({
            title: '提示',
            message: '已结算账单不支持当前操作',
            type: 'warning',
            duration: 2000
          })
        } else if (this.multipleSelection[0].ifAddToYfbill == '1') {
          this.$notify({
            title: '提示',
            message: '该账单已生成对账单，请到对账单列表中执行对应的此操作',
            type: 'warning',
            duration: 2000
          })
        } else {
          var params = {
            orderId: this.multipleSelection[0].orderId
          }
          detailObj(params).then(response => {
            this.dialogFormVisible2 = true


            this.itemObj = response.data
          })
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
    handleDetail () {
      debugger
      this.readOrEdit = 'read'
      if (this.listQuery.orderType == '1') {
        this.multipleSelection = this.$refs.commonOrderTable.multipleSelection
      }

      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要查看的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        //  alert(this.multipleSelection[0].orderId);
        var settlement = this.multipleSelection[0].settlement
        var params = {
          orderId: this.multipleSelection[0].orderId
        }
        detailObj(params).then(response => {
          this.dialogFormVisible2 = true
          if (response.data != "") {
            response.data['settlement'] = settlement
            var myDate = new Date();
            myDate.getYear();        //获取当前年份(2位)
            myDate.getFullYear();    //获取完整的年份(4位,1970-????)
            myDate.getMonth();       //获取当前月份(0-11,0代表1月)
            myDate.getDate();        //获取当前日(1-31)
            myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
            myDate.toLocaleDateString();     //获取当前日期
            var mytime = myDate.toLocaleTimeString();     //获取当前时间
            myDate.toLocaleString();        //获取日期与时间 
            response.data['createTimeprint'] = myDate


            this.itemObj = response.data
            this.itemObj1 = response.data
          }




        })
      } else {
        this.$notify({
          title: '提示',
          message: '请选择一条要查看的数据',
          type: 'warning',
          duration: 2000
        })
      }
    },
    sendDriver () {
      if (this.listQuery.orderType == '1') {
        this.multipleSelection = this.$refs.commonOrderTable.multipleSelection

      }
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要操作的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        var obj = this.multipleSelection[0]
        if (obj.settlement == '月结') {
          this.$notify({
            title: '提示',
            message: '当前操作只支持单结订单',
            type: 'warning',
            duration: 2000
          })
        } else {

          if (obj.needPayStatus == '0') {
            this.$notify({
              title: '提示',
              message: '账单未分配,暂时不能发送司机',
              type: 'warning',
              duration: 2000
            })
          } else if (obj.needPayStatus == '5') {
            this.$notify({
              title: '提示',
              message: '已结算账单不支持当前操作',
              type: 'warning',
              duration: 2000
            })
          } else if (obj.ifAddToYfbill == '1') {
            this.$notify({
              title: '提示',
              message: '该账单已生成对账单，请到对账单中执行对应的操作.',
              type: 'warning',
              duration: 2000
            })
          } else {
            var params = {
              orderId: obj.orderId,
              plateNumber: obj.plateNumber
              // driverId: obj.driverId
            }
            sendToDriver(params).then(res => {
              if (res.data.data) {
                this.$notify({
                  title: '成功',
                  message: '发送成功',
                  type: 'success',
                  duration: 2000
                })
                if (this.listQuery.orderType == '0') {
                  this.getList()
                } else if (this.listQuery.orderType == '1') {
                  this.$refs.commonOrderTable.getList()
                }
              }
            })
          }
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
    cancel_distributionFee () {
      this.dialogFormVisible1 = false
      this.distributionFee_obj = {}
    },
    distributionFee_js () {
      if (!this.distributionFee_Status || !this.distributionFee_Status1 || !this.distributionFee_Status2) {
        return false
      } else {
        var params = {
          orderId: this.distributionFee_obj.orderId,
          payCash: this.distributionFee_obj.payCash,
          isYFInvoice: this.distributionFee_obj.isYFInvoice,
          cash: this.distributionFee_obj.cash,
          oilPledge: this.distributionFee_obj.oilPledge,
          transOilFee: this.distributionFee_obj.transOilFee,
          etcFee: this.distributionFee_obj.etcFee,
          oidCardFee: this.distributionFee_obj.oidCardFee,
          rate: this.distributionFee_obj.moneyRate
        }

        distributionFee_function(params).then(res => {
          if (res.data.data) {
            this.$notify({
              title: '成功',
              message: '费用分配成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible2 = false
            this.dialogFormVisible1 = false
            if (this.listQuery.orderType == '1') {
              this.$refs.commonOrderTable.getList()
            } else if (this.listQuery.orderType == '0') {
              this.getList()
            }
          } else {
            this.$notify({
              title: '成功',
              message: '费用分配成功',
              type: res.data.msg,
              duration: 2000
            })
          }
        })
      }
    },
    jiesuan () {

      this.dialogFormVisible3 = true
      // if(this.itemObj.isYFInvoice == '1'){
      // }
      var arr = this.itemObj.settlements
      for (var item in arr) {
        if (arr[item].settlementType == 'cash') {
          this.checked1 = true
          this.checked1Status = true
        }
        if (arr[item].settlementType == 'oil') {
          this.checked2 = true
          this.checked2Status = true
        }
      }
    },
    // distributionFee_obj.etcFee
    change_transOilFee () {

      this.distributionFee_obj.moneyRate = this.rate
      if (this.distributionFee_shui1 == '1') {
        this.transportFee = Number(this.distributionFee_obj.transportFee) - Number(this.distributionFee_obj.moneyRate) * Number(this.distributionFee_obj.transportFee) / 100

      } else if (this.distributionFee_shui1 == '0') {
        this.transportFee = Number(this.distributionFee_obj.transportFee)

      }
      if (this.distributionFee_shui2 == '1') {
        // this.distributionFee_shui1='0' // 运输费
        //  this.distributionFee_shui2='1' //押车费
        this.ycFee = Number(this.distributionFee_obj.ycFee) - Number(this.distributionFee_obj.moneyRate) * Number(this.distributionFee_obj.ycFee) / 100

      } else if (this.distributionFee_shui2 == '0') {
        // this.distributionFee_shui1='0' // 运输费
        //  this.distributionFee_shui2='1' //押车费
        this.ycFee = Number(this.distributionFee_obj.ycFee)

      }

      if (this.distributionFee_shui1 == '1' && this.distributionFee_shui2 == '1') {
        this.distributionFee_obj.isYFInvoice = '3'
      } else if (this.distributionFee_shui1 == '1' && this.distributionFee_shui2 == '0') {
        this.distributionFee_obj.isYFInvoice = '1'
      } else if (this.distributionFee_shui1 == '0' && this.distributionFee_shui2 == '1') {
        this.distributionFee_obj.isYFInvoice = '2'
      } else if (this.distributionFee_shui1 == '0' && this.distributionFee_shui2 == '0') {
        this.distributionFee_obj.isYFInvoice = '0'
      }

      var needPayByRate = Number(this.distributionFee_obj.exFee) + Number(this.transportFee) + Number(this.ycFee)
      var needPay = Number(this.distributionFee_obj.exFee) + Number(this.transportFee) + Number(this.ycFee)
      if (
        Number(this.distributionFee_obj.payCash) >
        needPayByRate
      ) {
        this.distributionFee_Status = false
      } else {
        this.distributionFee_Status = true
        if (this.distributionFee_shui == '0') {
          this.distributionFee_obj.transOilFee =
            needPay -
            Number(this.distributionFee_obj.payCash)
        } else if (this.distributionFee_shui == '1') {
          this.distributionFee_obj.transOilFee =
            needPayByRate -
            Number(this.distributionFee_obj.payCash)
        }
        this.distributionFee_obj.cash =
          Number(this.distributionFee_obj.payCash) -
          Number(this.distributionFee_obj.oilPledge) -
          Number(this.distributionFee_obj.etcFee) -
          Number(this.distributionFee_obj.oidCardFee)
      }
      // 修改对应的应付现金值
      if (
        Number(this.distributionFee_obj.cash) <
        this.distributionFee_obj.oilPledge
      ) {
        this.distributionFee_Status1 = false
      } else {
        this.distributionFee_Status1 = true
      }

      // 修改对应的etcFee
      if (
        Number(this.distributionFee_obj.cash) <
        this.distributionFee_obj.etcFee
      ) {
        this.distributionFee_Status2 = false
      } else {
        this.distributionFee_Status2 = true
      }

      // 修改对应的oidCardFee
      if (
        Number(this.distributionFee_obj.cash) <
        this.distributionFee_obj.oidCardFee
      ) {
        this.distributionFee_Status2 = false
      } else {
        this.distributionFee_Status2 = true
      }


    },
    distributionFee1 () {
      if (this.listQuery.orderType == '1') {
        this.multipleSelection = this.$refs.commonOrderTable.multipleSelection
      }
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要操作的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        this.distributionFee_obj = this.multipleSelection[0]
        this.rate = this.distributionFee_obj.moneyRate


        if (this.distributionFee_obj.isYFInvoice == '0') {
          this.distributionFee_shui1 = '0'
          this.distributionFee_shui2 = '0'
          this.transportFee = Number(this.distributionFee_obj.transportFee)
          this.ycFee = Number(this.distributionFee_obj.ycFee)

        } else if (this.distributionFee_obj.isYFInvoice == '1') {
          this.distributionFee_shui1 = '1' // 运输费
          this.distributionFee_shui2 = '0' //押车费
          this.transportFee = Number(this.distributionFee_obj.transportFee) - Number(this.distributionFee_obj.moneyRate) * Number(this.distributionFee_obj.transportFee) / 100
        } else if (this.distributionFee_obj.isYFInvoice == '2') {
          this.distributionFee_shui1 = '0'
          this.distributionFee_shui2 = '1'
          this.ycFee = Number(this.distributionFee_obj.ycFee) - Number(this.distributionFee_obj.moneyRate) * Number(this.distributionFee_obj.ycFee) / 100
        } else if (this.distributionFee_obj.isYFInvoice == '3') {
          this.distributionFee_shui1 = '1'
          this.distributionFee_shui2 = '1'
          this.ycFee = Number(this.distributionFee_obj.ycFee) - Number(this.distributionFee_obj.moneyRate) * Number(this.distributionFee_obj.ycFee) / 100
          this.transportFee = Number(this.distributionFee_obj.transportFee) - Number(this.distributionFee_obj.moneyRate) * Number(this.distributionFee_obj.transportFee) / 100
        }

        if (this.distributionFee_obj.settlement == '月结') {
          this.$notify({
            title: '提示',
            message: '抱歉，月结订单不支持当前操作',
            type: 'warning',
            duration: 2000
          })
        } else if (this.multipleSelection[0].needPayStatus == '5') {
          this.$notify({
            title: '提示',
            message: '抱歉，已结算订单不支持当前操作',
            type: 'warning',
            duration: 2000
          })
        } else if (this.multipleSelection[0].ifAddToYfbill == '1') {
          this.$notify({
            title: '提示',
            message: '该订单已生成对账单，请到对账单列表中执行对应的操作.',
            type: 'warning',
            duration: 2000
          })
        } else {
          this.dialogFormVisible1 = true

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
    distributionFee (obj) {
      this.dialogFormVisible1 = true
      this.distributionFee_obj = obj
    },
    getList () {
      this.listLoading = true

      fetchList(this.listQuery).then(response => {
        this.list = response.data.records

        this.total = response.data.total
        this.listLoading = false
        // this.orderFeeSum = 0
        // this.list.forEach(item => {
        //   this.orderFeeSum = Number(item.needPay) + this.orderFeeSum
        // })
        // let fixNum = new Number(this.orderFeeSum + 1).toFixed(2)
        // this.orderFeeSum = new Number(fixNum - 1).toFixed(2)
        // this.$emit('orderFeeSumUpdate', this.orderFeeSum)
      })
      totalObj(this.listQuery).then(res => {
        this.orderFeeSum = res.data
      })
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
      if (this.multipleSelection.length != 0) {
        this.driverName = this.multipleSelection[0].driverName
      }
    },
    handleFilter () {
      this.listQuery.page = 1
      if (this.listQuery.orderType == '1') {
        console.log(this.listQuery)

        this.$refs.commonOrderTable.listQuery = this.listQuery
        this.$refs.commonOrderTable.getList()
      } else if (this.listQuery.orderType == '0') {
        this.getList()
      }
    },
    handleUpdate () {
      this.currentStatus = 'update'
      this.handleDetail1()
    },
    handleDelete () {
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
          str += this.multipleSelection[i].loanId + ','
        }
        str = str.substring(0, str.length - 1)
        delObj(str).then(response => {
          this.dialogFormVisible = false
          // this.getList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      }
    },

    handleDept () {
      fetchDeptSelect().then(response => {
        this.plateNumberOptions = response.data
      })
    },
    handleDeptValue (plateNumber) {
      this.form.truckId = plateNumber
    },
    handleRepaymentWay (obj) {
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
    handleApplyMan (obj) {
      var arr = this.DriverPlateNumberSelect
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].driverId == obj) {
          this.form.plateNumber = arr[i].plateNumber
        }
      }
    },

    cancel () {
      this.dialogFormVisible0 = false
      this.objYFDZD = {}
    },
    cancel2 () {
      this.dialogFormVisible2 = false
    },
    cancelETC () {
      this.etcFeeDialog = false

    },
    openEtcdialog () {
      if (this.listQuery.orderType == '1') {
        this.multipleSelection = this.$refs.commonOrderTable.multipleSelection
      }

      if (this.multipleSelection[0].ifAddToYfbill == '1') {
        this.$notify({
          title: '提示',
          message: '抱歉，已加入对账单',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.etcFeeDialog = true
      }
    },
    update (formName) {
      this.form.applyMan = this.form_applyMan
      this.form.repaymentWay = this.form_repaymentWay

      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          this.form.password = undefined
          putObj(this.form).then(res => {
            this.dialogFormVisible = false
            // this.getList()
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
    },
    handleOrderFeeSumUpdate (val) {
      if (val) {
        this.orderFeeSum = val
      } else {
        this.orderFeeSum = 0
      }
    },
    handleRecharge (row) {
      if (row.needPayStatus != '4' && row.needPayStatus != '5') {
        this.$notify({
          title: '提示',
          message: '抱歉,只有司机确认后才能执行此操作。',
          type: 'warning',
          duration: 2000
        })
      } else {
        router.push({
          path: '/oilcard/rechargeExternal',
          query: { obj: row }
        })
      }

    },

    handlePrint () {
      this.dialogPrintFormVisible = true
      this.$print(this.$refs.print)
    }
  }
}
</script>
<style>
.jsTxt {
  width: 100%;
  text-align: center;
  height: 90px;
  line-height: 90px;
}

.expensesPayFlex {
  display: flex;
  justify-items: center;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
}

.jsTxt {
  width: 100%;
  text-align: center;
  height: 90px;
  line-height: 90px;
}

.OddNumbers .el-form-item__content {
  width: 200px;
}

.OddNumbers .el-input {
  width: auto;
}

@media print {
  .pay-print {
    width: 100%;
  }
}

@page {
  size: landscape;
}

.pay-print .el-row {
  border: 1px solid #333333;
  border-bottom: 0;
}

.pay-print .el-row:last-child {
  border-bottom: 1px solid #333333;
}

.pay-print .pay-print-header {
  text-align: center;
}

.pay-print .el-col {
  padding: 8px 12px;
  vertical-align: middle;
}

.pay-print .el-col:nth-child(2n + 1) {
  border-right: 1px solid #333333;
}

.pay-print .pay-print-time {
  text-align: right;
}
</style>


