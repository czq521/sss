<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
import { reqRoleAdd, reqRoleListOne, reqRoleEdit } from "../../../util/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },

      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    // 重置
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      this.$nextTick(() => {
        this.form.menus = this.$refs.tree.setCheckedKeys([]);
      });
      // this.$refs.tree.setCheckedKeys([]);
    },
    // 隐藏弹窗
    hide() {
      this.info.isShow = false;
    },
    add() {
      // 后端要的是字符串数组，需要stringify转换
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        this.empty();
        this.hide();
         // 自动刷新
        this.requestRoleList()
      });
    },
    ...mapActions({
      requestMenuList: "menu/requestMenuList",
      requestRoleList: "role/requestRoleList",
    }),
    look(id) {
      reqRoleListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.menus = this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
        // console.log(  this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus)));
        this.form.id = id;
      });
    },
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.form).then((res) => {
        this.requestRoleList();
        this.hide();
      });
    },
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.requestMenuList();
    }
  },
};
</script>
<style>
</style>