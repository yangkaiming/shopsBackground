<template>
    <div>
    <Admin v-if="user.loginType=='true'"/>  
    <Shops v-else/>  

    
    </div>

</template>

<script>
import Admin from './admin.vue'
import Shops from './shops.vue'
import axios from 'axios'
import {ip1} from '../../static/default_item.js'
axios.defaults.withCredentials = true
    export default {
     
     components:{
        Admin,
        Shops

     },
     data(){
         return{
             
         }
           
     },
    computed:{
        user(){
            return this.$store.state.login_info.user
        }
    },
    beforeMount(){
        // axios.post(ip1+"/isLogin").then((res)=>{
        //     console.log(res.data)
        //     if(res.data)
        //     this.$store.commit("save_login",res.data)
        //     else
        //     this.$router.push('/login')
        // })
        if(!this.user._id)
       this.$router.push('/login')
       console.log(this.$store.state.login_info.user)
    }
    }


</script>
<style >
   
  
    .ivu-menu-item {
        font-size: 16px;
        padding: 18px 24px !important;
    }
</style>