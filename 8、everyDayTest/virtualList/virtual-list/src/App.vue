<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    
    <!-- 虚拟列表：只显示可视区域内的标签元素，超出或者未加载无对应的标签元素 -->
    <VirtualList :listData="listData" :itemSize="100"/>
  </div>
</template>

<script>
import VirtualList from './components/VirtualList.vue'

//造1000条数据
let list = [];
for (let i = 0; i < 1000; i++) {
  list.push({ id: i, value: i });
}

export default {
  name: 'App',
  components: {
    VirtualList
  },
  data() {
    return {
      listData : list
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height:100%;
}
html{
  height: 100%;
}
body{
  height: 100%;
  margin:0;
}
</style>
