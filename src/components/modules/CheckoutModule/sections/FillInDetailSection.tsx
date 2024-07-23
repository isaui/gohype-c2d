import OrderForm from "@/components/modules/CheckoutModule/module-elements/OrderForm"

type FillInDetailSectionProps = {
    ticketName?: string
    ticketId?: string
    ticketPath?: string
}

const FillInDetailSection: React.FC<FillInDetailSectionProps> = ({ticketName, ticketId, ticketPath}) => {
    return <div className="flex flex-col w-full md:py-4 md:px-6">
        <OrderForm
        ticketId={ticketId}
        ticketName={ticketName}
        ticketPath={ticketPath}
        />
    </div>
}
export default FillInDetailSection