const fs = require("fs")
const data = fs.readFileSync(0, 'utf-8').trim().split('\n').map((line) => {
    const [x,y,z] = line.split(',').map((i) => parseInt(i));
    return {x,y,z};
});

function distanceSquared(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = a.z - b.z;
    return dx*dx + dy*dy + dz*dz;
}

let visited = new Set();
const pairs = data.flatMap((a) => {
    visited.add(a);
    return data.flatMap((b) => {
        if (visited.has(b)) return [];
        const dist = distanceSquared(a,b);
        return [{dist, a, b}];
    });
}).sort((a,b) => a.dist - b.dist);

// Part 1
const circuits = new Map(data.map((box) => [box, new Set([box])]));

function getCircs(circuitMap) {
    const circs = [...new Set(circuitMap.values())];
    circs.sort((a,b) => b.size - a.size);
    return circs.values().map((s) => s.size).take(3).reduce((a,b) => a*b);
}

for (let i = 0; i < pairs.length; i++) {
    if (i == 10) console.log("Part 1 example", getCircs(circuits));
    if (i == 1000) console.log("Part 1", getCircs(circuits));
    
    const pair = pairs[i];
    const newSet = circuits.get(pair.a).union(circuits.get(pair.b));

    if (newSet.size == data.length) {
        console.log("Part 2", pair.a.x*pair.b.x);
        break;
    }
    
    for (const circuit of newSet) {
        circuits.set(circuit, newSet);
    }
}

