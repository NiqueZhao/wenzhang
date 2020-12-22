<template>
	<view class="padding-top">
		<form class="" @submit="formSubmit">
			<view class="card-menu cu-list menu">
				<view class="cu-item ">
					<view class="content">
						<text class="text-orange cuIcon-roundrightfill"></text>社区成员资料 <text class="text-gray text-sm padding-left-sm">最后更新：{{List.updataTime}}</text>
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
					<view class="content">
						身份证号码：
					</view>
					<view class="action">
						{{List.idnumber}}
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
					<view class="content">来源地：</view>
					<view class="action">{{List.laiyuan}}</view>
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
					<view class="content">是否本地户籍：</view>
					<view class="action">{{List.isbendi == 1?'是':'否'}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">是否途径湖北：</view>
					<view class="action">{{List.isbendi == 1?'是':'否'}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">春运方式：</view>
					<view class="action">{{List.chuxing}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">交通信息：</view>
					<view class="action">{{List.gongju}}</view>
				</view>
				<view class="cu-item" >
					<view class="content">最近一次体温：</view>
					<view class="action">{{List.tiwen}}</view>
				</view>
			</view>
			
		</form>
	</view>
</template>

<script>
	import {post,get,showModal} from '../../utils/index.js';
	export default {
		data() {
			return {
				List:{}
			}
		},
		onLoad(e) {
			console.log(e);
			post(this.ali_app + "getMemberInfo",{id:e.id}).then(res=>{
				this.List = res.data;
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
