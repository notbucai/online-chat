import Vue from 'vue';
import io from 'socket.io-client';

const meSockte = io("http://socket-chat.ncgame.cc/");

Vue.prototype.$io = meSockte;