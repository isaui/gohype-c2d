import PaginationComponent from "@/components/ui/external/PaginationComponent"
import { createClient } from "@/utils/supabase/server"
import { ITEMS_PER_PAGE } from "../constant"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"


type OrderSectionProps = {
    ticketPath?: string,
    page: number,
}

const OrderSection: React.FC<OrderSectionProps> = async ({ ticketPath, page }) => {
    const supabase = createClient()

    const { count, error: countError } = await supabase
      .from('order')
      .select('*, ticket(*)', { count: 'exact', head: true })
      .eq('ticket.ticket_path', ticketPath ?? "")
  
    if (countError) {
      console.error('Error counting orders:', countError)
      return <div className="mt-12">Error loading data</div>
    }
  
    const totalOrders = count || 0
  
    const { data, error } = await supabase
      .from('order')
      .select(`
        *,
        ticket!inner (
          id,
          ticket_name,
          single_pax_price,
          ticket_path
        ),
        customer: user (
            display_name,
            email,
            phone_num
        )
      `)
      .eq('ticket.ticket_path', ticketPath ?? "")
      .order('created_at', { ascending: false })
      .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)
  
    if (error) {
      console.error('Error fetching orders:', error)
      return <div className="mt-12">Error loading data</div>
    }
  
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
            {data.map((order) => (
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
        
        {
            totalOrders > ITEMS_PER_PAGE && <PaginationComponent
            totalItems={totalOrders}
            currentPage={page}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        }
      </div>
    )
  }
  
  export default OrderSection