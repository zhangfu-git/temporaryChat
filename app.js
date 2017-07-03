const express = require('express');
const app = express();
const path = require('path');
const isDebug = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'dist')))

if (!isDebug) {
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  })
}

const server = app.listen(port, () => {
  console.log(`mySocket is on port: ${ port }!`)
})

// 以下是socket相关代码

const io = require('socket.io').listen(server)

let numUsers = 0;
let headerUrl = [
  'http://tse1.mm.bing.net/th?id=OIP.1JP7IvfB4KGsfpeK4Hb0QAEsEs&w=212&h=206&c=7&qlt=90&o=4&pid=1.7',
  'http://tse3.mm.bing.net/th?id=OIP.6ZKYVQUjIi3FL5AEFaergADaDa&w=154&h=154&c=7&qlt=90&o=4&pid=1.7',
  'http://tse2.mm.bing.net/th?id=OIP.UG0dZaRyOfQMjSl-llH2hgD4D7&w=211&h=206&c=7&qlt=90&o=4&pid=1.7',
  'http://tse2.mm.bing.net/th?id=OIP.VZ5sqRAlueaVAvo3igvxeADlEP&w=192&h=217&c=7&qlt=90&o=4&pid=1.7',
  'http://tse4.mm.bing.net/th?id=OIP.bptoeqVU1WFCmIe1UZM8qwDoEN&w=197&h=217&c=7&qlt=90&o=4&pid=1.7',
  'http://tse3.mm.bing.net/th?id=OIP.Fy7y-4RG9h4nUr7-Q80eHQD6D6&w=212&h=212&c=7&qlt=90&o=4&pid=1.7'
];

io.sockets.on('connection', (socket) => {

  let addedUser = false;

  console.log('连接上sockets');

  // 通知客户端连接成功
  socket.emit('connectionSuccess', {
    numUsers: numUsers
  });
  // 监听有新的信息
  onSocket(socket, 'createMessage', (...arg) => {
    console.log('create messages')
    let messages = arg[0];
    socket.broadcast.emit('messageAdded', {
      userInfo: socket.userInfo,
      messages: messages
    })
  });

  // 监听有新的用户加入
  onSocket(socket, 'addUser', (...arg) => {
    let user = {
      name: arg[0],
      head: headerUrl[Math.floor(Math.random() * 6 + 1)]
    }
    console.log(`有用户: ${user.name} 进入聊天室`)

    socket.userInfo = user;
    ++numUsers;
    addedUser = true;

    socket.emit('addedUser', {
      userInfo: user,
      numUsers: numUsers
    });

    // 当用户在登录页面的时候，也能接收到当前人数的变化
    socket.broadcast.emit('connectionSuccess', {
      numUsers: numUsers
    });

  });

  // 监听有人断开
  onSocket(socket, 'disconnect', () => {
    console.log('This is disconnect callback')
    if (addedUser) {
      --numUsers;
      socket.broadcast.emit('userLeave', {
        userInfo: socket.userInfo,
        numUsers: numUsers
      })
    }
  });

});

/*
  socket: io.socket.on => 'connection' 回调的传参
  eventName: 监听事件名
  fn: 监听到的回调函数
*/

function onSocket(socket, eventName, fn) {
  socket.on(eventName, (...arg) => {
    let len = arg.length;
    let lastArg = arg[len - 1];

    fn(...arg);

    if (len > 1 &&  isFunction(lastArg)) {
      lastArg();
    }
  })
}

function isFunction(arg) {
  return typeof arg === 'function';
}
