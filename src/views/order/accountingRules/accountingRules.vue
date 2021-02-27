<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="发货方" name="first">
          <el-row style="width: 350px;padding-bottom: 10px;">
            <el-col :span="13">
              <el-input v-model="ruleName" @keyup.enter.native="handleFilter('发货方')"></el-input>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-button size="mini" type="primary" @click="handleFilter('发货方')">搜索</el-button>
            </el-col>
            <el-col :span="5">
              <el-button size="mini" type="primary" @click="handleAddRules('发货方')">新增</el-button>
            </el-col>
          </el-row>
          <el-tabs tab-position="left" class="firstContent">
            <template v-for="(item,index) in lists " :ref="lists">
              <el-tab-pane>
                <span slot="label" @click="handleShowDetail(item)">
                  <span class="rulesTitle">
                    <i class="el-icon-document"></i>
                    <div class="rulesInlineBlock">
                      <div>
                        {{item.ruleName}}
                      </div>
                      <div>
                        {{item.objName}}
                      </div>
                    </div>
                  </span>
                  <span class="edit" @click="handleEditRules(item)">修改</span>
                  <span class="del" @click="handleDelRules(item.id, item.objType)">删除</span>
                </span>
                <div class="firstContentDiv">
                  <el-form label-width="100px" style="border: 1px solid #bcbec2" :rules="rules">
                    <el-row style="background-color: #f8f8f8">
                      <el-col :span="6">
                        <el-form-item label="计费方式" style="margin-top: 23px">
                          <el-select v-model="item.ruleType" placeholder="请选择计费方式">
                            <el-option label="吨公里" value="吨公里"></el-option>
                            <el-option label="方公里" value="方公里"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="9" :offset="0">
                        <el-form-item label="起送量货物 ＜" style="margin-top: 23px">
                          <el-input v-model="detailItemForm.detailItem[0].limitNum" disabled="disabled">
                            <template slot="append">吨，按<span class="limitLength">{{detailItemForm.detailItem[0].limitNum}}</span>吨
                            </template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="9">
                        <div class="rulesInlineBlock detailRuleTitle">
                          <div>
                            {{item.ruleName}}
                          </div>
                          <div>
                            {{item.objName}}
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-form ref="detailItemForm" :model="detailItemForm" :rules="rules" label-width="120px">
                      <template>
                        <template v-for="(ordAccountingRuleItem, detailIndex) in detailItemForm.detailItem">
                          <el-row style="padding-top: 20px;border-top: 1px solid #a1a4ad">
                            <el-col :span="9">
                              <template v-if="item.ruleType === '吨公里'">
                                <el-form-item label="重量≥"
                                              :prop="`detailItem.${detailIndex}.limitNum`"
                                              :rules="[{ required: true, message: '请输入重量', trigger: 'blur' }, { type: 'number', message: '重量必须为数字值'}]">
                                  <el-input v-model.number="ordAccountingRuleItem.limitNum">
                                    <template slot="append">吨</template>
                                  </el-input>
                                </el-form-item>
                              </template>
                              <template v-if="item.ruleType === '方公里'">
                                <el-form-item label="体积≥ "
                                              :prop="`detailItem.${detailIndex}.limitNum`"
                                              :rules="[{ required: true, message: '请输入体积', trigger: 'blur' }, { type: 'number', message: '体积必须为数字值'}]">
                                  <el-input v-model.number="ordAccountingRuleItem.limitNum">
                                    <template slot="append">方</template>
                                  </el-input>
                                </el-form-item>
                              </template>
                            </el-col>
                            <el-col :span="9">
                              <el-form-item label="单价="
                                            :prop="`detailItem.${detailIndex}.price`"
                                            :rules="[{ required: true, message: '请输入单价', trigger: 'blur' }, { type: 'number', message: '单价必须为数字值'}]">
                                <el-input v-model.number="ordAccountingRuleItem.price">
                                  <template slot="append">元/公里</template>
                                </el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="5" :offset="1">
                              <el-button @click="addRuleItemForm(index)" type="primary" class="rulesBtn">新增</el-button>
                              <el-button @click="delRuleItemForm(index, detailIndex)" type="danger" class="rulesBtn">删除
                              </el-button>
                            </el-col>
                          </el-row>
                        </template>
                      </template>
                    </el-form>
                  </el-form>
                  <el-button type="primary" style="display: block;margin: 15px auto;"
                             @click="handleSave('detailItemForm',item)">保存
                  </el-button>
                </div>
              </el-tab-pane>
            </template>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="承运商" name="second">
          <el-row style="width: 350px;padding-bottom: 10px;">
            <el-col :span="13">
              <el-input v-model="ruleName" @keyup.enter.native="handleFilter('承运商')"></el-input>
            </el-col>
            <el-col :span="5" :offset="1">
              <el-button size="mini" type="primary" @click="handleFilter('承运商')">搜索</el-button>
            </el-col>
            <el-col :span="5">
              <el-button size="mini" type="primary" @click="handleAddRules('承运商')">新增</el-button>
            </el-col>
          </el-row>
          <el-tabs tab-position="left" class="firstContent">
            <template v-for="(item,index) in lists " :ref="lists">
              <el-tab-pane>
                <span slot="label" @click="handleShowDetail(item)">
                  <span class="rulesTitle">
                    <i class="el-icon-document"></i>
                    <div class="rulesInlineBlock">
                      <div>
                        {{item.ruleName}}
                      </div>
                      <div>
                        {{item.objName}}
                      </div>
                    </div>
                  </span>
                  <span class="edit" @click="handleEditRules(item)">修改</span>
                  <span class="del" @click="handleDelRules(item.id, item.objType)">删除</span>
                </span>
                <div class="firstContentDiv">
                  <el-form label-width="100px" style="border: 1px solid #bcbec2" :rules="rules">
                    <el-row style="background-color: #f8f8f8">
                      <el-col :span="6">
                        <el-form-item label="计费方式" style="margin-top: 23px">
                          <el-select v-model="item.ruleType" placeholder="请选择计费方式">
                            <el-option label="吨公里" value="吨公里"></el-option>
                            <el-option label="方公里" value="方公里"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="9">
                        <el-form-item label="起送量货物 ＜" style="margin-top: 23px">
                          <el-input v-model="detailItemForm.detailItem[0].limitNum" disabled="disabled">
                            <template slot="append">吨，按<span class="limitLength">{{detailItemForm.detailItem[0].limitNum}}</span>吨
                            </template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="9">
                        <div class="rulesInlineBlock detailRuleTitle">
                          <div>
                            {{item.ruleName}}
                          </div>
                          <div>
                            {{item.objName}}
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                    <el-form ref="detailItemForm1" :model="detailItemForm" :rules="rules" label-width="120px">
                      <template>
                        <template v-for="(ordAccountingRuleItem, detailIndex) in detailItemForm.detailItem">
                          <el-row style="padding-top: 20px;border-top: 1px solid #a1a4ad">
                            <el-col :span="9">
                              <template v-if="item.ruleType === '吨公里'">
                                <el-form-item label="重量≥"
                                              :prop="`detailItem.${detailIndex}.limitNum`"
                                              :rules="[{ required: true, message: '请输入重量', trigger: 'blur' }, { type: 'number', message: '重量必须为数字值'}]">
                                  <el-input v-model.number="ordAccountingRuleItem.limitNum">
                                    <template slot="append">吨</template>
                                  </el-input>
                                </el-form-item>
                              </template>
                              <template v-if="item.ruleType === '方公里'">
                                <el-form-item label="体积≥"
                                              :prop="`detailItem.${detailIndex}.limitNum`"
                                              :rules="[{ required: true, message: '请输入体积', trigger: 'blur' }, { type: 'number', message: '体积必须为数字值'}]">
                                  <el-input v-model.number="ordAccountingRuleItem.limitNum">
                                    <template slot="append">方</template>
                                  </el-input>
                                </el-form-item>
                              </template>
                            </el-col>
                            <el-col :span="9">
                              <el-form-item label="单价="
                                            :prop="`detailItem.${detailIndex}.price`"
                                            :rules="[{ required: true, message: '请输入单价', trigger: 'blur' }, { type: 'number', message: '单价必须为数字值'}]">
                                <el-input v-model.number="ordAccountingRuleItem.price">
                                  <template slot="append">元/公里</template>
                                </el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="5" :offset="1">
                              <el-button @click="addRuleItemForm(index)" type="primary" class="rulesBtn">新增</el-button>
                              <el-button @click="delRuleItemForm(index, detailIndex)" type="danger" class="rulesBtn">删除
                              </el-button>
                            </el-col>
                          </el-row>
                        </template>
                      </template>
                    </el-form>
                  </el-form>
                  <el-button type="primary" style="display: block;margin: 15px auto;"
                             @click="handleSave('detailItemForm1',item)">保存
                  </el-button>
                </div>
              </el-tab-pane>
            </template>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
      <el-dialog
        title="新增规则"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="规则名称" prop="ruleName">
            <el-input v-model="form.ruleName"></el-input>
          </el-form-item>
          <template v-if="showType === 0">
            <el-form-item label="发货方" prop="ruleObjId">
              <el-select
                class="filter-item"
                v-model="form.ruleObjId"
                filterable
                placeholder="客户名称"
              >
                <el-option
                  v-for="item in customerListReq"
                  :key="item.customerId"
                  :label="item.customerName"
                  :value="item.customerId">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-if="showType === 1">
            <el-form-item label="承运方" prop="ruleObjId">
              <el-select
                class="filter-item"
                v-model="form.ruleObjId"
                filterable
                placeholder="车队名称"
              >
                <el-option
                  v-for="item in truckTeamListReq"
                  :key="item.truckTeamId"
                  :label="item.teamName"
                  :value="item.truckTeamId">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改规则"
        :visible.sync="editDialogVisible"
        width="30%"
      >
        <el-form ref="editForm" :model="editForm" label-width="80px" :rules="rules">
          <el-form-item label="规则名称" prop="ruleName">
            <el-input v-model="editForm.ruleName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updataForm('editForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {
    customerAddListObj,
    customerListObj,
    deleteRuleObj,
    getDetailListByIdObj,
    getListRuleObj,
    putObj,
    truckTeamListObj
  } from '@/api/ordAccountingRule'
  import { mapGetters } from 'vuex'

  export default {
    data: function() {
      return {
        form: {
          ruleName: '',
          objType: '',
          ruleObjId: ''
        },
        calcStyle: [{
          id: 0,
          label: '吨公里',
          value: '0'
        }, {
          id: 1,
          label: '方公里',
          value: '1'
        }],
        editForm: {
          id: '',
          ruleName: '',
          objType: ''
        },
        dialogVisible: false,
        editDialogVisible: false,
        activeName: 'first',
        lists: [{
          id: '',
          ruleName: '',
          objType: '',
          ruleObjId: '',
          objName: '',
          ruleObjIds: '',
          ruleType: '',
          startNum: '',
          ordAccountingRule: {
            id: '',
            ruleId: '',
            limitNum: '',
            price: ''
          }
        }],
        rules: {
          ruleName: [
            { required: true, message: '请输入规则名称', trigger: 'blur' }
          ],
          ruleObjId: [
            { required: true, message: '请选择发货方', trigger: 'change' }
          ],
          limitNum: [
            { required: true, message: '重量不能为空1', trigger: 'blur' },
            { type: 'number', message: '重量必须为数字值', trigger: ['blur', 'change'] }
          ]
        },
        customerListReq: [],
        ruleName: '',
        objName: '',
        detailItemForm: {
          detailItem: [
            {
              id: undefined,
              ruleId: undefined,
              limitNum: '',
              price: '',
              createBy: '',
              createTime: '',
              updateBy: '',
              updateTime: null
            }
          ]
        },
        truckTeamListReq: [],
        showType: 0,
        tabPosition: 'left'
      }
    },
    created() {
    },
    mounted() {
      this.handleGetListRuleName('发货方')
      this.handleCustomerListObj()
      this.handleTruckTeamListObj()
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    methods: {
      handleFilter(name) {
        this.objName = this.ruleName
        const str = name + '&ruleName=' + this.ruleName + '&objName=' + this.objName
        this.handleGetListRuleName(str)
      },
      handleCustomerListObj() {
        customerListObj().then(res => {
          this.customerListReq = res.data
        })
      },
      handleClick(event) {
        this.handleGetListRuleName(event.label)
      },
      handleGetListRuleName(str) {
        getListRuleObj(str).then(res => {
          this.lists = res.data
          for (let i = 0; i < this.lists.length; i++) {
            if (this.lists[i].ruleType === '' || !isNaN(this.lists[i].ruleType)) {
              this.lists[i].ruleType = '吨公里'
            }
            if (this.lists[i].ordAccountingRule.length === 0) {
              this.lists[i].ordAccountingRule.push({
                id: undefined,
                ruleId: undefined,
                limitNum: '',
                price: '',
                createBy: '',
                createTime: '',
                updateBy: '',
                updateTime: null
              })
            }
          }
          this.handleShowDetail(this.lists[0])
        })
      },
      handleShowDetail(row) {
        if (row) {
          getDetailListByIdObj(row.id).then(res => {
            this.detailItemForm.detailItem = res.data
            if (this.detailItemForm.detailItem.length === 0) {
              this.detailItemForm.detailItem.push({
                id: undefined,
                ruleId: undefined,
                limitNum: '',
                price: '',
                createBy: '',
                createTime: '',
                updateBy: '',
                updateTime: null
              })
            }
          })
        }
      },
      handleAddRules: function(str) {
        this.dialogVisible = true
        if (str === '发货方') {
          this.showType = 0
        } else if (str === '承运商') {
          this.showType = 1
        }
        this.form.ruleName = ''
        this.form.ruleObjId = ''
        this.form.objType = str
      },
      submitForm: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible = false

            customerAddListObj(this.form).then(res => {

              if (res.data.data) {
                this.handleGetListRuleName(this.form.objType)
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          } else {
            this.$message.error('必填项不能为空')
            return false
          }
        })
      },
      handleEditRules: function(row) {
        this.editForm.ruleName = row.ruleName
        this.editForm.objType = row.objType
        this.editForm.id = row.id
        this.editDialogVisible = true
      },
      handleDelRules: function(index, str) {
        this.$confirm('是否要删除此条计费规则', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRuleObj(index).then(res => {
            if (res.data.data) {
              this.handleGetListRuleName(str)
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
            }
          })
          this.lists.splice(index, 1)
        })
      },
      updataForm: function(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.editDialogVisible = false
            putObj(this.editForm).then(res => {
              if (res.data) {
                this.handleGetListRuleName(this.editForm.objType)
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          } else {
            this.$message.error('必填项不能为空')
            return false
          }
        })
      },
      addRuleItemForm(index) {
        this.detailItemForm.detailItem.push({
          id: undefined,
          ruleId: undefined,
          limitNum: '',
          price: '',
          createBy: '',
          createTime: '',
          updateBy: '',
          updateTime: null
        })
      },
      delRuleItemForm(index, detailIndex) {
        this.detailItemForm.detailItem.splice(detailIndex, 1)
      },
      handleSave(formName, row) {
        let validateSelf = true
        let validateEqual = true
        let arrTemp = []
        row.ordAccountingRule = []
        for (let i = 0; i < this.detailItemForm.detailItem.length; i++) {
          row.ordAccountingRule.push(this.detailItemForm.detailItem[i])
          if ((this.detailItemForm.detailItem[i].limitNum === '') || (this.detailItemForm.detailItem[i].price === '')) {
            validateSelf = false
          }
          arrTemp.push(this.detailItemForm.detailItem[i].limitNum)
        }
        const nary = arrTemp.sort()
        for (let i = 0; i < arrTemp.length; i++) {
          if (nary[i] === nary[i + 1]) {
            validateEqual = false
          }
        }
        if (validateSelf) {
          if (validateEqual) {
            putObj(row).then(res => {
              if (res.data) {
                this.handleShowDetail(row)
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
              }
            })
          } else {
            this.$message.error('添加的重量等级已存在')
            return false
          }
        } else {
          this.$message.error('必填项不能为空')
          return false
        }
      },
      handleTruckTeamListObj() {
        truckTeamListObj().then(res => {
          this.truckTeamListReq = res.data
        })
      }
    }
  }
</script>
<style>
  .firstContent .el-tabs__header is-left {
    width: 240px;
  }

  .firstContent .el-tabs__item {
    height: 80px;
    border-radius: 10px;
  }

  .firstContent .el-tabs__item span {
    padding-left: 5px;
    padding-right: 20px;
    border-radius: 16px;
  }

  .firstContent .el-tabs__item:hover {
    background-color: #409EFF;
    color: #ffffff;
  }

  .firstContent .el-tabs__item:hover .rulesTitle {
    background-color: #409EFF;
    color: #ffffff;
  }

  .firstContent .el-tabs__item:hover .rulesTitle i {
    border-color: #ffffff;
  }

  .firstContent .el-tabs__item.is-active:hover {
    background-color: #409EFF;
    color: #ffffff;
  }

  .firstContent .el-tabs__item.is-active:hover .rulesTitle {
    background-color: #409EFF;
    color: #ffffff;
  }

  .firstContent .el-tabs__item.is-active:hover .rulesTitle i {
    border-color: #ffffff;
  }

  .firstContent .el-tabs__item.is-active .rulesTitle {
    color: #409EFF;
  }

  .firstContent .el-tabs__item.is-active .rulesTitle i {
    border-color: #409EFF;
  }

  .firstContent .el-tabs__item span {
    float: left;
  }

  .firstContent .rulesTitle {
    color: #000;
    padding-right: 6em;
  }

  .firstContent .rulesTitle i {
    padding: 5px;
    border-radius: 24px;
    border: 1px solid #000;
  }

  .firstContent .edit {
    padding-right: 8px;
  }

  .firstContent .edit, .firstContent .del {
    font-size: 12px;
    line-height: 80px;
    padding-left: 15px;
    border-radius: 0px;
  }

  .firstContent .rulesTitle {
    width: 11em;
    text-align: left;
    height: 80px;
  }

  .rulesBtn {
    padding: 12px 8px;
  }

  .rulesInlineBlock {
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;
    font-size: 12px;
  }

  .detailRuleTitle {
    text-align: right;
    float: right;
    line-height: 40px;
    margin-right: 15px;
    color: #333;
  }

  .detailRuleTitle .rulesInlineBlock div {
    font-size: 12px;
  }

  .limitLength {
    max-width: 25px;
  }
</style>
