<template>
  <div>
    <el-table :data="list"
              :key="tableKey"
              @selection-change="handleSelectionChange"
              border
              element-loading-text="给我一点时间"
              fit
              highlight-current-row
              style="width: 100%"
              v-loading="listLoading">
      <el-table-column :selectable="selectable"
                       type="selection"
                       width="55"></el-table-column>
      <el-table-column type="index"
                       width="50"></el-table-column>
      <el-table-column type="expand"
                       fixed>
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="车主姓名:">
                  <span>{{ props.row.truckownName }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="车主电话:">
                  <span>{{ props.row.truckownPhone }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="利率:">
                  <span>{{ props.row.rate }}</span>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="合计费用:">
                  <span>{{ props.row.allTotalFeeRate }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="备注:">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="创建日期:">
                  <span>{{ props.row.createTime | moment('YYYY-MM-DD') }}</span>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="反馈信息:">
                  <span>{{ props.row.feedback }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="正常油卡费用:">
                  <span>{{ props.row.normalOilcardFee }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="应付现金:">
                  <span>{{ props.row.needPayCash }}</span>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="7"
                      offset="3">
                <el-form-item label="运费油卡:">
                  <span>{{ props.row.freightOilcardFee }}</span>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="ETC费用:">
                  <span>{{ props.row.etcFee }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="对账单编号(应付)">
        <template slot-scope="scope">
          <span @click="handleDetail1(scope.row)"
                style="color:#409EFF;cursor:pointer">{{ scope.row.accountPayId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="日期范围">
        <template slot-scope="scope">
          <span>{{ scope.row.dateLimit }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车主">
        <template slot-scope="scope">
          <span>{{scope.row.truckownName}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="司机姓名">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.driverName }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="订单数量">
        <template slot-scope="scope">
          <span>{{ scope.row.orderAmount }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="合计费用">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.totalFee}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="利率">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.rate }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="合计费用（含发票）">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.totalFeeRate }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="正常油卡费用">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.normalOilcardFee }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="应付现金">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.needPayCash }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="运费油卡">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.freightOilcardFee }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="备注">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.remark }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="对账单状态">
        <template slot-scope="scope">
          <span>{{ scope.row.settlementStatus }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="创建日期">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.createTime | moment('YYYY-MM-DD') }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="报销单号">
        <template slot-scope="scope">
          <span>{{ scope.row.repaynumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="现金结算时间">
        <template slot-scope="scope">
          <span v-if="scope.row.orderSettlementStatus">{{ scope.row.orderSettlementStatus.cashTime  | moment('YYYY-MM-DD')}}</span>
          <span v-if="scope.row.orderSettlementStatus && !scope.row.orderSettlementStatus.cashTime ">未结算</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="运费油卡余额">
        <template slot-scope="scope">
          <span>{{ scope.row.oilTransFee }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="反馈信息">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.feedback }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <!-- <el-table-column align="center" label="操作" width="150px">
        <template slot-scope="scope">
          <button
            type="primary"
            @click="sendDriver(scope.row)"
            :disabled="scope.row.needPayStatus==='5'"
          >发送对账单</button>
          <button
            type="primary"
            v-if="scope.row.settlement==='0'"
            @click="distributionFee(scope.row)"
            :disabled="scope.row.needPayStatus==='5'"
          >费用分配</button>
          <button
            type="primary"
            v-if="scope.row.settlement==='0'"
            @click="handleBillConfirm(scope.row,'1')"
            :disabled="scope.row.needPayStatus==='5'"
          >开票结算确认</button>
          <button
            type="primary"
            v-if="scope.row.settlement==='0'"
            @click="handleBillConfirm(scope.row,'0')"
            :disabled="scope.row.needPayStatus==='5'"
          >不开票结算确认</button>

        </template>
      </el-table-column> -->
    </el-table>
    <div class="pagination-container"
         v-show="!listLoading">
      <el-pagination :current-page.sync="listQuery.page"
                     :page-size="listQuery.limit"
                     :page-sizes="[10,20,30, 50]"
                     :total="total"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>

    <!-- 应付费用列表 -->
    <el-dialog :title="textMap[2].title"
               :visible.sync="dialogFormVisible2"
               width="80%">
      <el-col :span="6">对账单编号：{{orderObject.accountPayId}}</el-col>
      <el-col :span="6">车主名称：{{orderObject.truckownName}}</el-col>
      <el-col :span="6">订单数量：{{orderObject.orderAmount}}</el-col>
      <el-col :span="6">订单类型：<span v-if="this.orderObject.orderType==='0'">集装箱</span><span v-if="this.orderObject.orderType==='1'">普货</span></el-col>
      <el-col :span="4">合计费用：{{orderObject.totalFee}}</el-col>
      <el-col :span="10">对账订单日期范围：{{orderObject.dateLimit}}</el-col>
      <el-col :span="8">创建时间：{{orderObject.createTime | moment('YYYY-MM-DD')}}</el-col>
      <el-table :data="itemArr"
                :key="tableKey2"
                @selection-change="handleSelectionChange"
                border
                element-loading-text="给我一点时间"
                fit
                highlight-current-row
                style="width: 100%"
                v-loading="listLoading">
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-button @click="removeOrderjs(scope.row)"
                       class="filter-item"
                       icon="edit"
                       size="mini"
                       style="margin-left: 10px;"
                       type="primary">移除
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
                         label="车牌号">
          <template slot-scope="scope">
            <span>{{scope.row.plateNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="司机">
          <template slot-scope="scope">
            <span>{{scope.row.driverName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="电话">
          <template slot-scope="scope">
            <span>{{scope.row.driverPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="提箱地"
                         v-if="this.orderType==='0'">
          <template slot-scope="scope">
            <span>{{scope.row.pickCNPlace}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="还箱地"
                         v-if="this.orderType==='0'">
          <template slot-scope="scope">
            <span>{{scope.row.returnCNPlace}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="提货地">
          <template slot-scope="scope">
            <span> {{scope.row.pickGoodsPlace}} </span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="送货地">
          <template slot-scope="scope">
            <span> {{scope.row.sendGoodsPlace}} </span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="里程数（公里）">
          <template slot-scope="scope">
            <span> {{scope.row.distance}} </span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="单价（元）">
          <template slot-scope="scope">
            <span> {{scope.row.perPrice}} </span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="运输费">
          <template slot-scope="scope">
            <span> {{scope.row.transportFee}} </span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="提箱费（元）" v-if="this.orderType==='0'">
          <template slot-scope="scope">
            <span>  {{scope.row.pickcnFee}}  </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="压车费（元）" v-if="this.orderType==='0'">
          <template slot-scope="scope">
            <span>  {{scope.row.ycFee}}  </span>
          </template>
        </el-table-column> -->

        <el-table-column align="center"
                         label="装货费"
                         v-if="this.orderType==='1'">
          <template slot-scope="scope">
            <span> {{scope.row.packFee}} </span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="卸货费"
                         v-if="this.orderType==='1'">
          <template slot-scope="scope">
            <span> {{scope.row.releaseFee}} </span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="异常费用（元）">
          <template slot-scope="scope">
            <span> {{scope.row.exFee}} </span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="其他费用">
         <template slot-scope="scope">
           <span> {{scope.row.rate}}  </span>
         </template>
       </el-table-column>
       <el-table-column align="center" label="订单费用">
         <template slot-scope="scope">
           <span> {{scope.row.orderFee}}   </span>
         </template>
       </el-table-column> -->
        <el-table-column align="center"
                         label="利率">
          <template slot-scope="scope">
            <span> {{scope.row.moneyRate}} </span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="合计费用（元）">
          <template slot-scope="scope">
            <!-- <span>   {{scope.row.needPayByRate}} </span> -->
            <span> {{scope.row.needPay}} </span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="备注">
          <template slot-scope="scope">
            <span> {{scope.row.remarks}} </span>
          </template>
        </el-table-column>

      </el-table>
      <div class="dialog-footer"
           slot="footer">

        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   @click="cancel2()">关 闭
        </el-button>

        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   @click="distributionFee1()"
                   v-if="payType===1">费用分配
        </el-button>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   @click="sendDriver()"
                   v-if="SettlementProcessShow1 && payType===1">发送对账单
        </el-button>

        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   @click="sendDriverS()"
                   v-if="SettlementProcessShow2===1">账单确认
        </el-button>
        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   icon="edit"
                   size="mini"
                   @click="jiesuan">{{JSDY}}
        </el-button>

        <!-- <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="edit"
          size="mini"
          v-if="InvoiceSettlementConfirmation1 && payType===1"
          @click="handleBillConfirm('1')"
        >开票结算确认</el-button>
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="edit"
          size="mini"
          v-if="InvoiceSettlementConfirmationN1 && payType===1"
          @click="handleBillConfirm('0')"
        >不开票结算确认</el-button> -->
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
            <el-select v-model="distributionFee_obj.rate"
                       filterable
                       placeholder="-请选择-">
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
            <el-select v-model="payableFreight"
                       filterable
                       placeholder="-请选择-">
              <el-option v-for="item in distributionFee_shuiArr"
                         :key="item.id"
                         :label="item.label"
                         :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span v-if="payableFreight==='0'">{{distributionFee_obj.totalFee}}元</span>
            <span v-if="payableFreight==='1'">{{distributionFee_obj.totalFee * (1- distributionFee_obj.rate/100) }}元</span>
          </el-col>
        </el-form-item>
        <el-form-item label="压车费">
          <el-col :span="10">
            <el-select v-model="payableCarParkingFee"
                       filterable
                       placeholder="-请选择-">
              <el-option v-for="item in distributionFee_shuiArr"
                         :key="item.id"
                         :label="item.label"
                         :value="item.id"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span v-if="payableCarParkingFee==='0'">{{distributionFee_obj.ycFee}}元</span>
            <span v-if="payableCarParkingFee==='1'">{{distributionFee_obj.ycFee  * (1- distributionFee_obj.rate/100) }}元</span>
          </el-col>
        </el-form-item>
        <el-form-item label="合计费用">
          <span>{{payable_totalFee}}元</span>
        </el-form-item>
        <el-form-item label="现金分配"
                      prop="payCash"
                      :rules="[{ required: true, message: '请输入现金分配', trigger: 'blur' }]">
          <el-col :span="10">
            <el-input type="number"
                      v-model.number="distributionFee_obj.payCash"
                      placeholder="现金分配"></el-input>
          </el-col>
          元
          <span v-if="!distributionFee_Status"
                style="color:red">(分配的现金不能大于费用合计)</span>
        </el-form-item>

        <el-form-item label="正常油卡费用">
          <el-col :span="10">
            <el-input v-model="distributionFee_obj.normalOilcardFee"
                      placeholder="正常油卡费用"
                      :disabled="true"></el-input>
          </el-col>
          元 （正常油卡充值中提取的针对该订单的费用）
        </el-form-item>

        <el-form-item label="运费油卡分配">
          <el-col :span="10">
            <el-input v-model="distributionFee_obj.freightOilcardFee"
                      placeholder="运费油卡分配"
                      :disabled="true"></el-input>
          </el-col>
          元 （合计费用-现金分配-正常油卡费用）
        </el-form-item>

        <el-form-item label="ETC费用">
          {{distributionFee_obj.etcFee}}
        </el-form-item>
        <el-form-item label="应付现金">
          <el-col :span="10">
            <el-input v-model="distributionFee_obj.needPayCash"
                      placeholder="应付现金"
                      :disabled="true"></el-input>
          </el-col>
          元 （分配现金金额-ETC合计）
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取消分配</el-button>
        <el-button type="primary"
                   @click="distributionFee_js()">确定分配</el-button>
      </div>
    </el-dialog>

    <!-- 确认结算弹框 -->
    <el-dialog title="费用结算"
               :visible.sync="dialogFormVisible3">
      <el-form :model="currentItem"
               :rules="rules"
               ref="form2"
               label-width="100px">
        <el-row>
          <!--<el-col :span="24">-->
          <!--<h3 class="jsTxt">请勾选结算时需要开发票的项目。</h3>-->
          <!--</el-col>-->
          <!--<el-col :span="24" class="jsTxt">-->
          <!--<el-checkbox v-model="checked1" :disabled="checked1Status">运输费</el-checkbox>-->
          <!--<el-checkbox v-model="checked2" :disabled="checked2Status">压车费</el-checkbox>-->
          <!--</el-col>-->
          <el-col :span="24"
                  class="jsTxt OddNumbers">
            录入报销单号:
            <el-input class="filter-item"
                      size="small"
                      placeholder="报销单号"
                      v-model="repaynumber"></el-input>
          </el-col>
          <el-col :span="24"
                  class="jsTxt">
            <el-button class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       icon="edit"
                       v-if="InvoiceSettlementConfirmation1 && payType===1"
                       @click="handleBillConfirm('1')">结算
            </el-button>
          </el-col>
          <!--<el-col :span="24" class="jsTxt">-->
          <!--<el-button-->
          <!--class="filter-item"-->
          <!--style="margin-left: 10px;"-->
          <!--type="primary"-->
          <!--icon="edit"-->
          <!--size="mini"-->
          <!--v-if="InvoiceSettlementConfirmation1 && payType===1"-->
          <!--@click="handleBillConfirm('1')"-->
          <!--&gt;开票结算确认-->
          <!--</el-button>-->
          <!--<el-button-->
          <!--class="filter-item"-->
          <!--style="margin-left: 10px;"-->
          <!--type="primary"-->
          <!--icon="edit"-->
          <!--size="mini"-->
          <!--v-if="InvoiceSettlementConfirmationN1 && payType===1"-->
          <!--@click="handleBillConfirm('0')"-->
          <!--&gt;不开票结算确认-->
          <!--</el-button>-->
          <!--</el-col>-->
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog title="现金结算回单"
               :visible.sync="dialogPrintFormVisible">
      <div class="pay-print"
           ref="print">
        <p class="pay-print-time">报销单号:{{printForm.repaynumber}}</p>
        <el-row>
          <h1 class="pay-print-header">现金结算回单</h1>
          <p class="pay-print-time">回单生成时间{{printForm.createTime | moment('YYYY-MM-DD')}}</p>
        </el-row>
        <el-row>
          <el-col :span="8">车牌号:</el-col>
          <el-col :span="16">{{printForm.plateNumber }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">司机:</el-col>
          <el-col :span="16">{{printForm.driverName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">起止日期:</el-col>
          <el-col :span="16">{{printForm.dateStart | moment('YYYY-MM-DD') }} -- {{printForm.dateEnd |
            moment('YYYY-MM-DD') }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">订单类型:</el-col>
          <el-col :span="16"
                  v-if="printForm.orderType === '0'">集装箱</el-col>
          <el-col :span="16"
                  v-if="printForm.orderType === '1'">普货</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">合计费用:</el-col>
          <el-col :span="16">{{printForm.allTotalFeeRate }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">现金结算费用:</el-col>
          <el-col :span="16">{{printForm.needPayCash }}</el-col>
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
  shuilvList
} from '@/api/financialManagement'
import { BillConfirm, fetchList, removeOrder, selectOrderByBill } from '@/api/payable.js'
import { distributionFee_function, send_function, send_functionS } from '@/api/billList'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'

export default {
  props: {
    listQuery1: {
      type: Object,
      required: true
    }
  },
  name: 'table_loan',
  directives: {
    waves
  },
  data () {
    return {
      checked1: false,
      checked1Status: false,
      checked2: false,
      checked2Status: false,

      currentItem: {},
      payType: 1,
      list: null,
      total: null,
      listLoading: false,
      listQuery: {},
      JSDY: '结算',
      cashTypearr: [
        {
          id: 0,
          label: '单结'
        },
        {
          id: 1,
          label: '月结'
        }
      ],
      orderTypearr: [
        {
          id: 0,
          label: '集装箱订单'
        },
        {
          id: 1,
          label: '普货订单'
        },
        {
          id: 2,
          label: '盘短订单'
        }
      ],
      rules: {},
      form: {
        plateNumber: '',
        repaymentRate: null
      },
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible1: false,
      dialogFormVisible3: false,
      dialogPrintFormVisible: false,
      rate: null,
      shuilvArr: [],
      dialogStatus: '',
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
          title: '应付对账单详情'
        }
      ],
      tableKey: 0,
      tableKey2: 2,
      multipleSelection: [],
      itemArr: [],
      orderObject: {},
      orderType: null,
      InvoiceSettlementConfirmation1: false,
      InvoiceSettlementConfirmationN1: false,
      SettlementProcessShow1: false,
      SettlementProcessShow2: false,
      distributionFee_obj: {
        id: '',
        useRate: '',
        // 现金分配
        payCash: '',
        // 运输油卡费
        freightOilcardFee: '',
        // 油卡押金
        oilPledge: '',
        // ETC费用
        etcFee: '',
        // 应付现金
        needPayCash: ''
      },
      payableFreight: '0',
      payableCarParkingFee: '0',
      distributionFee_Status: true,
      distributionFee_Status1: true,
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
      distributionFee_shui: '0',
      repaynumber: '',
      printForm: {
        plateNumber: '',
        driverName: '',
        dateStart: '',
        dateEnd: '',
        orderType: '',
        totalFeeRate: '',
        allTotalFeeRate: '',
        repaynumber: '',
        createTime: '',
        needPayCash: ''
      }
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    useRate: function () {
      this.distributionFee_obj.useRate = Number(this.payableFreight) * 2 + Number(this.payableCarParkingFee)
      return this.distributionFee_obj.useRate
    },
    payable_totalFee: function () {
      let total = 0
      let yc = 0
      if (this.payableFreight === '0') {
        total = this.distributionFee_obj.totalFee
      } else if (this.payableFreight === '1') {
        total = this.distributionFee_obj.totalFee * (1 - this.distributionFee_obj.rate / 100)
      }
      if (this.payableCarParkingFee === '0') {
        yc = this.distributionFee_obj.ycFee
      } else if (this.payableCarParkingFee === '1') {
        yc = this.distributionFee_obj.ycFee * (1 - this.distributionFee_obj.rate / 100)
      }
      return Number(yc) + Number(total) + Number(this.distributionFee_obj.otherFee)
    }
  },
  watch: {
    'distributionFee_obj.payCash': {
      handler (newV, oldV) {
        if (Number(this.payable_totalFee) >= Number(newV)) {
          this.distributionFee_obj.freightOilcardFee = Number(this.payable_totalFee) - Number(newV) - Number(this.distributionFee_obj.normalOilcardFee)
          this.distributionFee_obj.needPayCash = Number(newV) - Number(this.distributionFee_obj.etcFee)
        }
      },
      deep: true
    },
    payable_totalFee: {
      handler (newV, oldV) {
        if (newV) {
          this.distributionFee_obj.freightOilcardFee = Number(newV) - Number(this.distributionFee_obj.payCash) - Number(this.distributionFee_obj.normalOilcardFee)
        }
      }
    }
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
    //  alert(JSON.stringify(this.listQuery1))
    this.InvoiceSettlementConfirmation1 = this.permissions[
      'InvoiceSettlementConfirmation1'
    ]
    this.InvoiceSettlementConfirmationN1 = this.permissions[
      'InvoiceSettlementConfirmationN1'
    ]
    this.SettlementProcessShow1 = this.permissions['SettlementProcessShow1']
    this.listQuery = this.listQuery1
    //  alert(JSON.stringify(this.listQuery))
    this.getList()
    this.shuilvFunction()
  },
  methods: {
    shuilvFunction () {
      shuilvList().then(res => {
        this.shuilvArr = res.data

      })
    },


    jiesuan () {
      this.repaynumber = ''
      this.printForm = {}
      let row = this.currentItem
      this.printForm.plateNumber = row.plateNumber
      this.printForm.driverName = row.driverName
      this.printForm.dateStart = row.dateStart
      this.printForm.dateEnd = row.dateEnd
      this.printForm.orderType = row.orderType
      this.printForm.totalFeeRate = row.totalFeeRate
      this.printForm.allTotalFeeRate = row.allTotalFeeRate
      this.printForm.repaynumber = row.repaynumber
      this.printForm.needPayCash = row.needPayCash
      this.printForm.createTime = Date.now()
      if (row.settlementStatus === '已结算') {
        this.dialogPrintFormVisible = true
      } else {
        this.dialogFormVisible3 = true
      }
      // var arr = this.currentItem.settlements
      // for (var item  in arr) {
      //   if (arr[item].settlementType === 'cash') {
      //     this.checked1 = true
      //     this.checked1Status = true
      //   }
      //   if (arr[item].settlementType === 'oil') {
      //     this.checked2 = true
      //     this.checked2Status = true
      //   }
      // }
    },
    // 分配
    distributionFee_js () {
      if (!this.distributionFee_Status) {
        this.$notify({
          title: '提示',
          message: '分配的现金不能大于费用合计',
          type: 'warning',
          duration: 2000
        })
      } else {
        if (this.payType === 1) {
          this.$refs['form1'].validate(valid => {
            if (valid) {
              var params = {
                id: this.distributionFee_obj.id,
                useRate: this.useRate,
                payCash: this.distributionFee_obj.payCash,
                freightOilcardFee: this.distributionFee_obj.freightOilcardFee,
                // oilPledge: this.distributionFee_obj.oilPledge,
                etcFee: this.distributionFee_obj.etcFee,
                // normalOilcardFee: this.distributionFee_obj.normalOilcardFee,
                needPayCash: this.distributionFee_obj.needPayCash,
                rate: this.distributionFee_obj.rate
              }
              distributionFee_function(params).then(res => {
                if (res.data.data) {
                  this.dialogFormVisible1 = false
                  if (this.payType === 1) {
                    this.distributionFee_obj = {}
                    this.getList()
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
          })
        }
      }
    },
    // change_transOilFee() {
    //   if (
    //     this.distributionFee_obj.payCash >
    //     this.distributionFee_obj.totalFee &&
    //     this.distributionFee_shui === '0'
    //   ) {
    //     this.distributionFee_Status = false
    //   } else if (
    //     this.distributionFee_obj.payCash >
    //     this.distributionFee_obj.totalFeeRate &&
    //     this.distributionFee_shui === '1'
    //   ) {
    //     this.distributionFee_Status = false
    //   } else {
    //     this.distributionFee_Status = true
    //     this.distributionFee_obj.totalFee = Number(
    //       this.distributionFee_obj.totalFee
    //     )
    //     this.distributionFee_obj.payCash = Number(
    //       this.distributionFee_obj.payCash
    //     )
    //     this.distributionFee_obj.totalFeeRate = Number(
    //       this.distributionFee_obj.totalFeeRate
    //     )
    //     this.distributionFee_obj.normalOilcardFee = Number(
    //       this.distributionFee_obj.normalOilcardFee
    //     )
    //     if (this.distributionFee_shui === '0') {
    //       this.distributionFee_obj.freightOilcardFee =
    //         this.distributionFee_obj.totalFee -
    //         this.distributionFee_obj.payCash
    //     } else if (this.distributionFee_shui === '1') {
    //       this.distributionFee_obj.freightOilcardFee =
    //         this.distributionFee_obj.totalFeeRate -
    //         this.distributionFee_obj.payCash
    //     }
    //     this.distributionFee_obj.needPayCash =
    //       this.distributionFee_obj.payCash -
    //       this.distributionFee_obj.normalOilcardFee
    //   }
    //   //修改对应的应付现金值
    //   if (
    //     Number(this.distributionFee_obj.needPayCash) <
    //     this.distributionFee_obj.oilPledge
    //   ) {
    //     this.distributionFee_Status1 = false
    //   } else {
    //     this.distributionFee_Status1 = true
    //   }
    // },
    distributionFee1 () {
      // if (this.payType === 1) {
      //   this.multipleSelection = this.$refs.payableList.multipleSelection;
      // }
      this.readOrEdit = 'Edit'
      this.multipleSelection = []
      this.multipleSelection.push(this.currentItem)
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要操作的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        if (this.multipleSelection[0].settlementStatus === '已结算') {
          this.$notify({
            title: '提示',
            message: '账单已结算，不能执行此操作',
            type: 'warning',
            duration: 2000
          })
        } else {
          this.dialogFormVisible1 = true
          this.distributionFee_obj = this.multipleSelection[0]
          if (this.distributionFee_obj.useRate) {
            this.payableFreight = String(parseInt(Number(this.distributionFee_obj.useRate) / 2))
            this.payableCarParkingFee = String(Number(this.distributionFee_obj.useRate) % 2)
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
    selectable (row, index) {
      if (row.needPayStatus === '5') {
        return false
      } else {
        return true
      }
    },
    sendDriver () {
      this.multipleSelection = []
      this.multipleSelection.push(this.currentItem)
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要操作的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        if (
          this.payType === 1 &&
          this.multipleSelection[0].settlementStatus !== '已结算'
        ) {
          var obj = this.multipleSelection[0]
          console.log(this.itemArr)
          var params = {
            id: obj.id
          }
          send_function(params).then(res => {
            if (res.data) {
              this.getList()
              this.$notify({
                title: '成功',
                message: '发送成功',
                type: 'success',
                duration: 2000
              })
              this.SettlementProcessShow2 = 1
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

    sendDriverS () {
      this.multipleSelection = []
      this.multipleSelection.push(this.currentItem)
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要操作的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        if (
          this.payType === 1 &&
          this.multipleSelection[0].settlementStatus !== '已结算'
        ) {
          var obj = this.multipleSelection[0]
          console.log(this.itemArr)
          var params = {
            id: obj.id
          }
          send_functionS(params).then(res => {
            if (res.data) {
              this.getList()
              this.$notify({
                title: '成功',
                message: '确认成功',
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


    distributionFee (obj) {
      this.$emit('distributionFee', obj)
    },
    handleBillConfirm () {
      var row = this.currentItem
      if (!this.repaynumber) {
        this.$notify({
          title: '提示',
          message: '抱歉，报销单号不能为空',
          type: 'warning',
          duration: 2000
        })
      } else if (row.settlementStatus !== '司机已确认') {
        this.$notify({
          title: '提示',
          message: '抱歉，账单只有在‘司机已确认’状态下才允许结算',
          type: 'warning',
          duration: 2000
        })
      } else {
        var params = {
          id: row.id,
          accountPayId: row.accountPayId,
          repaynumber: this.repaynumber,
          flag: row.useRate
        }

        BillConfirm(params).then(res => {
          if (res.data.data) {
            this.dialogFormVisible2 = false
            this.dialogFormVisible3 = false
            this.dialogPrintFormVisible = true
            this.getList()
            this.$notify({
              title: '提示',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
          }
        })
      }
    },
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.page = val
      this.getList()
    },
    handleDetail1 (row) {
      this.currentItem = row
      this.dialogFormVisible2 = true
      this.orderType = row.orderType
      var params = {
        accountPayId: row.accountPayId,
        orderType: row.orderType
      }
      if (row.settlementStatus === '已结算') {
        this.JSDY = '打印'
      } else {
        this.JSDY = '结算'
      }
      this.orderObject = row
      selectOrderByBill(params).then(response => {
        this.dialogFormVisible2 = true
        if (this.orderObject.orderType === '0') {
          this.itemArr = response.data.cnpdList
        } else if (this.orderObject.orderType === '1') {
          this.itemArr = response.data.ppdList
        }
      })
    },
    cancel2 () {
      this.dialogFormVisible2 = false
    },
    removeOrderjs (obj_row) {
      debugger
      if (this.orderObject.settlementStatus === '已结算') {
        this.$notify({
          title: '提示',
          message: '抱歉，账单已结算，不支持当前操作',
          type: 'warning',
          duration: 2000
        })
      } else {
        var params = {
          'accountPayId': this.orderObject.accountPayId,
          'orderId': obj_row.orderId
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
      }
    },
    handlePrint () {
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
