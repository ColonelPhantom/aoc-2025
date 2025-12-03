// Read data from stdin
const fs = require("fs")
const data = fs.readFileSync(0, 'utf-8');

// Make each battery bank an array of numbers
const banks = data.trim().split('\n').map((bank) => 
    bank.split('').map((d) => parseInt(d))
);

// Find optimal substring with length=digits
function optimizeBank(bank, digits) {
    let idx = 0;    // First allowed index (begin-pointer)
    let jolts = 0;  // joltage achieved so far
    for(let i = digits-1; i >= 0; i--) {
        // Exclude digits that are before the begin-pointer
        // or have less than i trailing digits
        // (with special-case for i=0 because of wraparound)
        const bankSub = bank.slice(idx, i==0 ? undefined : -i);
        // Greedily pick the best digit among the allowed ones
        const digit = Math.max(...bankSub);
        // Set new begin-pointer to after the picked digit
        idx += bankSub.indexOf(digit)+1;
        jolts = 10 * jolts + digit; // update joltage
    }
    return jolts;
}

const part1 = banks.map((b) => optimizeBank(b, 2)).reduce((a,x) => a+x);
const part2 = banks.map((b) => optimizeBank(b, 12)).reduce((a,x) => a+x);
console.log("Part 1", part1);
console.log("Part 2", part2);