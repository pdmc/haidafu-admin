<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>问答</el-breadcrumb-item>
                <el-breadcrumb-item>回答列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!--div class="handle-box">
            	<el-button type="primary" icon="delete" class="handle-del mr10" @click="toAdd">创建</el-button>
            </div-->
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="question__title" label="问题" sortable width="150">
                </el-table-column>
                <el-table-column prop="pkuser__nickName" label="答问人" sortable width="100">
                </el-table-column>
                <el-table-column prop="pkuser__avatarUrl" label="缩略图" width="80">
                    <template slot-scope="scope">
                        <img  :src="scope.row.pkuser__avatarUrl" alt="" style="width: 50px;height: 50px">
                    </template>
                </el-table-column>
                <el-table-column prop="text" label="回答内容" width="150">
                </el-table-column>
                <el-table-column prop="stateName" label="状态" sortable width="80">
                    <template slot-scope="scope">
                       <span v-if="scope.row.state === 0">未审核</span>
                       <span v-else-if="scope.row.state === 1" style="color: green">通过</span>
                       <span v-else style="color: red">未通过</span>
                    </template>				
                </el-table-column>
                <el-table-column prop="createTime" label="回答时间" sortable width="100">
                </el-table-column>
                <el-table-column label="操作" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handlePass(scope.$index, scope.row)">通过</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleUnpass(scope.$index, scope.row)">不通过</el-button>
						<!--el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button-->
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
                    name: ''
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
                	if(!isNaN(d.state) && d.state == 0){
                		d.stateName = "未审核";
                	} else if(!isNaN(d.state) && d.state == 1){
                		d.stateName = "通过";
                	} else if(!isNaN(d.state) && d.state == 2){
                		d.stateName = "未通过";
                	}
                    return d;
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
                this.$axios.get('/answer', {
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
                this.dbid = row.anId;
                const item = this.tableData[index];
                this.form = {
                	anId: this.dbid,
                    name: item.name,
                    status: item.status=="启用"?true:false
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.dbid = row.anId;
                this.delVisible = true;
            },
            toAdd() {
            	this.$router.push({path: '/answeradd'});
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
            handlePass(index, row) {
				//console.log(row);
				//console.log(this.tableData[index]);
				if(row.state == 1)
					return;
            	var _this = this;
                //const item = this.tableData[index];
				var ansNum = row.question__ansNum;
				var qform = {};
				if(row.state == 0 || row.state == 2)
					ansNum += 1;
                this.form = {
                	anId: row.anId,
                    state: 1
				};
            	this.$axios.get('/answer/update', {
                    params: this.form
                }).then((res) => {
                	if(res.status == 200 && res.data.code == 0){
		                //_this.$set(_this.tableData, _this.idx, _this.form);
						_this.tableData[index].state = 1;
						_this.tableData[index].stateName = '通过';
		                _this.editVisible = false;
						qform = {
							qId: row.qId,
							ansNum: ansNum
						};
            			_this.$axios.get('/question/update', {
                		    params: qform
                		}).then((res) => {
                			if(res.status == 200 && res.data.code == 0){
		        		        //_this.$set(_this.tableData, _this.idx, _this.form);
								_this.tableData[index].ansNum = ansNum;
		        		        _this.$message.success('修改成功');
                		    }
                		})
                    }
                });
            },
            handleUnpass(index, row) {
				if(row.state == 2)
					return;
            	var _this = this;
				var ansNum = row.question__ansNum;
				var qform = {};
				if(row.state == 1)
					ansNum -= 1;
                this.form = {
                	anId: row.anId,
                    state: 2 
				};
            	this.$axios.get('/answer/update', {
                    params: this.form
                }).then((res) => {
                	if(res.status == 200 && res.data.code == 0){
		                //_this.$set(_this.tableData, _this.idx, _this.form);
						_this.tableData[index].state = 2;
						_this.tableData[index].stateName = '未通过';
		                _this.editVisible = false;
						qform = {
							qId: row.qId,
							ansNum: ansNum
						};
            			_this.$axios.get('/question/update', {
                		    params: qform
                		}).then((res) => {
                			if(res.status == 200 && res.data.code == 0){
		        		        //_this.$set(_this.tableData, _this.idx, _this.form);
								_this.tableData[index].ansNum = ansNum;
		        		        _this.$message.success('修改成功');
                		    }
                		})
                    }
                })
            },
            // 保存编辑
            saveEdit() {
            	var _this = this;
            	if(this.form.status) this.form.status = 1;
            	else this.form.status = 0;
            	this.$axios.get('/fitments/update', {
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
            	this.$axios.get('/question/delete', {
                    params: { anId: this.dbid }
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
