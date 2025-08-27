export function POST(url: string, body: unknown) {
	return fetch(url, {
		method: 'POST',
		body: JSON.stringify(body)
	});
}
