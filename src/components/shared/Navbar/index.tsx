
import { Button } from '@/components/ui/button';
import { SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, Sheet } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
type NavbarProps = {
  variant?: 'FIXED' | 'SCROLL';
};
const Navbar: React.FC<NavbarProps> = ({ variant = 'FIXED' }) => {
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
      <SheetContent side={"top"}>
        <SheetHeader>
         
          <SheetDescription>
          <div className="ml-auto flex flex-col items-center text-center space-y-4 font-semibold text-primary">
            <Link href={'/'}>Home</Link>
            <Link href={'/buy-ticket'}>Buy Ticket</Link>
            <Link href={'/contact-us'}>Contact Us</Link>
            <Button variant={'outline'} className="border border-primary">
              Sign In
            </Button>
            <Button className="bg-primary">Register</Button>
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
        <Button variant={'outline'} className="border border-primary">
          Sign In
        </Button>
        <Button className="bg-primary">Register</Button>
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
      <SheetContent side={"top"}>
        <SheetHeader>
         
          <SheetDescription>
          <div className="ml-auto flex flex-col items-center text-center space-y-4 font-semibold text-primary">
            <Link href={'/'}>Home</Link>
            <Link href={'/buy-ticket'}>Buy Ticket</Link>
            <Link href={'/contact-us'}>Contact Us</Link>
            <Link href={'/my-tickets'}>
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
