"use client";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import TicketCounter from "../module-elements/TicketCounter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTicketStore } from "@/components/store/ticketStore";

type SelectTicketQuantitySectionProps = {
  ticketTitle?: string;
  ticketDescription?: string;
  paxPrice?: number;
  prefixUrl?: string;
  ticketQuota: number;
};

const SelectTicketQuantitySection: React.FC<SelectTicketQuantitySectionProps> = ({
  ticketTitle = "1 Hour of Play",
  ticketDescription = "Enjoy unlimited access to all games for one hour",
  paxPrice = 90000,
  prefixUrl = "",
  ticketQuota
}) => {
  const { ticketData, setTicketData, totalPrice, setTotalPrice, isInitialized } = useTicketStore();
  const priceRef = useRef<HTMLSpanElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<string>('auto');

  useEffect(() => {
    if (isInitialized) {
      setTicketData({ label: "Pax", price: paxPrice.toString(), count: ticketData.count });
    }
  }, [paxPrice, ticketTitle, isInitialized]);

  useEffect(() => {
    setTotalPrice(ticketData.count * parseFloat(ticketData.price));
  }, [ticketData, setTotalPrice]);

  useEffect(() => {
    if (priceRef.current) {
      setTriggerWidth(`${priceRef.current.offsetWidth + 24}px`);
    }
  }, [totalPrice, priceRef.current]);

  const handleIncrease = () => {
    setTicketData({
      ...ticketData,
      count: ticketData.count + 1,
    });
  };

  const handleDecrease = () => {
    if (ticketData.count > 0) {
      setTicketData({
        ...ticketData,
        count: ticketData.count - 1,
      });
    }
  };

  const displayPrice = totalPrice === 0 ? "Free" : `Rp ${totalPrice.toLocaleString("id-ID")}`;

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full py-4 px-4 bg-white md:mt-0">
        <h1 className="text-2xl font-semibold">{ticketTitle}</h1>
        <p className=" font-semibold text-tertiary">{ticketQuota} tickets left</p>
        <p className="mt-2 text-secondary">{ticketDescription}</p>
      </div>
      <hr className="hidden md:flex border-2 bg-background mx-4" />
      <div className="flex flex-col w-full py-4 md:py-6 px-4 mt-2 md:mt-0">
        <TicketCounter ticket={ticketData} onIncrease={handleIncrease} onDecrease={handleDecrease} />
      </div>
      <hr className="hidden md:flex border-2 bg-background mx-4" />
      <div
        className="fixed md:static left-0 flex flex-col bottom-0 min-h-24 bg-white 
        w-screen md:w-full border-t md:border-0 py-4 md:py-6 px-4 border-background"
      >
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2">
            <Label className="text-secondary">Total Price</Label>
            <div className="">
              <Accordion type="single" collapsible className="w-full no-underline">
                <AccordionItem className="no-underline p-0 hover:no-underline border-0" value="item-1">
                  <AccordionTrigger
                    className="no-underline hover:no-underline p-0"
                    style={{ maxWidth: triggerWidth }}
                  >
                    <Label className="text-2xl text-tertiary font-bold">
                      <span ref={priceRef}>{displayPrice}</span>
                    </Label>
                  </AccordionTrigger>
                  <AccordionContent className="hover:no-underline">
                    <div className="flex flex-col space-y-1 mt-2">
                      <Label className="text-secondary">
                        {ticketData.count} x {ticketTitle}
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div>
            {ticketData.count === 0 || ticketQuota == 0 ? (
              <Button className="bg-primary ml-2" disabled={true}>
                Order Now
              </Button>
            ) : (
              <a href={`/${prefixUrl}/checkout`}>
                <Button className="bg-primary ml-2">Next</Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTicketQuantitySection;
