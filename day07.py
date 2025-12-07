import sys
from collections import defaultdict

file = sys.stdin.read().strip().splitlines()

beams = {file[0].find("S"): 1} # only single starting beam

splits = 0
for line in file[1:]:
    newBeams = defaultdict(int)
    for beam, count in beams.items():
        if line[beam] == "^":
            splits += 1
            newBeams[beam-1] += count
            newBeams[beam+1] += count
        else:
            newBeams[beam] += count
    beams = newBeams

print("Part 1:", splits)
print("Part 2:", sum(beams.values()))