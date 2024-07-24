import TicketDetailModule from '@/components/modules/TicketDetailModule';

const page = ({ params }: { params: { id: string } }) => {
  return <TicketDetailModule id={params.id} />;
};

export default page;
