<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="width">
          <el-select
            v-model="form.pid"
            placeholder="---请选择---"
            @change="changePid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加 -->
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router/index";
import { reqMenuAdd, reqMenuListOne, reqMenuEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      width: "160px",
      imageUrl:'',
      form: {
        pid: "",
        title: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      },
      indexRouters: indexRouters,
    };
  },
  methods: {

    // 上传图片
    changeImg(){
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    // 取消弹框
    hide() {
      this.info.isShow = false;
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
    }),
    // 重置
    empty() {
      this.form = {
        pid: "",
        title: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      };
    },
    // 添加操作
    add() {
      reqMenuAdd(this.form).then((res) => {
        this.hide();
        // 自动刷新
        this.requestMenuList();
      });
    },
    //修改type的状态
    changePid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    look(id) {
      reqMenuListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    // 修改
    update() {
      reqMenuEdit(this.form).then((res) => {
        this.requestMenuList();
        this.info.isShow = false;
        this.empty();
      });
    },
  },

  mounted() {},
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
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
