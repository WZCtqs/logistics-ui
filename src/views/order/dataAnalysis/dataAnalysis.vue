<template>
  <div class="pull-chheight wel-contailer">
    <el-row>
      <el-col :span="8"
              class="p2em">
        <el-card class="box-card"
                 shadow="hover">
          <div slot="header"
               class="clearfix">
            <span class="title">今日应收应付款</span>
          </div>
          <div class="cardBody">
            <div class="cardBodyItem"
                 @click="CWYS">
              <div class="cardBodyItemTop">￥{{meetMoney}}</div>
              <div class="cardBodyItemBottom">应收</div>
            </div>
            <div class="cardBodyItem"
                 @click="CWYF">
              <div class="cardBodyItemTop">￥{{receiveMoney}}</div>
              <div class="cardBodyItemBottom">应付</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"
              class="p2em">
        <el-card class="box-card"
                 shadow="hover">
          <div slot="header"
               class="clearfix">
            <span class="title">普货订单</span>
          </div>
          <div class="cardBody">
            <div class="cardBodyItem"
                 @click="PHTH">
              <div class="cardBodyItemTop">{{GoodsOrderPickingUpGoods}}</div>
              <div class="cardBodyItemBottom">提货订单数</div>
            </div>
            <div class="cardBodyItem"
                 @click="PHZT">
              <div class="cardBodyItemTop">{{GoodsOrderOnTheWay}}</div>
              <div class="cardBodyItemBottom">在途订单数</div>
            </div>
            <div class="cardBodyItem"
                 @click="PHQS">
              <div class="cardBodyItemTop">{{GoodsOrderSignIn}}</div>
              <div class="cardBodyItemBottom">签收订单数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"
              class="p2em notice">
        <el-card class="box-card"
                 shadow="hover">
          <div slot="header"
               class="clearfix">
            <span class="title">消息通知</span>
          </div>
          <div class="noticeBody">
            <span class="listContent"
                  v-for="item in list"
                  :data="list"
                  v-if="list.length != 0">
              <el-tag type="success"
                      size="mini"
                      v-if="item.type === '个人'">个人</el-tag>
              <el-tag size="mini"
                      v-if="item.type === '0'">{{item.driverName}}</el-tag>
              <el-tag type="info"
                      size="mini"
                      v-if="item.type === '公共'">公共</el-tag>
              <el-tag type="warning"
                      size="mini"
                      v-if="item.type === '客服'">客服</el-tag>
              <span class="itemContent"
                    @click="showNoticeDetail(item)">{{ item.title }}</span>
            </span>
            <div v-if="list.length === 0">
              <i class="icon-zanwuxiaoxi1 cnoMessage"></i>
              <div class="cnoMessageContent">暂无消息</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24"
              class="p2em">
        <el-card class="box-card"
                 shadow="hover">
          <div slot="header"
               class="clearfix">
            <span class="title">集装箱订单</span>
          </div>
          <div class="cardBody">
            <div class="cardBodyItem"
                 @click="JZXJH">
              <div class="cardBodyItemTop">{{orderStatuspLan}}</div>
              <div class="cardBodyItemBottom">计划中订单数</div>
            </div>
            <div class="cardBodyItem"
                 @click="JXZQR">
              <div class="cardBodyItemTop">{{orderStatuscFmd}}</div>
              <div class="cardBodyItemBottom">待提货订单数</div>
            </div>
            <div class="cardBodyItem"
                 @click="JZXTH">
              <div class="cardBodyItemTop">{{orderStatusPickingupgoods}}</div>
              <div class="cardBodyItemBottom">提货中订单数</div>
            </div>
            <div class="cardBodyItem"
                 @click="JZXZT">
              <div class="cardBodyItemTop">{{orderStatusontheway}}</div>
              <div class="cardBodyItemBottom">在途订单数</div>
            </div>
            <div class="cardBodyItem"
                 @click="jZXQS">
              <div class="cardBodyItemTop">{{orderStatussignin}}</div>
              <div class="cardBodyItemBottom">签收中订单数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"
              class="p2em chartCard">
        <el-card class="box-card"
                 shadow="hover">
          <div slot="header"
               class="clearfix">
            <span class="title">今日开单数</span>
          </div>
          <div id="myChart"
               class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="8"
              class="p2em chartCard">
        <el-card class="box-card"
                 shadow="hover">
          <div slot="header"
               class="clearfix">
            <span class="title">七日内订单统计</span>
          </div>
          <div id="myChartOrder"
               class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="8"
              class="p2em chartCard">
        <el-card class="box-card"
                 shadow="hover">
          <div slot="header"
               class="clearfix">
            <span class="title">七日内营业额统计</span>
          </div>
          <div id="myChartTurnOver"
               class="chart"></div>
        </el-card>
      </el-col>
      <el-col :span="24"
              class="p2em chartCardMap">
        <el-card class="box-card"
                 shadow="hover">
          <div slot="header"
               class="clearfix">
            <span class="title">在途车辆位置信息</span>
          </div>
          <div id="myChartMap"
               class="chart"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="30%">
      <span>{{dialogContent}}</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getToken, removeToken, setToken } from '@/util/auth'
  import { mapGetters } from 'vuex'
  import router from '@/router/router'
  import {
    get2Checked,
    getCountByGoodsOrderStatus,
    getCountByOrderStatus,
    getCountMoneyStatus,
    getcountOrderNumber,
    getCountOrders,
    getcountTodayMoney,
    getlistAllNoChecked,
    getSelectLogistics
  } from '@/api/dataAnalysis'

  export default {
    name: 'wel',
    data() {
      return {
        activeNames: ['1', '2', '3', '4'],
        count: 0,
        isText: false,
        dialogVisible: false,
        list: [],
        // 普货
        GoodsOrderPickingUpGoods: '',
        GoodsOrderOnTheWay: '',
        GoodsOrderSignIn: '',
        // 集装箱
        orderStatuspLan: '',
        orderStatuscFmd: '',
        orderStatusPickingupgoods: '',
        orderStatusontheway: '',
        orderStatussignin: '',
        // 开单数
        CountOrdersCommonOrders: '',
        CountOrdersCountShortOrders: '',
        CountOrdersOrders: '',
        dialogTitle: '',
        dialogContent: '',
        meetMoney: '',
        receiveMoney: '',
        menuItem: undefined
      }
    },
    computed: {
      ...mapGetters(['website'])
    },
    created() {
      this.showNoticeDetail()
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        getcountTodayMoney().then(res => {
          this.meetMoney = res.data.meetMoney
          this.receiveMoney = res.data.receiveMoney
        })
        getSelectLogistics().then(res => {
          let dataResMap = res.data
          let data_info = []
          for (let d = 0; d < dataResMap.length; d++) {
            let arr = []
            if (dataResMap[d][0]) {
              arr = [dataResMap[d][0], dataResMap[d][1], '<div class="infoMapCss">经度:' + dataResMap[d][0] + '' +
              ' <br>纬度:' + dataResMap[d][1] + '<br>' + dataResMap[d][2] + '<br>' + dataResMap[d][3] + '<br>' + dataResMap[d][4] + '<br>' + dataResMap[d][5] + '<br>' + dataResMap[d][6] + '</div>']
              data_info.push(arr)
            }
          }
          let map = new BMap.Map('myChartMap')
          map.centerAndZoom(new BMap.Point(116.417854, 39.921988), 5)
          map.enableContinuousZoom()    // 启用地图惯性拖拽，默认禁用
          // var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }) // 左上角，添加比例尺
          // var top_left_navigation = new BMap.NavigationControl()  // 左上角，添加默认缩放平移控件
          var top_right_navigation = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_SMALL
          })
          // map.addControl(top_left_control)
          // map.addControl(top_left_navigation)
          map.addControl(top_right_navigation)
          var opts = {
            width: 250,     // 信息窗口宽度
            height: 230,     // 信息窗口高度
            title: '车辆信息窗口', // 信息窗口标题
            enableMessage: true // 设置允许信息窗发送短息
          }
          for (let i = 0; i < data_info.length; i++) {
            let marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1]))  // 创建标注
            let content = data_info[i][2]
            map.addOverlay(marker)
            // 将标注添加到地图中
            addClickHandler(content, marker)
          }

          function addClickHandler(content, marker) {
            marker.addEventListener('click', function(e) {
              openInfo(content, e)
            })
          }

          function openInfo(content, e) {
            let p = e.target
            let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
            let infoWindow = new BMap.InfoWindow(content, opts)  // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point) // 开启信息窗口
          }
        })
        getCountOrders().then(res => {
          this.CountOrdersCommonOrders = res.data.commonOrders
          this.CountOrdersCountShortOrders = res.data.countShortOrders
          this.CountOrdersOrders = res.data.orders
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          myChart.setOption({
            legend: {},
            tooltip: {},
            dataset: {
              source: [
                ['集装箱', this.CountOrdersOrders],
                ['盘短', this.CountOrdersCountShortOrders],
                ['普货', this.CountOrdersCommonOrders]
              ]
            },
            series: [{
              type: 'pie',
              radius: 65,
              center: ['50%', '60%']
            }]
          })
        })
        // 普货订单
        getCountByGoodsOrderStatus().then(res => {
          this.GoodsOrderPickingUpGoods = res.data.Pickingupgoods
          this.GoodsOrderOnTheWay = res.data.ontheway
          this.GoodsOrderSignIn = res.data.signin
        })
        getCountByOrderStatus().then(res => {
          this.orderStatuspLan = res.data.plan
          this.orderStatuscFmd = res.data.cfmd
          this.orderStatusPickingupgoods = res.data.Pickingupgoods
          this.orderStatusontheway = res.data.ontheway
          this.orderStatussignin = res.data.signin
        })
        // 消息通过
        getlistAllNoChecked().then(res => {
          this.list = res.data
        }).catch(err => {
        })
        let arrDate = []
        let Date1 = new Date()
        let date1Tepm = (Date1.getMonth() + 1) + '-' + Date1.getDate()
        for (let i = 0; i < 7; i++) {
          let data = new Date(Date1.getTime() - 24 * 60 * 60 * 1000 * i)
          let dataTemp = (data.getMonth() + 1) + '-' + data.getDate()
          arrDate.unshift(dataTemp)
        }
        // 七日订单数
        getcountOrderNumber().then(res => {
          let myChartOrder = this.$echarts.init(document.getElementById('myChartOrder'))
          myChartOrder.setOption({
            legend: {
              data: ['集装箱', '盘短', '普货']
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: arrDate
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              name: '集装箱',
              data: res.data.orders,
              type: 'line',
              areaStyle: { normal: {} },
              stack: '总量',
              smooth: true
            }, {
              name: '盘短',
              data: res.data.countShortOrders,
              type: 'line',
              stack: '总量',
              areaStyle: { normal: {} },
              smooth: true
            }, {
              name: '普货',
              data: res.data.commonOrders,
              type: 'line',
              areaStyle: { normal: {} },
              stack: '总量',
              smooth: true
            }]
          })
        })
        getCountMoneyStatus().then(res => {
          let commonOrdersCountMoney = res.data.commonOrders
          let countShortOrdersCountMoney = res.data.countShortOrders
          let ordersCountMoney = res.data.orders
          let myChartTurnOver = this.$echarts.init(document.getElementById('myChartTurnOver'))
          myChartTurnOver.setOption({
            legend: {
              data: ['集装箱', '盘短', '普货']
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: arrDate
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              name: '集装箱',
              data: commonOrdersCountMoney,
              type: 'line',
              areaStyle: { normal: {} },
              stack: '总量',
              smooth: true
            }, {
              name: '盘短',
              data: countShortOrdersCountMoney,
              type: 'line',
              stack: '总量',
              areaStyle: { normal: {} },
              smooth: true
            }, {
              name: '普货',
              data: ordersCountMoney,
              type: 'line',
              areaStyle: { normal: {} },
              stack: '总量',
              smooth: true
            }]
          })
        })
      },
      PHTH() {
        this.menuItem = window.sessionStorage.getItem('menu')
        if (this.menuItem.indexOf('/orderCenter/ordCommonGoodsCenter') !== -1) {
          router.push({ path: '/orderCenter/ordCommonGoodsCenter', query: { status: '6' } })
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，您没有\'普货模块\'的权限！请联系管理员开通',
            type: 'warning',
            duration: 2000
          })
        }
      },
      PHZT() {
        this.menuItem = window.sessionStorage.getItem('menu')
        if (this.menuItem.indexOf('/orderCenter/ordCommonGoodsCenter') !== -1) {
          router.push({ path: '/orderCenter/ordCommonGoodsCenter', query: { status: '7' } })
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，您没有\'普货模块\'的权限！请联系管理员开通',
            type: 'warning',
            duration: 2000
          })
        }
      },
      PHQS() {
        this.menuItem = window.sessionStorage.getItem('menu')
        if (this.menuItem.indexOf('/orderCenter/ordCommonGoodsCenter') !== -1) {
          router.push({ path: '/orderCenter/ordCommonGoodsCenter', query: { status: '8' } })
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，您没有\'普货模块\'的权限！请联系管理员开通',
            type: 'warning',
            duration: 2000
          })
        }
      },
      JZXJH() {
        this.menuItem = window.sessionStorage.getItem('menu')
        if (this.menuItem.indexOf('/order/ordOrder') !== -1) {
          router.push({ path: '/order/ordOrder' })
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，您没有\'集装箱模块\'的权限！请联系管理员开通',
            type: 'warning',
            duration: 2000
          })
        }
      },
      JXZQR() {
        this.menuItem = window.sessionStorage.getItem('menu')
        if (this.menuItem.indexOf('/orderCenter/sendedOrder') !== -1) {
          router.push({ path: '/orderCenter/sendedOrder', query: { status: '5' } })
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，您没有\'集装箱模块\'的权限！请联系管理员开通',
            type: 'warning',
            duration: 2000
          })
        }
      },
      JZXTH() {
        this.menuItem = window.sessionStorage.getItem('menu')
        if (this.menuItem.indexOf('/orderCenter/sendedOrder') !== -1) {
          router.push({ path: '/orderCenter/sendedOrder', query: { status: '6' } })
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，您没有\'集装箱模块\'的权限！请联系管理员开通',
            type: 'warning',
            duration: 2000
          })
        }
      },
      JZXZT() {
        this.menuItem = window.sessionStorage.getItem('menu')
        if (this.menuItem.indexOf('/orderCenter/sendedOrder') !== -1) {
          router.push({ path: '/orderCenter/sendedOrder', query: { status: '7' } })
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，您没有\'集装箱模块\'的权限！请联系管理员开通',
            type: 'warning',
            duration: 2000
          })
        }
      },
      jZXQS() {
        this.menuItem = window.sessionStorage.getItem('menu')
        if (this.menuItem.indexOf('/orderCenter/sendedOrder') !== -1) {
          router.push({ path: '/orderCenter/sendedOrder', query: { status: '8' } })
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，您没有\'集装箱模块\'的权限！请联系管理员开通',
            type: 'warning',
            duration: 2000
          })
        }
      },
      CWYS() {
        this.menuItem = window.sessionStorage.getItem('menu')
        if (this.menuItem.indexOf('/financial/expensesPay') !== -1) {
          router.push({ path: '/financial/expensesPay' })
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，您没有\'财务模块\'的权限！请联系管理员开通',
            type: 'warning',
            duration: 2000
          })
        }
      },
      CWYF() {
        this.menuItem = window.sessionStorage.getItem('menu')
        if (this.menuItem.indexOf('/financial/financialManagement') !== -1) {
          router.push({ path: '/financial/financialManagement' })
        } else {
          this.$notify({
            title: '提示',
            message: '抱歉，您没有\'财务模块\'的权限！请联系管理员开通',
            type: 'warning',
            duration: 2000
          })
        }
      },
      showNoticeDetail(item) {
        get2Checked(item.announcementId).then(res => {
          if (res.data.data) {
            this.dialogVisible = true
            this.dialogTitle = item.title
            this.dialogContent = item.content
            getlistAllNoChecked().then(res => {
              this.list = res.data
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .p2em {
    padding: 1.5em;
  }

  .p2em .el-card__header {
    padding: 0.2em 0em;
  }

  .p2em .title {
    display: block;
    text-align: center;
    line-height: 2;
  }

  .p2em .el-card__body {
    height: 150px;
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
  }

  .chartCard .el-card__body {
    height: 320px;
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
  }

  .chartCardMap .el-card__body {
    height: 400px;
    padding-top: 0;
    padding-right: 0;
    padding-left: 0;
  }

  .notice .el-card__body {
    line-height: 1.5;
  }

  .chartCard .chart,
  .chartCardMap .chart {
    width: 100%;
    height: 100%;
  }

  .p2em .text {
    font-size: 14px;
  }

  .p2em .text:hover {
    cursor: pointer;
    background-color: #f5f7fa;
  }

  .cardBody {
    height: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  .cardBodyItem {
    flex: 1;
  }

  .cardBodyItemTop {
    display: inline-block;
    height: 24px;
    font-size: 24px;
    font-weight: 600;
    line-height: 24px;
    padding-bottom: 24px;
  }

  .cardBodyItemBottom {
    font-size: 14px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .p2em .flexItems {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
  }

  .p2em .flexItems i {
    padding-right: 8px;
  }

  .listContent {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    padding-left: 20px;
  }

  .listContent:first-child {
    padding-top: 12px;
  }

  .infoMapCss {
    font-size: 14px;
    padding-top: 10px;
  }

  .itemContent {
    font-size: 14px;
    cursor: pointer;
  }

  .itemContent:hover {
    text-decoration: underline;
  }

  .cardBodyItem {
    cursor: pointer;
  }

  .cardBodyItem:hover {
    text-decoration: underline;
  }

  .cnoMessage {
    font-size: 60px !important;
    text-align: center;
    width: 100%;
    display: inline-block;
  }

  .cnoMessageContent {
    text-align: center;
    font-size: 14px;
    color: #76838f;
  }
</style>
