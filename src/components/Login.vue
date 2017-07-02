<template lang="html">
  <form class="login-box">
    <div class="form-group">
      <h1 class="title">{{ appName }}</h1>
    </div>
    <div class="tip-box">
      <Tooltip :isShow="isErrorTip" :text="tip"/>
    </div>
    <div class="form-group">
      <input class="form-control name" type="text" v-model="name" placeholder="昵称">
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-success btn-lg" @click="login">Go</button>
    </div>
    <div class="form-group">
      <a href="#" class="curr-user_num">当前在线人数：<span class="badge">{{ numUsers }}</span></a>
    </div>
  </form>
</template>

<script>
import Tooltip from './Tooltip';

export default {
  name: 'loginC',
  props: ['appName', 'numUsers'],
  data() {
    return {
      name: '',
      isErrorTip: false,
      tip: ''
    }
  },
  methods: {
    login() {
      const name = this.name;
      if (!name) {
        this.tipShow('昵称不能为空')
      } else {
        this.$emit('login', name)
      }
    },
    tipShow(tip) {
      this.tip = tip
      this.isErrorTip = true
      setTimeout(() => {
        this.isErrorTip = false
      }, 1000)
    }
  },
  components: {
    Tooltip
  }
}
</script>

<style lang="less">
.login-box {
  width:100vw;
  height: 100vh;
  position: fixed;
  top:0;
  left:0;
  background: #6f5499;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding:10vh;
  box-sizing: border-box;
  .tip-box {
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 252px;
    margin-bottom:6px;
  }
  .curr-user_num {
    color:#fff;
  }
  .title {
    color:#fff;
    font-weight: bold;
  }
  .name {
    margin-bottom:10px;
  }
}
</style>
