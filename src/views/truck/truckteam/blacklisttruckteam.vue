<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" label-width="100px" class="filter-item">
        <el-form-item label="承运商名称" class="filter-item">
          <el-select
            class="filter-item"
            filterable
            clearable
            v-model="listQuery.teamName"
            placeholder="承运商名称"
            @change="handleFilter"
          >
            <el-option
              v-for="item in getTeamNameReq"
              :key="item.tenantId"
              :label="item.teamName"
              :value="item.teamName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人" prop="contact" class="filter-item">
          <el-select
            class="filter-item"
            filterable
            clearable
            v-model="listQuery.contact"
            placeholder="负责人"
            @change="handleFilter"
          >
            <el-option
              v-for="item in getTeamNameReq"
              :key="item.tenantId"
              :label="item.contact"
              :value="item.contact">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleExport"
                   type="primary" icon="edit" size="mini">导出
        </el-button>
        <el-button v-if="tru_truck_team_add" class="filter-item" style="margin-left: 10px;"
                   type="primary" icon="edit" size="mini" @click="handleCreate(0)">新增
        </el-button>
        <el-button v-if="tru_truck_team_upd" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleRemoveBlacklist()">移出黑名单
        </el-button>

        <!--<el-button v-if="tru_truck_team_upd" class="filter-item" style="margin-left: 10px;"-->
                   <!--type="primary" size="mini" @click="handleUpdate()">编辑-->
        <!--</el-button>-->
        <el-button v-if="tru_truck_team_del" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleDelete">删除
        </el-button>
        <el-button class="filter-item" type="primary" size="mini" v-waves icon="search" @click="handleFilter">搜索
        </el-button>
      </div>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column align="center" label="承运商id" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.truckTeamId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="承运商名称">
        <template slot-scope="scope">
          <span>{{ scope.row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ scope.row.teamType }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="负责人">
        <template slot-scope="scope">
          <span>{{ scope.row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="司机数">
        <template slot-scope="scope">
          <span>{{ scope.row.driverSum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车辆数">
        <template slot-scope="scope">
          <span>{{ scope.row.truckSum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结算方式">
        <template slot-scope="scope">
          <span>{{ scope.row.payWay }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | moment('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="是否签合同">-->
      <!--<template slot-scope="scope">-->
      <!--{{scope.row.isPartner }}-->
      <!--<span v-if="scope.row.isPartner === '0'">启用</span>-->
      <!--<span v-if="scope.row.isPartner === '1'">禁用</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="承运商id" prop="truckTeamId" v-show="false">
          <el-input v-model="form.truckTeamId" placeholder="承运商id"></el-input>
        </el-form-item>
        <el-form-item label="承运商类型" prop="teamType">
          <el-radio-group v-model="form.teamType"  @change="handlerpayWay">
            <el-radio label="个体车队">个体车队</el-radio>
            <el-radio label="运输车队">运输车队</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="基础信息">
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="承运商名称" prop="teamName">
              <el-input v-model="form.teamName" placeholder="承运商名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人" prop="contact">
              <el-input v-model="form.contact" placeholder="负责人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="结算方式" prop="payWay">
              <el-select
                class="filter-item"
                v-model="form.payWay"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in payWayarr"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <!-- <el-input v-model="form.remark" placeholder="备注"></el-input> -->
              <el-input type="textarea" v-model="form.remark" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
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
    ispartner_status,
    istrust_status,
    putObj,
    removeBlackList,
    selectAllTructBlackObj
  } from '@/api/tru_truck_team'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_tru_truck_team',
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          isTrust: '1'
        },
        rules: {
          teamType: [
            { required: true, message: '请输入承运商类型', trigger: 'change' }
          ],
          teamName: [
            { required: true, message: '请输入承运商名称', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ],
          payWay: [
            { required: true, message: '请选择付款方式', trigger: 'change' }
          ]
        },
        form: {
          payWay: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        tru_truck_team_exp: false,
        tru_truck_team_add: false,
        tru_truck_team_upd: false,
        tru_truck_team_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        CarStatusReq: [],
        IsTrustReq: [],
        payWayarr: ['单结', '月结'],
        IsPartnerReq: [],
        IsPassedReq: [],
        isPassedTemp: '',
        IsPartnerTemp: '',
        statusTemp: '',
        isTrustTemp: '',
        multipleSelection: [],
        getTeamNameReq: []
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
      this.getList()
      this.tru_truck_team_upd = this.permissions['tru_truck_team_upd']
      this.tru_truck_team_exp = this.permissions['tru_truck_team_exp']
      this.tru_truck_team_del = this.permissions['tru_truck_team_del']
      this.selectAllTructList()
      this.ispartner_statusList()
      this.istrust_statusList()
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
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleExport() {
        let str = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          str += this.multipleSelection[i].truckTeamId + ','
        }
        if (this.multipleSelection.length >= 1) {
          str = str.substring(0, str.length - 1)
        } else {
          str = 'allH'
        }
        if (this.multipleSelection.length !== 0) {
          expObj(str).then(response => {
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
            const fileName = nowDate + '-黑名单车队信息.xls'
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
          this.dialogFormVisible = true
          this.form.truckTeamId = row.truckTeamId
          this.form.teamType = row.teamType
          this.form.teamName = row.teamName
          this.form.saleman = row.saleman
          this.form.contact = row.contact
          this.form.contactJob = row.contactJob
          this.form.phone = row.phone
          this.form.email = row.email
          this.form.isPartner = row.isPartner
          // this.form.payWay = row.payWay
          this.form.isTrust = row.isTrust
          this.form.remark = row.remark
          this.IsPartnerTemp = row.isPartner
          this.isTrustTemp = row.isTrust
          if (this.form.teamType === '个体车队') {
            this.form.payWay = '单结'
            this.payWayDisable = true
          } else {
            this.form.payWay = row.payWay
            this.payWayDisable = false
          }
        } else {
          this.$notify({
            title: '警告',
            message: '只能选择一行数据进行修改',
            type: 'error',
            duration: 2000
          })
        }
      },
      handleDelete() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除的数据',
            type: 'warn',
            duration: 2000
          })
        } else {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].truckTeamId + ','
          }
          str = str.substring(0, str.length - 1)
          this.$confirm('是否要删除选中的黑名单车队信息', '提示', {
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
                this.$message.error(response.data.msg)
              }
            })
          })
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      create(formName) {
        const set = this.$refs
        this.form.isPartner = this.IsPartnerTemp
        this.form.isTrust = this.isTrustTemp
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form)
              .then(() => {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
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
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        this.form.isPartner = this.IsPartnerTemp
        this.form.isTrust = this.isTrustTemp
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
            putObj(this.form).then((res) => {
              if (res.data.data) {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '修改成功',
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
      resetTemp() {
        this.form = {
          truckTeamId: undefined,
          teamName: '',
          saleman: '',
          contact: '',
          contactJob: '',
          phone: '',
          email: '',
          isPartner: '',
          isTrust: '',
          remark: '',
          payWay: ''
        }
        this.IsPartnerTemp = ''
        this.statusTemp = ''
      },
      istrust_statusList() {
        istrust_status().then(response => {
          this.IsTrustReq = response.data
        })
      },
      ispartner_statusList() {
        ispartner_status().then(response => {
          this.IsPartnerReq = response.data
        })
      },
      handleRemoveBlacklist() {
        var arr = this.multipleSelection
        var thisrow = {}
        var arr1 = []
        for (var item in arr) {
          thisrow = arr[item]
          let row = thisrow
          var trustState = row.isTrust
          arr1.push(row.truckTeamId)
        }
        var ids = arr1.join()
        var obj = {}
        obj.ids = ids
        obj.isTrust = 0
        if (arr1.length !== 0) {
          removeBlackList(obj).then(() => {
            this.getList()
            this.$notify({
              title: '成功',
              message: '移出黑名单成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          this.$message.error('至少选择一项进行操作')
          return false
        }
      },
      selectAllTructList() {
        selectAllTructBlackObj().then(res => {
          this.getTeamNameReq = res.data
        })
      },
      handlerpayWay() {
        if (this.form.teamType === '个体车队') {
          this.form.payWay = '单结'
          this.payWayDisable = true
        } else {
          this.payWayDisable = false
        }
      }
    }
  }
</script>
