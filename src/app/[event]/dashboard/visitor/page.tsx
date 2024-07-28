import VisitorModule from "@/components/modules/VisitorModule"

const page = ({ params }: { params: { event: string } }) => {
   return <VisitorModule event={params.event}/>
}

export default page