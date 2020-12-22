<template>
	<view class="padding-top">
		<view class="card-menu cu-list menu">
			<view class="cu-item">
				<view class="content">
					<text class="text-orange cuIcon-roundrightfill"></text>社区成员资料
				</view>
				<view class="action">
					<button class="cu-btn bg-orange shadow" @tap="showModal" data-target="Modal">添加</button>
				</view>
			</view>
		</view>
		
		
		
		<view class="card-menu cu-list menu">
			<view v-for="(item,key) in list" :key="key" class="cu-item" data-target="BindQrcode" :data-id="item.id" @tap="showModal">
				<view class="content">{{item.name}}</view>
				<view class="action">
					<view class="cu-tag round light" :class="item.pid == null ? 'bg-orange':'bg-blue'">{{item.pid == null ? '未绑定':'已绑定'}}</view>
				</view>
			</view>
		</view>
		
		<view class="cu-modal" :class="modalName=='Modal'?'show':''" >
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">添加成员</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<form @submit="add">
					<view class="cu-form-group ">
						<view class="title">姓名<text class="text-red">*</text></view>
						<input placeholder="成员的姓名" name="name"></input>
					</view>
					<view class="cu-form-group flex justify-center">
						<button class="cu-btn bg-brown shadow" form-type="submit">确认添加</button>
					</view>
				</form>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='BindQrcode'?'show':''" >
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">成员绑定码</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-tb-sm">
					<tki-qrcode cid="qrcode2" ref="qrcode2" :val="val" :background="background" :foreground="foreground" :pdground="pdground" :size="300" :onval="true" :loadMake="true" :usingComponents="true" @result="qrR" />
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	import {post,get,showModal,showToast} from '../../utils/index.js';
	export default {
		components: {tkiQrcode},
		data() {
			return {
				modalName: null,
				val:'',
				src: '', // 二维码生成后的图片地址或base64
				foreground: '#000000', // 前景色
				pdground: '#309286', // 角标色
				background:'#ffffff',
				list:[]
			}
		},
		onLoad() {
			this.SubList();
		},
		methods: {
			SubList(){
				post(this.ali_app + 'subList',{pid:uni.getStorageSync('pid')}).then(res=>{
					this.list = res.data;
				});
			},
			hideModal(e) {
				this.modalName = null
			},
			showModal(e) {
				let target = e.currentTarget.dataset.target;
				let id = e.currentTarget.dataset.id;
				if (target == 'BindQrcode'){
					this.val = "https://www.zgnnet.com/aliapp/apply/?id="+id;
				}
				this.modalName = target;
				
			},
			add(e){
				let params = e.detail.value
				let shequ = uni.getStorageSync('shequ');
				params.shequ_name = shequ.name;
				params.shequ_id = shequ.shequ_id;
				params.pid = uni.getStorageSync('pid');
				post(this.ali_app + 'addSub',params).then(res=>{
					console.log(res);
					if(res.code === 1){
						showToast('添加成功');
						this.SubList();
						this.modalName = null;
					}else{
						showToast('添加失败，请重试');
					}
				})
				
				
			},
			qrR(res) {
				this.src = res
			}
		}
	}
</script>

<style>

</style>
