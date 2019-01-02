<template>
    <div>


    </div>

</template>

<script>
	export default {
		name: "logout",
        data(){
		    return {
		        data:1,
            }
        },

        mounted:function () {
                localStorage.removeItem('token');
                this.$router.push('/login');
            }

    }
</script>

<style scoped>

</style>
