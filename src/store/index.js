import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state={
    token:''
};
const getters={
    getToken(){
        return state.token
    }
}
const mutations={
    changeToken(state,string){
        state.token=string;
    }

}
const actions={
    getNewToken(context,string){
        context.commit('changeToken',string)
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});


export default store;