<template>
    <div>
        <Modal v-model="isShow" width="50%" :closable="false" stripe>
            <p slot="header" style="color:#ed4014;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>{{title}}</span>
            </p>
            <Table border :columns="table1.columns" :data="data">
                <template slot-scope="{ index }"  slot="project">
                    开启整个项目
                    <i-switch v-model="data[index].all" @on-change="change" />
                </template>
                <template slot-scope="{index}"  slot="plat">
                    <!--开启整个平台-->
                    <platAndChannel ref="platAndChannel"  v-model="data[index].plats" ></platAndChannel>
                    <!--<Table :columns="table2.columns" :data="data[index].plats">-->

                    <!--</Table>-->
                </template>

                <!--<template slot-scope="{ index }" slot="plat">-->
                    <!--<platAndChannel v-model="table1.data[index].plat"></platAndChannel>-->
                <!--</template>-->s
            </Table>
            {{data}}
            <div slot="footer" style="width:8%;margin-left: auto;" >
                <Button type="error" long @click="commitModify">确定</Button>
            </div>
        </Modal>


    </div>
</template>

<script>
	export default {
		name: "AuthorizationPlatChannel",
        data(){
            return {
                isShow: false,
                title: '',
                data: [],
                table1: {
                    columns: [
                        {title: '',align:'center',slot:'project',maxWidth:200},
                        {title: '',align:'center',slot:'plat'},
                        // {title: '渠道',align:'center',slot:'channel'},
                    ],
                    data :[],
                },
                table2: {
                    columns: [
                        // {title: '全部项目',align:'center',slot:'project'},
                        // {title: '平台',align:'center',slot:'plat'},
                        // {title: '渠道',align:'center',slot:'channel'},
                    ],
                },



                }
            },
        methods:{

            loadFatherData(data){
                this.isShow = true ;
                this.title = '给用户[ ' + data.user + ' ]平台渠道授权';
                this.data = [data.platChannel];
            },
            commitModify(){
                this.isShow = false;
            },
            change(status){
                this.$refs.platAndChannel.getprojectDisabled(status)
            }
        }
	}
</script>

<style scoped>

</style>
