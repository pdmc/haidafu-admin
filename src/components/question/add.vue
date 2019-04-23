<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>问答</el-breadcrumb-item>
                <el-breadcrumb-item>添加问题</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item class="housetypeadd-label" label="问题标题">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item class="housetypeadd-label" label="问题内容">
                        <el-input v-model="form.name"></el-input>
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
		        form: {
		            name: ''
		        }
	        }
        },
        created() {
        	//console.log(this.$appconfig);
        },
        methods: {
        	cancel2list()  {
        		this.$router.push({path: '/housefitmentlist'});
        	},
            onSubmit() {
            	var _this = this;
                //this.$message.success('提交成功！');
                this.$axios.get('/fitments/add', {
				    params: this.form
				})
				.then(function (res) {
				    //console.log(res);
				    if(res.status == 200 && res.data && res.data.code == 0){
				    	_this.$message.success('提交成功！');
				    	_this.$router.push({path: '/housefitmentlist'});
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
