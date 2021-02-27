<template>
  <div class="app-container calendar-list-container mesContainer">
    <el-tabs v-model="activeName">
      <el-tab-pane label="短信设置"
                   name="first">
        <el-switch style="display: block"
                   v-model="isSendReq"
                   active-text="开启短信提醒"
                   class="mesSwitch"
                   @change="handleSwitchChange(isSendReq)"
                   active-value="0"
                   inactive-value="1">
        </el-switch>
        <div class="mesDiv"
             v-for="(item,index) in smsMessageObj"
             :key="index">
          <p class="bold">{{item.tplName}}</p>
          <p>运单: <span style="margin-left: 12px;">{{item.tpl_content}}</span></p>
          <p>接收人:&nbsp;
            <!--<el-checkbox-->
            <!--v-if="item.sendObj ==='0'"-->
            <!--class="checkBoxSms"-->
            <!--label="发货人"-->
            <!--border-->
            <!--size="medium"-->
            <!--v-model="item.isPicker"-->
            <!--@change="handleIsPicker(index,item.isPicker)"-->
            <!--&gt;</el-checkbox>-->
            <el-checkbox v-if="item.sendObj ==='0'"
                         class="checkBoxSms"
                         label="收货人"
                         border
                         size="medium"
                         v-model="item.isReceice"
                         @change="handleIsReceice(index,item.isReceice)"></el-checkbox>
            <el-checkbox v-if="item.sendObj ==='1'"
                         class="checkBoxSms"
                         label="司机"
                         border
                         size="medium"
                         v-model="item.isDriver"
                         @change="handleIsDriver(index,item.isDriver)"></el-checkbox>
          </p>
        </div>
        <el-button type="primary"
                   @click="submit">提交</el-button>
      </el-tab-pane>
      <el-tab-pane label="税率设置"
                   name="second">
        <div v-loading="loading">
          <el-form ref="form"
                   :model="form"
                   label-width="100px"
                   inline>
            <el-form-item label="新增税率:">
              <el-input v-model="form.taxRate"
                        style="width: 220px;">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         icon="el-icon-edit-outline"
                         @click="handleSetTax('form')">新增</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                         icon="el-icon-edit-outline"
                         @click="handleUpdateTax('form')">设置默认税率</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="list"
                    class="systemTab"
                    style="width: 100%"
                    @selection-change="handleSelectionChangeTax">
            <el-table-column type="selection"
                             width="55">
            </el-table-column>
            <el-table-column align="center"
                             label="税率"
                             prop="taxRate"
                             sortable>
              <template slot-scope="scope">
                <span class="text item"
                      v-if="scope.row.delFlag === '1'">{{ scope.row.taxRate }}%
                </span>
                <el-tag type="success"
                        class="text item"
                        v-if="scope.row.delFlag === '0'">{{ scope.row.taxRate}}%
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="修改日期"
                             prop="createTime"
                             sortable>
              <template slot-scope="scope">
                <span class="text item"
                      v-if="scope.row.delFlag === '1'">{{ scope.row.createTime |moment('YYYY-MM-DD hh:mm:ss a')}}
                </span>
                <el-tag type="success"
                        class="text item"
                        v-if="scope.row.delFlag === '0'">{{ scope.row.createTime |moment('YYYY-MM-DD hh:mm:ss a')}}
                </el-tag>

              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini"
                           type="danger"
                           @click="handleDeleteTax(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="箱型设置"
                   name="third">
        <div>
          <el-button class="filter-item"
                     style="margin-left: 10px;"
                     type="primary"
                     icon="edit"
                     size="mini"
                     @click="handleAdd0">
            新增
          </el-button>
          <el-button class="filter-item"
                     style="margin-left: 10px;"
                     type="primary"
                     icon="edit"
                     size="mini"
                     @click="handleEdit0">
            编辑
          </el-button>
          <el-button class="filter-item"
                     style="margin-left: 10px;"
                     type="primary"
                     icon="edit"
                     size="mini"
                     @click="handleDelete">
            删除
          </el-button>
        </div>
        <div>
          <el-table :key="tableKey"
                    :data="list1"
                    v-loading="listLoading"
                    element-loading-text="给我一点时间"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%"
                    @selection-change="handleSelectionChange">

            <el-table-column type="selection"
                             width="55"></el-table-column>

            <el-table-column align="center"
                             label="箱型">
              <template slot-scope="scope">
                <!-- <el-input type="text"
                          v-model="scope.row.containerType"
                          placeholder="箱型"></el-input> -->
                          {{scope.row.containerType}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :visible.sync="dialogFormVisible"
               center>

      <el-form :model="form1"
               :rules="rules"
               ref="form1"
               label-width="100px">
        <el-form-item label="箱型:"
                      prop="containerType">
          <el-input v-model="form1.containerType"
                    placeholder="箱型"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleAdd"
                   size="medium"
                   type="primary"
                   class="bigButton"
                   v-if="this.formStatus=='add'">确定</el-button>
        <el-button @click="handleEdit"
                   size="medium"
                   type="primary"
                   class="bigButton"
                   v-if="this.formStatus=='edit'">确定</el-button>
        <el-button @click="dialogFormVisible = false"
                   size="medium"
                   type="primary"
                   class="bigButton">取消</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { fetchSmsObj, getTaxRate, postTaxRate, setDefaultRate, putSmsObj, deleteRate } from '@/api/setMessage'
import { getToken } from '@/util/auth'

import {
  containerTypeGet,
  containerTypeEdit,
  containerTypedelete,
  containerTypeAdd
} from '@/api/containerType'
export default {
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      tableKey: 0,
      value4: true,
      closeSetFlag: false,
      smsMessageObj: [],
      isSendReq: '',
      activeName: 'first',
      listLoading: true,
      list: [],
      list1: [],
      multipleSelection: [],
      form: {
        taxRate: ''
      },
      loading: false,
      dialogFormVisible: false,
      form1: {
        containerType: null,
      },
      formStatus: null,
      rules: {
        containerType: [
          { required: true, message: '请输入箱型', trigger: 'blur' }
        ],
      },
      multipleSelectionTax: []
    }
  },
  created () {
    this.handlefetchSmsObj()
    this.handleMessageObj()
    this.getList()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleAdd0 () {
      this.dialogFormVisible = true
      this.formStatus = 'add'
      this.form1 = {
        containerType: null,
      }
    },
    handleAdd () {
      
      this.$refs['form1'].validate((valid) => {
        
        if (valid) {
          containerTypeAdd(this.form1).then(res => {
            if (res.data.data) {
              this.$notify({
                title: '提示',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
              this.getList()
            }
          })
        }
      })
    },
    handleDelete () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要修改的数据',
          type: 'warning',
          duration: 2000
        })
      } else {
        var idarr = []
        this.multipleSelection.forEach(function (item, index) {
          idarr.push(item.id)
        })
        var params = {
          ids: idarr.join(",")
        }
        containerTypedelete(params).then(res => {
          if (res.data.data) {
            this.$notify({
              title: '提示',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          }
        })
      }
    },
    handleEdit0 () {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要修改的数据',
          type: 'warning',
          duration: 2000
        })
      } else if (this.multipleSelection.length === 1) {
        this.dialogFormVisible = true
        this.formStatus = 'edit'
        this.form1 = this.multipleSelection[0]
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行修改',
          type: 'error',
          duration: 2000
        })
      }
    },
    handleEdit () {
      this.$refs['form1'].validate((valid) => {
        
        if (valid) {
          console.log(this.form1)
          
          containerTypeEdit(this.form1).then(res => {
            if (res.data.data) {
              this.$notify({
                title: '提示',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false
              this.getList()
            }
          })
        }
      })
    },
    getList () {
      containerTypeGet().then(res => {
        this.list1 = res.data
        this.listLoading = false
      })
    },
    handlefetchSmsObj () {
      fetchSmsObj().then(res => {
        this.smsMessageObj = res.data
        this.isSendReq = this.smsMessageObj[0].isSend
      })
    },
    handleSelectionChangeTax (val) {
      this.multipleSelectionTax = val
    },
    handleMessageObj () {
      getTaxRate().then(res => {
        this.list = res.data
      })
    },
    handleSetTax (formName) {
      if (!this.form.taxRate) {
        this.$message.error('税率不能为空')
        return false
      } else {
        const reg = /^\d+(\.\d+)?$/
        if (reg.test(this.form.taxRate)) {
          if (this.form.taxRate < 100) {
            this.loading = true
            postTaxRate(this.form).then(res => {
              this.loading = false
              if (res.data.data) {
                this.form.taxRate = ''
                this.handleMessageObj()
                this.$notify({
                  title: '成功',
                  message: '设置成功',
                  type: 'success'
                })
              } else {
                this.$notify.error({
                  title: '错误',
                  message: '设置失败'
                })
              }
            })
          } else {
            this.$message.error('税率不能大于100')
            return false
          }
        } else {
          this.$message.error('请输入正确的税率')
          return false
        }
      }
    },
    handleSwitchChange (value) {
      if (value === '0') {
        for (let i = 0; i < this.smsMessageObj.length; i++) {
          this.smsMessageObj[i].isPicker = true
          this.smsMessageObj[i].isReceice = true
          this.smsMessageObj[i].isDriver = true
        }
      } else {
        for (let i = 0; i < this.smsMessageObj.length; i++) {
          this.smsMessageObj[i].isPicker = false
          this.smsMessageObj[i].isReceice = false
          this.smsMessageObj[i].isDriver = false
        }
      }
    },
    handleIsPicker (index, value) {
      this.smsMessageObj[index].isPicker = value
      if (this.smsMessageObj[index].isPicker) {
        this.isSendReq = '0'
      }
    },
    handleIsReceice (index, value) {
      this.smsMessageObj[index].isReceice = value
      if (this.smsMessageObj[index].isReceice) {
        this.isSendReq = '0'
      }
    },
    handleIsDriver (index, value) {
      this.smsMessageObj[index].isDriver = value
      if (this.smsMessageObj[index].isDriver) {
        this.isSendReq = '0'
      }
    },
    submit () {
      let tempArr = []
      for (let i = 0; i < this.smsMessageObj.length; i++) {
        let tempObj = {
          'isPicker': this.smsMessageObj[i].isPicker,
          'isReceice': this.smsMessageObj[i].isReceice,
          'isDriver': this.smsMessageObj[i].isDriver,
          'tpl_id': this.smsMessageObj[i].tpl_id
        }
        tempArr.push(tempObj)
      }
      let submitObj = {
        'isSend': this.isSendReq,
        'tempList': tempArr,
        'tenantId': this.smsMessageObj[0].tenantId
      }
      putSmsObj(submitObj).then(res => {
        if (res.data) {
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
          this.handlefetchSmsObj()
        } else {
          this.$notify({
            title: '失败',
            message: '更新失败',
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    handleDeleteTax (row) {
      if (row.delFlag === '0') {
        this.$notify.error({
          title: '错误',
          message: '默认税率不能删除，请先更换默认税率'
        });
      } else {
        deleteRate(row.id).then(res => {
          if (res.data.data) {
            this.handleMessageObj()
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.msg
            });
          }
        })
      }
    },
    handleUpdateTax () {
      if (this.multipleSelectionTax.length) {
        if (this.multipleSelectionTax.length == 1) {
          
          setDefaultRate(this.multipleSelectionTax[0].id).then(res => {
            if (res.data.data) {
              this.handleMessageObj()
            } else {
              this.$notify.error({
                title: '错误',
                message: res.data.msg
              });
            }
          })

        } else {
          this.$notify({
            title: '警告',
            message: '只能选择一条数据',
            type: 'warning'
          });
        }
      } else {
        this.$notify({
          title: '警告',
          message: '请选择数据',
          type: 'warning'
        });
      }
    },
  }
}
</script>
<style scoped>
.mesContainer {
  margin-left: 16px;
}

.mesSwitch {
  margin-bottom: 24px;
}

.mesDiv {
  min-height: 120px;
  width: 100%;
  padding: 15px 0;
  border-top: 1px solid #c9ced9;
  border-bottom: 1px solid #c9ced9;
  color: #333;
}

.mesDiv:nth-child(2n + 1) {
  border: none;
}

.mesDiv p {
  font-size: 12px;
  color: #555;
  margin-top: 5px;
}

.mesDiv .bold {
  font-weight: 700;
  color: #000;
}

.checkBoxSms {
  display: inline-block;
}

.flexItemCard {
  font-size: 16px;
}

.flexSystem {
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-items: center;*/
  /*justify-content: space-between;*/
}

.text {
  font-size: 16px;
  padding: 12px;
  height: 44px;
  line-height: 20px;
}
</style>
