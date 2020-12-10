<template>
<div class="box">
    <el-table
:data="list"
style="width: 100%; margin-bottom: 20px"
row-key="id"
border
default-expand-all
:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
>
<el-table-column prop="id" label="规格编号" sortable width="120">
</el-table-column>
<el-table-column prop="specsname" label="规格名称" sortable width="180">
</el-table-column>
<el-table-column  label="规格属性"> 
    <template slot-scope="scope">
        <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
    </template>
</el-table-column>
<el-table-column label="状态" prop="status">
<!-- <el-button type="success" >启用</el-button>
<el-button type="info">禁用</el-button> -->
<template slot-scope="scope">
<el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
<el-button type="danger" v-else>禁用</el-button>
</template>
</el-table-column>
<el-table-column label="操作">
    <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
    </template>
</el-table-column>
</el-table>

<el-pagination
  :current-page='page'
  :page-size="2"
  background
  layout="prev, pager, next"
  :total="total" @current-change='changeCurrentPage'>
</el-pagination>
</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import {reqspecsDel} from '../../../util/request'
export default {
computed: {
...mapGetters({
list: "spec/list",
total:'spec/total',
page:'spec/page'
}),
},
components: {},
data() {
return {};
},
methods: {
...mapActions({
requestSpecsList: "spec/requestSpecsList",
requestspecsCount:'spec/requestspecsCount',
changeCurrentPages:'spec/changeCurrentPages'
}),
// 编辑
edit(id) {
this.$emit("edit", id);
},
// 删除
del(id){
reqspecsDel({id:id}).then(res=>{
this.requestSpecsList()
})
},
// 当前页码数
changeCurrentPage(p){
    // console.log(a);
    this.changeCurrentPages(p)
},
},
mounted() {
this.requestSpecsList();
this.requestspecsCount()
},
};
</script>
<style scoped>
.box{
    margin-top: 20px;
}
</style>