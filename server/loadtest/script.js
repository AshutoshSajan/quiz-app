import http from 'k6/http';
import { sleep } from 'k6';
import { thresholdsSettings, breakingWorkload, smokeWorkload } from './config.js';
import { generateTOTP } from './2fa-helpers.js';

export const options = {
  scenarios: {
    my_scenario: __ENV.WORKLOAD === 'breaking' ? breakingWorkload : smokeWorkload,
  },
  thresholds: thresholdsSettings,
};

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
