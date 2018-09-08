<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Header class="logo_img">
                <img src="../../static/images/pin.png" alt="">
                <p class="head_name">admin
                    <span @click="logout">退出登录</span>
                </p>
            </Header>
            <Layout>
                <Sider ref="side1" hide-trigger :style="{background: '#fff'}" collapsible :collapsed-width="78" v-model="isCollapsed">
                    <Menu active-name="1-0" theme="light" width="auto" :class="menuitemClasses">
                        <router-link to="/main/manage_shops">
                            <MenuItem name="1-1">
                            <Icon type="ios-navigate"></Icon>
                            <span>商铺管理 </span>
                            </MenuItem>
                        </router-link>
                        <router-link to="/main/manage_apply">
                            <MenuItem name="1-2">
                            <Icon type="ios-search"></Icon>
                            <span>申请开业</span>
                            </MenuItem>
                        </router-link>
                        <router-link to="/main/manage_message">
                            <MenuItem name="1-3">
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
                isCollapsed: false
            }
        },
        components: {

        },
        computed: {
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
        /* background: #d12129; */
        background: #f5eaeb;
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

    .logo_img {
        background: rgb(50, 49, 65);
        height: 80px;
    }

    .logo_img>img {
        height: 30px;
        display: inline-block;
        margin-top: 20px;
    }

    .head_name {
        float: right;
        color: white;
        font-size: 18px;
        margin-right: 50px;
        margin-top: 20px;
    }

    .head_name>span {
        color: rgb(194, 187, 187);
        font-size: 12px;
        cursor: pointer;
        padding-left: 10px;

    }

    a {
        color: #515a6e;
        font-size: 30px !important;
    }
</style>