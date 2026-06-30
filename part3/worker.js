// Number of sweep counts per interval (in milliseconds)
let P = 10; // 10 ms per interval

// Number of intervals in your trace (total 5 seconds)
let K = Math.floor(5000 / P); 

// Array to store your trace values
let T;

// Timestamp when trace recording starts
let start;

function record() {
    // Initialize array to hold trace values
    T = new Array(K).fill(-1);

    // Save start timestamp
    start = performance.now();

    // Loop through each interval
    for (let k = 0; k < K; k++) {
        let intervalStart = performance.now();
        let count = 0;

        // Only measure how many times we can loop in P milliseconds
        while (performance.now() - intervalStart < P) {
            count++;
        }

        // Save the number of loops for this interval
        T[k] = count;
    }

    // Send the trace back to the main thread
    postMessage(JSON.stringify(T));
}

// DO NOT MODIFY BELOW THIS LINE -- PROVIDED BY COURSE STAFF
self.onmessage = (e) => {
    if (e.data.type === "start") {
        setTimeout(record, 0);
    }
};
