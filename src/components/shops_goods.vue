<template>
  <div id="goodsAll">
    <Modal v-model="modal1" title="添加商品信息" @on-ok="ok" @on-cancel="cancel">
      <Form :model="formRight" label-position="right" :label-width="100">
        <FormItem label="商品名称">
          <Input v-model="formRight.input1"></Input>
        </FormItem>
        <FormItem label="商品图片">
          <Upload ref="upload" :show-upload-list="false" name="inputFile" :on-success="handleSuccess" multiple type="drag" :action="action"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="商品价格">
          <Input v-model="formRight.input2"></Input>
        </FormItem>
        <FormItem label="商品折扣价格">
          <Input v-model="formRight.input3"></Input>
        </FormItem>
        <FormItem label="快递费">
          <Input v-model="formRight.input4"></Input>
        </FormItem>
        <FormItem label="商品地址">
          <Input v-model="formRight.input6"></Input>
        </FormItem>
        <FormItem label="商品参数">
          <Button type="primary" ghost @click="modal3 = true">增加商品参数</Button>
        </FormItem>
        <FormItem label="商品规格">
          <Button type="primary" ghost @click="modal4 = true">增加商品规格</Button>
        </FormItem>
        <FormItem label="评论">
          <Button type="primary" ghost @click="modal2 = true">增加评论</Button>
        </FormItem>
        <FormItem label="商品详情图片">
          <Upload ref="upload" :show-upload-list="false" name="inputFile" :on-success="infoHandleSuccess" multiple type="drag" :action="infoAction"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="服务">
          <Button type="primary" ghost @click="modal5 = true">选择服务</Button>


        </FormItem>

      </Form>

    </Modal>
    <!-- 用户评论信息 -->
    <Modal v-model="modal2" title="用户评论信息" :styles="{'z-index':'1',top:'10px'}">
      <Form :model="formRight2" label-position="right" :label-width="100">
        <FormItem label="用户头像">
          <Upload ref="upload" :show-upload-list="false" name="inputFile" :on-success="headHandleSuccess" multiple type="drag" :action="headAction"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="用户名">
          <Input v-model="formRight2.input2"></Input>
        </FormItem>
        <FormItem label="购买的商品规格">
          <Input v-model="formRight2.input3"></Input>
        </FormItem>
        <FormItem label="评论内容">
          <Input v-model="formRight2.input4"></Input>
        </FormItem>
        <FormItem label="评论图片">
          <Upload ref="upload" :show-upload-list="false" name="inputFile" :on-success="connentHandleSuccess" multiple type="drag" :action="connentAction"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="用户评分">
          <Input v-model="formRight2.input6"></Input>
        </FormItem>
        <FormItem label="品质评分">
          <Input v-model="formRight2.input7"></Input>
        </FormItem>
        <FormItem label="物流评分">
          <Input v-model="formRight2.input8"></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- 商品参数信息 -->
    <Modal v-model="modal3" title="商品参数信息" :styles="{'z-index':'1',top:'10px'}">
      <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: '70%'">
        <FormItem v-for="(item, index) in formDynamic.items" v-if="item.status" :key="index" :prop="'items.' + index + '.value'"
          :rules="{required: true, message: '商品参数 ' +' 不能为空', trigger: 'blur'}">
          <Row>
            <Col span="18">
            <Input type="text" v-model="item.value" placeholder="请输入商品参数"></Input>
            </Col>
            <Col span="4" offset="1">
            <Button @click="handleRemove(index)">删除</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="12">
            <Button type="dashed" long @click="handleAdd" icon="md-add">增加项目</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" :disabled="isDisable" @click="handleSubmit(index)">确认</Button>
          <Button @click="handleReset('formDynamic')" style="margin-left: 8px">清空</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 商品规格信息 -->
    <Modal v-model="modal4" title="商品规格信息" :styles="{'z-index':'1',top:'10px'}">
      <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: '70%'">
        <FormItem v-for="(item, index) in formDynamic.items1" v-if="item.status" :key="index" :prop="'items1.' + index + '.value'"
          :rules="{required: true, message: '商品规格 ' +' 不能为空', trigger: 'blur'}">
          <Row>
            <Col span="18">
            <Input type="text" v-model="item.value" placeholder="请输入商品规格"></Input>
            </Col>
            <Col span="4" offset="1">
            <Button @click="handleRemove1(index)">删除</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Row>
            <Col span="12">
            <Button type="dashed" long @click="handleAdd1" icon="md-add">增加项目</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" :disabled="isDisable1" @click="handleSubmit1(index)">确认</Button>
          <Button @click="handleReset1('formDynamic')" style="margin-left: 8px">清空</Button>
        </FormItem>
      </Form>
    </Modal>

    <!-- 服务选择 -->
    <Modal v-model="modal5" title="基础保障" :styles="{'z-index':'1',top:'10px'}">
      <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
        <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
      </div>
      <CheckboxGroup v-model="boonList" @on-change="checkAllGroupChange">
        <p>
          <Checkbox label="正品保证">
            正品保证:
            <Input v-model="formRight6.input1"></Input>
          </Checkbox>
        </p>
        <p>
          <Checkbox label="七天无理由退换">
            七天无理由退换:
            <Input v-model="formRight6.input2"></Input>
          </Checkbox>
        </p>
        <p>
          <Checkbox label="极速退款">
            极速退款:
            <Input v-model="formRight6.input3"></Input>
          </Checkbox>
        </p>
        <p>
          <Checkbox label="材质保真险">
            材质保真险:
            <Input v-model="formRight6.input4"></Input>
          </Checkbox>
        </p>
        <p>
          <Checkbox label="赠运费险">
            赠运费险:
            <Input v-model="formRight6.input5"></Input>
          </Checkbox>
        </p>
      </CheckboxGroup>
    </Modal>
    <!-- 修改商品 -->
    <Modal v-model="modal6" title="修改商品信息" @on-ok="oks" @on-cancel="cancels">
      <Form :model="formRight3" label-position="right" :label-width="100">
        <FormItem label="商品名称">
          <input v-model="formRight3.input0" type="hidden">
          <Input v-model="formRight3.input1"></Input>
        </FormItem>
        <FormItem label="商品图片">
          <Button type="primary" ghost @click="showImg">查看商品图片</Button>
        </FormItem>
        <FormItem>
          <Upload ref="upload" :show-upload-list="false" name="inputFile" :on-success="updateleSuccess" multiple type="drag" :action="updateaction"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
        </FormItem>
        <FormItem label="商品价格">
          <Input v-model="formRight3.input2"></Input>
        </FormItem>
        <FormItem label="商品折扣价格">
          <Input v-model="formRight3.input3"></Input>
        </FormItem>
        <FormItem label="快递费">
          <Input v-model="formRight3.input4"></Input>
        </FormItem>
        <FormItem label="商品地址">
          <Input v-model="formRight3.input5"></Input>
        </FormItem>
        <FormItem label="商品参数">
          <Button type="primary" ghost @click="modal8 = true">修改商品参数</Button>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="modal8" title="商品参数信息" :styles="{'z-index':'1',top:'10px'}" @on-ok="ok1">
      <Form ref="formDynamic" :label-width="80" style="width: '70%'">
        <FormItem :model="formDynamic" v-for="(item,indexs) in paramUpdate">
          <Input :value="item" ref="input"></Input>
        </FormItem>
      </Form>

    </Modal>
    <!-- 删除商品 -->
    <Modal v-model="modal7" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>确认删除</span>
      </p>
      <div style="text-align:center">
        <p>商品信息删除后将不能找回</p>
        <p>是否继续删除?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
      </div>
    </Modal>
    <!-- 增加商品 -->
    <Button type="primary" ghost @click="modal1 = true">增加商品</Button>
    <Input clearable style="width: 200px" v-model="searchStr" search placeholder="请输入商品名" @on-search="searchName" />
    <Button type="primary" ghost @click="searchNull">刷新</Button>
    <Table ellipsis :loading="loading" stripe border :columns="columns" :data="goods"></Table>
    <Page :total='totalAll' :current='current' :page-size='rows' @on-change='pageChange' />
  </div>
</template>

<script>
  import axios from "axios";
  import { ip1 } from "../../static/default_item";
  axios.defaults.withCredentials = true;
  let arrStr = "";
  export default {
    data() {
      return {
        //----------------上传商品轮播图-------------//
        action: ip1 + "/upFiles",
        imgList: [],
        //-----------------修改商品图片-----------------//
        updateaction: ip1 + "/upFiles",
        updateImgList: [],
        //----------------上传用户头像-------------//
        headAction: ip1 + "/headUpfil",
        headList: [],
        //----------------上传评论图片-------------//
        connentAction: ip1 + "/connentUpfil",
        connentList: [],
        //----------------上传商品详情图片-------------//
        infoAction: ip1 + "/infoUpfil",
        infoList: [],
        //-----------------------服务----------------//
        indeterminate: true,
        checkAll: false,
        boonList: [
          "正品保证",
          "七天无理由退换",
          "极速退款",
          "材质保真险",
          "赠运费险"
        ],
        //--------------------------分页---------------------//
        rows: 10,
        current: 1,
        totalAll: 0,
        //--------------------------修改-------------------------//
        updataList: [],
        showImgs: [],
        paramUpdate: [],
        //-----------------------增加商品参数-------------------//
        index: 1,
        index1: 1,

        formDynamic: {
          items: [
            {
              value: "",
              index: 1,
              status: 1
            }
          ],
          items1: [
            {
              value: "",
              index: 1,
              status: 1
            }
          ]
        },
        paramList: [],
        normsList: [],
        indexList: [],
        formRight: {
          input1: "",
          input2: "",
          input3: "",
          input4: "",
          input5: "0",
          input6: ""
        },
        formRight2: {
          input1: "",
          input2: "",
          input3: "",
          input4: "",
          input5: "",
          input6: ""
        },
        formRight3: {
          input0: "",
          input1: "",
          input2: "",
          input3: "",
          input4: "",
          input5: "",
          input6: "",
          input7: "",
          input8: ""
        },
        formRight4: {
          input1: ""
        },
        formRight6: {
          input1: "",
          input2: "",
          input3: "",
          input4: "",
          input5: ""
        },
        loading: true,
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal5: false,
        modal6: false,
        modal7: false,
        modal_loading: false,
        modal8: false,
        isDisable: false,
        isDisable1: false,
        delId: [],
        paranAll: [],
        columns: [
          {
            type: "index",
            width: 60,
            align: "center"
          },
          {
            title: "商品名称",
            key: "name",
            tooltip: true,
            align: "center",
            width: 100,
            render: (h, params) => {
              return h("div", [h("strong", params.row.name)]);
            }
          },
          {
            title: "商品价格",
            key: "price",
            align: "center"
          },
          {
            title: "折后商品价格",
            key: "salePrice",
            align: "center"
          },
          {
            title: "快递费",
            key: "express",
            align: "center"
          },
          {
            title: "月销",
            key: "monthSale",
            align: "center"
          },
          {
            title: "地址",
            key: "adress",
            align: "center"
          },
          {
            title: "操作",
            key: "action",
            width: 170,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.show(params.index);
                      }
                    }
                  },
                  "查看"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        console.log(params);
                        this.modal6 = true;
                        this.formRight3.input0 = params.row._id;
                        this.formRight3.input1 = params.row.name;
                        this.formRight3.input2 = params.row.price;
                        this.formRight3.input3 = params.row.salePrice;
                        this.formRight3.input4 = params.row.express;
                        this.formRight3.input5 = params.row.adress;
                        this.showImgs = [...params.row.img];
                        this.paramUpdate = [...params.row.param];
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        console.log(params);
                        this.remove(params.row._id, params.index);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        goods: [],
        searchStr: ""
      };
    },
    //   computed: {
    //     goodsShow() {
    //       return this.$store.state.goodsInfo.list;
    //     }
    //   },

    //----------------------------------上传商品轮播图---------------------------------------//
    methods: {
      ok1() {
        let arr = [];
        for (let i of this.$refs.input) {
          arr.push(i._data.currentValue);
        }
        this.paranAll = arr;
      },
      handleSuccess(res, file) {
        this.imgList.push(res);
        this.$Message.info({
          content: "图片添加成功",
          duration: 3
        });
      },
      //--------------------------上传用户头像---------------------------------------------//
      headHandleSuccess(res, file) {
        this.headList.push(res);
        this.$Message.info({
          content: "用户头像添加成功",
          duration: 3
        });
      },
      //-------------------------上传评论图片---------------------------------------//
      connentHandleSuccess(res, file) {
        this.connentList.push(res);
        this.$Message.info({
          content: "评论图片添加成功",
          duration: 3
        });
      },
      //-------------------------上传详情图片---------------------------------------//
      infoHandleSuccess(res, file) {
        this.infoList.push(res);
        this.$Message.info({
          content: "详情图片添加成功",
          duration: 3
        });
      },
      //------------------------------增加商品参数---------------------------//
      handleSubmit(item) {
        let arr = this.formDynamic.items.map(item => item.value);
        this.paramList = [...this.paramList, ...arr];
        this.isDisable = true;
      },
      //------清空商品参数值--------//
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      //------增加商品参数---------//
      handleAdd() {
        this.index++;
        this.formDynamic.items.push({
          index: this.index,
          value: "",
          status: 1
        });
      },
      handleRemove(index) {
        console.log(index);
        this.formDynamic.items[index].status = 0;
      },
      //----------------------------------------分页----------------------------------//
      pageChange(value) {
        this.current = value;
        axios
          .post(ip1 + "/goods/goods", { page: this.current, rows: this.rows })
          .then(data => {
            this.goods = [...data.data.rows];
            this.loading = false;
          });
      },
      //-------------------------------------------商品规格---------------------------------//
      handleSubmit1(item) {
        let arr = this.formDynamic.items1.map(item => item.value);
        this.normsList = [...this.normsList, ...arr];
        this.isDisable1 = true;
      },
      //------清空商品参数值--------//
      handleReset1(name) {
        this.$refs[name].resetFields();
      },
      //------增加商品参数---------//
      handleAdd1() {
        this.index1++;
        this.formDynamic.items1.push({
          index: this.index,
          value: "",
          status: 1
        });
      },
      handleRemove1(index) {
        this.formDynamic.items1[index].status = 0;
      },
      //---------------------------------商品服务-----------------------//
      handleCheckAll() {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          this.boonList = [
            "正品保证",
            "七天无理由退换",
            "极速退款",
            "材质保真险",
            "赠运费险"
          ];
        } else {
          this.boonList = [];
        }
      },
      checkAllGroupChange(data) {
        if (data.length === 5) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
      //----------------------------------------------搜索商品--------------------------------//
      searchName() {
        this.loading = true;
        setTimeout(() => {
          axios
            .post(ip1 + "/goods/goods", { name: this.searchStr })
            .then(data => {
              this.goods = [...data.data];
              this.loading = false;
            });
        }, 2000);
      },
      searchNull() {
        this.loading = true;
        this.searchStr = "";
        setTimeout(() => {
          this.goodsAlls();
        }, 1000);
      },
      //----------------------------展示商品信息-------------------------//
      show(index) {
        let str = "";
        for (let i of this.goods[index].img) {
          str += `<img style='width:80px;height:60px;margin-right:20px' src='${ip1}${i}' />`;
        }
        let strs = "";
        for (let o of this.goods[index].param) {
          strs += `<option>${o}</option>`;
        }
        this.$Modal.info({
          title: "商品信息",
          content: `商品名字：${this.goods[index].name}<br>
        商品图片：${str}
        <br>商品价格：${this.goods[index].price}<br>地址：${
            this.goods[index].adress
            }<br>快递费：${this.goods[index].express}<br>月销：${
            this.goods[index].monthSale
            }
        <br>商品参数：<select>
            ${strs}
        </select>
        `
        });
      },
      //-----------------------------------删除商品-----------------------------//
      remove(index, index1) {
        this.modal7 = true;
        this.delId = index;
      },
      del() {
        this.modal_loading = true;
        this.loading = true;
        setTimeout(() => {
          axios.post(ip1 + "/goods/delGoods", { _id: this.delId }).then(data => {
            this.goodsAlls();
            this.loading = false;
            this.$Message.info("商品删除成功");
          });
        }, 1000);

        this.modal_loading = false;
        this.modal7 = false;
      },
      //--------------------------------------修改商品-------------------------------//
      showImg() {
        let strImg = "";
        for (let inx of this.showImgs) {
          strImg += `<img style='width:80px;height:40px;margin-right:20px;' src="${ip1}${inx}" />`;
        }
        this.$Modal.info({
          title: "商品图片信息",
          content: `${strImg} `
        });
      },
      updateleSuccess(res, file) {
        this.updateImgList.push(res);
        this.$Message.info({
          content: "商品图片修改成功",
          duration: 3
        });
      },
      oks() {
        let params = {
          _id: this.formRight3.input0,
          name: this.formRight3.input1,
          price: this.formRight3.input2,
          salePrice: this.formRight3.input3,
          express: this.formRight3.input4,
          adress: this.formRight3.input5,
          img: this.updateImgList,
          param: this.paranAll
        };
        axios.post(ip1 + "/goods/updataGoods", params).then(data => {
          this.goodsAlls();
        });
        this.$Message.info("商品添加成功");
      },
      cancels() {
        this.$Message.info("你已取消修改该商品");
      },
      //-------------------------------确认增加----------------------------------//
      ok() {
        this.isDisable = false;
        this.isDisable1 = false;
        let params = {
          name: this.formRight.input1,
          img: this.imgList,
          price: this.formRight.input2,
          salePrice: this.formRight.input3,
          express: this.formRight.input4,
          monthSale: this.formRight.input5,
          adress: this.formRight.input6,
          shops: this.$store.state.login_info.user._id,
          message: [
            // {
            //   haed: this.headList,
            //   name: this.formRight2.input2,
            //   time: new Date().toLocaleString(),
            //   contentImg: this.connentList,
            //   content: this.formRight2.input4,
            //   userScore: this.formRight2.input6,
            //   goodsScore: this.formRight2.input7,
            //   transitScore: this.formRight2.input8
            // }
          ],
          param: this.paramList,
          norms: this.normsList,
          indexImg: this.imgList[0],
          infoImg: this.infoList,
          boon: [this.boonList]
        };
        if (this.formRight.input1 !== "") {
          axios.post(ip1 + "/goods/addGoods", params).then(data => {
            console.log(data.data)
            
            this.$Message.info("商品添加成功");
            this.formRight.input1 = "";
            this.formRight.input2 = "";
            this.formRight.input3 = "";
            this.formRight.input4 = "";
            this.formRight.input6 = "";
            this.formRight2.input2 = "";
            this.formRight2.input4 = "";
            this.formRight2.input6 = "";
            this.formRight2.input7 = "";
            this.formRight2.input8 = "";
            this.imgList.length = 0;
            this.infoList.length = 0;
            this.formDynamic.items.length = 0;
            this.paramList.length = 0;
            this.formDynamic.items1.length = 0;
            this.normsList.length = 0;
            this.goodsAlls();
          });
        }

        //------------------------------------------状态机-------------------------//
        //   this.$store.commit({
        //     type: "goodsList",
        //     val: {
        //       name: this.formRight.input1,
        //       price: this.formRight.input2,
        //       salePrice: this.formRight.input3,
        //       express: this.formRight.input4,
        //       monthSale: this.formRight.input5,
        //       adress: this.formRight.input6
        //     }
        //   });
        //   console.log(this.goodsShow);
      },
      cancel() {
        this.formRight.input1 = "";
        this.formRight.input2 = "";
        this.formRight.input3 = "";
        this.formRight.input4 = "";
        this.formRight.input6 = "";
        this.formRight2.input2 = "";
        this.formRight2.input4 = "";
        this.formRight2.input6 = "";
        this.formRight2.input7 = "";
        this.formRight2.input8 = "";
        this.imgList.length = 0;
        this.infoList.length = 0;
        this.formDynamic.items.length = 0;
        this.paramList.length = 0;
        this.formDynamic.items1.length = 0;
        this.normsList.length = 0;
        this.$Message.info("你已取消添加商品");
      },
      goodsAlls() {
        setTimeout(() => {
          axios
            .post(ip1 + "/goods/goods", {
              shops: this.$store.state.login_info.user._id,
              page: 1,
              rows: 10
            })
            .then(data => {
              this.goods = [...data.data.rows];
              this.loading = false;
              this.totalAll = data.data.total;
            });
        }, 1000);
      }
    },
    beforeMount: function () {
      this.goodsAlls();
    }
  };
</script>

<style scoped>
</style>