<template>

    <div>
        <!--<div>大师才可以访问</div>-->
        <platChange ref="platChange" @commit="getCommit"></platChange>
        <Modal v-model="isShow" width="60%" :closable="false"  stripe>
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


        <div  style="width: 80% ; margin: auto">
            <Table size="small" border :columns="projectData.columns" :data="projectData.data" >
            </Table>
        </div>
        <div v-if="loading">
            <LoadingColour :size="80"></LoadingColour>
        </div>
    </div>
</template>

<script>
	export default {
		name: "userProject",
        components:{
            platChange:()=>import('@/components/system/changePlatChange'),
        },
        data(){
		    return {
		        arr:[],
                loading:false,
		        title:'用户项目授权',
                isShow:false,
                columns:[
                    {slot:"slot-menuController",maxWidth:200,align:'center'},
                    {slot:"slot-menuSub",align:'center', },

                ],
                projectData:{
                    columns:[
                        {title:'用户', key:'user',align: 'center',maxWidth:300},
                        {title:'拥有项目权限',align: 'center',minWidth:200,
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
                            }},
                        {title:'项目下有的平台/渠道权限',align:'center',
                            render: (h, params) => {
                                let temp = [] ;
                                for (let item of params.row.projects){
                                    if(item.owner){
                                        temp.push(item.projectName);
                                    }
                                }
                                return h('div', {
                                    props: {type:'ios-cog-outline',size:30},
                                    on: {
                                        click: () => {this.showUserPlatChannel(params.row.user)}
                                    }
                                },temp.join(',') ? '默认为所有' : '先选择一个项目');
                            }
                            },
                    ],
                    data:[
                    ],
                },
            }
        },
        methods:{
		    // 对话框修改
            modifyUserAffiliation(val){
                this.title = '给用户 [ '+val.user+' ] 项目授权';
                this.isShow = true;
                this.user = val.user;
                this.arr = val.projects;
            },
            showUserPlatChannel(user){
                this.loading = true;
                this.$API.POST('/sys/userProject/platChannelList',{user:user}).then(({data})=>{
                    this.loading = false;
                    this.$refs.platChange.loadFatherData(data);
                    this.$refs.platChange.isShow = true ;
                    this.$refs.platChange.title = '分配平台权限' ;
                    this.$refs.platChange.user = user ;
                })
            },
            commitModify(){
                this.isShow = false;
                this.$API.POST('/sys/userProject/commitUserProject',{user:this.user,data:this.arr}).then(({data})=>{
                    if(data.status){
                        this.$Notice.success({title:'权限修改成功',});
                    }else{
                        this.$Notice.error({title:'未正确的修改',});
                    }
                });

            },
            createData(){
                this.$API.POST('/sys/userProject/projectUserList').then(({data})=>{
                    this.projectData.data = data;
                })
            },
            getCommit(data,user){

                this.$Notice.error({
                    title:'通知对象为'+user,
                    duration:0,
                    desc:JSON.stringify(data),
                });
            }
            // TODO 用户管理接口 有用户拥有的项目,所有用户修改项目拥有的,


        },
        created: function(){
            this.createData();
        }

	}
</script>

<style scoped>

</style>
