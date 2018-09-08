<template>
    <div class="reg_container">
        <div class="logo">
            <img src="../../static/images/logo.png" alt="">
        </div>
        <div class="reg_step">
            <Steps :current="current" style="margin-left:13%">
                <Step title="身份信息"></Step>
                <Step title="商铺信息"></Step>
                <Step title="入驻成功"></Step>

            </Steps>

        </div>
        <div class="account_pwd">
             <!--================================第一步========================================== -->
            <div class="username_pwd" v-if="current==0">
                <p>
                    <span>1</span> 商铺账号注册</p>
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="font-size: 18px">
                    <FormItem label="账号:" prop="uname">
                        <Input v-model="formValidate.uname" placeholder="请输入账号"></Input>
                    </FormItem>
                    <FormItem label="密码:" prop="pwd">
                        <Input v-model="formValidate.pwd" type="password" placeholder="请输入密码"></Input>
                    </FormItem>

                </Form>
            </div>
             <!--================================第二步========================================== -->
            <div class="username_pwd" v-else-if="current==1">
                    <p>
                        <span>2 </span> 商铺详细信息</p>
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="商铺名" prop="name">
                            <Input v-model="formValidate.name" ></Input>
                        </FormItem>
                         <!--================================背景图上传========================================== -->
                        <FormItem label="商铺大图:" >
                                <div class="demo-upload-list" v-for="item in backList">
                                        <template v-if="item.status === 'finished'">
                                            <img :src="item.url"/>
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                                <Icon type="ios-trash-outline" @click.native="backRemove(item)"></Icon>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                        </template>
                                    </div>
                                    <Upload
                                        ref="upload"
                                        :show-upload-list="true"
                                        :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="2048"
                                        :default-file-list="defaultback"
                                        :before-upload="BeforeUploadback"
                                        type="drag"
                                        :action="ip1+'/upFile'"
                                        style="display: inline-block;width:58px;">
                                        <div style="width: 58px;height:58px;line-height: 58px;">
                                            <Icon type="ios-camera" size="20"></Icon>
                                        </div>
                                    </Upload>
                                    <Modal title="查看大图" v-model="visible">
                                        <img :src=" imgName " v-if="visible" style="width: 100%">
                                    </Modal>
                        </FormItem>
                        <!--================================logo上传========================================== -->
                        <FormItem label="商铺logo:" >
                                <div class="demo-upload-list" v-for="item in logoList">
                                        <template v-if="item.status === 'finished'">
                                            <img :src="item.url"/>
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                                <Icon type="ios-trash-outline" @click.native="logoRemove(item)"></Icon>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                        </template>
                                    </div>
                                    <Upload
                                        ref="uploadlogo"
                                        :show-upload-list="true"
                                        :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="2048"
                                        :default-file-list="defaultlogo"
                                        :before-upload="BeforeUploadLogo"
                                        type="drag"
                                        :action="ip1+'/upFile'"
                                        style="display: inline-block;width:58px;">
                                        <div style="width: 58px;height:58px;line-height: 58px;">
                                            <Icon type="ios-camera" size="20"></Icon>
                                        </div>
                                    </Upload>
                                    <Modal title="查看大图" v-model="visible">
                                        <img :src=" imgName " v-if="visible" style="width: 100%">
                                    </Modal>
                        </FormItem>
                         <!--================================图集上传========================================== -->
                         <FormItem label="商铺图集:" >
                                <div class="demo-upload-list" v-for="item in imgList">
                                        <template v-if="item.status === 'finished'">
                                            <img :src="item.url"/>
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                                <Icon type="ios-trash-outline" @click.native="imgRemove(item)"></Icon>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                        </template>
                                    </div>
                                    <Upload
                                    multiple
                                        ref="uploadimg"
                                        :show-upload-list="true"
                                        :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="2048"
                                        :default-file-list="defaultimg"
                                        :before-upload="BeforeUploadimg"
                                        type="drag"
                                        :action="ip1+'/upFile'"
                                        style="display: inline-block;width:58px;">
                                        <div style="width: 58px;height:58px;line-height: 58px;">
                                            <Icon type="ios-camera" size="20"></Icon>
                                        </div>
                                    </Upload>
                                    <Modal title="查看大图" v-model="visible">
                                        <img :src=" imgName " v-if="visible" style="width: 100%">
                                    </Modal>
                        </FormItem>
                    </Form>
                </div>
                  <!--================================第三步========================================== -->
            <div class="username_pwd" v-if="current==2">
                    <p  style="text-align: center ;color: #FF5454"> 开店成功 !</p>
                  <p style="text-align: center;font-size: 12px ">  <router-link to="/login" >点击跳转登录界面</router-link> </p>
                    
                </div>
            <div class="reg_button" v-if="current!==2">
                <!-- <button @click="dispafe">显示</button> -->
                <Button type="error" @click="prev" :disabled="current==0?true:false" size="large" style="width: 120px;">上一步</Button>
                <Button type="error" @click="next('formValidate')" size="large"  style="width: 120px;"  v-if="current!==1">下一步</Button>
                <Button type="error" @click="reg('formValidate')" size="large"  style="width: 120px;"v-else-if="current==1">创建店铺</Button>
          
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { ip1 } from '../../static/default_item.js';
    export default {
        name: 'login',
        data() {
            return {
                ip1:ip1,
                current: 0,
                formValidate: {
                    uname:"",
                    name: '',
                    pwd: '',
                    backimg:"",
                    logo:"",
                    img:[]
                  

                },
             
                
                ruleValidate: {
                    name: [
                        { required: true, message: '请填写商铺名', trigger: 'blur' }
                    ],
                    uname: [
                        { required: true, message: '请填写账号', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码必须大于六位', trigger: 'blur' }
                    ],

                },
             
                    imgName: '',
                    visible: false,
                    backList: [],
                    logoList:[],
                    imgList:[],
                    defaultback:[],
                    defaultlogo:[],
                    defaultimg:[],
            }
        },
        computed:{
                    backimg : function(){
                        if(this.backList.length>0)
                     return this.backList[0].response 
                     else
                     return ""
                    } ,
                    logo :function(){
                        if(this.logoList.length>0)
                     return this.logoList[0].response
                     else
                     return ""
                    
                    } ,
                    img :function(){
                        if(this.imgList.length>0)
                     return this.imgList.map(item=> item.response)
                     else
                     return []
                        
                   
                      
                    } ,
                
                  },
        mounted () {
          
            // this.backList = this.$refs.upload.fileList;
        },
        methods: {
         
            next(name) {
              this.$refs[name].validate((valid) => {
                    if (valid) {
                      
                        this.current += 1;
                        setTimeout(() => {
                            this.backList = this.$refs.upload.fileList;
                            this.logoList = this.$refs.uploadlogo.fileList;
                            this.imgList = this.$refs.uploadimg.fileList;
                        }, 500);
                       
                       
                    } 
                })
              

            },
            reg(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      
                        this.current += 1;
                      
                        let params = {
                            uname:this.formValidate.uname,
                            pwd:this.formValidate.pwd,
                            name:this.formValidate.name,
                            loginType:false,
                            backimg:this.backimg,
                            logo:this.logo,
                            img:JSON.stringify(this.img),
                            fans:0,
                            goods:JSON.stringify([]),
                            isOpen:false,
                            isApply:false,
                            coupon:JSON.stringify([]),
                            collection:JSON.stringify([])
                            
                        }
                       axios.post(ip1+'/add_shops',params)
                  
                       } 
                })
              
                

            },
            prev() {
                // 跳回上一步 保存上传的图片信息
                this.defaultback = [...this.backList];
                this.defaultlogo =[ ...this.logoList];
                this.defaultimg = [...this.imgList];
                this.current -= 1;

            },
            
            handleView (name) {
                console.log(name)
                    this.imgName = name;
                    this.visible = true;
             },
            //    上传背景图
                backRemove (file) {
                    const fileList = this.$refs.upload.fileList;
                    this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                },
                handleSuccess (res, file) {
                    console.log(res)
                    file.url = ip1+res;
               },
              BeforeUploadback () {
                     const check = this.backList.length < 1;
                    if (!check) {
                        this.$Notice.warning({
                            title: '请删除后继续进行上传'
                        });
                    }
                    return check;
                },
            //    上传logo
            logoRemove (file) {
                    const fileList = this.$refs.uploadlogo.fileList;
                    this.$refs.uploadlogo.fileList.splice(fileList.indexOf(file), 1);
                },
              
              BeforeUploadLogo () {
                     const check = this.logoList.length < 1;
                    if (!check) {
                        this.$Notice.warning({
                            title: '请删除后继续进行上传'
                        });
                    }
                    return check;
                },
            //    上传图集
            imgRemove (file) {
                    const fileList = this.$refs.uploadimg.fileList;
                    this.$refs.uploadimg.fileList.splice(fileList.indexOf(file), 1);
                },
              
              BeforeUploadimg () {
                     const check = this.imgList.length < 10;
                    if (!check) {
                        this.$Notice.warning({
                            title: '最多上传10张图片'
                        });
                    }
                    return check;
                },
           
        }
    }
</script>
<style scoped>
    .logo {
        background: #d12129;
        padding: 0 15%;
    }

    .reg_container {
        background: rgb(241, 241, 241);
        /* height: 100%; */
    }

    .reg_step {
        margin: 30px auto;
        background: white;
        width: 70%;
        padding: 30px;

        /* text-align: center; */
    }

    .account_pwd {
        margin: 30px auto;
        background: white;
        width: 70%;
        /* height: 100%; */
        padding: 70px 120px;
    }

    .username_pwd {

        width: 60%;
        margin:0 auto; 
        padding: 0 50px;
        /* text-align: center; */
    }

    .username_pwd>p {
        font-size: 28px;
        margin-bottom: 40px;
    }

    .username_pwd>p>span {
        color: #FF5454;
        font-size: 30px;

    }

    .reg_button {
        text-align: center;
        width: 35%;
        margin: 100px auto 0;
        display: flex;
        justify-content: space-between;
    }
    .demo-upload-list{
            display: inline-block;
            width: 60px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            position: relative;
            box-shadow: 0 1px 1px rgba(0,0,0,.2);
            margin-right: 4px;
        }
        .demo-upload-list img{
            width: 100%;
            height: 100%;
        }
        .demo-upload-list-cover{
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,.6);
        }
        .demo-upload-list:hover .demo-upload-list-cover{
            display: block;
        }
        .demo-upload-list-cover i{
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
        }

</style>







    