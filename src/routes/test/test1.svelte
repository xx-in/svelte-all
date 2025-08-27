<script lang="ts">
	import { sendKv } from '$lib';

	async function handleSend() {
		const data = await sendKv('get', ['key']);
		console.log('??data', data);
	}
</script>

<h1>测试 kv</h1>
<button onclick={handleSend}>发送请求</button>
