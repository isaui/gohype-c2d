import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";



type TicketDetailDialogProps = {
    isOpen: boolean,
    setIsOpen: (val :boolean) => void
}

const TicketDetailDialog: React.FC<TicketDetailDialogProps> = ({isOpen, setIsOpen}) => {
    console.log("isOpen:", isOpen);

    return (
      <div>
        <Dialog  open={isOpen}  modal onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>1-Hour Play Ticket on Weekdays</DialogTitle>
          <DialogDescription>
          ID: #43545667
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-y-2">
                <Label className=" font-semibold">Children</Label>
                <Alert className="">
                    <AlertDescription>
                        <div className="flex flex-col w-full">
                            <h1 className="text-primary">Megan Arvina</h1>
                            <p className="font-semibold text-primary">Female, 12 Years Old</p>
                        </div>
                    </AlertDescription>
                </Alert>
                <Alert className="">
                    <AlertDescription>
                        <div className="flex flex-col w-full">
                            <h1 className="text-primary">Megan Arvina</h1>
                            <p className="font-semibold text-primary">Female, 12 Years Old</p>
                        </div>
                    </AlertDescription>
                </Alert>
          </div>
          <div className="flex flex-col gap-y-2">
                <Label className=" font-semibold">Companions</Label>
                <Alert className="">
                    <AlertDescription>
                        <div className="flex flex-col w-full">
                            <h1 className="text-primary">Megan Arvina</h1>
                            <p className="font-semibold text-primary">Passport 4385498649684</p>
                        </div>
                    </AlertDescription>
                </Alert>
                <Alert className="">
                    <AlertDescription>
                        <div className="flex flex-col w-full">
                            <h1 className="text-primary">Megan Arvina</h1>
                            <p className="font-semibold text-primary">Passport 4385498649684</p>
                        </div>
                    </AlertDescription>
                </Alert>
          </div>
        </div>
      </DialogContent>
        </Dialog>
      </div>
    )
}

export default TicketDetailDialog