<template>
	<view>
		<view class="padding-top">
			<form class="" @submit="formSubmit">
				<view class="card-menu cu-list menu">
					<view class="cu-item ">
						<view class="content">
							<text class="text-orange cuIcon-roundrightfill"></text>{{shequ_name}}
						</view>
					</view>
					<view class="cu-form-group ">
						<view class="title">姓名<text class="text-red">*</text></view>
						<input placeholder="请填写您的姓名" name="name"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">手机号码<text class="text-red">*</text></view>
						<input placeholder="请输入手机号码" name="phonenumber"></input>
						<view class="cu-capsule radius">
							<view class='cu-tag bg-blue '>
								+86
							</view>
							<view class="cu-tag line-blue">
								中国大陆
							</view>
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">社区身份</view>
						<picker @change="PickerChange" :value="index" :range="picker" name="shenfen">
							<view class="picker">
								{{index>-1?picker[index]:'点击选择'}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group ">
						<button class="cu-btn bg-blue shadow" form-type="submit">提交信息</button>
					</view>
				</view>
				
			</form>
		</view>
		<view class="flex  justify-center align-center margin-top-sm">
			<view class=" head_box ">
				<view class="flex align-center padding-left-sm padding-top-sm">
					<text class="cuIcon-notificationfill text-blue padding-right-xs" style="font-size: 40upx"></text>
					<text class="text-lg">申请须知：</text>
				</view>
				<view class="text-grey padding-left padding-top">
					1、再次说明，如您非社区管理人员，请勿申请提交<br>
					2、申请后请等待我们与您联系，请勿重复提交，谢谢。<br>
					3、请填写真实的联系信息，否则我们无法与您取得联系<br>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {post,get,showModal} from '../../utils/index.js';
	export default {
		data() {
			return {
				shequ_name:'',
				index:-1,
				picker: ['居委会成员', '小区物业','街道管理处', '其他成员']
			}
		},
		onLoad(o) {
			this.shequ_name = o.name;
			post(this.ali_app + 'check_shequ',{name:o.name}).then(res=>{
				if(res.code === 0){
					showModal('温馨提示',res.info);
				}
			});
		},
		methods: {
			formSubmit(e){
				if(this.index === -1){
					showModal('温馨提示','请选择身份后再提交');
					return false;
				}
				let params = e.detail.value;
				params.shenfen = this.picker[e.detail.value.shenfen];
				params.shequ_name = this.shequ_name;
				params.pid = uni.getStorageSync('pid');
				// console.log(params);return false;
				post(this.ali_app + "apply",params).then(res=>{
					
					if(res.code === 1){
						showModal('温馨提示','提交成功，待电话核实后将立即开通权限，请勿重复提交~');
					}else{
						showModal('温馨提示',res.info);
					}
				});
			},
			PickerChange(e) {
				this.index = e.detail.value
			}
		}
	}
</script>

<style>
	.head_box{
		width: 700upx;
		height: 300upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}
</style>
