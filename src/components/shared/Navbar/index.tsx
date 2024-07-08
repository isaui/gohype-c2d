import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
type NavbarProps = {
    variant?: 'FIXED' | 'SCROLL'
}
const Navbar: React.FC<NavbarProps> = ({variant='FIXED'}) => {
    return <div className={`${variant == 'FIXED'? 'fixed' : '' } 
    top-0 left-0 z-30 w-screen min-h-12 bg-white flex items-center py-4 px-4 md:px-8`}>
        <div className="">
            <img src="/logo.svg" className="w-16 md:w-24 h-auto" ></img>
            
        </div>
        <div className="ml-auto md:hidden">
            <Menu/>
        </div>
        <div className="ml-auto hidden md:flex items-center space-x-6 font-semibold text-primary">
            <a>Home</a>
            <a>Buy Ticket</a>
            <a>Contact Us</a>
            <Button variant={"outline"} className="border border-primary">Sign In</Button>
            <Button className="bg-primary">Register</Button>
        </div>
    </div>
}

export default Navbar