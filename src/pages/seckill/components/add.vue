<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
    >
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 时间范围 -->
          <el-form-item
            label="活动时间" :label-width="width">
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="timestamp">
              </el-date-picker>
            </div>
          </el-form-item>

        <el-form-item label="一级分类" :label-width="width">
          <el-select
            v-model="form.first_cateid"
            placeholder="---请选择---"
            @change="changeCate"
          >
            <el-option label="请选择"  :value="0" disabled></el-option>
            <!-- 动态循环添加 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="---请选择---">
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- 动态循环添加 -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="width">
          <el-select
            v-model="form.goodsid"
            placeholder="---请选择---"
          >
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- 动态循环添加 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqseckAdd,reqseckListOne,reqseckEdit,} from "../../../util/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specList: "spec/list",
      seckList:'seckill/list'
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      imageUrl: "",
      secondCate: [], //用于存放二级分类
      form: {
        first_cateid: '',
        second_cateid: '',
        title:'',
        begintime:"",
        endtime:"",
        goodsid:'',
        status: 1,
      },
      value1:[]
    };
  },
  methods: {
    // 上传图片
    changeImg(e) {
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    // 取消弹框
    hide() {
      this.info.isShow = false;
    },
    ...mapActions({
      requestCateList: "cate/requestCateList",
      requestSpecsList: "spec/requestSpecsList",
      requestSeckList: "seckill/requestSeckList",
    }),
    // 重置
    empty() {
      this.form = {
        first_cateid: '',
        second_cateid: '',
        title:'',
        begintime:"",
        endtime:"",
        goodsid:'',
        status: 1,
      };
    },
    // 添加
    add() {
        this.form.begintime = new Date(this.value1[0]).getTime()
        this.form.endtime = new Date(this.value1[1]).getTime()      
        reqseckAdd(this.form).then((res) => {
        this.hide();
        this.empty();
        // this.requestSeckList();
        
      });
    },
    look(id) {   
      this.value1=[];
      reqseckListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.changeCate();
        this.value1.push(new Date(parseInt(res.data.list.begintime)))   
        this.value1.push(new Date(parseInt(res.data.list.endtime)))
        
      });
    },
    // 编辑
    update() {
        this.form.begintime = new Date(this.value1[0]).getTime()
        this.form.endtime = new Date(this.value1[1]).getTime()  
      reqseckEdit(this.form).then((res) => {
        this.requestSeckList();
        this.info.isShow = false;
        this.empty();
        
      });
    },
   // 修改二级分类
    changeCate() {
      this.secondCate = this.cateList.find((item)=>{return item.id==this.form.first_cateid}).children
    },
  },
  mounted() {
    this.requestCateList();
    this.requestSpecsList();
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>