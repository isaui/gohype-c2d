import Stack from "@/components/shared/Stack"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type TransactionPositionSectionProps = {
    currentActiveSection: string,
    sections: string[]
}
const TransactionPositionSection: React.FC<TransactionPositionSectionProps> = ({
    currentActiveSection, 
    sections}) => {
    const activeIndex = sections.findIndex(section => section === currentActiveSection);
    return  <Card className={cn("w-[380px]", "h-fit")}>
    <CardHeader>
      <CardTitle className="text-lg">{`Let's Get Your Ticket!`}</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4">
      <Stack>
     <div className="w-[2px] h-full  ml-3 border border-gray-0 border-spacing-2 border-dashed">

     </div>
      <div className="flex flex-col gap-y-8">
        {
            sections.map((section, index)=> {
                return <div className="flex items-center space-x-4" key={index+section}>
                    <div className={`rounded-full w-6 h-6 flex items-center justify-center text-center ${index<=activeIndex? ' bg-primary text-white': 'border border-gray-0 text-gray-0 bg-white'}`}>
                    <div>{index+1}</div>
                    </div>
                    <p className={`${index<=activeIndex? 'text-transparent bg-clip-text bg-primary font-semibold' : ''}`}>{section}</p>
                </div>
            })
        }
      </div>
      </Stack>
    </CardContent>
  </Card>
}
export default TransactionPositionSection