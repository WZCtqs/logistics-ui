<template>
  <div class="linkage">
    <el-form :rules="Rules" ref="childrenForm" :model="form">
      <el-row>
        <el-col :span="5">
          <el-form-item prop="sheng">
            <el-select
              v-model="form.sheng"
              @change="choseProvince"
              filterable
              placeholder="省级地区">
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="shi">
            <el-select
              v-model="form.shi"
              @change="choseCity"
              filterable
              placeholder="市级地区">
              <el-option
                v-for="item in shi1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item prop="qu">
            <el-select
              v-model="form.qu"
              @change="choseBlock"
              filterable
              placeholder="区级地区">
              <el-option
                v-for="item in qu1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item prop="detail">
            <el-input v-model="form.detail" placeholder="请填写详细地址" @blur="detailReq"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'linkage',
    data() {
      return {
        mapJson: '../static/json/map.json',
        province: '',
        sheng: '',
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        city: '',
        block: '',
        form: {
          sheng: '',
          shi: '',
          qu: '',
          detail: ''
        },
        Rules: {
          sheng: [
            { required: true, message: '请输入省级名称', trigger: 'blur' }
          ],
          shi: [
            { required: true, message: '请输入市级名称', trigger: 'blur' }
          ]
        },
        msgRes: '',
        totalMsg: '',
        arrMsg: [4]
      }
    },
    props: {
      sendMsg: {
        type: String
      }
    },
    model: {
      prop: 'msgRes',
      event: 'headCallBack'
    },
    methods: {
      // 加载china地点数据，三级
      getCityData: function() {
        var that = this
        axios.get(this.mapJson).then(function(response) {
          if (response.status === 200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {
                that.province.push({ id: item, value: data[item], children: [] })
              } else if (item.match(/00$/)) {
                that.city.push({ id: item, value: data[item], children: [] })
              } else {
                that.block.push({ id: item, value: data[item] })
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for (var item1 in that.city) {
              for (var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          } else {
            console.log(response.status)
          }
        }).catch(function(error) {
          console.log(typeof +error)
        })
      },
      // 选省
      choseProvince: function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.qu1 = this.province[index2].children[0].children
            this.form.sheng = this.province[index2].value
            this.E = this.qu1[0].id
            this.form.shi = ''
            this.form.qu = ''
            this.form.detail = ''
            this.msgRes = this.form.sheng
            this.$emit('headCallBack', this.msgRes)
          }
        }
      },
      // 选市
      choseCity: function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children
            // this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            this.form.shi = this.city[index3].value
            this.form.qu = ''
            this.form.detail = ''
            this.msgRes = this.form.sheng + ',' + this.form.shi
            this.$emit('headCallBack', this.msgRes)
          }
        }
      },
      // 选区
      choseBlock: function(e) {
        this.E = e
        for (var index4 in this.block) {
          if (e === this.block[index4].id) {
            this.form.qu = this.block[index4].value
            this.form.detail = ''
            this.msgRes = this.form.sheng + ',' + this.form.shi + ',' + this.form.qu
            this.$emit('headCallBack', this.msgRes)
          }
        }
      },
      detailReq: function() {
        this.msgRes = this.form.sheng + ',' + this.form.shi + ',' + this.form.qu + ',' + this.form.detail
        this.$emit('headCallBack', this.msgRes)
      },
      validateForm() {
        let flag = false
        this.$refs['childrenForm'].validate((valid) => {
          flag = valid
        })
        return flag
      }
    },
    created: function() {
      this.getCityData()
    },
    watch: {
      sendMsg: function() {
        this.totalMsg = this.sendMsg
        this.arrMsg = this.totalMsg.split(',')
        this.form.sheng = this.arrMsg[0]
        this.form.shi = this.arrMsg[1]
        this.form.qu = this.arrMsg[2]
        this.form.detail = this.arrMsg[3]
        this.getCityData()
        for (let i = 0; i < this.province.length; i++) {
          if (this.form.sheng === this.province[i].value) {
            this.shi1 = this.province[i].children
          }
        }
        for (let i = 0; i < this.city.length; i++) {
          if (this.form.shi === this.city[i].value) {
            this.qu1 = this.city[i].children
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
