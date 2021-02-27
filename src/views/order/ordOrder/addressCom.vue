<template>
  <el-form ref="pickupAddsForm" label-width="100px" :model="pickupAddsForm" :disabled="ableStr">
    <template v-for="(pickupAdds,index) in pickupAddsForm.pickupAdds">
      <el-row :key="index">
        <el-col :span="1">

          <i class="el-icon-circle-plus" @click="handlePickupAddsPlus" v-if="!ableStr"></i>
          <i class="el-icon-remove" @click="handlePickupAddsDecre(index)" v-if="!ableStr"></i>


            <i class="el-icon-circle-plus" v-if="ableStr"></i>
          <i class="el-icon-remove" v-if="ableStr"></i>
        </el-col>


       <!-- 回程的箱行亚欧订单 -->

        <el-col :span="7" v-if="index==0 && pickupAddsForm.type=='1' && pickupAddsForm.upstreamId != null && pickupAddsForm.upstreamId != ''">
            <el-form-item label="发货人" :prop="'pickupAdds.' + index + '.contacts'"
                        :rules="itemRuls.contacts">
              <el-select
              v-model="pickupAdds.contacts"
              filterable
              remote
              :disabled="editStatus"
              reserve-keyword
              placeholder="请选择"
              @change="handlePickcontacts(pickupAdds.contacts,index)"
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

         <el-col :span="7" v-if="index !=0 && pickupAddsForm.type=='1' && pickupAddsForm.upstreamId != null && pickupAddsForm.upstreamId != ''">
            <el-form-item label="发货人" :prop="'pickupAdds.' + index + '.contacts'"
                        :rules="itemRuls.contacts">
              <el-input placeholder="发货人" v-model="pickupAdds.contacts"

              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7" v-if="!(pickupAddsForm.type=='1' && pickupAddsForm.upstreamId != null && pickupAddsForm.upstreamId != '')">
            <el-form-item label="发货人" :prop="'pickupAdds.' + index + '.contacts'"
                        :rules="itemRuls.contacts">
              <el-input placeholder="发货人" v-model="pickupAdds.contacts"

              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发货人电话" :prop="'pickupAdds.' + index + '.contactsPhone'"
                        :rules="itemRuls.contactsPhone">

              <el-input placeholder="发货人电话" v-model="pickupAdds.contactsPhone"
                :disabled="ableStr || (pickupAddsForm.type=='1' && pickupAddsForm.upstreamId != null && pickupAddsForm.upstreamId != '' && index == 0)"
              ></el-input>
            </el-form-item>
          </el-col>


           <el-col :span="8">
            <el-form-item label="提货日期"  :prop="'pickupAdds.' + index + '.planTime'"
                        :rules="{required: true, message: '提货日期不能为空', trigger: 'change'}">
              <el-date-picker
                type="date"
                placeholder="提货日期"
                v-model="pickupAdds.planTime"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"

              ></el-date-picker>
            </el-form-item>
          </el-col>

        
         <el-col :span="8" :offset="1" >
            <el-form-item label="发货城市:" class="bigSelect" :prop="'pickupAdds.' + index + '.ssqArray'"
                        :rules="itemRuls.ssqArray">
              <area-cascader
                :level="1"
                type="text"
                placeholder="请选择地区"
                v-model="pickupAdds.ssqArray"
                :data="pcaa"
                :disabled="ableStr">
               </area-cascader>
            </el-form-item>
          </el-col>
 

         <el-col :span="14" :rules="{required: true, message: '此项不能为空', trigger: 'change'}">
          <el-form-item label="发货人地址:" :prop="'pickupAdds.' + index + '.addressDetailPlace'"
                        :rules="{required: true, message: '发货人地址不能为空', trigger: 'change'}">


              <el-input placeholder="请输入关键词"  v-model="pickupAdds.addressDetailPlace"
                        @focus="handleAutocompletePick(index)" :id="'suggestId'+index"></el-input>
               <div :id="'pickerAllmap'+index"></div>
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
      consignorData: {
        type: Array,
        default: Array
      },
      editStatus: {
        type: Boolean,
        default: false
      },
      pickupAddsForm:{
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
            {name:'陆港赵静怡（北线）',tel:'15803835091'},
            {name:'陆港訾永亮（青岛线、南线）',tel:'13838518841'},
            {name:'陆港陈欢（东线）',tel:'15093392408'},
        ],
        pcaa: pcaa,
        pickerCityList: [],
        lngLnt: [],
        origin: {},
        destination: {},
        waypoints: [],
        itemRuls:{
          // contactsPhone:[
          //    { validator: checkPhone, trigger: 'blur' }
          // ],
         
          ssqArray:[
            {required: true, message: '发货城市不能为空', trigger: 'blur'}
          ],
           contactsPhone:[
             { required: true, message: '发货人电话不能为空', trigger: 'blur' }
          ],
          contacts:[
            {required: true, message: '发货人不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      pickupAddsForm: {
        handler(newV, oldV) {
          if (newV.pickupAdds.length === 0) {
            return false
          } else {
            this.contactsList.forEach(function(item,index){
            if(newV.pickupAdds[0].contacts==item.name){
              newV.pickupAdds[0].contactsPhone=item.tel
            }
           })
            this.$emit('uploadConsignorData', { data: newV })


          }
        },
        deep: true
      },



      consignorData: {
        handler(newV) {
          if (newV.length > 0) {
            this.pickupAddsForm.pickupAdds = this.consignorData
          }
        }
      },
      origin: {
        handler(newV) {
          if (!newV) {
            return false
          } else {
            this.$emit('directionLite', { origin: newV, originWayPoints: this.waypoints })
          }
        }
      },
      waypoints: {
        handler(newV) {
          if (!newV.length) {
            return false
          } else {
            this.$emit('directionLite', { origin: this.origin, originWayPoints: newV })
          }
        }
      }
    },
    created() {
    //   console.log(this.pickupAddsForm)
    //  alert(this.ableStr)
    //   
    },
    mounted() {
    },
    methods: {
      handlePickcontacts(contacts,index){
        // this.contactsList.forEach(function(item,index){
        //     if(contacts==item.name){
        //       alert(item.tel)
        //       this.pickupAddsForm.pickupAdds[0].contactsPhone=item.tel
        //     }
        // })

      },

       handleAutocompletePick(indexObj) {
         if(this.pickupAddsForm.pickupAdds[indexObj].ssqArray.length==0){
              this.$notify({
                      title: '提示',
                      message: '请先选在前边对应的省市区地址。',
                      type: 'warning',
                      duration: 2000
                    })
         }else{
                this.$nextTick(function() {
                var th = this
                var map = new BMap.Map('pickerAllmap'+indexObj)
                var str_picker = th.pickupAddsForm.pickupAdds[indexObj].ssqArray[0] + th.pickupAddsForm.pickupAdds[indexObj].ssqArray[2]
                if ((str_picker === undefined) && (str_picker === '')) {
                  map.centerAndZoom('全国', 12)
                } else {
                  map.centerAndZoom(str_picker, 12)
                }
                var ac = new BMap.Autocomplete({
                  'input': 'suggestId'+indexObj,
                  'location': map
                })
                ac.addEventListener('onconfirm', function(e) {
                  var _value = e.item.value
                  
                  th.pickupAddsForm.pickupAdds[indexObj].addressDetailPlace = _value.province +  _value.city + _value.district + _value.street + _value.business
                })
              })
         }

      },

    
    
      // 新增信息
      handlePickupAddsPlus() {
        if (this.pickupAddsForm.pickupAdds.length < 3) {
          this.pickupAddsForm.pickupAdds.push({
            addType: '0',
            contacts: '',
            contactsPhone: '',
            addressCity: '',
            ssqArray:[],
            addressDetailPlace:'',
            sort: this.pickupAddsForm.pickupAdds.length
          })
          console.log(this.pickupAddsForm.pickupAdds)
          
        } else {
          this.$message({
            message: '发货人信息不能超过3条',
            type: 'warning'
          })
        }
      },
      handlePickupAddsDecre(index) {
        if (this.pickupAddsForm.pickupAdds.length > 1) {
          this.pickupAddsForm.pickupAdds.splice(index, 1)
          this.pickupAddsForm.pickupAdds.every((item, index) => {
            item.sort = index
            return item
          })
        }
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
