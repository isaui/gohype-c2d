import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQSection = () => {
    return <div className="flex flex-col w-full mx-auto mt-4 px-4">
        <h1 className=" text-2xl font-bold text-primary mb-4">Twist n Turn FAQS</h1>
        <div className="flex flex-col mt-4 w-full">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem className=" border border-gray-300 px-3 py-2 rounded-lg" value="item-1">
                <AccordionTrigger><h1 className=" font-semibold text-primary text-lg">Term and Conditions</h1></AccordionTrigger>
                <AccordionContent>
                General admission mulai dari Rp140.000 per orang. Kamu bisa mendapatkan tiketnya di tiket.com.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem className="mt-2 border border-gray-300 px-3 py-2 rounded-lg" value="item-2">
                <AccordionTrigger><h1 className=" font-semibold text-primary text-lg">Refund Policy</h1></AccordionTrigger>
                <AccordionContent>
                General admission mulai dari Rp140.000 per orang. Kamu bisa mendapatkan tiketnya di tiket.com.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem className="mt-2 border border-gray-300 px-3 py-2 rounded-lg" value="item-3">
                <AccordionTrigger><h1 className=" font-semibold text-primary text-lg">Reschedule Policy</h1></AccordionTrigger>
                <AccordionContent>
                General admission mulai dari Rp140.000 per orang. Kamu bisa mendapatkan tiketnya di tiket.com.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem className="mt-2 border border-gray-300 px-3 py-2 rounded-lg" value="item-4">
                <AccordionTrigger><h1 className=" font-semibold text-primary text-lg">Additional Information</h1></AccordionTrigger>
                <AccordionContent>
                General admission mulai dari Rp140.000 per orang. Kamu bisa mendapatkan tiketnya di tiket.com.
                </AccordionContent>
            </AccordionItem>
      
        </Accordion>
        </div>
    </div>
}
export default FAQSection