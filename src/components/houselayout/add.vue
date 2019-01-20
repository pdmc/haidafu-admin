<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>户型</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="所属楼盘">
                        <el-select v-model="form.pId" placeholder="请选择楼盘"> 
						    <el-option
						      v-for="item in projects"
						      :key="item.pId"
						      :label="item.name"
						      :value="item.pId">
						    </el-option>
					    </el-select>
                    </el-form-item>
                    <el-form-item label="几室">
                        <el-input v-model="form.bedroomNum"></el-input>
                    </el-form-item>
                    <el-form-item label="几厅">
                        <el-input v-model="form.livingroomNum"></el-input>
                    </el-form-item>
                    <el-form-item label="几卫">
                        <el-input v-model="form.bathroomNum"></el-input>
                    </el-form-item>
                    <!--el-form-item label="供应商图标">
			            <el-upload
			                class="upload-demo"
			                drag
			                action="http://image.pk4yo.com/uploadhai.php"
			                multiple
			                :limit="3">
			                <i class="el-icon-upload"></i>
			                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			            </el-upload>
                    </el-form-item-->
                    <el-form-item label="物业类型">
                        <el-select v-model="form.typeId" placeholder="请选择类型">
						    <el-option
						      v-for="item in types"
						      :key="item.typeId"
						      :label="item.name"
						      :value="item.typeId">
						    </el-option>
					    </el-select>
                    </el-form-item>
                    <el-form-item label="面积">
                        <el-input v-model="form.hlSquare"></el-input>
                    </el-form-item>
                    <el-form-item label="最低价格">
                        <el-input v-model="form.minPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="最高价格">
                        <el-input v-model="form.maxPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="装修类型">
                        <el-select v-model="form.typeId" placeholder="请选择装修">
						    <el-option
						      v-for="item in types"
						      :key="item.typeId"
						      :label="item.name"
						      :value="item.typeId">
						    </el-option>
					    </el-select>
                    </el-form-item>
                    <el-form-item label="是否带游泳池">
                        <el-select v-model="form.withPool" placeholder="请选择">
                            <el-option key="2" label="不知道" value="2"></el-option>
                            <el-option key="1" label="是" value="1"></el-option>
                            <el-option key="0" label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否带露台">
                        <el-select v-model="form.withTerrace" placeholder="请选择">
                            <el-option key="2" label="不知道" value="2"></el-option>
                            <el-option key="1" label="是" value="1"></el-option>
                            <el-option key="0" label="否" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图片名称">
                        <el-input v-model="form.picture1"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="cancel2list">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
	//import axios from 'axios';
    export default {
        name: 'typeadd',
        data: function(){
            return {
            	projects: [],
            	types: [],
            	fitments: [],
		        form: {
		            name: ''
		        }
	        }
        },
        created() {
        	var _this = this;
        	//console.log(this.$appconfig);
    		this.$axios.get('https://bhost.pk4yo.com/projects', {
                page: this.cur_page
            }).then((res) => {
            	if(res.status == 200 && res.data.data && res.data.data.length > 0){
                	_this.projects = res.data.data;
                } 
            });
    		this.$axios.get('https://bhost.pk4yo.com/types', {
                page: this.cur_page
            }).then((res) => {
            	if(res.status == 200 && res.data.data && res.data.data.length > 0){
                	_this.types = res.data.data;
                } 
            });
    		this.$axios.get('https://bhost.pk4yo.com/fitments', {
                page: this.cur_page
            }).then((res) => {
            	if(res.status == 200 && res.data.data && res.data.data.length > 0){
                	_this.fitments = res.data.data;
                } 
            });

        },
        methods: {
        	cancel2list()  {
        		this.$router.push({path: '/houselayoutlist'});
        	},
            onSubmit() {
            	var _this = this;
                //this.$message.success('提交成功！');
                this.$axios.get('https://bhost.pk4yo.com/layouts/add', {
				    params: this.form
				})
				.then(function (res) {
				    //console.log(res);
				    if(res.status == 200 && res.data && res.data.code == 0){
				    	_this.$message.success('提交成功！');
				    	_this.$router.push({path: '/houselayoutlist'});
				    }
				})
				.catch(function (error) {
				    console.log(error);
				    _this.$message.error(error);
				});
            }
        }
    }
</script>
<style>
</style>