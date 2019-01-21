<template>

    <div>
        <!--<div>大师才可以访问</div>-->
        <Modal v-model="isShow" width="30%" :closable="false"  stripe>
            <p slot="header" style="color:#ed4014;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>{{title}}</span>
            </p>
            <div style="width:80%;margin:auto" >
                <Table :columns="columns" border :data="arr" :disabled-hover="true">
                    <template slot-scope="{ row}" slot="slot-menuController" >
                        <strong>{{row.projectName}}</strong>
                    </template>
                    <template slot-scope="{ index }" slot="slot-menuSub" >
                        <i-switch v-model="arr[index].owner" ></i-switch>
                    </template>

                </Table>
            </div>
            <div slot="footer" style="width:8%;margin-left: auto;" >
                <Button type="error" long @click="commitModify">确定</Button>
            </div>
        </Modal>

        <!--<div>用户,所有权限。修改权限.</div>-->


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
		        title:'用户项目授权',
                isShow:false,
                columns:[
                    {slot:"slot-menuController",maxWidth:200,align:'center'},
                    {slot:"slot-menuSub",align:'center', },
                ],
                projectData:{
                    columns:[
                        {title:'用户', key:'user',align: 'center',maxWidth:100},
                        {title:'拥有项目',align: 'center',minWidth:100,
                            render: (h, params) => {
                                let temp = [] ;
                                for (let item of params.row.projects){
                                    if(item.owner){
                                        temp.push(item.projectName+'('+item.projectCode+')');
                                    }
                                }
                                return h('div', {
                                    props: {type:'ios-cog-outline',size:30},
                                    on: {
                                        click: () => {this.modifyUserAffiliation(params.row)}
                                    }
                                },temp.join(',') ? temp.join(',') : '无任何项目');
                            }}
                    ],
                    data:[
                        {user:'liaoxiaotao', projects:[
                            {projectCode:'sjjy',projectName:'圣剑纪元',owner:false},
                            {projectCode:'yhsy',projectName:'永恒圣域',owner:true},

                            ]},
                        {user:'liaoxiaotao2', projects:[
                                {projectCode:'sjjy',projectName:'圣剑纪元',owner:false},
                                {projectCode:'yhsy',projectName:'永恒圣域',owner:true},

                            ]}

                    ],
                },
            }
        },
        methods:{
		    // 对话框修改
            modifyUserAffiliation(val){
                this.title = '給用户 [ '+val.user+' ] 项目授权';
                this.isShow = true;
                this.user = val.user;
                this.arr = val.projects;
            },
            commitModify(){
                this.isShow = false;
                this.$Notice.error({
                    title:'通知对象为'+this.user,
                    duration:0,
                    desc:JSON.stringify(this.arr),
                });

            }
        }

	}
</script>

<style scoped>

</style>
