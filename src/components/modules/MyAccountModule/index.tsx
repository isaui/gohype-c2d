import { AuthNavbar } from "@/components/shared/Navbar"
import AccountDataSection from "./sections/AccountDataSection"
import GoogleAuthSection from "./sections/GoogleAuthSection"
import { Card, CardContent } from "@/components/ui/card"

const MyAccountModule = () => {
    return <div className="flex flex-col w-screen min-h-screen bg-white md:bg-background items-center 
    pt-20 pb-10 px-4 md:px-8">
      <AuthNavbar variant="FIXED"/>
      <Card className="w-full bg-white   rounded-none md:rounded-xl max-w-4xl border-0 md:border shadow-none md:shadow-md ">
            <CardContent className="p-0 md:p-4">
            <AccountDataSection/>
            <GoogleAuthSection/>
            </CardContent>
            </Card>
    </div>
}

export default MyAccountModule