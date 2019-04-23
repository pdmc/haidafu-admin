<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>楼盘</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="楼盘名称">
                        <el-input v-model="form.pName"></el-input>
                    </el-form-item>
                    <el-form-item label="出售状态">
                        <el-select v-model="form.status" placeholder="请选择">
                            <el-option key="0" label="待开盘" value="0"></el-option>
                            <el-option key="1" label="在售" value="1"></el-option>
                            <el-option key="2" label="售完" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="供应商">
                        <el-select v-model="form.spId" placeholder="请选择">
						    <el-option
						      v-for="item in providers"
						      :key="item.spId"
						      :label="item.spName"
						      :value="item.spId">
						    </el-option>
					    </el-select>
                    </el-form-item>
                    <el-form-item label="最小面积(平米)">
                        <el-input v-model="form.minSquare"></el-input>
                    </el-form-item>
                    <el-form-item label="最大面积(平米)">
                        <el-input v-model="form.maxSquare"></el-input>
                    </el-form-item>
                    <el-form-item label="最低价格(万)">
                        <el-input v-model="form.minPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="最高价格(万)">
                        <el-input v-model="form.maxPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="国家地区">
						<el-cascader
						    :options="addresses"
						    v-model="address"
						    @change="addrChange">
						</el-cascader>
                    </el-form-item>
                    <el-form-item label="完整地址">
                        <el-input v-model="form.fullAddr"></el-input>
                    </el-form-item>
                    <el-form-item label="产权年限">
                        <el-select v-model="form.prightId" placeholder="请选择">
						    <el-option
						      v-for="item in prights"
						      :key="item.prId"
						      :label="item.name"
						      :value="item.prId">
						    </el-option>
					    </el-select>
                    </el-form-item>
                    <el-form-item label="交房时间-年">
                        <el-input v-model="form.handoverYear"></el-input>
                    </el-form-item>
                    <el-form-item label="交房时间-月">
                        <el-input v-model="form.handoverMonth"></el-input>
                    </el-form-item>
                    <el-form-item label="交房时间-日">
                        <el-input v-model="form.handoverDay"></el-input>
                    </el-form-item>
                    <el-form-item label="能否贷款">
                        <el-select v-model="form.canLoan" placeholder="请选择">
                            <el-option key="0" label="不能" value="0"></el-option>
                            <el-option key="1" label="能" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规划面积(平米)">
                        <el-input v-model="form.totalSquare"></el-input>
                    </el-form-item>
                    <el-form-item label="可售户数">
                        <el-input v-model="form.availAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="总户数/总房数">
                        <el-input v-model="form.totalAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="预计出租年收益(元)">
                        <el-input v-model="form.predictYearRent"></el-input>
                    </el-form-item>
                    <el-form-item label="首付比例(100以内数字)">
                        <el-input v-model="form.firstpayRatio"></el-input>
                    </el-form-item>
                    <el-form-item label="近12个月涨幅(100以内数字)">
                        <el-input v-model="form.recent12AscRatio"></el-input>
                    </el-form-item>
                    <el-form-item label="缩略图">
                        <el-input v-model="form.thumbname"></el-input>
                    </el-form-item>
                    <el-form-item label="图片名称-1">
                        <el-input v-model="form.picture1name"></el-input>
                    </el-form-item>
                    <el-form-item label="图片名称-2">
                        <el-input v-model="form.picture2name"></el-input>
                    </el-form-item>
                    <el-form-item label="图片名称-3">
                        <el-input v-model="form.picture3name"></el-input>
                    </el-form-item>
                    <el-form-item label="图片名称-4">
                        <el-input v-model="form.picture4name"></el-input>
                    </el-form-item>
                    <el-form-item label="详细介绍">
                        <el-input type="textarea" rows="5" v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="是否加入首页精选">
                        <el-select v-model="form.status" placeholder="请选择">
                            <el-option key="0" label="不加" value="0"></el-option>
                            <el-option key="1" label="加" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系人电话">
                        <el-input v-model="form.agentPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人二维码图片">
                        <el-input v-model="form.agentUrl"></el-input>
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
            	addresses: [],
            	address: [],
            	prights: [],
            	providers: [],
		        form: {
		            name: ''
		        }
	        }
        },
        created() {
        	var _this = this;
        	//console.log(this.$appconfig);
    		this.$axios.get('/areas', {
                page: this.cur_page
            }).then((res) => {
            	if(res.status == 200 && res.data.data && res.data.data.length > 0){
            		var areas = res.data.data;
            		var i = 0, j = 0, k = 0;
            		for(i = 0; i < areas.length; i++){
            			if(areas[i].level == 1){
            				_this.addresses.unshift({value: areas[i].addrId, label: areas[i].name, children: []});
            			}
            		}
            		for(i = 0; i < areas.length; i++){
            			if(areas[i].level == 2){
            				for(j = 0; j < _this.addresses.length; j++){
            					if(areas[i].parentId == _this.addresses[j].value){
            						_this.addresses[j].children.unshift({value: areas[i].addrId, label: areas[i].name, children: []});
            						break;
            					}
            				}
            			}
            		}
            		for(i = 0; i < areas.length; i++){
            			if(areas[i].level == 3){
            				loop2:
            				for(j = 0; j < _this.addresses.length; j++){
            					loop3:
	            				for(k = 0; k < _this.addresses[j].children.length; k++){
	            					if(areas[i].parentId == _this.addresses[j].children[k].value){
	            						_this.addresses[j].children[k].children.unshift({value: areas[i].addrId, label: areas[i].name});
	            						break loop2;
	            					}
	            				}
            				}
            			}
            		}
                	_this.projects = res.data.data;
                } 
            });
    		this.$axios.get('/providers', {
                page: this.cur_page
            }).then((res) => {
            	if(res.status == 200 && res.data.data && res.data.data.length > 0){
                	_this.providers = res.data.data;
                } 
            });
    		this.$axios.get('/prights', {
                page: this.cur_page
            }).then((res) => {
            	if(res.status == 200 && res.data.data && res.data.data.length > 0){
                	_this.prights = res.data.data;
                } 
            });
        },
        methods: {
        	cancel2list()  {
        		this.$router.push({path: '/projectlist'});
        	},
		    addrChange(value) {
		        console.log(value);
		        this.form.countryId = value[0];
		        this.form.provinceId = value[1];
		        this.form.cityId = value[2];
		    },
            onSubmit() {
            	var _this = this;
                //this.$message.success('提交成功！');
                this.$axios.get('/projects/add', {
				    params: this.form
				})
				.then(function (res) {
				    //console.log(res);
				    if(res.status == 200 && res.data && res.data.code == 0){
				    	_this.$message.success('提交成功！');
				    	_this.$router.push({path: '/projectlist'});
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
