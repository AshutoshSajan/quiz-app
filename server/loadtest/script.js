import http from 'k6/http';
import { sleep } from 'k6';
import crypto from 'k6/crypto';

// options for smoke test
export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '1m', // This can be shorter or just a few iterations
};

// // avg load testing
// export const options = {
//   // Key configurations for avg load test in this section
//   stages: [
//     { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
//     { duration: '30m', target: 100 }, // stay at 100 users for 30 minutes
//     { duration: '5m', target: 0 }, // ramp-down to 0 users
//   ],
// };

// // option for stress test
// export const options = {
//   // Key configurations for Stress in this section
//   stages: [
//     { duration: '10m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
//     { duration: '30m', target: 200 }, // stay at higher 200 users for 30 minutes
//     { duration: '5m', target: 0 }, // ramp-down to 0 users
//   ],
// };

// // option for Soak test
// export const options = {
//   // Key configurations for Soak test in this section
//   stages: [
//     { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
//     { duration: '8h', target: 100 }, // stay at 100 users for 8 hours!!!
//     { duration: '5m', target: 0 }, // ramp-down to 0 users
//   ],
// };

// // option for spike test
// export const options = {
//   // Key configurations for spike in this section
//   stages: [
//     { duration: '2m', target: 2000 }, // fast ramp-up to a high point
//     // No plateau
//     { duration: '1m', target: 0 }, // quick ramp-down to 0 users
//   ],
// };

// // option for breakpoint test
// export const options = {
//   // Key configurations for breakpoint in this section
//   executor: 'ramping-arrival-rate', //Assure load increase if the system slows
//   stages: [
//     { duration: '2h', target: 20000 }, // just slowly ramp-up to a HUGE load
//   ],
// };

function base32Decode(base32) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  let value = 0;

  for (let i = 0; i < base32.length; i += 1) {
    value = alphabet.indexOf(base32.charAt(i).toUpperCase());
    bits += value.toString(2).padStart(5, '0');
  }

  const byteArray = [];

  for (let i = 0; i + 8 <= bits.length; i += 8) {
    byteArray.push(parseInt(bits.substr(i, 8), 2));
  }

  return new Uint8Array(byteArray);
}

function generateTOTP(secret, timeStep = 30, digits = 6) {
  const key = base32Decode(secret);
  const epoch = Math.floor(Date.now() / 1000.0);
  const time = Math.floor(epoch / timeStep);
  const timeBuffer = new ArrayBuffer(8);
  const timeArray = new DataView(timeBuffer);

  timeArray.setUint32(4, time, false);

  const hmac = crypto.hmac('sha1', key, timeBuffer, 'hex');
  const offset = parseInt(hmac.substring(hmac.length - 1), 16);
  const otp =
    (parseInt(hmac.substring(offset * 2, offset * 2 + 8), 16) & 0x7fffffff) %
    10 ** digits;

  return otp.toString().padStart(digits, '0');
}

export default function () {
  const deviceInfo = '';
  const deviceId = '';
  const testToken = '';

  const params = {
    headers: {
      'x-device-info': deviceInfo,
      'x-device-id': deviceId,
      'x-test-token': testToken,
      'Content-Type': 'application/json',
    },
  };

  const baseUrl = '';

  const countryCode = '';
  const phone = '';
  const otp = '';

  const requestLoginOtpPayload = JSON.stringify({
    countryCode,
    phone,
  });

  const requestLoginOtpResonse = http.post(
    `${baseUrl}/v1/auth/request-login-otp`,
    requestLoginOtpPayload,
    params,
  );

  // console.log(
  //   JSON.stringify(
  //     { requestLoginOtpResonse: requestLoginOtpResonse.body },
  //     null,
  //     2,
  //   ),
  // );

  const requestLoginPayload = JSON.stringify({
    countryCode,
    phone,
    otp,
  });

  const loginResponse = http.post(
    `${baseUrl}/v1/auth/login`,
    requestLoginPayload,
    params,
  );

  // console.log(JSON.stringify({ loginResponse: loginResponse.body }, null, 2));

  const { data } = JSON.parse(loginResponse.body);

  params.headers.Authorization = `Bearer ${data.accessToken}`;

  const secret = '';

  const totp = generateTOTP(secret);

  const verifyTotpPayload = JSON.stringify({
    otp2FA: totp,
  });

  const verifyTotpResponse = http.post(
    `${baseUrl}/v1/auth/verify-totp`,
    verifyTotpPayload,
    params,
  );

  // console.log(
  //   JSON.stringify({ verifyTotpResponse: verifyTotpResponse.body }, null, 2),
  // );

  const {
    data: { accessToken, refreshToken },
  } = JSON.parse(verifyTotpResponse.body);

  // console.log({ accessToken, refreshToken });

  params.headers.Authorization = `Bearer ${accessToken}`;

  const userDetailsResponse = http.get(`${baseUrl}/v1/users/details`, params);

  sleep(1);
  // console.log(
  //   JSON.stringify({ userDetailsResponse: userDetailsResponse.body }, null, 2),
  // );
}
