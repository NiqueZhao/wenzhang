import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        WsClient:null,
		login_info:null,
		socketOpen:false
    },
    mutations:{
		set_Client(state,param){
			// console.log(param)
			state.WsClient = param
		},
		set_login_info(state,param){
			// console.log(param);
			state.login_info = param
		},
		login_out(state){
			state.login_info = null
		},
		changeSocketOpen(state,param){
			state.socketOpen = param
		}
    }
});

export default store;