import { Card, CardContent } from "@/components/ui/card"
import ContentSection from "./sections/ContentSection"
import HeaderSection from "./sections/HeaderSection"

const VisitorModule = () => {
    return <div className="flex flex-col w-screen min-h-screen bg-background">
        <Card className="w-full bg-white mx-auto   rounded-none max-w-4xl border-0 md:border 
        shadow-none">
        <CardContent className="p-0 md:min-h-screen">
            <HeaderSection/>
            <div className="flex flex-col w-full md:py-4 md:px-4">
            <ContentSection/>
            </div>
            
        </CardContent>
        </Card>
    </div>
}

export default VisitorModule