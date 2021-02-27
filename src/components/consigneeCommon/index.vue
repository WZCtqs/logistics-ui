<template>
  <el-form ref="arrivalAddsForm" label-width="100px" :model="arrivalAddsForm">
    <template v-for="(arrivalAdds,index) in arrivalAddsForm.arrivalAdds">
      <el-row :key="index">
        <el-col :span="1" v-if="!editStatus">
          <i class="el-icon-circle-plus" @click="handleArrivalAddsPlus"></i>
          <i class="el-icon-remove" @click="handleArrivalAddsDecre(index)"></i>
        </el-col>
        <el-col :span="7">
          <el-form-item label="收货人:"
                        :prop="'arrivalAdds.' + index + '.contacts'"
                        :rules="{required: true, message: '收货人不能为空', trigger: 'blur'}">
            <el-input placeholder="" v-model="arrivalAdds.contacts" :disabled="editStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="收货人电话:" :prop="'arrivalAdds.' + index + '.contactsPhone'"
                        :rules="{required: true, message: '收货人电话不能为空', trigger: 'blur'}">
            <el-input placeholder="" v-model="arrivalAdds.contactsPhone" :disabled="editStatus"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="收货人地址:" :prop="'arrivalAdds.' + index + '.addressDetailPlace'"
                        :rules="{required: true, message: '收货人地址不能为空', trigger: 'change'}">
            <el-select
              v-model="arrivalAdds.addressDetailPlace"
              filterable
              remote
              :disabled='editStatus'
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              @change="handlePickplaceChange(arrivalAdds.addressDetailPlace,index)"
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
      consigneeData: {
        type: Array
      },
      editStatus: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {
        pickerCityList: [],
        arrivalAddsForm: {
          arrivalAdds: [
            {
              addType: '1',
              addressCity: '',
              addressDetailPlace: '',
              contacts: '',
              contactsPhone: '',
              addressLnglat: '',
              sort: 0
            }
          ]
        },
        destination: {},
        waypoints: []
      }
    },
    watch: {
      arrivalAddsForm: {
        handler(newV, oldV) {
          if (newV.arrivalAdds.length === 0) {
            return false
          } else {
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
      }
    },
    created() {
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
            this.arrivalAddsForm.arrivalAdds[index].addressCity = item.province + '/' + item.city + '/' + item.district
            this.arrivalAddsForm.arrivalAdds[index].addressLnglat = item.location.lng + ',' + item.location.lat
          }
        })
      },
      // 新增信息
      handleArrivalAddsPlus() {
        if (this.arrivalAddsForm.arrivalAdds.length < 3) {
          this.arrivalAddsForm.arrivalAdds.push({
            addType: '1',
            contacts: '',
            contactsPhone: '',
            addressDetailPlace: '',
            addressCity: '',
            addressLnglat: '',
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
      },
      distanceData() {
        this.destination = {}
        this.waypoints = []
        this.arrivalAddsForm.arrivalAdds.forEach((item, index) => {
          if (index === this.arrivalAddsForm.arrivalAdds.length - 1) {
            let arr = item.addressLnglat.split(',')
            this.destination = {
              lng: arr[0],
              lat: arr[1]
            }
          } else {
            let arr = item.addressLnglat.split(',')
            this.waypoints[index] = {
              lng: arr[0],
              lat: arr[1]
            }
          }
        })
        let data = {
          destination: this.destination,
          waypoints: this.waypoints
        }
        return data
      },
      validateForm() {
        let flag = false
        this.$refs['arrivalAddsForm'].validate((valid) => {
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
