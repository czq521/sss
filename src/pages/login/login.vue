<template>
<div class="box">
    <div class="con">
        <h2>登录</h2>
        <div><input type="text"></div>
        <div><input type="text"></div>
        <div><button>登录</button></div>
    </div>
</div>
</template>
<script>
export default {
components: {},
data() {
return {
};
},
methods: {
},
mounted(){
}
};
</script>
<style scoped>
    .box{
        width: 100vw;
        height: 100vh;
        background: linear-gradient(to right,#563544,#303d60);
    }
    .con{
        width: 500px;
        height: 300px;
        background-color: #fff;
        border-radius: 10px;
        position: fixed;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        text-align: center;
    }
    h2{
        margin: 20px;
    }
    input{
        width: 60%;
        height: 40px;
        margin: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
    }
    button{
        width: 60%;
        height: 40px;
        background-color: #409eff;
        border: none;
        margin: 10px;
        border-radius: 5px;
        outline: none
    }
</style>>
