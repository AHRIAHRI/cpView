<template>
    <div>
        <Button @click="click">点击</Button>
        <platChange ref="platChange"></platChange>
    </div>
</template>

<script>
	export default {
		name: "four",
        components:{
		    platChange:()=>import('@/components/system/changePlatChange'),
        },
        data(){
		    return {

            }
        },
        methods:{
		    click() {
                this.$refs.platChange.isShow = true ;
                this.$refs.platChange.title = '分配平台权限' ;
                this.$API.POST('/sys/userProject/platChannelList',{user:'liaoxiaotao',porjects:'abc'}).then(({data})=>{
                    // 拿到数据之后，加载组件显示新的数据，
                    this.$refs.platChange.data = data ;
                })

            }
        }
	}
</script>

<style scoped>

</style>
