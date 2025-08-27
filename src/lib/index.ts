type IOperate = 'get' | 'set';
export async function sendKv(operate: IOperate, key: Array<string>, ...params: Array<unknown>) {
	const res = await fetch('/api/kv', {
		method: 'POST',
		body: JSON.stringify({
			operate,
			params: [key, ...params]
		})
	});

	const { data } = await res.json();
	return data;
}
