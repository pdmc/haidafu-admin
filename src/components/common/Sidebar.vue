<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'project',
                        title: '项目楼盘',
                        subs: [
		                    {
		                        index: 'projectlist',
		                        title: '列表'
		                    },
                            {
                                index: 'projectadd',
                                title: '添加'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'layout',
                        title: '户型',
                        subs: [
		                    {
		                        index: 'houselayoutlist',
		                        title: '列表'
		                    },
                            {
                                index: 'houselayoutadd',
                                title: '添加'
                            }
                        ]
                    },
                    /*{
                        icon: 'el-icon-lx-calendar',
                        index: 'upload',
                        title: '图片',
                    },*/
                    {
                        icon: 'el-icon-lx-rank',
                        index: 'house',
                        title: '房源类型',
                        subs: [
                            {
                        		icon: 'el-icon-lx-tag',
                                index: 'type',
                                title: '物业类型',
		                        subs: [
				                    {
				                        index: 'housetypelist',
				                        title: '列表'
				                    },
		                            {
		                                index: 'housetypeadd',
		                                title: '添加'
		                            }
		                        ]
                            },
                            {
                        		icon: 'el-icon-lx-tag',
                                index: 'fitment',
                                title: '装修类型',
		                        subs: [
				                    {
				                        index: 'housefitmentlist',
				                        title: '列表'
				                    },
		                            {
		                                index: 'housefitmentadd',
		                                title: '添加'
		                            }
		                        ]
                            },
                            {
                        		icon: 'el-icon-lx-tag',
                                index: 'pright',
                                title: '产权年限',
		                        subs: [
				                    {
				                        index: 'houseprightlist',
				                        title: '列表'
				                    },
		                            {
		                                index: 'houseprightadd',
		                                title: '添加'
		                            }
		                        ]
                            },
                            {
                        		icon: 'el-icon-lx-tag',
                                index: 'provider',
                                title: '供应商',
		                        subs: [
				                    {
				                        index: 'houseproviderlist',
				                        title: '列表'
				                    },
		                            {
		                                index: 'houseprovideradd',
		                                title: '添加'
		                            }
		                        ]
                            },
                            {
                        		icon: 'el-icon-lx-tag',
                                index: 'area',
                                title: '国家地区',
		                        subs: [
				                    {
				                        index: 'housearealist',
				                        title: '列表'
				                    },
		                            {
		                                index: 'houseareaadd',
		                                title: '添加'
		                            }
		                        ]
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index: 'reservation',
                        title: '预约管理',
                        subs: [
		                    {
		                        index: 'myactivitylist',
		                        title: '预约活动'
		                    },
		                    {
		                        index: 'reservationlist',
		                        title: '预约看房'
		                    },
		                    {
		                        index: 'hongbaolist',
		                        title: '用户红包'
		                    }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'activity',
                        title: '活动管理',
                        subs: [
		                    {
		                        index: 'activitylist',
		                        title: '列表'
		                    },
                            {
                                index: 'activityadd',
                                title: '添加'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
