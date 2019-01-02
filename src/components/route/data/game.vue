<template>
    <div>
      game路由组件 ,{{main.url}}
    </div>
</template>

<script>
  import { main } from '../../../../config/game';
  // import { main } from '@@@/game';
	export default {
		name: "game",
    data(){
		  return {
        main:main,
      }
    }
	}
</script>

<style scoped>

</style>
