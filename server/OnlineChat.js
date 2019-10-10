const filter = require('./filter/filter');
module.exports = class OnlineChat {

  constructor(io) {
    this.io = io;
    this.userList = [];
    this.newMsgList = [];

  }
  init() {

    this.io.on('connection', socket => {
      console.log(`io => ID:${socket.id} 用户链接`);
      // 只监听一次 监听 用户 创建
      socket.on('create', data => {
        console.log("io => 用户准备创建：" + data);
        if (this.isUserExist(data.name)) {
          this.error(socket, {
            code: 101,
            msg: '用户名已存在'
          });
          return;
        }
        this.addUser({
          id: socket.id,
          name: data.name
        });
        console.log("io => 用户创建成功：" + data);

        // 发送 当前对象
        this.sendMe(socket, data.name);

        // 一直监听 监听消息 message
        socket.on('message', data => {
          console.log("io => 收到消息：" + JSON.stringify(data));
          this.sendMsg({
            id: socket.id,
            message: data.message
          });
        });
      });
      // 一次 断开
      socket.once('disconnect', () => {
        console.log(`io => ID:${socket.id} 用户断开`);
        this.remove({ id: socket.id });
      });
    });

  }
  remove({ id }) {
    const userIndex = this.userList.findIndex(item => item.id == id)
    if (userIndex == -1) return;
    this.userList.splice(userIndex, 1);
    console.log(this.userList);
    this.sendUserList();
  }
  isUserExist(name) {
    return this.userList.findIndex(item => item.name == name) !== -1;
  }
  addUser({ id, name }) {

    this.userList.push({ id, name: filter(name) });
    this.userList = Array.from(new Set(this.userList));
    console.log(this.userList, "1");
    this.sendUserList();
  }

  error(socket, { code, msg }) {
    socket.emit('user-error', {
      code,
      msg
    });
  }

  joinChat() {
    this.io.emit('join-chat');
  }

  sendUserList() {
    this.io.emit('user-list', [...this.userList]);
  }

  sendMsg({ id, message }) {
    const user = this.userList.find(item => item.id == id) || {};

    this.io.emit('message', {
      ...user,
      u_id: user.id,
      message: filter(message),
      id: String(Math.random() * 1000000000)
    });

  }
  sendMe(meIo, name) {

    meIo.emit('me', {
      id: meIo.id,
      name: name
    });

  }


}