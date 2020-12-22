<template>
	<view>
		<view class='UCenter-bg'>
			<view class='text-xl' style="font-size: 36upx;">{{shequ.name}}
			</view>
			<view class='padding-top-sm' style="padding-top: 20upx">
				<text>社区编码：{{shequ.shequ_id}}</text>
			</view>
			<image src='https://api.szyashu.com/static/wave.gif' mode='scaleToFill' class='gif-wave'></image>
		</view>
		<view class="cu-list menu sm-border card-menu padding-top-xs">
			<view class="cu-item arrow" @tap="SelectShequ">
				<view class="content">
					<text class="cuIcon-list text-lg"/>
					<text class="text-left">社区列表</text>
				</view>				
			</view>
			<navigator v-if="type == 1" url="../member_detail/list" class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-friend text-lg"/>
					<text class="text-left">成员管理</text>
				</view>				
			</navigator>
			
		</view>
		<view class="cu-list menu sm-border card-menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-apps text-lg"/>
					<text class="text-left">当前版本</text>
				</view>
				<view class="action">
					<text>v{{version}}</text>
				</view>
			</view>
			
			<navigator url="about_us" class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-info text-lg"/>
					<text class="text-left">关于我们</text>
				</view>				
			</navigator>
			
		</view>
		<view class="flex padding-top-sm justify-center flex-direction align-center">
			<view class="text-gray">用户自助填写二维码</view>
			<view class="padding-top-sm">
				<tki-qrcode cid="qrcode2" ref="qrcode2" :val="val" :background="background" :foreground="foreground" :pdground="pdground" :size="200" :onval="true" :loadMake="true" :usingComponents="true" @result="qrR" />
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import {post,get,showModal} from '../../utils/index.js';
	import {version} from 'utils/config.js';
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	var that;
	export default {
		computed:mapState(['login_info','WsClient']),
		components: {tkiQrcode},
		data() {
			return {
				version:'',
				src: '', // 二维码生成后的图片地址或base64
				foreground: '#000000', // 前景色
				pdground: '#309286', // 角标色
				background:'#ffffff',
				shequ:{},
				type:0,
				val:''
			}
		},
		onLoad() {
			that = this;
			this.version = version;
			this.shequ = uni.getStorageSync('shequ');
			this.type = uni.getStorageSync('type');
			this.val = "https://www.zgnnet.com/aliapp/shequ?id="+uni.getStorageSync('shequ').shequ_id;
		},
		methods: {
			qrR(res) {
				this.src = res
			},
			SelectShequ(){
				uni.$once('shequ_select',function(res){
					if(res.type === 1){
						post(that.ali_app + 'today_data',{id:res.shequ_id,type:3}).then(res=>{
							uni.setStorageSync('shequ',res.data.shequ);
							this.shequ = res.data.shequ;
						});
					}
				});
				uni.navigateTo({
					url:'../index/shequ_list/shequ_list'
				})
			},
		}
	}
</script>

<style>
	.UCenter-bg {
	  /* background-image: url('https://api.szyashu.com/static/index.jpg'); */
	  /* background-size: cover; */
	  background-color: #66ccff;
	  height: 400rpx;
	  display: flex;
	  justify-content: center;
	  padding-top: 40rpx;
	  overflow: hidden;
	  position: relative;
	  flex-direction: column;
	  align-items: center;
	  color: #fff;
	  font-weight: 300;
	  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}
	
	.UCenter-bg text {
	  opacity: 0.8;
	}
	
	.UCenter-bg image {
	  width: 200rpx;
	  height: 200rpx;
	}
	
	.UCenter-bg .gif-wave{
	  position: absolute;
	  width: 100%;
	  bottom: 0;
	  left: 0;
	  z-index: 99;
	  mix-blend-mode: screen;  
	  height: 100rpx;   
	}
</style>