/**
 * 链接数据类型
 */
export interface ILinkItem {
	href: string;
	icon: string;
	title: string;
	category: string;
	key?: Array<string>;
}

/**
 * 新增数据的类型
 */
export type ILinkAppendItem = Record<
	'href' | 'icon' | 'title' | 'category',
	{
		label: string;
		placeholder: string;
		[key: string]: unknown;
	}
>;
