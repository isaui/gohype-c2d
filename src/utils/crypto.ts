const SECRET_KEY = process.env.NEXT_PUBLIC_OTP_SECRET_KEY!; 
const API_SECRET_KEY = process.env.OTP_SECRET_KEY!; 


export function encryptOTP(otp: string): string {
  let result = '';
  for (let i = 0; i < otp.length; i++) {
    const charCode = otp.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
    result += String.fromCharCode(charCode);
  }
  return btoa(result); 
}

export function decryptOTP(encryptedOTP: string): string {
  const decoded = atob(encryptedOTP); 
  let result = '';
  for (let i = 0; i < decoded.length; i++) {
    const charCode = decoded.charCodeAt(i) ^ API_SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}