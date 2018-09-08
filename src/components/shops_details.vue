<template >
    <div class="show_shops" v-if="show">
        <p class="shops_img">
            <span>店名 :   </span>
            <span>{{user.name}}</span>
            <Button  class="apply_btn2" @click="updata"> 修改商铺信息 </Button>
        </p>
       
        <p class="shops_img"> <span>背景 :</span> 
            <img :src="ip1+user.backimg" alt="">
          </p>
        <p class="shops_img"> <span>logo :</span> 
          <img :src="ip1+user.logo" alt="">
        </p>
        
        <p class="shops_img"> <span>图集 : </span> 
         <img v-for="item in user.img" :src="ip1+item" alt=""/>
           </p>
           <p class="shops_img">
            <span>收藏 :   </span>
            <span>{{user.fans}}</span>
        </p>
        <p class="shops_img">
            <span>商品 :  </span>
            <span>{{user.goods.length}} 件 </span>
        </p>
        <p class="shops_img"> <span >开业状态 : </span> 
              <span class="isopen">{{user.isOpen=='true'?'开业中':'未开业'}}</span>
           </p>
           <Button v-if="user.isOpen === 'false'" type="error" class="apply_btn" :disabled="user.isApply=='true'?true:false" @click="apply"> {{user.isApply=='true'?'审核中':'申请开业'}}</Button>  
           
             
        </div>
        <div class="show_shops" v-else>
                <p class="shops_img">
                    <span>店名 :   </span>
                    <Input v-model="user.name"  style="width: 300px"></Input> <span style="font-size: 12px;">不超过30个字</span>
                    <Button  class="apply_btn2" @click="user_updata"> 确认修改 </Button>  
                </p>
               
                <!--  修改商铺背景 -->
                <div class="shops_img" style="display: flex ;align-items: center;"> <span>背景 :</span> 
                    <div class="demo-upload-list" v-for="item in backList">
                            <template v-if="item.status === 'finished'">
                                <img :src="ip1+item.url">
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
                            :default-file-list="defaultbackList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :before-upload="BeforeUploadback"
                             type="drag"
                            :action="ip1+'/upFile'"
                            style="display: inline-block;width:80px;">
                            <div style="width: 80px;height:80px;line-height: 80px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="查看大图" v-model="visible">
                                <img :src=" ip1+imgName " v-if="visible" style="width: 100%">
                        </Modal>
                
                </div>
                <!-- 修改logo -->
                <div class="shops_img" style="display: flex ;align-items: center;"> <span>logo :</span> 
                    <div class="demo-upload-list" v-for="item in logoList">
                        <template v-if="item.status === 'finished'">
                            <img :src="ip1+item.url">
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
                        ref="logo"
                        
                        :show-upload-list="true"
                        :default-file-list="defaultlogoList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :before-upload="BeforeUploadlogo"
                         type="drag"
                        :action="ip1+'/upFile'"
                        style="display: inline-block;width:80px;">
                        <div style="width: 80px;height:80px;line-height: 80px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="查看大图" v-model="visible">
                            <img :src=" ip1+imgName " v-if="visible" style="width: 100%">
                    </Modal>
                </div>
                <!-- 修改图集 -->
                <div class="shops_img" style="display: flex ;align-items: center;"> <span>图集 : </span> 
                    <div class="demo-upload-list" v-for="item in imgList">
                        <template v-if="item.status === 'finished'">
                            <img :src="ip1+item.url">
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
                        ref="img"
                        multiple
                        :show-upload-list="true"
                        :default-file-list="defaultimgList"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :before-upload="BeforeUploadimg"
                         type="drag"
                        :action="ip1+'/upFile'"
                        style="display: inline-block;width:80px;">
                        <div style="width: 80px;height:80px;line-height: 80px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="查看大图" v-model="visible">
                            <img :src=" ip1+imgName " v-if="visible" style="width: 100%">
                    </Modal>
                </div>
                <p class="shops_img">
                    <span>收藏 :   </span>
                    <span>{{user.fans}}</span>
                </p>
                <p class="shops_img">
                    <span>商品 :  </span>
                    <span>{{user.goods.length}} 件 </span>
                </p>
                <p class="shops_img"> <span >开业状态 : </span> 
                      <span class="isopen">{{user.isOpen=='true'?'开业中':'未开业'}}</span>
                   </p>
                   <Button v-if="user.isOpen === 'false'" type="error" class="apply_btn" :disabled="user.isApply=='true'?true:false" @click="apply"> {{user.isApply=='true'?'审核中':'申请开业'}}</Button>  
                   
                     
                </div>
</template>


<script>
    import axios from 'axios'
    import {ip1} from '../../static/default_item.js'
    export default {
        data(){
            return{
               user :{},
               ip1:ip1,
               show:true,

              
                imgName: '',
                visible: false,
                backList:[] ,
                logoList:[],
                imgList:[]
                
            }
        },
        computed:{
            defaultbackList: function(){
                return [ {url:this.user.backimg }]
            },
            defaultlogoList: function(){
                return [ {url:this.user.logo }]
            },
            defaultimgList: function(){
                let arr = this.user.img.map(item=>{ return { url : item } })
                return   arr
            },

        },
        beforeMount(){
            this.user = this.$store.state.login_info.user
            console.log(this.defaultimgList)
        },
        mounted(){
            
        },
        methods:{
            // 申请开业
            apply(){
               this.user.isApply = 'true' ;
               axios.post(ip1+"/updata_shops",{_id:this.user._id ,isApply :"true"})
               
            },
            updata(){
                   this.show = false;
                   setTimeout(() => {
                        this.backList = this.$refs.upload.fileList;
                        this.logoList = this.$refs.logo.fileList;
                        this.imgList = this.$refs.img.fileList;
                       
                    }, 100);
              },
            //   确认修改
           user_updata(){
                    this.show = true;
                    this.user.backimg = this.backList[0].url ;
                    this.user.logo = this.logoList[0].url  ;
                    let arr = this.imgList.map(item => item.url)
                    this.user.img = [...arr]
                    axios.post(ip1+"/updata_shops",{_id:this.user._id ,name:this.user.name ,backimg:this.user.backimg,logo:this.user.logo,img:this.user.img })

                    
           },



              handleView (name) {
                    this.imgName = name;
                    this.visible = true;
                },
                handleSuccess (res, file) {
                    console.log(res)
                    file.url = res;
               },
            //    修改背景
               backRemove (file) {
                    const fileList = this.$refs.upload.fileList;
                    this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
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
            //    修改logo
               logoRemove (file) {
                    const fileList = this.$refs.logo.fileList;
                    this.$refs.logo.fileList.splice(fileList.indexOf(file), 1);
                },
               BeforeUploadlogo () {
                  const check = this.logoList.length < 1;
                    if (!check) {
                        this.$Notice.warning({
                            title: '请删除后继续进行上传'
                        });
                    }
                    return check;
                },
            //    修改img
               imgRemove (file) {
                    const fileList = this.$refs.img.fileList;
                    this.$refs.img.fileList.splice(fileList.indexOf(file), 1);
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

        },
        
    }

</script>
<style scoped>
    .shops_img{
        font-size: 14px;
        margin:20px 0;  
    }
    .shops_img>span{
        padding-right: 10px;
    }

.shops_img>img{
    vertical-align: middle;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin: 0 2px; 
}
.isopen{
    color: red;
}
.apply_btn{
    width: 150px;
    font-size: 16px;
}
.apply_btn2{
    width: 150px;
    font-size: 16px;
    float: right;
}
.show_shops{
    padding: 0  50px 50px 50px;
}



















    .demo-upload-list{
            display: inline-block;
            width: 100px;
            height: 100px;
            text-align: center;
            line-height: 100px;
            border: 1px solid transparent;
            border-radius: 5px;
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





    



    
    
    
    
    
    
        