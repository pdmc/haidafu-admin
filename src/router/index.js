import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	//mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/projectlist'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/projectlist',
                    component: resolve => require(['../components/project/list.vue'], resolve),
                    meta: { title: '楼盘列表' }
                },
                {
                    path: '/projectadd',
                    component: resolve => require(['../components/project/add.vue'], resolve),
                    meta: { title: '楼盘添加' }
                },
                {
                    path: '/houselayoutlist',
                    component: resolve => require(['../components/houselayout/list.vue'], resolve),
                    meta: { title: '户型列表' }
                },
                {
                    path: '/houselayoutadd',
                    component: resolve => require(['../components/houselayout/add.vue'], resolve),
                    meta: { title: '户型添加' }
                },
                {
                    path: 'housetypelist',
                    component: resolve => require(['../components/housetype/list.vue'], resolve),
                    meta: { title: '房屋类型列表' }
                },
                {
                    path: 'housetypeadd',
                    component: resolve => require(['../components/housetype/add.vue'], resolve),
                    meta: { title: '房屋类型添加' }
                },
                {
                    path: '/housefitmentlist',
                    component: resolve => require(['../components/housefitment/list.vue'], resolve),
                    meta: { title: '装修类型列表' }
                },
                {
                    path: '/housefitmentadd',
                    component: resolve => require(['../components/housefitment/add.vue'], resolve),
                    meta: { title: '装修类型添加' }
                },
                {
                    path: '/houseprightlist',
                    component: resolve => require(['../components/housepright/list.vue'], resolve),
                    meta: { title: '产权年限列表' }
                },
                {
                    path: '/houseprightadd',
                    component: resolve => require(['../components/housepright/add.vue'], resolve),
                    meta: { title: '产权年限添加' }
                },
                {
                    path: '/houseproviderlist',
                    component: resolve => require(['../components/houseprovider/list.vue'], resolve),
                    meta: { title: '供应商列表' }
                },
                {
                    path: '/houseprovideradd',
                    component: resolve => require(['../components/houseprovider/add.vue'], resolve),
                    meta: { title: '供应商添加' }
                },
                {
                    path: '/housearealist',
                    component: resolve => require(['../components/housearea/list.vue'], resolve),
                    meta: { title: '国家地区列表' }
                },
                {
                    path: '/houseareaadd',
                    component: resolve => require(['../components/housearea/add.vue'], resolve),
                    meta: { title: '国家地区添加' }
                },
                {
                    path: '/reservationlist',
                    component: resolve => require(['../components/reservation/list.vue'], resolve),
                    meta: { title: '预约看房列表' }
                },
                {
                    path: '/activitylist',
                    component: resolve => require(['../components/activity/list.vue'], resolve),
                    meta: { title: '活动列表' }
                },
                {
                    path: '/activityadd',
                    component: resolve => require(['../components/activity/add.vue'], resolve),
                    meta: { title: '活动添加' }
                },
                {
                    path: '/myactivitylist',
                    component: resolve => require(['../components/activity/mylist.vue'], resolve),
                    meta: { title: '用户活动预约' }
                },
                {
                    path: '/hongbaolist',
                    component: resolve => require(['../components/hongbao/list.vue'], resolve),
                    meta: { title: '红包列表' }
                },
                {
                    path: '/hongbaoadd',
                    component: resolve => require(['../components/hongbao/add.vue'], resolve),
                    meta: { title: '红包添加' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
