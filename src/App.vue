<template>
  <div id="app" class="container-fluid">
    <HeaderBox :title="title"/>
    <ListBox ref="listBox">
      <Message :user="userInfo" :message="item"  v-for="(item, index) in messages" :key="index" ref="messageList"/>
    </ListBox>
    <InputBox v-on:sendMsg = "sendMessage"/>
    <Login v-on:login = "login" v-if="isShow" :appName="appName" :numUsers="numUsers"/>
  </div>
</template>

<script>
import io from 'socket.io-client';
import HeaderBox from './components/HeaderBox';
import InputBox from './components/InputBox';
import ListBox from './components/ListBox';
import Message from './components/Message';
import Login from './components/Login';

export default {
  name: 'app',
  data() {
    return {
      title: '安静不一定是美男子！',
      socket: null,
      messages: [],
      userInfo: {},
      appName: '爆炸吧！话题',
      isShow: true,
      numUsers: 0,
      userList: []
    }
  },
  created() {
    this.connectionSocket();
    this.getNewMessage();
    this.subscriptUserLeave();
  },
  mouned() {
    this.setScrollTopToBottom();
  },
  methods: {
    connectionSocket() {
      const socketUrl = process.env.NODE_ENV === 'development' ? 'http://192.168.1.104:3000' : 'http://tryzf.online:3000'
      const socket = io(socketUrl);
      const vm = this;
      console.log(process.env.NODE_ENV)
      vm.socket = socket;
      vm.on('connectionSuccess', (data) => {
        console.log('连接Socket成功', data.numUsers)
        vm.numUsers = data.numUsers;
      });
    },
    sendMessage(msg) {
      const vm = this;
      const data = {
        head: vm.userInfo.head,
        message: msg,
        name: vm.userInfo.name
      }
      vm.emit('createMessage', data, () => {
        vm.messages.push(data)
        setTimeout(vm.setScrollTopToBottom, 0)
      });
    },
    pushNewMessage(newMessage) {
      const vm = this;
      if (Array.isArray(newMessage)) {
        newMessage.forEach((item) => {
          vm.messages.push(item)
        })
      } else {
        vm.messages.push(newMessage);
      }
      vm.setScrollTopToBottom();
    },
    setScrollTopToBottom() {
      const vm = this;
      const $listBox = vm.$refs.listBox && vm.$refs.listBox.$el;
      const top = $listBox.scrollHeight;
      $listBox.scrollTop = top
    },
    getNewMessage() {
      const vm = this;
      vm.on('messageAdded', (data) => {
        console.log('有新的消息来了', data)
        vm.pushNewMessage(data.messages)
        // 等ui更新了在去设置scrollTop
        setTimeout(vm.setScrollTopToBottom, 0)
      })
    },
    login(name) {
      console.log('click login button')
      this.emit('addUser', name);
      this.getUserInfo();
    },
    getUserInfo() {
      this.on('addedUser', (data) => {
        this.isShow = false;
        this.userInfo = data.userInfo;
        this.numUsers = data.numUsers
      })
    },
    subscriptUserLeave() {
      this.on('userLeave', (data) => {
        this.numUsers = data.numUsers;
      })
    },
    on(eventName, callback) {
      this.socket.on(eventName, (...arg) => {
        console.log('on callback')
        callback.apply(this.socket, arg)
      })
    },
    emit(eventName, data, callback) {
      this.socket.emit(eventName, data, (...arg) => {
        if (callback) {
          callback.apply(this.socket, arg)
        }
      })
    }
  },
  components: {
    HeaderBox,
    InputBox,
    ListBox,
    Message,
    Login
  },
};
</script>

<style>
</style>
