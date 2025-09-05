/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const res = await fetch('/api/tools/dir?path=contents');
	const files: Array<string> = await res.json();
	return { files };
}
