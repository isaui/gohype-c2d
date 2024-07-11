import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search,  SlidersHorizontal, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import ResponsiveDrawer, { ResponsiveDrawerHeader, ResponsiveDrawerTitle, ResponsiveDrawerClose } from "@/components/shared/ResponsiveDrawer"


export default function SearchSection() {


 const generateFilterTrigger = () => {
    return <Button variant={"outline"} className="rounded-2xl">
        <div className="flex items-center space-x-2">
    <p>Filter</p>
    <SlidersHorizontal className="h-4 w-4" />
</div>
    </Button>
 }
  return (
    <div className="flex items-center space-x-2 w-full">
      <div className="relative flex-grow  rounded-2xl">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search" className="pl-8 pr-4 py-4  rounded-2xl" />
      </div>
      <ResponsiveDrawer
  trigger={generateFilterTrigger()}
  className="px-0 py-0 md:py-2"
>
  <ResponsiveDrawerHeader className="-mt-6 md:mt-0 px-0   flex flex-col py-0">
    <ResponsiveDrawerTitle className="w-full flex items-center justify-between px-4 py-2">
      <p>Filter</p>
      <ResponsiveDrawerClose>
        <X className="w-4 h-auto md:hidden"/>                 
      </ResponsiveDrawerClose>
    </ResponsiveDrawerTitle>
    <Separator className="mt-auto"/>
  </ResponsiveDrawerHeader>

  <div className="flex flex-col py-4 md:py-0 space-y-4">
  <div className="px-4">
    <h3 className="font-semibold mb-2">Status</h3>
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="checked-in" />
        <Label htmlFor="checked-in">Checked In</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="checked-out" />
        <Label htmlFor="checked-out">Checked Out</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="not-checked-in" />
        <Label htmlFor="not-checked-in">Not Checked In</Label>
      </div>
    </div>
  </div>
  
  <div className="px-4 py-2">
    <h3 className="font-semibold mb-2">Visitors</h3>
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="children" />
        <Label htmlFor="children">Children</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="companions" />
        <Label htmlFor="companions">Companions</Label>
      </div>
    </div>
  </div>
  </div>
  
  
</ResponsiveDrawer>
    
    </div>
  )
}