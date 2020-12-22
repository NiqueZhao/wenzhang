<template>
	<view class="flex justify-center align-center flex-direction padding-top">
		<view class="head_box flex align-center justify-center flex-direction">
			<view style="width: 600upx" class="shadow">
				<tki-barcode ref="barcode" :opations="option" cid="barcode" :val="val" :loadMake="true" :onval="true"></tki-barcode>
			</view>
			<view class="padding-top-sm">
				<text class="cuIcon-activity text-red padding-right-xs"></text><text>社区名称：{{shequ_name}}</text>
			</view>
			<view class="padding-top-xl"></view>
			<view>
				<tki-qrcode cid="qrcode" ref="qrcode" :val="val" :background="background" :foreground="foreground" :pdground="pdground" :size="300" :onval="true" :loadMake="true" :usingComponents="true" @result="qrR" />
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	import tkiBarcode from "@/components/tki-barcode/tki-barcode.vue";
	import {post,get,showModal} from '../../utils/index.js';
	import { Base64 } from 'js-base64';
	export default {
		data() {
			return {
				option:{
					displayValue:false
				},
				src: '', // 二维码生成后的图片地址或base64
				foreground: '#000000', // 前景色
				pdground: '#309286', // 角标色
				background:'#ffffff',
				val:'',
				shequ_name:''
			}
		},
		components: {tkiBarcode,tkiQrcode},
		onLoad() {
			post(this.ali_app + 'shequInfo',{pid:uni.getStorageSync('pid')}).then(res=>{
				this.shequ_name =  res.data.name;
			});
			this.val = Base64.encode(uni.getStorageSync('pid'));
		},
		methods: {
			qrR(res) {
				this.src = res
			},
		}
	}
</script>

<style>
	.head_box{
		width: 700upx;
		height: 1150upx;
		background-color: #FFFFFF;
		border-radius: 30upx;
	}
</style>
