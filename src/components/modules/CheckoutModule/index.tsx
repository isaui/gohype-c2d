import TransactionLayout from "@/components/layouts/TransactionLayout"
import FillInDetailSection from "./sections/FillInDetailSection"

const CheckoutModule = () => {
    return (
        <TransactionLayout
            paymentPosition={1}
            backTitle="Back"
            callbackBackUrl="/cart">
            <FillInDetailSection/>
        </TransactionLayout>)
}

export default CheckoutModule