"use client"
import { Button } from '@/components/ui/button';
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import AuthDialog from '../AuthDialog';
type NavbarProps = {
  variant?: 'FIXED' | 'SCROLL';
};
const Navbar: React.FC<NavbarProps> = ({ variant = 'FIXED' }) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className={`${variant == 'FIXED' ? 'fixed' : ''} 
    top-0 left-0 z-30 w-screen min-h-12 bg-white flex items-center py-4 px-4 md:px-8`}
    >
      <AuthDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      />
      <div className="">
        <img src="/logo.svg" className="w-16 md:w-24 h-auto"></img>
      </div>
      <div className="ml-auto md:hidden">
      <Sheet>
      <SheetTrigger><Menu /></SheetTrigger>
      <SheetContent className=' pb-4' side={"top"}>
        <SheetHeader className=''>
         
          <SheetDescription className=''>

          <div className="flex flex-col  space-y-4 font-semibold text-primary -mt-3">
          <img src="/logo.svg" className="w-16 md:w-24 h-auto"></img>
            <Link className=' w-fit xtext-lg' href={'/'}>Home</Link>
            <Link className=' w-fit xtext-lg' href={'/buy-ticket'}>Buy Ticket</Link>
            <Link className=' w-fit xtext-lg' href={'/contact-us'}>Contact Us</Link>
            <div className='grid grid-cols-2 gap-4'>
            <Button onClick={()=> setIsOpen(true)} variant={'outline'} className="border border-primary">
              Sign In
            </Button>
            <Button onClick={()=> setIsOpen(true)} className="bg-primary">Register</Button>
            
            </div>
            
          </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
      </Sheet>
      </div>
      <div className="ml-auto hidden md:flex items-center space-x-6 font-semibold text-primary">
        <Link href={'/'}>Home</Link>
        <Link href={'/buy-ticket'}>Buy Ticket</Link>
        <Link href={'/contact-us'}>Contact Us</Link>
        <Button onClick={()=> setIsOpen(true)} variant={'outline'} className="border border-primary">
              Sign In
            </Button>
            <Button onClick={()=> setIsOpen(true)} className="bg-primary">Register</Button>
            
            </div>
            </div>
        

  );
};

export const AuthNavbar: React.FC<NavbarProps> = ({variant}) => {
  return (
    <div
      className={`${variant == 'FIXED' ? 'fixed' : ''} 
    top-0 left-0 z-30 w-screen min-h-12 bg-white flex items-center py-4 px-4 md:px-8`}
    >
      <div className="">
        <img src="/logo.svg" className="w-16 md:w-24 h-auto"></img>
      </div>
      <div className="ml-auto md:hidden">
      <Sheet>
      <SheetTrigger><Menu /></SheetTrigger>
      <SheetContent className='pb-4' side={"top"}>
        <SheetHeader>
         
          <SheetDescription>
          <div className="flex flex-col -mt-3 space-y-4 font-semibold text-primary ">
          <img src="/logo.svg" className="w-16 md:w-24 h-auto"></img>
            <Link className='w-fit' href={'/'}>Home</Link>
            <Link className='w-fit' href={'/buy-ticket'}>Buy Ticket</Link>
            <Link className='w-fit' href={'/contact-us'}>Contact Us</Link>
            <Link className='grid' href={'/my-tickets'}>
        <Button variant={"default"} className=" bg-primary border-0">My Tickets</Button></Link>
          </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
      </Sheet>
      </div>
      <div className="ml-auto hidden md:flex items-center space-x-6 font-semibold text-primary">
        <Link href={'/'}>Home</Link>
        <Link href={'/buy-ticket'}>Buy Ticket</Link>
        <Link href={'/contact-us'}>Contact Us</Link>
        <Link href={'/my-tickets'}>
        <Button variant={"default"} className=" bg-primary border-0">My Tickets</Button></Link>
        
      </div>
    </div>
  );
}

export default Navbar;
