<template>
	<view class="content">
		<view id="title">
			<view class="cu-bar  solid-bottom">
				<view class="action ">
					<text class="cuIcon-activityfill text-red"></text><text class="title">{{title}}</text> 
				</view>
			</view>
		</view>
		<view id="connect" class="margin-top-xs">
			<rich-text :nodes="nodes"></rich-text>
		</view>
	</view>
</template>

<script>
	import {post,get,showModal} from '../../utils/index.js';
	export default {
		data() {
			return {
				nodes:'',
				title:''
			}
		},
		onLoad() {
			get(this.ali_app + 'about_us').then(res=>{
				this.title = res.data.title;
				this.nodes = res.data.html;
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		height: 100%;
		background: #fff;
	}
	.content{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		line-height: 1.5;
	}
</style>
