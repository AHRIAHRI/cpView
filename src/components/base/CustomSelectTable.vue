<template>
    <div>

        <Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns" size="small" >
            <slot></slot>
            <Tooltip max-width="500"  v-for = "(item, key, index) in allTitle " :key="key" :content="item.desc" placement="top"  :delay="500" :disabled="item.desc === ''">
            <Checkbox :label="item.label" >{{item.alias}}</Checkbox>
            </Tooltip>
            <Tooltip content="导出CVS文件" placement="top" ><Icon type="md-download"  :delay="1500" @click="exportData"></Icon></Tooltip>

        </Checkbox-group>

        <Table :data="gettableData2" :columns="tableColumns2" size="small" ref="table" border></Table>
    </div>
</template>
<script>
	export default {
		name:'CustomSelectTable',
		data () {
			return {
				allTitle:[],
				tableData2: this.showData,
				tableColumns2: [],
				tableColumnsChecked: [],
			}
		},
		/**
		 * title data
		 [
		    {
             title:‘增加留存',
             key:'show',         // 英文 label 使用 ，对应上后面的key
             defalut:true,       // boole 默认是否显示
             desc:'提示文字字段',  // 默认是否选择
             otherOptions:{      // 其它的选项加入到附加选项中
                 width: 150,
                 sortable: true
                 }
             },
		 ]
		 *
		 *
		 */
		props:['showTitle','showData'],
        computed:{
	        gettableData2(){
                return this.showData;
            }
        },
		methods: {
			// 处理输入的请求项
			handleShowOptions(){
				let allTitle = [];
				this.showTitle.forEach(item => {
					allTitle.push({label:item.key,alias:item.title,desc:item.desc})
				}) ;
				this.allTitle = allTitle ;
			},
			// 处理是否为默认的选项
			handleSelectOptions(){
				let selectTitle = [];
				this.showTitle.forEach(item => {
					if(item.defalut) {
						selectTitle.push(item.key)
					}
				}) ;
				this.tableColumnsChecked = selectTitle ;
			},
			// 处理栏位
			handleColumns(){
				let Columns = [] ;
				this.showTitle.forEach(item => {
					if(this.$Util.arrayHas(this.tableColumnsChecked,item.key)) {
						Columns.push(Object.assign({title: item.title, key: item.key}, item.otherOptions))
					}
				}) ;
				// console.log(JSON.stringify(Columns));
				return Columns ;
			},
			changeTableColumns () {
				// TODO 正常来讲第一个列表都应该给与显示,不管你选择是与否
				this.tableColumns2 = this.handleColumns();
			},
			exportData(){
				this.$refs.table.exportCsv({
					filename: '自定义数据_'+this.$Util.time(),
					original: false
				});
			}
		},
		created () {
			this.handleShowOptions();
			this.handleSelectOptions();
			this.changeTableColumns();
		}
	}
</script>
