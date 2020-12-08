import {requserList,requserCount} from '../../util/request'

const state = {
    list:[],//请求回来的数据
    total:0,//  请求回来的总数
    size:2,//当前页数展示的条数
    page:1,//当前展示第几页
}
const mutations ={
    changeList(state,arr){
        state.list = arr
    },
    // 获取总数
    changeCount(state,num){
        state.total = num
    },
    // 修改当前页
    changePage(state,page){
        state.page = page
    }
}
const actions = {
    requestuserList(context){
        requserList({
            page:context.state.page,
            size:context.state.size,
        }).then(res=>{
            context.commit('changeList',res.data.list)
        })
    },
    // 请求获取总数
    requestuserCount(context){
        requserCount().then(res=>{
            context.commit('changeCount',res.data.list[0].total)
        })
    },
    // 修改当前页码数
    changeCurrentPages(context,page){
        context.commit("changePage",page)
        context.dispatch('requestuserList')
    }

}
const getters = {
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    page(state){
        return state.page
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}
