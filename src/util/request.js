import axios from 'axios'
import qs from 'qs'

const baseUrl = '/api'

// 响应拦截
axios.interceptors.response.use(res=>{
    console.log('==========请求的路径:'+res.config.url+'===============');
    console.log(res);
    return res
})

// 菜单模块请求
// 菜单添加
export const reqMenuAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/menuadd',
        method:'post',
        data:data
    })
}

// 菜单列表
export const reqMenuList=(data)=>{
    return axios({
        url:baseUrl+'/api/menulist',
        method:'get',
        params:data
    })
}

// 菜单获取
export const reqMenuListOne=(data)=>{
    return axios({
        url:baseUrl+'/api/menuinfo',
        method:'get',
        params:data
    })
}

// 菜单修改
export const reqMenuEdit=(data)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'post',
        data:data
    })
}

// 菜单删除
export const reqMenuDel=(data)=>{
    return axios({
        url:baseUrl+'/api/menudelete',
        method:'post',
        data:data
    })
}
///////////////////////角色管理//////////////////////////
// 角色添加
export const reqRoleAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:'post',
        data:data
    })
}
// 角色列表
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:'get',
    })
}
// 角色请求
export const reqRoleListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:'get',
        params:id
    })
}

// 角色编辑
export const reqRoleEdit=(id)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'post',
        data:id
    })
}

// 角色删除
export const reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+'/api/roledelete',
        method:'post',
        data:id
    })
}
////////////////////////管理员管理//////////////////////////////
// 管理员添加
export const requserAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:'post',
        data:data
    })
}

// 管理员列表
export const requserList=(data)=>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:'get',
        params:data
    })
}

// 管理员删除
export const requserDel=(id)=>{
    return axios({
        url:baseUrl+'/api/userdelete',
        method:'post',
        data:id
    })
}

// 管理员获取
export const requserListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/userinfo',
        method:'get',
        params:id
    })
}
//管理员编辑
export const requserEdit=(id)=>{
    return axios({
        url:baseUrl+'/api/useredit',
        method:'post',
        data:id
    })
}

//管理员总数
export const requserCount=()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:'get',
    })
}


///////////////////////////商品分类管理///////////////////////////////////
// 商品分类添加
export const reqCateAdd=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/cateadd',
        method:'post',
        data:form
    })
}

// 商品分类列表
export const reqCateList=(data)=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:'get',
        params:data
    })
}

// 商品分类获取
export const reqCateListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:'get',
        params:id
    })
}

//商品分类删除
export const reqCateDel=(id)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:'post',
        data:id
    })
}

//商品分类编辑
export const reqCateEdit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:'post',
        data:form
    })
}


///////////////////////////商品规格管理///////////////////////////////////
// 商品规格添加
export const reqspecsAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/specsadd',
        method:'post',
        data:data
    })
}

// 商品规格列表
export const reqspecsList=(data)=>{
    return axios({
        url:baseUrl+'/api/specslist',
        method:'get',
        params:data
    })
}

// 商品规格获取
export const reqspecsListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/specsinfo',
        method:'get',
        params:id
    })
}

//商品规格删除
export const reqspecsDel=(id)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'post',
        data:id
    })
}

//商品规格编辑
export const reqspecsEdit=(data)=>{
    return axios({
        url:baseUrl+'/api/specsedit',
        method:'post',
        data:data
    })
}

//商品规格总数
export const reqspecsCount=()=>{
    return axios({
        url:baseUrl+'/api/specscount',
        method:'get',
    })
}

///////////////////////////商品管理///////////////////////////////////
// 商品添加
export const reqgoodsAdd=(data)=>{
    var form=new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/goodsadd',
        method:'post',
        data:form
    })
}

// 商品列表
export const reqgoodsList=(data)=>{
    return axios({
        url:baseUrl+'/api/goodslist',
        method:'get',
        params:data
    })
}

// 商品获取
export const reqgoodsListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/goodsinfo',
        method:'get',
        params:id
    })
}

//商品删除
export const reqgoodsDel=(id)=>{
    return axios({
        url:baseUrl+'/api/goodsdelete',
        method:'post',
        data:id
    })
}

//商品编辑
export const reqgoodsEdit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/goodsedit',
        method:'post',
        data:form
    })
}

//商品总数
export const reqgoodsCount=()=>{
    return axios({
        url:baseUrl+'/api/goodscount',
        method:'get',
    })
}


///////////////////////////轮播图管理///////////////////////////////////
// 轮播图添加
export const reqbannerAdd=(data)=>{
    var form=new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/banneradd',
        method:'post',
        data:form
    })
}

// 轮播图列表
export const reqbannerList=(data)=>{
    return axios({
        url:baseUrl+'/api/bannerlist',
        method:'get',
        params:data
    })
}

// 轮播图获取
export const reqbannerListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/bannerinfo',
        method:'get',
        params:id
    })
}

//轮播图删除
export const reqbannerDel=(id)=>{
    return axios({
        url:baseUrl+'/api/bannerdelete',
        method:'post',
        data:id
    })
}

//轮播图编辑
export const reqbannerEdit=(data)=>{
    var form = new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        url:baseUrl+'/api/banneredit',
        method:'post',
        data:form
    })
}


///////////////////////////限时秒杀管理///////////////////////////////////
// 限时秒杀添加
export const reqseckAdd=(data)=>{
    return axios({
        url:baseUrl+'/api/seckadd',
        method:'post',
        data:data
    })
}

// 限时秒杀列表
export const reqseckList=(data)=>{
    return axios({
        url:baseUrl+'/api/secklist',
        method:'get',
        params:data
    })
}

// 限时秒杀获取
export const reqseckListOne=(id)=>{
    return axios({
        url:baseUrl+'/api/seckinfo',
        method:'get',
        params:id
    })
}

//限时秒杀删除
export const reqseckDel=(id)=>{
    return axios({
        url:baseUrl+'/api/seckdelete',
        method:'post',
        data:id
    })
}

//限时秒杀编辑
export const reqseckEdit=(data)=>{
    return axios({
        url:baseUrl+'/api/seckedit',
        method:'post',
        data:data
    })
}

