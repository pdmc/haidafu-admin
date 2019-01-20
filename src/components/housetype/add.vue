<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>房源类型</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>房屋类型</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item class="housetypeadd-label" label="房屋类型名称">
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
	import axios from 'axios';
    export default {
        name: 'typeadd',
        data: function(){
            return {
		        form: {
		            name: ''
		        }
	        }
        },
        methods: {
        	cancel2list()  {
        		this.$router.push({path: '/housetypelist'});
        	},
            onSubmit() {
            	var _this = this;
                //this.$message.success('提交成功！');
                axios.get('https://bhost.pk4yo.com/types/add', {
				    params: this.form
				})
				.then(function (res) {
				    //console.log(res);
				    if(res.status == 200 && res.data && res.data.code == 0){
				    	_this.$message.success('提交成功！');
				    	//next('/housetypelist');
				    	_this.$router.push({path: '/housetypelist'});
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