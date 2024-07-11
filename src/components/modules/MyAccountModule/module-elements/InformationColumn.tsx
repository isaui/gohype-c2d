import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronRight } from "lucide-react"

type InformationColumnProps = {
    title: string
    value: string
    isPassword?: boolean
} 

const InformationColumn: React.FC<InformationColumnProps> = (
    {
        title,
        value,
        isPassword
    }) => {
    const maskedValue = isPassword ? '*'.repeat(value.length) : value;

    return (
        <Alert className="bg-transparent hover:bg-background border-none">
            <AlertDescription>
                <div className="flex items-center space-x-2">
                    <div className="flex flex-col grow md:grid grid-cols-12">
                        <p className="text-secondary col-span-5">{title}</p>
                        <div className="flex space-x-2 items-center col-span-7">
                            <p>{maskedValue}</p>
                        </div>
                    </div>
                    <ChevronRight className="text-sm w-4 h-auto"/>
                </div>
            </AlertDescription>
        </Alert>
    )
}

export default InformationColumn
