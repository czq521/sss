import  Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import menu from './modules/menu'
import role from './modules/role'
import manger from './modules/manger'
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'
import banner from './modules/banner'
import seckill from './modules/seckill'
export default new Vuex.Store({
        modules:{
            menu,
            role,
            manger,
            cate,
            spec,
            goods,
            banner,
            seckill
        }
})