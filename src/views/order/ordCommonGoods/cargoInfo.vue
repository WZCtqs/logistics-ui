<template>
  <el-form ref="form" label-width="100px" :model="commonGoodsInfos" :rules="rules">
    <el-row :id="index">
      <el-col :span="1">
        <i class="el-icon-circle-plus" @click="addInfo"></i>
        <i class="el-icon-remove" @click="deleteInfo"></i>
      </el-col>
      <el-col :span="4">
        <el-form-item label="货物名称：" prop="goodsName">
          <el-input placeholder="" v-model="commonGoodsInfos.goodsName" class="cp5" :disabled="editStatus"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="重量（吨）：" prop="weight">
          <el-input placeholder="" v-model="commonGoodsInfos.weight" :disabled="editStatus" class="cp5" onkeyup="value=value.replace(/[^\d.]/g,'')"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="体积（方）" prop="volume">
          <el-input placeholder="" v-model="commonGoodsInfos.volume" :disabled="editStatus" class="cp5" onkeyup="value=value.replace(/[^\d.]/g,'')"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="货值（元）" prop="value">
          <el-input placeholder="" v-model="commonGoodsInfos.value" :disabled="editStatus" class="cp5" onkeyup="value=value.replace(/[^\d.]/g,'')"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="包装方式" prop="Packaging">
          <el-select
            class="cp5"
            :disabled="editStatus"
            v-model="commonGoodsInfos.packWay"
            filterable
            allow-create
            default-first-option
            placeholder="请选择包装方式">
            <el-option
              v-for="item in packWayOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="包装数量" prop="number">
          <el-input placeholder="" v-model="commonGoodsInfos.packNum" :disabled="editStatus" class="cp5" onkeyup="value=value.replace(/[^\d]/g,'')"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="备注" prop="remark">
          <el-input placeholder="" :disabled="editStatus" class="cp5" v-model="commonGoodsInfos.goodsRemarks"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
  export default {
    props: {
      index: {
        type: Number,
        required: true
      },
      items: {
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
        commonGoodsInfos: {
          goodsName: '',
          weight: '',
          volume: '',
          value: '',
          packWay: '',
          packNum: '',
          goodsRemarks: ''
        },
        rules: {
          goodsName: [
            { required: true, message: '货物名称', trigger: 'blur' }
          ]
        },
        packWayOption: [{
          label: '纸箱',
          value: '纸箱'
        }, {
          label: '木箱',
          value: '木箱'
        }, {
          label: '铁桶',
          value: '铁桶'
        }, {
          label: '纤袋',
          value: '纤袋'
        }, {
          label: '麻袋',
          value: '麻袋'
        }, {
          label: '木架',
          value: '木架'
        }, {
          label: '托盘',
          value: '托盘'
        }]
      }
    },
    watch: {
      commonGoodsInfos: {
        handler(newV, oldV) {
          if (newV.goodsName.length === 0) {
            return false
          } else {
            this.$emit('uploadData', { index: this.index, data: newV })
          }
        },
        deep: true
      },
      items: {
        handler(newV, oldV) {
          if (newV.length !== 0) {
            this.commonGoodsInfos = { ...newV[this.index] }
          }
        },
        deep: true
      }
    },
    created() {
      for (let i = 0; i < this.items.length; i++) {
        this.commonGoodsInfos = { ...this.items[this.index] }
      }
    },
    methods: {
      deleteInfo() {
        this.$emit('deleteIndex')
      },
      addInfo() {
        this.$emit('addIndex')
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
</style>
