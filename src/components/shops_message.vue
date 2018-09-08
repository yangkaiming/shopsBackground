<template>
    <Tabs value="name1">
            <TabPane label="群发消息" name="name1">
                <div class="send_container" v-if="isSend">
                <div class="send_message">
                <p  class="default_user"> <span>*</span> 群发对象默认为关注本店铺所有用户 </p>
              <div>   标题： <Input v-model="value" placeholder="标题" style="width: 500px" /> </div>  
                 <div style="margin:20px 0">  内容：<Input v-model="value5" type="textarea" :rows="4" placeholder="内容" style="width: 500px" /></div>  
                <div style="display: flex ;align-items: center ; height: 120px;">封面 ：
                     <Upload
                      :on-success="handleSuccess"
                      :action="ip1+'/upFile'"
                     >
                    <Button icon="ios-cloud-upload-outline">上传图片</Button>
                             </Upload>
                              <img class="UploadImg" :src="ip1+imgsrc" alt="">
                   </div>
                   <div class="send_btn">  <Button type="primary" @click = "send">发送</Button>  <Button @click=test_find>预览</Button>  </div>
                </div>
                <div class="preview" v-if="preview">
                    <div class="preview_img">
                    <img :src="ip1+imgsrc" alt="">
                    <p>{{value}}</p>
                </div>
                </div>
            </div>
            <div v-else class="send_after"><p>发送成功！可在已发送里查看消息</p> 
                <Button type="primary" @click="contine_send">继续发送</Button>
            </div>
            </TabPane>
        <TabPane :label="label" name="name2">
                <div class="preview" v-for="item in message"  @click="show_message(item.content)">
                        <div class="preview_img">
                        <img :src="ip1+item.img" alt="">
                        <p>{{item.head}}</p>
                    </div>
                    
                    </div>
                    <Modal
             mask-closable = "false"
            v-model="modal1"
            title="消息内容"
            >
            <p>{{show_info}}</p>
            
        </Modal>
        </TabPane>
        
        
       
    </Tabs>
</template>
<script>
    import axios from  'axios'
    import {ip1} from '../../static/default_item.js'
    export default {
        data () {
            return {
                label: (h) => {
                    return h('div', [
                        h('span', '已发送'),
                        h('Badge', {
                            props: {
                                count: this.message.length
                            }
                        })
                    ])
                },
                num:5,
                value: '',
                value5: '',
                imgsrc:"",
                ip1:ip1,
                message:[],
                preview:false,
                isSend:true,
                modal1: false,
                show_info:""
            }
        },
        methods:{
            handleSuccess(res){
            console.log(res)
            this.imgsrc =  res;
            },
            test_find(){
                this.preview =  this.preview ? false :true

            },
            send(){
                let time = new Date().toLocaleString().replace(/[上午下]/g,"") ;
                let params =  {
                    sendPeople :this.$store.state.login_info.user._id,
                    head:this.value,
                    content:this.value5,
                    img:this.imgsrc,
                    time:time,
                    acceptPeople:this.$store.state.login_info.user.collection,
                }
                this.message.push(params)
                axios.post(ip1+'/add_message',params)
                this.isSend = false;
                console.log(params)
            },
            contine_send(){
                this.isSend = true;
                this.value= '';
                this.value5= '';
                this.imgsrc= '';
               
            },
            show_message(mes){
                this.modal1 = true ;
                this.show_info = mes 
            }
            
        },
        beforeMount(){
             axios.post(ip1+'/find_message',{ "sendPeople" : this.$store.state.login_info.user._id,}).then((res=>{
                    console.log(res.data)
                    this.message = [...res.data]
             }))
        }
    }
</script>


<style scoped>
.send_message{
  padding-left: 10px;
  width: 50%
}
.UploadImg{
    width: 120px;
    height: 120px;
    border-radius: 8px;
    margin-left: 10px;
}
.send_btn{
    margin-top: 20px;
}
.send_btn>button{
    width: 120px;
    margin-right: 20px; 
}
.default_user{
    padding: 30px 40px;
}
.send_container{
    display: flex;
}

.preview_img{

 width: 350px;
 margin:  50px 100px;
 position: relative;

}
.preview_img>img{
    width: 100%;
    height: 200px;
    border-radius: 6px;
}
.preview_img>p{
    position: absolute;
    bottom: 0;
    background: rgba(255, 255, 255, .8);
    width: 100%;
    font-size: 16px;
    color: rgb(20, 20, 20);
    padding: 5px 10px;
}
.send_after{
    text-align: center;
    padding-top: 100px;
}
.send_after>p{
    margin-bottom: 20px;
}
</style>





