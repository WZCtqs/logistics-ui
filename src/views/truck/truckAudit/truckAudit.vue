<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px" class="filter-item">
        <el-col :span="18">
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
        <el-col :span="4" :offset="2">
          <el-button class="filter-item" type="primary" size="medium" v-waves icon="search" @click="handleFilter">搜索
          </el-button>
        </el-col>
      </el-form>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column align="center" label="车牌号">
        <template slot-scope="scope">
          <span>{{ scope.row.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车辆验审时间" sortable prop="truckTime">
        <template slot-scope="scope">
          <span>{{ scope.row.truckTime | moment('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="车辆验审状态">
        <template slot-scope="scope">
          <span v-if="scope.row.truckStatus === '0'">
            <el-tag type="success">正常</el-tag>
          </span>
          <span v-if="scope.row.truckStatus === '1'">
            <el-tag type="warning">临期</el-tag>
          </span>
          <span v-if="scope.row.truckStatus === '2'">
            <el-tag type="danger">过期</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="营运证验审时间" sortable prop="operationTime">
        <template slot-scope="scope">
          <span>{{ scope.row.operationTime | moment('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="营运证验审状态">
        <template slot-scope="scope">
          <span v-if="scope.row.operationStatus === '0'">
            <el-tag type="success">正常</el-tag>
          </span>
          <span v-if="scope.row.operationStatus === '1'">
            <el-tag type="warning">临期</el-tag>
          </span>
          <span v-if="scope.row.operationStatus === '2'">
            <el-tag type="danger">过期</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="保险证验审时间" sortable prop="policyNoTime">
        <template slot-scope="scope">
          <span>{{ scope.row.policyNoTime | moment('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="保险证验审状态">
        <template slot-scope="scope">
          <span v-if="scope.row.policyNoStatus  === '0'">
            <el-tag type="success">正常</el-tag>
          </span>
          <span v-if="scope.row.policyNoStatus  === '1'">
            <el-tag type="warning">临期</el-tag>
          </span>
          <span v-if="scope.row.policyNoStatus  === '2'">
            <el-tag type="danger">过期</el-tag>
          </span>
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
  </div>
</template>

<script>
  import { fetchList, fetchDeptSelect } from '@/api/tru_truck'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'truDriverAudit',
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
          limit: 20
        },
        plateNumberReq: []
      }
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    inject: ['reload'],
    created() {
      this.getList()
      this.handleFetchDeptSelect()
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
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleFetchDeptSelect() {
        fetchDeptSelect().then(res => {
          this.plateNumberReq = res.data
        })
      }
    }
  }
</script>
<style>
</style>
