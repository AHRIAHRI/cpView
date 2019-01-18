<template>

    <div>
        <div>大师才可以访问</div>
        <div>用户,所有权限。修改权限.</div>


        <div  style="width: 50% ; margin: auto">
            <Table size="small" border :columns="projectData.columns" :data="projectData.data" ></Table>
        </div>

    </div>
</template>

<script>
	export default {
		name: "userProject",
        data(){
		    return {
                projectData:{
                    columns:[
                        {title:'用户', key:'user',align: 'center',maxWidth:100},
                        {title:'创建时间',align: 'center'},
                        {title:'上一次登录时间',align: 'center'},
                        {title:'拥有项目',align: 'center',minWidth:100,
                            render: (h, params) => {
                                return h('div', {
                                    props: {type:'ios-cog-outline',size:30},
                                    on: {
                                        click: () => {this.modifyUserAffiliation(params.row)}
                                    }
                                }, params.row.owner);
                            }}
                    ],
                    data:[
                        {user:'liaoxiaotao',
                            owner:'圣剑纪元,幻想仙侠'
                        }
                    ],
                },
            }
        },
        methods:{
		    // 对话框修改
            modifyUserAffiliation(val){
                alert('点击修改')
            }
        }

	}
</script>

<style scoped>

</style>
