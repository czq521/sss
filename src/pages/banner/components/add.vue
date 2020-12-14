<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">

        <el-form-item label="标题" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>
<script>
// import { indexRouters } from "../../../router/index";
import { reqbannerAdd, reqbannerListOne,reqbannerEdit} from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      width: "160px",
      imageUrl:'',
      form: {
        title:"",
        img: '',
        status: 1,
      },
    };
  },
  methods: {

    // 上传图片
    changeImg(e){
      var file = e.raw
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file
    },

    // 取消弹框
    hide() {
      this.info.isShow = false;
    },
    ...mapActions({
      requestBannerList: "banner/requestBannerList",
    }),
    // 重置
    empty() {
      this.form= {
        title:"",
        img: null,
        status: 1,
      },
      this.imageUrl =''
    },
    // 添加操作
    add() {
      reqbannerAdd(this.form).then((res) => {
        this.hide();
        console.log(res);
        // 自动刷新
        this.requestBannerList();
      });
    },
    //修改type的状态
    changePid() {
      // this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    look(id) {
      reqbannerListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg+ res.data.list.img
      });
    },
    // 修改
    update() {
      reqbannerEdit(this.form).then((res) => {
        this.requestBannerList();
        this.info.isShow = false;
        this.empty();
      });
      console.log(111);
    },
  },

  mounted() {
    this.requestBannerList()
    // this.requestMenuList()
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
    border-color: #409EFF;
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
