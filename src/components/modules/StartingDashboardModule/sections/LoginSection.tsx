"use client"

import { useNavbarStore } from "@/components/store/navbarStore"
import { Button } from "@/components/ui/button"

const LoginSection = () => {
    const { setIsAuthDialogOpen } = useNavbarStore();

    const handleLoginClick = () => {
        setIsAuthDialogOpen(true);
    }

    return (
        <Button 
            onClick={handleLoginClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
            Login as Admin
        </Button>
    )
}

export default LoginSection