import { ScanModule } from "@/components/modules/ScanModule"

const page = ({ params }: { params: { event: string } }) => {
    return <ScanModule event={params.event}/>
}

export default page