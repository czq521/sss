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
<el-table-column prop="id" label="商品编号" sortable width="130">
</el-table-column>
<el-table-column prop="goodsname" label="商品名称" sortable width="130">
</el-table-column>
<el-table-column prop="price" label="商品价格" width="120"> </el-table-column>
<el-table-column prop="market_price" label="市场价格" width="120"></el-table-column>

<el-table-column  label="图片" sortable width="180">
    <template slot-scope="scope">
        <img :src="$preImg+scope.row.img" alt="">
    </template>
</el-table-column>

<el-table-column label="是否新品" prop="status" width="120">
<template slot-scope="scope">
<el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
<el-button type="danger" v-else>否</el-button>
</template>
</el-table-column>

<el-table-column label="是否热卖" prop="status"  width="120">
<template slot-scope="scope">
<el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
<el-button type="danger" v-else>否</el-button>
</template>
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
import {reqgoodsDel} from '../../../util/request'
export default {
computed: {
...mapGetters({
list: "goods/list",
total:'goods/total',
page:'goods/page'
}),
},
components: {},
data() {
return {};
},
methods: {
...mapActions({
requestgoodsList: "goods/requestgoodsList",
requestgoodsCount: "goods/requestgoodsCount",
changeCurrentPages:"goods/changeCurrentPages",

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
reqgoodsDel({id:id}).then(res=>{
this.requestgoodsList()

})
}
},
mounted() {
this.requestgoodsList();
this.requestgoodsCount()
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