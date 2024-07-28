import { Button } from "@/components/ui/button";
import { Scan, Users } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { ReactSVG } from 'react-svg';

type Section = 'scanner' | 'visitors';

interface BottomNavbarProps {
  activeSection: Section;
  eventPath: string
}

const ScannerBottomNavbar: React.FC<BottomNavbarProps> = ({ activeSection, eventPath }) => {
  return (
   <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center">
     <div className=" bg-white border border-gray-200 md:max-w-4xl w-full flex ">
      <div className="flex justify-around items-center h-16 w-full">
        <Link href={`/${eventPath}/dashboard/scan`} passHref className="w-1/2">
          <div
            className={`flex flex-col items-center w-full ${activeSection === 'scanner' ? 'text-blue' : 'text-gray-500'}`}
          >
            {activeSection === 'scanner'? 
            <Image width={0} height={0} alt="" src={"/qr-active-icon.svg"} className="w-6 h-auto"/>
            : 
            <Image width={0} height={0} alt="" src={"/qr-icon.svg"} className="w-6 h-auto"/>}
            <span className="text-xs mt-1">Scanner</span>
          </div>
        </Link>
        <Link href={`/${eventPath}/dashboard/visitor`} passHref className="w-1/2">

            <div className={`flex flex-col items-center w-full ${activeSection === 'visitors' ? ' text-blue' : 'text-gray-500'}`}>
            {activeSection === 'visitors'? 
            <Image width={0} height={0} alt="" src={"/visitor-active-icon.svg"} className="w-6 h-auto"/>
            : 
            <Image width={0} height={0} alt="" src={"/visitor-icon.svg"} className="w-6 h-auto"/>} 
            <span className="text-xs mt-1">Visitors</span>
            </div>
        </Link>
      </div>
    </div>
   </div>
  );
};

export default ScannerBottomNavbar;