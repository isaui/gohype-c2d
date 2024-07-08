import Navbar from "@/components/shared/Navbar"
import HeaderSection from "./sections/HeaderSection"
import ContentSection from "./sections/ContentSection"

const CartModule = () => {
    return <div className="flex flex-col w-screen min-h-screen bg-background items-center md:pt-16 pb-10">
        <div className="md:hidden">
        <Navbar variant="SCROLL"/>
        </div>
        <div className="hidden md:flex">
        <Navbar variant="FIXED"/>
        </div>
        <HeaderSection/>
        <ContentSection/>
    </div>
}

export default CartModule