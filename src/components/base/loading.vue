<template>
    <div v-show="show">
        <Spin fix>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>龟速加载中...</div>
    </Spin>
        <!--数据加载中-->

    </div>
</template>

<script>
	export default {
		name: "loading",
        data(){
		    return {
		        // show:true,
            };
        },
        props:{
		    show:Boolean,
		}
	}
</script>

<style scoped>
    .demo-spin-icon-load{
        animation: ani-demo-spin 2s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

</style>
