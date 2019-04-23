<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>房源类型</el-breadcrumb-item>
                <el-breadcrumb-item>房屋类型</el-breadcrumb-item>
                <el-breadcrumb-item>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!--div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div-->
            <div class="handle-box">
            	<el-button type="primary" class="handle-del mr10" @click="toAdd">创建</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="名称" sortable width="150">
                </el-table-column>
                 <el-table-column prop="status" label="状态" width="150">
                </el-table-column>
               <el-table-column prop="operTime" label="添加日期" sortable width="150">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="form.status"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: './vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                	if(!isNaN(d.status) && d.status == 1){
                		d.status = "禁用";
                	} else if(!isNaN(d.status) && d.status == 0){
                		d.status = "启用";
                	}
                    return d;
                    /*let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }*/
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                /*if (process.env.NODE_ENV === 'development') {
                    this.url = '/ms/table/list';
                };*/
                this.$axios.get('/types', {
                    page: this.cur_page
                }).then((res) => {
                	if(res.status == 200 && res.data.data && res.data.data.length > 0){
                    	this.tableData = res.data.data;
                    }
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                this.dbid = row.typeId;
                const item = this.tableData[index];
                this.form = {
                	typeId: this.dbid,
                    name: item.name,
                    status: item.status=="启用"?true:false
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.dbid = row.typeId;
                this.delVisible = true;
            },
            toAdd() {
            	this.$router.push({path: '/housetypeadd'});
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
            	var _this = this;
            	if(this.form.status) this.form.status = 0;
            	else this.form.status = 1;
            	this.$axios.get('/types/update', {
                    params: this.form
                }).then((res) => {
                	if(res.status == 200 && res.data.code == 0){
		                _this.$set(_this.tableData, _this.idx, _this.form);
		                _this.editVisible = false;
		                _this.$message.success('修改成功');
                    }
                })
            },
            // 确定删除
            deleteRow(){
            	this.$axios.get('/types/delete', {
                    params: { typeId: this.dbid }
                }).then((res) => {
                	if(res.status == 200 && res.data.code == 0){
                		this.tableData.splice(this.idx, 1);
                    	this.$message.success('删除成功');
                		this.delVisible = false;
                    }
                })
                
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .pagination {
    	text-align: center;
    }
</style>
