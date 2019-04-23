<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>房源类型</el-breadcrumb-item>
                <el-breadcrumb-item>国家地区</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="区域类型">
                        <el-select v-model="form.level" placeholder="请选择" @change="levelChange">
                            <el-option key="1" label="国家" value="1"></el-option>
                            <el-option key="2" label="省份" value="2"></el-option>
                            <el-option key="3" label="城市" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属区域">
                        <el-col :span="8">
                            <el-select v-model="countryId" placeholder="请选择国家" @change="countryChange">
							    <el-option
							      v-for="item in countries"
							      :key="item.addrId"
							      :label="item.name"
							      :value="item.addrId"
							      :disabled="countryDisabled">
							    </el-option>
						    </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select v-model="provinceId" placeholder="请选择省州道" @change="provinceChange">
							    <el-option
							      v-for="item in provinces"
							      :key="item.addrId"
							      :label="item.name"
							      :value="item.addrId"
							       :disabled="provinceDisabled">
							    </el-option>
						    </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-select v-model="cityId" placeholder="请选择城市">
							    <el-option
							      v-for="item in cities"
							      :key="item.addrId"
							      :label="item.name"
							      :value="item.addrId"
							      :disabled="cityDisabled">
							    </el-option>
						    </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="housetypeadd-label" label="区域名称">
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
    export default {
        name: 'typeadd',
        data: function(){
            return {
            	countries: [],
            	provinces: [],
            	cities: [],
	            countryId: '',  
	            countryDisabled: false,  
	            provinceId: '',
	            provinceDisabled: false,
	            cityId: '',  
	            cityDisabled: true,  
		        form: {
		            name: '',
		            level: 0,
		            parentId: 0
		        }
	        }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.$axios.get('/areas/getbycond?level=1', {
                    page: this.cur_page
                }).then((res) => {
                	if(res.status == 200 && res.data.data && res.data.data.length > 0){
                    	this.countries = res.data.data;
                    }
                })
            },
        	levelChange(){
        		if(this.form.level == 1){
        			this.countryDisabled = true;
        			this.countryId = '';
        			this.provinceDisabled = true;
        			this.provinces = [];
        			this.provinceId = '';
        			this.cities = [];
        			this.cityId = '';
        		} else if(this.form.level == 2){
        			this.countryDisabled = false;
        			this.provinceDisabled = true;
        			this.provinceId = '';
        			this.cities = [];
        			this.cityId = '';
        		} else if(this.form.level == 3){
        			this.countryDisabled = false;
        			this.provinceDisabled = false;
        			this.cityId = '';
        		} 
        	},
        	countryChange(){
        		var _this = this;
        		if(this.countryId < 0) {
        			this.$message.error('国家ID错误，请联系管理员！');	
        			return;
        		}
        		this.$axios.get('/areas/getbycond?parentId='+this.countryId, {
                    page: this.cur_page
                }).then((res) => {
                	if(res.status == 200 && res.data.data && res.data.data.length > 0){
                    	_this.provinces = res.data.data;
                    } else {
                    	_this.provinces = [];
                    	_this.provinceId = '';
                    }
                })
                if(this.form.level == 2) this.form.parentId = this.countryId;
        	},
        	provinceChange(){
        		var _this = this;
        		if(this.provinceId < 0) {
        			this.$message.error('省份ID错误，请联系管理员！');	
        			return;
        		}
        		this.$axios.get('/areas/getbycond?parentId='+this.provinceId, {
                    page: this.cur_page
                }).then((res) => {
                	if(res.status == 200 && res.data.data && res.data.data.length > 0){
                    	_this.cities = res.data.data;
                    } else {
                    	_this.cities = [];
                    	_this.cityId = '';
                    }
                });
                if(this.form.level == 3) this.form.parentId = this.provinceId;
        	},
        	cancel2list()  {
        		this.$router.push({path: '/housearealist'});
        	},
            onSubmit() {
            	var _this = this;
                //this.$message.success('提交成功！');
                this.$axios.get('/areas/add', {
				    params: this.form
				})
				.then(function (res) {
				    //console.log(res);
				    if(res.status == 200 && res.data && res.data.code == 0){
				    	_this.$message.success('提交成功！');
				    	//next('/housetypelist');
				    	_this.$router.push({path: '/housearealist'});
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