<template>
    <div>
        <CustomModelShowTable :isShow="showRoleAclData.isShow" :title="showRoleAclData.title" :data="showRoleAclData.data" :footerName="showRoleAclData.footerName" @closeModel="closeRoleAcl"></CustomModelShowTable>
        <CustomModelDelete  :isShow="deleteRoleAclData.isShow" :title="deleteRoleAclData.title" :data="deleteRoleAclData.data" :footerName="deleteRoleAclData.footerName" :remoteAddr="deleteRoleAclData.remoteAddr" @closeModel="closeRoleAcl" @sureDelData="deleteRole" ></CustomModelDelete>
        <Collapse simple v-model="defaultPanel"  accordion>
            <Panel name="1">
                添加 / 删除 / 修改 角色
                <div slot="content"  >

                    <Form ref="roleAdd" :model="roleAdd" :rules="ruleroleAdd" :label-width="80" style="width: 30% ; margin: auto">
                        <FormItem label="角色名" prop="roleName">
                            <Input v-model="roleAdd.roleName" placeholder="输入角色名"></Input>
                        </FormItem>
                        <FormItem label="角色名(中文)" prop="alias">
                            <Input v-model="roleAdd.alias" placeholder="输入角色名(中文)" ></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="success" @click="roleAddSubmit('roleAdd')" long >添加</Button>
                        </FormItem>
                    </Form>
                    <!--<Divider style="width: 80% ; margin: auto"></Divider>-->
                    <div  style="width: 40% ; margin: auto">
                        <Table size="small" border :columns="role.columns" :data="role.data" ></Table>
                    </div>
                </div>

            </Panel>
            <Panel name="2">
                添加 / 删除 / 修改 用户
                <div slot="content">
                    <div style="width: 40% ; margin: auto">
                        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                            <FormItem label="UserName" prop="UserName">
                                <Input v-model="formCustom.UserName" placeholder="约定为姓名拼音 "></Input>
                            </FormItem>
                            <FormItem label="Password" prop="passwd">
                                <Input type="password" v-model="formCustom.passwd" placeholder="请输入密码" ></Input>
                            </FormItem>
                            <FormItem label="Confirm" prop="passwdCheck"  >
                                <Input type="password" v-model="formCustom.passwdCheck" placeholder="密码确认"></Input>
                            </FormItem>
                            <FormItem label="Tel" prop="tel">
                                <Input type="text" v-model="formCustom.tel" number placeholder="138xxxxxxxx"></Input>
                            </FormItem>
                            <FormItem label="角色" prop="selectRole">
                                <Select v-model="formCustom.selectRole" multiple>
                                    <Option v-for="item in allRoles" :value="item.value" :key="item.value">{{ item.alias }} - [ {{item.value}} ]</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="平台/渠道" prop="platChannel">
                                <Cascader :data="platChannelData" change-on-select v-model="formCustom.platChannel"></Cascader>
                            </FormItem>
                            <FormItem>
                                <Button type="success" @click="handleSubmit('formCustom')" style="width: 70%;margin-right: 9%" >添加</Button>
                                <Button @click="handleReset('formCustom')" type="warning" ghost style="width: 20%">清空输入</Button>
                            </FormItem>
                        </Form>
                    </div>

                    <div style="width: 90% ; margin: auto">
                            <Table size="small"  :columns="user.columns" :data="user.data" ></Table>
                    <!--列出所有的用户 （用户名,电话,所有平台资源,初始角色,最终权限,上一次登录时间，修改密码，修改权限，）-->
                    </div>
                </div>
            </Panel>
            <!--<div style="height: 20px"></div>-->
            <!--<Panel name="3">-->
                <!--单用户操作权限-->
                <!--<p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>-->
            <!--</Panel>-->
        </Collapse>
        <div style="height: 100px"></div>
    </div>
</template>

<script>
	export default {
		name: "userManage",
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码为空'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入你的确认密码'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('密码不一致'));
                } else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号码不能为空'));
                } else if (!Number.isInteger(value)) {
                    callback(new Error('格式不对'));
                } else {
                    callback();
                }
                // // 模拟异步验证效果
                // setTimeout(() => {
                //     if (!Number.isInteger(value)) {
                //         callback(new Error('Please enter a numeric value'));
                //     } else {
                //         callback();
                //     }
                // }, 1000);
            };
            const validateUame = (rule, value, callback) => {
                let reg = /\W/;
                if (value === '') {
                    callback(new Error('请输入你账号'));
                }else if (reg.test(value)) {
                    callback(new Error('不允许含有诡异的字符'));
                }
                callback();
            };
            const validateSelectRole = (rule, value, callback) => {
                // console.log(value);
                if(value.length === 0 ){
                    callback(new Error('选择一个身份'))
                }else {
                    callback();
                }
            };

            const validateRoleName = (rule, value, callback) => {
                callback()
            } ;
            const validateRoleAlias = (rule, value, callback) => {
                callback()
            } ;
            return {
                newPasswd:{

                },
                showRoleAclData:{
                    title:'',
                    isShow:false,
                    data:{columns:[],data:[]},
                    footerName:'关闭查看',
                },
                deleteRoleAclData:{
                    title:'确定要删除吗?',
                    isShow:false,
                    data:'',
                    footerName:'是的, 我确定！',
                },

                // 请求需要加载的数据,
                user:{
                    data:[
                        {
                            userName:'liaoxiaotao',
                            tel:1231231231,
                            platAndChannel:['融合/爱奇艺','所有'],
                            beginRole:'管理员,客服',
                            finalPermission:[
                                {alias:'详细日志',lists:['查看数据','查看日志'],},
                                {alias:'系统设置',lists:['用户设置']},
                            ]
                            ,
                            lastLogin:'1991-12-12 12:12:12',
                            lastLoginAddr:'192.138.1.1/召唤师峡谷',
                        },
                        {
                            userName:'jjjjjjj',
                            tel:12312312312,
                            platAndChannel:['融合/华为','所有'],
                            beginRole:'射击尸',
                            finalPermission:[
                                {alias:'充值分析',lists:['查看数据','查看日志'],},
                                {alias:'系统设置',lists:['用户设置']},
                                {alias:'运营数据',lists:['运营数据1','运营数据2','运营数据3','运营数据4','运营数据5','运营数据6','运营数据74','运营数据9'],},
                                {alias:'运营数据',lists:['运营数据1','运营数据2','运营数据3','运营数据4','运营数据5','运营数据6','运营数据74','运营数据9'],},
                                {alias:'运营数据',lists:['运营数据1','运营数据2','运营数据3','运营数据4','运营数据5','运营数据6','运营数据74','运营数据9'],},
                                {alias:'玩家分析',lists:['查看数据','查看日志'],},
                                {alias:'系统设置',lists:['用户设置']},
                            ],
                            lastLogin:'1991-12-12 12:12:12',
                            lastLoginAddr:'192.138.1.1/召唤师峡谷',
                        },
                    ],
                    columns:[
                        { title: '用户名', key: 'userName',align: 'center'},
                        { title: '电话', key: 'tel',align: 'center'},
                        { title: '上一次登录时间', key: 'lastLogin',align: 'center',minWidth:120},
                        { title: '上一次登录地址', key: 'lastLoginAddr',align: 'center',minWidth:120},
                        { title: '角色分配',align: 'center',
                            render: (h, params) => {
                                return h('div', {
                                    props: {type:'ios-ulock-outline',size:24},
                                    on: {
                                        click: () => {this.modifyUserRole(params.row)}
                                    }
                                }, params.row.beginRole);
                            }
                        },
                        { title: '平台权限', key: 'abc',align: 'center',
                            render: (h, params) => {
                                return h('Icon', {
                                    props: {type:'ios-eye-outline',size:24,},
                                    on: {
                                        click: () => {this.showUserPlatAccess(params.row)}
                                    }
                                }, '点击查看');
                            }
                        },
                        { title: '查看权限',align: 'center',
                            render: (h, params) => {
                                return h('Icon', {
                                    props: {type:'md-eye',size:24},
                                    on: {
                                        click: () => {this.showUserFinalAcl(params.row)}
                                    }
                                }, '点击查看');
                            }
                        },
                        { title: '修改权限', key: 'abc',align: 'center',
                            render: (h, params) => {
                                return h('Icon', {
                                    props: {type:'ios-cog-outline',size:24},
                                    on: {
                                        click: () => {this.modifyUserPermission(params.row)}
                                    }
                                }, '添加/删除权限');
                            }
                        },
                        { title: '修改密码',align: 'center', maxWidth:100,
                            render: (h, params) => {
                                return h('Icon', {
                                    props: {type:'ios-finger-print',size:24,color:'#445051'},
                                    on: {
                                        click: () => {this.modifyUserPasswd(params.row.userName)}
                                    }
                                }, '修改Ta的密码');
                            }
                        },
                        { title: '删除用户',align: 'center',maxWidth:100,
                            render: (h, params) => {
                                return h('Icon', {
                                    props: {type:'md-close',size:24 ,color:'#e42a18'},
                                    on: {
                                        click: () => {this.deleteUser(params.row.userName)}
                                    }
                                }, '删除用户');
                            }
                        },

                    ]
                },
                role:{
                    data:[
                        {
                        roleName:'admin',
                        alias:'管理员',
                        // 列出角色所有的权限,
                        showAcl:[
                            {alias:'详细日志',lists:['查看数据','查看日志'],},
                            {alias:'运营数据',lists:['运营数据1','运营数据2','运营数据3','运营数据4'],},
                            {alias:'玩家分析',lists:['查看数据','查看日志'],},
                            {alias:'系统设置',lists:['用户设置']},
                        ],
                        modifyAcl:'',
                        delRole:'',
                    },
                    ],
                    columns:[
                        { title: '角色', key: 'roleName',align: 'center'},
                        { title: '中文名', key: 'alias',align: 'center'},
                        { title: '所有权限', key: 'showAcl',align: 'center',
                            render: (h, params) => {
                                return h('Icon', {
                                    props: {type:'md-eye',size:24,},
                                    on: {
                                        click: () => {this.showRoleAcl(params.row.showAcl)}
                                    }
                                }, '点击查看');
                                }
                            },
                        { title: '修改权限', key: 'modifyAcl',align: 'center',
                            render: (h, params) => {
                                return h('Icon', {
                                    props: {type:'ios-cog-outline',size:24 },
                                    on: {
                                        click: () => {this.modifyRoleAcl(params.row)}
                                    }
                                }, '点击修改');
                            }
                            },
                        { title: '删除角色', key: 'modifyAcl',align: 'center',
                            render: (h, params) => {
                                return h('Icon', {
                                    props: {type:'md-close',size:24 ,color:'#e42a18'},
                                    on: {
                                        click: () => {this.deleteRoleAcl(params.row)}
                                    }
                                }, '删除该角色');
                            }},
                    ],

                },
                allPermisssion:['所有的权限'],

                platChannelData:[
                    {
                        value: 'beijing',
                        label: '北京',
                        children: [
                            {
                                value: 'gugong',
                                label: '故宫'
                            },
                            {
                                value: 'tiantan',
                                label: '天坛'
                            },
                            {
                                value: 'wangfujing',
                                label: '王府井'
                            }
                        ]
                    }],
                allRoles:[
                    {value:'kefu',alias:'客服'},
                    {value:'admin',alias:'管理员'},
                    {value:'yinyun',alias:'营运'},
                ],

                defaultPanel:[2],
                allowcommit:false,
                formCustom: {
                    passwd: '',
                    passwdCheck: '',
                    tel: '',
                    UserName:'',
                    selectRole:[],
                },
                roleAdd:{
                    roleName:'',
                    alias:'',
                },
                ruleroleAdd:{
                    roleName:[{ validator: validateRoleName, trigger: 'blur' }],
                    alias:[{ validator: validateRoleAlias, trigger: 'blur' }],

                },
                ruleCustom: {
                    UserName: [
                        { validator: validateUame, trigger: 'blur' }
                    ],
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    tel: [
                        { validator: validateAge, trigger: 'blur' }
                    ],
                    // selectRole: [
                    //     { validator: validateSelectRole, trigger: 'blur' }
                    // ]
                }
            }
        },
        methods: {
            deleteRole(val){
                // 删除游戏逻辑
                this.deleteRoleAclData.isShow = false;
                // this.$API.POST(val[0],val[1]).then(({data}) => {
                //     if(data === 'success'){
                        this.$Message.warning({
                            content:'操作成功<br> 请求地址: '+val[0] + '<br>请求地址参数'+ JSON.stringify(val[1]),
                        })
                //     }else{
                //         this.$Message.error({
                //             content:data,
                //         })
                //     }
                // })
            },
            closeRoleAcl(){
                this.showRoleAclData.isShow = false;
                this.deleteRoleAclData.isShow = false;
            },
            showRoleAcl(val){
                let arr = [] ;
                for(let temp of val){
                    for (let temp1 of temp.lists){
                        arr.push({menu:temp.alias,subMenu:temp1})
                    }
                }

                // 对话框表单格式
                this.showRoleAclData.data.columns = [
                    {title: '类目', key: 'alias', sortable: true , maxWidth:100,
                        render: (h, params) => {
                            return h('strong',{style:{color:'#2db7f5'}}, params.row.alias);
                        }
                    },
                    {title: '子项目', key: 'lists',
                        render: (h, params) => {
                            return h('div', params.row.lists.join(' , '));
                        }},
                ];
                this.showRoleAclData.data.data = val;
                this.showRoleAclData.title = '查看角色所有权限';
                this.showRoleAclData.footerName = '关闭查看';
                this.showRoleAclData.isShow = true;
            },
            // TODO 修改角色权限
            modifyRoleAcl(val){

            },
            deleteRoleAcl(val){
                this.deleteRoleAclData.isShow = true;
                this.deleteRoleAclData.title =  '确定删除 '+val.alias+'- [ ' + val.roleName + ' ]  吗?';
                this.deleteRoleAclData.remoteAddr = ['/sys/userManage/roledel',{role:'liaoxia'}];
                this.deleteRoleAclData.data = '所有拥有该角色的用户权限都将失效,继续吗?';
            },
            showUserPlatAccess(val){
                this.$Modal.info({
                    title: val.userName + '可以操作的平台',
                    content: val.platAndChannel.join(' , '),
                })
            },
            modifyUserRole(val){
                alert('功能完善中');
            },
            showUserFinalAcl(val){
                let arr = [] ;
                for(let temp of val.finalPermission){
                    for (let temp1 of temp.lists){
                        arr.push({menu:temp.alias,subMenu:temp1})
                    }
                }

                // 对话框表单格式
                this.showRoleAclData.data.columns = [
                    {title: '类目', key: 'alias', sortable: true,maxWidth:100,
                        render: (h, params) => {
                            return h('strong',{style:{color:'#2db7f5'}}, params.row.alias);
                            }
                        },
                    {title: '子项目', key: 'lists',
                        render: (h, params) => {
                            return h('div', params.row.lists.join(' , '));
                            }
                        },
                ];
                this.showRoleAclData.data.data = val.finalPermission;
                this.showRoleAclData.title = '查看'+val.userName+'最终权限';
                this.showRoleAclData.footerName = '关闭查看';
                this.showRoleAclData.isShow = true;
            },
            // TODO 修改用户权限
            modifyUserPermission(){

            },
            modifyUserPasswd(userName){
                this.$Modal.confirm({
                    title:userName+' 的新密码',
                    width:'600',
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.newPasswd.userName,
                                type:'password',
                                autofocus: true,
                                placeholder: '必须大于8位！数字和字母混合'
                            },
                            on: {
                                input: (val) => {
                                    this.newPasswd.userName = val;
                                }
                            }
                        })
                    },
                    onOk: () => {
                        // TODO 判断密码是否为空
                        if(typeof this.newPasswd.userName === "undefined") {
                            this.$Message.error({content: '密码未定义,取消修改',});
                            this.$Modal.remove();
                        }else if(this.newPasswd.userName.length <= 8){
                            this.$Message.error({content: '密码太短,取消修改',});
                            this.$Modal.remove();
                        }else {
                            //     this.$API.POST('/sys/userManage/modifyOtherPasswd',{userName:userName,newPasswd:this.newPasswd.userName}).then(({data})=>{
                            //         if(data === 'success'){
                            this.$Message.info({
                                content: '操作成功<br> 请求地址: ' + userName + '<br>请求地址参数' + this.newPasswd.userName,
                            })
                            //         }else {
                            //             this.$Message.error({
                            //                 content:data,
                            //             })
                            //         }
                            //     }
                            // );
                        }
                    }
                })
            },
            deleteUser(val){
                this.deleteRoleAclData.isShow = true;
                this.deleteRoleAclData.title = '确定删除'+val+'吗?';
                this.deleteRoleAclData.remoteAddr = ['/sys/userManage/userdel',{user:val}];
                this.deleteRoleAclData.data = '所有项目的 ' + val + ' 用户都无法登录,确定吗?';
            },

            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('');
                        this.$API.POST('/sys/userManage/useradd',this.formCustom).then(({data}) => {
                            if(data === 'success'){
                                this.$Message.success('添加用户成功');
                                // TODO 刷新数据

                                // 登录成功之后刷新数据
                                this.$refs[name].resetFields();
                            }else{
                                this.$Message.error('添加用户失败'+ data )
                            }
                        }).then((response) =>{
                            this.$Message.error('异常的请求' + response.status);}
                        )
                    } else {
                        // console.log(valid);
                        this.$Message.error('提交被拒绝, 请正确填写格式');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            roleAddSubmit(role){
                this.$API.POST('/sys/userManage/roleadd').then(({data})=>{
                    // 处理逻辑
                });
            },
            getData(){
                this.$API.POST('/sys/userManage/roleUserInfo').then(({data})=>{
                        this.role.data = data.roleList ;               // 角色列表，包含角色的具体信息,提供权限是否选择的键值对。
                        this.user.data = data.userList ;               // 用户列表，包含用户的具体信息,
                        this.platChannelData = data.platChannelData ;  // 创建用户的时候提供选择的平台和渠道
                });
            }
        },
        computed:{},
        mounted:function(){},
        created:function(){},
	}
</script>

<style scoped>

</style>
