"use client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TicketData, TicketTimeInformation } from "@/types"
import { useState } from "react"
import TicketCounter from "../module-elements/TicketCounter"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const ticketTimeInformation: TicketTimeInformation[] = [
    {
        value: 'Morning',
        startTime: '09.00',
        endTime: '12.00'
    },
    {
        value: 'Afternoon',
        startTime: '12.00',
        endTime: '15.00'
    },
    {
        value: 'Evening',
        startTime: '15.00',
        endTime: '21.00'
    }
]

const initialTicketData: TicketData[] = [
    { label: "Child", price: "Rp300.000", count: 1 },
    { label: "Companion", price: "Free", count: 1 }
];

const SelectTicketQuantitySection = () => {
    const [selectedTime, setSelectedTime] = useState<TicketTimeInformation>(ticketTimeInformation[0]);
    const [ticketData, setTicketData] = useState<TicketData[]>(initialTicketData);

    const handleIncrease = (index: number, lastCount: number) => {
        setTicketData(prevData => {
            const newData = [...prevData];
            newData[index].count = lastCount + 1;
            return newData;
        });
    }

    const handleDecrease = (index: number, lastCount: number) => {
        setTicketData(prevData => {
            const newData = [...prevData];
            if (lastCount > 0) newData[index].count = lastCount - 1;
            return newData;
        });
    }

    const handleChangeSelectTimeValue = (value: string) => {
        const selected = ticketTimeInformation.find(time => time.value === value);
        if (selected) {
            setSelectedTime(selected);
        }
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full py-4 md:py-6 px-4 bg-white">
                <Alert className="bg-yellow-0">
                    <AlertDescription>
                        <div className="flex flex-col w-full items-center gap-y-1">
                            <h1 className="text-secondary">Valid weekdays only from:</h1>
                            <p className="font-semibold text-primary">10 June 2024 - 24 June 2024 (2 Weeks)</p>
                        </div>
                    </AlertDescription>
                </Alert>
                <div className="mt-4 flex flex-col gap-y-2">
                    <h1 className="font-semibold text-primary">1 Hour Play Ticket on Weekdays</h1>
                    <a className="bg-clip-text bg-primary text-transparent font-semibold">See Details</a>
                </div>
            </div>
            <hr className="hidden md:flex border-2 bg-background mx-4"/>
            <div className="flex flex-col w-full py-4 md:py-6 px-4 bg-white mt-2 md:mt-0">
                <h1 className="font-semibold text-primary">Select Play Time</h1>
                <RadioGroup className="mt-4" value={selectedTime.value} onValueChange={handleChangeSelectTimeValue}>
                    <div className="flex flex-col space-y-2 md:space-y-0 md:grid grid-cols-3 md:gap-y-4 md:gap-x-4">
                    {ticketTimeInformation.map((time) => {
                        const isSelected = time.value === selectedTime.value;
                        return (
                            <Alert key={time.value} className={`relative ${isSelected ? ' bg-blue-0 border border-indigo-0' : ''}`} onClick={() => handleChangeSelectTimeValue(time.value)}>
                                <AlertDescription>
                                    <div className="flex w-full items-center">
                                        <div className="md:absolute top-2 right-2">
                                        <RadioGroupItem 
                                            className={`${isSelected ? 'bg-primary text-white' : ''}`} 
                                            value={time.value} 
                                            id={time.value} 
                                        />
                                        </div>
                                        <div className="grow  md:text-lg md:items-center flex md:flex-col">
                                        <Label className="ml-2 font-semibold  md:text-lg" htmlFor={time.value}>{time.value}</Label>
                                        <Label className="ml-auto md:ml-0 md:mt-2  md:text-lg">{time.startTime} - {time.endTime}</Label>
                                        </div>
                                        
                                    </div>
                                </AlertDescription>
                            </Alert>
                        )
                    })}
                    </div>
                </RadioGroup>
            </div>
            <hr className="hidden md:flex border-2 bg-background mx-4"/>
            <div className="flex flex-col w-full py-4 md:py-6 px-4  mt-2 md:mt-0">
                {ticketData.map((ticket, index) => (
                    <TicketCounter
                        key={index}
                        ticket={ticket}
                        onIncrease={() => handleIncrease(index, ticket.count)}
                        onDecrease={() => handleDecrease(index, ticket.count)}
                    />
                ))}
            </div>
            <hr className="hidden md:flex border-2 bg-background mx-4"/>
            <div className="fixed md:static left-0 flex flex-col bottom-0 min-h-24 bg-white 
            w-screen md:w-full border-t md:border-0 py-4 md:py-6 px-4 border-background">
                <div className="flex justify-between">
                    <div className="flex flex-col space-y-2">
                        <Label className=" text-secondary">Total Price</Label>
                        <div className="">
                        <Accordion type="single" collapsible className=" w-full no-underline">
                        <AccordionItem className=" no-underline p-0 hover:no-underline border-0" value="item-1">
                            <AccordionTrigger className=" no-underline hover:no-underline max-w-44  p-0">
                                <Label className=" text-2xl text-tertiary font-bold">IDR 180.000</Label>
                                </AccordionTrigger>
                            <AccordionContent className="hover:no-underline">
                            <div className="flex flex-col space-y-1 mt-2">
                            <Label className="text-secondary">2 x Tickets for 1 Hour of Play</Label>
                            </div>
                            </AccordionContent>
                        </AccordionItem>
                        </Accordion>
                        </div>
                    </div>
                    <div>
                        <Button className="bg-primary ml-2">Order Now</Button>
                    </div>
                </div>
               
                <div>
                </div>
            </div>
        </div>
    )
}

export default SelectTicketQuantitySection
