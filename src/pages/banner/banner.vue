<template>
<div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-add :info="info" ref='one'></v-add>
    <v-list @edit='edit($event)'></v-list>
</div>
</template>
<script>
import vAdd from './components/add.vue'
import vList from './components/list.vue'
export default {
components: {
    vAdd,
    vList
},
data() {
return {
    info:{
        isShow:false,
        isAdd:true,//给添加按钮增加一个标识，用来判断弹框中的按钮到底是添加还是编辑
        title:'轮播图添加'
    }
};
},
methods: {
    // 添加
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
            title:'轮播图编辑'
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