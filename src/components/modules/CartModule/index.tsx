
import TransactionLayout from "@/components/layouts/TransactionLayout"
import SelectTicketQuantitySection from "./sections/SelectTicketQuantitySection"

const CartModule = () => {

    return (
        <TransactionLayout
        backTitle="Browse Other Ticket Types"
        callbackBackUrl="/"
        paymentPosition={0}
        >
            <SelectTicketQuantitySection/>
        </TransactionLayout>
    )
}

export default CartModule