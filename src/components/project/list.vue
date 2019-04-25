<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>楼盘</el-breadcrumb-item>
                <el-breadcrumb-item>列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
            	<el-button type="primary" icon="delete" class="handle-del mr10" @click="toAdd">创建</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="pName" label="名称" sortable width="150">
                </el-table-column>
                <el-table-column prop="thumbnail" label="缩略图" width="80">
				    <template slot-scope="scope">
				        <img  :src="scope.row.thumbnail" alt="" style="width: 50px;height: 50px">
				    </template>
                </el-table-column>
                <el-table-column prop="area__countryId__name" label="国家" width="80">
                </el-table-column>
                <el-table-column prop="area__cityId__name" label="城市" width="80">
                </el-table-column>
                <el-table-column prop="statusN" label="状态" width="80">
                </el-table-column>
                <el-table-column prop="totalSquare" label="总面积" width="80">
                </el-table-column>
                <el-table-column prop="totalAmount" label="总户数" width="80">
                </el-table-column>
                <el-table-column prop="selectedN" label="是否精选" width="80">
                </el-table-column>
                <el-table-column prop="pkprovider__spName" label="提供商" width="80">
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
                	if(d.status == 0){
                		d.statusN = "待开盘";
                	} else if(d.status == 1){
                		d.statusN = "在售";
                	} else if(d.status == 2){
                		d.statusN = "售完";
                	}
                	if(d.selected == 0){
                		d.selectedN = "无";
                	} else if(d.selected == 1){
                		d.selectedN = "精选";
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
                this.$axios.get('/projects', {
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
                this.$router.push({path: '/projectmodify',query: {'pId': row.pId }});
            },
            handleDelete(index, row) {
                this.idx = index;
                this.dbid = row.pId;
                this.delVisible = true;
            },
            toAdd() {
            	this.$router.push({path: '/projectadd'});
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
            	if(this.form.status) this.form.status = 1;
            	else this.form.status = 0;
            	this.$axios.get('/projects/update', {
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
            	this.$axios.get('/projects/delete', {
                    params: { pId: this.dbid }
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
