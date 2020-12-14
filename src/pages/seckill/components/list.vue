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

<el-table-column prop="title" label="活动名称" sortable width="130">
</el-table-column>

<el-table-column label="状态" prop="status"  width="120">
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

</div>

</template>
<script>
import { mapActions, mapGetters } from "vuex"
import {reqseckDel} from '../../../util/request'
export default {
computed: {
...mapGetters({
cateList: "cate/list",
list: "seckill/list",
}),
},
components: {},
data() {
return {};
},
methods: {
...mapActions({
requestSeckList:'seckill/requestSeckList'
}),
// 编辑
edit(id) {
this.$emit("edit", id);
},
// 删除
del(id){
reqseckDel({id:id}).then(res=>{
this.requestSeckList()

})
}
},
mounted() {
this.requestSeckList()
},
};
</script>
<style scoped>
.box{
    margin-top: 20px;
}
img{
    width: 100px;
    height: 100px;
}
</style>