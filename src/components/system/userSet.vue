<template>
    <div style="width: 50% ;margin: auto">
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
            <Divider orientation="left">
            <i style="color: #e41028;">修改你的信息</i>
            </Divider>

        <Form ref="formItem" :model="formItem"  style="width:300px ; margin: auto" :label-width="80"  >
            <FormItem label="选择项目">
                <Select v-model="formItem.selectProject" clearable style="width:200px">
                    <Option v-for="item in projectList" :value="item.projectCode" :key="item.projectCode">{{item.projectName}}</Option>
                </Select>
            </FormItem>
            <Divider orientation="left">修改基础登录信息
            </Divider>
            <FormItem label="手机号码">
                <Input v-model="formItem.tel" clearable placeholder="按需修改你的手机号码"></Input>
            </FormItem>

            <FormItem label="新的密码">
                <Input type="password" v-model="formItem.passwd" clearable placeholder="按需修改你的密码"></Input>
            </FormItem>
            <FormItem>
                <Button type="success" @click="userModifySubmit('formItem')" long >提交修改</Button>
            </FormItem>
        </Form>
        <Divider orientation="left">
        </Divider>
<!--{{formItem}}-->
        <div v-if="master">
            <div  style="width: 80% ; margin: auto">
                <Table size="small" border :columns="projectData.columns" :data="projectData.data" >
                </Table>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "useSet",
        data(){
		    return {
                formItem:{
                    tel:'',
                    selectProject:'',
                    passwd:'',
                    master:true,
                },
                title:'',
                columns:[
                    {slot:"slot-menuController",maxWidth:200,align:'center'},
                    {slot:"slot-menuSub",align:'center', },

                ],
                arr:[],
                isShow:false,
                master:false,
                projectList:[],
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
                        // {title:'项目下有的平台/渠道权限',align:'center',
                        //     render: (h, params) => {
                        //         let temp = [] ;
                        //         for (let item of params.row.projects){
                        //             if(item.owner){
                        //                 temp.push(item.projectName);
                        //             }
                        //         }
                        //         return h('div', {
                        //             props: {type:'ios-cog-outline',size:30},
                        //             on: {
                        //                 click: () => {this.showUserPlatChannel(params.row.user)}
                        //             }
                        //         },temp.join(',') ? '默认为所有' : '先选择一个项目');
                        //     }
                        // },
                    ],
                    data:[
                    ],
                },
            }
        },
        created:function () {
		    this.masterData();
		    this.$API.POST('/sys/useSet/userInfoList').then(({data}) => {
                this.projectList = data.projectList;
            });

        },
        methods:{
		    // TODO 验证通过之后进行体提交
            modifyUserAffiliation(val){
                this.title = '给用户 [ '+val.user+' ] 项目授权';
                this.isShow = true;
                this.user = val.user;
                this.arr = val.projects;
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

            userModifySubmit(formItem){
                this.$API.POST('/sys/useSet/changeInfo',this.formItem).then(({data})=>{
                    data.passwdStatus ? this.$Notice.success({title:'用户密码修改成功'}) : '';
                    data.selectProjectStatus ? this.$Notice.success({title:'选择项目信息修改成功'}) : '' ;
                    data.telStatus ? this.$Notice.success({title:'电话信息修改成功'}) : '' ;
                    // 修改成功的话 把新的选着写入 localStorage ,
                    if(data.selectProjectStatus){
                        // 从本地的选择判断，新选择的项目，因为是请求成功之后的回调，所以数据是一样的.
                        for (let item of this.projectList) {
                            if (item.projectCode === this.formItem.selectProject) {
                                this.$Util.setStorage({
                                    selectProject: item.projectCode,
                                    selectProjectName: item.projectName
                                });
                            }
                        }
                        this.$Util.windowsReload();
                    }
                })
            },
            masterData(){
                // TODO  页面整合到一起
                this.$API.POST('/sys/useSet/isMaster').then(({data})=>{
                    this.master = data.isMaster;    // 是否为master
                    this.projectData.data = data.masterData;  // 如果是继续返回授权列表
                })
            },
        }
	}
</script>

<style scoped>

</style>
