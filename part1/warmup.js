const runs = 10;

function measureOneLine() {
  const LINE_SIZE = 16; // 128/sizeof(double) Note that JS treats all numbers as double
  let result = [];

  // Fill with -1 to ensure allocation
  const M = new Array(runs * LINE_SIZE).fill(-1);

  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    let val = M[i * LINE_SIZE];
    const end = performance.now();

    result.push(end - start);
  }

  return result;
}

function measureNLines() {
  let result = [];

  // Original N values from the assignment
  let N_values = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];
  let stride = 64; // approximate cache line size

  for (let N of N_values) {
    let times = [];

    // Use a safe max array size (100,000 cache lines) to avoid crashing
    let safeN = Math.min(N, 100000);
    let arr = new Array(safeN * stride).fill(1);

    for (let r = 0; r < 10; r++) {
      let sum = 0;
      let start = performance.now();

      // Repeat over the smaller array to simulate N accesses
      let loops = Math.ceil(N / safeN);
      for (let l = 0; l < loops; l++) {
        for (let i = 0; i < safeN; i++) {
          sum += arr[i * stride];
        }
      }

      let end = performance.now();
      times.push(end - start);
    }

    // Compute median
    times.sort((a, b) => a - b);
    let median = times[Math.floor(times.length / 2)];
    result.push(median);
  }

  return result;
}

document.getElementById(
  "exercise1-values"
).innerText = `1 Cache Line: [${measureOneLine().join(", ")}]`;

document.getElementById(
  "exercise2-values"
).innerText = `N Cache Lines: [${measureNLines().join(", ")}]`;