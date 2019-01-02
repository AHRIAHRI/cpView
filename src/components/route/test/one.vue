<template>
  <div>
    {{abc}}
  </div>

</template>

<script>
    import API  from '../../../mode/request';
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
                API.POST('/test/set',{data:111,data2:1231}).then(
                    (response) => {
                        this.abc = response.data;
                    }
                )
            },

	}
</script>

<style scoped>

</style>
