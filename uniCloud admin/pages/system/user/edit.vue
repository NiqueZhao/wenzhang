<template>
	<view class="uni-container">
		<uni-forms ref="form" v-model="formData" :rules="rules" validateTrigger="bind" @submit="submit">
			<uni-forms-item name="username" label="用户名">
				<input placeholder="请输入用户名" @input="binddata('username', $event.detail.value)" class="uni-input-border" :value="formData.username" />
			</uni-forms-item>
			<!-- <uni-forms-item name="password" label="初始密码">
				<input placeholder="请输入初始密码" @input="binddata('password', $event.detail.value)" class="uni-input-border" :value="formData.password" />
			</uni-forms-item> -->
			<uni-forms-item name="role" label="角色列表">
				<uni-data-checklist multiple v-if="roles.length" :value="formData.role" :range="roles" @change="binddata('role', $event.detail.value)"></uni-data-checklist>
				<view v-else class="uni-form-item-empty">
					暂无
				</view>
			</uni-forms-item>
			<uni-forms-item name="mobile" label="手机号">
				<input placeholder="手机号" @input="binddata('mobile', $event.detail.value)" class="uni-input-border" :value="formData.mobile" />
			</uni-forms-item>
			<uni-forms-item name="email" label="邮箱">
				<input placeholder="邮箱" @input="binddata('email', $event.detail.value)" class="uni-input-border" :value="formData.email" />
			</uni-forms-item>
			<uni-forms-item name="status" label="用户状态">
				<switch v-if="Number(formData.status) < 2" @change="binddata('status', $event.detail.value)" :checked="formData.status" />
				<view v-else class="uni-form-item-empty">{{parseUserStatus(formData.status)}}</view>
			</uni-forms-item>
			<view class="uni-button-group">
				<button style="width: 100px;" type="primary" class="uni-button" @click="submitForm">提交</button>
				<navigator open-type="navigateBack" style="margin-left: 15px;"><button style="width: 100px;" class="uni-button">返回</button></navigator>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	import validator from '@/js_sdk/validator/uni-id-users.js';

	const db = uniCloud.database();
	const dbCmd = db.command;
	const dbCollectionName = 'uni-id-users';

	function getValidator(fields) {
		let reuslt = {}
		for (let key in validator) {
			if (fields.includes(key)) {
				reuslt[key] = validator[key]
			}
		}
		return reuslt
	}

	export default {
		data() {
			return {
				formData: {
					"username": "",
					"role": [],
					"mobile": "",
					"email": "",
					"status": false //默认禁用
				},
				rules: {
					...getValidator(["username", "password", "role", "mobile", "email"]),
					"status": {
						"rules": [{
							"format": "bool"
						}]
					}
				},
				roles: []
			}
		},
		onLoad(e) {
			const id = e.id
			this.formDataId = id
			this.getDetail(id)
			this.loadroles()

		},
		methods: {
			/**
			 * 触发表单提交
			 */
			submitForm(form) {
				this.$refs.form.submit();
			},

			/**
			 * 表单提交
			 * @param {Object} event 回调参数 Function(callback:{value,errors})
			 */
			submit(event) {
				const {
					value,
					errors
				} = event.detail

				// 表单校验失败页面会提示报错 ，要停止表单提交逻辑
				if (errors) {
					return
				}
				uni.showLoading({
					title: '修改中...',
					mask: true
				})

				// 是否启用功能的数据类型转换， 0 正常， 1 禁用
				if (typeof value.status === "boolean") {
					value.status = Number(!value.status)
				}


				// 使用 uni-clientDB 提交数据
				db.collection(dbCollectionName).where({
					_id: this.formDataId
				}).update(value).then((res) => {
					uni.showToast({
						title: '修改成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},

			/**
			 * 获取表单数据
			 * @param {Object} id
			 */
			getDetail(id) {
				uni.showLoading({
					mask: true
				})
				db.collection(dbCollectionName)
				.doc(id)
				.field('username,role,mobile,email,status')
				.get()
				.then((res) => {
					const data = res.result.data[0]
					if (data) {
						if (data.status === undefined) {
							data.status = true
						}
						if (data.status === 0) {
							data.status = true
						}
						if (data.status === 1) {
							data.status = false
						}
						this.formData = data
					}
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			loadroles() {
				db.collection('uni-id-roles').limit(500).get().then(res => {
					const roleIds = []
					this.roles = res.result.data.map(item => {
						roleIds.push(item.role_id)
						return {
							value: item.role_id,
							text: item.role_name
						}
					})
					if (roleIds.indexOf('admin') === -1) {
						this.roles.unshift({
							value: 'admin',
							text: '超级管理员'
						})
					}
				}).catch(err => {
					uni.showModal({
						title: '提示',
						content: err.message,
						showCancel: false
					})
				})
			},
			// status 对应文字显示
			parseUserStatus(status) {
				if (status === 0) {
					return '启用'
				} else if (status === 1) {
					return '禁用'
				} else if (status === 2) {
					return '审核中'
				} else if (status === 3) {
					return '审核拒绝'
				} else {
					return '启用'
				}
			}
		}
	}
</script>
