import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Database } from "@/types.supabase"

type Faq = Database['public']['Tables']['faqs']['Row']
type FAQSectionProps = {
    faqList: Faq[]
    branchName: string
}

const FAQSection: React.FC<FAQSectionProps> = ({faqList, branchName}) => {
    return <div className="flex flex-col w-full mx-auto mt-4 px-4">
        <h1 className=" text-2xl font-bold text-primary mb-4">{branchName} FAQS</h1>
        <div className="flex flex-col mt-4 w-full">
        <Accordion type="multiple" className="w-full">
            {
                faqList.map((faq,index)=> <AccordionItem key={'faq-item-'+index} 
                className=" border border-gray-300 px-3 py-2 rounded-lg" value={"item"+index}>
                <AccordionTrigger><h1 className=" font-semibold text-primary text-lg">{faq.faq_title}</h1></AccordionTrigger>
                <AccordionContent>
                { faq.faq_description }
                </AccordionContent>
            </AccordionItem>)
            }
      
        </Accordion>
        </div>
    </div>
}
export default FAQSection