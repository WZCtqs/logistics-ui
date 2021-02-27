<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div>
        <el-button v-if="sys_tanent_add" class="filter-item" style="margin-left: 10px;"
                   type="primary" icon="edit" size="mini" @click="handleCreate">新增
        </el-button>
        <el-button v-if="sys_tanent_upd" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleUpdate">编辑
        </el-button>
        <el-button v-if="sys_tanent_del" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleDelete">删除
        </el-button>
        <el-button v-if="sys_tanent_act" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleActive">激活
        </el-button>
        <el-button v-if="sys_tanent_for" class="filter-item" style="margin-left: 10px;"
                   type="primary" size="mini" @click="handleForbidden">禁用
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
      <el-table-column align="center" label="租户id" v-if="false">
        <template slot-scope="scope">
          <span>{{ scope.row.tenantId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="租户公司名称">
        <template slot-scope="scope">
          <span>{{ scope.row.tanentName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司简称">
        <template slot-scope="scope">
          <span>{{ scope.row.shortName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="公司地址">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="租户手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="到期时间">
        <template slot-scope="scope">
          <span>{{ scope.row.expireTime | moment('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否临期">
        <template slot-scope="scope">
          <span v-if="scope.row.isExpried === 0">是</span>
          <span v-if="scope.row.isExpried=== 1">否</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="租户账号状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'">禁用</span>
          <span v-if="scope.row.status === '1'">开通</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="租户密码">
        <template slot-scope="scope">
          <el-button type="primary" @click="changeToggle(scope.row.oldPsw)" size="mini">查看密码</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="appid">
        <template slot-scope="scope">
          <span>{{ scope.row.appid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="appsecret">
        <template slot-scope="scope">
          <span>{{ scope.row.appsecret }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="微信号原始id">
        <template slot-scope="scope">
          <span>{{ scope.row.weixinId }}</span>
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
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="appid" prop="username">
          <el-input v-model="form.appid" placeholder="appid"></el-input>
        </el-form-item>
        <el-form-item label="appsecret" prop="username">
          <el-input v-model="form.appsecret" placeholder="appsecret"></el-input>
        </el-form-item>
        <el-form-item label="微信号原始id" prop="username">
          <el-input v-model="form.weixinId" placeholder="微信号原始id"></el-input>
        </el-form-item>

        <!--<el-form-item label="租户id" prop="username">-->
        <!--<el-input v-model="form.tenantId" placeholder="租户id"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="租户公司名称" prop="tanentName">
          <el-input v-model="form.tanentName" placeholder="租户公司名称"></el-input>
        </el-form-item>
        <el-form-item label="租户公司简称" prop="shortName">
          <el-input v-model="form.shortName" placeholder="租户公司名称"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <el-input v-model="form.address" placeholder="公司地址"></el-input>
        </el-form-item>
        <el-form-item label="租户手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="租户手机号"></el-input>
        </el-form-item>
        <el-form-item label="到期时间" prop="expireTime">
          <el-date-picker type="date" placeholder="到期时间" v-model="form.expireTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="租户账号状态" prop="status">
          <el-select
            class="filter-item"
            v-model="form.status"
            placeholder="请选择"
          >
            <el-option
              v-for="item in StatusReq"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否合作" prop="isPartner">
          <el-select
            class="filter-item"
            v-model="form.isPartner"
            placeholder="请选择"
          >
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-tree
        v-if="dialogStatus === 'update'"
        class="filter-tree"
        :data="treeData"
        :default-checked-keys="checkedKeys"
        :check-strictly="false"
        node-key="id"
        highlight-current
        :props="defaultProps"
        show-checkbox ref="menuTree"
        :filter-node-method="filterNode">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="showToggle"
      width="30%"
      center>
      <div style="text-align: center;">密码:<span id="msg">{{password}}</span></div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="showToggle = false">关闭</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    activeObj,
    addObj,
    allTreeObj,
    delObj,
    fetchList,
    forbiddenObj,
    getObj,
    isExpried_status,
    isstatus_status,
    putObj,
    tanentTreeObj
  } from '@/api/sys_tanent'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_sys_tanent',
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
          tanentName: [
            { required: true, message: '请输入租户公司名称', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入租户公司地址', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          expireTime: [
            { required: true, message: '请输入到期时间', trigger: 'change' }
          ],
          isPartner: [
            { required: true, message: '请选择是否合作', trigger: 'change' }
          ]
        },
        form: {
          tenantId: undefined,
          status: '',
          expireTime: '',
          isPartner: '',
          appid: '',
          appsecret: '',
          weixinId: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        sys_tanent_add: false,
        sys_tanent_upd: false,
        sys_tanent_del: false,
        sys_tanent_act: false,
        sys_tanent_for: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        multipleSelection: [],
        statusTemp: '',
        StatusReq: [],
        isExpriedStatusTemp: '',
        isExpriedStatusReq: [],
        treeData: [],
        checkedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        showToggle: false,
        password: ''
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
      this.sys_tanent_add = this.permissions['sys_tanent_add']
      this.sys_tanent_upd = this.permissions['sys_tanent_upd']
      this.sys_tanent_del = this.permissions['sys_tanent_del']
      this.sys_tanent_act = this.permissions['sys_tanent_act']
      this.sys_tanent_for = this.permissions['sys_tanent_for']
      this.isstatus_statusList()
      this.isExpried_statusList()
    },
    methods: {
      changeToggle(str) {
        this.showToggle = true
        this.password = str
      },
      getList() {
        this.listLoading = false
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      /**
       * 解析出所有的叶子节点id
       * @param json 待解析的json串
       * @param idArr 原始节点数组
       * @param temp 临时存放节点id的数组
       * @return 叶子节点id数组
       */
      resolveAllLeafNodeId(json, idArr, temp) {
        for (let i = 0; i < json.length; i++) {
          const item = json[i]
          // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
          if (item.children && item.children.length !== 0) {
            this.resolveAllLeafNodeId(item.children, idArr, temp)
          } else {
            temp.push(idArr.filter(id => id === item.id))
          }
        }
        return temp
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
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
            str += this.multipleSelection[i].tenantId + ','
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
      handleActive() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要修改的数据',
            type: 'warn',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          const row = this.multipleSelection[0]
          const str = row.tenantId
          activeObj(str).then(response => {
            this.getList()
            this.$notify({
              title: '成功',
              message: '激活成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          this.$notify({
            title: '警告',
            message: '只能激活一条数据',
            type: 'error',
            duration: 2000
          })
        }
      },
      handleForbidden() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要修改的数据',
            type: 'warn',
            duration: 2000
          })
        } else if (this.multipleSelection.length === 1) {
          const row = this.multipleSelection[0]
          const str = row.tenantId
          forbiddenObj(str).then(response => {
            if (response.data.data) {
              this.getList()
              this.$notify({
                title: '成功',
                message: '禁用成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: '失败',
                message: '操作失败',
                type: 'error',
                duration: 2000
              })
            }
          })
        } else {
          this.$notify({
            title: '警告',
            message: '只能禁用一条数据',
            type: 'error',
            duration: 2000
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
        } else if (this.multipleSelection.length === 1) {
          const row = this.multipleSelection[0]
          getObj(row.tenantId).then(res => {
            this.form = res.data.data
            this.form.tenantId = res.data.data.tenantId
            return allTreeObj()
          }).then(response => {
            this.treeData = response.data
            return tanentTreeObj(this.form.tenantId)
          }).then(response => {
            this.checkedKeys = response.data
            this.checkedKeys = this.resolveAllLeafNodeId(this.treeData, this.checkedKeys, [])
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
          })
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
        this.form.status = this.statusTemp
        this.form.isExpried = this.isExpriedStatusTemp
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form)
              .then((res) => {
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
        this.form.menuIds = ''
        this.form.menuIds = this.$refs.menuTree.getCheckedKeys().join(',').concat(',').concat(this.$refs.menuTree.getHalfCheckedKeys().join(','))
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
            return false
          }
        })
      },
      resetTemp() {
        this.form = {
          tenantId: undefined,
          tanentName: '',
          shortName: '',
          address: '',
          phone: '',
          expireTime: '',
          menuIds: '',
          isPartner: '',
          appid: '',
          appsecret: '',
          weixinId: ''
        }
        this.statusTemp = ''
        this.isExpriedStatusTemp = ''
      },
      isstatus_statusList() {
        isstatus_status().then(response => {
          this.StatusReq = response.data
        })
      },
      isExpried_statusList() {
        isExpried_status().then(response => {
          this.isExpriedStatusReq = response.data
        })
      }
    }
  }
</script>
<style>
  .CTanentCopy {
    margin-left: 20px;
    font-size: 16px;
    cursor: pointer;
  }
</style>
