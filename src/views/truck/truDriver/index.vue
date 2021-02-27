<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form class="filter-item"
               label-width="100px">
        <el-col :span="24">
          <el-form-item class="filter-item"
                        label="司机姓名">
            <el-input @keyup.enter.native="handleFilter"
                      class="filter-item"
                      clearable
                      v-model="listQuery.driverName">
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div>
        <el-button @click="handleExport"
                   class="filter-item"
                   icon="search"
                   size="mini"
                   type="primary"
                   v-waves>导出
        </el-button>
        <el-button @click="handleCreate"
                   class="filter-item"
                   icon="edit"
                   size="mini"
                   style="margin-left: 10px;"
                   type="primary"
                   v-if="tru_driver_add">新增
        </el-button>
        <el-button @click="handleUpdate"
                   class="filter-item"
                   size="mini"
                   style="margin-left: 10px;"
                   type="primary"
                   v-if="tru_driver_upd">编辑
        </el-button>
        <el-button @click="handleDelete"
                   class="filter-item"
                   size="mini"
                   style="margin-left: 10px;"
                   type="primary"
                   v-if="tru_driver_del">删除
        </el-button>
        <el-button @click="handleFilter"
                   class="filter-item"
                   icon="search"
                   size="mini"
                   type="primary"
                   v-waves>搜索
        </el-button>
      </div>
    </div>
    <el-table :data="list"
              :key='tableKey'
              @selection-change="handleSelectionChange"
              border
              element-loading-text="给我一点时间"
              fit
              highlight-current-row
              style="width: 100%"
              v-loading="listLoading">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column type="expand"
                       fixed>
        <template slot-scope="props">
          <el-form label-position="left"
                   inline
                   class="demo-table-expand">
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="驾证级别:">
                  <span v-if="props.row.licenseLevel === '0'">A1</span>
                  <span v-else-if="props.row.licenseLevel === '1'">B2</span>
                  <span v-else-if="props.row.licenseLevel === '2'">C1</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="身份证号:">
                  <span>{{ props.row.idcardNumber }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="银行卡号:">
                  <span>{{ props.row.bankNumber }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7"
                      :offset="3">
                <el-form-item label="持卡数量:">
                  <span>{{ props.row.oilCardNum }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="驾驶证审验时间:">
                  <span>{{ props.row.licenseLevelTime | moment('YYYY-MM-DD') }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="从业证审验时间:">
                  <span>{{ props.row.qualificationTime | moment('YYYY-MM-DD') }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="司机">
        <template slot-scope="scope">
          <span>{{ scope.row.driverName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车牌号">
        <template slot-scope="scope">
          <span v-if="scope.row.truTruck === null"></span>
          <span v-else>{{scope.row.truTruck.plateNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="车辆状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === '0'">请假</span>
          <span v-else-if="scope.row.status === '1'">在途</span>
          <span v-else-if="scope.row.status === '2'">空闲</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="司机手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="驾证级别">-->
      <!--<template slot-scope="scope">-->
      <!--<span v-if="scope.row.licenseLevel === '0'">A1</span>-->
      <!--<span v-else-if="scope.row.licenseLevel === '1'">B2</span>-->
      <!--<span v-else-if="scope.row.licenseLevel === '2'">C1</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="驾证照片">
        <template slot-scope="scope">
          <span v-if="scope.row.licensePhotoArr === null">暂无</span>
          <span v-else-if="scope.row.licensePhotoArr === ''">暂无</span>
          <span v-else-if="scope.row.licensePhotoArr[0] === ''">暂无</span>
          <el-button @click="handlePreviewTableImg(scope.row.licensePhotoArr)"
                     size="small"
                     type="success"
                     v-else>查看照片
          </el-button>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="身份证号">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.idcardNumber }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="从业资格证">
        <template slot-scope="scope">
          <span v-if="scope.row.qualificationArr === null">暂无</span>
          <span v-else-if="scope.row.qualificationArr === ''">暂无</span>
          <span v-else-if="scope.row.qualificationArr[0] === ''">暂无</span>
          <el-button @click="handlePreviewTableImg(scope.row.qualificationArr)"
                     size="small"
                     type="success"
                     v-else>查看照片
          </el-button>
          <!--<span>{{ scope.row.qualificationArr }}</span>-->
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="银行卡号">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.bankNumber }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="利率%">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.rate }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center"
                       label="运费油卡余额"
                       width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.freightOilcardAmount}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="持卡数量">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.oilCardNum }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="驾驶证审验时间" width="120">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.licenseLevelTime | moment('YYYY-MM-DD') }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" label="从业证审验时间" width="120">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.qualificationTime | moment('YYYY-MM-DD') }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <div class="pagination-container"
         v-show="!listLoading">
      <el-pagination :current-page.sync="listQuery.page"
                     :page-size="listQuery.limit"
                     :page-sizes="[10,20,30, 50]"
                     :total="total"
                     @current-change="handleCurrentChange"
                     @size-change="handleSizeChange"
                     layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               class="truckDirver-from">
      <el-form :model="form"
               :rules="rules"
               label-width="120px"
               ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="车牌号"
                          prop="plateId">
              <el-select filterable
                         placeholder="车牌号"
                         v-model="form.plateId"
                         @change="handleTruckTeamId(form.plateId)">
                <el-option :key="item.truckId"
                           :label="item.plateNumber"
                           :value="item.truckId"
                           v-for="item in plateNumberOptions">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车辆状态"
                          prop="status">
              <el-select :disabled="stautsBool"
                         class="filter-item"
                         placeholder="请选择"
                         v-model="form.status">
                <el-option :key="item.value"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in CarStatus">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="司机姓名"
                          prop="driverName">
              <el-input placeholder="司机姓名"
                        v-model="form.driverName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="司机手机号"
                          prop="phone">
              <el-input placeholder="司机手机号"
                        v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行卡号"
                          prop="bankNumber">
              <el-input maxlength="50"
                        placeholder="银行卡号"
                        v-model="form.bankNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号"
                          prop="idcardNumber">
              <el-input maxlength="20"
                        placeholder="身份证号"
                        v-model="form.idcardNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="驾驶证审验时间"
                          prop="licenseLevelTime">
              <el-date-picker placeholder="选择日期"
                              type="date"
                              v-model="form.licenseLevelTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="从业证审验时间"
                          prop="qualificationTime">
              <el-date-picker placeholder="选择日期"
                              type="date"
                              v-model="form.qualificationTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="驾证级别"
                          prop="licenseLevel">
              <el-select class="filter-item"
                         placeholder="请选择"
                         v-model="form.licenseLevel">
                <el-option :key="item.value"
                           :label="item.label"
                           :value="item.value"
                           v-for="item in CarLicenseLevel">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="flexItem cm20">
          <div class="flexItems">
            <el-upload :class="{disabled:uploadDisabled0}"
                       :file-list="form.licensePhotoArr"
                       :headers="headers"
                       :on-preview="handlePictureCardPreview0"
                       :on-remove="handleRemove0"
                       :on-success="handleAvatarSuccess0"
                       action="/truck/truckFile/localUpload"
                       list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible0"
                       append-to-body>
              <img :src="dialogImageUrl0"
                   alt=""
                   width="100%">
            </el-dialog>
            <div>驾驶证</div>
          </div>
          <div class="flexItems">
            <el-upload :class="{disabled:uploadDisabled1}"
                       :file-list="form.idcardPhotoUpArr"
                       :headers="headers"
                       :on-preview="handlePictureCardPreview1"
                       :on-remove="handleRemove1"
                       :on-success="handleAvatarSuccess1"
                       action="/truck/truckFile/localUpload"
                       list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible1"
                       append-to-body>
              <img :src="dialogImageUrl1"
                   alt=""
                   width="100%">
            </el-dialog>
            <div>身份证正面</div>
          </div>
          <div class="flexItems">
            <el-upload :class="{disabled:uploadDisabled2}"
                       :file-list="form.idcardPhotoDownArr"
                       :headers="headers"
                       :on-preview="handlePictureCardPreview2"
                       :on-remove="handleRemove2"
                       :on-success="handleAvatarSuccess2"
                       action="/truck/truckFile/localUpload"
                       list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible2"
                       append-to-body>
              <img :src="dialogImageUrl2"
                   alt=""
                   width="100%">
            </el-dialog>
            <div>身份证背面</div>
          </div>
          <div class="flexItems">
            <el-upload :class="{disabled:uploadDisabled3}"
                       :file-list="form.qualificationArr"
                       :headers="headers"
                       :on-preview="handlePictureCardPreview3"
                       :on-remove="handleRemove3"
                       :on-success="handleAvatarSuccess3"
                       action="/truck/truckFile/localUpload"
                       list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible3"
                       append-to-body>
              <img :src="dialogImageUrl3"
                   alt=""
                   width="100%">
            </el-dialog>
            <div>从业资格证</div>
          </div>
        </div>
        <template v-for="(freightRouteItem, detailIndex) in form.freightRoute">
          <el-row>
            <el-col :offset="2"
                    :span="2">
              <i @click="addRuleItemForm(index)"
                 class="c_opearteButton addButton el-icon-circle-plus-outline"
                 type="primary"></i>
              <i @click="delRuleItemForm(index, detailIndex)"
                 class="c_opearteButton minusButton el-icon-remove-outline"
                 type="danger"></i>
            </el-col>
            <el-col :span="9">
              <el-form-item label="始发地"
                            prop="freightRouteItem.originArray">
                <area-cascader :data="pcaa"
                               :level="1"
                               type='text'
                               v-if="originArrayShow"
                               v-model='freightRouteItem.originArray'></area-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="目的地"
                            prop="freightRouteItem.destinationArray">
                <area-cascader :data="pcaa"
                               :level="1"
                               type='text'
                               v-if="destinationArrayShow"
                               v-model='freightRouteItem.destinationArray'></area-cascader>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form>
      <div class="dialog-footer"
           slot="footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button @click="create('form')"
                   type="primary"
                   v-if="dialogStatus=='create'">确 定</el-button>
        <el-button @click="update('form')"
                   type="primary"
                   v-else>修 改</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="imgTable">
      <img :src="previewTableImg"
           alt=""
           width="100%">
    </el-dialog>
  </div>
</template>

<script>
import { addObj, delObj, expObj, fetchDeptSelectObj, fetchList, putObj, selectDriverPhoneObj } from '@/api/tru_driver'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { mapGetters } from 'vuex'
import { AreaSelect } from 'vue-area-linkage'
import { pca, pcaa } from 'area-data'
import 'vue-area-linkage/dist/index.css'
import { getToken } from '@/util/auth'

export default {
  name: 'table_tru_driver',
  directives: {
    waves
  },
  components: { AreaSelect },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      rules: {
        plateId: [
          { required: true, message: '请输入车牌号', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请输入车辆状态', trigger: 'change' }
        ],
        driverName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, message: '长度大于2位', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入司机电话', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确手机号', trigger: 'blur' }
        ],
        idcardNumber: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ]
        // bankNumber: [
        //   { required: true, message: '请输入银行卡号', trigger: 'blur' },
        //   { min: 16, max: 19, message: '请输入正确银行卡号', trigger: 'blur' }
        // ],
        // licenseLevel: [
        //   { required: true, message: '请选择假证级别', trigger: 'change' }
        // ],
        // licenseLevelTime: [
        //   { required: true, message: '请选择驾驶证审验时间', trigger: 'change' }
        // ],
        // qualificationTime: [
        //   { required: true, message: '请选择从业证审验时间', trigger: 'change' }
        // ]
      },
      pca: pca,
      pcaa: pcaa,
      form: {
        status: '',
        licenseLevel: '',
        licenseLevelTime: '',
        qualificationTime: '',
        plateId: '',
        driverName: '',
        phone: '',
        bankNumber: '',
        idcardNumber: '',
        licensePhotoArr: [],
        qualificationArr: [],
        idcardPhotoUpArr: [],
        idcardPhotoDownArr: [],
        truckTeamId: '',
        freightRoute: [{
          originArray: [],
          destinationArray: []
        }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      stautsBool: false,
      tru_driver_add: false,
      tru_driver_upd: false,
      tru_driver_del: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      driverName: '',
      show: '',
      plateId: '',
      CarStatus: [{
        value: '0',
        label: '请假'
      }, {
        value: '1',
        label: '在途'
      }, {
        value: '2',
        label: '空闲'
      }],
      CarLicenseLevel: [{
        value: '0',
        label: 'A1'
      }, {
        value: '1',
        label: 'B2'
      }, {
        value: '2',
        label: 'C1'
      }],
      CarStatusvalue: '',
      CarLicenseLevelvalue: '',
      multipleSelection: [],
      plateNumberOptions: [],
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl: '',
      dialogVisible0: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      headers: {
        Authorization: 'Bearer ' + getToken()
      },
      dialogImageUrl0: '',
      dialogImageUrl1: '',
      dialogImageUrl2: '',
      dialogImageUrl3: '',
      imgTable: false,
      previewTableImg: '',
      originArrayShow: false,
      destinationArrayShow: false
    }
  },
  computed: {
    ...mapGetters([
      'permissions'
    ]),
    uploadDisabled0: function() {
      return this.form.licensePhotoArr.length > 0
    },
    uploadDisabled1: function() {
      return this.form.idcardPhotoUpArr.length > 0
    },
    uploadDisabled2: function() {
      return this.form.idcardPhotoDownArr.length > 0
    },
    uploadDisabled3: function() {
      return this.form.qualificationArr.length > 0
    }
  },
  inject: ['reload'],
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '有效',
        1: '无效'
      }
      return statusMap[status]
    },
    dataFrm: function(el) {
      return moment(el).format('YYYY-MM-DD')
    }
  },
  created() {
    this.getList()
    this.tru_driver_add = this.permissions['tru_driver_add']
    this.tru_driver_upd = this.permissions['tru_driver_upd']
    this.tru_driver_del = this.permissions['tru_driver_del']
    this.fetchDeptSelectObjList()
  },
  methods: {
    getList() {
      this.listLoading = false
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    fetchDeptSelectObjList() {
      fetchDeptSelectObj().then(response => {
        this.plateNumberOptions = response.data
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
    handleCreate() {
      this.resetTemp()
      this.originArrayShow = false
      this.destinationArrayShow = false
      this.form.freightRoute.originArray = []
      this.form.freightRoute.destinationArray = []
      var t = setTimeout(() => {
        this.originArrayShow = true
        this.destinationArrayShow = true
      }, 0)
      this.dialogStatus = 'create'
      this.form.freightRoute[0].originArray = []
      this.form.freightRoute[0].destinationArray = []
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
        this.originArrayShow = false
        this.destinationArrayShow = false
        this.form.freightRoute.originArray = []
        this.form.freightRoute.destinationArray = []
        var t = setTimeout(() => {
          this.originArrayShow = true
          this.destinationArrayShow = true
        }, 0)
        const row = this.multipleSelection[0]
        this.form.licensePhotoArr = []
        this.form.qualificationArr = []
        this.form.idcardPhotoUpArr = []
        this.form.idcardPhotoDownArr = []
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.form.driverId = row.driverId
        this.form.idcardNumber = row.idcardNumber
        this.form.truckTeamId = row.truckTeamId
        this.form.plateId = row.plateId
        this.form.plateId = row.plateId
        this.form.status = row.status
        if (this.form.status === '1') {
          this.stautsBool = true
        } else {
          this.stautsBool = false
        }
        this.form.driverName = row.driverName
        this.form.phone = row.phone
        this.form.licenseLevelTime = row.licenseLevelTime
        this.form.qualificationTime = row.qualificationTime
        this.form.licenseLevel = row.licenseLevel
        this.form.bankNumber = row.bankNumber
        if (isNaN(row.freightRoute)) {
          this.form.freightRoute = row.freightRoute
        } else {
          this.form.freightRoute = [{
            originArray: [],
            destinationArray: []
          }]
        }
        if ((isNaN(row.licensePhotoArr))) {
          var obj = {
            name: '驾驶证',
            url: row.licensePhotoArr
          }
          this.form.licensePhotoArr.push(obj)
        } else {
          this.form.licensePhotoArr = []
        }
        if ((isNaN(row.qualificationArr))) {
          var obj1 = {
            name: '身份证正面',
            url: row.qualificationArr
          }
          this.form.qualificationArr.push(obj1)
        } else {
          this.form.qualificationArr = []
        }
        if ((isNaN(row.idcardPhotoUpArr))) {
          var obj2 = {
            name: '身份证正面',
            url: row.idcardPhotoUpArr
          }
          this.form.idcardPhotoUpArr.push(obj2)
        } else {
          this.form.idcardPhotoUpArr = []
        }
        if ((isNaN(row.idcardPhotoDownArr))) {
          var obj3 = {
            name: '身份证反面',
            url: row.idcardPhotoDownArr
          }
          this.form.idcardPhotoDownArr.push(obj3)
        } else {
          this.form.idcardPhotoDownArr = []
        }
      } else {
        this.$notify({
          title: '警告',
          message: '只能选择一行数据进行修改',
          type: 'error',
          duration: 2000
        })
      }
    },
    handleDelete(row) {
      if (this.multipleSelection.length === 0) {
        this.$notify({
          title: '提示',
          message: '请选择要删除的数据',
          type: 'warn',
          duration: 2000
        })
      } else {
        this.$confirm('是否要删除选中的司机信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let str = ''
          let bool = false
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].driverId + ','
            if (this.multipleSelection[i].status === '1') {
              bool = true
            }
          }
          str = str.substring(0, str.length - 1)
          if (!bool) {
            delObj(str).then(response => {
              if (response.data.data) {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$message.error(response.data.msg)
              }
            })
          } else {
            this.$notify({
              title: '警告',
              message: '有在途车辆，不能删除',
              type: 'warning',
              duration: 2000
            })
          }
        })
      }
    },
    create(formName) {
      const set = this.$refs

      set[formName].validate(valid => {
        if (valid) {
          if (this.form.status !== '1') {
            selectDriverPhoneObj(this.form).then(res => {
              if (res.data === true) {
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
                this.$message.error('此手机号已注册，请更换')
              }
            })
          } else {
            this.$message.error('新增时车辆不能为在途')
          }
        } else {
          this.$message.error('请填写必填项')
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
      if ((this.form.idcardPhotoUpArr.length === 0) || (this.form.idcardPhotoUpArr.length === undefined)) {
        this.form.idcardPhotoUpArr = []
      } else {
        if (this.form.idcardPhotoUpArr[0].url) {
          this.form.idcardPhotoUpArr = this.form.idcardPhotoUpArr[0].url
        }
      }

      if ((this.form.qualificationArr.length === 0) || (this.form.qualificationArr.length === undefined)) {
        this.form.qualificationArr = []
      } else {
        if (this.form.qualificationArr[0].url) {
          this.form.qualificationArr = this.form.qualificationArr[0].url
        }
      }
      if ((this.form.idcardPhotoDownArr.length === 0) || (this.form.idcardPhotoDownArr.length === undefined)) {
        this.form.idcardPhotoDownArr = []
      } else {
        if (this.form.idcardPhotoDownArr[0].url) {
          this.form.idcardPhotoDownArr = this.form.idcardPhotoDownArr[0].url
        }
      }
      if ((this.form.licensePhotoArr.length === 0) || (this.form.licensePhotoArr.length === undefined)) {
        this.form.licensePhotoArr = []
      } else {
        if (this.form.licensePhotoArr[0].url) {
          this.form.licensePhotoArr = this.form.licensePhotoArr[0].url
        }
      }
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false

          selectDriverPhoneObj(this.form).then(res => {
            if (res.data === true) {
              putObj(this.form).then((response) => {
                if (response.data.data === true) {
                  this.dialogFormVisible = false
                  this.getList()
                  this.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success',
                    duration: 2000
                  })
                } else {
                  this.dialogFormVisible = false
                  this.$message.error(response.data.msg)
                }
              })
            } else {
              this.$message.error('此手机号已注册，请更换')
            }
          })
        } else {
          this.$message.error('请填写必填项')
          return false
        }
      })
    },
    toggleShow() {
      this.show = !this.show
    },
    cropUploadSuccess(jsonData, field) {
      this.$store.commit('SET_AVATAR', jsonData.filename)
    },
    resetTemp() {
      this.form = {
        freightRoute: [{
          originArray: [],
          destinationArray: []
        }],
        driverId: undefined,
        plateId: '',
        status: '',
        driverName: [],
        phone: '',
        licenseLevelTime: '',
        qualificationTime: '',
        licenseLevel: '',
        licensePhotoArr: [],
        truckTeamId: '',
        idcardPhotoUpArr: [],
        idcardPhotoDownArr: [],
        qualificationArr: [],
        bankNumber: ''
      }
    },
    handleExport() {
      let str = ''
      for (let i = 0; i < this.multipleSelection.length; i++) {
        str += this.multipleSelection[i].driverId + ','
      }
      if (this.multipleSelection.length >= 1) {
        str = str.substring(0, str.length - 1)
      } else {
        str = 'all'
      }
      if (this.multipleSelection.length !== 0) {
        expObj(str).then(response => {
          const blob = new Blob([response.data])
          var date = new Date()
          var year = date.getFullYear()
          var month = date.getMonth() + 1
          var day = date.getDate()
          if (month < 10) {
            month = '0' + month
          }
          if (day < 10) {
            day = '0' + day
          }
          var nowDate = year + '-' + month + '-' + day
          const fileName = nowDate + '-司机管理信息.xls'
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href)
          document.body.removeChild(elink)
          this.$notify({
            title: '成功',
            message: '导出成功',
            type: 'success',
            duration: 2000
          })
        })
      } else {
        this.$notify({
          title: '警告',
          message: '请选择导出数据',
          type: 'warning',
          duration: 2000
        })
      }
    },
    addRuleItemForm(index) {
      this.form.freightRoute.push({
        destinationArray: [],
        originArray: []
      })
    },
    delRuleItemForm(index, detailIndex) {
      if (this.form.freightRoute.length > 1) {
        this.form.freightRoute.splice(detailIndex, 1)
      }
    },
    handleRemove0(file, fileList) {
      this.form.licensePhotoArr = []
    },
    handlePictureCardPreview0(file) {
      this.dialogImageUrl0 = file.url
      this.dialogVisible0 = true
    },
    handleAvatarSuccess0(res, file) {
      this.form.licensePhotoArr.push(file.response.data)
    },

    handleRemove1(file, fileList) {
      this.form.idcardPhotoUpArr = []
    },
    handlePictureCardPreview1(file) {
      this.dialogImageUrl1 = file.url
      this.dialogVisible1 = true
    },
    handleAvatarSuccess1(res, file) {
      this.form.idcardPhotoUpArr.push(file.response.data)
    },

    handleRemove2(file, fileList) {
      this.form.idcardPhotoDownArr = []
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url
      this.dialogVisible2 = true
    },
    handleAvatarSuccess2(res, file) {
      this.form.idcardPhotoDownArr.push(file.response.data)
    },

    handleRemove3(file, fileList) {
      this.form.qualificationArr = []
    },
    handlePictureCardPreview3(file) {
      this.dialogImageUrl3 = file.url
      this.dialogVisible3 = true
    },
    handleAvatarSuccess3(res, file) {
      this.form.qualificationArr.push(file.response.data)
    },
    handlePreviewTableImg(img) {
      this.imgTable = true
      this.previewTableImg = img
    },
    handleTruckTeamId(value) {
      const arr = this.plateNumberOptions.filter(item => {
        if (value === item.truckId) {
          return item.truckTeamId
        }
      })

      this.form.truckTeamId = arr[0].truckTeamId
    }
  }
}
</script>
<style>
.c_opearteButton {
  font-size: 22px;
  line-height: 22px;
  padding-top: 8px;
}

.addButton {
  color: #409eff;
}

.minusButton {
  color: #f56c6c;
}

.area-select {
  width: 100% !important;
  height: 40px;
}

.area-select:focus {
  border-color: #1572e3;
}

.area-select .area-selected-trigger {
  padding-top: 0;
  padding-bottom: 0;
  line-height: 40px;
}

.flexItem {
  margin-top: 20px;
  display: flex;
}

.flexItems {
  flex: 1;
  text-align: center;
}

.cm20 {
  padding-bottom: 20px;
}

.disabled .el-upload--picture-card {
  display: none;
}

.truckDirver-from .el-dialog {
  width: 80%;
}
.demo-table-expand .el-form-item__label {
  color: #99a9bf;
}
</style>
