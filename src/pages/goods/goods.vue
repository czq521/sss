<template>
<div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 添加 -->
    <v-add :info='info' ref="one"></v-add>
    <!-- 列表 -->
    <v-list @edit='edit($event)'></v-list>
</div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'
export default {
components: {
    vList,
    vAdd
},
data() {
return {
    info:{
        isShow:false,
        title:'商品添加',
        isAdd:true //给添加按钮增加一个标识，用来判断弹框中的按钮到底是添加还是编辑
    }
};
},
methods: {
    willAdd(){
        this.info.isShow = !this.info.isShow
        this.info.isAdd = true
        this.$refs.one.empty() 
    },
     // 编辑
    edit(e){
        // console.log(e);
        // this.info.isShow = true
        // console.log(this.$refs.one);
        // this.info.isAdd = false
        this.info={
            isShow:true,
            isAdd:false,
            title:'商品修改'
        }
        this.$refs.one.look(e)
    }
},
mounted(){
}
};
</script>
<style>
</style>