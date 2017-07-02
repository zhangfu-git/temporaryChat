<template lang="html">
  <transition name="fade">
    <div class="message-box" :class="message.name === user.name ? 'right-msg': 'left-msg'">
      <figure class="message-header">
        <img :src="message.head">
        <figcaption>
          {{ message.name }}
        </figcaption>
      </figure>
      <div class="message-main">
        <span class="triangle"></span>
        {{ message.message }}
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'messageC',
  props: ['message', 'user']
};
</script>

<style lang="less">
.fade-enter-active, .fade-leave-active {
  transition: opacity .8s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
.message-box {
  display: flex;
  align-items: center;
  justify-content:flex-start;
  padding:20px;
  flex-basis: 100%;
}
.message-header {
  text-align: center;
  margin-bottom: 0;
  img {
    border-radius:50%;
    width: 80px;
    height: 80px;
  }
  figcaption {
    font-weight: bold;
    text-align: center;
    overflow: hidden;
    width: 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.triangle {
  position: absolute;
  top:10px;
}
.message-main {
  background: #fff;
  border-radius: 8px;
  padding:10px 20px;
  position: relative;
  color:#666;
  margin-bottom:20px;
  min-height: 46px;
}

.right-msg {
  flex-direction: row-reverse;
  .message-left {
    text-align: right;
  }
  .message-main {
    margin-right: 20px;
  }
  .triangle {
    border:10px solid #000; border-color:transparent transparent transparent #fff;
    right:-18px;
  }
}

.left-msg {
  .message-left {
    text-align: left;
  }
  .message-main {
    margin-left: 30px;
  }
  .triangle {
    border:10px solid #000; border-color:transparent #fff transparent transparent;
    left:-18px;
  }
}

@media (min-width: 320px) and (max-width: 768px) {
  .message-box {
    padding:10px;
  }
  .left-msg {
    .message-main {
      margin-left: 10px;
    }
  }
  .right-msg {
    .message-main {
      margin-right: 10px;
    }
  }
  .message-header {
    img {
      width:50px;
      height: 50px;
    }
  }
}
</style>
