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
<el-table-column prop="id" label="用户编号" sortable width="180">
</el-table-column>
<el-table-column prop="username" label="用户名" sortable width="180">
</el-table-column>
<el-table-column prop="rolename" label="所属角色"> </el-table-column>
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
        <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
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
import {requserDel} from '../../../util/request'
export default {
computed: {
...mapGetters({
list: "manger/list",
total:'manger/total',
page:'manger/page'
}),
},
components: {},
data() {
return {};
},
methods: {
...mapActions({
requestuserList: "manger/requestuserList",
requestuserCount:"manger/requestuserCount",
changeCurrentPages:'manger/changeCurrentPages'
}),
// 当前页码数
changeCurrentPage(p){
    // console.log(a);
    this.changeCurrentPages(p)
},
// 编辑
edit(id) {
this.$emit("edit", id);
},
// 删除
del(id){
requserDel({uid:id}).then(res=>{
this.requestuserList()
// 重新获取总数
this.requestuserCount()
this.changeCurrentPages(1)
})
}
},
mounted() {
this.requestuserList();
this.requestuserCount()
},
};
</script>
<style scoped>
.box{
    margin-top: 20px;
}
</style>