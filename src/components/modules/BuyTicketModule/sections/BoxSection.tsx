"use client"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { PriceResult } from "../utils"

type BoxSectionProps = {
    lowestTicketData: PriceResult
}
const BoxSection: React.FC<BoxSectionProps> = ({lowestTicketData}) => {
    const scrollToPackages = () => {
        const element = document.getElementById('tickets-accordion');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return  <CardContent>
    <div className="flex w-full justify-between items-center">
        <p className="text-base text-secondary">Prices start from</p>
        <p className="text-xl text-tertiary font-bold ml-2">Rp{lowestTicketData.lowestPrice}</p>
    </div>
    <div className="grid w-full mt-4">
        <Button className="bg-primary text-white hover:bg-blue-400" onClick={scrollToPackages}>View Packages</Button>
    </div>
</CardContent>

}

export default BoxSection