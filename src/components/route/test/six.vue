<template>
    <div>.
        <Button @click="startTest"> 测试数据加载进度条</Button>
        <Button @click="startTestOK"> 京都条OK</Button>
    </div>
</template>

<script>
	export default {
		name: "six",
        data(){
		    return {
		        start:20,
                percent:0,
                isOk:false,
                status:false,
            }
        },
        created:function () {
            setTimeout(()=>{ this.status = true},2000)
        },
        methods:{
            startTest(){
                this.$store.commit({
                    type:'startLoadstatus',
                    start:true,
                    status:false,
                })
            },
            startTestOK(){
                this.$store.commit({
                    type:'startLoadstatus',
                    start:true,
                    status:true,
                })
            }
        }

	}
</script>

<style scoped>

</style>
