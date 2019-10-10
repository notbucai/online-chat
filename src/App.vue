<template>
  <div id="main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Main",
  created(){
    
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#main {
  width: 100%;
  background-color: #fff;
}
</style>