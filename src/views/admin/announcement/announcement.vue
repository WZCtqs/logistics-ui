<template>
  <div class="app-container calendar-list-container">
    <el-form label-width="100px" class="filter-item">
      <el-row>
        <el-col :span="6">
          <el-form-item label="公告类型" class="filter-item">
            <el-select
              class="filter-item"
              v-model="listQuery.type"
              placeholder="公告类型"
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="item in announcementList"
                :key="item.id"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="公告内容" prop="username" class="filter-item">
            <el-input v-model="listQuery.content" placeholder="公告内容" @keyup.enter.native="handleFilter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button v-if="announcement_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate"
                     type="primary" icon="edit" size="small">添加
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="handleFilter"
                     type="primary" icon="edit" size="small">搜索
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-card class="box-card" :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间"
             v-for="item in list">
      <div slot="header" class="clearfix">
        <el-button v-if="announcement_del" style="float:right;padding: 3px 10px" type="text"
                   @click="handleDelete(item.announcementId)">删除
        </el-button>
        <el-button v-if="announcement_upd" style="float:right;padding: 3px 10px" type="text"
                   @click="handleUpdate(item)">修改
        </el-button>
        <span class="flexItemCard">{{item.title}}</span>
        <el-tag type="success" size="mini" v-if="item.type === '个人'">个人</el-tag>
        <el-tag size="mini" v-if="item.type === '0'">{{item.driverName}}</el-tag>
        <el-tag type="info" size="mini" v-if="item.type === '公共'">公共</el-tag>
        <el-tag type="warning" size="mini" v-if="item.type === '客服'">客服</el-tag>
      </div>
      <div class="text item">
        <span>{{ item.content }}</span>
      </div>
    </el-card>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="公告标题"></el-input>
        </el-form-item>
        <el-form-item label="公告类型" prop="type">
          <el-select
            class="filter-item"
            v-model="form.type"
            placeholder="公告类型"
          >
            <el-option
              v-for="item in announcementList"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input v-model="form.content" type="textarea" placeholder="公告内容"></el-input>
        </el-form-item>
        <el-form-item label="司机" prop="username" v-if="(form.type === '0')">
          <el-select
            class="filter-item"
            v-model="form.driverOwerId"
            placeholder="司机"
            filterable
          >
            <el-option
              v-for="item in selectAllDriverReq"
              :key="item.driverId"
              :label="item.driverName"
              :value="item.driverId">
              <span style="float: left">{{ item.driverName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.phone }}</span>
            </el-option>
          </el-select>
        </el-form-item>
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
  import { addObj, announcementObj, delObj, fetchList, putObj, selectAllDriver } from '@/api/announcement'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_announcement',
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
        rules: {
          title: [
            { required: true, message: '请输入公告标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入公告内容', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择公告类型', trigger: 'change' }
          ]
        },
        form: {
          type: '',
          content: '',
          driverOwerId: '',
          announcementId: '',
          title: '',
          radio9: '1'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        announcement_add: false,
        announcement_upd: false,
        announcement_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        announcementList: [],
        selectAllDriverReq: []
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
      this.announcement_add = this.permissions['announcement_add']
      this.announcement_upd = this.permissions['announcement_upd']
      this.announcement_del = this.permissions['announcement_del']
      this.handleAnnouncementObj()
      this.selectAllDriverList()
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
      handleDelete(id) {
        this.$confirm('是否要删除选中的帮助信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(id)
            .then(response => {
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
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(row) {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.form.title = row.title
        this.form.announcementId = row.announcementId
        this.form.content = row.content
        if (row.type === '客服') {
          this.form.type = '2'
        } else if (row.type === '公共') {
          this.form.type = '1'
        } else if (row.type === '个人') {
          this.form.type = '0'
        }
        this.form.driverOwerId = row.driverOwerId
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
      handleAnnouncementObj() {
        announcementObj().then(res => {
          this.announcementList = res.data
        })
      },
      selectAllDriverList() {
        selectAllDriver().then(response => {
          this.selectAllDriverReq = response.data
        })
      },
      resetTemp() {
        this.form = {
          type: '',
          driverOwerId: '',
          content: '',
          announcementId: ''
        }
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      }
    }
  }
</script>

<style>
  .text.item {
    font-size: 14px;
  }
</style>
