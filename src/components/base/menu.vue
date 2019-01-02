<template>
  <div>
    <Menu mode="horizontal" theme="light" active-name="1" >
      <Submenu v-for="(nav,key1) in menuList" :name="nav.name" :key="key1">
        <template slot="title">
          <Icon :type="nav.icon" />
          {{nav.alias}}
        </template>
        <MenuItem v-for="(item,key2) in nav.subMeun" :key="key2" :name="item.addr" :to="item.addr">{{item.alias}}</MenuItem>
      </Submenu>
  </Menu>
  <br>
  <!--<p>Change theme</p>-->
  <!--<RadioGroup v-model="theme1">-->
    <!--<Radio label="light"></Radio>-->
    <!--<Radio label="dark"></Radio>-->
    <!--<Radio label="primary"></Radio>-->
  <!--</RadioGroup>-->

  <div style="width: 90%;margin: auto">  <router-view/></div>

  </div>
</template>
<style>


</style>
<script>
  import { menu  } from "../../../config/game";

  export default {
    data () {
      return {
        theme1: 'light',
        menuList:menu,
      }
    }
  }
</script>
