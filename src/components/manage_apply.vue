<template>
    <div>
        <div>
            <Input search placeholder="请输入店铺名称..." v-model="searchContent" @on-search="handleSearch" style="width:300px"></Input>
            <Button style="margin-left:5px" @click="freshen">刷新</Button>
        </div>
        <Table border :columns="columns" :data="shopsApplyData"></Table>
        <Page :total="total" :current='page' :page-size="rows" @on-change="handleCurrentChange"></Page>
    </div>
</template>
<script>
    import Axios from 'axios';
    import { ip1 } from '../../static/default_item.js';
    export default {
        data() {
            return {
                searchContent: '',  // 当前搜索内容
                select: '',
                stripe: true,  // stripe 是否显示间隔斑马纹
                // loading: true,
                columns: [       // columns	表格列的配置描述，具体项见后文
                    // {
                    //     type: 'index',
                    //     title: '序号',
                    //     key: 'num',
                    //     align: 'center',
                    // },
                    {
                        title: '店铺ID',
                        key: '_id',
                        align: 'center',
                    },
                    {
                        title: '店铺名称',
                        key: 'name',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '店铺LOGO',
                        key: 'logo',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: ip1 + params.row.logo,

                                    },
                                    style: {
                                        width: "40px",
                                        height: "40px",
                                        marginTop: '5px'
                                    },
                                }),
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'state',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.agree(params.index)
                                        }
                                    }
                                }, '同意'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                    },
                                    on: {
                                        click: () => {
                                            this.refuse(params.index)
                                        }
                                    }
                                }, '拒绝')
                            ]);
                        }
                    }

                ],
                shopsApplyData: [],
                page: 1,
                rows: 10,
                total: 0,    // 初始化信息总条数
            }
        },
        methods: {
            // -------------------------------------------  封装Axios得到初始化数据  --------------------------------------------------------------//
            getShopsData() {
                Axios.post(ip1 + '/manage_apply/getShopsData', { page: this.page, rows: this.rows, isApply: 'true', name: this.searchContent }).then((msg) => {
                    this.total = msg.data.total;
                    this.shopsApplyData = [...msg.data.rows];
                })
            },
            //  -------------------------------------------  点击同意时改变isOpen的状态为true;isApply的状态为false ------------------------------------//
            agree(index) {
                if (this.shopsApplyData[index].isOpen == 'true' || this.shopsApplyData[index].isApply == 'false') {
                    this.shopsApplyData[index].isOpen = 'false';
                    this.shopsApplyData[index].isApply = 'true';
                    this.updateFeedbackMessage(this.shopsApplyData[index]._id, index, this.shopsApplyData[index].isOpen, this.shopsApplyData[index].isApply);
                    this.shopsApplyData.splice(index, 1);
                    this.getShopsData();
                } else {
                    this.updateFeedbackMessage(this.shopsApplyData[index]._id, index, 'true', 'false');
                    this.getShopsData();
                }
                this.$Message.success('已同意申请');
            },
            // // 更新反馈信息某一字段
            updateFeedbackMessage(id, index, isOpen, isApply) {
                console.log(id, index, isOpen, isApply);
                Axios.post(ip1 + '/manage_apply/updateShopsData', { _id: id, isOpen: isOpen, isApply: isApply }).then((msg) => {
                })
            },
            //  -------------------------------------------  点击拒绝改变isApply的状态为false ------------------------------------//
            refuse(index) {
                if (this.shopsApplyData[index].isApply == 'true') {
                    this.shopsApplyData[index].isApply = 'false';
                    this.update(this.shopsApplyData[index]._id, index, this.shopsApplyData[index].isApply);
                    this.shopsApplyData.splice(index, 1);
                    this.getShopsData();
                } else {
                    this.update(this.shopsApplyData[index]._id, index, 'false', );
                    this.getShopsData();
                }
                this.$Message.warning('已拒绝申请');
            },
            // // 更新反馈信息某一字段
            update(id, key, isApply) {
                Axios.post(ip1 + '/manage_apply/updateShopsData', { _id: id, isApply: isApply }).then((msg) => {

                })
            },
            //  -------------------------------------------  搜索 ------------------------------------//
            handleSearch() {
                Axios.post(ip1 + '/manage_apply/getShopsData', { page: this.page, rows: this.rows, name: this.searchContent, isApply: "true" }).then((msg) => {
                    this.total = msg.data.total;
                    this.shopsApplyData = [...msg.data.rows];
                })
            },
            freshen() {
                this.searchContent = '';
                this.getShopsData();
            },
            //  -------------------------------------------  分页 ------------------------------------//
            handleCurrentChange(val) {     //val当前页数
                this.page = val;
                this.searchContent = '';
                Axios.post(ip1 + '/manage_apply/getShopsData', { page: this.page, rows: this.rows, isApply: 'true', name: this.searchContent }).then((msg) => {
                    this.shopsApplyData = [...msg.data.rows];
                })
                // this.getShopsData(val);
            },
        },
        //  -------------------------------------------  初始化表格数据 ------------------------------------//
        beforeMount() {
            this.getShopsData();
        },
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>