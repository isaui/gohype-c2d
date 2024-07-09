import React from "react";
import { TicketData } from "@/types"; 

interface TicketCounterProps {
    ticket: TicketData;
    onIncrease: () => void;
    onDecrease: () => void;
}

const TicketCounter: React.FC<TicketCounterProps> = ({ ticket, onIncrease, onDecrease }) => {
    return (
        <div className="flex items-center justify-between my-2">
            <div>
                <h2 className="text-primary font-semibold">{ticket.label}</h2>
                <p className="text-secondary">{ticket.price}</p>
            </div>
            <div className="flex items-center space-x-2">
                <button onClick={onDecrease} className="w-8 text-lg text-secondary rounded-md h-8 bg-gray-200">-</button>
                <input type="text" value={ticket.count} readOnly className="w-10 rounded-md text-center h-8 border border-gray-200"/>
                <button onClick={onIncrease} className="w-8 text-lg text-secondary rounded-md h-8 bg-gray-200">+</button>
            </div>
        </div>
    );
}

export default TicketCounter;
