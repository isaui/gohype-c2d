import CheckoutModule from "@/components/modules/CheckoutModule";

export default function page({ params }: { params: { event: string } }){
    return <CheckoutModule 
    prefixUrl={params.event}/>
}