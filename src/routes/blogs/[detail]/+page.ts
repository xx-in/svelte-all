import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const mdPath = `/contents/${params.detail}.md`;
	const res = await fetch(mdPath);
	const detailContent = await res.text();
	if (detailContent.startsWith('<!doctype html>')) {
		error(404, '路由不存在');
	}
	return {
		detailContent
	};
}
