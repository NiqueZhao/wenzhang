<template>
	<view>
		<uni-calendar ref="calendar"  :insert="false" :lunar="true" :startDate="'2019-12-01'"
		 :endDate="'2025-12-31'" :range="true" @confirm="onSelected" />
		<!-- <mx-datepicker :show="showPicker" type="range" @confirm="onSelected" :show-seconds="true" @cancel="onCancel" /> -->
		<view class="cu-bar search bg-white" id="search">
			<view class="padding-left-sm">
				<picker :range="searchType" @change="change">
					<view style="display: flex;align-items: center;">{{searchType[index]}}
						<text class="cuIcon-triangledownfill" style="font-size: 16px;height: 16px;padding-left: 1upx;"></text>
					</view>
				</picker>
			</view>
			<view class="search-form round" v-if="index < 2">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" v-model="search_text" :adjust-position="false" type="text" placeholder="请输入搜索内容" confirm-type="search"></input>
			</view>
			<view class="search-form round flex justify-center" v-else-if ="index == 2">
				<view style="border-bottom: 1px solid #d1d1d1;padding-left: 20upx;"
				 @tap="openCalendar">{{startDate}} </view>
				<text style="padding: 0 10px;">至</text>
				<view style="border-bottom: 1px solid #d1d1d1;padding-left: 20upx;"
				 @tap="openCalendar">{{endDate}} </view>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @tap="searchSubmit">搜索</button>
			</view>
		</view>
		<scroll-view id="scroll" scroll-y = "true" :style="{height:scrollHeight}">
			<view class="cu-list menu card-menu margin-top-sm">
				<navigator v-for="(item,key) in list" :key="key" class="cu-item" :url="'../member_detail/info?id=' + item.id">
					<view class="content padding-tb-sm">
						<view><text class="cuIcon-peoplefill text-blue margin-right-xs"></text> {{item.name}}</view>
						<view class="text-gray ">
							<text class="cuIcon-phone margin-right-xs"></text> {{item.phonenumber}}
						</view>
						<view class="text-gray ">
							<text class="cuIcon-timefill margin-right-xs"></text> {{item.creatTime}}
						</view>
					</view>
					<view class="action">
						<view class="cu-tag round bg-green light">{{item.shenfen}}</view>
					</view>
				</navigator>
			</view>
		</scroll-view>

		
	</view>
</template>

<script>
	import MxDatepicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue';
	import {post,get,showModal} from '../../utils/index.js';
	export default {
		data() {
			return {
				startDate:'开始日期',
				endDate:'结束日期',
				InputBottom:0,
				index:0,
				showPicker:false,
				searchType: ['姓名', '手机', '日期'],
				scrollHeight:'',
				list:[],
				search_text:''
			}
		},
		components: {
			MxDatepicker,uniCalendar
		},
		onReady() {
			let _this = this;
			let segmented = uni.createSelectorQuery().select("#search");
			let sysinfo = uni.getSystemInfoSync();
			let Height = sysinfo.windowHeight;
			segmented.boundingClientRect(data=>{
				console.log(data);
				let sH = (Height - data.top - 46).toFixed();
				_this.scrollHeight = sH+'px';
				console.log(_this.scrollHeight);
			}).exec();
		},
		onLoad(){
			post(this.ali_app + 'memberList',{shequ_id:uni.getStorageSync('shequ').shequ_id}).then(res=>{
				console.log(res);
				this.list = res.data;
			})
		},
		methods: {
			change: function(e) {
				this.index = e.detail.value;
				if (this.index === 2) {
					this.openCalendar();
				}
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			onCancel:function(){
				this.showPicker = false
			},
			onSelected(data) {
				if(data.range.after === ""){
					showModal('温馨提示','请选择正确的时间范围');
					return false;
				}
				this.startDate = data.range.before;
				this.endDate = data.range.after;
				console.log(data);
			},
			searchSubmit(){
				let index = this.index;
				let params = {};
				params.type = index;
				params.shequ_id = uni.getStorageSync('shequ').shequ_id;
				if(index <2 ){
					params.text = this.search_text;
				}else if(index === 2){
					params.start_time = this.startDate;
					params.end_time = this.endDate;
				}
				post(this.ali_app + 'memberSearch',params).then(res=>{
					console.log(res);
					this.list = res.data;
				});
			},
			openCalendar(){
				this.$refs.calendar.open();
			}
		}
	}
</script>

<style>

</style>
