import Vue from 'vue';
import io from 'socket.io-client';

const meSockte = io(process.env.NODE_ENV == 'development' ? "http://127.0.0.1:1123" : "http://socket-chat.ncgame.cc/");

console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV == 'development' ? "http://127.0.0.1:1123" : "http://socket-chat.ncgame.cc/");


Vue.prototype.$io = meSockte;