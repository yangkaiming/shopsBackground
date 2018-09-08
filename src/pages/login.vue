<template>
    <div class="login_container" >
         <img src="../../static/images/index.png" alt="">
        <div   class="login_page">
            <div class="logo_login">

                    <img src="../../static/images/andim1.png" alt="">
            </div>
            
            <Form ref="formInline" :model="formInline" :rules="ruleInline" style="width: 300px" class="login_form">
                <div class="select_login">
                    <span :class="login_type?'select_type':''" @click="select_login(true)" class="admin_sd">管理员登录</span>
                    <span :class="login_type?'':'select_type'" @click="select_login(false)">商家登录</span>
                </div>
                <FormItem prop="uname">
                    <Input type="text" v-model="formInline.uname" :placeholder="login_type?'管理员账号':'商家账号'">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="pwd">
                    <Input type="password" v-model="formInline.pwd" placeholder="密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="error" @click="handleSubmit" style="width: 100% ;font-size: 16px"  >登录</Button>
                </FormItem>
                <router-link to="/reg" style="float: left;"  v-if="!login_type">
                    申请开店
                </router-link>
            </Form>

        </div>
    </div>


    </div>
</template>

<script>
    import axios from 'axios'
    import { ip1 } from '../../static/default_item.js';
    axios.defaults.withCredentials = true
    export default {
        name: 'login',
        data() {
            return {
                login_type: true,
                formInline: {
                    uname: '',
                    pwd: ''
                },
                ruleInline: {
                    uname: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 3, message: '密码必须大于六位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit() {
                console.log(this.formInline)
                if (this.login_type) {
                    axios.post(ip1 + '/login_andim', this.formInline).then(res => {
                        if (res.data.length > 0) {
                            this.$Message.success('登录成功!');
                            this.$router.push('./main')
                            this.$store.commit("save_login",res.data[0])
                        }
                        else
                            this.$Message.error('账号或密码有误');
                    })
                } else {
                    axios.post(ip1 + '/login_shops', this.formInline).then(res => {
                        if (res.data.length > 0) {
                            this.$Message.success('登录成功!');
                            this.$router.push('./main')
                            this.$store.commit("save_login",res.data[0])
                        }
                        else
                            this.$Message.error('账号或密码有误');
                    })
            

            }

},
        select_login(bool) {
            console.log(this.login_type)
            this.login_type = bool;
        }
    },
   

    }
</script>
<style>
   
   .login_form {
       text-align: center;
       margin: 0 auto;
   }

    .login_form input {
        
        height: 40px;
        /* color: white; */
    }

    .select_login {
        margin-bottom: 40px;
    }

    .select_login>span {
        display: inline-block;
        width: 49%;
        text-align: center;
        font-size: 15px;
        color: #797474;
        padding-bottom: 5px;
        cursor: pointer;
    }

    .select_type {
        border-bottom: 2px solid #ed4014 ;

    }

    .login_page {
        width: 400px;
        height: 410px;
        background:white;
        border: 1px solid #cdcdcd ;
        padding: 20px 20px;
        border-radius: 10px;
    }
  
    .login_container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 60%;
        margin: 0 auto 0; 
        padding-top: 10%;
    }

    .logo_login{
      
        margin: 10px auto 20px;
        border-bottom: 1px solid #ebe8e8;
        padding-bottom: 20px;
    }
</style>