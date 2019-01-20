<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>房源类型</el-breadcrumb-item>
                <el-breadcrumb-item>供应商</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="供应商名称">
                        <el-input v-model="form.spName"></el-input>
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
                    <el-form-item label="图片名称">
                        <el-input v-model="form.imgname"></el-input>
                    </el-form-item>
                    <el-form-item label="详细介绍">
                        <el-input type="textarea" rows="5" v-model="form.description"></el-input>
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
        		this.$router.push({path: '/houseproviderlist'});
        	},
            onSubmit() {
            	var _this = this;
                //this.$message.success('提交成功！');
                this.$axios.get('https://bhost.pk4yo.com/providers/add', {
				    params: this.form
				})
				.then(function (res) {
				    //console.log(res);
				    if(res.status == 200 && res.data && res.data.code == 0){
				    	_this.$message.success('提交成功！');
				    	_this.$router.push({path: '/houseproviderlist'});
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