(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f1561"],{"9fca":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-lx-calendar"}),t._v("房源类型")]),a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-lx-calendar"}),t._v("房屋类型")]),a("el-breadcrumb-item",[t._v("添加")])],1)],1),a("div",{staticClass:"container"},[a("div",{staticClass:"form-box"},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[a("el-form-item",{staticClass:"housetypeadd-label",attrs:{label:"房屋类型名称"}},[a("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("提交")]),a("el-button",{on:{click:t.cancel2list}},[t._v("取消")])],1)],1)],1)])])},l=[],n=a("7f43"),r=a.n(n),o={name:"typeadd",data:function(){return{form:{name:""}}},methods:{cancel2list:function(){this.$router.push({path:"/housetypelist"})},onSubmit:function(){var t=this;r.a.get("/types/add",{params:this.form}).then(function(e){200==e.status&&e.data&&0==e.data.code&&(t.$message.success("提交成功！"),t.$router.push({path:"/housetypelist"}))}).catch(function(e){console.log(e),t.$message.error(e)})}}},c=o,i=a("25c1"),u=Object(i["a"])(c,s,l,!1,null,null,null);u.options.__file="add.vue";e["default"]=u.exports}}]);