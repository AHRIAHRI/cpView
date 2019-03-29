<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
      <router-view name="main"></router-view>
      <router-view/>
      <br>
      <!--<div style="color: #515a6e;">沉思往夕立残阳，当时只道是寻常</div>-->
  </div>
</template>

<script>
  export default {
    name: 'App'
  }

</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 20px;*/
      width: 90%;
      margin: auto;
  }
</style>
