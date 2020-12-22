<template>
	<view>
		<view class="flex padding-top-xl justify-center flex-direction align-center">
			<view class="text-gray">可以将以下二维码保存至本地，让用户自助填写</view>
			<view class="padding-top-xl">
				<tki-qrcode cid="qrcode2" ref="qrcode2" :val="val" :background="background" :foreground="foreground" :pdground="pdground" :size="400" :onval="true" :loadMake="true" :usingComponents="true" @result="qrR" />
			</view>
			<view class="padding-top-xl">
				<button class="cu-btn bg-brown" @tap="saveQr">保存本地</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				src: '', // 二维码生成后的图片地址或base64
				foreground: '#000000', // 前景色
				pdground: '#309286', // 角标色
				background:'#ffffff',
				val:''
			}
		},
		components: {tkiQrcode},
		onLoad() {
			// this.$refs.qrcode._makeCode()
			this.val = "https://www.zgnnet.com/aliapp/shequ?id="+uni.getStorageSync('shequ').shequ_id;
		},
		methods: {
			qrR(res) {
				this.src = res
			},
			saveQr(){
				uni.saveImageToPhotosAlbum({
					filePath:this.src,
					success: function () {
						uni.showModal({
							title:'Message',
							content:'保存成功',
							showCancel:false
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
