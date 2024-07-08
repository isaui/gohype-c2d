import SelectTicketQuantitySection from "./SelectTicketQuantitySection"
import TransactionPositionSection from "./TransactionPositionSection"
import { Card, CardContent } from "@/components/ui/card"
import { paymentSections } from "@/utils/payment-section"

const ContentSection = () => {
    return <div className="flex w-full max-w-7xl md:gap-x-8 ">
        <div className="hidden md:flex">
        <TransactionPositionSection
            currentActiveSection={paymentSections[0]}
            sections={paymentSections}
        />
        </div>
        <Card className="w-full md:bg-white bg-background  rounded-none md:rounded-xl">
            <CardContent className="p-0 md:p-4">
            <SelectTicketQuantitySection/>
            </CardContent>
        </Card>
    </div>
}
export default ContentSection