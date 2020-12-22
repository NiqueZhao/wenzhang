<template>
	<view class="padding-top">
		<form class="" @submit="formSubmit">
			<view class="card-menu cu-list menu">
				<view class="cu-item ">
					<view class="content">
						<text class="text-orange cuIcon-roundrightfill"></text>人员信息
					</view>
				</view>
				<view class="cu-form-group ">
					<view class="title">姓名<text class="text-red">*</text></view>
					<input placeholder="填写姓名" name="name"></input>
					<!-- <button class='cu-btn bg-green shadow'>上传识别</button> -->
				</view>
				<view class="cu-form-group">
					<view class="title">身份证号码<text class="text-red">*</text></view>
					<input placeholder="填写身份证号码" name="idnumber"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">来源地区 <text class="text-red">*</text></view>
					<input placeholder="如安徽滁州" name="laiyuan"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">居住信息<text class="text-red">*</text></view>
					<input placeholder="如XX栋XXX室" name="juzhu"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">小区身份</view>
					<picker @change="PickerChange2" :value="index2" :range="picker2" name="shenfen">
						<view class="picker">
							{{index2>-1?picker2[index2]:'点击选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">车牌号</view>
					<input placeholder="请输入车牌号" name="carnumber"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码<text class="text-red">*</text></view>
					<input placeholder="请输入手机号码" name="phonenumber"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
				<radio-group class="block" name="isbendi">
					<view class="cu-form-group">
						<view class="title">是否本地户籍</view>
						<view>
							<radio class='blue radio' value="1" /><text class="padding-left-xs">是</text>
							<radio class='blue radio margin-left-sm' checked="true" value="0" /><text class="padding-left-xs">否</text>
						</view>
					</view>
				</radio-group>
				<radio-group class="block" name="ishubei">
					<view class="cu-form-group">
						<view class="title">是否来自或途径过湖北</view>
						<view>
							<radio class='blue radio' value="1" /><text class="padding-left-xs">是</text>
							<radio class='blue radio margin-left-sm' checked="true" value="0" /><text class="padding-left-xs">否</text>
						</view>
					</view>
				</radio-group>
				<view class="cu-form-group">
					<view class="title">春运出行方式</view>
					<picker @change="PickerChange" :value="index" :range="picker" name="chuxing">
						<view class="picker">
							{{index>-1?picker[index]:'点击选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">交通工具信息</view>
					<input placeholder="如车次车厢座位号等" name="gongju"></input>
				</view>

				<view class="cu-form-group ">
					<button class="cu-btn bg-blue shadow" form-type="submit">提交信息</button>
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
				bendi:false,
				index:-1,
				picker: ['春节在家未出行', '自驾出行','大巴汽车', '铁路火车','飞机出行'],
				index2:-1,
				picker2: ['租户', '业主'],
				shequ_id:''
			}
		},
		onLoad(e) {
			let qr = o.qrCode;
			let shequ_id = qr.split("?id=")[1];
			this.shequ_id = shequ_id;
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
			formSubmit(e){
				let params = e.detail.value;
				params.shenfen = this.picker2[this.index2];
				params.chuxing = this.picker[this.index];
				params.pid = uni.getStorageSync('pid');
				params.shequ_id = this.shequ_id;
				post(that.ali_app + 'member_add',params).then(res=>{
					if(res.code === 1){
						uni.reLaunch({
							url:'../pass/pass'
						})
					}else{
						showModal('温馨提示','登记失败，请重试')
					}
				});
				console.log(params);
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
			PickerChange2(e) {
				this.index2 = e.detail.value
			}
		}
	}
</script>

<style>

</style>
