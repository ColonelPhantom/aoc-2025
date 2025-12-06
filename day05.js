// Read data from stdin
const fs = require("fs")
const data = fs.readFileSync(0, 'utf-8').trim().split('\n');

const ranges = data
    .slice(0, data.indexOf(""))
    .map((range) => {
        const [from, to] = range.split("-").map((i) => parseInt(i));
        return { from, to };
    });
const items = data.slice(1 + data.indexOf(""));

console.log(ranges);
console.log(items);

const fresh_items = items.filter((item) => {
    return ranges.some(({from, to}) => from <= item && item <= to);
});


console.log("Part 1", fresh_items.length);

ranges.sort((a,b) => a.from - b.from);
let myIdx = ranges[0].from;
let sum = 0;
for (let range of ranges) {
    console.log(range, myIdx, sum);
    sum += Math.max(0, range.to+1 - Math.max(myIdx, range.from));
    myIdx = Math.max(myIdx, range.to+1);
}
console.log("Part 2", sum);