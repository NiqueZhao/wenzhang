<template>
	<view>
		<view class="qiun-charts">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
		<view class="padding-top-sm">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">登记表</view>
			</view>
			<z-table :tableData='tableData' :columns='columns' :showBottomSum="true"></z-table>
		</view>
	</view>
</template>

<script>
	import zTable from "../../components/z-table/z-table.vue";
	import uCharts from '../../components/u-charts/u-charts.js';
	import {get,post} from '@/utils/index.js'
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				titles: ['普通', '隔离', '发烧', '疑似症状', '确诊', '死亡'],
				tableData: false,
				columns: []
			}
		},
		components: {
			zTable
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			_self.Getcolumns();
			_self.GetServerData();
		},
		methods: {
			Getcolumns(){
				let columns = [];
				columns.push({
					title: "日期",
					key: "date"
				})
				for (let i in this.titles) {
					columns.push({
						title: this.titles[i],
						key: 'status' + i
					})
				}
				columns.push({
					title: "当日总计",
					key: "sum"
				});
				console.log(columns);
				this.columns = columns;
			},
			GetServerData(){
				get(_self.ali_app + "chartData").then(res=>{
					let LineA={categories:[],series:[]};
					LineA.categories=res.categories;
					LineA.series=res.series;
					_self.showLineA("canvasLineA",LineA,4);
				});
				get(_self.ali_app + "tabeDate").then(res=>{
					console.log(res);
					let data = res;
					_self.tableData = data;
				});
				
			},
			touchLineA(e) {
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						return category + ' ' + item.name + ':' + item.data 
					}
				});
			},
			showLineA(canvasId, chartData, splitNumber) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: true,
						position: 'top'
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type: 'grid',
						// disableGrid: true,
						labelCount: 7,
						scrollShow: true,
						rotateLabel: true
					},
					yAxis: {
						gridType: 'solid',
						gridColor: '#CCCCCC',
						splitNumber: splitNumber < 4 ? splitNumber : 5,
						format: (val) => {
							return val.toFixed(0) + '人'
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});
			
			}
		}
	}
</script>

<style>
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
