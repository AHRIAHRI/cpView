<template>
    <div>
      game路由组件 ,{{main}}
    </div>
</template>

<script>
	export default {
		name: "game",
    data(){
		  return {
        main:process.env.NODE_ENV,
      }
    }
	}
</script>

<style scoped>

</style>
