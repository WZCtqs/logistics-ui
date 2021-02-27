<template>
  <el-form ref="pickupAddsForm" label-width="100px" :model="pickupAddsForm">
    <template v-for="(pickupAdds,index) in pickupAddsForm.pickupAdds">
      <el-row :key="index">
        <el-col :span="1"  v-if="!editStatus">
          <i class="el-icon-circle-plus" @click="handlePickupAddsPlus"></i>
          <i class="el-icon-remove" @click="handlePickupAddsDecre(index)"></i>
        </el-col>
        <el-col :span="7">
          <el-form-item label="发货人:"
                        :prop="'pickupAdds.' + index + '.contacts'"
                        :rules="{required: true, message: '发货人不能为空', trigger: 'blur'}">
            <el-input placeholder="" v-model="pickupAdds.contacts" :disabled="editStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="发货人电话:" :prop="'pickupAdds.' + index + '.contactsPhone'"
                        :rules="{required: true, message: '发货人电话不能为空', trigger: 'blur'}">
            <el-input placeholder="" v-model="pickupAdds.contactsPhone" :disabled="editStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="发货人地址:" :prop="'pickupAdds.' + index + '.addressDetailPlace'"
                        :rules="{required: true, message: '发货人地址不能为空', trigger: 'change'}">
            <el-select
              v-model="pickupAdds.addressDetailPlace"
              filterable
              remote
              :disabled="editStatus"
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              @change="handlePickplaceChange(pickupAdds.addressDetailPlace,index)"
            >
              <el-option
                v-for="item in pickerCityList"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </template>
  </el-form>
</template>
<script>
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
      }
    },
    data: function() {
      return {
        pickerCityList: [],
        pickupAddsForm: {
          pickupAdds: [
            {
              addType: '0',
              addressCity: '',
              addressDetailPlace: '',
              contacts: '',
              contactsPhone: '',
              addressLnglat: '',
              sort: 0
            }
          ]
        },
        lngLnt: [],
        origin: {},
        destination: {},
        waypoints: []
      }
    },
    watch: {
      pickupAddsForm: {
        handler(newV, oldV) {
          if (newV.pickupAdds.length === 0) {
            return false
          } else {
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
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      remoteMethod(query) {
        if (query) {
          var obj = {
            region: '全国',
            query: query
          }
          cityLimitArr(obj).then(response => {
            this.pickerCityList = response.data
          })
        } else {
          this.pickerCityList = []
        }
      },
      handlePickplaceChange(row, index) {
        this.pickerCityList.filter(item => {
          if (row === item.name) {
            this.pickupAddsForm.pickupAdds[index].addressCity = item.province + '/' + item.city + '/' + item.district
            this.pickupAddsForm.pickupAdds[index].addressLnglat = item.location.lng + ',' + item.location.lat
          }
        })
      },
      // 新增信息
      handlePickupAddsPlus() {
        if (this.pickupAddsForm.pickupAdds.length < 3) {
          this.pickupAddsForm.pickupAdds.push({
            addType: '0',
            contacts: '',
            contactsPhone: '',
            addressCity: '',
            addressLnglat: '',
            sort: this.pickupAddsForm.pickupAdds.length
          })
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
      },
      distanceData() {
        this.origin = {}
        this.waypoints = []
        this.pickupAddsForm.pickupAdds.forEach((item, index) => {
          if (index === 0) {
            let arr = item.addressLnglat.split(',')
            this.origin = {
              lng: arr[0],
              lat: arr[1]
            }
          } else {
            let arr = item.addressLnglat.split(',')
            this.waypoints[index - 1] = {
              lng: arr[0],
              lat: arr[1]
            }
          }
        })
        let data = {
          origin: this.origin,
          waypoints: this.waypoints
        }
        return data
      },
      validateForm() {
        let flag = false
        this.$refs['pickupAddsForm'].validate((valid) => {
          flag = valid
        })
        return flag
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
