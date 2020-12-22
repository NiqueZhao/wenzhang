<template>
	<view class="main">
		<cover-image src = "../../static/bg.png"></cover-image>
		<view class="main">
			<!--左侧小区名称 右侧新增登记-->
			<view id="head1" class="flex justify-around margin-top-sm ">
				<view url="shequ_list/shequ_list" class="flex align-center" @click="SelectShequ">
					<text class="text-white text-xl">{{shequ.name}}</text>
					<view class="cuIcon-triangledownfill text-white" style="font-size: 50upx"></view>
				</view>
				<view></view><view></view><view></view><view></view>
				<view class="flex align-center">
					<navigator url="qrcode">
						<view class="cuIcon-add text-white text-bold" style="font-size: 50upx"></view>
					</navigator>
				</view>
			</view>
			<!--社区出行概况-->
			<view id="chuxing" class="flex  justify-center align-center margin-top-sm">
				<view class="head_box">

					<view class="flex justify-around text-df padding-top">
						<text>社区今日出入情况</text>
						<text>（单位：人次）</text>
					</view>
					<view class="flex justify-around padding-top-xl">
						<view class="flex flex-direction align-center">
							<text class="text-orange text-bold">{{today.total}}</text>
							<text>通行总数</text>
						</view>
						<view class="flex flex-direction align-center">
							<text class="text-orange text-bold">{{today.in_num}}</text>
							<text>进入次数</text>
						</view>
						<view class="flex flex-direction align-center">
							<text class="text-orange text-bold">{{today.out_num}}</text>
							<text>外出次数</text>
						</view>
					</view>
				</view>
			</view>
			<!--两个功能按钮-->
			<view id="btn" class="flex justify-around margin-top-sm">
				<navigator class="btn-box bg-gradual-blue flex align-center justify-center" url="qrcode">
					<text class="text-xxl text-shadow">出入登记</text>
					<text class="cuIcon-write padding-left-xs" style="font-size: 90upx;opacity: 0.2"></text>
				</navigator>
				<view class="btn-box bg-gradual-green flex align-center justify-center" @tap="hecha">
					<text class="text-xxl text-shadow">通行核查</text>
					<text class="cuIcon-punch padding-left-xs" style="font-size: 90upx;opacity: 0.2"></text>
				</view>
			</view>
			<!--概况记录-->
			<view id="segmented" class="margin-top-sm">
				<uni-segmented-control :current="current" :values="items" style-type="text" :active-color="activeColor" @clickItem="onClickItem" />
			</view>
			<!-- class="scroll" -->
			<scroll-view id="scroll" scroll-y = "true" :style="{height:scrollHeight}">
				<view class="cu-list menu card-menu margin-top-sm" >
					<navigator :url="'../member_detail/info?id=' + item.member_id" class="cu-item" v-for="(item,key) in logList" :key = "key">
						<view class="content padding-tb-sm">
							<view><text class="cuIcon-peoplefill text-blue margin-right-xs"></text>{{item.name}}</view>
							<view class="text-gray ">
								<text class="cuIcon-phone margin-right-xs"></text> {{item.phonenumber}}
							</view>
							<view class="text-gray ">
								<text class="cuIcon-timefill margin-right-xs"></text> {{item.creat_time}}
							</view>
						</view>
						<view class="action">
							<view class="cu-tag round bg-green light">{{item.shenfen}}</view>
						</view>
					</navigator>
				</view>
			</scroll-view>
			
		</view>
		
		
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
	import {post,get,showModal} from '../../utils/index.js';
	import { Base64 } from 'js-base64';
	var that;
	export default {
		components: {uniSegmentedControl},
		data() {
			return {
				current: 0,
				items: ['进入记录', '外出记录'],
				activeColor: '#66ccff',
				scrollHeight:'',
				today:{},
				shequ:{},
				logList:[]
			}
		},
		onReady() {
			let _this = this;
			let segmented = uni.createSelectorQuery().select("#segmented");
			let sysinfo = uni.getSystemInfoSync();
			let Height = sysinfo.windowHeight;
			segmented.boundingClientRect(data=>{
				// console.log(data);
				let sH = (Height - data.top - 32).toFixed();
				_this.scrollHeight = sH+'px';
				// console.log(_this.scrollHeight);
			}).exec();
			
			
		},
		onLoad() {
			that = this;
			//#ifdef MP-ALIPAY
			uni.getStorage({
				key:'pid',
				success(data){
					console.log(data);
					if(data.data === null){
						uni.login({
							success(res) {
								post(that.ali_app + 'login_check',{code:res.code,type:1}).then(res=>{
									uni.setStorageSync('pid',res.data.pid);
									uni.setStorageSync('type',res.data.type);
									if(res.code === 0){
										uni.reLaunch({
											url:'../public/public'
										});
										return false;
									}
									if(res.data.type == 3){
										uni.reLaunch({
											url:'../pass/pass'
										});
										return false;
									}
									that.todayData();
								});
							}
						});
					}else{
						post(that.ali_app + 'login_check',{pid:data.data,type:2}).then(res=>{
							uni.setStorageSync('type',res.data.type);
							if(res.code === 0){
								uni.reLaunch({
									url:'../public/public'
								});
								return false;
							}
							if(res.data.type == 3){
								uni.reLaunch({
									url:'../pass/pass'
								});
								return false;
							}
							that.todayData();
						});
					}
					
				},
				fail() {
					showModal('异常提示','缓存内容读取失败，请重新打开再试');
				}
			});
			//#endif
			
		},
		methods: {
			todayData(){
				post(that.ali_app + 'today_data',{pid:uni.getStorageSync('pid'),type:1}).then(res=>{
					that.today = res.data.today;
					that.shequ = res.data.shequ;
					uni.setStorageSync('shequ',res.data.shequ);
					that.getLogList('进入');
				});
				
			},
			SelectShequ(){
				uni.$once('shequ_select',function(res){
					if(res.type === 1){
						post(that.ali_app + 'today_data',{id:res.shequ_id,type:3}).then(res=>{
							console.log(res);
							that.today = res.data.today;
							that.shequ = res.data.shequ;
							uni.setStorageSync('shequ',res.data.shequ);
						});
					}
				});
				uni.navigateTo({
					url:'shequ_list/shequ_list'
				})
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index
				}
				if(index === 0){//进入记录
					that.getLogList('进入')
				}else if(index === 1){ //外出记录
					that.getLogList('外出')
				}
			},
			hecha(){
				
				
				// #ifdef MP-ALIPAY
				uni.scanCode({
					onlyFromCamera:true,
					success: (res) => {
						let data = res.result;
						let user_id = Base64.decode(data);
						uni.navigateTo({
							url:'../member_detail/member_detail?userid='+user_id
						})
					}
				});
				// #endif
				
			},
			getLogList(type){
				post(that.ali_app + 'getLogList',{ac:type,shequ_id:uni.getStorageSync('shequ').shequ_id}).then(res=>{
					that.logList = res.data;
				})
			}
		}
	}
</script>

<style>
	cover-image {
		position: absolute;
		left: 0;
		top: 0;
		height: 300rpx;
		width: 100%;
	}
	.main{
		position: absolute;
		top: 0;width: 100%;
	}
	.head_box{
		width: 700upx;
		height: 220upx;
		background-color: #ffffff;
		border-radius: 15upx;
	}
	.btn-box{
		width: 310upx;
		height: 150upx;
		border-radius: 20upx;
	}
	.scroll{
		height: 700rpx;
	}
</style>
