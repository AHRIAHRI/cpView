<template>
    <div>.
    </div>
</template>

<script>
	export default {
		name: "six",
        data(){
		    return {

            }
        },
        created:function () {
            this.getData();
        },
        methods:{
		    getData(){
		        this.$API.POST('/test/six/allPermission').then((data)=>{
		            console.log()
                });
            }
        }
	}
</script>

<style scoped>

</style>
