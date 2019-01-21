<template>
    <div>
        测试4
        <modelAuthorize v-model="data"></modelAuthorize>
        {{data}}
    </div>
</template>

<script>
	export default {
		name: "four",
        data(){
		    return {
                data:[
                    {menu:'充值分析',subMenu:[
                            ['/data/game/payer','物品货币',false],
                            ['/data/game/payer','商城分析',true],
                            ['/data/game/money','回本分析',true],
                        ]
                    },
                    {menu:'详细日志',subMenu:[['/data/log/daily','充值日志',true]]},
                ],
            }
        }
	}
</script>

<style scoped>

</style>
