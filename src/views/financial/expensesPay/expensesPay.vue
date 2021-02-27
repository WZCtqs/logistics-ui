<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px"
               class="filter-item">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单类型 "
                          class="filter-item">
              <el-select class="filter-item"
                         filterable
                         placeholder="请选择"
                         v-model="listQuery.orderType"
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in orderTypeReq"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6"
                  v-if="listQuery.orderType === '0' | listQuery.orderType === '1'">
            <el-form-item label="客户名称:"
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
          <el-col :span="6">
            <el-form-item label="结算方式:"
                          class="filter-item">
              <el-select class="filter-item"
                         filterable
                         placeholder="请选择"
                         v-model="listQuery.settlement"
                         clearable
                         @keyup.enter.native="handleFilter"
                         @change="handleFilter">
                <el-option v-for="item in settlementReq"
                           :key="item.id"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"
                  :offset="1"
                  v-if="!searchIcon">
            <el-tooltip class="item"
                        effect="dark"
                        content="更多搜索条件"
                        placement="bottom">
              <el-button icon="el-icon-caret-bottom"
                         size="small"
                         circle
                         @click="searchIcon =true"></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-col :span="6"
                v-if="searchIcon === true && listQuery.orderType === '0'">
          <el-form-item label="去/回程 "
                        class="filter-item"
                        v-if="listQuery.orderType === '0'">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.type"
                       @change="handleFilter"
                       clearable="clearable">
              <el-option v-for="item in OrderType"
                         :key="item.id"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6"
                v-if="searchIcon === true">
          <el-form-item label="舱位号 "
                        class="filter-item"
                        v-if="listQuery.orderType === '0'">
            <el-input @keyup.enter.native="handleFilter"
                      class="filter-item"
                      placeholder="舱位号"
                      v-model="listQuery.classOrder"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6"
                v-if="searchIcon === true">
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

        <el-col :span="6"
                v-if="searchIcon === true">
          <el-form-item label="车牌号 "
                        class="filter-item"
                        v-if="listQuery.orderType === '0' || listQuery.orderType === '1'">
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
        <el-col :span="6"
                v-if="searchIcon === true">
          <el-form-item label="车辆类型 "
                        class="filter-item"
                        v-if="listQuery.orderType === '0'  || listQuery.orderType === '1'">
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
        <el-col :span="6"
                v-if="searchIcon === true">
          <el-form-item label="铅封号 "
                        class="filter-item"
                        v-if="listQuery.orderType === '0'">
            <el-input @keyup.enter.native="handleFilter"
                      class="filter-item"
                      clearable
                      placeholder="铅封号"
                      v-model="listQuery.sealNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9"
                v-if="searchIcon === true">
          <el-form-item label="订单日期"
                        v-if="listQuery.orderType === '0'">
            <el-col :span="12">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.ordStartTime"
                              style="width: 100%;"
                              value-format="yyyy-MM-dd"
                              @change="handleFilter"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.ordEndTime"
                              style="width: 100%;"
                              value-format="yyyy-MM-dd"
                              @change="handleFilter"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="订单日期"
                        v-if="listQuery.orderType === '1' | listQuery.orderType === '2'">
            <el-col :span="12">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.startTime"
                              style="width: 100%;"
                              value-format="yyyy-MM-dd"
                              @change="handleFilter"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.endTime"
                              style="width: 100%;"
                              value-format="yyyy-MM-dd"
                              @change="handleFilter"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="9"
                v-if="searchIcon === true && listQuery.orderType === '0'">
          <el-form-item label="班列日期"
                        v-if="listQuery.orderType === '0'">
            <el-col :span="12">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.blStartTime"
                              style="width: 100%;"
                              value-format="yyyy-MM-dd"
                              @change="handleFilter"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="listQuery.blEndTime"
                              style="width: 100%;"
                              value-format="yyyy-MM-dd"
                              @change="handleFilter"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="2"
                :offset="1"
                v-if="searchIcon">
          <el-tooltip class="item"
                      effect="dark"
                      content="收起"
                      placement="bottom">
            <el-button icon="el-icon-caret-top"
                       size="small"
                       circle
                       @click="searchIcon = false"></el-button>
          </el-tooltip>
        </el-col>
      </el-form>
      <div class="expensesPayFlex">
        <div>
          <el-button class="filter-item"
                     type="primary"
                     size="mini"
                     v-waves
                     icon="search"
                     @click="handleFilter">搜索
          </el-button>
          <el-button class="filter-item"
                     type="primary"
                     size="mini"
                     v-waves
                     @click="handleExp"
                     v-if="expense_exp">导出
          </el-button>
          <el-button class="filter-item"
                     type="primary"
                     size="mini"
                     @click="handleCreateBill"
                     v-if="expense_create_bill">
            生成对账单
          </el-button>
          <el-button class="filter-item"
                     type="primary"
                     size="mini"
                     @click="handleOperationForm"
                     v-if="expense_order">调账
          </el-button>
          <el-button class="filter-item"
                     type="primary"
                     size="mini"
                     @click="handleOpenLoookForm">查看
          </el-button>
        </div>
        <div>
          <el-tag>订单费用合计:{{orderFeeSum}}</el-tag>
        </div>
      </div>
    </div>
    <el-table :key='tableKey'
              :data="list"
              v-loading="listLoading"
              element-loading-text="给我一点时间"
              border
              fit
              highlight-current-row
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"
                       fixed>
      </el-table-column>
      <el-table-column type="expand"
                       fixed>
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-row>
              <el-col :span="8"
                      v-if="listQuery.orderType === '0'">
                <el-form-item label="箱号:">
                  <span>{{ props.row.containerNo }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '0' | orderTypeTemp === '1' | orderTypeTemp === '2'">
                <el-form-item label="订单类型:">
                  <span>{{ props.row.orderType }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '0'">
                <el-form-item label="订单日期:">
                  <span v-if="props.row.orderDate !== null">{{ props.row.orderDate| moment('YYYY-MM-DD')}}</span>
                  <span v-else></span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '1'">
                <el-form-item label="订单日期:">
                  <span v-if="props.row.classDate !== null">{{ props.row.classDate| moment('YYYY-MM-DD')}}</span>
                  <span v-else></span>
                </el-form-item>
              </el-col>
              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '0'">-->
              <!--<el-form-item label="发货人及联系方式:">-->
              <!--<span>{{ props.row.consignor }}-{{ props.row.consignorPhone }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '1'">-->
              <!--<el-form-item label="发货人及联系方式:">-->
              <!--<span>{{ props.row.shipper }}-{{ props.row.shipperPhone }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->

              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '0'">-->
              <!--<el-form-item label="提货地址:">-->
              <!--<span>{{ props.row.pickupGoodsDetailplace }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '1'">-->
              <!--<el-form-item label="提货地址:">-->
              <!--<span>{{ props.row.shipperPlace }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '0'">-->
              <!--<el-form-item label="提货日期:">-->
              <!--<span-->
              <!--v-if="props.row.pickupGoodsDate !== null">{{ props.row.pickupGoodsDate| moment('YYYY-MM-DD') }}</span>-->
              <!--<span v-else></span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '0'">-->
              <!--<el-form-item label="送货地址:">-->
              <!--<span>{{ props.row.sendGoodsDetailplace }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '1'">-->
              <!--<el-form-item label="送货地址:">-->
              <!--<span>{{ props.row.pickerPlace }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '0'">-->
              <!--<el-form-item label="送货日期:">-->
              <!--<span>{{ props.row.sendGoodsDate }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
            </el-row>
            <el-row>
              <el-col :span="8"
                      v-if="orderTypeTemp === '0'">
                <el-form-item label="车牌号:">
                  <span>{{ props.row.plateNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '0'">
                <el-form-item label="车辆类型:">
                  <span>{{ props.row.truckAttribute }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '0'">
                <el-form-item label="铅封号:">
                  <span>{{ props.row.sealNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '0'">
                <el-form-item label="公里数:">
                  <span>{{ props.row.kilometre }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '1'">
                <el-form-item label="公里数:">
                  <span>{{ props.row.chargedMileage }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '0' | orderTypeTemp === '1'">
                <el-form-item label="单价:">
                  <span>{{ props.row.recPrice }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="运费:"
                              v-if="orderTypeTemp === '0' | orderTypeTemp === '1'">
                  <span>{{ props.row.receivables }}</span>
                </el-form-item>
              </el-col>
              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '0'">-->
              <!--<el-form-item label="压车费:">-->
              <!--<span>{{ props.row.parkingFee }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '0'">-->
              <!--<el-form-item label="提箱费:">-->
              <!--<span>{{ props.row.pickcnFee }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="8"
                      v-if="orderTypeTemp === '0' | orderTypeTemp === '1'">
                <el-form-item label="异常费用:">
                  <span>{{ props.row.exceptionFee }}</span>
                </el-form-item>
              </el-col>
              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '0'">-->
              <!--<el-form-item label="收货人及联系方式:">-->
              <!--<span>{{ props.row.consignee }} - {{ props.row.consigneePhone }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8"-->
              <!--v-if="orderTypeTemp === '1'">-->
              <!--<el-form-item label="收货人及联系方式:">-->
              <!--<span>{{ props.row.picker }} - {{ props.row.pickerPhone }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="8">-->
              <!--<el-form-item label="利率:">-->
              <!--<span>{{ props.row.rate }}</span>-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="8"
                      v-if=" orderTypeTemp === '1'">
                <el-form-item label="提货费用:">
                  <span>{{ props.row.pickFee }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '1'">
                <el-form-item label="装货费用:">
                  <span>{{ props.row.packFee }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '1'">
                <el-form-item label="卸货费用:">
                  <span>{{ props.row.releaseFee }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '1'">
                <el-form-item label="保险费用:">
                  <span>{{ props.row.insuranceFee }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '0'">
                <el-form-item label="提/还箱地:">
                  <span>{{ props.row.pickupConPlace }}-{{ props.row.returnConPlace }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8"
                      v-if="orderTypeTemp === '0' | orderTypeTemp === '1' | orderTypeTemp === '2'">
                <el-form-item label="总计费用(含发票):">
                  <span>{{ props.row.totalFee }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24"
                      v-if="orderTypeTemp === '0' | orderTypeTemp === '1' | orderTypeTemp === '2'">
                <el-form-item label="备注:">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="客户id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.customerId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="是否加入对账单"
                       key="1"
                       fixed>
        <template slot-scope="scope">
          <span v-if="scope.row.isAddToBill === '0'">未加入</span>
          <span v-if="scope.row.isAddToBill === '1'">已加入</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="客户名称"
                       v-if="orderTypeTemp === '0'"
                       key="1"
                       fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="客户名称"
                       v-if="orderTypeTemp === '1'"
                       key="1"
                       fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="客户名称"
                       v-if="orderTypeTemp === '2'"
                       key="1"
                       fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.customer }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="舱位号"
                       v-if="orderTypeTemp === '0'"
                       key="2"
                       fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.classOrder }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="箱号"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="3"-->
      <!--fixed>-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.containerNo }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="订单编号"
                       v-if="orderTypeTemp === '0'| orderTypeTemp === '1' | orderTypeTemp === '2'"
                       key="4"
                       fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="订单类型"-->
      <!--v-if="orderTypeTemp === '0' | orderTypeTemp === '1' | orderTypeTemp === '2'"-->
      <!--key="5"-->
      <!--fixed>-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.orderType }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="去/回程"
                       v-if="orderTypeTemp === '0'"
                       key="6"
                       fixed>
        <template slot-scope="scope">
          <span v-if="scope.row.type === '0'">去程</span>
          <span v-if="scope.row.type === '1'">回程</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="班列日期"
                       v-if="orderTypeTemp === '0'"
                       key="7">
        <template slot-scope="scope">
          <span v-if="scope.row.classDate !== null">{{ scope.row.classDate| moment('YYYY-MM-DD')}}</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="订单日期"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="8">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.orderDate !== null">{{ scope.row.orderDate| moment('YYYY-MM-DD')}}</span>-->
      <!--<span v-else></span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="订单日期"-->
      <!--v-if="orderTypeTemp === '1'"-->
      <!--key="8">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.classDate !== null">{{ scope.row.classDate| moment('YYYY-MM-DD')}}</span>-->
      <!--<span v-else></span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="发货人及联系方式"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="9"-->
      <!--width="140">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.consignor }}-{{ scope.row.consignorPhone }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="发货人及联系方式"-->
      <!--v-if="orderTypeTemp === '1'"-->
      <!--key="9"-->
      <!--width="140">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.shipper }}-{{ scope.row.shipperPhone }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="提/还箱地"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="10"-->
      <!--width="170">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.pickupConPlace }}-{{ scope.row.returnConPlace }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="提货地址"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="11">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.pickupGoodsDetailplace }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="提货地址"-->
      <!--v-if="orderTypeTemp === '1'"-->
      <!--key="11">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.shipperPlace }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="提货日期"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="12">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.pickupGoodsDate !== null">{{ scope.row.pickupGoodsDate| moment('YYYY-MM-DD') }}</span>-->
      <!--<span v-else></span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="收货人及联系方式"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="13"-->
      <!--width="140">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.consignee }} - {{ scope.row.consigneePhone }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="收货人及联系方式"-->
      <!--v-if="orderTypeTemp === '1'"-->
      <!--key="13"-->
      <!--width="140">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.picker }} - {{ scope.row.pickerPhone }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="送货地址"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="14">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.sendGoodsDetailplace }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="送货地址"-->
      <!--v-if="orderTypeTemp === '1'"-->
      <!--key="14">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.pickerPlace }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="送货日期"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="15">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.sendGoodsDate !== null">{{ scope.row.sendGoodsDate | moment('YYYY-MM-DD') }}</span>-->
      <!--<span v-else></span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="结算方式"
                       v-if="orderTypeTemp === '0' | orderTypeTemp === '1'"
                       key="16">
        <template slot-scope="scope">
          <span v-if="scope.row.settlement === '0'">单结</span>
          <span v-if="scope.row.settlement === '1'">月结</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="订单日期"
                       v-if="orderTypeTemp === '2'"
                       key="17">
        <template slot-scope="scope">
          <span v-if="scope.row.orderDate !== null">{{ scope.row.orderDate | moment('YYYY-MM-DD') }}</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="托运客户"
                       v-if="orderTypeTemp === '2'"
                       key="18">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="品名"
                       v-if="orderTypeTemp === '2'"
                       key="19">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="空重箱"
                       v-if="orderTypeTemp === '2'"
                       key="20">
        <template slot-scope="scope">
          <span>{{ scope.row.isHeavy }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="业务种类"
                       v-if="orderTypeTemp === '2'"
                       key="21">
        <template slot-scope="scope">
          <span>{{ scope.row.shortType }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="路线"
                       v-if="orderTypeTemp === '2'"
                       key="22">
        <template slot-scope="scope">
          <span>{{ scope.row.transLine }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车牌号"
                       v-if="orderTypeTemp === '2'"
                       key="23">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="短驳次数"
                       v-if="orderTypeTemp === '2'"
                       key="24">
        <template slot-scope="scope">
          <span>{{ scope.row.shortTransSum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="短驳费"
                       v-if="orderTypeTemp === '2'"
                       key="25">
        <template slot-scope="scope">
          <span>{{ scope.row.recPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="超时费"
                       v-if="orderTypeTemp === '2'"
                       key="26">
        <template slot-scope="scope">
          <span>{{ scope.row.recOutTimeFee }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="压车费"-->
      <!--v-if="orderTypeTemp === '2'"-->
      <!--key="27">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.recParkingFee }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="其他费用"
                       v-if="orderTypeTemp === '2'"
                       key="28">
        <template slot-scope="scope">
          <span>{{ scope.row.recOtherFee }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="公里数"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="29">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.kilometre }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="公里数"-->
      <!--v-if="orderTypeTemp === '1'"-->
      <!--key="30">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.chargedMileage }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="单价"-->
      <!--v-if="orderTypeTemp === '0' | orderTypeTemp === '1'"-->
      <!--key="31">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.recPrice }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="运费"-->
      <!--v-if="orderTypeTemp === '0' | orderTypeTemp === '1'"-->
      <!--key="32">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.receivables }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="压车费"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="33">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.parkingFee }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="提箱费"-->
      <!--v-if="orderTypeTemp === '0'"-->
      <!--key="34">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.pickcnFee }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="提货费用"-->
      <!--v-if="orderTypeTemp === '1'"-->
      <!--key="35">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.pickFee }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="装货费用"-->
      <!--v-if="orderTypeTemp === '1'"-->
      <!--key="36">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.packFee }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="卸货费用"-->
      <!--v-if="orderTypeTemp === '1'"-->
      <!--key="37">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.releaseFee }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="保险费用"-->
      <!--v-if="orderTypeTemp === '1'"-->
      <!--key="38">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.insuranceFee }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="异常费用"-->
      <!--v-if="orderTypeTemp === '0' | orderTypeTemp === '1'"-->
      <!--key="39">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.exceptionFee }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="订单费用"
                       v-if="orderTypeTemp === '0' | orderTypeTemp === '1' | orderTypeTemp === '2'"
                       key="40"
                       prop="orderFee">
        <template slot-scope="scope">
          <span>{{ scope.row.orderFee }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
      <!--label="利率"-->
      <!--v-if="orderTypeTemp === '0' | orderTypeTemp === '1' | orderTypeTemp === '2'"-->
      <!--key="41">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.rate }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="总计费用(含发票)"-->
      <!--width="140"-->
      <!--v-if="orderTypeTemp === '0' | orderTypeTemp === '1' | orderTypeTemp === '2'"-->
      <!--key="42">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.totalFee }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center"-->
      <!--label="备注"-->
      <!--v-if="orderTypeTemp === '0' | orderTypeTemp === '1' | orderTypeTemp === '2'"-->
      <!--key="43">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.remark }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="状态"
                       v-if="orderTypeTemp === '0' | orderTypeTemp === '1'"
                       key="44">
        <template slot-scope="scope">
          <span v-if="scope.row.balanceStatus === '0'">未结算</span>
          <span v-if="scope.row.balanceStatus === '1'">提交</span>
          <span v-if="scope.row.balanceStatus === '2'">结算(开票)</span>
          <span v-if="scope.row.balanceStatus === '3'">结算(未开票)</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       v-if="orderTypeTemp === '0'"
                       key="45"
                       width="200">
        <template slot-scope="scope">
          <el-button v-if="(scope.row.balanceStatus === '0') && (scope.row.settlement === '0') && expenses_kp"
                     @click="handleSettlementInvoice(scope.row)"
                     size="mini"
                     class="settleBtn">结算(开票)
          </el-button>
          <el-button v-if="(scope.row.balanceStatus === '0') && (scope.row.settlement === '0') && expenses_kp"
                     @click="handleSettlementNoInvoice(scope.row)"
                     size="mini"
                     class="settleBtn">结算(未开票)
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="操作"
                       v-if="orderTypeTemp === '1'"
                       key="46"
                       width="200">
        <template slot-scope="scope">
          <el-button v-show="(scope.row.balanceStatus === '0') && (scope.row.settlement === '0')"
                     @click="handleSettlementInvoice(scope.row)"
                     size="mini"
                     class="settleBtn">结算(开票)
          </el-button>
          <el-button v-show="(scope.row.balanceStatus === '0') && (scope.row.settlement === '0')"
                     @click="handleSettlementNoInvoice(scope.row)"
                     size="mini"
                     class="settleBtn">结算(未开票)
          </el-button>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="操作" v-if="orderTypeTemp === '2'" key="43">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button v-if="scope.row.balanceStatus === '0'" @click="handleSettlementInvoice(scope.row)">结算(开票)-->
      <!--</el-button>-->
      <!--<el-button v-if="scope.row.balanceStatus === '0'" @click="handleSettlementNoInvoice(scope.row)">结算(未开票)-->
      <!--</el-button>-->
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
    <el-dialog title="生成对账单"
               :visible.sync="dialogVisible"
               width="30%"
               center>
      <div width="80%">
        <div>客户名称:{{createBillCustomerName}}</div>
        <div>订单类型:{{createBillorderType}}</div>
        <div>订单数量:{{createBillOrderNumber}}</div>
        <div>日期范围:{{createBillObj.startTime}}--{{createBillObj.endTime}}</div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleCreateBillPost()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               center>
      <el-row>
        <el-col :span="6">订单编号：{{receivableObj.orderId}}</el-col>
        <el-col :span="6">订单日期：{{receivableObj.classDate | moment('YYYY-MM-DD') }}</el-col>
        <el-col :span="6">客户名称：{{receivableObj.customerName}}</el-col>
        <el-col :span="6"
                v-if="receivableObj.orderType === '集装箱'">订单类型：集装箱
        </el-col>
        <el-col :span="6"
                v-if="receivableObj.orderType === '普货'">订单类型：普货
        </el-col>
        <el-col :span="12"
                v-if="receivableObj.orderType === '集装箱'">
          发货人及联系方式：{{receivableObj.consignor}}-{{receivableObj.consignorPhone}}
        </el-col>
        <el-col :span="12"
                v-if="receivableObj.orderType === '集装箱'">收货人及联系方式：{{receivableObj.consignee}} -
          {{receivableObj.consigneePhone}}
        </el-col>
        <el-col :span="12"
                v-if="receivableObj.orderType === '集装箱'">提货地址：{{receivableObj.pickupGoodsDetailplace}}
        </el-col>
        <el-col :span="12"
                v-if="receivableObj.orderType === '集装箱'">送货地址：{{receivableObj.sendGoodsDetailplace}}
        </el-col>
        <el-col :span="12"
                v-if="receivableObj.orderType === '集装箱'">提货日期：{{receivableObj.pickupGoodsDate |
          | moment('YYYY-MM-DD')}}
        </el-col>
        <el-col :span="12"
                v-if="receivableObj.orderType === '集装箱'">送货日期：{{receivableObj.sendGoodsDate |
          | moment('YYYY-MM-DD')}}
        </el-col>
        <el-col :span="12"
                v-if="receivableObj.orderType === '普货'">
          发货人及联系方式：{{receivableObj.shipper}}-{{receivableObj.shipperPhone}}
        </el-col>
        <el-col :span="12"
                v-if="receivableObj.orderType === '普货'">收货人及联系方式：{{receivableObj.picker}} -
          {{receivableObj.pickerPhone}}
        </el-col>
        <el-col :span="12"
                v-if="receivableObj.orderType === '普货'">提货地址：{{receivableObj.shipperPlace}}
        </el-col>
        <el-col :span="12"
                v-if="receivableObj.orderType === '普货'">送货地址：{{receivableObj.pickerPlace}}
        </el-col>

      </el-row>
      <h3 class="formTitle">应收费用信息</h3>
      <div slot="footer"
           class="dialog-footer">
        <el-button v-if="dialogStatus == 'update'"
                   @click="submit">提交
        </el-button>
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
      <el-form ref="form"
               :model="receivableFormObj"
               label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="公里数"
                          v-if="listQuery.orderType === '0'">
              <el-input v-model.number="receivableFormObj.kilometre"
                        :disabled="LookStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公里数"
                          v-if="listQuery.orderType === '1'">
              <el-input v-model.number="receivableFormObj.chargedMileage"
                        :disabled="LookStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单价">
              <el-input v-model="receivableFormObj.recPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运费">
              <el-input v-model="receivableFormObj.receivables"
                        disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8"-->
          <!--v-if="listQuery.orderType === '0'">-->
          <!--<el-form-item label="压车费">-->
          <!--<el-input v-model="receivableFormObj.recParkingFee"-->
          <!--:disabled="LookStatus"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8"-->
          <!--v-if="listQuery.orderType === '0'">-->
          <!--<el-form-item label="提箱费">-->
          <!--<el-input v-model="receivableFormObj.pickcnFee"-->
          <!--:disabled="LookStatus"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="8"
                  v-if="listQuery.orderType === '1'">
            <el-form-item label="提货费">
              <el-input v-model="receivableFormObj.pickFee"
                        :disabled="LookStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"
                  v-if="listQuery.orderType === '1'">
            <el-form-item label="装货费">
              <el-input v-model="receivableFormObj.packFee"
                        :disabled="LookStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"
                  v-if="listQuery.orderType === '1'">
            <el-form-item label="卸货费">
              <el-input v-model="receivableFormObj.releaseFee"
                        :disabled="LookStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  addExpensesPayAbleObj,
  CommonGoodsOrderFeeObj,
  expObj,
  fetchList,
  getCustomerObj,
  getOrderTypeObj,
  getPayWayeObj,
  orderBalanceObj,
  totalObj,
  updateOrderFeeObj
} from '@/api/expensesPay'
import { truck_attribute } from '@/api/sendedOrder'
import { orderType } from '@/api/orderManager'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { getAllTruckObj } from '@/api/ordCommonGoods'
import { mapGetters } from 'vuex'

export default {
  name: 'table_tru_truck_fee',
  directives: {
    waves
  },
  data () {
    return {
      list: null,
      total: null,
      listLoading: true,
      expense_create_bill: false,
      expense_order: false,
      expense_exp: false,
      expenses_kp: false,
      OrderType: [],
      listQuery: {
        page: 1,
        limit: 20,
        settlement: null,
        orderType: '0',
        customerId: null,
        endTime: null,
        startTime: null,
        type: null

      },
      rules: {},
      multipleSelection: '',
      tableKey: 0,
      settlementReq: [],
      orderTypeReq: [],
      orderTypeTemp: '0',
      customerReq: [],
      dialogVisible: false,
      createBillObj: {
        customerId: null,
        endTime: null,
        startTime: null,
        orderType: null,
        orderIds: []
      },
      createBillOrderNumber: '',
      createBillCustomerName: '',
      createBillorderType: '',
      textMap: {
        update: '修改应收费用',
        create: '查看应收费用'
      },
      form: {},
      dialogFormVisible: false,
      dialogStatus: '',
      LookStatus: false,
      receivableObj: {
        orderId: '',
        classDate: '',
        customerName: '',
        orderType: '',
        consignor: '',
        consignorPhone: '',
        pickupGoodsDetailplace: '',
        pickupGoodsDate: '',
        consignee: '',
        consigneePhone: '',
        sendGoodsDetailplace: '',
        sendGoodsDate: '',
        picker: '',
        pickerPhone: '',
        shipper: '',
        shipperPhone: '',
        shipperPlace: ''
      },
      receivableFormObj: {
        orderId: '',
        kilometre: '',
        chargedMileage: '',
        recPrice: '',
        receivables: '',
        // parkingFee: '',
        // pickcnFee: '',
        pickFee: '',
        packFee: '',
        releaseFee: ''
      },
      searchIcon: false,
      CarType: [],
      getAllTruckReq: [],
      orderFeeSum: 0
    }
  },
  watch: {
    'receivableFormObj.kilometre': function (val) {
      this.receivableFormObj.receivables = Number(val * this.receivableFormObj.recPrice).toFixed(0)
    },
    'receivableFormObj.chargedMileage': function (val) {
      this.receivableFormObj.receivables = Number(val * this.receivableFormObj.recPrice).toFixed(0)
    },
    'receivableFormObj.recPrice': function (val) {
      if (this.listQuery.orderType === '0') {
        this.receivableFormObj.receivables = Number(val * this.receivableFormObj.kilometre).toFixed(0)
      }
      if (this.listQuery.orderType === '1') {
        this.receivableFormObj.receivables = Number(val * this.receivableFormObj.chargedMileage).toFixed(0)
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
      let statusMap = {
        0: '有效',
        1: '无效'
      }
      return statusMap[status]
    }
  },
  created () {
    this.getList()
    this.handleGetOrderTypeObj()
    this.handleGetPayWayeObj()
    this.handleGetCustomerObj()
    this.handleAllTruckInfo()
    this.expense_create_bill = this.permissions['expense_create_bill']
    this.expense_order = this.permissions['expense_order']
    this.expense_exp = this.permissions['expense_exp']
    this.expenses_kp = this.permissions['expenses_kp']
    this.orderTypeList()
    this.truckList()
  },
  methods: {
    getList () {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.orderTypeTemp = this.listQuery.orderType
        this.total = response.data.total
        this.listLoading = false
        // this.orderFeeSum = 0
        // this.list.forEach(item => {
        //   this.orderFeeSum = item.orderFee + this.orderFeeSum
        // })
      })
      totalObj(this.listQuery).then(res => {
        this.orderFeeSum = res.data
      })
    },
    orderTypeList () {
      orderType().then(response => {
        this.OrderType = response.data
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
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    handleGetOrderTypeObj () {
      getOrderTypeObj().then(res => {
        this.orderTypeReq = res.data
      })
    },
    handleAllTruckInfo () {
      getAllTruckObj().then(res => {
        this.getAllTruckReq = res.data
      })
    },
    handleGetPayWayeObj () {
      getPayWayeObj().then(res => {
        this.settlementReq = res.data
      })
    },
    handleGetCustomerObj () {
      getCustomerObj().then(res => {
        this.customerReq = res.data
      })
    },
    handleCreateBill () {
      if ((this.listQuery.orderType === '0') | (this.listQuery.orderType === '1') && (this.listQuery.customerId === '' | this.listQuery.customerId === null)) {
        this.$notify({
          title: '警告',
          message: '请先根据客户名称、班列日期及结算方式进行筛选',
          type: 'warning',
          duration: 2000
        })
      } else if ((this.listQuery.orderType === '0') && this.listQuery.blStartTime === '' | this.listQuery.blStartTime === null) {
        this.$notify({
          title: '警告',
          message: '请先根据客户名称、班列日期及结算方式进行筛选',
          type: 'warning',
          duration: 2000
        })
      } else if ((this.listQuery.orderType === '1') && this.listQuery.startTime === '' | this.listQuery.startTime === null) {
        this.$notify({
          title: '警告',
          message: '请先根据客户名称、班列日期及结算方式进行筛选',
          type: 'warning',
          duration: 2000
        })
      } else if (this.listQuery.blEndTime === '' | this.listQuery.blEndTime === null) {
        this.$notify({
          title: '警告',
          message: '请先根据客户名称、班列日期及结算方式进行筛选',
          type: 'warning',
          duration: 2000
        })
      } else if ((this.listQuery.orderType === '0') | (this.listQuery.orderType === '1') && (this.listQuery.settlement === '' | this.listQuery.settlement === null)) {
        this.$notify({
          title: '警告',
          message: '请先根据客户名称、班列日期及结算方式进行筛选',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '警告',
          message: '请选择要对账的订单',
          type: 'warning',
          duration: 2000
        })
      } else if ((this.listQuery.orderType === '0') | (this.listQuery.orderType === '1') && (this.multipleSelection[0].balanceStatus !== '0')) {
        this.$notify({
          title: '警告',
          message: '订单已被结算,无法进行结账',
          type: 'warning',
          duration: 2000
        })
      } else if ((this.listQuery.orderType === '0') | (this.listQuery.orderType === '1') && (this.listQuery.settlement !== '1')) {
        this.$notify({
          title: '警告',
          message: '请选择月结方式进行对账',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.createBillObj.orderIds = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          // str += this.multipleSelection[i].id + ','
          this.createBillObj.orderIds.push(this.multipleSelection[i].orderId)
        }

        if (this.listQuery.orderType === '0') {
          this.createBillObj.endTime = this.listQuery.blEndTime
          this.createBillObj.startTime = this.listQuery.blStartTime
        } else if (this.listQuery.orderType === '1') {
          this.createBillObj.endTime = this.listQuery.endTime
          this.createBillObj.startTime = this.listQuery.startTime
        }
        this.createBillObj.orderType = this.listQuery.orderType
        this.createBillObj.customerId = this.listQuery.customerId
        this.createBillOrderNumber = this.multipleSelection.length
        if ((this.listQuery.orderType === '0') | (this.listQuery.orderType === '1')) {
          this.createBillCustomerName = this.multipleSelection[0].customerName
        } else if (this.listQuery.orderType === '2') {
          this.createBillCustomerName = this.multipleSelection[0].customer
        }
        if (this.listQuery.orderType === '0') {
          this.createBillorderType = '集装箱'
        } else if (this.listQuery.orderType === '1') {
          this.createBillorderType = '普货'
        } else if (this.listQuery.orderType === '2') {
          this.createBillorderType = '盘短'
        }
        this.dialogVisible = true
      }
    },
    handleCreateBillPost () {
      addExpensesPayAbleObj(this.createBillObj).then(res => {
        if (res.data) {
          this.$notify({
            title: '成功',
            message: '生成对账单成功',
            type: 'success',
            duration: 2000
          })
          this.dialogVisible = false
          this.getList()
        } else {
          this.$notify.error({
            title: '错误',
            message: '对账单生成失败，请重新生成'
          })
          this.dialogVisible = false
        }
      })
    },
    handleOpenLoookForm () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '警告',
          message: '请选择一条订单进行查看',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length > 1) {
        this.$notify({
          title: '警告',
          message: '只能选择一条订单进行查看',
          type: 'warning',
          duration: 2000
        })
      } else {
        if (this.listQuery.orderType === '0') {
          this.dialogStatus = 'create'
          this.resetJZXTemp()
          this.LookStatus = true
          this.dialogFormVisible = true
        } else if (this.listQuery.orderType === '1') {
          this.dialogStatus = 'create'
          this.resetPHTemp()
          this.LookStatus = true
          this.dialogFormVisible = true
        } else {
          this.$notify({
            title: '警告',
            message: '盘短调账模块正在开发中....',
            type: 'warning',
            duration: 2000
          })
        }
      }
    },
    handleOperationForm () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '警告',
          message: '请选择一条订单进行调账',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length > 1) {
        this.$notify({
          title: '警告',
          message: '只能选择一条订单进行调账',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection[0].balanceStatus !== '0') {
        this.$notify({
          title: '警告',
          message: '该订单已被结算',
          type: 'warning',
          duration: 2000
        })
      } else {
        if (this.listQuery.orderType === '0') {
          this.dialogStatus = 'update'
          this.resetJZXTemp()
          this.LookStatus = false
          this.dialogFormVisible = true
        } else if (this.listQuery.orderType === '1') {
          this.dialogStatus = 'update'
          this.resetPHTemp()
          this.LookStatus = false
          this.dialogFormVisible = true
        } else {
          this.$notify({
            title: '警告',
            message: '盘短调账模块正在开发中....',
            type: 'warning',
            duration: 2000
          })
        }
      }
    },
    submit () {
      if (this.listQuery.orderType === '0') {
        updateOrderFeeObj(this.receivableFormObj).then(res => {
          if (res.data) {
            this.$notify({
              title: '成功',
              message: '集装箱调账成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            this.getList()
          } else {
            this.$message.error('集装箱调账失败')
            this.dialogFormVisible = false
          }
        })
      } else if (this.listQuery.orderType === '1') {
        CommonGoodsOrderFeeObj(this.receivableFormObj).then(res => {
          if (res.data) {
            this.$notify({
              title: '成功',
              message: '普货调账成功',
              type: 'success',
              duration: 2000
            })
            this.dialogFormVisible = false
            this.getList()
          } else {
            this.$message.error('普货调账失败')
            this.dialogFormVisible = false
          }
        })
      }
    },
    resetJZXTemp () {
      this.receivableObj.orderId = this.multipleSelection[0].orderId
      this.receivableObj.classDate = this.multipleSelection[0].classDate
      this.receivableObj.customerName = this.multipleSelection[0].customerName
      this.receivableObj.orderType = this.multipleSelection[0].orderType
      this.receivableObj.consignor = this.multipleSelection[0].consignor
      this.receivableObj.consignorPhone = this.multipleSelection[0].consignorPhone
      this.receivableObj.pickupGoodsDetailplace = this.multipleSelection[0].pickupGoodsDetailplace
      this.receivableObj.consignee = this.multipleSelection[0].consignee
      this.receivableObj.consigneePhone = this.multipleSelection[0].consigneePhone
      this.receivableObj.sendGoodsDetailplace = this.multipleSelection[0].sendGoodsDetailplace
      this.receivableObj.sendGoodsDate = this.multipleSelection[0].sendGoodsDate
      this.receivableFormObj.orderId = this.multipleSelection[0].orderId
      this.receivableFormObj.kilometre = this.multipleSelection[0].kilometre
      if (this.multipleSelection[0].recPrice) {
        this.receivableFormObj.recPrice = this.multipleSelection[0].recPrice
      } else {
        this.receivableFormObj.recPrice = 1
      }
      this.receivableFormObj.receivables = this.multipleSelection[0].receivables
      // this.receivableFormObj.parkingFee = this.multipleSelection[0].parkingFee
      // this.receivableFormObj.pickcnFee = this.multipleSelection[0].pickcnFee
    },
    resetPHTemp () {
      this.receivableObj.orderId = this.multipleSelection[0].orderId
      this.receivableObj.classDate = this.multipleSelection[0].classDate
      this.receivableObj.customerName = this.multipleSelection[0].customerName
      this.receivableObj.orderType = this.multipleSelection[0].orderType
      this.receivableObj.shipper = this.multipleSelection[0].shipper
      this.receivableObj.shipperPhone = this.multipleSelection[0].shipperPhone
      this.receivableObj.shipperPlace = this.multipleSelection[0].shipperPlace
      this.receivableObj.picker = this.multipleSelection[0].picker
      this.receivableObj.pickerPhone = this.multipleSelection[0].pickerPhone
      this.receivableObj.pickerPlace = this.multipleSelection[0].pickerPlace
      this.receivableFormObj.orderId = this.multipleSelection[0].orderId
      this.receivableFormObj.chargedMileage = this.multipleSelection[0].chargedMileage
      this.receivableFormObj.recPrice = this.multipleSelection[0].recPrice
      this.receivableFormObj.receivables = this.multipleSelection[0].receivables
      // this.receivableFormObj.parkingFee = this.multipleSelection[0].parkingFee
      this.receivableFormObj.pickFee = this.multipleSelection[0].pickFee
      this.receivableFormObj.packFee = this.multipleSelection[0].packFee
      this.receivableFormObj.releaseFee = this.multipleSelection[0].releaseFee
    },
    handleSettlementInvoice (row) {
      let obj = {
        orderId: row.orderId,
        balanceStatus: 2
      }
      orderBalanceObj(obj).then(res => {
        if (res.data) {
          this.getList()
          this.$notify({
            title: '提示',
            message: '结算成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleSettlementNoInvoice (row) {
      let obj = {
        orderId: row.orderId,
        balanceStatus: 3
      }
      orderBalanceObj(obj).then(res => {
        if (res.data) {
          this.getList()
          this.$notify({
            title: '提示',
            message: '结算成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleExp () {
      if (this.listQuery.orderType !== '2') {
        let str = ''
        if (this.multipleSelection.length !== 0) {
          // this.$message.error('请选择要导出的订单信息')
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].orderId + ','
          }
          str = str.substring(0, str.length - 1)
        }
        expObj(str, this.listQuery).then(response => {
          let blob = new Blob([response.data])
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
          let fileName = nowDate + '-应收费用.xls'
          let elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
          this.$notify({
            title: '成功',
            message: '导出成功',
            type: 'success',
            duration: 2000
          })
        })
      } else {
        this.$notify({
          title: '警告',
          message: '盘短调账模块正在开发中....',
          type: 'warning',
          duration: 2000
        })
      }
    },
    truckList () {
      truck_attribute().then(response => {
        this.CarType = response.data
      })
    }
  }
}
</script>
<style scoped>
.formTitle {
  text-align: center;
  padding: 20px;
  color: #333333;
}

.settleBtn {
  padding: 12px 6px;
}

.expensesPayFlex {
  display: flex;
  justify-items: center;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
}
</style>
