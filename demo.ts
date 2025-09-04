let colors = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone'
];

let weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

let result = [];

for (let weight of weights) {
    for (let color of colors) {
        result.push(`bg-${color}-${weight}`);
    }
}

console.log(JSON.stringify(result));
