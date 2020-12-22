<template>
	<view class="padding-top">
		<form class="" @submit="formSubmit">
			<view class="card-menu cu-list menu">
				<view class="cu-item ">
					<view class="content">
						<text class="text-orange cuIcon-roundrightfill"></text>基础信息 <text class="text-gray text-sm padding-left-sm">最后更新：{{List.updataTime}}</text>
					</view>
				</view>
			</view>
			<view class="card-menu cu-list menu" >
				<view class="cu-item" >
					<view class="content">
						姓名：
					</view>
					<view class="action">
						{{List.name}}
					</view>
				</view>
				<view class="cu-item" >
					<view class="content">手机号：</view>
					<view class="action">{{List.phonenumber}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">居住身份：</view>
					<view class="action">
						<view class="cu-tag round bg-green light">{{List.shenfen}}</view>
					</view>
				</view>
				<view class="cu-item" >
					<view class="content">居住信息：</view>
					<view class="action">{{List.juzhu}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">车牌号：</view>
					<view class="action">{{List.carnumber}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">上次体温：</view>
					<view class="action">{{List.tiwen}}</view>
				</view>
				
			</view>
			<view class="card-menu menu cu-list">
				<view class="cu-item">
					<view class="content">本次体温</view>
				</view>
				<slider min="30" max="45" :value="tiwen" show-value="true" step="0.1" @change="change" />
			</view>
			<view class="flex justify-around">
				<button class="cu-btn bg-blue" @tap="action('外出')">确认外出</button>
				<button class="cu-btn bg-green" @tap="action('进入')">确认进入</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {post,get,showModal} from '../../utils/index.js';
	export default {
		data() {
			return {
				List:{},
				tiwen:''
			}
		},
		onLoad(e) {
			post(this.ali_app + "getMemberInfo",{id:e.userid}).then(res=>{
				this.List = res.data;
				this.tiwen = res.data.tiwen;
			});
		},
		methods: {
			change(e){
				this.tiwen = e.detail.value;
			},
			action(e){
				console.log(e);
				post(this.ali_app + 'memberAction',{id:this.List.id,action:e,tiwen:this.tiwen}).then(res=>{
					if(res.code === 1){
						uni.navigateBack({
							delta:1
						});
					}else{
						showModal('温馨提示',res.info);
					}
				})
			}
		}
	}
</script>

<style>

</style>
