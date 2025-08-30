import fs from 'node:fs';
import opentype from 'opentype.js';

opentype.load('./static/fonts/Monoton-Regular.ttf', (err, font) => {
	if (err) throw err;
	const path = font.getPath('x', 10, 85, 100); // (文字, x, y基线, 字号)
	const svgPath = path.toSVG(); // 得到 <path d="..."/>
	console.log(svgPath);
});
