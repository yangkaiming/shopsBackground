<template>
    <Tabs value="name1">
        <TabPane label="群发编辑" name="name1">
            <p style="margin:30px ">
                <span class="note">*</span> 群发对象默认为关注本店铺所有用户 </p>
            <div id="div" style="margin-left:30px">
                <span style="line-height: 30px">区域：</span>
                <Select v-model="areaValue" style="width:120px" @on-change='slected'>
                    <Option v-for="item in data" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div style="margin-left:30px"> 标题：
                <Input v-model="titleValue" placeholder="标题" style="width: 500px" /> </div>
            <div style="margin:20px 0 0 30px"> 内容：
                <Input v-model="connentValue" type="textarea" :rows="4" placeholder="内容" style="width: 500px" />
            </div>
            <div style="margin:20px 0 0 70px">
                <!-- <Button @click="preview" style="margin-right:5px">预览</Button> -->
                <Button type="info" @click="sendInfo">发送</Button>
            </div>
        </TabPane>

        <TabPane :label="label" name="name2">
            <Table border stripe ellipsis :columns="columns7" :data="tabelData"></Table>
            <Page :total="total" :current="page" :page-size="rows" @on-change="handlePage" />
        </TabPane>

    </Tabs>
</template>
<script>
    import axios from "axios";
    import { ip1 } from "../../static/default_item.js";
    export default {
        data() {
            return {
                label: (h) => {
                    return h('div', [
                        h('span', '群发列表'),
                        h('Badge', {
                            props: {
                                count: this.num
                            },
                            // on: {
                            //     "on-click": () => {
                            //         // console.log(this)
                            //     }
                            // }
                        })

                    ])
                },
                columns7: [{
                    type: 'index',
                    width: 60,
                    align: 'center'
                }, {
                    title: '标题',
                    align: 'center',
                    key: 'head'
                },
                {
                    title: '内容',
                    align: 'center',
                    key: 'content'
                },
                {
                    title: '时间',
                    align: 'center',
                    key: 'time'
                },
                {
                    title: '群发对象',
                    align: 'center',
                    key: 'area'
                }
                ],
                data: [{
                    value: '四川',
                    label: '四川',
                }, {
                    value: '江苏',
                    label: '江苏'
                }, {
                    value: '浙江',
                    label: '浙江'
                }],
                // num: 0,
                titleValue: '',
                connentValue: '',
                page: 1,        //当前页数
                rows: 10,       //当前条数
                tabelData: [],
                total: 0,
                users: [],
                areaValue: '',
            }
        },
        methods: {
            // 级联选择
            slected() {
                axios.post(ip1 + "/manage_message/findUserData", { area: this.areaValue }).then((msg) => {
                    console.log(msg.data);
                    msg.data.map((o) => {                //  o 表示每条状态
                        return this.users.push(o._id)
                    })
                })
            },
            // 点击发送时触发
            sendInfo() {

                // let time = new Date().toLocaleString().replace(/[上午下]/g, '');         //当前的时间
                let time = new Date().toLocaleString();         //当前的时间
                let acceptPeople = [];
                let params = {
                    sendPeople: this.$store.state.login_info.user._id,
                    head: this.titleValue,
                    content: this.connentValue,
                    time: time,
                    area: this.areaValue + "用户",
                    acceptPeople: JSON.stringify(this.users),
                }
                this.tabelData.push(params);
                axios.post(ip1 + "/manage_message/addMessageData", params).then((msg) => {
                    // console.log(params);
                    this.$Message.success('发送成功');
                });
                this.titleValue = '';
                this.connentValue = '';
                this.areaValue = '';

            },
            // preview() {
            //     console.log('预览');

            // },
            // 已发送的分页共功能
            handlePage(value) {            //value是当前的页数
                this.page = value;
                axios.post(ip1 + "/manage_message/findMessageData", { page: this.page, rows: this.rows }).then((msg) => {
                    this.tabelData = [...msg.data.rows];
                })
            },
        },
        beforeMount: function () {
            axios.post(ip1 + "/manage_message/findMessageData", { page: this.page, rows: this.rows,sendPeople:this.$store.state.login_info.user._id}).then((msg) => {
                this.tabelData = [...msg.data.rows];
                this.total = msg.data.total;
            })
        }
    }
</script>
<style scoped>
    #div {
        display: flex;
        margin: 20px 0;
    }

    .note {
        color: #ed4014;
    }
</style>