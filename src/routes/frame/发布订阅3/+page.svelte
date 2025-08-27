<script>
	// @ts-nocheck

	import { onMount } from 'svelte';

	function init() {
		const firstName = document.getElementById('firstName');
		const lastName = document.getElementById('lastName');
		const fullName = document.getElementById('fullName');

		const data = new Proxy(
			{
				firstName: '',
				lastName: '',
				fullName: ''
			},
			{
				set(obj, prop, newValue) {
					const oldValue = obj[prop];
					obj[prop] = newValue;
					/**
					 * 通过发布订阅模式触发对应的事件
					 */
					dataEvents.update(prop, newValue, oldValue);
				}
			}
		);

		/**
		 * 发布订阅器
		 * 核心就是为每个属性维护了一个函数执行数组
		 * 这样就可以通过 push 操作添加订阅
		 */
		const dataEvents = {
			update(prop, newValue, oldValue) {
				dataEvents[prop].forEach((cb) => {
					cb(newValue, oldValue);
				});
			},
			firstName: [],
			lastName: [],
			fullName: []
		};

		/**
		 * 添加函数订阅，对于每个属性都可以单独订阅
		 */
		dataEvents.firstName.push(function (newValue) {
			firstName.value = newValue;
		});

		dataEvents.firstName.push(function (newValue) {
			data.fullName = data.firstName + data.lastName;
		});

		dataEvents.lastName.push(function (newValue) {
			lastName.value = newValue;
		});

		dataEvents.lastName.push(function (newValue) {
			data.fullName = data.firstName + data.lastName;
		});

		dataEvents.fullName.push(function (newValue) {
			fullName.innerText = newValue;
		});

		firstName.addEventListener('input', (e) => {
			data.firstName = e.target.value;
		});

		lastName.addEventListener('input', (e) => {
			data.lastName = e.target.value;
		});

		data.firstName = '姓';
		data.lastName = '名';

		// 这段代码可以先注释掉，通过在控制套粘贴也是可以被触发的
		dataEvents.fullName.push(function (newValue, oldValue) {
			console.log(`将 fullName 从 ${oldValue} 变更为 ${newValue}`);
		});

		console.log(dataEvents);
	}
	onMount(init);
</script>

<svelte:head>
	<title>发布订阅3</title>
</svelte:head>

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
