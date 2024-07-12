import { Separator } from "@/components/ui/separator"

const HeaderSection = () => {
    return <div className="w-full flex flex-col pt-3 ">
        <div className="flex items-center space-x-2 px-4">
            <h1 className=" font-semibold text-primary text-lg">Today Visitors</h1>
        </div>
        <Separator className="mt-3"/>
    </div>
}

export default HeaderSection