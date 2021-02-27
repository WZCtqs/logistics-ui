<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :model="form"
               class="filter-item"
               label-width="100px"
               ref="form">
        <el-row>
          <el-col :span="5">
            <el-form-item class="filter-item"
                          label="订单号 ">
              <el-input @keyup.enter.native="handleFilter"
                        class="filter-item"
                        clearable
                        v-model="listQuery.orderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter-item"
                          label="订单状态">
              <el-select @change="handleFilter"
                         class="filter-item"
                         filterable
                         clearable
                         placeholder="请选择"
                         v-model="listQuery.status">
                <el-option :key="item.value"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in OrderStatus"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter-item"
                          label="车牌号 ">
              <el-input @keyup.enter.native="handleFilter"
                        clearable
                        class="filter-item"
                        v-model="listQuery.plateNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="舱位号"
                          class="filter-item">
              <el-input @keyup.enter.native="handleFilter"
                        class="filter-item"
                        v-model="listQuery.classOrder"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"
                  :offset="1">
            <el-tooltip class="item"
                        effect="dark"
                        content="更多搜索条件"
                        placement="bottom">
              <el-button icon="el-icon-caret-bottom"
                         size="small"
                         circle
                         @click="searchIcon =true"
                         v-if="!searchIcon"></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row v-if="searchIcon">
          <el-col :span="5">
            <el-form-item class="filter-item"
                          label="客户名称 ">
              <el-input @keyup.enter.native="handleFilter"
                        class="filter-item"
                        clearable
                        v-model="listQuery.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item class="filter-item"
                          label="车辆类型 ">
              <el-select @change="handleFilter"
                         class="filter-item"
                         filterable
                         clearable
                         placeholder="请选择"
                         v-model="listQuery.truckAttribute">
                <el-option :key="item.id"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in CarType"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="filter-item"
                          label="派车日期">
              <el-col :span="11">
                <el-date-picker format="yyyy 年 MM 月 dd 日"
                                placeholder="开始日期"
                                style="width: 100%;"
                                type="date"
                                v-model="listQuery.fromDate"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
              <el-col :span="2"
                      align="center"
                      class="line">--</el-col>
              <el-col :span="11">
                <el-date-picker :picker-options="pickerOptions1"
                                @change="checktoDate"
                                format="yyyy 年 MM 月 dd 日"
                                placeholder="结束日期"
                                style="width: 100%;"
                                type="date"
                                v-model="listQuery.toDate"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="searchIcon">
          <el-col :span="5">
            <el-form-item label="箱号"
                          class="filter-item">
              <el-input @keyup.enter.native="handleFilter"
                        class="filter-item"
                        v-model="listQuery.containerNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="去/回程 "
                          class="filter-item">
              <el-select class="filter-item"
                         filterable
                         placeholder="请选择"
                         v-model="listQuery.type"
                         @keyup.enter.native="handleFilter"
                         clearable="clearable">
                <el-option v-for="item in OrderType"
                           :key="item.id"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="录单员"
                          class="filter-item">
              <el-input @keyup.enter.native="handleFilter"
                        class="filter-item"
                        v-model="listQuery.createBy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"
                  :offset="1">
            <el-tooltip class="item"
                        effect="dark"
                        content="收起"
                        placement="bottom">
              <el-button icon="el-icon-caret-top"
                         size="small"
                         circle
                         @click="searchIcon = false"
                         v-if="searchIcon"></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-button @click="handleExp"
                   class="filter-item"
                   icon="edit"
                   size="mini"
                   style="margin-left: 10px;"
                   type="primary"
                   v-if="ord_order_exp">导出
        </el-button>

        <el-button @click="handleDetail"
                   class="filter-item"
                   size="mini"
                   style="margin-left: 10px;"
                   type="primary">查看
        </el-button>
        <el-button @click="handleDelete"
                   class="filter-item"
                   size="mini"
                   style="margin-left: 10px;"
                   type="primary"
                   v-if="ord_order_del">删除
        </el-button>
        <el-button @click="handleFilter"
                   class="filter-item"
                   icon="search"
                   size="mini"
                   type="primary"
                   v-waves>搜索
        </el-button>
        <el-button @click="handleOpenMap"
                   class="filter-item"
                   icon="search"
                   size="mini"
                   type="primary"
                   v-if="ord_order_lushu"
                   v-waves>查看轨迹
        </el-button>
        <el-button @click="handleExcetion"
                   class="filter-item"
                   icon="search"
                   size="mini"
                   type="primary"
                   v-if="upStreamExcepFee"
                   v-waves>上报异常
        </el-button>
        <el-button @click="handleOpenShortMsg"
                   class="filter-item"
                   icon="search"
                   size="mini"
                   type="primary"
                   v-if="ord_order_send"
                   v-waves>短信重发
        </el-button>

        <el-button class="filter-item"
                   style="margin-left: 10px;"
                   type="primary"
                   size="mini"
                   @click="handleUpdate">编辑
        </el-button>

        <el-button @click="handleAddAbnormal"
                   class="filter-item"
                   icon="search"
                   size="mini"
                   type="primary"
                   v-waves>添加异常费用
        </el-button>

        <el-button @click="handleSubmitDD"
                   class="filter-item"
                   icon="search"
                   size="mini"
                   type="primary"
                   v-waves>提交订单
        </el-button>

      </div>
    </div>
    <el-table :data="list"
              :default-sort="{prop: 'sendTruckDate', order: 'descending'}"
              :key="tableKey"
              @selection-change="handleSelectionChange"
              border
              element-loading-text="给我一点时间"
              fit
              highlight-current-row
              style="width: 100%"
              v-loading="listLoading">
      <el-table-column type="selection"
                       width="55"></el-table-column>
      <el-table-column type="expand"
                       fixed>
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-row>
              <el-col :span="4">
                <el-form-item label="订单来源:">
                  <span v-if="props.row.upstreamId !=null && props.row.upstreamId != ''">箱行亚欧订单</span>
                  <span v-if="props.row.upstreamId==null || props.row.upstreamId == ''"></span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="派车日期:">
                  <span>{{props.row.sendTruckDate | moment('YYYY-MM-DD')}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="司机:">
                  <span v-if="props.row.driverVO != null">{{ props.row.driverVO.driverName }}</span>
                  <span v-else></span>
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item label="录单员:">
                  <span v-if="props.row.createBy==null || props.row.createBy==''">暂无</span>
                  <span v-else>{{ props.row.createBy }}</span>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>

            </el-row>
            <template v-if="props.row.pickupAdds">
              <template v-for="(itemArr,index) in props.row.pickupAdds">
                <el-col :span="3"
                        :key="index">
                  <el-form-item label="发货人:">
                    <span>{{ itemArr.contacts }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="5"
                        :key="index">
                  <el-form-item label="发货人电话:">
                    <span>{{ itemArr.contactsPhone }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="16"
                        :key="index">
                  <el-form-item label="发货人地址:">
                    <span>{{ itemArr.addressDetailPlace }}</span>
                  </el-form-item>
                </el-col>

              </template>
            </template>
            <template v-if="props.row.arrivalAdds">
              <template v-for="(itemArr,index) in props.row.arrivalAdds">
                <el-col :span="3"
                        :key="index">
                  <el-form-item label="收货人:">
                    <span>{{ itemArr.contacts }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="5"
                        :key="index">
                  <el-form-item label="收货人电话:">
                    <span>{{ itemArr.contactsPhone }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12"
                        :key="index">
                  <el-form-item label="收货人地址:">
                    <span>{{ itemArr.addressDetailPlace }}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="4"
                        :key="index">
                  <el-form-item label="短信发送状态:">
                    <span v-if="itemArr.isSendOk === '1'">已发送</span>
                    <span v-else>未发送</span>
                  </el-form-item>
                </el-col>
              </template>
            </template>

          </el-form>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="订单id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       fixed
                       label="客户名称">
        <template slot-scope="scope">
          <span v-if="scope.row.customerVO != null">{{ scope.row.customerVO.customerName }}</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       fixed
                       label="订单编号">
        <template slot-scope="scope">
          <span @click="handleDetail1(scope.row.orderId)"
                style="cursor:pointer;color:#409eff;">{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       fixed
                       label="舱位号">
        <template slot-scope="scope">
          <span>{{ scope.row.classOrder }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="去/回程">
        <template slot-scope="scope">

          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="班列日期">
        <template slot-scope="scope">
          <span>{{ scope.row.classDate | moment('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="箱号">
        <template slot-scope="scope">
          <span>{{ scope.row.containerNo }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车辆类型">
        <template slot-scope="scope">
          <span>{{ scope.row.truckAttribute }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       label="订单状态">
        <template slot-scope="scope">

          <span v-if="scope.row.status=='2'">待接单</span>
          <span v-if="scope.row.status=='3'">待提箱</span>
          <span v-if="scope.row.status=='4'">提箱中</span>
          <span v-if="scope.row.status=='5'">待提货</span>
          <span v-if="scope.row.status=='6'">提货中</span>
          <span v-if="scope.row.status=='7'">运输中</span>
          <span v-if="scope.row.status=='8'">签收中</span>
          <span v-if="scope.row.status=='9'">已签收</span>
          <span v-if="scope.row.status=='10'">还箱中</span>
          <span v-if="scope.row.status=='11'">已还箱</span>
          <span v-if="scope.row.status=='12'">已提交</span>
        </template>
      </el-table-column>

      <el-table-column align="center"
                       fixed="right"
                       label="异常原因">
        <template slot-scope="scope">
          <div @click="goYcfee(scope.row)"
               style="cursor:pointer;color:#409eff;"
               v-if="scope.row.ordExceptionFees.length != 0">异常费用
          </div>
          <div @click="goYcCondition(scope.row)"
               style="cursor:pointer;color:#409eff;"
               v-if="scope.row.ordExceptionConditions.length != 0">异常情况
          </div>
          <div v-if="scope.row.ordExceptionFees.length == 0 && scope.row.ordExceptionConditions == 0">无异常
          </div>
        </template>
      </el-table-column>

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
    <el-dialog :visible.sync="dialogVisible"
               center
               class="c_dialog80">
      <orderDetail :orderDetailId="this.orderDetailId"></orderDetail>
      <span class="dialog-footer"
            slot="footer">
        <el-button @click="dialogVisible = false"
                   class="bigButton"
                   size="medium"
                   type="primary">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="exceptionDialog"
               center>
      <h5 class="h5css1">异常费用上报</h5>
      <el-form :data="exceptionObj"
               class="filter-item"
               label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="承运单位">
              <el-input v-model="exceptionObj.carrier"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="压车天数">
              <el-input type="number"
                        v-model="exceptionObj.ccmCarryDay"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="压车单价">
              <el-input type="number"
                        v-model="exceptionObj.ccmCarryPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="异常费用">
              <el-input type="number"
                        v-model="exceptionObj.ccmExceptionFees"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input v-model="exceptionObj.ccmExceptionDetails"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单编号">
              <el-input v-model="exceptionObj.orderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车牌号">
              <el-input v-model="exceptionObj.plateNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上游系统订单id">
              <el-input v-model="exceptionObj.upstreamId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span class="dialog-footer"
            slot="footer">
        <el-button @click="cancelException"
                   class="bigButton"
                   size="medium"
                   type="primary">取消</el-button>
        <el-button @click="handleExceptionjs"
                   class="bigButton"
                   size="medium"
                   type="primary">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="dialogMapVisible"
               class="mapDialog"
               title="订单位置信息"
               width="80%">
      <baibmap :gpsPointesarr="this.gpsPointesarr"></baibmap>
      <span class="dialog-footer"
            slot="footer">
        <el-button @click="dialogMapVisible = false"
                   class="bigButton"
                   size="medium"
                   type="primary">关 闭</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="centerDialogVisible"
               center
               title="提示"
               width="30%">
      <span>是否确定删除？</span>
      <span class="dialog-footer"
            slot="footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button @click="handleBeforeDelete"
                   type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogMapVisible"
               class="mapDialog"
               title="订单位置信息"
               width="80%">
      <baidu-map :center="polylinePath[0]"
                 :scroll-wheel-zoom="true"
                 :zoom="12"
                 class="map">
        <bm-polyline :path="polylinePath"
                     :stroke-weight="2"
                     :strokeWeight="5"
                     @lineupdate="updatePolylinePath"
                     stroke-color="blue"></bm-polyline>
        <bm-panorama></bm-panorama>
        <bm-marker :dragging="true"
                   :position="polylinePath[0]">
          <bm-label :labelStyle="{color: '#fff',background: 'rgba(0,0,0,0.5)',overflow: 'hidden', position: 'absolute','font-size':'14px'}"
                    :offset="{width: -8, height: 30}"
                    content="起点" />
        </bm-marker>
        <bm-marker :position="polylinePath[polylinePath.length-1]"
                   @click="infoWindowOpen">
          <bm-info-window :position="polylinePath[polylinePath.length-1]"
                          :show="infoWindow.show"
                          @close="infoWindowClose"
                          @open="infoWindowOpen"
                          animation="BMAP_ANIMATION_BOUNCE"
                          title="车辆信息">
            <p v-text="infoWindow.orderId"></p>
            <p v-text="infoWindow.plateNumber"></p>
            <p v-text="infoWindow.orderStatus"></p>
            <p v-text="infoWindow.address"></p>
            <p v-text="infoWindow.time"></p>
          </bm-info-window>
        </bm-marker>
        <bml-lushu :icon="icon"
                   :path="polylinePath"
                   :play="play"
                   :rotation="true"
                   @stop="reset">
        </bml-lushu>
      </baidu-map>
      <span class="dialog-footer"
            slot="footer">
        <el-button @click="dialogMapVisible = false"
                   class="bigButton "
                   size="medium"
                   type="primary">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="短信重发"
               :visible.sync="dialogShortMessage "
               width="50%">
      <el-table :data="shortMsgList"
                style="width: 100%">
        <el-table-column prop="contacts"
                         align="center"
                         label="联系人"
                         width="180">
        </el-table-column>
        <el-table-column prop="contactsPhone"
                         align="center"
                         label="联系电话"
                         width="180">
        </el-table-column>
        <el-table-column prop="isSendOk"
                         align="center"
                         label="短信状态">
          <template slot-scope="scope">
            <span v-if="scope.row.isSendOk === '1'">发送成功</span>
            <span v-else-if="scope.row.isSendOk === '0'">发送失败</span>
            <span v-else>暂无短信操作</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="primary"
                       v-if="scope.row.receiptCode"
                       @click="handleSendDriver(scope.row)">发送
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="异常费用"
               :visible.sync="dialogShortMessage1"
               width="50%">
      <el-form ref="forma"
               :model="forma"
               label-width="100px"
               class="filter-item">

        <el-form-item label="订单号 "
                      class="">
          <el-input v-model="forma.orderId"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="异常类型 "
                      class="">
          <el-select class=""
                     filterable
                     placeholder="请选择"
                     clearable
                     v-model="forma.exceptionFeeType"
                     @change="handleFilter">
            <el-option v-for="item in exceptionFeeTypeReq"
                       :key="item.id"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="异常费用"
                      prop="exceptionFee">
          <el-input v-model="forma.exceptionFee"
                    placeholder="异常费用"></el-input>
        </el-form-item>
        <el-form-item label="备注"
                      prop="remark">
          <el-input v-model="forma.remark"
                    placeholder="备注"></el-input>
        </el-form-item>
        <!-- //:headers="headers"  -->
        <div class="flexItem cm20">
          <div class="flexItems">
            <el-upload :class="{disabled:uploadDisabled0}"
                       :file-list="forma.licensePhotoArr"
                       :on-preview="handlePictureCardPreview0"
                       :on-remove="handleRemove0"
                       :on-success="handleAvatarSuccess0"
                       action="/order/ordFile/localUpload"
                       list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible0"
                       append-to-body>
              <img :src="dialogImageUrl0"
                   alt=""
                   width="100%">
            </el-dialog>
            <div>上传凭证</div>
          </div>
        </div>
      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('forma')">取 消</el-button>
        <el-button type="primary"
                   @click="create('forma')">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import router from '@/router/router'
import {
  addObj,
  delObj,
  addObjYC,
  SubmitObj,
  expObj,
  fetchList,
  getGpsmsg,
  order_status,
  order_type,
  putObj,
  sendDriverObj,
  smsSendAgain,
  truck_attribute,
  upStream
} from '@/api/sendedOrder'
import orderDetail from './orderDetail.vue'
import baibmap from './baidumap.vue'

import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'
import { BmlLushu } from 'vue-baidu-map'
import { exceptionFeeType } from '@/api/ord_exception_fee'

export default {
  name: 'table_ord_order',
  directives: {
    waves
  },
  data () {
    return {
      centerDialogVisible: false,
      orderDetailId: null,
      dialogVisible0: false,
      list: null,
      total: null,
      listLoading: true,
      dialogVisible: false,
      exceptionDialog: false,
      upStreamExcepFee: false,
      dialogShortMessage1: false,
      exceptionObj: {
        carrier: null,
        ccmCarryDay: null,
        ccmCarryPrice: null,
        ccmExceptionFees: null,
        ccmExceptionDetails: null,
        orderId: null,
        plateNumber: null,
        upstreamId: null
      },
      listQuery: {
        page: 1,
        limit: 20,
        status: this.$route.query.status,
        customerName: null,
        orderId: null,
        truckAttribute: null,
        plateNumber: null,
        fromDate: null,
        toDate: null,
        containerNo: null,
        classOrder: null,
        type: null,
        createBy: null,

      },
      pickerOptions1: {
        disabledDate: time => {
          return time.getTime() < Date.parse(this.listQuery.fromDate) - 8.64e7
        }
      },
      searchIcon: false,
      dialogMapVisible: false,
      infoWindow: {
        show: false,
        orderId: '',
        plateNumber: '',
        orderStatus: '',
        address: 'das',
        time: ''
      },
      polylinePath: [],
      endCarIcon: {
        url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 } }
      },
      play: true,
      icon: {
        url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
        size: { width: 52, height: 26 },
        opts: { anchor: { width: 27, height: 13 } }
      },
      rules: {
        orderId: [],
        classDate: [],
        sendTruckDate: [],
        containerNo: [
          {
            required: true,
            trigger: blur
          }
        ],
        type: [],
        driverId: [],
        customerName: [],
        salesman: [],
        status: [],
        remark: []
      },
      exceptionFeeTypeReq: [],
      ordOrderLogistics: [],
      fetchCustomerSelectReq: [],
      contactReq: '',
      customerPhoneReq: '',
      fetchdriverSelectReq: [],
      pickupConRes: '',
      pickupRes: '',
      sendRes: '',
      returnRes: '',
      form: {
        // classDate: '',
        // sendTruckDate: '',
        // type: '',
        exceptionFeeType: '',
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
        sendGoodsDate: '',
        pickupGoodsPlaceArray: [],
        pickupGoodsDate: '',
        returnConPlaceArray: [],
        idcardNumber: '',
        plateNumber: '',
        pickupConPlaceArray: [],
        driverId: '',
        driverphone: '',
        sealStatus: '',
        remark: '',
        orderName: ''
      },
      forma: {
        orderId: '',
        exceptionFeeType: '',
        exceptionFee: '',
        remark: '',
        imgUrlFile: [],
        licensePhotoArr: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      ord_order_upd: false,
      ord_order_del: false,
      ord_order_exp: false,
      ord_order_send: false,
      ord_order_lushu: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      // headers: {
      //   Authorization: 'Bearer ' + getToken()
      // },
      tableKey: 0,
      CarType: [],
      multipleSelection: [],
      OrderStatus: [],
      OrderType: [],
      typeReq: [],
      gpsPointesarr: [],
      path: [],
      dialogShortMessage: false,
      dialogImageUrl0: false,
      shortMsgList: []
    }
  },
  components: {
    orderDetail,
    baibmap,
    BmlLushu
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
    this.getList()
    this.truckList()
    this.orderStatusList()
    this.orderTypeList()
    this.exceptionFeeTypeList()
    this.ord_order_lushu = this.permissions['ord_order_lushu']
    this.ord_order_send = this.permissions['ord_order_send']
    this.ord_order_exp = this.permissions['ord_order_exp']
    this.ord_order_upd = this.permissions['ord_order_upd']
    this.ord_order_del = this.permissions['ord_order_del']
    this.upStreamExcepFee = this.permissions['upStreamExcepFee']
  },
  methods: {
    handleRemove0 (file, fileList) {
      this.forma.imgUrlFile = fileList
    },
    uploadDisabled0: function () {
      return this.forma.imgUrlFile.length > 2
    },
    handlePictureCardPreview0 (file) {
      this.dialogImageUrl0 = file.url
      this.dialogVisible0 = true
    },
    handleAvatarSuccess0 (res, file) {
      this.forma.imgUrlFile.push(file.response.data)
    },
    handleAbnormalFee () {

      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要查看的数据',
          type: 'warn',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        if (Number(this.multipleSelection[0].needPayStatus) < 5) {
          let obj = {
            id: this.multipleSelection[0].orderId
          }
          // router.push({ path: '/orderCenter/abnormalCost', query: obj })
          this.menuItem = window.sessionStorage.getItem('menu')
          if (this.menuItem.indexOf('/orderCenter/abnormalCost') !== -1) {
            router.push({ path: '/orderCenter/abnormalCost', query: obj })
          } else {
            this.$notify({
              title: '提示',
              message: '抱歉，您没有\'异常费用\'的权限！请联系管理员开通',
              type: 'warning',
              duration: 2000
            })
          }
        } else {
          this.$notify.error('只能新增未结算状态的订单，请重新选择')
        }
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行新增异常费用',
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
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        router.push({
          path: '/order/orderManager',
          query: { orderId: this.multipleSelection[0].orderId, aa: 1 }
        })
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行修改',
          type: 'error',
          duration: 2000
        })
      }
    },

    handleAddAbnormal (row) {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要添加异常费用的数据',
          type: 'warn',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        this.dialogShortMessage1 = true
        const row = this.multipleSelection[0]
        this.forma.orderId = row.orderId
        row.arrivalAdds.forEach(item => {
          item.plateNumber = row.ordCommonTruck.plateNumber
        })
        this.shortMsgList = row.arrivalAdds
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行添加',
          type: 'error',
          duration: 2000
        })
      }
    },

    cancel (formName) {
      this.dialogShortMessage1 = false
      const set = this.$refs
      set[formName].resetFields()
    },
    exceptionFeeTypeList () {
      exceptionFeeType().then(response => {
        debugger
        this.exceptionFeeTypeReq = response.data
      })
    },
    create (formName) {
      debugger
      console.log(this.forma)
      const set = this.$refs
      // this.forma.isTrust = '0'
      set[formName].validate(valid => {
        if (valid) {
          console.log(this.forma.orderId)
          debugger
          addObjYC(this.forma)
            .then((res) => {
              if (res.data.data) {
                this.dialogShortMessage1 = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '添加异常费用成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$message.error(res.data.msg)
              }
            })
        } else {
          this.$message.error('必填项不能为空')
          return false
        }
      })
    },
    handleSubmitDD (row) {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要提交的数据',
          type: 'warn',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        let status = false
        let orderId = ''
        if (this.multipleSelection[0].status === '11') {
          orderId = this.multipleSelection[0].orderId
          status = true
        }
        let str = {
          orderId: orderId
        }
        if (status) {
          debugger
          this.$confirm('是否要提交订单数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            SubmitObj(orderId).then(response => {
              console.log(response)
              if (response.data.data) {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '提交成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify.error('提交失败，请重新提交')
              }
            })
          })
        } else {
          this.$notify.error('只能提交已还箱状态的订单，请重新选择')
        }
      }
    },
    goYcfee (obj) {
      router.push({
        path: '/orderCenter/abnormalCost',
        query: { orderId: obj.orderId }
      })
    },
    goYcCondition (obj) {
      router.push({ path: '/orderCenter/abnormalSituation', query: { orderId: obj.orderId } })
    },
    checktoDate () {
      getTime()
    },
    sendMsg: function (row) {
      let resObj = {
        orderId: row.orderId,
        driverId: row.driverId
      }
      sendDriverObj(resObj).then(res => {
        if (res.data) {
          this.$notify({
            title: '成功',
            message: '发送成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        }
      })
    },
    truckList () {
      truck_attribute().then(response => {
        this.CarType = response.data
      })
    },
    orderStatusList () {
      order_status().then(response => {
        var arr = response.data
        for (let item in arr) {
          if (arr[item].label != '草稿') {
            this.OrderStatus.push(arr[item])
          }
        }
      })
    },
    orderTypeList () {
      order_type().then(response => {
        this.OrderType = response.data
      })
    },
    getList () {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
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
    handleExp () {
      let str = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (i === this.multipleSelection.length - 1) {
          str += this.multipleSelection[i].orderId
        } else {
          str += this.multipleSelection[i].orderId + ','
        }
      }
      this.listQuery.orderIds = str
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '警告',
          message: '选择导出的数据',
          type: 'warning',
          duration: 2000
        })
      } else {
        expObj(this.listQuery).then(response => {
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

          downloadElement.download = nowDate + '-订单信息.xls' // xxx.xls/xxx.xlsx
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
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleBeforeDelete () {
      this.centerDialogVisible = false
      //  this.handleDelete()
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
        var arrStr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arrStr.push(this.multipleSelection[i].orderId)
          var numBool = 0
          if (
            this.multipleSelection[i].status == '0' ||
            this.multipleSelection[i].status == '1' ||
            this.multipleSelection[i].status == '2' ||
            this.multipleSelection[i].status == '3' ||
            this.multipleSelection[i].status == '4' ||
            this.multipleSelection[i].status == '5' ||
            this.multipleSelection[i].status == '6'
          ) {
            numBool++
          }
        }
        if (numBool != this.multipleSelection.length) {
          this.$notify({
            title: '提示',
            message: '抱歉，已提货的订单不支持删除操作',
            type: 'warning',
            duration: 2000
          })
        } else {
          str = arrStr.join(',')
          delObj(str).then(response => {
            this.dialogFormVisible = false
            this.getList()
            if (response.data.data) {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '提示',
                message: response.data.msg,
                type: 'warning',
                duration: 2000
              })
            }
          })
        }
      }
    },
    handleDetail () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要查看的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        var obj = this.multipleSelection[0].orderId
        this.handleDetail1(obj)
      } else {
        this.$notify({
          title: '提示',
          message: '抱歉，请选择一条信息进行查看',
          type: 'warning',
          duration: 2000
        })
      }
    },
    handleExcetion () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要上报异常的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        if (this.multipleSelection[0].status != '11') {
          var obj = this.multipleSelection[0].orderId

          if (this.multipleSelection[0].upstreamId != undefined) {
            this.exceptionDialog = true
            this.exceptionObj = {
              carrier: this.multipleSelection[0].carrier,
              ccmCarryDay: this.multipleSelection[0].upstreamYcDay,
              ccmCarryPrice: this.multipleSelection[0].upstreamYcPrice,
              ccmExceptionFees: this.multipleSelection[0].upstreamReportFee,
              ccmExceptionDetails: this.multipleSelection[0].upstreamRemark,
              orderId: this.multipleSelection[0].orderId,
              plateNumber: this.multipleSelection[0].plateNumber,
              upstreamId: this.multipleSelection[0].upstreamId
            }
          } else {
            this.$notify({
              title: '提示',
              message: '抱歉，只有上游订单可以执行此操作',
              type: 'warning',
              duration: 2000
            })
          }
        } else {
          this.$notify({
            title: '提示',
            message: '订单已还箱，不支持当前操作',
            type: 'warning',
            duration: 2000
          })
        }
      } else {
        this.$notify({
          title: '提示',
          message: '抱歉，请选择一条信息进行上报',
          type: 'warning',
          duration: 2000
        })
      }
    },
    cancelException () {
      this.exceptionDialog = false
      this.exceptionObj = {
        carrier: null,
        ccmCarryDay: null,
        ccmCarryPrice: null,
        ccmExceptionFees: null,
        ccmExceptionDetails: null,
        orderId: null,
        plateNumber: null,
        upstreamId: null
      }
    },
    handleExceptionjs () {
      upStream(this.exceptionObj).then(res => {
        if (res.data.data) {
          this.exceptionDialog = false
          this.$notify({
            title: '提示',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          this.exceptionDialog = false
          this.$notify({
            title: '提示',
            message: '操作失败',
            type: 'error',
            duration: 2000
          })
          this.getList()
        }
      })
    },
    handleOpenShortMsg () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要短信重发的订单',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        this.dialogShortMessage = true
        this.multipleSelection[0].arrivalAdds.forEach(item => {
          item.plateNumber = this.multipleSelection[0].plateNumber
        })
        this.shortMsgList = this.multipleSelection[0].arrivalAdds
      } else {
        this.$notify({
          title: '提示',
          message: '抱歉，请选择一条订单',
          type: 'warning',
          duration: 2000
        })
      }
    },
    handleSendDriver (row) {
      const obj = {
        sort: row.sort,
        phone: row.contactsPhone,
        plateNumber: row.plateNumber,
        orderId: row.orderId
      }
      smsSendAgain(obj).then(response => {
        if (response.data.data) {
          this.$notify({
            title: '成功',
            message: '发送成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '失败',
            message: response.data.msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // handleSend() {
    //   if (this.multipleSelection.length === 0) {
    //     this.$notify({
    //       title: '提示',
    //       message: '请选择要短信重发的订单',
    //       type: 'warning',
    //       duration: 2000
    //     })
    //   } else if (this.multipleSelection.length === 1) {
    //     if (
    //       this.multipleSelection[0].receiptCode != null &&
    //       this.multipleSelection[0].receiptCode != ''
    //     ) {
    //       smsSendAgain(this.multipleSelection[0].orderId).then(res => {
    //         if (res.data.data) {
    //           this.$notify({
    //             title: '提示',
    //             message: '操作成功',
    //             type: 'success',
    //             duration: 2000
    //           })
    //         } else {
    //           this.$notify({
    //             title: '提示',
    //             message: res.data.msg,
    //             type: 'warning',
    //             duration: 2000
    //           })
    //         }
    //       })
    //     } else {
    //       this.$notify({
    //         title: '提示',
    //         message: '抱歉，验证码为空，不支持当前操作',
    //         type: 'warning',
    //         duration: 2000
    //       })
    //     }
    //   } else {
    //     this.$notify({
    //       title: '提示',
    //       message: '抱歉，请选择一条订单',
    //       type: 'warning',
    //       duration: 2000
    //     })
    //   }
    // },

    handleDetail1 (obj) {
      this.orderDetailId = obj
      this.dialogVisible = true
    },

    handleOpenMap () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要查看的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        this.getGpsPoints(this.multipleSelection[0].orderId)
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行查看',
          type: 'error',
          duration: 2000
        })
      }
    },
    getGpsPoints (orderIdObj) {
      getGpsmsg(orderIdObj).then(response => {
        if (response.data.gps === '' || response.data.gps === null || response.data.gps === undefined || response.data.gps.length === 0) {
          this.$notify({
            title: '警告',
            message: '暂无车辆GPS导航数据',
            type: 'warning',
            duration: 2000
          })
        } else {
          this.polylinePath = []
          this.polylinePath = response.data.gps.map(o => {
            return { 'lat': Number(o.lat), 'lng': Number(o.lon) }
          })
          this.infoWindow.orderId = '订单号:' + this.multipleSelection[0].morderId
          this.infoWindow.plateNumber = '车牌号:' + response.data.plateNumber
          this.infoWindow.orderStatus = '状态:' + response.data.status
          this.infoWindow.address = '订单位置:' + response.data.address
          if (response.data.time.length > 19) {
            this.infoWindow.time = '位置更新时间:' + response.data.time.substring(0, 10) + '--' + response.data.time.substring(12, 19)
          }
          this.dialogMapVisible = true
          this.play = true
        }
      })
    },
    updatePolylinePath (e) {
      this.polylinePath = e.target.getPath()
    },
    infoWindowClose (e) {
      this.infoWindow.show = false
    },
    infoWindowOpen (e) {
      this.infoWindow.show = true
    },
    reset () {
      this.play = false
    }
  }
}
</script>
<style>
.c_dialog80 .el-dialog {
  width: 80% !important;
  margin-top: 4vh !important;
  margin-left: 26vh;
  min-width: 1200px;
}

.c_dialog80 .el-dialog__header {
  padding: 0;
}

.bigButton {
  padding: 10px 50px;
}

.css_click {
  color: #2d8cf0;
  padding-bottom: 10px;
  cursor: pointer;
  text-decoration-line: underline;
}

.map {
  width: 100%;
  height: 800px;
}

.h5css1 {
  height: 35px;
  line-height: 35px;
  font-size: 24px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;
}

.demo-table-expand .el-form-item__label {
  color: #99a9bf;
}
</style>
