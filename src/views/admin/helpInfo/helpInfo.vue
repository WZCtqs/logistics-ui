<template>
  <div class="app-container calendar-list-container">
    <el-form label-width="100px" class="filter-item">
      <el-row>
        <el-col :span="6">
          <el-form-item label="类型" class="filter-item">
            <el-select
              class="filter-item"
              v-model="listQuery.type"
              placeholder="公告类型"
              @change="handleFilter"
              clearable
            >
              <el-option label="公众号" value="0"></el-option>
              <el-option label="小程序" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="文章题目" class="filter-item">
            <el-input v-model="listQuery.title" placeholder="公告内容" @keyup.enter.native="handleFilter"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="filter-container">
      <div>
        <el-button v-if="help_info_add" class="filter-item" style="margin-left: 10px;"
                   type="primary" icon="edit" size="mini" @click="handleCreate">新增
        </el-button>
        <el-button v-if="help_info_upd" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleUpdate">编辑
        </el-button>
        <el-button v-if="help_info_del" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleDelete">删除
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" @click="handleFilter"
                   type="primary" icon="edit" size="small">搜索
        </el-button>
      </div>
    </div>
    <el-table
      :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="80">
      </el-table-column>
      <el-table-column
        type="index"
      >
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="100"
        center
      >
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.type === '0'">公众号</el-tag>
          <el-tag type="info" v-if="scope.row.type === '1'">小程序</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章题目"
      >
        <template slot-scope="scope">
          <span @click="handleDetail(scope.row)" class="helpInfoTitle">{{ scope.row.title }}</span>
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
    <el-dialog
      :title="formTitle"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <div v-if="formTitleContent" v-html="formTitleContent" class="formContent">
      </div>
      <div v-else>
        暂无内容
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="formTitle"
      :visible.sync="dialogFormVisible"
      width="90%"
    >
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="id" prop="informationId" v-if="false">
              <el-input v-model="form.informationId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="4">
            <el-form-item label="帮助类型" prop="type">
              <el-select v-model="form.type">
                <el-option label="公众号" value="0"></el-option>
                <el-option label="小程序" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <quill-editor v-model="form.content"
                      ref="myQuillEditor">
        </quill-editor>
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
  import { addObj, delObj, fetchList, getDetail, putObj } from '@/api/helpInfo'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'table_help_info',
    components: {
      quillEditor
    },
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
        dialogStatus: '',
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择帮助类型', trigger: 'change' }
          ]
        },
        form: {
          content: '',
          informationId: '',
          title: '',
          type: ''
        },
        dialogVisible: false,
        dialogFormVisible: false,
        dialogStatus: '',
        help_info_add: false,
        help_info_upd: false,
        help_info_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        announcementList: [],
        selectAllDriverReq: [],
        formTitle: '',
        formTitleContent: '',
        multipleSelection: ''
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
      this.help_info_add = this.permissions['help_info_add']
      this.help_info_upd = this.permissions['help_info_upd']
      this.help_info_del = this.permissions['help_info_del']
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
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(row) {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要修改的数据',
            type: 'warn',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          const row = this.multipleSelection[0]
          this.form.informationId = row.informationId
          this.form.title = row.title
          this.form.type = row.type
          getDetail(this.form.informationId).then(res => {
            this.form.content = res.data.data.content
          })
          this.dialogStatus = 'update'
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
      handleDelete() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除的数据',
            type: 'warn',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          this.$confirm('是否要删除选中的帮助信息', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delObj(this.multipleSelection[0].informationId).then(response => {
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
        } else {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].informationId + ','
          }
          str = str.substring(0, str.length - 1)
          this.$confirm('是否要删除选中的帮助信息', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delObj(str).then(response => {
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
          content: '',
          informationId: '',
          title: '',
          type: ''
        }
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleDetail(item) {
        this.formTitle = item.title
        getDetail(item.informationId).then(res => {
          this.formTitleContent = res.data.data.content
        })
        this.dialogVisible = true
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
    }
  }
</script>

<style>
  .helpInfoTitle {
    text-decoration: underline;
    cursor: pointer;
  }

  .formContent pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
</style>
