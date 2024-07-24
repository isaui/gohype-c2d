import SummaryCard from "../module-elements/SummaryCard"
import { fetchSummaryData } from "../utils"

export default async function SummarySection({ ticketPath }: { ticketPath: string }) {
    const { orders_count, tickets_count, male_count, female_count } = await fetchSummaryData(ticketPath)
  
    return (
      <div className="flex flex-col w-full mx-auto max-w-7xl">
        <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-4  pt-6 
        items-start px-4  w-full md:w-auto md:mr-auto">
        <SummaryCard title="Orders" count={orders_count} color="bg-orange-400" />
        <SummaryCard title="Tickets" count={tickets_count} color="bg-purple-400" />
        <SummaryCard title="Male" count={male_count} color="bg-red-400" />
        <SummaryCard title="Female" count={female_count} color="bg-gray-400" />
      </div>
      </div>
    )
  }