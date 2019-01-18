<template>
    <div>
        <Button type="primary" size="large" @click="exportData"><Icon type="ios-download-outline"></Icon>导出数据</Button>
        <Table border :columns="columns1" :data="abc" size="small" ref="table" ></Table>

    </div>
</template>

<script>
	export default {
		name: "interface",
        data(){
		    return {
		        abc:[],
                columns1:[
                    {title:'菜单名', key: 'alias', sortable: true},
                    {title:'控制器', key: 'contr', sortable: true},
                    {title:'子菜单名', key: 'name', sortable: true} ,
                    {title:'视图地址', key: 'subMeun', sortable: true},
                ],
            }
        },
        created:function () {
            for (let items of this.$store.state.menu) {
                for (let subitems of items.subMeun) {
                    this.abc.push({alias: items.alias, contr: items.name, name:subitems.alias, subMeun: subitems.addr})
                }
            }
        },
        methods:{
		    exportData(){
		        this.$refs.table.exportCsv({
                filename: '排序之后的数据',
                original: false
            });}
        }
	}
</script>

<style scoped>

</style>
