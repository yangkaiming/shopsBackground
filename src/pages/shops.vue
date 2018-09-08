<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Header :style="{background: '#d12129',height:'80px'}" class="logo_img">
                <img src="../../static/images/logo.png" alt="">
                <p class="head_name">{{user}}
                    <span @click="logout">退出登录</span>
                </p>
            </Header>
            <Layout>
                <Sider ref="side1" hide-trigger :style="{background: '#fff' }" width=242 collapsible :collapsed-width="78" v-model="isCollapsed">
                    <Menu active-name="1-0" theme="light" width="auto" :class="menuitemClasses" @on-select="change_index">
                        <router-link to="/main/shops_details">
                            <MenuItem name="1-1">
                            <Icon type="ios-navigate"></Icon>
                            <span> 商铺信息</span>
                            </MenuItem>
                        </router-link>
                        <router-link to="/main/shops_goods">
                            <MenuItem name="1-2">
                            <Icon type="ios-search"></Icon>
                            <span>商品列表</span>
                            </MenuItem>
                        </router-link>
                        <router-link to="/main/shops_order">
                            <MenuItem name="1-3">
                            <Icon type="ios-settings"></Icon>
                            <span>订单管理</span>
                            </MenuItem>
                        </router-link>
                        <router-link to="/main/shops_coupon">
                            <MenuItem name="1-4">
                            <Icon type="ios-settings"></Icon>
                            <span>优惠券</span>
                            </MenuItem>
                        </router-link>
                        <router-link to="/main/shops_message">
                            <MenuItem name="1-5">
                            <Icon type="md-text" />
                            <span>推送消息</span>
                            </MenuItem>
                        </router-link>
                    </Menu>
                </Sider>
                <Layout>
                    <Header :style="{padding: 0}" class="layout-header-bar">
                        <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                    </Header>
                    <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                        <router-view></router-view>
                        <div v-if="iSIndex" class="index_img">
                            <img src="../../static/images/index.png" style="width: 30%" alt="">
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import axios from 'axios'
    import { ip1 } from '../../static/default_item.js'
    axios.defaults.withCredentials = true
    export default {
        data() {
            return {
                isCollapsed: false,
                iSIndex: true

            }
        },
        beforeMount() {

        },
        computed: {
            user() {
                return this.$store.state.login_info.user.name
            },

            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            // 注销
            logout() {
                this.$store.commit("save_login", {})
                // axios.post(ip1+"/logout")
                this.$router.push('/login')
            },
            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },
            // 通过选择事件   将首页关闭
            change_index(name) {
                this.iSIndex = false;
            }
        }

    }
</script>





<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        /* height: 100%; */
    }

    .layout-header-bar {
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #d12129;
        border-radius: 3px;
        margin: 15px auto;
    }

    .menu-icon {
        transition: all .3s;
    }

    .rotate-icon {
        transform: rotate(-90deg);
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    a {
        color: #515a6e;
        font-size: 30px !important;
    }

    .ivu-menu-item:hover {
        color: red;
    }

   

    .logo_img>img {
        height: 80px;
       
    }

    .head_name {
        float: right;
        color: white;
        font-size: 16px;
        margin-right: 0px;
        margin-top: 20px;
    }

    .head_name>span {
        color: rgb(194, 187, 187);
        font-size: 12px;
        cursor: pointer;
        padding-left: 10px;

    }

    .index_img {
        text-align: center;
        margin-top: 6%;
    }

    .ivu-menu-item-active,
    .ivu-menu-item-selected {
        color: red !important;
        background: #f5eaeb !important;
    }

    .ivu-menu-item-active:not(.ivu-menu-submenu):after {
        background: #d12129 !important;
    }
</style>