"use client"
import { Button } from '@/components/ui/button';
import { SheetTrigger, SheetContent, SheetHeader, SheetDescription, Sheet } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import AuthDialog from '../AuthDialog';
import { useNavbarStore } from '@/components/store/navbarStore';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';
import AddPhoneDialog from '../AddPhoneDialog';

type NavbarProps = {
  variant?: 'FIXED' | 'SCROLL';
  isAuthRequired?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ variant = 'FIXED', isAuthRequired = false }) => {
  const { isAuthDialogOpen, setIsAuthDialogOpen, setIsAddPhoneDialogOpen, isAddPhoneDialogOpen } = useNavbarStore();
  const supabase = createClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const {toast} = useToast()

  const handleTicketsClick = () => {
    if (!isAuthenticated) {
      setIsAuthDialogOpen(true);
    } else {
      router.push("my-tickets")
    }
  };

  useEffect(() => {
    let isMounted = true;
    let previousSession:any = null;
  
    const handleAuthChange = async (event: string, session: Session | null) => {
      if (isMounted) {
        setIsAuthenticated(!!session);
  
        if (isAuthRequired && !session) {
          setIsAuthDialogOpen(true);
        } else {
          setIsAuthDialogOpen(false);
          
          if (event === 'SIGNED_IN' && session && !previousSession) {
            toast({ description: "Welcome, " + session.user.email + "!" });
            if(! session.user.user_metadata.phone){
              setIsAddPhoneDialogOpen(true)
            }
          }
        }
  
        previousSession = session;
      }
    };
  
    const initializeAuth = async () => {
      const initialSession = await supabase.auth.getSession();
      previousSession = initialSession.data.session;
    };
  
    initializeAuth();
  
    const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthChange);
  
    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [isAuthRequired]);

  const handleAddPhoneNum = async (phoneNum: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { phone: phoneNum }
      });
  
      if (error) throw error;
  
      toast({ description: "Phone number added successfully!" });
      setIsAddPhoneDialogOpen(false);
    } catch (error) {
      console.error('Error updating phone number:', error);
      toast({ description: "Failed to add phone number. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className={`${variant == 'FIXED' ? 'fixed' : ''} top-0 left-0 z-30 w-screen min-h-12 bg-white flex flex-col py-4 px-4 md:px-8`}>
      <AuthDialog isOpen={isAuthDialogOpen} setIsOpen={setIsAuthDialogOpen} />
      <AddPhoneDialog isOpen={isAddPhoneDialogOpen} setIsOpen={setIsAddPhoneDialogOpen} onAddPhone={handleAddPhoneNum}/>
      <div className='flex items-center w-full max-w-7xl mx-auto'>
        <div>
          <img src="/logo.svg" className="w-16 md:w-24 h-auto" alt="Logo" />
        </div>
        <div className="ml-auto md:hidden">
          <Sheet>
            <SheetTrigger><Menu /></SheetTrigger>
            <SheetContent className='pb-4' side={"top"}>
              <SheetHeader>
                <SheetDescription>
                  <div className="flex flex-col space-y-6 font-semibold text-primary -mt-2">
                    <img src="/logo.svg" className="w-24 h-auto" alt="Logo" />
                    <Button onClick={handleTicketsClick} className="bg-primary">Tickets</Button>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="ml-auto hidden md:flex items-center space-x-6 font-semibold text-primary">
          <Button onClick={handleTicketsClick} className="bg-primary">Tickets</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;