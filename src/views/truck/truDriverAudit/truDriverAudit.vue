<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form label-width="100px" class="filter-item">
        <el-col :span="8">
          <el-form-item label="司机姓名" class="filter-item">
            <el-input
              @keyup.enter.native="handleFilter"
              class="filter-item"
              v-model="listQuery.driverName" clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="司机手机号" class="filter-item">
            <el-input
              @keyup.enter.native="handleFilter"
              class="filter-item"
              v-model="listQuery.phone" clearable>
            </el-input>
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
      <el-table-column align="center" label="驾驶证审验时间" sortable prop="licenseLevelTime">
        <template slot-scope="scope">
          <span>{{ scope.row.licenseLevelTime | moment('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="驾驶证审验状态">
        <template slot-scope="scope">
          <span v-if="scope.row.licenseLevelStatus === '0'">
            <el-tag type="success">正常</el-tag>
          </span>
          <span v-if="scope.row.licenseLevelStatus === '1'">
            <el-tag type="warning">临期</el-tag>
          </span>
          <span v-if="scope.row.licenseLevelStatus === '2'">
            <el-tag type="danger">过期</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="从业证审验时间" sortable prop="qualificationTime">
        <template slot-scope="scope">
          <span>{{ scope.row.qualificationTime | moment('YYYY-MM-DD') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="从业证审验状态">
        <template slot-scope="scope">
          <span v-if="scope.row.qualificationStatus === '0'">
            <el-tag type="success">正常</el-tag>
          </span>
          <span v-if="scope.row.qualificationStatus === '1'">
            <el-tag type="warning">临期</el-tag>
          </span>
          <span v-if="scope.row.qualificationStatus === '2'">
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
  import { fetchList } from '@/api/tru_driver'
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
        }
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
      }
    }
  }
</script>
<style>
</style>
