// Read data from stdin
const fs = require("fs")
const data = fs.readFileSync(0, 'utf-8');

const ranges = data.trim().split(',').map((r) => {
    console.log(r.split('-'));
    const [from, to] = r.split('-').map((i) => parseInt(i));
    return { from, to };
});

// Part 1 test
function isRepTwice(number) {
    const s = number.toString();
    const mid = s.length / 2;
    return s.slice(0, mid) == s.slice(mid);
}

// Part 2 test
function isRepAny(number) {
    const s = number.toString();
    outer: for(let len = 1; len <= s.length / 2; len++) {
        for(let i = len; i < s.length; i += len) {
            if (s.slice(0, len) != s.slice(i, i+len)) {
                continue outer;
            }
        }
        return true;
    }
    return false;
}

// Loop over each range
function* evalRange(f, {from, to}) {
    for (let i = from; i <= to; i++) {
        if (f(i)) yield i;
    }
}

// Main code
const part1 = ranges
    .flatMap((r) => [...evalRange(isRepTwice, r)])
    .reduce((a,x) => a+x);
const part2 = ranges
    .flatMap((r) => [...evalRange(isRepAny, r)])
    .reduce((a,x) => a+x);
console.log("Part 1: ", part1);
console.log("Part 2: ", part2);