import { json, type RequestHandler } from '@sveltejs/kit';
import * as cheerio from 'cheerio';

function extractShortcutIcon(html: string, baseUrl?: string) {
	console.log(html);
	const $ = cheerio.load(html);
	const title = $('title').text();
	const candidates: Array<{ rel: string; href: string; sizes?: string; type?: string }> = [];

	$('link[rel]').each((_, el) => {
		const rel = ($(el).attr('rel') || '').toLowerCase();
		const href = $(el).attr('href');
		console.log(rel);

		if (!href) return;

		// 关注几类常见图标
		if (
			rel.includes('icon') ||
			rel.includes('shortcut icon') ||
			/\bicon\b/.test(rel) ||
			rel.includes('apple-touch-icon') ||
			rel.includes('mask-icon')
		) {
			candidates.push({
				rel,
				href,
				sizes: $(el).attr('sizes') || '',
				type: $(el).attr('type') || ''
			});
		}
	});

	console.log(
		'??candidates',
		candidates.map((item) => item.href)
	);

	if (candidates.length === 0) {
		return {
			title,
			icon: ''
		};
	}

	// 简单打分：shortcut icon > icon > apple-touch > mask；带尺寸更优；favicon.ico 小加分；svg 小加分
	const score = (c: any) => {
		let s = 0;
		if (c.rel.includes('shortcut icon')) s += 50;
		if (/\bicon\b/.test(c.rel)) s += 40;
		if (c.rel.includes('apple-touch-icon')) s += 30;
		if (c.rel.includes('mask-icon')) s += 20;
		if (/favicon\.ico$/i.test(c.href)) s += 10;
		if (/svg/i.test(c.type) || /\.svg$/i.test(c.href)) s += 5;

		const m = String(c.sizes).match(/(\d+)x(\d+)/);
		if (m) {
			const area = Number(m[1]) * Number(m[2]);
			s += Math.min(area, 64 * 64) / 64; // 适度偏好更大但到 64x64 封顶
		}
		return s;
	};
	const sorted = candidates.sort((a, b) => score(b) - score(a));

	const best = sorted[0];
	const abs = baseUrl ? new URL(best.href, baseUrl).toString() : best.href;
	return {
		icon: abs,
		title
	};
}
/**
 * 获取 target 路径中的图标文件
 * @param param0
 * @returns
 */
export const POST: RequestHandler = async ({ request }) => {
	try {
		const { target } = await request.json();
		const res = await fetch(target);
		const html = await res.text();
		const result = extractShortcutIcon(html, target);
		return json(result);
	} catch (err) {
		return json({
			icon: '',
			title: ''
		});
	}
};
