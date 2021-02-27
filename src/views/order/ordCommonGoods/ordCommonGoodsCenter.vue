<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form class="filter-item"
               label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item class="filter-item"
                          label="订单号">
              <el-input @keyup.enter.native="handleFilter"
                        class="filter-item"
                        placeholder="订单号"
                        style="width: 200px;"
                        v-model="listQuery.orderId">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="filter-item"
                          label="客户名称">
              <el-select @change="handleFilter"
                         @keyup.enter.native="handleFilter"
                         class="filter-item"
                         clearable
                         filterable
                         placeholder="请选择"
                         v-model="listQuery.customerId">
                <el-option :key="item.customerId"
                           :label="item.customerName"
                           :value="item.customerId"
                           v-for="item in allCustomerReq">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="filter-item"
                          label="订单状态">
              <el-select @change="handleFilter"
                         @keyup.enter.native="handleFilter"
                         class="filter-item"
                         clearable
                         filterable
                         placeholder="请选择"
                         v-model="listQuery.status">
                <el-option :key="item.value"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in orderStatusReq">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="filter-item"
                          label="派车日期">
              <el-col :span="11">
                <el-date-picker format="yyyy 年 MM 月 dd 日"
                                placeholder="选择日期"
                                style="width: 100%;"
                                type="date"
                                v-model="listQuery.fromDate"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
              <el-col :span="2"
                      align="center"
                      class="line">--
              </el-col>
              <el-col :span="11">
                <el-date-picker format="yyyy 年 MM 月 dd 日"
                                placeholder="选择日期"
                                style="width: 100%;"
                                type="date"
                                v-model="listQuery.toDate"
                                value-format="yyyy-MM-dd"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div>
        <el-button @click="handleShowDetail"
                   class="filter-item"
                   icon="search"
                   size="mini"
                   type="primary"
                   v-waves>查看
        </el-button>
        <el-button @click="handleExport"
                   class="filter-item"
                   icon="edit"
                   size="mini"
                   style="margin-left: 10px;"
                   type="primary">导出
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
                   v-waves>查看轨迹
        </el-button>
        <el-button @click="handleDelete"
                   class="filter-item"
                   icon="edit"
                   size="mini"
                   style="margin-left: 10px;"
                   type="primary"
                   v-if="ord_common_goods_del">删除
        </el-button>

        <el-button class="filter-item"
                   @click="handleUpdate"
                   icon="search"
                   size="mini"
                   type="primary"
                   v-waves>编辑
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

        <!--<el-button @click="handleAbnormalFee"-->
        <!--class="filter-item"-->
        <!--icon="edit"-->
        <!--size="mini"-->
        <!--style="margin-left: 10px;"-->
        <!--type="primary"-->
        <!--v-if="ord_common_goods_del">添加异常费用-->
        <!--</el-button>-->
      </div>
    </div>
    <el-table :data="list"
              :key='tableKey'
              @selection-change="handleSelectionChange"
              border
              element-loading-text="给我一点时间"
              fit
              highlight-current-row
              style="width: 100%"
              v-loading="listLoading">
      <el-table-column fixed
                       type="selection"
                       width="55">
      </el-table-column>
      <el-table-column type="expand"
                       fixed>
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="制单人员:">
                  <span>{{ props.row.createBy }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="总体积:">
                  <span>{{ props.row.sumVolume }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="总重量:">
                  <span>{{ props.row.sumWeight }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="下单时间:">
                  <span>{{ props.row.createTime | moment('YYYY-MM-DD')}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="司机位置记录:">
                  <span v-if="props.row.status === '3'">{{ props.row.driverAddress }}</span>
                  <span v-if="props.row.status === '4'">{{ props.row.driverAddress }}</span>
                  <span v-if="props.row.status === '5'">{{ props.row.driverAddress }}</span>
                  <span v-if="props.row.status === '6'">{{ props.row.driverAddress }}</span>
                  <span v-if="props.row.status === '7'">{{ props.row.driverAddress }}</span>
                  <span v-if="props.row.status === '8'">{{ props.row.driverAddress }}</span>
                  <span v-if="props.row.status === '9'">已签收</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="备注:">
                  <span v-if="props.row.ordCommonTruck !== null">{{ props.row.ordCommonTruck.remarks }}</span>
                  <span v-else></span>
                </el-form-item>
              </el-col>
            </el-row>
            <template v-if="props.row.pickupAdds">
              <template v-for="itemArr in props.row.pickupAdds">
                <el-col :span="7"
                        :offset="3">
                  <el-form-item label="发货人:">
                    <span>{{ itemArr.contacts }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="发货人电话:">
                    <span>{{ itemArr.contactsPhone }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="发货人地址:">
                    <span>{{ itemArr.addressDetailPlace }}</span>
                  </el-form-item>
                </el-col>
              </template>
            </template>
            <template v-if="props.row.arrivalAdds">
              <template v-for="itemArr in props.row.arrivalAdds">
                <el-col :span="6">
                  <el-form-item label="收货人:">
                    <span>{{ itemArr.contacts }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="收货人电话:">
                    <span>{{ itemArr.contactsPhone }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="收货人地址:">
                    <span>{{ itemArr.addressDetailPlace }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="短信发送状态:">
                    <span v-if="itemArr.isSendOk === '1'">已发送</span>
                    <span v-else>未发送</span>
                  </el-form-item>
                </el-col>
              </template>
            </template>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="异常原因:">
                  <span v-if="props.row.ifEx === '0' ">无异常</span>
                  <span v-if="props.row.ifEx === '1' ">
                    <div @click="YCFee(props.row)"
                         class="css_click">异常费用</div>
                  </span>
                  <span v-if="props.row.ifEx === '2' ">
                    <div @click="YCCondition(props.row)"
                         class="css_click">异常情况</div>
                  </span>
                  <span v-if="props.row.ifEx === '3' ">
                    <div @click="YCFee(props.row)"
                         class="css_click">异常费用</div>
                    <div @click="YCCondition(props.row)"
                         class="css_click">异常情况</div>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       fixed
                       label="订单号">
        <template slot-scope="scope">
          <span @click="handleShowDetailByLink(scope.row.id)"
                class="C_Link">{{ scope.row.morderId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       fixed
                       label="订单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '1'">待派车</span>
          <span v-if="scope.row.status === '2'">待接单</span>
          <span v-if="scope.row.status === '3'">待提箱</span>
          <span v-if="scope.row.status === '4'">提箱中</span>
          <span v-if="scope.row.status === '5'">待提货</span>
          <span v-if="scope.row.status === '6'">提货中</span>
          <span v-if="scope.row.status === '7'">运输中</span>
          <span v-if="scope.row.status === '8'">签收中</span>
          <span v-if="scope.row.status === '9'">已签收</span>
          <span v-if="scope.row.status === '10'">还箱中</span>
          <span v-if="scope.row.status === '11'">已还箱</span>
          <span v-if="scope.row.status === '12'">已提交</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       fixed
                       label="客户名称">
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="制单人员">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.docOperator }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="发货城市">
        <template slot-scope="scope">
          <span>{{scope.row.sendGoodsPlace}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="收货城市">
        <template slot-scope="scope">
          <span>{{scope.row.pickGoodsPlace}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="计费里程">
        <template slot-scope="scope">
          <span>{{ scope.row.mchargedMileage }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="总体积">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.sumVolume }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="总重量">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.sumWeight }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="车牌号">
        <template slot-scope="scope">
          <template v-if="scope.row.ordCommonTruck !== null">
            <span>{{ scope.row.ordCommonTruck.plateNumber }}</span>
          </template>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="下单时间">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.createTime | moment('YYYY-MM-DD')}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="发货人">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.shipper }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="司机位置记录" width="180">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.status === '3'">{{ scope.row.driverAddress }}</span>-->
      <!--<span v-if="scope.row.status === '4'">{{ scope.row.driverAddress }}</span>-->
      <!--<span v-if="scope.row.status === '5'">{{ scope.row.driverAddress }}</span>-->
      <!--<span v-if="scope.row.status === '6'">{{ scope.row.driverAddress }}</span>-->
      <!--<span v-if="scope.row.status === '7'">{{ scope.row.driverAddress }}</span>-->
      <!--<span v-if="scope.row.status === '8'">{{ scope.row.driverAddress }}</span>-->
      <!--<span v-if="scope.row.status === '9'">已签收</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="是否异常">
        <template slot-scope="scope">
          <span v-if="scope.row.ifEx === '0' ">否</span>
          <span v-if="scope.row.ifEx === '1' ">是</span>
          <span v-if="scope.row.ifEx === '2' ">是</span>
          <span v-if="scope.row.ifEx === '3' ">是</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="异常原因">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.ifEx === '0' ">无异常</span>-->
      <!--<span v-if="scope.row.ifEx === '1' "><div @click="YCFee(scope.row)" class="css_click">异常费用</div></span>-->
      <!--<span v-if="scope.row.ifEx === '2' "><div @click="YCCondition(scope.row)" class="css_click">异常情况</div></span>-->
      <!--<span v-if="scope.row.ifEx === '3' "><div @click="YCFee(scope.row)" class="css_click">异常费用</div><div-->
      <!--@click="YCCondition(scope.row)" class="css_click">异常情况</div></span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="短信服务码"  width="180">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.shipper }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="短信发送状态"  width="180">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.shipper }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="备注">-->
      <!--<template slot-scope="scope">-->
      <!--<template v-if="scope.row.ordCommonTruck !== null">-->
      <!--<span v-if="scope.row.ordCommonTruck.remarks !== null">{{ scope.row.ordCommonTruck.remarks }}</span>-->
      <!--<span v-else></span>-->
      <!--</template>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       fixed="right"
                       label="发送操作"
                       width="100">
        <!--@click="handleSendDriver()"-->
        <template slot-scope="scope">
          <el-button @click="handleOpenShortMsg(scope.row)"
                     size="small"
                     type="success">短信重发
          </el-button>
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
                     layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible"
               center
               class="c_dialog80">
      <goodsCenterDialog :centerData="centerData"></goodsCenterDialog>
      <span class="dialog-footer"
            slot="footer">
        <el-button @click="dialogVisible = false"
                   class="bigButton "
                   size="medium"
                   type="primary">关 闭</el-button>
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
      <el-form ref="form"
               :model="form"
               label-width="100px"
               class="filter-item">

        <el-form-item label="订单号 "
                      class="">
          <el-input v-model="form.orderId"
                    :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="异常类型 "
                      class="">
          <el-select class=""
                     filterable
                     placeholder="请选择"
                     clearable
                     v-model="form.exceptionFeeType"
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
          <el-input v-model="form.exceptionFee"
                    placeholder="异常费用"></el-input>
        </el-form-item>
        <el-form-item label="备注"
                      prop="remark">
          <el-input v-model="form.remark"
                    placeholder="备注"></el-input>
        </el-form-item>
        <!-- //:headers="headers" -->
        <div class="flexItem cm20">
          <div class="flexItems">
            <el-upload :class="{disabled:uploadDisabled0}"
                       :file-list="form.licensePhotoArr"
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
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary"
                   @click="create('form')">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  delObj,
  SubmitObj,
  addObjYC,
  ExportPHCenterObj,
  fetchCenterList,
  getallCustomerObj,
  getDetailByIdObj,
  getGPSObj,
  order_status,
  smsSendAgainObj
} from '@/api/ordCommonGoods'
import goodsCenterDialog from './goodsCenterDialog.vue'
import waves from '@/directive/waves/index.js' // 水波纹指令
import router from '@/router/router'
import { mapGetters } from 'vuex'
import { BmlLushu } from 'vue-baidu-map'
import { exceptionFeeType } from '@/api/ord_exception_fee'
import { debuglog, debug } from 'util';
// import { getToken } from '@/util/auth'

export default {
  components: {
    BmlLushu,
    goodsCenterDialog
  },
  data () {
    return {
      ord_common_goods_del: false,
      list: null,
      total: null,
      listLoading: true,
      dialogVisible: false,
      dialogVisible0: false,
      listQuery: {
        page: 1,
        limit: 20,
        status: this.$route.query.status
      },
      form: {
        orderId: '',
        exceptionFeeType: '',
        exceptionFee: '',
        remark: '',
        imgUrlFile: [],
        licensePhotoArr: []
      },
      rules: {
        exceptionFeeType: [
          { required: true, message: '请输入异常费用类型', trigger: 'change' }
        ],
        exceptionFee: [
          { required: true, message: '请输入异常费用', trigger: 'input' }
        ]
      },
      // form: {

      // },
      // headers: {
      //   Authorization: 'Bearer ' + getToken()
      // },
      ord_common_goods_upd: false,
      tableKey: 0,
      centerData: {},
      orderStatusReq: [],
      multipleSelection: [],
      dialogMapVisible: false,
      dialogShortMessage: false,
      dialogShortMessage1: false,
      dialogImageUrl0: false,
      shortMsgList: [],
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
      allCustomerReq: [],
      exceptionFeeTypeReq: [],
      menuItem: []
    }
  },
  computed: {
    ...mapGetters([
      'permissions'
    ]),
    uploadDisabled0: function () {
      return this.form.imgUrlFile.length > 2
    }
  },
  directives: {
    waves
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
    this.ord_common_goods_del = this.permissions['ord_common_goods_del']
    this.getList()
    this.ord_common_goods_upd = this.permissions['ord_common_goods_upd']
    this.ord_common_goods_del = this.permissions['ord_common_goods_del']
    this.hanleGetOrderStatus()
    this.hanleAllCustomer()
    this.exceptionFeeTypeList()
  },
  methods: {
    hanleGetOrderStatus () {
      order_status().then(res => {
        this.orderStatusReq = res.data
      })
    },
    hanleAllCustomer () {
      getallCustomerObj().then(res => {
        this.allCustomerReq = res.data
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    getList () {
      this.listLoading = false
      fetchCenterList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    exceptionFeeTypeList () {
      exceptionFeeType().then(response => {
        this.exceptionFeeTypeReq = response.data
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
    handleFilter () {
      this.listQuery.page = 1
      this.getList()
    },
    handleOpenShortMsg (row) {
      console.log(row.ordCommonTruck.plateNumber)
      this.dialogShortMessage = true
      row.arrivalAdds.forEach(item => {
        item.plateNumber = row.ordCommonTruck.plateNumber
      })
      this.shortMsgList = row.arrivalAdds
    },
    handleSendDriver (row) {
      const obj = {
        sort: row.sort,
        phone: row.contactsPhone,
        plateNumber: row.plateNumber,
        orderId: row.orderId
      }
      smsSendAgainObj(obj).then(response => {
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
    handleShowDetail (row) {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要查看的数据',
          type: 'warn',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        getDetailByIdObj(this.multipleSelection[0].id).then(res => {
          this.centerData = res.data.data
          this.dialogVisible = true
        })
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行查看',
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
        this.form.orderId = row.morderId
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

    create (formName) {
      console.log(this.form.exceptionFee)
      const set = this.$refs
      this.form.isTrust = '0'
      set[formName].validate(valid => {
        if (valid) {
          debugger
          alert(111)
          console.log(this.form)
          addObjYC(this.form)
            .then((res) => {
              if (res.data.data) {
                this.dialogShortMessage1 = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '添加成功',
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

    //上传凭证
    handleRemove0 (file, fileList) {
      this.form.imgUrlFile = fileList
    },
    handlePictureCardPreview0 (file) {
      this.dialogImageUrl0 = file.url
      this.dialogVisible0 = true
    },
    handleAvatarSuccess0 (res, file) {
      this.form.imgUrlFile.push(file.response.data)
    },

    handleShowDetailByLink (id) {
      getDetailByIdObj(id).then(res => {
        this.centerData = res.data.data
        this.dialogVisible = true
      })
    },
    handleUpdate () {
      debugger
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要修改的数据',
          type: 'warn',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        router.push({ path: '/order/ordCommonGoods', query: { id: this.multipleSelection[0].id, aa: 1 } })
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行修改',
          type: 'error',
          duration: 2000
        })
      }
    },

    YCFee (row) {
      // router.push({ path: '/orderCenter/abnormalCost' })
      this.menuItem = window.sessionStorage.getItem('menu')
      if (this.menuItem.indexOf('/orderCenter/abnormalCost') !== -1) {
        router.push({ path: '/orderCenter/abnormalCost' })
      } else {
        this.$notify({
          title: '提示',
          message: '抱歉，您没有\'异常费用\'的权限！请联系管理员开通',
          type: 'warning',
          duration: 2000
        })
      }
    },

    YCCondition (row) {
      // router.push({ path: '/orderCenter/abnormalSituation' })
      this.menuItem = window.sessionStorage.getItem('menu')
      if (this.menuItem.indexOf('/orderCenter/abnormalSituation') !== -1) {
        router.push({ path: '/orderCenter/abnormalSituation' })
      } else {
        this.$notify({
          title: '提示',
          message: '抱歉，您没有\'异常情况\'的权限！请联系管理员开通',
          type: 'warning',
          duration: 2000
        })
      }
    },
    handleExport () {
      let str = ''
      if (this.multipleSelection.length !== 0) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          str += this.multipleSelection[i].id + ','
        }
        str = str.substring(0, str.length - 1)
        ExportPHCenterObj(str).then(response => {
          const blob = new Blob([response.data])
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
          const fileName = nowDate + '-普货订单信息.xls'
          const elink = document.createElement('a')
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
          title: '提示',
          message: '请选择要导出的数据',
          type: 'warning',
          duration: 2000
        })
      }
    },
    handleOpenMap () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要查看的数据',
          type: 'warn',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        this.listLoading = true
        // this.multipleSelection[0].orderId CN201901300900001
        getGPSObj(this.multipleSelection[0].morderId).then(response => {
          this.listLoading = false
          if (response.data.gps === '' || response.data.gps === null || response.data.gps === undefined || response.data.gps.length === 0) {
            this.$notify({
              title: '提示',
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
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行查看',
          type: 'error',
          duration: 2000
        })
      }
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
    },
    handleDelete (row) {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要删除的数据',
          type: 'warn',
          duration: 2000
        })
      } else {
        const str = {}
        let status = true
        for (let i = 0; i < this.multipleSelection.length; i++) {
          str[this.multipleSelection[i].id] = this.multipleSelection[i].morderId
          if (this.multipleSelection[i].status === '2') {
            status = false
          }
        }
        if (status) {
          this.$confirm('是否要删除订单数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delObj(str).then(response => {
              if (response.data.data) {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify.error('删除失败，请重新删除')
              }
            })
          })
        } else {
          this.$notify.error('只能删除接单状态的订单，请重新选择')
        }
      }
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
          orderId = this.multipleSelection[0].morderId
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
          this.$notify.error('只能提交已完成状态的订单，请重新选择')
        }
      }
    },
    handleAbnormalFee () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要添加异常费用的数据',
          type: 'warn',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        if (Number(this.multipleSelection[0].ordCommonTruck.needPayStatus) < 5) {
          const obj = {
            id: this.multipleSelection[0].morderId
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

.C_Link {
  color: #2866bd;
}

.C_Link:hover {
  text-decoration: underline;
  color: #2866bd;
  cursor: pointer;
}

.C_Link:visited {
  color: #660099;
}

.map {
  width: 100%;
  height: 800px;
}

.mapDialog .el-dialog {
  margin-top: 3vh !important;
}

.demo-table-expand .el-form-item__label {
  color: #99a9bf;
}
.flexItem {
  margin-top: 20px;
  display: flex;
}

.flexItems {
  flex: 1;
  text-align: center;
}

.cm20 {
  padding-bottom: 20px;
}
</style>
