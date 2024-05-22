import crypto from 'k6/crypto';

export function base32Decode(base32) {
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

export function generateTOTP(secret, timeStep = 30, digits = 6) {
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
