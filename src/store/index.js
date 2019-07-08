import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state={
    token:'',
    admin:'',
};
const getters={
    getToken(){
        return state.token
    },
    getAdmin(){
        return state.admin
    },
}
const mutations={
    changeToken(state,string){
        state.token=string;
    },
    changeAdmin(state,num){
        state.admin=num;
    }

}
const actions={
    getNewToken(context,string){
        context.commit('changeToken',string)
    },
    getNewAdmin(context,num){
        context.commit('changeAdmin',num)
    },
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});


export default store;