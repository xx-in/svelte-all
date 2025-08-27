<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	onMount(init);

	async function init() {
		const firstName = document.getElementById('firstName');
		const lastName = document.getElementById('lastName');
		const fullName = document.getElementById('fullName');

		const data = {
			firstName: '',
			lastName: '',
			fullName: ''
		};

		/**
		 * 更新 fullName 数据
		 * 同时将数据更新到模版上
		 */
		function updateFullName() {
			data.fullName = data.firstName + data.lastName;
			fullName.innerText = data.fullName;
		}

		firstName.addEventListener('input', (e) => {
			data.firstName = e.target.value;
			// 触发更新
			updateFullName();
		});

		lastName.addEventListener('input', (e) => {
			data.lastName = e.target.value;
			// 触发更新
			updateFullName();
		});
	}
</script>

<svelte:head>
	<title>发布订阅1</title>
</svelte:head>

<!-- 定义HTML结构 -->
<div>
	<div>
		<span>姓:</span>
		<input id="firstName" placeholder="请输入姓" />
	</div>
	<div>
		<span>名:</span>
		<input id="lastName" placeholder="请输入名" />
	</div>
	<div>
		<span>姓名: </span>
		<span id="fullName"></span>
	</div>
</div>
