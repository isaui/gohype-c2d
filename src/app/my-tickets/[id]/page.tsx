import TicketDetailModule from '@/components/modules/TIcketDetailModule';

const page = ({ params }: { params: { id: string } }) => {
  return <TicketDetailModule id={params.id} />;
};

export default page;
