<template>
  <div class="msg-item" :class="{current:isme}">
    <div class="msg-avatar">
      <img src="@/assets/img/g.jpeg" alt="头像">
    </div>
    <div class="msg-main">
      <div class="msg-name">{{name}}</div>
      <pre class="msg-content">{{message}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: "MsgItem",
  props: {
    message: String,
    name: String,
    isme: Boolean
  }
};
</script>

<style lang="scss" scoped>
.msg {
  &-item {
    flex-grow: 1;
    display: flex;
    margin-bottom: 20px;
    &.current {
      flex-flow: row-reverse;
    }
  }
  &-name {
    font-size: 18px;
    margin-top: 8px;
    margin-bottom: 10px;
    color: $def-color;
  }
  &-avatar {
    width: 60px;
    min-width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 50%;
    margin: 0 10px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-main {
    /* flex-grow: 1; */
    overflow: hidden;
  }
  &-content {
    background: $def-bgc;
    color: #fff;
    padding: 14px 20px;
    line-height: 1.4;
    font-size: 14px;
    /* box-shadow: 0 0 8px rgba(196, 195, 195, 0.808); */
    border-radius: 4px;
    position: relative;
    word-wrap: break-word;
    &::before {
      content: "";
      position: absolute;
      top: 10px;
      left: -16px;
      /* background-color: $def-bgc; */
      border: 8px solid transparent;
      border-right-color: $def-bgc;
    }
  }
  &-item.current &-content {
    background-color: $def-bgc * 0.9;
    &::before {
      left: 100%;
      border: 8px solid transparent;
    }
  }
  &-item.current &-name {
    text-align: right;
  }
}
</style>
