<template>
    <div class="outer_view">
        <div class="marginB" style="display:flex">
            <Input v-model="value" style="width:400px">
                <Select v-model="select" slot="prepend" style="width: 80px">
                    <Option value="order">订单号</Option>
                    <Option value="goods">商品名</Option>
                </Select>
                <Button slot="append" icon="ios-search" @click="search"></Button>
            </Input>
            <div style="margin-left:5px;">
                <Button size="default"  @click="upView">刷新</Button>            
            </div>
        </div>
        <Table highlight-row stripe border ref="currentRowTable" :columns="columns" :data="data1" :loading="loading"></Table>
        <div>
            <Modal v-model="modal" title="修改" @on-ok="ok" @on-cancel="cancel">
                <table class="textC">
                    <tr>
                        <td><label>收件人：</label></td>
                        <td>
                            <Input v-model="addressee" placeholder="收件人" clearable style="width: 250px" /></td>
                    </tr>
                    <tr>
                        <td><label>联系电话：</label></td>
                        <td>
                            <Input v-model="phone" placeholder="联系电话" clearable style="width: 250px" /></td>
                    </tr>
                    <tr>
                        <td><label>收货地址：</label></td>
                        <td>
                            <Input v-model="address" placeholder="收货地址" clearable style="width: 250px" /></td>
                    </tr>
                    <tr>
                        <td><label>商品价格/元：</label></td>
                        <td>
                            <Input v-model="goodsPrice" placeholder="商品价格" clearable style="width: 250px" /></td>
                    </tr>
                    <tr>
                        <td><label>商品数量/个：</label></td>
                        <td>
                            <Input v-model="goodsNum" placeholder="商品数量" clearable style="width: 250px" /></td>
                    </tr>
                    <tr>
                        <td><label>运费/元：</label></td>
                        <td>
                            <Input v-model="freight" placeholder="运费" clearable style="width: 250px" /></td>
                    </tr>

                </table>
            </Modal>
        </div>

        <div>
            <Modal v-model="modal2" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>删除</span>
                </p>
                <div style="text-align:center">
                    <p>确认删除?</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
                </div>
            </Modal>
        </div>

        <div class="total_view">
            <Page :total="total" @on-change='changePage' />
        </div>

        <div>
            <Modal v-model="modal3" width="360"  title="发送群体消息"  @on-ok="ok1" @on-cancel="cancel1">
                <textarea name="" id="" cols="40" rows="3" v-model='modal4'></textarea>
            </Modal>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { ip1 } from "../../static/default_item.js";
    import shops_order_expand from "./shops_order_expand.vue";
    import Vue from "vue";

    export default {
        components: {},
        data() {
            return {
                columns: [
                    {
                        type: "expand",
                        width: 60,
                        align: "center",
                        render: (h, params) => {
                            return h(shops_order_expand, {
                                props: {
                                    row: params.row
                                }
                            });
                        }
                    },
                    {
                        type: "index",
                        width: 70,
                        align: "center"
                    },
                    {
                        title: "收件人",
                        key: "addressee",
                        align: "center"
                    },
                    {
                        title: "联系电话",
                        key: "phone",
                        align: "center"
                    },
                    {
                        title: "收货地址",
                        key: "address",
                        width: 260,
                        align: "center"
                    },
                    {
                        title: "商品图",
                        key: "goodsImg",
                        align: "center",
                        render: (h, params) => {
                            return h("img", {
                                attrs: {
                                    src: ip1 + params.row.goodsImg
                                },
                                style: {
                                    width: "60px",
                                    height: "70px"
                                }
                            });
                        }
                    },
                    {
                        title: "商品名称",
                        key: "goodsName",
                        align: "center"
                    },
                    {
                        title: "商品价格",
                        key: "goodsPrice",
                        align: "center"
                    },
                    {
                        title: "商品数量",
                        key: "goodsNum",
                        align: "center"
                    },
                    {
                        title: "运费",
                        key: "freight",
                        align: "center"
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width: 200,
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
                                                
                                                if (params.row.state == "未发货") {
                                                    this.id = params.row._id;
                                                    this.addressee = params.row.addressee;
                                                    this.phone = params.row.phone;
                                                    this.goodsName = params.row.goodsName;
                                                    this.address = params.row.address;
                                                    this.goodsNum = params.row.goodsNum;
                                                    this.goodsPrice = params.row.goodsPrice;
                                                    this.freight = params.row.freight;
                                                    this.modal = true;
                                                } else {

                                                    this.$Message.error("只能对未发货的订单进行修改哦");
                                                }
                                            }
                                        }
                                    },
                                    "修改"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "success",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.userId = [params.row.userId]
                                                this.id1 = params.row._id;
                                               this.modal3 = true;
                                            }
                                        }
                                    },
                                    "发送"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                if (params.row.state == "未发货") {
                                                    this.ids = params.row._id;
                                                    this.modal2 = true;
                                                } else {
                                                    this.$Message.error("只能对未发货的订单进行删除哦");
                                                }
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    }
                ],
                data1: [],
                modal: false,
                modal2: false,
                modal_loading: false,
                total: 0,
                page: "",
                id: "",
                modal1: "",
                addressee: "",
                phone: "",
                address: "",
                goodsName: "",
                goodsPrice: "",
                goodsNum: "",
                freight: "",
                ids: "",
                loading: true,
                value: '',
                select: 'order',
                viewState: true,
                modal3:false,
                modal4:'',
                id1:'',
                userId:[],
                id2:''
            };
        },
        methods: {
            update(index) {
                console.log(index);
            },
            ok() {
                let param = {
                    _id: this.id,
                    phone: this.phone,
                    address: this.address,
                    addressee: this.addressee,
                    goodsName: this.goodsName,
                    goodsPrice: this.goodsPrice,
                    goodsNum: this.goodsNum,
                    freight: this.freight
                };
                axios.post(ip1 + "/shops_order/update_order", param).then(msg => {
                    this.$Message.success("修改成功");
                    this.view_axios(this.page);
                });
            },
            cancel() {
                this.$Message.success("取消成功");
            },
            ok1(){
                let date = new Date().toLocaleString();
                let parem={
                    sendPeople:this.id2,
                    content:this.modal4,
                    time:date,
                    acceptPeople:JSON.stringify(this.userId)
                }
                console.log(parem)
               axios.post(ip1+"/shops_order/add_messages",parem).then(msg=>{
                   this.$Message.success("发送成功");
                   this.modal4='';
               })
            },
            cancel1(){
                this.$Message.success("取消成功");
                this.modal4='';
            },
            del() {
                this.modal_loading = true;
                axios
                    .post(ip1 + "/shops_order/del_order", {
                        _id: this.ids
                    })
                    .then(msg => {

                        this.modal_loading = false;
                        this.modal2 = false;
                        this.$Message.success("删除成功");
                        this.view_axios(this.page);

                    });
            },
            upView(){
                this.value='';
                this.view_axios(1);
            },
            view_axios(page = 1, val) {
                axios
                    .post(ip1 + "/shops_order/find_order", { page, rows: 10, val })
                    .then(msg => {
                        for (let i = 0; i < msg.data.rows.length; i++) {
                            if (msg.data.rows[i].state == "0") {
                                msg.data.rows[i].state = "未发货";
                            } else if (msg.data.rows[i].state == "1") {
                                msg.data.rows[i].state = "已发货";
                            } else {
                                msg.data.rows[i].state = "已收货";
                            }
                        }
                        this.loading = true
                        setTimeout(() => {
                            this.loading = false
                            this.total = msg.data.total;
                            this.data1 = msg.data.rows;
                        }, 800)
                    });
            },
            changePage(page) {
                this.page = page;
                if (this.viewState) {
                    this.view_axios(page);
                } else {
                    axios.post(ip1 + '/shops_order/search_order', { goodsName: this.value, page: this.page, rows: 10 }).then((msg) => {
                        if (msg.data.length !== 0) {
                            for (let i = 0; i < msg.data.rows.length; i++) {
                            if (msg.data.rows[i].state == "0") {
                                msg.data.rows[i].state = "未发货";
                            } else if (msg.data.rows[i].state == "1") {
                                msg.data.rows[i].state = "已发货";
                            } else {
                                msg.data.rows[i].state = "已收货";
                            }
                        }
                        this.loading = true;
                        setTimeout(() => {
                            this.loading = false
                            this.total = msg.data.total;
                            this.data1 = msg.data.rows;
                        }, 800)
                        }
                    });
                }

            },
            search() {
                switch (this.select) {
                    case 'order': {
                        axios.post(ip1 + '/shops_order/search_order', { _id: this.value }).then((msg) => {
                            if (typeof msg.data !== 'string') {
                                this.data1 = [msg.data]
                            }else{
                                this.$Message.error("请输入正确的订单号");
                            }
                        });
                        break;
                    }
                    case 'goods': {
                        this.viewState = false
                        this.changePage()
                        break;
                    }
                }
            }
        },
        beforeMount() {
            this.view_axios(1);
            this.id2 = this.$store.state.login_info.user._id
            console.log(this.$store.state.login_info.user._id)
        }
    };
</script>

<style scoped>
    .marginB {
        /* margin-bottom: 20px; */
    }

    .textC {
        margin: 0 auto;
    }

    .total_view {
        margin-top: 20px;
    }
</style>