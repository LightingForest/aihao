<script setup>
//表单检验(账户名+密码)

//准备表单对象
import {ref} from "vue";
// import {LoginApi} from "@/apis/user.js";

import 'element-plus/es/components/message/style/css'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.js";

const userStore=useUserStore()

const form=ref({
  account:'13012345683',
  password:'123456',
  agree:true
})

//准备规则对象
const rules={
  account: [
    { required: true, message: '用户名不能为空' }
  ],
  password: [
    { required: true, message: '密码不能为空' },
    { min: 6, max: 24, message: '密码长度要求6-14个字符' }
  ],
  agree: [
    {validator:(rule,value,callback)=>{
        console.log(value)
        //自定义校验逻辑
        if(value){
          callback()
        }else {
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
}

//获取form实例进行统一校验
const formRef=ref(null)
const router=useRouter()
const doLogin=()=>{
  const {account,password}=form.value
  //调用实例方法
  formRef.value.validate(async (valid)=>{
    //valid 所有表单通过校验 才为true
    console.log(valid)
    if(valid){
      //TODO LOGIN
      // const res= await LoginApi({account,password})
      // console.log(res)
      // userStore.getUserInfo({account,password})
      //提示用户
      ElMessage({type:'success',message:'登录成功'})
      //跳转首页
      router.replace({path:'/welcome'})
    }
  })
}
</script>


<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">拓趣</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div  class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px"
                     status-icon>
              <el-form-item prop="account"  label="账户">
                <el-input v-model="form.account"/>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password"/>
              </el-form-item>
              <el-form-item prop="agree" label-width="22px">
                <el-checkbox  size="large" v-model="form.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>
          CopyRight &copy; 拓趣
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  //background: #d14f48;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/home/nav.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: #d14f48;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/img.jpg') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
        text-decoration: none; /* 去除下划线 */
        color: black;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  //background: #100f0f;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: #d14f48;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: #CF4444FF;
          }

          &.active,
          &:focus {
            border-color: #D14F48FF;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: #CF4444FF;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: #D14F48FF;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: #D14F48FF;
  width: 100%;
  color: #fff;
}
</style>
