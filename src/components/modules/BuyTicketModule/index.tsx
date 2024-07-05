import Navbar from "@/components/shared/Navbar"
import BuyTicketSection from "./sections/BuyTicketSection"
import DescriptionSection from "./sections/DescriptionSection"
import FAQSection from "./sections/FAQSection"
import ImagesSection from "./sections/ImagesSection"
import RefundPolicySection from "./sections/RefundPolicySection"

const BuyTicketModule = () => {
    return <div className="flex flex-col w-screen min-h-screen bg-background items-center pt-16 pb-10 mx-auto ">
        <Navbar/>
        <ImagesSection/>
        <div className="md:bg-white flex flex-col w-full max-w-3xl p-4 rounded-lg">
        
        <DescriptionSection/>
        <BuyTicketSection/>
        <RefundPolicySection/>
        <FAQSection/>
        </div>
    </div>
}

export default BuyTicketModule