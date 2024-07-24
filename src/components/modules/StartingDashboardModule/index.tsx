import Navbar from "@/components/shared/Navbar";
import { createClient } from "@/utils/supabase/server";
import { Lock } from "lucide-react"
import LoginSection from "./sections/LoginSection";
import TicketsSection from "./sections/TicketsSection";



const StartingDashboardModule = async ()=> {
    let isAdminAndAuthenticated = false
    const supabase = createClient()
    const userResponse = await supabase.auth.getUser()
    if(userResponse.data.user){
       const queryUser = await supabase.from("user").select("*").eq("id", userResponse.data.user.id).single();
       if(queryUser.data && queryUser.data.role == 'ADMIN'){
        isAdminAndAuthenticated = true
       } 
    }

    if (!isAdminAndAuthenticated) {
        return (
            <div className="flex flex-col w-screen min-h-screen bg-background items-center justify-center">
                <Navbar isAuthRequired={true}/>
                <div className="max-w-md p-8 flex flex-col bg-white rounded-lg shadow-lg items-center text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-6">
                        {`We're sorry, but you don't have permission to access this page. 
                        This area is restricted to administrators only.`}
                    </p>
                    <div className="flex w-full   mb-6 justify-center items-center">
                    <Lock className="w-12 h-auto "/>
                    </div>
                    <LoginSection/>
                </div>
            </div>
        )
    }

    const {data, error} = await supabase.from("ticket").select("*")

    return (
        <div className="flex flex-col w-screen min-h-screen bg-background items-center pt-16 pb-10">
            <Navbar isAuthRequired={true}/>
            <TicketsSection tickets={data as any ?? []}/>
        </div>
    )
    

}

export default StartingDashboardModule