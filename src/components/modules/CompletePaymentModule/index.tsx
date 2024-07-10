import TransactionLayout from "@/components/layouts/TransactionLayout"
import PaymentSection from "./sections/PaymentSection"

const CompletePaymentModule = () => {
    return <TransactionLayout
        backTitle="Back"
        callbackBackUrl="/checkout"
        paymentPosition={2}>
            <PaymentSection/>
        </TransactionLayout>
}

export default CompletePaymentModule