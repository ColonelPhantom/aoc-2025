const fs = require("fs")
const data = fs.readFileSync(0, 'utf-8');

const cmds = data.trim().split("\n");
let dial = 50;
let pass1 = 0;
let pass2 = 0;
for (const c of cmds) {
    const amount = parseInt(c.slice(1));
    const spins = Math.floor(amount / 100);
    const change = amount % 100;
    const dir = c[0] == "R" ? 1 : -1;

    // why does JS not have a normal modulo operator?
    const newPos = (((dial + dir*change) % 100) + 100) % 100;
    if (newPos == 0) pass1++;
    pass2 += spins;
    if (((newPos - dial) * dir < 0 || newPos == 0) && dial != 0) pass2++;
    console.log(c, newPos, dial, dir, (newPos-dial)*dir);
    dial = newPos;
}
console.log("Final dial position", dial);
console.log("Part 1", pass1);
console.log("Part 2", pass2);