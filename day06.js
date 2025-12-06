const fs = require("fs")
const data = fs.readFileSync(0, 'utf-8').trim().split('\n');

function part1(data) {
    const words = data.map((line) => line.split(" ").filter((n) => n != ""));
    
    const nums = words.slice(0, data.length-1);
    const ops = words.at(-1);
    
    let sum = 0;
    for(let i = 0; i < ops.length; i++) {
        const res = nums
            .map((arr) => arr[i])
            .reduce((a,n) => eval(a + ops[i] + n));
        sum += res;
    }
    
    return sum;
}


function part2(data) {
    const nums = data.slice(0, data.length - 1);
    const words = data.map((line) => line.split(" ").filter((n) => n != ""));
    const ops = words.at(-1);

    const cols = nums[0].split("").map((_elem, idx) => {
        return parseInt("".concat(...nums.map((r) => r[idx])));
    });
    cols.push(NaN);


    let i = 0;
    let formula = [];
    let sum = 0;
    for (let n of cols) {
        if (isNaN(n)) {
            sum += formula.reduce((a,n) => eval(a + ops[i] + n));
            i++;
            formula = [];
        } else {
            formula.push(n);
        }
    }
    

    return sum;
}


// console.log(numsTr);
console.log("Part 1", part1(data));
console.log("Part 2", part2(data));