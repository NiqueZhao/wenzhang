<template>
	<view class="padding-top">
		<form class="" @submit="formSubmit">
			<view class="card-menu cu-list menu">
				<view class="cu-item ">
					<view class="content">
						<text class="text-orange cuIcon-roundrightfill"></text>您管理的社区
					</view>
				</view>
			</view>
			<view class="card-menu cu-list menu" >
				<view class="cu-item arrow" v-for="(item,key) in list" :key="key">
					<view class="content padding-tb-sm" @click="bindClick(item.name,item.shequ_id)">
						{{item.name}}
						<view class="text-gray ">
							 {{item.shequ_id}}
						</view>
					</view>
				</view>
			</view>
			
		</form>
	</view>
</template>

<script>
	
	import {post,get} from '../../../utils/index.js';
	export default {
		data() {
			return {
				list:[],
			}
		},
		onLoad() {
			post(this.ali_app + 'check_shequ_list',{type:uni.getStorageSync('type'),pid:uni.getStorageSync('pid')}).then(res=>{
				this.list = res.data;
			});
		},
		onUnload() {
			uni.$emit('shequ_select',{type:-1})
		},
		methods: {
			bindClick(n,i){
				uni.$emit('shequ_select',{shequ_name:n,shequ_id:i,type:1})
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>

</style>
