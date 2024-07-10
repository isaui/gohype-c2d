import MyTicketModule from '@/components/modules/MyTicketModule';

const page = ({
  searchParams,
}: {
  searchParams: { page?: string; history?: string };
}) => {
  return (
    <MyTicketModule
      page={searchParams.page}
      history={searchParams.history === 'true'}
    />
  );
};

export default page;
