<script lang="ts">
	async function handleSend() {
		const res = await fetch('/api/tools/favicon', {
			method: 'POST',
			body: JSON.stringify({
				target: 'http://localhost:5173/test'
			})
		});

		const text = await res.text();
		console.log(text);
	}
</script>

<h1>测试获取 html favicon</h1>
<button onclick={handleSend}>发送请求</button>
