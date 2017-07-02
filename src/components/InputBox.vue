<template lang="html">
  <div class="input-box row navbar-fixed-bottom">
    <form class="col-md-10 col-sm-8">
      <textarea class="form-control" row ="10" v-model="message" placeholder="Hi！" @keyup.shift.13="send">{{ message }}</textarea>
    </form>
    <div class="col-md-2 btn-box col-sm-4">
      <button class="btn btn-primary btn-block" @click="send">发送</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'inputBoxC',
  data() {
    return {
      message: '',
      img: null,
      name: null
    }
  },
  methods: {
    send() {
      this.$emit('sendMsg', this.message)
      this.message = ''
    }
  },
};
</script>

<style lang="less">
.input-box {
  border-top:1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd;
  overflow: hidden;
  height: 25vh;
  padding:10px 0;
  box-sizing: border-box;
  textarea {
    height: 100px;
    resize: none;
  }
  .btn-box {
    text-align: center;
    margin-top: 6px;
    button {
      height: 100px;
      font-size: 30px;
    }
  }
}
@media (min-width: 320px) and (max-width: 550px) {
  .input-box {
    textarea {
      height: 70px;
    }
    .btn-box {
      button {
        font-size:16px;
        height: 50px;
      }
    }
  }
}
</style>
