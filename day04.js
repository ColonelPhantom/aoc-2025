// Read data from stdin
const fs = require("fs")
const data = fs.readFileSync(0, 'utf-8').trim();

const grid = data.trim().split('\n').map((s) => s.split(''));

console.log(grid);

function clean_grid(mutate) {
    console.log("Cleaning grid");
    let sum = 0;
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] != "@") continue;
            let neighs = 0;
            for (let ii = i-1; ii <= i+1; ii++) {
                for (let jj = j-1; jj <= j+1; jj++) {
                    if (!grid[ii]) continue;
                    if (!grid[ii][jj]) continue;
                    if (ii==i && jj==j) continue;
                    if (grid[ii][jj] == "@") neighs++;
                }
            }
            if (neighs < 4) {
                sum++;
                if(mutate) grid[i][j] = ".";
            }
        }
    }
    return sum;
}

const part1 = clean_grid(false);

let part2 = 0;
let current;
do {
    current = clean_grid(true);
    part2 += current;
} while(current > 0);

// TODO: fix part1
console.log("Part 1", part1);
console.log("Part 2", part2);