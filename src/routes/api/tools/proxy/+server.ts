import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ request }) => {
	const url = new URL(request.url);
	const search = new URLSearchParams(url.search);
	const path = search.get('url')!;
	console.log('??path');
	return fetch(path);
};
