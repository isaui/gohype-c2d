import Navbar from '@/components/shared/Navbar';
import BuyTicketSection from './sections/BuyTicketSection';
import DescriptionSection from './sections/DescriptionSection';
import FAQSection from './sections/FAQSection';
import ImagesSection from './sections/ImagesSection';
import RefundPolicySection from './sections/RefundPolicySection';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/utils/supabase/server';
import { getLowestPriceFromAllTickets, ticketReducer } from './utils';
import BoxSection from './sections/BoxSection';

const BuyTicketModule = async () => {
  const currentBranchId = process.env.NEXT_PUBLIC_BRANCH_ID!;
  const supabase = createClient();
  const result = await supabase
    .from('branch')
    .select(
      `*, 
        faqs(*), 
        ticket(*,
        regular_ticket(*),
        booking_ticket(*))`,
    )
    .eq('id', currentBranchId)
    .single();
  const ticketList = result.data
    ? ticketReducer(undefined, {
        type: 'GROUP_TICKETS',
        payload: result.data.ticket,
      })
    : [];
  const faqList = result.data ? result.data.faqs : [];
  const branchName = result.data?.branch_name ?? '';
  const branchDescription = result.data?.branch_description ?? '';
  const locationUrl = result.data?.map_url ?? '';
  const address = result.data?.address ?? '';
  const playgroundOpenTimeWeekday = result.data?.weekday_open_time_label ?? '';
  const playgroundOpenTimeWeekend = result.data?.weekend_open_time_label ?? '';
  const refundTitle = result.data ? result.data.refund_policy_title : '';
  const refundDescription = result.data
    ? result.data.refund_policy_content
    : '';
  const regularTicketList = result.data ? (ticketList as any).Regular : [];
  const bookingTicketList = result.data
    ? (regularTicketList as any).Booking
    : [];
  const lowestTicket = getLowestPriceFromAllTickets(
    bookingTicketList,
    regularTicketList,
  );
  const images = result.data?.branch_images ?? [];

  return (
    <div className="flex flex-col w-screen min-h-screen bg-background items-center pt-16 pb-10">
      <Navbar />
      <ImagesSection imageList={images} />
      <div className="flex flex-row-reverse gap-x-4 md:gap-x-8 w-full max-w-7xl">
        <div className="w-[28rem] hidden md:flex">
          <Card className="h-fit w-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Image
                  src={'/ticket-icon.svg'}
                  className="w-10 h-auto"
                  width={1}
                  height={1}
                  alt="ticket icon"
                />
                <p className="text-secondary text-sm">
                  {`You haven't selected a ticket yet. Please choose one first.`}
                </p>
              </div>
              <Separator className="mt-6" />
            </CardHeader>
            <BoxSection lowestTicketData={lowestTicket} />
          </Card>
        </div>

        <Card className="w-full md:bg-white bg-background rounded-none md:rounded-xl">
          <CardContent className="p-0 md:p-4">
            <DescriptionSection
              branchName={branchName}
              description={branchDescription}
              locationUrl={locationUrl}
              address={address}
              openTimeWeekday={playgroundOpenTimeWeekday}
              openTimeWeekend={playgroundOpenTimeWeekend}
            />
            <BuyTicketSection ticketList={ticketList} />
            <RefundPolicySection
              title={refundTitle}
              description={refundDescription}
            />
            <FAQSection branchName={branchName} faqList={faqList} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyTicketModule;
