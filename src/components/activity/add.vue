<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item class="housetypeadd-label" label="活动主题">
                        <el-input v-model="form.subject"></el-input>
                    </el-form-item>
                    <el-form-item class="housetypeadd-label" label="活动地址">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item class="housetypeadd-label" label="时间">
                        <el-date-picker
					      v-model="form.startTime"
					      type="datetime"
					      placeholder="选择日期时间"
					      @change="timeChange">
					    </el-date-picker>
                    </el-form-item>
                    <el-form-item class="housetypeadd-label" label="图片名称">
                        <el-input v-model="form.imgname"></el-input>
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
        name: 'activityadd',
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
        		this.$router.push({path: '/activitylist'});
        	},
        	timeChange(){
        		//console.log(this.form.startTime);
        	},
            onSubmit() {
            	var _this = this;
            	var d = new Date(this.form.startTime);
        		var month = d.getMonth() + 1;
        		this.form.startTime = d.getFullYear()+'-'+month+'-'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
                //this.$message.success('提交成功！');
                this.$axios.get('https://bhost.pk4yo.com/activity/add', {
				    params: this.form
				})
				.then(function (res) {
				    //console.log(res);
				    if(res.status == 200 && res.data && res.data.code == 0){
				    	_this.$message.success('提交成功！');
				    	_this.$router.push({path: '/activitylist'});
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