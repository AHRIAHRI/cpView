<template>
  <div>
    {{abc}}
  </div>

</template>

<script>
	export default {
		name: "one",
        data(){
              return {
                abc:'11111',
          }
        },
        methods:{

        },
        mounted: function(){
                this.$API.POST('/test/set',{data:111,data2:1231}).then(
                    (response) => {
                        this.abc = response.data;
                    }
                )
            },

	}
</script>

<style scoped>

</style>
