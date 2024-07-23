import CartModule from "@/components/modules/CartModule";

export default function page({ params }: { params: { event: string } }){
    return <CartModule prefixName={params.event}/>
}