<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div>
        <el-button v-if="sys_post_add" class="filter-item" style="margin-left: 10px;"
                   type="primary" icon="edit" size="mini"  @click="handleCreate">新增
        </el-button>
        <el-button v-if="sys_post_upd" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleUpdate">编辑
        </el-button>
        <el-button v-if="sys_post_del" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleDelete">删除
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
      <el-table-column align="center" label="岗位ID" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.postId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="岗位编码">
        <template slot-scope="scope">
          <span>{{ scope.row.postCode }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="岗位名称">
        <template slot-scope="scope">
          <span>{{ scope.row.postName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="显示顺序">
        <template slot-scope="scope">
          <span>{{ scope.row.postSort }}</span>
        </template>
      </el-table-column>
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
        <el-form-item label="岗位ID" prop="username" v-if="false">
          <el-input v-model="form.postId" placeholder="岗位ID"></el-input>
        </el-form-item>
        <el-form-item label="岗位编码" prop="username">
          <el-input v-model="form.postCode" placeholder="岗位编码"></el-input>
        </el-form-item>
        <el-form-item label="岗位名称" prop="username">
          <el-input v-model="form.postName" placeholder="岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="username">
          <el-input v-model="form.postSort" placeholder="显示顺序"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="username">
          <el-input v-model="form.remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { addObj, delObj, fetchList, putObj } from '@/api/sys_post'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_sys_post',
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },
        rules: {},
        form: {},
        dialogFormVisible: false,
        dialogStatus: '',
        sys_post_add: false,
        sys_post_upd: false,
        sys_post_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        multipleSelection: []
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
      this.sys_post_add = this.permissions['sys_post_add']
      this.sys_post_upd = this.permissions['sys_post_upd']
      this.sys_post_del = this.permissions['sys_post_del']
      this.isstatus_statusList()
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
            str += this.multipleSelection[i].postId + ','
          }
          str = str.substring(0, str.length - 1)
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
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要修改的数据',
            type: 'warn',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1){
          const row = this.multipleSelection[0]
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.form.postId = row.postId
          this.form.postCode = row.postCode
          this.form.postName = row.postName
          this.form.postSort = row.postSort
          this.form.remark = row.remark
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
      resetTemp() {
        this.form = {
          postId: undefined,
          postCode: '',
          postName: '',
          postSort: '',
          remark: ''
        }
      }
    }
  }
</script>
