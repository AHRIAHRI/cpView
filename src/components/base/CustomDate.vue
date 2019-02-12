<template>
    <div>
        <Tooltip max-width="200" placement="right" theme="light" :disabled="tipShow" >
            <div slot="content">
                <h3 style="color: #19be6b">点击图标切换时间选择器</h3>
                <div>区间选择器&nbsp<i style="color: #19be6b">(右下角可以继续选择区间当天的时分秒)</i></div>
                <div>多天选择器&nbsp<i style="color: #19be6b">(多次单击可多选,只可以选择整天)</i></div>
            </div>

        <DatePicker split-panels v-show="disable"  type="datetimerange" placeholder="区间选择器" style="width: 300px" @on-change="changeTime" v-model="value"  ></DatePicker>
        <DatePicker show-week-numbers v-show="!disable" type="date" multiple placeholder="多天选择器" style="width: 300px" @on-change="changeTime" v-model="value"  ></DatePicker>
        &nbsp&nbsp
        <Button size="small" shape="circle" icon="ios-switch-outline"  @click="changeSelectTimeController"></Button>
        </Tooltip>

    </div>
</template>
<script>
	export default {
		name: "CustomDate",
        data(){
		    return {
                disable:true,
                tipShow:false,
                value:'',
            }
        },
        methods: {
            changeSelectTimeController(){
                this.tipShow = true ;
                this.value='';
                this.disable = !this.disable ;
                this.$emit('send_time', '');
            },
            changeTime(time) {
                this.tipShow = true ;
                    this.$emit('send_time', time);
            },
        },
        computed:{

        }
	}
</script>

<style scoped>

</style>
