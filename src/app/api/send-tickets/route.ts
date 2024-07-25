import { NextResponse } from 'next/server';
import { sendTicketsEmail } from '../../../utils/email-service';

export async function POST(request: Request) {
  try {
    const { email, ticketBannerUrl, tickets } = await request.json();
    if (!tickets || !email) {
      return NextResponse.json(
        { error: 'Tickets Detail and email are required' },
        { status: 400 },
      );
    }

    const sent = await sendTicketsEmail(email, ticketBannerUrl, tickets);

    if (sent) {
      return NextResponse.json(
        { message: 'Tickets sent successfully' },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { error: 'Failed to send Tickets' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Error in sendTickets API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
