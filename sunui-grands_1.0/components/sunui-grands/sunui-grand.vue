<template name='sunui-grand'>
	<view>
		<view v-show="isHide">
			<view class="sunui-grand-hide-bg" :style="'background-color:'+bg+';'" :class="isBt?'isbottomyes':'isbottomno'">
				<view class="sunui-grand-summary numbersty" :style="'-webkit-line-clamp:'+clamp+';'">
					{{ content }}
				</view>
				<view class="sunui-grand-show-btn" v-show="isHidebt" :style="'background-color:'+btbg+';'">
					<view @tap="show" class="text-right">
						<text>...</text>
						<text :style="{color:color}">{{expandText}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-show="!isHide">
			<view class="sunui-grand-show-bg numbersty" :style="'background-color:'+bg+';'" :class="isBt?'isbottomyes':'isbottomno'">
				<view>
					{{ content }}
				</view>
				<view class="sunui-grand-hide-btn" v-show="isHidebt" :style="'background-color:'+btbg+';'">
					<view @tap="hide" class="text-right">
						<text :style="{color:color}">{{shinkText}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				isHide: true,
				isHidebt: true,
				isBt:true
			};
		},
		name: 'sunui-grand',
		props: {
			clamp: {
				type: [Number, String],
				default: `4`
			},
			color: {
				type: String,
				default: `#1E9FFF`
			},
			content: {
				type: [String, Object],
				default: ``
			},
			bg: {
				type: String,
				default: ``
			},
			expandText: {
				type: String,
				default: "全文∨"
			},
			shinkText: {
				type: String,
				default: "收起∧"
			},
			btbg:{
				type: String,
				default: "#FFFFFF"
			}
		},
		created() {
			_self = this;
		},
		methods: {
			show() {
				let _this = this;
				_this.isHide = false;
			},
			hide() {
				let _this = this;
				_this.isHide = true;
			}
		},
		mounted:function(){
			if(this.$props.content.length < 75) {
				let _this = this;
				_this.isHidebt = false;
				_this.isBt=false;
			}
		}
	}
</script>

<style>
	.sunui-grand-summary {
		overflow: hidden;
		display: -webkit-box;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
	}

	.sunui-grand-show-btn {
		width: 3rem;
		position: relative;
		top: -1.4rem;
		left: 14.8rem;
	}

	.sunui-grand-hide-btn {
		width: 3rem;
		position: relative;
		top: -1.4rem;
		left: 14.6rem;
	}
	.numbersty{
		word-break:break-all;
		/*防止数字字母溢出*/
		text-align: justify;
		/*防止文字参差不齐*/
		padding: 0.2rem;
	}
	.isbottomyes{
		margin-bottom: -1rem;
	}
	.isbottomno{
	}
</style>
