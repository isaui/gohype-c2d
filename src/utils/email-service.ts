import nodemailer from 'nodemailer';
import QRCode from 'qrcode';

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'no-reply@gohype.id',
    pass: `ZcfilL'#UU~W42l`,
  },
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
      `,
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

type TicketType = {
  id: string;
  title: string;
  recipient: string;
  date: string;
};

export const sendTicketsEmail = async (
  to: string,
  ticketBannerUrl: string,
  tickets: TicketType[],
) => {
  // Generate QR codes for all tickets
  const ticketsWithQR = await Promise.all(
    tickets.map(async (ticket) => {
      const img = await QRCode.toDataURL(ticket.id);
      return { ...ticket, qrCode: img };
    }),
  );

  // Build the HTML with the generated QR codes
  const ticketsHtml = ticketsWithQR
    .map((ticket) => {
      console.log(ticket.date);
      const date = new Date(ticket.date);
      console.log(date);
      const formatedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }).format(date);
      return `<div style="display: flex; align-items: center; border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin: 16px 0;">
      <img src="${ticket.qrCode}" style="width: 150px; height: 150px; margin-right: 16px;">
      <div style="flex-grow: 1;">
        <h2 style="margin: 0; font-size: 18px;">Cipete Creative District</h2>
        <p style="margin: 8px 0;">${formatedDate}</p>
        <div style="display: flex; justify-content: space-between;">
          <span>Ticket Holder</span>
          <span>${ticket.recipient}</span>
        </div>
      </div>
    </div>`;
    })
    .join(''); // Join the HTML strings into one

  console.log(ticketBannerUrl);

  const mailOptions = {
    from: 'no-reply@gohype.id',
    to: to,
    subject:
      '[GOHYPE] Cipete Creative District Ticket have been successfully purchased!',
    attachDataUrls: true,
    html: `
         <div style="width: 100%; max-width: 640px; margin: 0 auto;font-family: Arial, sans-serif; color: #333;">
          <div style="text-align: center; padding: 20px;">
          </div>
          <div style="padding-top: 20px;">
            <h1 style="font-size: 24px; margin-bottom: 16px;">Cipete Creative District</h1>
            <p style="margin-bottom: 16px;">Cipete Creative District adalah platform besar yang bertujuan untuk menampilkan komunitas kreatif di Cipete. Di sini, kamu bisa melihat kolaborasi menarik dari ekosistem pelaku bisnis di Cipete, di mana setiap interaksi antara komunitas dan pelaku bisnis akan meningkatkan nilai dari wilayah Cipete.</p>
          </div>
          <div style="padding: 20px 0;">
            ${ticketsHtml}
          </div>
        </div>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Ticket email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending ticket email:', error);
    return false;
  }
};
