<template>
	<view>
		<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
	</view>
</template>

<script>
	import uniIndexedList from '@/components/uni-indexed-list/uni-indexed-list.vue'
	import {post,get} from '../../utils/index.js';
	export default {
		data() {
			return {
				list:[],
				shequ_name:''
			}
		},
		components: {uniIndexedList},
		onReady() {
			get(this.ali_app+'shequ_list').then(res=>{
				this.list = res.list;
			});
		},
		methods: {
			bindClick(e){
				// console.log(e);
				// this.shequ_name = e.item.name;
				uni.navigateTo({
					url:'apply?name=' + e.item.name
				})
			}
		}
	}
</script>

<style>

</style>
