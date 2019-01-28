<template>
    <div>
        <!--<CustomModelShowTable  ref="modelShow" ></CustomModelShowTable>-->
        <ChangeUserRole ref="changeUserRole" @commitModify="commitModify" ></ChangeUserRole>
        <CustomModelDelete  ref="modelDelete"  @sureDelData="deleteRole" ></CustomModelDelete>
        <ModelAuthorize ref="modifyAuthorize"  @commitModify="modifyRolePermission"></ModelAuthorize>
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
                            <FormItem>
                                <Button type="success" @click="handleSubmit('formCustom')" style="width: 70%;margin-right: 9%" >添加</Button>
                                <Button @click="handleReset('formCustom')" type="warning" ghost style="width: 20%">清空输入</Button>
                            </FormItem>
                        </Form>
                    </div>

                    <div style="width: 90% ; margin: auto">
                            <Table size="small"  :columns="user.columns" :data="user.data" ></Table>
                    </div>
                </div>
            </Panel>
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
                // 请求需要加载的数据,
                user:{
                    data:[
                        // {
                        //     userName:'liaoxiaotao',
                        //     tel:1231231231,
                        //     platAndChannel:['融合/爱奇艺','所有'],
                        //     userRole:[{role:'admin',status:true,roleName:'管理员'},{role:'kefu',status:true,roleName:'客服'}],
                        //     // lastLogin:'1991-12-12 12:12:12',
                        //     // lastLoginAddr:'192.138.1.1/召唤师峡谷',
                        // },
                        // {
                        //     userName:'jjjjjjj',
                        //     tel:12312312312,
                        //     platAndChannel:['融合/华为','所有'],
                        //     userRole:[{role:'admin',status:true,roleName:'管理员'},{role:'kefu',status:true,roleName:'客服'}],
                        //     // lastLogin:'1991-12-12 12:12:12',
                        //     // lastLoginAddr:'192.138.1.1/召唤师峡谷',
                        // },
                    ],
                    columns:[
                        { title: '用户名', key: 'userName',align: 'center'},
                        { title: '电话', key: 'tel',align: 'center'},
                        // { title: '上一次登录时间', key: 'lastLogin',align: 'center',minWidth:120},
                        // { title: '上一次登录地址', key: 'lastLoginAddr',align: 'center',minWidth:120},
                        { title: '角色分配',align: 'center',
                            render: (h, params) => {
                                // 遍历出存在的uese列表，
                                let temp = [];
                                for (let item1 of params.row.userRole){
                                    if(item1.status){
                                        temp.push(item1.roleName)
                                    }
                                }
                                return h('div', {
                                    props: {type:'ios-ulock-outline',size:24},
                                    on: {
                                        click: () => {this.modifyUserRole(params.row)}
                                    }
                                }, temp.join(',') ? temp.join(',') : '无角色权限' );
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
                        // {
                        // roleName:'admin',
                        // roleAlias:'管理员',
                        // // 列出角色所有的权限,
                        // modifyAcl:[
                        //     {menu:'充值分析',subMenu:[
                        //             ['/data/game/payer','物品货币',false],
                        //             ['/data/game/payer','商城分析',true],
                        //             ['/data/game/money','回本分析',true],
                        //         ]
                        //     },
                        //     {menu:'详细日志',subMenu:[['/data/log/daily','充值日志',true]]},
                        //     ],
                        // },
                    ],
                    columns:[
                        { title: '角色', key: 'roleName',align: 'center'},
                        { title: '中文名', key: 'roleAlias',align: 'center'},
                        { title: '查看/修改权限', key: 'modifyAcl',align: 'center',
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
		    /**
             *   删除角色
             */

            deleteRole(val){
                // 删除游戏逻辑
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

            // TODO 修改角色权限
            modifyRoleAcl(val){
                let temp = {}  ;
                temp.title = '修改的权限将影响所有拥有该角色的用户!';
                temp.other = val.roleName;
                temp.arr = val.modifyAcl ;
                this.$refs.modifyAuthorize.loadFatherData(temp);
            },

            deleteRoleAcl(val){
                let temp = {};
                temp.isShow = true;
                temp.title =  '确定删除 '+val.alias+'- [ ' + val.roleName + ' ]  吗?';
                temp.remoteAddr = ['/sys/userManage/roledel',{role:'liaoxia'}];
                temp.data = '所有拥有该角色的用户权限都将失效,继续吗?';
                temp.footerName = '确定';
                this.$refs.modelDelete.loadFatherData(temp);
            },

            // 修改角色或者用户权限，
            modifyRolePermission(acl,role){
                this.$API.POST('/sys/userManage/modifyRolePermission',{role:role,newAcl:acl}).then(({data})=>{
                    if(data){
                        this.getData(); //操作成功之后重新刷新数据
                        this.$Notice.success({title:'操作成功',});
                    }else {
                        this.$Notice.error({title:'操作异常',});
                    }
                    }
                );

            },

            /**
             * User处理 ,
             * -----------------------------------------------------------------------
             * 用户角色分配按钮
             */
            modifyUserRole(val){
                let temp = {} ;
                temp.isShow = true;
                temp.title = '为用户选择角色';
                temp.arr = val.userRole;
                temp.userInfo = val.userName;
                this.$refs.changeUserRole.loadFatherData(temp);
            },

            /**
             * 提交确认修改用户角色
             * @param arr
             * @param userInfo
             */
            commitModify(arr,userInfo){
                this.$Notice.error({
                    title:'通知对象为'+JSON.stringify(userInfo),
                    duration:0,
                    desc:JSON.stringify(arr),
                });
            },
            /**
             * 修改用户密码
             * @param userName
             */
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

            /**
             * 显示用户可以操作的平台
             */
            showUserPlatAccess(val){
                this.$Modal.info({
                    title: val.userName + '可以操作的平台',
                    content: val.platAndChannel.join(' , '),
                })
            },


            /**
             * 删除用户按钮
             * @param val
             */
            deleteUser(val){
                let temp = {};
                temp.isShow = true;
                temp.title = '确定删除'+val+'吗?';
                temp.remoteAddr = ['/sys/userManage/userdel',{user:val}];
                temp.data = '所有项目的 ' + val + ' 用户都无法登录,确定吗?';
                temp.footerName = '确定';
                this.$refs.modelDelete.loadFatherData(temp);
            },

            /**
             * 注册和提交
             * -----------------------------------------------------------------------
             * @param name
             */
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
                this.$API.POST('/sys/userManage/roleadd',this.roleAdd).then(({data})=>{
                    if(data.status){
                        this.getData();
                        this.$Message.success('角色添加成功');
                    }else{
                        this.$Message.error('角色添加失败 '+data.mesg);
                    }
                });
            },
            getData(){
                this.$API.POST('/sys/userManage/roleUserInfo').then(({data})=>{
                        this.role.data = data.roleList ;               // 角色列表，包含角色的具体信息,提供权限是否选择的键值对。
                        this.user.data = data.userList ;               // 用户列表，包含用户的具体信息,
                });
            }
        },
        computed:{},
        mounted:function(){},
        created:function(){
		    this.getData();
        },
	}
</script>

<style scoped>

</style>
