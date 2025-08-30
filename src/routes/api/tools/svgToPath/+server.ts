import fs from 'node:fs';
import opentype from 'opentype.js';

opentype.load('your-font.ttf', (err, font) => {
	if (err) throw err;
	const path = font.getPath('x', 0, 0, 72); // (文字, x, y, 字号)
	const svgPath = path.toSVG(); // 得到 <path d="..."/>
	return svgPath;
});
