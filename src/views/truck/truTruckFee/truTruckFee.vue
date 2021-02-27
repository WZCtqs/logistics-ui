<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px" class="filter-item">
        <el-col :span="12">
          <el-form-item label="车牌号 " class="filter-item">
            <el-select
              class="filter-item"
              filterable
              placeholder="请选择"
              v-model="listQuery.truckId"
              clearable
              @keyup.enter.native="handleFilter"
              @change="handleFilter"
            >
              <el-option
                v-for="item in plateNumberReq"
                :key="item.id"
                :label="item.plateNumber" 二维费
                :value="item.truckId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="日期选择 " class="filter-item">
            <el-date-picker
              clearable
              @keyup.enter.native="handleFilter"
              @change="handleFilter"
              class="filter-item"
              v-model="listQuery.feeMonth"
              type="month"
              placeholder="日期选择"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-button v-if="tru_truck_fee_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate"
                   type="primary" icon="edit" size="mini">新增
        </el-button>
        <el-button v-if="tru_truck_fee_upd" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleUpdate">编辑
        </el-button>
        <el-button v-if="tru_truck_fee_del" class="filter-item" style="margin-left: 10px;"
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
      <el-table-column align="center" label="id" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="日期">
        <template slot-scope="scope">
          <span>{{ scope.row.feeMonth }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="司机">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="司机手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="二维费" sortable prop="qrcodeFee">
        <template slot-scope="scope">
          <span>{{ scope.row.qrcodeFee }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="租车费" sortable prop="rentFee">
        <template slot-scope="scope">
          <span>{{ scope.row.rentFee }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审车费" sortable prop="checkFee">
        <template slot-scope="scope">
          <span>{{ scope.row.checkFee }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="保险费" sortable prop="insuranceFee">
        <template slot-scope="scope">
          <span>{{ scope.row.insuranceFee }}</span>
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
        <el-form-item label="费用月份" prop="feeMonth">
          <el-date-picker
            v-model="form.feeMonth"
            type="month"
            placeholder="费用月份"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="id" prop="id" v-if="false">
          <el-input v-model="form.id" placeholder="id"></el-input>
        </el-form-item>
        <el-form-item label="车牌号" prop="plateNumber">
          <el-select
            class="filter-item"
            filterable
            placeholder="请选择车牌号"
            v-model="form.plateNumber"
            @keyup.enter.native="handleFilter"
            @change="handlePlateNumber(form.plateNumber)"
          >
            <el-option
              v-for="item in plateNumberReq"
              :key="item.id"
              :label="item.plateNumber"
              :value="item.plateNumber">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="driverId" prop="driverId" v-if="false">
          <el-input v-model="form.driverId" placeholder="driverId"></el-input>
        </el-form-item>
        <el-form-item label="司机" prop="username">
          <el-input v-model="form.driverName" placeholder="车主" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="司机手机号" prop="username">
          <el-input v-model="form.phone" placeholder="车主手机号" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="二维费" prop="qrcodeFee">
          <el-input v-model.number="form.qrcodeFee" placeholder="二维费" type="number"></el-input>
        </el-form-item>
        <el-form-item label="租车费" prop="rentFee">
          <el-input v-model.number="form.rentFee" placeholder="租车费" type="number"></el-input>
        </el-form-item>
        <el-form-item label="审车费" prop="checkFee">
          <el-input v-model.number="form.checkFee" placeholder="审车费" type="number"></el-input>
        </el-form-item>
        <el-form-item label="保险费" prop="insuranceFee">
          <el-input v-model.number="form.insuranceFee" placeholder="保险费" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')" :disabled="createDis">确 定
        </el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { addObj, delObj, fetchDeptSelect, fetchList, putObj } from '@/api/tru_truck_fee'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_tru_truck_fee',
    directives: {
      waves
    },
    data() {
      var checkNumber = (rule, value, callback) => {
        const plateNumberReg = /^\d+$/
        setTimeout(() => {
          if (plateNumberReg.test(value)) {
            callback()
          } else {
            callback(new Error('不能为负数'))
          }
        }, 100)
      }
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          plateNumber: null,
          feeMonth: null
        },
        rules: {
          feeMonth: [
            { required: true, message: '请选择费用月份', trigger: 'change' }
          ],
          plateNumber: [
            { required: true, message: '请选择车牌号', trigger: 'change' }
          ],
          qrcodeFee: [
            { validator: checkNumber, trigger: 'blur' }
          ],
          rentFee: [
            { validator: checkNumber, trigger: 'blur' }
          ],
          checkFee: [
            { validator: checkNumber, trigger: 'blur' }
          ],
          insuranceFee: [
            { validator: checkNumber, trigger: 'blur' }
          ]
        },
        form: {
          id: null,
          feeMonth: '',
          plateNumber: '',
          qrcodeFee: '',
          rentFee: '',
          checkFee: '',
          insuranceFee: '',
          driverName: '',
          phone: '',
          driverId: '',
          truckId: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        tru_truck_fee_add: false,
        tru_truck_fee_upd: false,
        tru_truck_fee_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        plateNumberReq: [],
        createDis: false
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
      this.tru_truck_fee_add = this.permissions['tru_truck_fee_add']
      this.tru_truck_fee_upd = this.permissions['tru_truck_fee_upd']
      this.tru_truck_fee_del = this.permissions['tru_truck_fee_del']
      this.handleFetchDeptSelect()
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
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
          this.$confirm('是否要删除选中的车辆费用信息', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let str = ''
            for (let i = 0; i < this.multipleSelection.length; i++) {
              str += this.multipleSelection[i].id + ','
            }
            str = str.substring(0, str.length - 1)
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
              }
            })
          })
        }
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.resetTemp()
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
          this.form.id = row.id
          this.form.feeMonth = row.feeMonth
          this.form.plateNumber = row.plateNumber
          this.form.qrcodeFee = row.qrcodeFee
          this.form.rentFee = row.rentFee
          this.form.insuranceFee = row.insuranceFee
          this.form.checkFee = row.checkFee
          this.form.driverName = row.driverName
          this.form.phone = row.phone
          this.form.driverId = row.driverId
          this.form.truckId = row.truckId
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
            this.createDis = true
            addObj(this.form)
              .then((res) => {
                this.createDis = false
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
                  this.$message.error(res.data.msg)
                }
              })
          } else {
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
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            putObj(this.form).then((res) => {
              this.dialogFormVisible = false
              this.getList()
              if (res.data.data) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify({
                  title: '失败',
                  message: '修改失败',
                  type: 'error',
                  duration: 2000
                })
              }
            })
          } else {
            return false
          }
        })
      },
      resetTemp() {
        this.form = {
          id: null,
          feeMonth: '',
          plateNumber: '',
          qrcodeFee: '',
          rentFee: '',
          insuranceFee: '',
          driverName: '',
          phone: '',
          driverId: '',
          truckId: ''
        }
      },
      handleFetchDeptSelect() {
        fetchDeptSelect().then(res => {
          this.plateNumberReq = res.data
        })
      },
      handlePlateNumber(id) {
        for (let j = 0; j < this.plateNumberReq.length; j++) {
          if (id === this.plateNumberReq[j].plateNumber) {

            this.form.driverName = this.plateNumberReq[j].driverName
            this.form.phone = this.plateNumberReq[j].phone
            this.form.driverId = this.plateNumberReq[j].driverId
            this.form.truckId = this.plateNumberReq[j].truckId
          }
        }
      }
    }
  }
</script>
