<template>
    <div>
        <p>
    <!-- //增加按钮 -->
     <Button type="primary" style=" margin-top:20px" @click="modal1 = true">增加优惠卷</Button>
    <!-- //搜索框 -->
    <!-- <Input  search style= "width:400px" v-model="searchStr" placeholder="搜索信息" @on-search="searchName" /> -->
        </p>
  
   <!-- //表格 -->
      <Table highlight-row  ref="currentRowTable" :columns="columns3" :data="list"></Table>
    <Modal
        v-model="modal1"
        title="新增优惠卷"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="formLeft" label-position="left" :label-width="100">
                <FormItem label="满减金额">
                    <Input v-model="formLeft.input1"  placeholder="金额不能为空"> </Input>
                </FormItem>
                <FormItem label="减多少">
                    <Input v-model="formLeft.input2" placeholder="金额不能为空"> </Input>
                </FormItem>
                <FormItem label="有效期">
                    <!-- <Input v-model="formLeft.input3" placeholder="有效期不能为空"> </Input> -->
                     <Row>                 
                  <Col span="12">
                      <DatePicker type="daterange" v-model="formLeft.input3" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
                  </Col>
                 </Row>
                </FormItem>
               


        </Form>
    </Modal>

     <Modal
        v-model="modal2"
        title="修改优惠卷"
        @on-ok="ok1"
         @on-cancel="cancel2"> 
        <Form :model="revise" label-position="left" :label-width="100">
                <FormItem label="满减金额">
                    <Input v-model="reach"  placeholder="金额不能为空"> </Input>
                      <!-- <Input v-model="xiugai.input1" type = "hidden"> </Input> -->
                </FormItem>
                <FormItem label="减多少">
                    <Input v-model="zxc" placeholder="金额不能为空"> </Input>
                      <!-- <Input v-model="xiugai.input1" type = "hidden"> </Input> -->
                </FormItem>
                  <FormItem label="有效期"> 
                    <!-- <Input v-model="formLeft.input3" placeholder="有效期不能为空"> </Input> -->
                      <Row>                 
                  <Col span="12">
                      <DatePicker type="daterange" v-model="time" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
                  </Col>
                 </Row>

                  
                </FormItem> 



        </Form>
    </Modal>
    <Page style=" margin-top:20px" :total="total" @on-change='changePage'/>

    </div>
</template>
      <script>
//----------------------------------  获取axios 和 IP  --------------------------//
import axios from "axios";
import { ip1 } from "../../static/default_item.js";
//  let arrStr = '',
export default {
  data() {
    return {
      list: [],
      searchStr: "",
      page: 2,
      rows: 8,
      reach: "",
      zxc: "",
      ids: "",
      time: "",
      discount: "",
      total:0,
      //---------- 增加里边的输入框 ---------//
      formLeft: {
        input1: "",
        input2: "",
        input3: ""
      },
      modal1: false,
      //---------- 修改里边的输入框 ---------//
      revise: {
        input1: "",
        input2: "",
        input3: ""
      },
      modal2: false,
      //---------  参数部分 --------------//
      columns3: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "满多少金额使用",
          key: "reach"
          // width: 100
        },
        {
          title: "减多少金额",
          key: "discount"
          // width: 100
        },
        {
          title: "有效期",
          key: "time"
          // width: 100
        },
        //---------------删除和修改按钮 -------------//
        {
          title: "操作",
          key: "action",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              //----------------------------------  删除  --------------------------//
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style:{
                  marginRight:'10px'
                  },

                  on: {
                    click: () => {
                      console.log("本条信息", params.row);
                      console.log(params.row._id);
                      axios
                        .post(ip1 + "/rou/delCoupon", { _id: params.row._id })
                        .then(data => {
                          this.axios_view();
                          this.$Message.info("删除成功");
                        });
                    }
                  }
                },
                "删除"
              ),
              //----------------------------------  修改  --------------------------//
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
                      this.reach = params.row.reach;
                      this.zxc = params.row.discount;
                      this.ids = params.row._id;
                      this.time = params.row.time;

                      this.modal2 = true;
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    //----------------------------------  增加  --------------------------//
    ok() {
      let param = {
        reach: this.formLeft.input1,
        discount: this.formLeft.input2,
        time: this.formLeft.input3.toLocaleString(),
        shopsId:this.$store.state.login_info.user._id
      };
      //  time : new Date ().toLocaleString(),

      axios.post(ip1 + "/rou/addCoupon", param).then(msg => {
        this.axios_view();
      });
      this.$Message.info("新增成功");

      (this.formLeft.input1 = ""),
        (this.formLeft.input2 = ""),
        (this.formLeft.input3 = "");
    },
    cancel() {},
    //----------------------------------  展示  --------------------------//
    show(index) {
      this.$Modal.info({
        title: "优惠卷信息",
        content: `
                    <br>满多少金额：${this.list[index].reach}
                    <br>减多少金额：${this.list[index].discount}
                    <br>有效期：${this.list[index].time}`
      });
      axios
        .post(ip1 + "/rou/show", { _id: index, page: 1, rows: 8 })
        .then(function(msg) {});
    },

    //----------------------------------  修改  --------------------------//
    ok1() {
      let param = {
        _id: this.ids,
        reach: this.reach,
        discount: this.zxc,
        time: this.time.toLocaleString()
      };
      console.log(param);
      axios.post(ip1 + "/rou/updateCoupon", param).then(data => {
        this.$Message.info("修改成功");
        this.axios_view();
      });
    },
    cancel2() {
      this.$Message.info("取消成功");
    },

    //----------------------------------  搜索 --------------------------//
    // searchName() {
    //   let param = {
    //     reach: this.formLeft.input1,
    //     discount: this.formLeft.input2,
    //     time: this.formLeft.input3
    //   };  
    //   axios.post(ip1 + "/rou/find", param).then(data => {
    //     this.list = data.data;
    //   });
    // },
    //---------------------------  分页--------------------------------//
    axios_view(page = 1) {
      axios.post(ip1 + "/rou/show", { page, rows: 10 ,shopsId:this.$store.state.login_info.user._id}).then(data => {
        // this.list = data.data
        console.log(data.data)
        this.total = data.data.total;
        this.list = data.data.rows;
      });
    },
    changePage(page){
      this.axios_view(page)
    }
  },
  beforeMount() {

    this.axios_view()
    // axios.post(ip1 + "/rou/show", {}).then(data => {
    //   this.list = data.data;
    //   // console.log(data.data);
    // });
  }
};
</script>
<style>
</style>

