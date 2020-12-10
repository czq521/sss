<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        
        
        <el-form-item label="规格属性" :label-width="width" v-for='(item,index) in arrAttr' :key="index">
          <el-row>
            <el-col :span='18'>
                  <el-input v-model="item.value" autocomplete="off"></el-input>
             </el-col>
             <el-col :span='4'>
                <el-button type="primary" v-if="index==0" @click="app">新增规格属性</el-button>
                <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
             </el-col>
        </el-row>
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
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {reqspecsAdd,reqspecsListOne,reqspecsEdit} from '../../../util/request'
import {mapGetters, mapActions} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      list: "spec/list",
    })
  },
  props:['info'],
  components: {},
  data() {
    return { 
      width: "160px",
      form: {
        specsname:'',
        attrs:'',
        status: 1,
      },
      arrAttr:[{
        value:''
      }]
    };
  },
  methods: {
    // 取消弹框
    hide(){
      this.info.isShow = false
    },
    // 点击增加新增属性
    app(){
      this.arrAttr.push({
        value:''
      })
    },
    delAttr(index){
      this.arrAttr.splice(index,1)
    },
    ...mapActions({
      requestSpecsList: "spec/requestSpecsList",
      requestspecsCount:'spec/requestspecsCount'
    }),
    // 重置
    empty(){
      this.form= {
        specsname:'',
        attrs:'',
        status: 1,
      }
      this.arrAttr=[{
        value:''
      }]
    },
    // 添加操作
    add(){
      this.form.attrs=JSON.stringify(this.arrAttr.map(item=>{return item.value}))
      reqspecsAdd(this.form).then(res=>{
            this.hide()
            this.empty()
            // 自动刷新
            this.requestSpecsList()
            this.requestspecsCount()
            
      })
    },
    //修改type的状态
    changePid(){
      this.form.type=this.form.pid==0?1:2
    }, 
    look(id){
      reqspecsListOne({id:id}).then(res=>{
        this.form=res.data.list[0]
        this.form.id=id
        this.arrAttr = JSON.parse(this.form.attrs).map(item=>{return {value:item}})
      })
    },
    // 修改
    update(){
      this.form.attrs=JSON.stringify(this.arrAttr.map(item=>{return item.value}))
      reqspecsEdit(this.form).then(res=>{
            this.requestSpecsList()
            this.info.isShow = false
            this.empty()
      })
    }
  },
    
  mounted() {},
};
</script>
<style>
</style>