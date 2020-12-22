<template>
	<view>
		<view>
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<!-- <view class="swiper-item">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</view> -->
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<view class="padding-top-sm flex justify-around padding-top-xs">
			<view class="btn-box bg-gradual-pink flex align-center justify-center" data-target="Modal" @tap="showModal">
				<text class="text-df text-shadow">使用说明</text>
				<text class="cuIcon-punch padding-left-xs" style="font-size: 90upx;opacity: 0.2"></text>
			</view>
			<navigator url="shequ_list" class="btn-box bg-gradual-red flex align-center justify-center">
				<text class="text-df text-shadow">社区入驻</text>
				<text class="cuIcon-punch padding-left-xs" style="font-size: 90upx;opacity: 0.2"></text>
			</navigator>
		</view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">社区登记系统</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					社区出入登记系统是将线下一对一纸质登记转换为线上多人同时登记的产品，当使用者熟悉整个流程后，社区出入通行将由原先近1分钟缩短为5秒以内，极大解决了社区登记拥堵排队等情况。<br><br>
					社区管理人员需要使用时，请点击右侧“社区入驻”按钮进行申请，社区初次申请成功后，将会绑定申请用户为社区管理员，每个社区仅可绑定一个管理员，但一个管理员下可添加多个子成员<br><br>
					如您已经申请，请等待我们核实信息，我们会主动与您联系开放系统使用，如在社区列表中无您所在的社区，请与我们联系。Tel:18019727127，我们将实时为您添加您社区信息<br><br>
					该系统仅供社区管理员人员使用，普通用户不可使用，社区住户或社会普通人员请勿申请入驻，感谢您的理解！
				</view>
			</view>
		</view>
		
		<view class="margin-top-sm flex  justify-center align-center">
			<view class="gg-box">
				<view class="flex align-center padding-left-sm padding-top-sm">
					<text class="cuIcon-notificationfill text-blue padding-right-xs" style="font-size: 40upx"></text>
					<text class="text-lg">公告通知：</text>
				</view>
				<view class="flex align-center justify-center flex-direction padding-top-xl">
					<image src="../../static/none.png" mode="aspectFit" style="width: 200upx;height: 200upx;"></image>
					<text class="text-gray">暂无公告发布</text>
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
				modalName: null,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://www.zgnnet.com/static/app/aliapp/swiper/12.jpg'
				},
				]
			}
		},
		onLoad() {
			uni.getStorage({
				key:'pid',
				success(data){
					if(data.data === null){
						uni.login({
							success(res) {
								post(that.ali_app + 'sys_auth',{code:res.code}).then(res=>{
									uni.setStorageSync('pid',res.data.pid);
								});
							}
						});
					}
				},
				fail() {
					showModal('异常提示','缓存内容读取失败，请重新打开再试');
				}
			});
		},
		methods: {
			hideModal(e) {
				this.modalName = null
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
		}
	}
</script>

<style>
	.btn-box{
		width: 220upx;
		height: 110upx;
		border-radius: 20upx;
	}
	.gg-box{
		width: 700upx;
		height: 500upx;
		border-radius: 20upx;
		background-color: #ffffff;
	}
</style>
