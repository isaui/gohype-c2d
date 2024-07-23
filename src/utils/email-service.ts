import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'no-reply@gohype.id',
    pass: `ZcfilL'#UU~W42l`
  }
});

export const sendOTPEmail = async (to: string, otp: string) => {
    const mailOptions = {
      from: 'no-reply@gohype.id',
      to: to,
      subject: '[GOHYPE] OTP Verification',
      text: `Dear Customer,
  
  Your One Time Password (OTP): ${otp}
  This code is confidential, please do not share to anyone.
  
  Thank you.
  
  Sincerely,
  GOHYPE`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <h2 style="color: #1e293b; font-size: 24px; font-weight: 600; margin-bottom: 16px;">Dear Customer,</h2>
          <p style="color: #475569; font-size: 16px; margin-bottom: 16px;">Your One Time Password (OTP):</p>
          <div style="background-color: #e2e8f0; padding: 16px; border-radius: 4px; text-align: center; margin-bottom: 16px;">
            <h1 style="color: #2563eb; font-size: 36px; font-weight: 700; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">This code is confidential, please do not share to anyone.</p>
          <p style="color: #475569; font-size: 16px; margin-bottom: 8px;">Thank you.</p>
          <p style="color: #475569; font-size: 16px; margin-top: 24px;">Sincerely,<br><strong>GOHYPE</strong></p>
        </div>
      `
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('OTP email sent successfully');
      return true;
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return false;
    }
  };