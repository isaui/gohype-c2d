import { Button } from "@/components/ui/button"
import { applyDiscount } from "../../utils"

type TicketDataProps = {
    ticketId: number,
    ticketTitle: string,
    ticketSubtitle: string,
    ticketPrice: number,
    discount: number,
    method: 'FIX_NUMBER' | 'PERCENTAGE'
}

const formatPrice = (price: number): string => {
    return Math.floor(price).toLocaleString('id-ID');
}

const Ticket: React.FC<TicketDataProps>= ({
    ticketId,
    ticketPrice,
    ticketTitle,
    ticketSubtitle,
    method,
    discount
}) => {
    const discountedPrice = applyDiscount(ticketPrice, method, discount);

    return <div className="flex flex-col w-full min-h-32 rounded-lg bg-white ">
        <div className="flex flex-col space-y-1 px-4 pt-4 border-x-2 border-t-2 border-primary rounded-t-lg">
            <h1 className="text-primary font-bold text-xl">{ticketTitle}</h1>
            <p className="text-secondary">{ticketSubtitle}</p>
            <p className="bg-clip-text text-transparent bg-primary font-bold">View Details</p>
        </div>
        <div className="flex w-full justify-between">
            <div className="w-3 h-6 rounded-r-full bg-primary-2 border-r-2 border-y-2 border-primary"></div>
            <hr className="grow border mx-2 border-dashed border-primary my-auto"/>
            <div className="w-3 h-6 rounded-l-full bg-primary-2 border-l-2 border-y-2 border-primary"></div>
        </div>
        <div className="flex w-full items-center pb-4 px-4 border-x-2 justify-between border-b-2 border-primary rounded-b-lg">
            <div className="flex items-center space-x-2">
                <p className="text-lg font-bold text-tertiary">Rp {formatPrice(discountedPrice)}</p>
                <p className="text-secondary text-base line-through">Rp {formatPrice(ticketPrice)}</p>
            </div>
            <Button className="bg-primary text-white">Select Ticket</Button>
        </div>
    </div>
}

export default Ticket