// Number of sweep counts per interval (in milliseconds)
let P = 50; // Small interval for responsiveness

// Number of intervals in your trace (total 5 seconds)
let K = Math.floor(5000 / P); 

// Array to store your trace values
let T;

// Timestamp when trace recording starts
let start;

function record() {
  // Initialize array to hold trace values
  T = new Array(K).fill(-1);

  // Create a large buffer to simulate the cache footprint
  const N = 32 * 1024 * 1024;
  const STRIDE = 16;
  let buffer = new Array(N).fill(0);

  // Save start timestamp
  start = performance.now();

  // Loop through each interval
  for (let k = 0; k < K; k++) {
    let intervalStart = performance.now();
    let count = 0;

    // Repeatedly traverse buffer for P milliseconds
    while (performance.now() - intervalStart < P) {
      for (let i = 0; i < N; i += STRIDE) {
        buffer[i] += 1;
      }
      count++;
    }

    // 🔥 ADD NOISE (countermeasure simulation)
    let noise = Math.random() * 5;  // random noise
    T[k] = count + noise;
  }

  // Send the collected trace back to the main thread
  postMessage(JSON.stringify(T));
}

// DO NOT MODIFY BELOW THIS LINE -- PROVIDED BY COURSE STAFF
self.onmessage = (e) => {
  if (e.data.type === "start") {
    setTimeout(record, 0);
  }
};