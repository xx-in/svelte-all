import { nanoid } from 'nanoid';

function _setStyle() {
	const stylesMap = {} as Record<string, HTMLStyleElement>;
	function inner(styleContent: string, id: string = nanoid()) {
		if (stylesMap[id]) {
			stylesMap[id].textContent = styleContent;
		} else {
			const style = document.createElement('style');
			style.textContent = styleContent;
			document.head.appendChild(style);
		}
	}
	return inner;
}

/**
 * 使用css修改全局样式
 */
export const setStyle = _setStyle();
