<template>
  <el-form ref="arrivalAddsForm" label-width="100px" :model="arrivalAddsForm" :disabled="ableStr">
    <template v-for="(arrivalAdds,index) in arrivalAddsForm.arrivalAdds">
      <el-row :key="index">
        <el-col :span="1">
          <i class="el-icon-circle-plus" @click="handleArrivalAddsPlus" v-if="!ableStr"></i>
          <i class="el-icon-remove" @click="handleArrivalAddsDecre(index)" v-if="!ableStr"></i>



            <i class="el-icon-circle-plus" v-if="ableStr"></i>
          <i class="el-icon-remove" v-if="ableStr"></i>
        </el-col>

          <!-- 回程的箱行亚欧订单 -->

        <el-col :span="5" v-if="index==0 && arrivalAddsForm.type=='0' && arrivalAddsForm.upstreamId != null && arrivalAddsForm.upstreamId != ''">
            <el-form-item label="收货人" :prop="'arrivalAdds.' + index + '.contacts'"
                        :rules="itemRuls.contacts">
              <el-select
              v-model="arrivalAdds.contacts"
              filterable
              remote
              :disabled="editStatus"
              reserve-keyword
              placeholder="请选择"
              :remote-method="remoteMethod"

            >
              <el-option
                v-for="(item,index) in contactsList"
                :key="index"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>


            </el-form-item>
          </el-col>

         <el-col :span="5" v-if="index !=0 && arrivalAddsForm.type=='0' && arrivalAddsForm.upstreamId != null && arrivalAddsForm.upstreamId != ''">
            <el-form-item label="收货人" :prop="'arrivalAdds.' + index + '.contacts'"
                        :rules="itemRuls.contacts">
              <el-input placeholder="收货人" v-model="arrivalAdds.contacts"

              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5" v-if="!(arrivalAddsForm.type=='0' && arrivalAddsForm.upstreamId != null && arrivalAddsForm.upstreamId != '')">
            <el-form-item label="收货人" :prop="'arrivalAdds.' + index + '.contacts'"
                        :rules="itemRuls.contacts">
              <el-input placeholder="收货人" v-model="arrivalAdds.contacts"

              ></el-input>
            </el-form-item>
          </el-col>

        <el-col :span="5">
          <el-form-item label="收货人电话:" :prop="'arrivalAdds.' + index + '.contactsPhone'"
                         :rules="itemRuls.contactsPhone">
            <el-input placeholder="收货人电话" v-model="arrivalAdds.contactsPhone" :disabled="ableStr || (arrivalAddsForm.type=='0' && arrivalAddsForm.upstreamId != null && arrivalAddsForm.upstreamId != '' && index ==0)"></el-input>
          </el-form-item>
        </el-col>

         <el-col :span="5" v-if="arrivalAddsForm.upstreamId != null && arrivalAddsForm.upstreamId != '' && arrivalAddsForm.type=='0'">
          <el-form-item label="收货人固话">
            <el-input value="0371-55177817" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="5" v-if="arrivalAddsForm.upstreamId == null || arrivalAddsForm.upstreamId == ''">
          <el-form-item label="收货人固话">
            <el-input v-model="arrivalAdds.contactsTel" ></el-input>
          </el-form-item>
        </el-col>


          <el-col :span="8">
            <el-form-item label="收货日期" :prop="'arrivalAdds.' + index + '.planTime'"
                        :rules="{required: true, message: '收货日期不能为空', trigger: 'change'}">
              <el-date-picker
                type="date"
                placeholder="收货日期"
                v-model="arrivalAdds.planTime"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"

              ></el-date-picker>
            </el-form-item>
          </el-col>
         
           <el-col :span="8" :offset="1" >
            <el-form-item label="收货城市:" class="bigSelect" :prop="'arrivalAdds.' + index + '.ssqArray'"
                        :rules="itemRuls.ssqArray">
              <area-cascader
                :level="1"
                type="text"
                placeholder="请选择地区"
                v-model="arrivalAdds.ssqArray"
                :data="pcaa"
                :disabled="ableStr">
               </area-cascader>
            </el-form-item>
          </el-col>
 

         <el-col :span="14"  :rules="{required: true, message: '此项不能为空', trigger: 'change'}">
          <el-form-item label="收货人地址:" :prop="'arrivalAdds.' + index + '.addressDetailPlace'"
                        :rules="{required: true, message: '收货人地址不能为空', trigger: 'change'}">


              <el-input placeholder="请输入关键词"  v-model="arrivalAdds.addressDetailPlace"
                        @focus="handleAutocompletePick(index)" :id="'suggestIded'+index" ></el-input>
               <div :id="'pickerAllmaped'+index"></div>
            </el-form-item>
          </el-col>
       

      </el-row>
    </template>
  </el-form>
</template>
<script>
import { pca, pcaa } from 'area-data' // 城市数据
 import 'vue-area-linkage/dist/index.css' // 样式
 import { AreaSelect } from 'vue-area-linkage'
  import { cityLimitArr } from '@/api/orderManager'

  export default {
    props: {
      consigneeData: {
        type: Array
      },
      editStatus: {
        type: Boolean,
        default: false
      },
       arrivalAddsForm:{
         type: Object,
        default: Object
      },
      ableStr:{
         type:Boolean,
        default: Boolean
      }
    },
    components: { AreaSelect},
    data: function() {
         var checkPhone = (rule, value, callback) => {
        let valid_rule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
        if (valid_rule.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
      return {
          contactsList:[
            {name:'陆港叶云山',tel:'17538146104'},
            {name:'陆港高红亮',tel:'15738898259'}
        ],
        pickerCityList: [],
        pcaa: pcaa,
        destination: {},
        waypoints: [],
          itemRuls:{
           ssqArray:[
            {required: true, message: '收货城市不能为空', trigger: 'blur'}
          ],
          contactsPhone:[
             { validator: checkPhone, trigger: 'blur' }
          ],
          contacts:[
            {required: true, message: '收货人不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      arrivalAddsForm: {
        handler(newV, oldV) {
          if (newV.arrivalAdds.length === 0) {
            return false
          } else {

            this.contactsList.forEach(function(item,index){
            if(newV.arrivalAdds[0].contacts==item.name){
              newV.arrivalAdds[0].contactsPhone=item.tel
            }
           })

            this.$emit('uploadConsigneeData', { data: newV })

          }
        },
        deep: true
      },
      consigneeData: {
        handler(newV) {
          if (newV.length > 0) {
            this.arrivalAddsForm.arrivalAdds = this.consigneeData
          }
        }
      },
      destination: {
        handler(newV) {
          if (!newV) {
            return false
          } else {
            this.$emit('directionLite', { destination: newV, DestWayPoints: this.waypoints })
          }
        }
      },
      waypoints: {
        handler(newV) {
          if (!newV.length) {
            return false
          } else {
            this.$emit('directionLite', { destination: this.destination, DestWayPoints: newV })
          }
        }
      }
    },
    created() {


    },

    methods: {
        handleAutocompletePick(indexObj) {
         if(this.arrivalAddsForm.arrivalAdds[indexObj].ssqArray.length==0){
              this.$notify({
                      title: '提示',
                      message: '请先选在前边对应的省市区地址。',
                      type: 'warning',
                      duration: 2000
                    })
         }else{
                this.$nextTick(function() {
                var th = this
                var map = new BMap.Map('pickerAllmaped'+indexObj)
                var str_picker = th.arrivalAddsForm.arrivalAdds[indexObj].ssqArray[0] + th.arrivalAddsForm.arrivalAdds[indexObj].ssqArray[2]
                
                if ((str_picker === undefined) && (str_picker === '')) {
                  map.centerAndZoom('全国', 12)
                } else {
                  map.centerAndZoom(str_picker, 12)
                }
                var ac = new BMap.Autocomplete({
                  'input': 'suggestIded'+indexObj,
                  'location': map
                })
                ac.addEventListener('onconfirm', function(e) {
                  var _value = e.item.value
                  th.arrivalAddsForm.arrivalAdds[indexObj].addressDetailPlace =  _value.province +  _value.city + _value.district + _value.street + _value.business
                })

              })
         }

      },

    
      // 新增信息
      handleArrivalAddsPlus() {
        if (this.arrivalAddsForm.arrivalAdds.length < 3) {
          this.arrivalAddsForm.arrivalAdds.push({
            addType: '1',
            contacts: '',
            contactsPhone: '',
            addressCity: '',
             ssqArray:[],
            addressDetailPlace:'',
            sort: this.arrivalAddsForm.arrivalAdds.length
          })
        } else {
          this.$message({
            message: '收货人信息不能超过3条',
            type: 'warning'
          })
        }
      },
      handleArrivalAddsDecre(index) {
        if (this.arrivalAddsForm.arrivalAdds.length > 1) {
          this.arrivalAddsForm.arrivalAdds.splice(index, 1)
          this.arrivalAddsForm.arrivalAdds.every((item, index) => {
            item.sort = index
            return item
          })
        }
       //  this.$emit('getstate2')
      }
    }
  }
</script>
<style>
  .el-input__inner {
    padding: 0 6px;
  }

  .el-icon-circle-plus {
    color: #2d8cf0;
  }

  .el-icon-remove {
    color: #f00;
  }

  .el-popper {
    width: auto !important;
  }

  .detailAddress {
    width: 100%;
  }
</style>
