export const smokeWorkload = {
  executor: 'shared-iterations',
  iterations: 5,
  vus: 1,
};

export const thresholdsSettings = {
  http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }],
  http_req_duration: ['p(99)<1000'],
};

export const breakingWorkload = {
  executor: 'ramping-vus',
  stages: [
    { duration: '10s', target: 20 },
    { duration: '50s', target: 20 },
    { duration: '50s', target: 40 },
    { duration: '50s', target: 60 },
    { duration: '50s', target: 80 },
    { duration: '50s', target: 100 },
    { duration: '50s', target: 120 },
    { duration: '50s', target: 140 },
    //....
  ],
};

// options for smoke test
export const smokeTestWorkload = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '1m', // This can be shorter or just a few iterations
};

// avg load testing
export const avgLoadTestWorkload = {
  // Key configurations for avg load test in this section
  stages: [
    { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '30m', target: 100 }, // stay at 100 users for 30 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
};

// option for stress test
export const stressWorkload = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '10m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
    { duration: '30m', target: 200 }, // stay at higher 200 users for 30 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
};

// option for Soak test
export const soakWorkload = {
  // Key configurations for Soak test in this section
  stages: [
    { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '8h', target: 100 }, // stay at 100 users for 8 hours!!!
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
};

// option for spike test
export const spikeWorkload = {
  // Key configurations for spike in this section
  stages: [
    { duration: '2m', target: 2000 }, // fast ramp-up to a high point
    // No plateau
    { duration: '1m', target: 0 }, // quick ramp-down to 0 users
  ],
};

// option for breakpoint test
export const breakpointWorkload = {
  // Key configurations for breakpoint in this section
  executor: 'ramping-arrival-rate', //Assure load increase if the system slows
  stages: [
    { duration: '2h', target: 20000 }, // just slowly ramp-up to a HUGE load
  ],
};
