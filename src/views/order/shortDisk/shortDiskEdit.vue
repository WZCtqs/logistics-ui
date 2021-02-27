<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <div class="header">盘短订单中心</div>
      <p>
        订单编号:
      </p>
      <el-form ref="form" label-width="100px" :model="form" :rules="formRules" :disabled="formStatus">
        <h2 class="cargoFormTitle">订单信息</h2>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业务日期" prop="orderDate">
              <el-date-picker type="date" v-model="form.orderDate" placeholder="业务日期" format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="班列日期" prop="classDate">
              <el-date-picker type="date" v-model="form.classDate"  placeholder="班列日期" format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="托运客户" prop="customer">
              <el-input placeholder="托运客户" v-model="form.customer"></el-input>

              <!-- <el-select
                class="filter-item"
                v-model="form.customerId"
                filterable
                placeholder="客户名称"
                @change="customerSelectList(form.customerId)"
              >
                <el-option
                  v-for="item in fetchCustomerSelectReq"
                  :key="item.customerId"
                  :label="item.customerName"
                  :value="item.customerId">
                </el-option>
              </el-select> -->
            </el-form-item>
          </el-col>

          
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="仓位号" prop="classOrder">
              <el-input placeholder="仓位号" v-model="form.classOrder" ></el-input>
            </el-form-item>
          </el-col>
          
           

          <el-col :span="8">
            <el-form-item label="集装箱号" prop="containerNo">
              <el-input placeholder="集装箱号" v-model="form.containerNo"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="集装箱型" prop="containerType">
              <el-input placeholder="集装箱型" v-model="form.containerType"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="集装箱箱量" prop="goodsSum">
              <el-input placeholder="集装箱箱量" v-model="form.goodsSum"></el-input>
            </el-form-item>
          </el-col>

         <el-col :span="8">
            <el-form-item label="空重箱" prop="isHeavy">
              <el-input placeholder="空重箱" v-model="form.isHeavy"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="业务种类" prop="shortType">
              <!-- <el-input placeholder="业务种类" v-model="form.shortType"></el-input> -->

              <el-select
                class="filter-item"
                filterable
                placeholder="请选择"
                v-model="form.shortType"
                @keyup.enter.native="handleFilter"
              >
                <el-option
                  v-for="item in shortTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>
          </el-col>
        </el-row>

        

        <el-row>
          <el-col :span="8">
            <el-form-item label="运输路线" prop="transLine">
              <!-- <el-input placeholder="路线" v-model="form.transLine"></el-input> -->

              <el-select
                class="filter-item"
                filterable
                placeholder="请选择"
                v-model="form.transLine"
                @keyup.enter.native="handleFilter"
              >
                <el-option
                  v-for="item in transLineList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

            </el-form-item>
          </el-col>

         
        </el-row>

        

        <h2 class="cargoFormTitle">司机信息</h2>
        <el-row>
          <el-col :span="8">
            <el-form-item label="司机姓名" >
              <el-select
                class="filter-item"
                v-model="form.driverId"
                filterable
                placeholder="司机姓名"
                clearable="clearable"
                @change="driverInfoReq"
              >
                <el-option
                  v-for="item in fetchdriverSelectReq"
                  :key="item.driverId"
                  :label="item.driverName"
                  :value="item.driverId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
 
          <el-col :span="8">
            <el-form-item label="车牌号" :disabled="true"  :rules="{required: true, message: '车牌号不能为空', trigger: 'blur'}">
              <el-input placeholder="车牌号" v-model="plateNumberReq" :disabled="true"></el-input>

            </el-form-item>
          </el-col>
        </el-row>

        

        <el-row>
          <el-col :span="12">
            <h2 class="cargoFormTitle cargoFormTitle1">应收费用</h2>

            <el-row>
              <el-col :span="12">
                <el-form-item label="短驳次数" prop="shortTransSum">
                  <el-input type="number" placeholder="短驳次数" @input="getFee" @blur="getFee"
                            v-model="form.shortTransSum"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="应收单价" prop="recPrice">
                  <el-input type="number" placeholder="应收单价" @input="getFee" @blur="getFee"
                            v-model="form.recPrice"></el-input>
                </el-form-item>
              </el-col>
 

            
            </el-row>

            <el-row>
                <el-col :span="12">
                <el-form-item label="应收合计" prop="receivables">
                  <el-input type="number" placeholder="应收合计" v-model="form.receivables" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="应收备注" prop="receivablesRemark">
                  <el-input type="textarea" v-model="form.receivablesRemark" placeholder="应收备注"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="12">
            <h2 class="cargoFormTitle cargoFormTitle1">应付费用</h2>

            <el-row>
              <el-col :span="12">
                <el-form-item label="短驳次数" prop="shortTransSum">
                  <el-input type="number" placeholder="短驳次数" @input="getFee" @blur="getFee"
                            v-model="form.shortTransSum"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="应付单价" prop="price">
                  <el-input type="number" placeholder="应付单价" @input="getFee" @blur="getFee"
                            v-model="form.price"></el-input>
                </el-form-item>
              </el-col>
 
             
            </el-row>

            <el-row>
               <el-col :span="12">
                <el-form-item label="应付合计" prop="needPay">
                  <el-input type="number" placeholder="应付合计" v-model="form.needPay" :disabled="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="应付备注" prop="needPayRemark">
                  <el-input type="textarea" v-model="form.needPayRemark" placeholder="应付备注"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

        </el-row>

      </el-form>
      <div align="center">
        <el-button v-if="formStatus === false && this.shortDiskEditId != null" type="primary" @click="updateForm('form')">保存</el-button>
        <el-button v-if="this.shortDiskEditId == null" type="primary" @click="submitForm('form')">确定</el-button>
        <!-- <el-button v-if="formStatus === false">取消</el-button> -->
      </div>
    </div>
  </div>
</template>
<script>
  import 'vue-area-linkage/dist/index.css' // 样式
  import { customerSelect, driverSelect, fetchdriverSelect, getObj, putObj,addObj } from '@/api/shortDiskEdit'
  import { short_order_line, short_order_type } from '@/api/ord_short_order'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'
  export default {
    props: ['shortDiskEditId', 'currentState'],
    name: 'shortDiskEdit',
    directives: {
      waves
    },
    data() {
      return {
        fetchCustomerSelectReq: [],
        fetchdriverSelectReq: [],
        idReq: null,
        dialogStatus: false,
        input5: null,
        select: null,
        driverphoneReq: null,
        plateNumberReq: null,
        idcardNumberReq: null,
        form: {
          classOrder:null,
          classDate:null,
          orderDate: null,
          customerId: null,
          customer: null,
          carrier: null,
          goodsName: null,
          containerNo: null,
          containerType:null,
          goodsSum: null,
          weight: null,
          isHeavy: null,
          shortType: null,
          transLine: null,
          receiverPeople: null,
          exception: null,
          remark: null,
          driverId: null,
          driverName: null,
          salesman: null,
          scheduleman: null,
          shortTransSum: null,
          recPrice: null,
          recOtherFee: null,
          recOutTimeFee: null,
          recParkingFee: null,
          receivables: null,
          receivablesRemark: null,
          price: null,
          payOtherFee: null,
          payOutTimeFee: null,
          payParkingFee: null,
          needPay: null,
          needPayRemark: null
        },
        formRules: {
          orderDate: [
            { required: true, message: '请选择业务日期', trigger: 'blur' }
          ],
          classOrder: [
            { required: true, message: '请输入仓位号', trigger: 'blur' }
          ],
          classDate: [
            { required: true, message: '请选择班列日期', trigger: 'blur' }
          ],
          containerNo: [
            { required: true, message: '请输入集装箱号', trigger: 'blur' }
          ],
          containerType: [
            { required: true, message: '请输入集装箱型', trigger: 'blur' }
          ],
          goodsSum: [
            { required: true, message: '请输入集装箱量', trigger: 'blur' }
          ],
         
          shortTransSum: [
            { required: true, message: '请输入短驳次数', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入应付单价', trigger: 'blur' }
          ],
          needPay: [
            { required: true, message: '请输入应付合计', trigger: 'blur' }
          ],
          recPrice: [
            { required: true, message: '请输入应收单价', trigger: 'blur' }
          ],
          receivables: [
            { required: true, message: '请输入应收合计', trigger: 'blur' }
          ],
        },
        formStatus: true,
        shortTypeList: [],
        transLineList: []

      }
    },

    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    filters: {},
    created() {
       
      this.savedraft = this.permissions['savedraft']
     // this.order_typeList()
      this.fetchdriverSelectList()
    //  this.fetchCustomerSelectList()
     // this.sealStatusList()
 
    },
    mounted: function() {
      debugger
      this.formStatus = this.currentState
      
        if(this.shortDiskEditId == null || this.shortDiskEditId==" " || this.shortDiskEditId==undefined){

          this.form={
          classOrder:null,
          classDate:null,
          orderDate: null,
          customerId: null,
          customer: null,
          carrier: null,
          goodsName: null,
          containerNo: null,
          containerType:null,
          goodsSum: null,
          weight: null,
          isHeavy: null,
          shortType: null,
          transLine: null,
          receiverPeople: null,
          exception: null,
          remark: null,
          driverId: null,
          driverName: null,
          salesman: null,
          scheduleman: null,
          shortTransSum: null,
          recPrice: null,
          recOtherFee: null,
          recOutTimeFee: null,
          recParkingFee: null,
          receivables: null,
          receivablesRemark: null,
          price: null,
          payOtherFee: null,
          payOutTimeFee: null,
          payParkingFee: null,
          needPay: null,
          needPayRemark: null
        }
      }else{
            this.idReq = this.shortDiskEditId
            this.selectByOrderIdList(this.idReq)
      }
      
   //  this.order_typeList()
     debugger
      this.fetchdriverSelectList()
   //   this.fetchCustomerSelectList()
     // this.sealStatusList()

      this.getShortTypeList()
      this.getTransLineList()
    },
    watch: {
      currentState: {
        handler(newV, oldV) {
          this.idReq = newV
          this.formStatus = this.currentState
        },
        deep: true
      },
      shortDiskEditId: {
        handler(newV, oldV) {
          this.idReq = newV
          this.idReq = this.shortDiskEditId
          this.selectByOrderIdList(this.idReq)
        },
        deep: true
      }
    },
    methods: {
      getFee() {
        if (this.form.shortTransSum !== '' && this.form.shortTransSum != null) {

          if (this.form.recPrice !== '' && this.form.recPrice != null) {
            this.form.receivables = (Number(this.form.shortTransSum) * Number(this.form.recPrice) + Number(this.form.recOtherFee) + Number(this.form.recOutTimeFee) + Number(this.form.recParkingFee)).toFixed(2)
          }
          if (this.form.price !== '' && this.form.price != null) {
            this.form.needPay = (Number(this.form.shortTransSum) * Number(this.form.price) + Number(this.form.payOutTimeFee) + Number(this.form.payOtherFee) + Number(this.form.payParkingFee)).toFixed(2)
          }
        }
      },
      selectByOrderIdList: function(id) {
        getObj(id).then(response => {
          const res = response.data
          this.form = res
          fetchdriverSelect().then(response => {
            this.fetchdriverSelectReq = response.data
            for (let i = 0; i < this.fetchdriverSelectReq.length; i++) {
              if (this.fetchdriverSelectReq[i].driverId === res.driverId) {
                this.driverphoneReq = this.fetchdriverSelectReq[i].phone
                this.plateNumberReq = this.fetchdriverSelectReq[i].plateNumber
                this.idcardNumberReq = this.fetchdriverSelectReq[i].idcardNumber
                this.form.driverName = this.fetchdriverSelectReq[i].driverName
              }
            }
          })
        })
      },
      sealStatusList: function() {
        sealStatus().then(response => {
          this.sealStatusReq = response.data
        })
      },
      driverInfoReq: function() {

        driverSelect(this.form.driverId).then(response => {
          if (response.data.phone) {
            this.driverphoneReq = response.data.phone
          } else {
            this.driverphoneReq = ''
          }

          if (response.data.idcardNumber) {
            this.idcardNumberReq = response.data.idcardNumber
          } else {
            this.idcardNumberReq = ''
          }
          if (response.data.plateNumber) {
            this.plateNumberReq = response.data.plateNumber
          } else {
            this.plateNumberReq = ''
          }
        })
      },
      customerSelectList: function(id) {
        customerSelect(id).then(response => {
          if (response.data.phone) {
            this.customerPhoneReq = response.data.phone
          } else {
            this.customerPhoneReq = ''
          }
          if (response.data.contact) {
            this.contactReq = response.data.contact
          } else {
            this.contactReq = ''
          }
        })
      },
      headCall: function(msg) {
        this.msg = msg
      },
      fetchdriverSelectList() {
        fetchdriverSelect().then(response => {
          this.fetchdriverSelectReq = response.data
          debugger
        })
      },
      // fetchCustomerSelectList() {
      //   fetchCustomerSelect().then(response => {
      //     this.fetchCustomerSelectReq = response.data
      //   })
      // },
      // order_typeList: function() {
      //   orderType().then(response => {
      //     this.orderTypeReq = response.data
      //   })
      // },

      submitForm(formName) {
        
        this.form.plateNumber = this.plateNumberReq
        this.$refs[formName].validate((valid) => {
          if (valid) {
             addObj(this.form)
              .then((response) => {
                if (response.data.data) {
                     this.$notify({
                    title: '成功',
                    message: '操作成功',
                    type: 'success',
                    duration: 2000
                  })
                  let flag = false
                  this.$emit('closeMain', flag)
                }
              })
          }
        })
      },
      updateForm(formName) {
        this.form.plateNumber = this.plateNumberReq
        this.$refs[formName].validate((valid) => {
          if (valid) {
            putObj(this.form)
              .then((response) => {
                if (response.data.data) {
                  this.$notify({
                    title: '成功',
                    message: '更新成功',
                    type: 'success',
                    duration: 2000
                  })
                  let flag = false
                  this.$emit('closeMain', flag)
                } else {
                  this.$notify({
                    title: '更新失败',
                    message: response.data.msg,
                    type: 'falid',
                    duration: 2000
                  })
                }
              })
          } else {
            return false
          }
        })
      },
      newFiles(file) {
        this.uploadForm.append('file[]', file)
        return false
      },
      getShortTypeList() {
        short_order_type().then(response => {
          this.shortTypeList = response.data
        })
      },
      getTransLineList() {
        short_order_line().then(response => {
          this.transLineList = response.data
        })
      }
    }
  }
  export function newExp(data) {
    return axios({
      method: 'post',  // 方式一定是post
      url: '你的后台接收函数路径',
      timeout: 20000,
      data: data        // 参数需要是单一的formData形式
    })
  }
</script>

<style>
  .header {
    padding-left: 12px;
    margin-left: 12px;
    margin-bottom: 24px;
  }

  .header:before {
    content: " ";
    width: 4px;
    height: 12px;
    border-left: 4px solid #2d8cf0;
    margin-right: 12px;
  }

  .cargoFormTitle {
    font-size: 14px;
    background-color: #2D8C94;
    color: #fff;
    padding-left: 24px;
    margin: 12px auto;
    border-radius: 6px;
  }

  .cargoFormTitle1 {
    width: 95%;
  }

  .area-select .area-selected-trigger {
    line-height: 30px;
    padding: 0 18px 0 8px;
  }

  .bigSelect .area-select.large {
    width: 100%;
  }

  .multyText > .el-textarea__inner {
    height: 120px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .upload-tag .el-upload-dragger {
    width: 125px;
    height: 85px;
  }

  .bigLabel .el-form-item__label {
    width: 220px !important;
  }

  .bigLabel .el-form-item__content {
    margin-left: 220px !important;
  }
</style>
