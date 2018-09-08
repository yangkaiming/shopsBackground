import Vuex from 'vuex'
import Vue from 'vue'
import login_info from './login_info'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        login_info
    }
})

export default store