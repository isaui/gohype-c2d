import { NextResponse } from 'next/server';
import { sendOTPEmail } from '../../../utils/email-service';
import { decryptOTP } from '../../../utils/crypto';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
    }

    const sent = await sendOTPEmail(email, decryptOTP(otp));

    if (sent) {
      return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in sendOTP API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}