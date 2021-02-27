<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px"
               class="filter-item">
        <el-col :span="12">
          <el-form-item label="主卡号"
                        class="filter-item">
            <el-select class="filter-item"
                       filterable
                       placeholder="请选择"
                       v-model="listQuery.majorNumber"
                       @keyup.enter.native="handleFilter"
                       @change="handleFilter"
                       clearable>
              <el-option v-for="item in majorNumberReq"
                         :key="item.majorId"
                         :label="item.majorNumber"
                         :value="item.majorNumber">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发起日期"
                        class="filter-item">
            <el-col :span="24">
              <el-date-picker type="month"
                              placeholder="选择日期"
                              v-model="listQuery.yearMonth"
                              @change="handleFilter"
                              style="width: 100%;"
                              format="yyyy 年 MM 月"
                              value-format="yyyy-MM"></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="filter-container">
      <el-button v-if="major_month_recharge_exp"
                 class="filter-item"
                 style="margin-left: 10px;"
                 @click="handleExp"
                 type="primary"
                 icon="edit"
                 size="mini">导出
      </el-button>
      <el-button v-if="major_month_recharge_add"
                 class="filter-item"
                 style="margin-left: 10px;"
                 @click="handleCreate"
                 size="mini"
                 type="primary"
                 icon="edit">添加
      </el-button>
      <el-button v-if="major_month_recharge_upd"
                 class="filter-item"
                 style="margin-left: 10px;"
                 @click="handleUpdate"
                 size="mini"
                 type="primary"
                 icon="edit">编辑
      </el-button>
      <el-button v-if="major_month_recharge_del"
                 class="filter-item"
                 style="margin-left: 10px;"
                 @click="handleDelete"
                 size="mini"
                 type="primary"
                 icon="edit">删除
      </el-button>
      <el-button v-if="major_month_recharge"
                 class="filter-item"
                 style="margin-left: 10px;"
                 @click="handleRecharge"
                 size="mini"
                 type="primary"
                 icon="edit">充值
      </el-button>
      <el-button class="filter-item"
                 @click="handleFilter"
                 type="primary"
                 size="mini"
                 v-waves
                 icon="search">搜索
      </el-button>
    </div>
    <el-table :key='tableKey'
              :data="list"
              v-loading="listLoading"
              element-loading-text="给我一点时间"
              border
              fit
              highlight-current-row
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55"></el-table-column>
      <el-table-column type="expand" fixed>
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row>
              <el-col :span="7" :offset="3">
                <el-form-item label="返利:">
                  <span>{{ props.row.rebate }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="备注:">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="主卡月统计id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.majorMonthId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="主卡id"
                       v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.majorId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="主卡名">
        <template slot-scope="scope">
          <span>{{ scope.row.majorName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="主卡号">
        <template slot-scope="scope">
          <span>{{ scope.row.majorNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="油卡归属公司">
        <template slot-scope="scope">
          <span>{{ scope.row.majorCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="上月余额">
        <template slot-scope="scope">
          <span>{{ scope.row.lastAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值记录"
                       align="center">
        <template slot-scope="scope">
          <el-button type="primary"
                     @click="browse(scope.row)"
                     size="mini">查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="副卡充值汇总"
                       align="center">
        <template slot-scope="scope">
          <el-button type="primary"
                     @click="browseVice(scope.row)"
                     size="mini">查看
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="合计充值"
                       prop="rechargeSum"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.rechargeSum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="合计分配"
                       prop="distributeSum"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.distributeSum }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
                       <!--label="返利"-->
                       <!--prop="rebate"-->
                       <!--sortable>-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.rebate }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="本月余额"
                       prop="monthAmount"
                       sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.monthAmount }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center"-->
                       <!--label="备注">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.remark }}</span>-->
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
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="140px">
        <el-form-item label="主卡月统计id"
                      prop="majorMonthId"
                      v-if="false">
          <el-input v-model="form.majorMonthId"
                    placeholder="主卡月统计id"></el-input>
        </el-form-item>
        <el-form-item label="主卡id"
                      prop="majorId"
                      v-if="false">
          <el-input v-model="form.majorId"
                    placeholder="主卡id"></el-input>
        </el-form-item>
        <el-form-item label="主卡名"
                      prop="majorName">
          <el-input v-model="form.majorName"
                    placeholder="主卡名"></el-input>
        </el-form-item>
        <el-form-item label="主卡号"
                      prop="majorNumber">
          <el-input v-model="form.majorNumber"
                    placeholder="主卡号"></el-input>
        </el-form-item>
        <el-form-item label="油卡归属公司"
                      prop="majorCompany">
          <el-input v-model="form.majorCompany"
                    placeholder="油卡归属公司"></el-input>
        </el-form-item>
        <el-form-item label="备注"
                      prop="username">
          <el-input v-model="form.remark"
                    placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="create('form')">确 定
        </el-button>
        <el-button v-else
                   type="primary"
                   @click="update('form')">修 改
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisible1">
      <el-form :model="form1"
               :rules="rules"
               ref="form1"
               label-width="120px">
        <el-form-item label="主卡名"
                      prop="majorName"
                      class="filter-item">
          <el-input style="width: 200px;"
                    class="filter-item"
                    placeholder="主卡名"
                    v-model="form1.majorName"
                    :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="主卡号"
                      prop="majorNumber"
                      class="filter-item">
          <el-input style="width: 200px;"
                    class="filter-item"
                    placeholder="主卡号"
                    v-model="form1.majorNumber"
                    :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="油卡归属公司"
                      prop="majorCompany"
                      class="filter-item">
          <el-input style="width: 200px;"
                    class="filter-item"
                    placeholder="油卡归属公司"
                    v-model="form1.majorCompany"
                    :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item label="充值方式"
                      prop="rechargeType"
                      style="width: 320px;"
                      class="filter-item">
          <el-select v-model="form1.rechargeType"
                     clearable
                     placeholder="请选择">
            <el-option label="直接充值" value="0">
            </el-option>
            <el-option label="加油站充值" value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值金额"
                      style="width: 300px;"
                      prop="majorRechargeAmount"
                      class="filter-item">
          <el-input style="width: 200px;"
                    class="filter-item"
                    placeholder="备注"
                    v-model="form1.majorRechargeAmount">
          </el-input>
        </el-form-item>
        <el-form-item label="充值备注"
                      class="filter-item">
          <el-input style="width: 200px;"
                    class="filter-item"
                    placeholder="备注"
                    v-model="form1.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="rechargeBing()">确定
        </el-button>
        <el-button @click="cancel1()">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible2">
      <el-table :key='tableKey'
                :data="listForm"
                v-loading="listLoading"
                border
                fit
                highlight-current-row
                style="width: 100%">
        <el-table-column align="center"
                         label="主卡号">
          <template slot-scope="scope">
            <span>{{ scope.row.majorNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="充值时间">
          <template slot-scope="scope">
            <span>{{ scope.row.majorRechargeDate }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="充值金额">
          <template slot-scope="scope">
            <span>{{ scope.row.majorRechargeAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="充值备注">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading"
           class="pagination-container">
        <el-pagination @size-change="handleSizeChange1"
                       @current-change="handleCurrentChange1"
                       :current-page.sync="listQuery1.page"
                       :page-sizes="[10,20,30, 50]"
                       :page-size="listQuery1.limit"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total1">
        </el-pagination>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel2()">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 副卡充值汇总-->

    <el-dialog title="副卡充值汇总"
               width="80%"
               :visible.sync="ViceCardVisible">
      <el-dialog
        width="70%"
        title="副卡充值明细"
        :visible.sync="ViceDetailCardVisible"
        append-to-body>
        <el-table key='3'
                  :data="ViceCardDetailData"
                  v-loading="listLoading"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%">
          <el-table-column align="center"
                           label="油卡号">
            <template slot-scope="scope">
              <span>{{ scope.row.oilNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="金额">
            <template slot-scope="scope">
              <span>{{ scope.row.rechargeSum }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="充值时间">
            <template slot-scope="scope">
              <span>{{ scope.row.rechargeDate }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.applyRemark }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="!listLoading"
             class="pagination-container">
          <el-pagination @size-change="handleViceDetailSizeChange"
                         @current-change="handleViceDetailCurrentChange"
                         :current-page.sync="listQueryViceDetail.page"
                         :page-sizes="[10,20,30, 50]"
                         :page-size="listQueryViceDetail.limit"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total1ViceDetail">
          </el-pagination>
        </div>
      </el-dialog>
      <el-table key='2'
                :data="ViceCardData"
                v-loading="listLoading"
                @row-click="browseViceDetail"
                border
                fit
                highlight-current-row
                style="width: 100%">
        <el-table-column align="center"
                         label="油卡号">
          <template slot-scope="scope">
            <span>{{ scope.row.oilNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="车牌号">
          <template slot-scope="scope">
            <span>{{ scope.row.driverName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="司机">
          <template slot-scope="scope">
            <span>{{ scope.row.driverName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="车辆类型">
          <template slot-scope="scope">
            <span>{{ scope.row.attribute }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="联系方式">
          <template slot-scope="scope">
            <span>{{ scope.row.driverPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="油卡类型">
          <template slot-scope="scope">
            <span>{{ scope.row.cardType }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="本月充值汇总">
          <template slot-scope="scope">
            <span>{{ scope.row.rechargeSum }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="browseViceDetail(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading"
           class="pagination-container">
        <el-pagination @size-change="handleViceSizeChange"
                       @current-change="handleViceCurrentChange"
                       :current-page.sync="listQueryVice.page"
                       :page-sizes="[10,20,30, 50]"
                       :page-size="listQueryVice.limit"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total1Vice">
        </el-pagination>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="ViceCardVisible=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addObj,
    delObj,
    expObj,
    fetchList,
    getMajorListObj,
    getmajorNumberObj,
    majorMonthRecharge,
    putObj,
    rechargeBingObj
  } from '@/api/major_month_recharge'
  import { getOilMajorNumberObj } from '@/api/oil_apply'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_major_month_recharge',
    directives: {
      waves
    },
    data() {
      return {
        ViceDetailCardVisible: false,
        ViceCardVisible: false,
        list: null,
        listForm: null,
        total: null,
        listLoading: true,
        ViceCardData: '',
        ViceCardDetailData: '',
        listQueryViceDetail: {
          page: 1,
          limit: 20,
          oilCardId: '',
          isSelectSub: 0
        },
        total1ViceDetail: null,
        listQuery: {
          page: 1,
          limit: 20,
          yearMonth: ''
        },
        listQuery1: {
          page: 1,
          limit: 20,
          majorId: '',
          yearMonth: ''
        },
        listQueryVice: {
          page: 1,
          limit: 20,
          majorId: ''
        },
        total1Vice: null,
        rules: {
          majorName: [
            { required: true, message: '请输入主卡名', trigger: 'blur' }
          ],
          majorNumber: [
            { required: true, message: '请输入主卡号', trigger: 'blur' }
          ],
          majorCompany: [
            { required: true, message: '请输入油卡归属公司', trigger: 'blur' }
          ],
          majorRechargeAmount: [
            { required: true, message: '请输入充值金额', trigger: 'blur' }
          ],
          rechargeType: [
            { required: true, message: '请输入充值金额', trigger: 'blur' }
          ]
        },
        form: {
          majorId: '',
          tenantId: '',
          majorName: '',
          majorNumber: '',
          cardNum: '',
          remark: ''
        },
        form1: {
          majorRechargeAmount: '',
          remark: '',
          rechargeType: ''
        },
        form2: {},
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        dialogStatus: '',
        major_month_recharge_add: false,
        major_month_recharge_upd: false,
        major_month_recharge_del: false,
        major_month_recharge_exp: false,
        major_month_recharge: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        yearMonth: '',
        multipleSelection: [],
        total1: '',
        majorNumberReq: []
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
      const data = new Date()
      if (data.getMonth() < 9) {
        this.listQuery.yearMonth = data.getFullYear() + '-0' + (data.getMonth() + 1)
      } else {
        this.listQuery.yearMonth = data.getFullYear() + '-' + (data.getMonth() + 1)
      }
      this.getList()
      this.major_month_recharge_add = this.permissions['major_month_recharge_add']
      this.major_month_recharge_upd = this.permissions['major_month_recharge_upd']
      this.major_month_recharge_del = this.permissions['major_month_recharge_del']
      this.major_month_recharge_exp = this.permissions['major_month_recharge_exp']
      this.major_month_recharge = this.permissions['major_month_recharge']
      this.getOilMajorNumberObjList()
    },
    methods: {
      getList() {
        this.listLoading = false
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      getOilMajorNumberObjList() {
        getOilMajorNumberObj().then(response => {
          this.majorNumberReq = response.data
        })
      },
      browse(obj) {
        this.dialogFormVisible2 = true
        this.listQuery1.majorId = obj.majorId
        this.listQuery1.yearMonth = obj.yearMonth
        this.getList1()
      },
      getList1() {
        getMajorListObj(this.listQuery1).then(response => {
          this.listForm = response.data.records
          this.total1 = response.data.total
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleSizeChange1(val) {
        this.listQuery1.limit = val
        this.getList1()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleCurrentChange1(val) {
        this.listQuery1.page = val
        this.getList1()
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },

      handleDelete(row) {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除的数据',
            type: 'warn',
            duration: 2000
          })
        } else {
          const multiLength = this.multipleSelection.filter(item => item.cardNum > 0)
          if (multiLength.length > 0) {
            this.$notify({
              title: '警告',
              message: '已完成的充值禁止删除',
              type: 'error',
              duration: 2000
            })
          } else {
            let str = ''
            for (let i = 0; i < this.multipleSelection.length; i++) {
              str += this.multipleSelection[i].majorId + ','
            }
            str = str.substring(0, str.length - 1)
            this.$confirm('是否要删除选中的主卡金额信息', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              delObj(str).then(response => {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
              })
            })
          }
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      resetTemp() {
        this.form = {
          majorId: '',
          tenantId: '',
          majorName: '',
          majorNumber: '',
          cardNum: '',
          remark: ''
        }
      },
      handleExp() {
        if (this.multipleSelection.length !== 0) {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            if (i === this.multipleSelection.length - 1) {
              str += this.multipleSelection[i].majorMonthId
            } else {
              str += this.multipleSelection[i].majorMonthId + ','
            }
          }
          expObj(str).then(response => {
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
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })

            const downloadElement = document.createElement('a')
            const href = window.URL.createObjectURL(blob)
            downloadElement.href = href
            downloadElement.download = nowDate + '-主卡金额充值明细.xls'
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
        } else {
          this.$notify({
            title: '失败',
            message: '请选择一行数据进行导出操作',
            type: 'warning',
            duration: 2000
          })
        }
      },
      handleUpdate() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要修改的数据',
            type: 'warn',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          const row = this.multipleSelection[0]
          this.dialogStatus = 'update'
          this.form.majorId = row.majorId
          this.form.majorName = row.majorName
          this.form.majorNumber = row.majorNumber
          this.form.majorCompany = row.majorCompany
          this.form.remark = row.remark
          this.dialogFormVisible = true
        } else {
          this.$notify({
            title: '警告',
            message: '只能选择一行数据进行修改',
            type: 'error',
            duration: 2000
          })
        }
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            getmajorNumberObj(this.form.majorNumber).then((response) => {
              if (response.data.data === true) {
                addObj(this.form).then((res) => {
                  if (res.data.data) {
                    this.dialogFormVisible = false
                    this.getList()
                    this.$notify({
                      title: '成功',
                      message: '创建成功',
                      type: 'success',
                      duration: 2000
                    })
                  } else {
                    return false
                  }
                })
              } else {
                this.$message.error('此公司已存在，请更换公司名称')
              }
            })
          }
        })
      },
      cancel1() {
        this.dialogFormVisible1 = false
      },
      cancel2() {
        this.dialogFormVisible2 = false
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      handleRecharge() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要充值的数据',
            type: 'warn',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          const row = this.multipleSelection[0]
          this.form1.majorId = row.majorId
          this.form1.majorNumber = row.majorNumber
          this.form1.majorName = row.majorName
          this.form1.majorCompany = row.majorCompany
          this.form1.majorRechargeAmount = ''
          this.form1.remark = ''
          this.dialogFormVisible1 = true
        } else {
          this.$notify({
            title: '警告',
            message: '只能选择一行数据进行充值',
            type: 'error',
            duration: 2000
          })
        }
      },
      rechargeBing() {
        var obj = {
          majorId: this.form1.majorId,
          majorRechargeAmount: this.form1.majorRechargeAmount,
          remark: this.form1.remark,
          rechargeType: this.form1.rechargeType
        }
        if (this.form1.majorRechargeAmount !== '' && this.form1.majorRechargeAmount !== null) {
          if (this.form1.rechargeType) {
            rechargeBingObj(obj).then(response => {
              if (response.data.data) {
                this.dialogFormVisible1 = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '充值成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify.error(response.data.msg)
              }
            })
          } else {
            this.$notify.error('请选择充值方式')
          }
        } else {
          this.$notify.error('请输入充值金额')
        }
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
            putObj(this.form).then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            return false
          }
        })
      },
      browseVice(item) {
        this.listQueryVice.majorId = item.majorId
        this.handleViceGetList()
      },
      handleViceGetList() {
        majorMonthRecharge(this.listQueryVice).then(res => {
          this.ViceCardData = res.data.records
          this.ViceCardVisible = true
        })
      },
      handleViceSizeChange(val) {
        this.listQueryVice.limit = val
        this.handleViceGetList()
      },
      handleViceCurrentChange(val) {
        this.listQueryVice.page = val
        this.handleViceGetList()
      },
      browseViceDetail(row) {
        this.listQueryViceDetail.oilCardId = row.oilCardId
        this.handleViceDetailGetList()
      },
      handleViceDetailGetList() {
        majorMonthRecharge(this.listQueryViceDetail).then(res => {
          this.ViceCardDetailData = res.data.records
          this.ViceDetailCardVisible = true
        })
      },
      handleViceDetailSizeChange(val) {
        this.listQueryViceDetail.limit = val
        this.handleViceDetailGetList()
      },
      handleViceDetailCurrentChange(val) {
        this.listQueryViceDetail.page = val
        this.handleViceDetailGetList()
      }
    }
  }
</script>
