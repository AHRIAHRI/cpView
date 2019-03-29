<template>
    <div>
   <CustomSelectTable :showTitle="showTitle" :showData = "showData"/>
    </div>
</template>
<script>
	export default {
		data () {
			return {
				showTitle:[
					{
						title:'增加',
			            key:'zengjia',         // 英文 label 使用 ，对应上后面的key
				        defalut:true,       // boole 默认是否显示
				        desc:'',  // 默认是否选择
				        otherOptions:{      // 其它的选项加入到附a加选项中
				            width: 150,
					        sortable: true,
					        fixed: 'left'
			            }
		            },
					{
						title:'总量',
						key:'k1',         // 英文 label 使用 ，对应上后面的key
						defalut:true,       // boole 默认是否显示
						desc:'',  // 默认是否选择
						otherOptions:{      // 其它的选项加入到附a加选项中
							width: 150,
							sortable: true,
							fixed: 'left'
						}
					},
					{
						title:'新增创角',
						key:'k2',         // 英文 label 使用 ，对应上后面的key
						defalut:false,       // boole 默认是否显示
						desc:'我不说你也懂吧！',  // 默认是否选择
						otherOptions:{      // 其它的选项加入到附a加选项中
							width: 150,
							sortable: true,
							fixed: 'left'
						}
					},					{
						title:'新增充值',
						key:'k3',         // 英文 label 使用 ，对应上后面的key
						defalut:false,       // boole 默认是否显示
						desc:'',  // 默认是否选择
						otherOptions:{      // 其它的选项加入到附a加选项中
							width: 150,
							sortable: true,
							fixed: 'left'
						}
					},


					{
						title:'减少',
						key:'jians',         // 英文 label 使用 ，对应上后面的key
						defalut:true,      // boole 默认是否显示
						desc:'当天新增创角玩家当天充值金额',  // 默认是否选择
						otherOptions:{      // 其它的选项加入到附加选项中
							width: 150,
							fixed: 'right',
						}
					},

                ],
				showData: [
                    { zengjia:1111,jians:'121231231'},
                    { zengjia:'aaaa',jians:'bbbbbbbb'},
                ],

			}
		},
	}
</script>
