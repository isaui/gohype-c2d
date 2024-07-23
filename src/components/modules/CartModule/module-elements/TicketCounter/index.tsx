import React from "react";
import { TicketData } from "@/types"; 
import { Minus, Plus } from "lucide-react";

interface TicketCounterProps {
    ticket: TicketData;
    onIncrease: () => void;
    onDecrease: () => void;
}

const TicketCounter: React.FC<TicketCounterProps> = ({ ticket, onIncrease, onDecrease }) => {
    const displayPrice = ticket.price === "0" || ticket.price === "" ? "Free" : `Rp${parseInt(ticket.price).toLocaleString('id-ID')}`;

    return (
        <div className="flex items-center justify-between my-2">
            <div>
                <h2 className="text-primary text-xl font-semibold">{ticket.label}</h2>
                <p className="text-secondary">{displayPrice}</p>
            </div>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={() => {
                        if(ticket.count >= 1){
                            onDecrease()
                        }
                    }} 
                    className="w-10 text-lg flex items-center justify-center text-secondary rounded-md h-10 bg-gray-200"
                >
                    <Minus className="w-4 h-auto"/>
                </button>
                <input 
                    type="text" 
                    value={ticket.count} 
                    readOnly 
                    className="w-10 rounded-md text-center h-10 border border-gray-200"
                />
                <button 
                    onClick={onIncrease} 
                    className="w-10 text-lg flex items-center justify-center text-secondary rounded-md h-10 bg-gray-200"
                >
                    <Plus className="w-4 h-auto"/>
                </button>
            </div>
        </div>
    );
}

export default TicketCounter;
