(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3301f66b"],{"3cd1":function(t,e,a){"use strict";var s=a("f8a1"),i=a.n(s);i.a},d8a0:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[t._v("问答")]),a("el-breadcrumb-item",[t._v("问题列表")])],1)],1),a("div",{staticClass:"container"},[a("el-table",{ref:"multipleTable",staticClass:"table",attrs:{data:t.data,border:""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),a("el-table-column",{attrs:{prop:"pkuser__nickName",label:"提问人",sortable:"",width:"100"}}),a("el-table-column",{attrs:{prop:"pkuser__avatarUrl",label:"头像",width:"80"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:t.row.pkuser__avatarUrl,alt:""}})]}}])}),a("el-table-column",{attrs:{prop:"title",label:"标题",sortable:"",width:"150"}}),a("el-table-column",{attrs:{prop:"content",label:"内容",sortable:"",width:"150"}}),a("el-table-column",{attrs:{prop:"labels",label:"标签",sortable:"",width:"120"}}),a("el-table-column",{attrs:{prop:"ansNum",label:"回复数",sortable:"",width:"80"}}),a("el-table-column",{staticClass:"red",attrs:{prop:"stateName",label:"状态",sortable:"",width:"70"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.state?a("span",[t._v("未审核")]):1===e.row.state?a("span",{staticStyle:{color:"green"}},[t._v("通过")]):a("span",{staticStyle:{color:"red"}},[t._v("未通过")])]}}])}),a("el-table-column",{attrs:{prop:"createTime",label:"提问时间",sortable:"",width:"100"}}),a("el-table-column",{attrs:{label:"操作",width:"140",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(a){t.handlePass(e.$index,e.row)}}},[t._v("通过")]),a("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(a){t.handleUnpass(e.$index,e.row)}}},[t._v("不通过")])]}}])})],1),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:1},on:{"current-change":t.handleCurrentChange}})],1)],1),a("el-dialog",{attrs:{title:"编辑",visible:t.editVisible,width:"30%"},on:{"update:visible":function(e){t.editVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"50px"}},[a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"状态"}},[a("el-switch",{model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"提示",visible:t.delVisible,width:"300px",center:""},on:{"update:visible":function(e){t.delVisible=e}}},[a("div",{staticClass:"del-dialog-cnt"},[t._v("删除不可恢复，是否确定删除？")]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.delVisible=!1}}},[t._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.deleteRow}},[t._v("确 定")])],1)])],1)},i=[],l=(a("d85c"),a("175c"),a("bc97"),a("a5be"),{name:"basetable",data:function(){return{url:"./vuetable.json",tableData:[],cur_page:1,multipleSelection:[],select_cate:"",select_word:"",del_list:[],is_search:!1,editVisible:!1,delVisible:!1,form:{name:""},idx:-1}},created:function(){this.getData()},computed:{data:function(){return this.tableData.filter(function(t){return isNaN(t.state)||0!=t.state?isNaN(t.state)||1!=t.state?isNaN(t.state)||2!=t.state||(t.stateName="未通过"):t.stateName="通过":t.stateName="未审核",t})}},methods:{handleCurrentChange:function(t){this.cur_page=t,this.getData()},getData:function(){var t=this;this.$axios.get("/question",{page:this.cur_page}).then(function(e){200==e.status&&e.data.data&&e.data.data.length>0&&(t.tableData=e.data.data)})},search:function(){this.is_search=!0},formatter:function(t,e){return t.address},filterTag:function(t,e){return e.tag===t},handleEdit:function(t,e){this.idx=t,this.dbid=e.qId;var a=this.tableData[t];this.form={qId:this.dbid,name:a.name,status:"启用"==a.status},this.editVisible=!0},handleDelete:function(t,e){this.idx=t,this.dbid=e.qId,this.delVisible=!0},toAdd:function(){this.$router.push({path:"/housefitmentadd"})},delAll:function(){var t=this.multipleSelection.length,e="";this.del_list=this.del_list.concat(this.multipleSelection);for(var a=0;a<t;a++)e+=this.multipleSelection[a].name+" ";this.$message.error("删除了"+e),this.multipleSelection=[]},handleSelectionChange:function(t){this.multipleSelection=t},handlePass:function(t,e){var a=this;this.form={qId:e.qId,state:1},this.$axios.get("/question/update",{params:this.form}).then(function(e){200==e.status&&0==e.data.code&&(a.tableData[t].state=1,a.tableData[t].stateName="通过",a.editVisible=!1,a.$message.success("修改成功"))})},handleUnpass:function(t,e){var a=this;this.form={qId:e.qId,state:2},this.$axios.get("/question/update",{params:this.form}).then(function(e){200==e.status&&0==e.data.code&&(a.tableData[t].state=2,a.tableData[t].stateName="未通过",a.editVisible=!1,a.$message.success("修改成功"))})},saveEdit:function(){var t=this;this.form.status?this.form.status=1:this.form.status=0,this.$axios.get("/fitments/update",{params:this.form}).then(function(e){200==e.status&&0==e.data.code&&(t.$set(t.tableData,t.idx,t.form),t.editVisible=!1,t.$message.success("修改成功"))})},deleteRow:function(){var t=this;this.$axios.get("/question/delete",{params:{qId:this.dbid}}).then(function(e){200==e.status&&0==e.data.code&&(t.tableData.splice(t.idx,1),t.$message.success("删除成功"),t.delVisible=!1)})}}}),n=l,o=(a("3cd1"),a("25c1")),r=Object(o["a"])(n,s,i,!1,null,"b7fb42e2",null);r.options.__file="list.vue";e["default"]=r.exports},f8a1:function(t,e,a){}}]);