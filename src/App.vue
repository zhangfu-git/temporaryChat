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
      title: '给你一点空间',
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
  mounted() {
    document.getElementById('loader').style.display = 'none';
  },
  methods: {
    notification(userInfo) {
      if (window.Notification && Notification.permission !== 'denied') {
        Notification.requestPermission(() => {
          new Notification(`${userInfo.name}~加入了聊天室`, { body: `系统通知！`, icon: userInfo.head });
        });
      } else {
        new Notification(`${userInfo.name}~加入了聊天室`, { body: `系统通知！`, icon: userInfo.head });
      }
    },
    connectionSocket() {
      const socketUrl = process.env.NODE_ENV === 'development' ? 'http://192.168.1.104:3000' : 'http://tryzf.online:3000'
      const socket = io(socketUrl);
      const vm = this;
      console.log(process.env.NODE_ENV)
      vm.socket = socket;
      vm.on('connectionSuccess', (data) => {
        vm.numUsers = data.numUsers;
        console.log(data.userInfo)
        if (data.userInfo) {
          vm.notification(data.userInfo);
        }
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
        vm.updateMessageFn(data)
        setTimeout(vm.setScrollTopToBottom, 0)
      });
    },
    updateMessageFn(message) {
      const vm = this;
      const len = vm.messages.length;
      if (len > 20) {
        vm.messages.shift();
      }
      vm.messages.push(message)
    },
    pushNewMessage(newMessage) {
      const vm = this;

      if (Array.isArray(newMessage)) {
        newMessage.forEach((item) => {
          vm.updateMessageFn(item)
        })
      } else {
        vm.updateMessageFn(newMessage);
      }
      vm.setScrollTopToBottom();
    },
    setScrollTopToBottom() {
      const vm = this;
      const $listBox = vm.$refs.listBox && vm.$refs.listBox.$el;
      const top = $listBox && $listBox.scrollHeight || 0;
      $listBox.scrollTop = top
    },
    getNewMessage() {
      const vm = this;
      vm.on('messageAdded', (data) => {
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
        this.numUsers = data.numUsers;
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
