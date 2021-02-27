<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px" class="filter-item">
        <el-col :span="12">
          <el-form-item label="日期选择 " class="filter-item">
            <el-date-picker
              @keyup.enter.native="handleFilter"
              class="filter-item"
              v-model="listQuery.feeMonth"
              type="month"
              placeholder="日期选择"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              @change="handleFilter"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车牌号 " class="filter-item">
            <el-select
              class="filter-item"
              filterable
              placeholder="请选择"
              v-model="listQuery.plateNumber"
              clearable
              @keyup.enter.native="handleFilter"
              @change="handleFilter"
            >
              <el-option
                v-for="item in plateNumberReq"
                :key="item.id"
                :label="item.plateNumber"
                :value="item.plateNumber">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column align="center" label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="当前位置信息">
        <template slot-scope="scope">
          <!--<span>{{ scope.row.plateNumber}}</span>-->
          <el-button type="primary" @click="openLocationDialog(scope.row)">当前位置信息</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="司机">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="司机电话">
        <template slot-scope="scope">
          <span>{{ scope.row.driverPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="本月订单数" sortable prop="orderNum">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="本月合计费用" sortable prop="totalFee">
        <template slot-scope="scope">
          <span>{{ scope.row.totalFee }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="当前位置信息"
      :visible.sync="dialogVisible"
      class="mapDialog"
      width="80%">
      <baidu-map class="map" :center="polylinePath[0]" :zoom="15" :scroll-wheel-zoom="true">
        <bm-marker :position="polylinePath[0]"
                   @click="infoWindowOpen" :icon="endCarIcon">
          <bm-info-window :position="polylinePath[0]" title="车辆信息" :show="infoWindow.show"
                          animation="BMAP_ANIMATION_BOUNCE"
                          @close="infoWindowClose" @open="infoWindowOpen">
            <p v-text="infoWindow.platenum"></p>
            <p v-text="infoWindow.drivername"></p>
            <p v-text="infoWindow.driverphone"></p>
            <p v-text="infoWindow.loction"></p>
            <p v-text="infoWindow.speed"></p>
            <p v-text="infoWindow.flameoutState"></p>
          </bm-info-window>
        </bm-marker>
      </baidu-map>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchDeptSelect, fetchList, getTruckGPSObj } from '@/api/tru_truck_business'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_tru_truck_fee',
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          plateNumber: null,
          feeMonth: null
        },
        tableKey: 0,
        plateNumberReq: [],
        dialogVisible: false,
        infoWindow: {
          show: false,
          speed: '',
          flameoutState: '',
          drivername: '',
          driverphone: '',
          platenum: '',
          loction: ''
        },
        polylinePath: [],
        endCarIcon: {
          url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
          size: { width: 52, height: 26 },
          opts: { anchor: { width: 27, height: 13 } }
        }
      }
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
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
      let now = new Date()
      let nowYear = now.getFullYear()
      let nowMonth = now.getMonth() + 1
      if (nowMonth < 10) {
        this.listQuery.feeMonth = nowYear + '-0' + nowMonth
      } else {
        this.listQuery.feeMonth = nowYear + '-' + nowMonth
      }
      this.getList()
      this.handleFetchDeptSelect()
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleFilter() {
        // this.listQuery.page = 1
        this.getList()
      },
      handleFetchDeptSelect() {
        fetchDeptSelect().then(res => {
          this.plateNumberReq = res.data
        })
      },
      handlePlateNumber(id) {
        for (let j = 0; j < this.plateNumberReq.length; j++) {
          if (id === this.plateNumberReq[j].plateNumber) {
            this.form.truckOwner = this.plateNumberReq[j].truckOwner
            this.form.truckOwnerPhone = this.plateNumberReq[j].truckOwnerPhone
            this.form.truckId = this.plateNumberReq[j].truckId
          }
        }
      },
      openLocationDialog(row) {
        this.listLoading = true
        // 冀DW9513 row.plateNumber
        getTruckGPSObj(row.plateNumber).then(res => {
          let arr = {}
          this.listLoading = false
          this.play = false
          this.polylinePath = []
          if ((res.data.polylinePath.lng !== null) && (res.data.polylinePath.lat !== null)) {
            arr = { 'lng': (res.data.polylinePath.lng), 'lat': Number(res.data.polylinePath.lat) }
            this.polylinePath.push(arr)
            if (res.data.polylinePath.flameoutState === 0) {
              this.infoWindow.polylinePathflameoutState = '车辆状态:熄火'
            } else if (res.data.polylinePath.flameoutState === 1) {
              this.infoWindow.flameoutState = '车辆状态:点火'
            }
            if (res.data.driverMessage) {
              if (res.data.driverMessage.drivername !== null) {
                this.infoWindow.drivername = '司机:' + res.data.driverMessage.drivername
              } else {
                this.infoWindow.drivername = '暂无司机名称'
              }
              if (res.data.driverMessage.driverphone !== null) {
                this.infoWindow.driverphone = '手机号:' + res.data.driverMessage.driverphone
              } else {
                this.infoWindow.driverphone = '暂无手机号'
              }
              if (res.data.driverMessage.platenum !== null) {
                this.infoWindow.platenum = '车牌号:' + res.data.driverMessage.platenum
              } else {
                this.infoWindow.platenum = '车牌号:' + '暂无车牌号'
              }
            }
            if (res.data.polylinePath) {
              this.infoWindow.loction = '位置:' + res.data.polylinePath.lat + ',' + res.data.polylinePath.lng
              this.infoWindow.speed = '速度:' + res.data.polylinePath.speed + 'KM/h'
            }
            this.dialogVisible = true
            this.play = true
          } else {
            this.$notify({
              title: '提示',
              message: '暂无车辆GPS导航数据',
              type: 'error',
              duration: 2000
            })
          }
        })
      },
      infoWindowClose(e) {
        this.infoWindow.show = false
      },
      infoWindowOpen(e) {
        this.infoWindow.show = true
      }
    }
  }
</script>
<style scoped>
  .mapDialog .el-dialog {
    margin-top: 3vh !important;
  }

  .mapDialog .el-dialog__body {
    padding: 10px 20px;
  }

  .map {
    width: 100%;
    height: 800px;
  }
</style>

