<template>
	<view class="flex justify-center align-center flex-direction padding-top-xl">
		<view class="text-xl text-blue">绑定结果</view>
		<view class="padding-top-xl text-xxl">{{result}}</view>
	</view>
</template>

<script>
	import {post,get,showModal} from '../../utils/index.js';
	export default {
		data() {
			return {
				result:''
			}
		},
		onLoad(o) {
			let qr = o.qrCode;
			let id = qr.split("?id=")[1];
			uni.getStorage({
				key:'pid',
				success(data){
					if(data.data === null){
						uni.login({
							success(res) {
								post(that.ali_app + 'bind_sub',{code:res.code,type:1,id:id}).then(res=>{
									uni.setStorageSync('pid',res.data.pid);
									if(res.code === 1){
										this.result = "绑定成功，请重新进入";
									}else{
										this.result = "绑定失败";
									}
								});
							}
						});
					}else{
						post(that.ali_app + 'bind_sub',{pid:data.data,type:2,id:id}).then(res=>{
							if(res.code === 1){
								this.result = "绑定成功，请重新进入";
							}else{
								this.result = "绑定失败";
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
			
		}
	}
</script>

<style>

</style>
