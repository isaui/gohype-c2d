import { PersonListItem } from "@/components/shared/PersonListItem"
import { DUMMY_PERSON_LIST } from "../constant"
import SearchSection from "./SearchFilterSection"
import ResponsiveDrawer, { ResponsiveDrawerClose, ResponsiveDrawerFooter, ResponsiveDrawerHeader, ResponsiveDrawerTitle } from "@/components/shared/ResponsiveDrawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const ContentSection = () => {
    return <div className="flex flex-col w-full mt-4 ">
        <div className="flex flex-col px-4">
        <SearchSection/>
        </div>
        <div className="mt-4">
      {DUMMY_PERSON_LIST.map((person, index) => (
        <ResponsiveDrawer
        className="" 
        key={person.name+index} 
        trigger={<PersonListItem
            key={index}
            variant="OUTLINE_VERTICAL"
            name={person.name}
            description={person.description}
            status={person.status}
          />}>
        <ResponsiveDrawerHeader className="-mt-6 md:mt-0 ">
            <ResponsiveDrawerTitle className="w-full  flex items-center justify-between py-2">
                <PersonListItem
                    variant="NO_OUTLINE"
                    name={person.name}
                    description={person.description}
                    status={person.status}/>
            </ResponsiveDrawerTitle>
        </ResponsiveDrawerHeader>
        <div className="flex flex-col w-full px-6 md:px-2">
            <p className="text-sm font-semibold text-primary">Expires at:</p>
            <p className=" text-sm font-semibold text-tertiary">15:15 WIB (55 minutes remaining)</p>
        </div>
        <Separator className="mt-6"/>
        <ResponsiveDrawerFooter className="mb-2 md:mb-0">
            <ResponsiveDrawerClose>
                <Badge variant={person.status === 'CHECKED_IN' ? 'danger' : 'success' } className="py-6 rounded-lg flex items-center justify-center">
                    <p>{person.status === 'CHECKED_IN'? "Confirm Checkout" : "Confirm Check In"}</p>
                </Badge>
            </ResponsiveDrawerClose>
            <ResponsiveDrawerClose>
                <Badge variant={"outline" } className="border-primary text-transparent bg-clip-text font-semibold bg-primary py-6 rounded-lg flex items-center justify-center">
                    <p>{"See Ticket Details"}</p>
                </Badge>
            </ResponsiveDrawerClose>
        </ResponsiveDrawerFooter>
            
        </ResponsiveDrawer>
      ))}
    </div>
    </div>
}

export default ContentSection