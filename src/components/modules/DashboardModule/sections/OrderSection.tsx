import PaginationComponent from "@/components/ui/external/PaginationComponent";
import { createClient } from "@/utils/supabase/server";
import { ITEMS_PER_PAGE } from "../constant";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

type OrderSectionProps = {
  ticketPath?: string;
  page: number;
  search?: string;
};

const OrderSection: React.FC<OrderSectionProps> = async ({ ticketPath, page, search }) => {
  const supabase = createClient();

  const offset = (page - 1) * ITEMS_PER_PAGE;

  const { data, error } = await supabase
    .rpc('get_orders', {
      p_ticket_path: ticketPath ?? "",
      p_search: search ?? "",
      p_offset: offset,
      p_limit: ITEMS_PER_PAGE
    });

  if (error) {
    console.error('Error fetching orders:', error);
    return <div className="mt-12">Error loading data</div>;
  }

  console.log(data)
  const orders = data.map((item: any) => ({
    ...item.order_data.order,
    ticket: item.order_data.ticket,
    customer: item.order_data.customer
  }));
  const totalOrders = data[0]?.total_count || 0;

  console.log(orders)

  return (
    <div className="w-full flex flex-col max-w-7xl mx-auto px-4 mt-4">
      <Card className="mb-4 p-4">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Total Tickets</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.order_num}>
                  <TableCell>{order.order_num}</TableCell>
                  <TableCell>{order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}</TableCell>
                  <TableCell>Rp.{order.amount}</TableCell>
                  <TableCell>{order.ticket_total}</TableCell>
                  <TableCell>{order.customer?.display_name || 'N/A'}</TableCell>
                  <TableCell>{order.customer?.email || 'N/A'}</TableCell>
                  <TableCell>{order.customer?.phone_num || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {totalOrders > ITEMS_PER_PAGE && (
        <PaginationComponent
          totalItems={totalOrders}
          currentPage={page}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </div>
  );
};

export default OrderSection;