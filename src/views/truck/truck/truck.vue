<template>
  <div class="app-container calendar-list-container">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="车辆管理" name="first">
        <div class="filter-container">
          <el-form label-width="100px"
                   class="filter-item">
            <el-col :span="12">
              <el-form-item label="车辆类型 "
                            class="filter-item">
                <el-select class="filter-item"
                           filterable
                           placeholder="请选择"
                           v-model="listQuery.attribute"
                           clearable
                           @keyup.enter.native="handleFilter"
                           @change="handleFilter">
                  <el-option v-for="item in truck_attributeReq"
                             :key="item.id"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车牌号 "
                            class="filter-item">
                <el-select class="filter-item"
                           filterable
                           placeholder="请选择"
                           v-model="listQuery.plateNumber"
                           clearable
                           @keyup.enter.native="handleFilter"
                           @change="handleFilter">
                  <el-option v-for="item in plateNumberReq"
                             :key="item.id"
                             :label="item.plateNumber"
                             :value="item.plateNumber">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form>
          <div>
            <el-button v-if="tru_truck_add"
                       class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       icon="edit"
                       size="mini"
                       @click="handleCreate">新增
            </el-button>
            <el-button v-if="tru_truck_upd"
                       class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       size="mini"
                       @click="handleUpdate">编辑
            </el-button>
            <el-button v-if="tru_truck_del"
                       class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       size="mini"
                       @click="handleDelete">删除
            </el-button>
            <el-button class="filter-item"
                       type="primary"
                       size="mini"
                       v-waves
                       icon="search"
                       @click="handleFilter">搜索
            </el-button>
            <el-button class="filter-item"
                       type="primary"
                       size="mini"
                       v-waves
                       icon="search"
                       @click="handleAllTruckInfo">
              查看所有车辆位置信息
            </el-button>
          </div>
        </div>
        <el-table :key='tableKey'
                  :data="list"
                  v-loading="listLoading"
                  element-loading-text="给我一点时间"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
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
                    <el-form-item label="车主:">
                      <span>{{ props.row.truckOwner  }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="车主联系方式:">
                      <span>{{ props.row.truckOwnerPhone }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="载重:">
                      <span>{{ props.row.carryCapacity }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="7"
                          :offset="3">
                    <el-form-item label="车辆验审时间:">
                      <span>{{ props.row.truckTime | moment('YYYY-MM-DD') }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="营运证验审时间:">
                      <span>{{ props.row.operationTime | moment('YYYY-MM-DD') }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="保险证验审时间:">
                      <span>{{ props.row.policyNoTime | moment('YYYY-MM-DD') }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="7"
                          :offset="3">
                    <el-form-item label="车长:">
                      <span>{{ props.row.carLength }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="车型:">
                      <span v-if="props.row.carAttribute === '0'">集卡车</span>
                      <span v-if="props.row.carAttribute === '1'">半挂车</span>
                      <span v-if="props.row.carAttribute === '2'">高栏车</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="汽车品牌:">
                      <span>{{ props.row.brandNo }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="7" :offset="3">
                    <el-form-item label="添加时间:">
                      <span>{{ props.row.createTime | moment('YYYY-MM-DD') }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="添加人:">
                      <span>{{ props.row.createBy }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="车辆id"
                           v-if="false">
            <template slot-scope="scope">
              <span>{{ scope.row.truckId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="车队">
            <template slot-scope="scope">
              <span v-if="scope.row.truTruckTeam !== null">{{ scope.row.truTruckTeam.teamName }}</span>
              <span v-else>{{ scope.row.truTruckTeam.teamName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="车牌号">
            <template slot-scope="scope">
              <span>{{ scope.row.plateNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="挂牌号">
            <template slot-scope="scope">
              <span>{{ scope.row.trailerBrand }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="主司机">
            <template slot-scope="scope">
              <span v-if="scope.row.truDriverList.length >=1 ">{{ scope.row.truDriverList[0].driverName }}</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="主司机电话"
                           width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.truDriverList.length >=1 ">{{ scope.row.truDriverList[0].phone }}</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="副司机">
            <template slot-scope="scope">
              <span v-if="scope.row.truDriverList.length >=2 ">{{ scope.row.truDriverList[1].driverName }}</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="副司机电话"
                           width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.truDriverList.length >=2 ">{{ scope.row.truDriverList[1].phone }}</span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="车辆类型">
            <template slot-scope="scope">
              <span v-if="scope.row.attribute === '0'">自有车辆</span>
              <span v-if="scope.row.attribute === '1'">挂靠车辆</span>
              <span v-if="scope.row.attribute === '2'">外调车辆</span>
            </template>
          </el-table-column>
          <!--<el-table-column align="center" label="汽车品牌">-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.brandNo }}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column align="center" label="车型">-->
          <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.carAttribute === '0'">集卡车</span>-->
          <!--<span v-if="scope.row.carAttribute === '1'">半挂车</span>-->
          <!--<span v-if="scope.row.carAttribute === '2'">高栏车</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column align="center" label="载重">-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.carryCapacity }}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column align="center" label="车长">-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.carLength }}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column align="center" label="车辆验审时间" width="160">-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.truckTime | moment('YYYY-MM-DD') }}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column align="center" label="营运证验审时间" width="180">-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.operationTime | moment('YYYY-MM-DD') }}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column align="center" label="保险证验审时间" width="180">-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.policyNoTime | moment('YYYY-MM-DD') }}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column align="center" label="添加时间">-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.createTime | moment('YYYY-MM-DD') }}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column align="center" label="添加人">-->
          <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.createBy }}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
        <div v-show="!listLoading"
             class="pagination-container">
          <el-pagination @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page"
                         :page-sizes="[10,20,30, 50]"
                         :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="车主管理" name="second">
        <div class="filter-container">
          <el-form label-width="100px"
                   class="filter-item">
            <el-col :span="12">
              <el-form-item label="车主 "
                            class="filter-item">
                <el-input v-model="ownListQuery.truckownName" @keyup.enter.native="handleOwnFilter" placeholder="车主"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车主联系方式"
                            class="filter-item">
                <el-input v-model="ownListQuery.truckownPhone" @keyup.enter.native="handleOwnFilter"
                          placeholder="车主联系方式" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <div>
            <el-button v-if="tru_truck_add"
                       class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       icon="edit"
                       size="mini"
                       @click="handleOwnCreate">新增
            </el-button>
            <el-button v-if="tru_truck_upd"
                       class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       size="mini"
                       @click="handleOwnUpdate">编辑
            </el-button>
            <el-button v-if="tru_truck_del"
                       class="filter-item"
                       style="margin-left: 10px;"
                       type="primary"
                       size="mini"
                       @click="handleOwnDelete">删除
            </el-button>
            <el-button class="filter-item"
                       type="primary"
                       size="mini"
                       v-waves
                       icon="search"
                       @click="handleOwnFilter">搜索
            </el-button>
          </div>
        </div>
        <el-table key='1'
                  :data="ownList"
                  v-loading="listLoading"
                  element-loading-text="给我一点时间"
                  border
                  fit
                  highlight-current-row
                  style="width: 100%"
                  @selection-change="handleOwnSelectionChange">
          <el-table-column type="selection"
                           width="55">
          </el-table-column>
          <el-table-column align="center"
                           label="车主">
            <template slot-scope="scope">
              <span>{{ scope.row.truckownName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           label="车主联系方式">
            <template slot-scope="scope">
              <span>{{ scope.row.truckownPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           sortable
                           label="车辆数">
            <template slot-scope="scope">
              <span>{{ scope.row.truckList.length }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           sortable
                           label="银行卡号">
            <template slot-scope="scope">
              <span>{{ scope.row.bankNumber  }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div v-show="!listLoading"
             class="pagination-container">
          <el-pagination @size-change="handleOwnSizeChange"
                         @current-change="handleOwnCurrentChange"
                         :current-page.sync="ownListQuery.page"
                         :page-sizes="[10,20,30, 50]"
                         :page-size="ownListQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="ownTotal">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               class="truck-from">
      <el-form :model="form"
               :rules="rules"
               ref="form"
               label-width="120px">
        <h3>基础信息</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item label="车牌号"
                          prop="plateNumber">
              <el-input v-model="form.plateNumber"
                        placeholder="车牌号"
                        :disabled="updatePlateNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="挂牌号"
                          prop="trailerBrand">
              <el-input v-model="form.trailerBrand"
                        placeholder="挂牌号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车主"
                          prop="truckOwnerId">
              <el-select class="filter-item"
                         v-model="form.truckOwnerId"
                         placeholder="车主">
                <el-option v-for="item in truckOwnArr"
                           :key="item.id"
                           :label="item.truckownName"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车主联系方式"
                          prop="truckOwnerPhone">
              <el-input v-model="form.truckOwnerPhone"
                        placeholder="车主联系方式" disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="车队"
                          prop="truckTeamId">
              <el-select class="filter-item"
                         v-model="form.truckTeamId"
                         placeholder="请选择车队"
                         :disabled="updateform">
                <el-option v-for="item in selectTruckDriverTeamReq"
                           :key="item.truckTeamId"
                           :label="item.teamName"
                           :value="item.truckTeamId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车辆类型"
                          prop="attribute">
              <el-select class="filter-item"
                         v-model="form.attribute"
                         placeholder="请选择车辆类型"
                         :disabled="updateform">
                <el-option v-for="item in truck_attributeReq"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车型"
                          prop="carAttribute">
              <el-select class="filter-item"
                         v-model="form.carAttribute"
                         placeholder="请选择车型">
                <el-option v-for="item in carAttributeReq"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车长"
                          prop="carLength">
              <el-input v-model="form.carLength"
                        placeholder="车长"
                        maxlength="5">
                <template slot="append">米
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="载重"
                          prop="carryCapacity">
              <el-input v-model="form.carryCapacity"
                        placeholder="载重"
                        maxlength="5">
                <template slot="append">吨
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="汽车品牌"
                          prop="brandNo">
              <el-input v-model="form.brandNo"
                        placeholder="汽车品牌"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="营运号"
                          prop="operationNumber">
              <el-input v-model="form.operationNumber"
                        placeholder="营运号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车架号"
                          prop="carframeNumber">
              <el-input v-model="form.carframeNumber"
                        placeholder="车架号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="车重"
                          prop="carWeight">
              <el-input v-model="form.carWeight"
                        placeholder="车重"
                        maxlength="5">
                <template slot="append">吨
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="车辆验审时间"
                          prop="truckTime">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="form.truckTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="营运证验审时间"
                          prop="operationTime">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="form.operationTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保险证验审时间"
                          prop="policyNoTime">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="form.policyNoTime"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="发动机号"
                          prop="engineNumber">
              <el-input v-model="form.engineNumber"
                        placeholder="发动机号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保险单号"
                          prop="policyNo">
              <el-input v-model="form.policyNo"
                        placeholder="保险单号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>证件上传</h3>
        <div class="flexItem cm20">
          <div class="flexItems">
            <el-upload action="/truck/truckFile/localUpload"
                       list-type="picture-card"
                       :headers="headers"
                       :file-list="form.truTruckfile.drivingLicenseCopyArr"
                       :class="{disabled:uploadDisabled0}"
                       :on-preview="handlePictureCardPreview0"
                       :on-success="handleAvatarSuccess0"
                       :on-remove="handleRemove0">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible0"
                       append-to-body>
              <img width="100%"
                   :src="dialogImageUrl0"
                   alt="">
            </el-dialog>
            <div>驾驶证</div>
          </div>
          <div class="flexItems">
            <el-upload action="/truck/truckFile/localUpload"
                       list-type="picture-card"
                       :headers="headers"
                       :file-list="form.truTruckfile.certificateCopyArr"
                       :class="{disabled:uploadDisabled1}"
                       :on-preview="handlePictureCardPreview1"
                       :on-success="handleAvatarSuccess1"
                       :on-remove="handleRemove1">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible1"
                       append-to-body>
              <img width="100%"
                   :src="dialogImageUrl1"
                   alt="">
            </el-dialog>
            <div>合格证</div>
          </div>

          <div class="flexItems">
            <el-upload action="/truck/truckFile/localUpload"
                       list-type="picture-card"
                       :file-list="form.truTruckfile.operationCertificateCopyArr"
                       :headers="headers"
                       :class="{disabled:uploadDisabled2}"
                       :on-preview="handlePictureCardPreview2"
                       :on-success="handleAvatarSuccess2"
                       :on-remove="handleRemove2">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible2"
                       append-to-body>
              <img width="100%"
                   :src="dialogImageUrl2"
                   alt="">
            </el-dialog>
            <div>营运证</div>
          </div>
          <div class="flexItems">
            <el-upload action="/truck/truckFile/localUpload"
                       list-type="picture-card"
                       :headers="headers"
                       :file-list="form.truTruckfile.vehicleRoadOriginalArr"
                       :class="{disabled:uploadDisabled3}"
                       :on-preview="handlePictureCardPreview3"
                       :on-success="handleAvatarSuccess3"
                       :on-remove="handleRemove3">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible3"
                       append-to-body>
              <img width="100%"
                   :src="dialogImageUrl3"
                   alt="">
            </el-dialog>
            <div>车辆道路经营许可证</div>
          </div>
          <div class="flexItems">
            <el-upload action="/truck/truckFile/localUpload"
                       list-type="picture-card"
                       :headers="headers"
                       :file-list="form.truTruckfile.enregisterOriginalArr"
                       :class="{disabled:uploadDisabled4}"
                       :on-preview="handlePictureCardPreview4"
                       :on-success="handleAvatarSuccess4"
                       :on-remove="handleRemove4">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible4"
                       append-to-body>
              <img width="100%"
                   :src="dialogImageUrl4"
                   alt="">
            </el-dialog>
            <div>登记证书</div>
          </div>
        </div>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注"
                          prop="username">
              <el-input type="textarea"
                        v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="create('form')">确 定
        </el-button>
        <el-button v-else
                   type="primary"
                   @click="update('form')">修 改
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="车辆位置信息"
               :visible.sync="dialogMapVisible"
               class="mapDialog">
      <baidu-map class="map"
                 :zoom="5"
                 :center="{lng: 116.404, lat: 39.915}"
                 :scroll-wheel-zoom="true">
        <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT">
          <el-button @click="handleAll">所有车辆</el-button>
          <el-button @click="handleSelect">在途车辆</el-button>
          <!--<bm-point-collection :points="points" color="red" size="BMAP_POINT_SIZE_SMALL" @click="handle"></bm-point-collection>-->
          <bml-marker-clusterer :averageCenter="true">
            <bm-marker v-for="(marker,index) of markers"
                       :position="{lng: marker[5], lat: marker[6]}"
                       :key="index"
                       @click="handleShowInfo(index)"></bm-marker>
          </bml-marker-clusterer>
          <bm-info-window :position="{lng: infoWindow.lng, lat: infoWindow.lat}"
                          title="车辆信息"
                          :show="infoWindow.show">
            <p>车牌号:{{infoWindow.plateNumber}}</p>
            <p>司机:{{infoWindow.drivername}}</p>
            <p>联系方式:{{infoWindow.driverphone}}</p>
            <p>车辆位置:{{infoWindow.driverlocal}}</p>
            <p>车辆状态:{{infoWindow.status}}</p>
          </bm-info-window>
        </bm-control>
      </baidu-map>
      <el-dialog width="30%"
                 title="提示"
                 :visible.sync="innerVisible"
                 append-to-body>
        暂无车辆数据
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="innerVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogMapVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogMapVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogOwnFormVisible">
      <el-form :model="ownForm" :rules="rules" ref="ownForm" label-width="140px">
        <el-form-item label="车主id" prop="id" v-show="false">
          <el-input v-model="ownForm.id" placeholder="车主id"></el-input>
        </el-form-item>
        <el-form-item label="车主姓名" prop="truckownName">
          <el-input v-model="ownForm.truckownName" placeholder="车主姓名"></el-input>
        </el-form-item>
        <el-form-item label="车主联系方式" prop="truckownPhone">
          <el-input v-model="ownForm.truckownPhone" placeholder="车主联系方式"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankNumber">
          <el-input v-model="ownForm.bankNumber" placeholder="银行卡号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ownCancel('ownForm')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="ownCreate('ownForm')">确 定</el-button>
        <el-button v-else type="primary" @click="ownUpdate('ownForm')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addObj,
    addTruckOwnObj,
    allTruckGPSObj,
    allTruTruckOwn,
    car_attribute,
    common_type,
    delObj,
    delTruckOwnObj,
    fetchDeptSelect,
    fetchList,
    fetchTruckOwnList,
    putObj,
    putTruckOwnObj,
    selectTruckDriverTeamListObj,
    truck_attribute
  } from '@/api/tru_truck'
  import { BmlMarkerClusterer } from 'vue-baidu-map'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'
  import { getToken } from '@/util/auth'

  export default {
    name: 'table_tru_truck',
    directives: {
      waves
    },
    components: {
      BmlMarkerClusterer
    },
    data() {
      var checkPlateNumber = (rule, value, callback) => {
        const plateNumberReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
        if (!value) {
          return callback(new Error('车牌号不能为空'))
        }
        setTimeout(() => {
          if (plateNumberReg.test(value)) {
            callback()
          } else {
            callback(new Error('车牌号格式不正确'))
          }
        }, 100)
      }
      var checkTrailerNumber = (rule, value, callback) => {
        const plateNumberReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
        if (!value) {
          return callback(new Error('车牌号不能为空'))
        }
        setTimeout(() => {
          if (plateNumberReg.test(value)) {
            callback()
          } else {
            callback(new Error('车牌号格式不正确'))
          }
        }, 100)
      }
      var checkPhoneNumber = (rule, value, callback) => {
        const phoneNumberReg = /^1(3|4|5|7|8|9)\d{9}$/
        if (!value) {
          return callback(new Error('手机号不能为空'))
        }
        setTimeout(() => {
          if (phoneNumberReg.test(value)) {
            callback()
          } else {
            callback(new Error('手机号格式不正确'))
          }
        }, 100)
      }
      return {
        activeName: 'first',
        innerVisible: false,
        updatePlateNumber: false,
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20
        },
        ownList: null,
        ownTotal: null,
        ownListQuery: {
          page: 1,
          limit: 20
        },
        markers: [],
        infoWindow: {
          show: false,
          lng: '',
          lat: '',
          plateNumber: '',
          drivername: '',
          driverphone: '',
          driverlocal: '',
          status: ''
        },
        dialogOwnFormVisible: false,
        ownForm: {
          truckownName: '',
          truckownPhone: '',
          bankNumber:''
        },
        rules: {
          plateNumber: [
            { required: true, message: '请输入车牌号', trigger: 'blur' },
            { validator: checkPlateNumber, trigger: 'blur' }
          ],
          truckownName: [
            { required: true, message: '请输入车主', trigger: 'blur' }
          ],
          truckownPhone: [
            { required: true, message: '请输入车主联系方式', trigger: 'blur' },
            { validator: checkPhoneNumber, trigger: 'blur' }
          ],
          trailerBrand: [
            { required: true, message: '请输入挂牌号', trigger: 'blur' },
            { validator: checkTrailerNumber, trigger: 'blur' }
          ],
          truckOwnerId: [
            { required: true, message: '请输入车主姓名', trigger: 'change' }
          ],
          truckOwnerPhone: [
            { required: true, message: '请输入车主联系方式', trigger: 'blur' },
            { validator: checkPhoneNumber, trigger: 'blur' }
          ],
          truckTeamId: [
            { required: true, message: '请选择车队', trigger: 'change' }
          ],
          attribute: [
            { required: true, message: '请选择车辆类型', trigger: 'change' }
          ],
          carAttribute: [
            { required: true, message: '请选择车型', trigger: 'change' }
          ]
          // carLength: [
          //   { required: true, message: '请输入车长', trigger: 'blur' }
          // ],
          // carryCapacity: [
          //   { required: true, message: '请输入载重', trigger: 'blur' }
          // ],
          // operationNumber: [
          //   { required: true, message: '请输入营运号', trigger: 'blur' }
          // ],
          // carframeNumber: [
          //   { required: true, message: '请输入车架号', trigger: 'blur' }
          // ],
          // carWeight: [
          //   { required: true, message: '请输入车重', trigger: 'blur' }
          // ],

          // truckTime: [
          //   { required: true, message: '请输入车辆验审时间', trigger: 'change' }
          // ],
          // operationTime: [
          //   { required: true, message: '请输入营运证验审时间', trigger: 'change' }
          // ],
          // policyNoTime: [
          //   { required: true, message: '请输入保险证验审时间', trigger: 'change' }
          // ]
        },
        form: {
          truckOwnerId:'',
          attribute: '',
          truckTime: '',
          operationTime: '',
          policyNoTime: '',
          carAttribute: '',
          operationNumber: '',
          truckTeamId: '',
          truTruckfile: {
            drivingLicenseCopyArr: [],
            certificateCopyArr: [],
            operationCertificateCopyArr: [],
            vehicleRoadOriginalArr: [],
            enregisterOriginalArr: [],
            truckFileId: ''
          }
        },
        headers: {
          Authorization: 'Bearer ' + getToken()
        },
        dialogFormVisible: false,
        dialogStatus: '',
        tru_truck_add: false,
        tru_truck_upd: false,
        tru_truck_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        multipleSelection: [],
        ownMultipleSelection: [],
        commonTypeReq: [],
        from_isSupervise: '',
        form_carType: '',
        dialogImageUrl: '',
        carAttributeReq: [],
        truck_attributeReq: [],
        selectTruckDriverTeamReq: [],
        selectPlateNumberReq: [],
        dialogMapVisible: false,
        dialogVisible0: false,
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dialogVisible4: false,
        dialogImageUrl0: '',
        dialogImageUrl1: '',
        dialogImageUrl2: '',
        dialogImageUrl3: '',
        dialogImageUrl4: '',
        plateNumberReq: [],
        truckReq: [],
        updateform: false,
        truckOwnArr: []
      }
    },
    watch: {
      'form.truckOwnerId': {
        handler(newV, oldV) {
          if (newV) {
            let arr = this.truckOwnArr.filter(item => {
              if (item.id === newV) {
                return item
              }
            })
            this.form.truckOwnerPhone = arr[0].truckownPhone
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'permissions'
      ]),
      uploadDisabled0: function() {
        return this.form.truTruckfile.drivingLicenseCopyArr.length > 0
      },
      uploadDisabled1: function() {
        return this.form.truTruckfile.certificateCopyArr.length > 0
      },
      uploadDisabled2: function() {
        return this.form.truTruckfile.operationCertificateCopyArr.length > 0
      },
      uploadDisabled3: function() {
        return this.form.truTruckfile.vehicleRoadOriginalArr.length > 0
      },
      uploadDisabled4: function() {
        return this.form.truTruckfile.enregisterOriginalArr.length > 0
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '有效',
          1: '无效'
        }
        return statusMap[status]
      }
    },
    created() {
      this.tru_truck_add = this.permissions['tru_truck_add']
      this.tru_truck_upd = this.permissions['tru_truck_upd']
      this.tru_truck_del = this.permissions['tru_truck_del']
    },
    mounted() {
      this.getList()
      this.car_attributeList()
      this.truck_attributeList()
      this.handleselectTruckDriverTeamList()
      this.handleFetchDeptSelect()
      this.addPoints()
      this.getAllOwn()
    },
    methods: {
      getAllOwn() {
        allTruTruckOwn().then(res => {
          this.truckOwnArr = res.data
        })
      },
      addPoints() {
        const points = []
        for (var i = 0; i < 1000; i++) {
          const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 }
          points.push(position)
        }
        this.points = points
      },
      handleselectTruckDriverTeamList() {
        selectTruckDriverTeamListObj().then(response => {
          this.selectTruckDriverTeamReq = response.data
        })
      },
      car_attributeList() {
        car_attribute().then(response => {
          this.carAttributeReq = response.data
        })
      },
      truck_attributeList() {
        truck_attribute().then(response => {
          this.truck_attributeReq = response.data
        })
      },
      common_type() {
        common_type().then(response => {
          this.commonTypeReq = response.data
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      getList() {
        this.listLoading = false
        fetchList(this.listQuery).then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
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
          this.form.truTruckfile.drivingLicenseCopyArr = []
          this.form.truTruckfile.certificateCopyArr = []
          this.form.truTruckfile.operationCertificateCopyArr = []
          this.form.truTruckfile.vehicleRoadOriginalArr = []
          this.form.truTruckfile.enregisterOriginalArr = []
          const row = this.multipleSelection[0]
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.form.truckId = row.truckId
          this.form.plateNumber = row.plateNumber
          this.form.truckOwnerId = row.truckOwnerId
          this.form.operationNumber = row.operationNumber
          this.form.carframeNumber = row.carframeNumber
          this.form.invoiceNumber = row.invoiceNumber
          this.form.policyNo = row.policyNo
          this.form.brandNo = row.brandNo
          this.form.type = row.type
          this.form.attribute = row.attribute
          this.form.engineNumber = row.engineNumber
          this.form.drivingLicense = row.drivingLicense
          this.form.truckOwnerPhone = row.truckOwnerPhone
          this.form.depositBank = row.depositBank
          this.form.truckCardNumber = row.truckCardNumber
          this.form.isSupervise = row.isSupervise
          this.form.carWeight = row.carWeight
          this.form.carLength = row.carLength
          this.form.carryCapacity = row.carryCapacity
          this.form.trailerBrand = row.trailerBrand
          this.form.carAttribute = row.carAttribute
          this.form.remark = row.remark
          this.form.truckTeamId = row.truckTeamId
          this.form.truTruckfile.truckFileId = row.truckId
          this.form.truckTime = row.truckTime
          this.form.operationTime = row.operationTime
          this.form.policyNoTime = row.policyNoTime
          this.updatePlateNumber = true
          // this.form.truTruckfile.drivingLicenseCopyArr = row.truTruckfile.drivingLicenseCopyArr
          // this.form.truTruckfile.certificateCopyArr = row.truTruckfile.certificateCopyArr
          // this.form.truTruckfile.operationCertificateCopyArr = row.truTruckfile.operationCertificateCopyArr
          // this.form.truTruckfile.vehicleRoadOriginalArr = row.truTruckfile.vehicleRoadOriginalArr
          // this.form.truTruckfile.enregisterOriginalArr = row.truTruckfile.enregisterOriginalArr
          if (isNaN(row.truTruckfile)) {
            if ((isNaN(row.truTruckfile.certificateCopyArr))) {
              var obj = {
                name: '文件',
                url: row.truTruckfile.certificateCopyArr
              }
              this.form.truTruckfile.certificateCopyArr.push(obj)
            } else {
              this.form.truTruckfile.certificateCopyArr = []
            }
            if ((isNaN(row.truTruckfile.operationCertificateCopyArr))) {
              var obj1 = {
                name: '文件',
                url: row.truTruckfile.operationCertificateCopyArr
              }
              this.form.truTruckfile.operationCertificateCopyArr.push(obj1)
            } else {
              this.form.truTruckfile.operationCertificateCopyArr = []
            }
            if ((isNaN(row.truTruckfile.vehicleRoadOriginalArr))) {
              var obj2 = {
                name: '文件',
                url: row.truTruckfile.vehicleRoadOriginalArr
              }
              this.form.truTruckfile.vehicleRoadOriginalArr.push(obj2)
            } else {
              this.form.truTruckfile.vehicleRoadOriginalArr = []
            }
            if ((isNaN(row.truTruckfile.enregisterOriginalArr))) {
              var obj3 = {
                name: '文件',
                url: row.truTruckfile.enregisterOriginalArr
              }
              this.form.truTruckfile.enregisterOriginalArr.push(obj3)
            } else {
              this.form.truTruckfile.enregisterOriginalArr = []
            }
            if ((isNaN(row.truTruckfile.drivingLicenseCopyArr))) {
              var obj4 = {
                name: '文件',
                url: row.truTruckfile.drivingLicenseCopyArr
              }
              this.form.truTruckfile.drivingLicenseCopyArr.push(obj4)
            } else {
              this.form.truTruckfile.drivingLicenseCopyArr = []
            }
            if (row.truDriverList[0]) {
              if (row.truDriverList[0].status !== '1') {
                this.updateform = false
              } else {
                this.updateform = true
              }
            } else {
              this.updateform = false
            }
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
      handleDelete() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除的数据',
            type: 'warn',
            duration: 2000
          })
        } else {
          let str = ''
          for (let i = 0; i < this.multipleSelection.length; i++) {
            str += this.multipleSelection[i].truckId + ','
          }
          str = str.substring(0, str.length - 1)
          this.$confirm('是否要删除选中的车辆数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
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
          })
        }
      },
      handleCreate() {
        this.dialogFormVisible = true
        this.resetTemp()
        this.dialogStatus = 'create'
        this.updatePlateNumber = false
      },
      create(formName) {
        const set = this.$refs
        this.form.isSupervise = this.from_isSupervise
        this.form.form_carType = this.form_carType
        set[formName].validate(valid => {
          if (valid) {
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
        if (isNaN(this.form.truTruckfile)) {
          if (this.form.truTruckfile.certificateCopyArr.length === 0) {
            this.form.truTruckfile.certificateCopyArr = []
          } else {
            if (this.form.truTruckfile.certificateCopyArr[0].url) {
              this.form.truTruckfile.certificateCopyArr = this.form.truTruckfile.certificateCopyArr[0].url
            }
          }
          if (this.form.truTruckfile.operationCertificateCopyArr.length === 0) {
            this.form.truTruckfile.operationCertificateCopyArr = []
          } else {
            if (this.form.truTruckfile.operationCertificateCopyArr[0].url) {
              this.form.truTruckfile.operationCertificateCopyArr = this.form.truTruckfile.operationCertificateCopyArr[0].url
            }
          }
          if (this.form.truTruckfile.vehicleRoadOriginalArr.length === 0) {
            this.form.truTruckfile.vehicleRoadOriginalArr = []
          } else {
            if (this.form.truTruckfile.vehicleRoadOriginalArr[0].url) {
              this.form.truTruckfile.vehicleRoadOriginalArr = this.form.truTruckfile.vehicleRoadOriginalArr[0].url
            }
          }
          if (this.form.truTruckfile.enregisterOriginalArr.length === 0) {
            this.form.truTruckfile.enregisterOriginalArr = []
          } else {
            if (this.form.truTruckfile.enregisterOriginalArr[0].url) {
              this.form.truTruckfile.enregisterOriginalArr = this.form.truTruckfile.enregisterOriginalArr[0].url
            }
          }
          if (this.form.truTruckfile.drivingLicenseCopyArr.length === 0) {
            this.form.truTruckfile.drivingLicenseCopyArr = []
          } else {
            if (this.form.truTruckfile.drivingLicenseCopyArr[0].url) {
              this.form.truTruckfile.drivingLicenseCopyArr = this.form.truTruckfile.drivingLicenseCopyArr[0].url
            }
          }
        }
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.isSupervise = this.from_isSupervise
            this.form.form_carType = this.form_carType
            putObj(this.form).then((res) => {
              if (res.data.data) {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
                this.updateform = false
                this.updatePlateNumber = false
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.$message.error('必填项不能为空')
            return false
          }
        })
      },
      resetTemp() {
        this.form = {
          truckId: undefined,
          truckTime: '',
          operationTime: '',
          policyNoTime: '',
          plateNumber: '',
          truckOwnerId: '',
          operationNumber: '',
          carframeNumber: '',
          invoiceNumber: '',
          policyNo: '',
          brandNo: '',
          type: '',
          attribute: '',
          engineNumber: '',
          drivingLicense: '',
          truckOwnerPhone: '',
          depositBank: '',
          truckCardNumber: '',
          isSupervise: '',
          truTruckfile: {
            drivingLicenseCopyArr: [],
            certificateCopyArr: [],
            operationCertificateCopyArr: [],
            vehicleRoadOriginalArr: [],
            enregisterOriginalArr: [],
            truckFileId: ''
          }
        }
        this.updateform = false
        this.updatePlateNumber = false
      },
      handleRemove0(file, fileList) {
        this.form.truTruckfile.drivingLicenseCopyArr = []
      },
      handlePictureCardPreview0(file) {
        this.dialogImageUrl0 = file.url
        this.dialogVisible0 = true
      },
      handleAvatarSuccess0(res, file) {
        this.form.truTruckfile.drivingLicenseCopyArr.push(file.response.data)
      },
      handleRemove1(file, fileList) {
        this.form.truTruckfile.certificateCopyArr = []
      },
      handlePictureCardPreview1(file) {
        this.dialogImageUrl1 = file.url
        this.dialogVisible1 = true
      },
      handleAvatarSuccess1(res, file) {
        this.form.truTruckfile.certificateCopyArr.push(file.response.data)
      },

      handleRemove2(file, fileList) {
        this.form.truTruckfile.operationCertificateCopyArr = []
      },
      handlePictureCardPreview2(file) {
        this.dialogImageUrl2 = file.url
        this.dialogVisible2 = true
      },
      handleAvatarSuccess2(res, file) {
        this.form.truTruckfile.operationCertificateCopyArr.push(file.response.data)
      },

      handleRemove3(file, fileList) {
        this.form.truTruckfile.vehicleRoadOriginalArr = []
      },
      handlePictureCardPreview3(file) {
        this.dialogImageUrl3 = file.url
        this.dialogVisible3 = true
      },
      handleAvatarSuccess3(res, file) {
        this.form.truTruckfile.vehicleRoadOriginalArr.push(file.response.data)
      },

      handleRemove4(file, fileList) {
        this.form.truTruckfile.enregisterOriginalArr = []
      },
      handlePictureCardPreview4(file) {
        this.dialogImageUrl4 = file.url
        this.dialogVisible4 = true
      },
      handleAvatarSuccess4(res, file) {
        this.form.truTruckfile.enregisterOriginalArr.push(file.response.data)
      },
      handleFetchDeptSelect() {
        fetchDeptSelect().then(res => {
          this.plateNumberReq = res.data
        })
      },
      handleAllTruckInfo() {
        allTruckGPSObj().then(res => {
          this.truckReq = res.data.filter(item => {
            return item[5] !== null
          })
          this.markers = this.truckReq
          this.dialogMapVisible = true
          if (this.markers.length === 0) {
            this.infoWindow.show = false
            this.innerVisible = true
          }
        })
      },
      handleShowInfo(index) {
        this.infoWindow.plateNumber = this.markers[index][0]
        this.infoWindow.drivername = this.markers[index][1]
        this.infoWindow.driverphone = this.markers[index][2]
        this.infoWindow.status = this.markers[index][3]
        this.infoWindow.driverlocal = this.markers[index][4]
        this.infoWindow.lng = this.markers[index][5]
        this.infoWindow.lat = this.markers[index][6]
        this.infoWindow.show = true
      },
      handleAll() {
        this.markers = this.truckReq
      },
      handleSelect() {
        this.markers = this.truckReq.filter(item => {
          return item[3] !== '非在途'
        })
        if (this.markers.length === 0) {
          this.infoWindow.show = false
          this.innerVisible = true
        }
      },
      getCarOwnList() {
        this.listLoading = false
        fetchTruckOwnList(this.ownListQuery).then(response => {
          this.ownList = response.data.records
          this.ownTotal = response.data.total
          console.log(response)
          this.listLoading = false
        })
      },
      handleOwnSizeChange(val) {
        this.ownListQuery.limit = val
        this.getCarOwnList()
      },
      handleOwnCurrentChange(val) {
        this.ownListQuery.page = val
        this.getCarOwnList()
      },
      handleOwnFilter() {
        this.ownListQuery.page = 1
        this.getCarOwnList()
      },
      handleOwnSelectionChange(val) {
        this.ownMultipleSelection = val
      },

      handleOwnCreate() {
        this.dialogOwnFormVisible = true
        this.ownForm.truckownName = ''
        this.ownForm.truckownPhone = ''
        this.ownForm.bankNumber = ''
        this.dialogStatus = 'create'
      },
      ownCreate(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            addTruckOwnObj(this.ownForm)
              .then((res) => {
                if (res.data.data) {
                  this.dialogOwnFormVisible = false
                  this.getCarOwnList()
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
            return false
          }
        })
      },
      ownCancel(formName) {
        this.dialogOwnFormVisible = false
      },
      handleOwnUpdate() {
        if (this.ownMultipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要修改的数据',
            type: 'warn',
            duration: 2000
          })
        } else if (this.ownMultipleSelection.length === 1) {
          const row = this.ownMultipleSelection[0]
          this.dialogStatus = 'update'
          this.dialogOwnFormVisible = true
          this.ownForm.id = row.id
          this.ownForm.truckownName = row.truckownName
          this.ownForm.truckownPhone = row.truckownPhone
          this.ownForm.bankNumber = row.bankNumber
        } else {
          this.$notify({
            title: '警告',
            message: '只能选择一行数据进行修改',
            type: 'error',
            duration: 2000
          })
        }
      },
      handleOwnDelete() {
        if (this.ownMultipleSelection.length === 0) {
          this.$notify({
            title: '提示',
            message: '请选择要删除的数据',
            type: 'warn',
            duration: 2000
          })
        } else {
          let str = ''
          for (let i = 0; i < this.ownMultipleSelection.length; i++) {
            str += this.ownMultipleSelection[i].id + ','
          }
          str = str.substring(0, str.length - 1)
          this.$confirm('是否要删除选中的车主信息', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delTruckOwnObj(str).then(response => {
              if (response.data.data) {
                this.getCarOwnList()
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
          })
        }
      },
      ownUpdate(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            // this.form.password = undefined
            putTruckOwnObj(this.ownForm).then((res) => {
              if (res.data.data) {
                this.dialogOwnFormVisible = false
                this.getCarOwnList()
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$message.error(res.data.msg)
              }
            })
          } else {
            this.$message.error('必填项不能为空')
            return false
          }
        })
      },
      handleClick(tab, event) {
        if (tab.name === 'first') {
          this.getList()
          this.getAllOwn()
        } else if (tab.name === 'second') {
          this.getCarOwnList()
        }
      }
    }
  }
</script>
<style>
  .disabled .el-upload--picture-card {
    display: none;
  }

  .flexItem {
    margin-top: 20px;
    display: flex;
  }

  .el-dialogs {
    flex: 1;
    text-align: center;
  }

  .cm20 {
    padding-bottom: 20px;
  }

  .truck-from .el-dialog {
    width: 80%;
  }

  .flexItems {
    flex: 1;
  }

  .mapDialog .el-dialog {
    margin-top: 3vh !important;
  }

  .mapDialog .el-dialog__body {
    padding: 10px 20px;
  }

  .map {
    width: 100%;
    height: 800px;
  }

  .demo-table-expand .el-form-item__label {
    color: #99a9bf;
  }
</style>
