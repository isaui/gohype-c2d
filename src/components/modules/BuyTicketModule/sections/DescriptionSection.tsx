'use client'

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Button } from "@/components/ui/button";

type DescriptionSectionProps = {
  branchName: string,
  description: string,
  locationUrl: string,
  address: string,
  openTimeWeekday: string,
  openTimeWeekend: string
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({branchName, description, 
    locationUrl, address, openTimeWeekday, openTimeWeekend}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [height, setHeight] = useState('auto');
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const fullHeight = useRef<number>(0);

    useEffect(() => {
        if (descriptionRef.current) {
            const lineHeight = parseInt(window.getComputedStyle(descriptionRef.current).lineHeight);
            fullHeight.current = descriptionRef.current.scrollHeight;
            const lines = fullHeight.current / lineHeight;
            setShowButton(lines > 3);
            if (lines > 3) {
                setHeight(`${3 * lineHeight}px`);
            }
        }
    }, [description]);

    useLayoutEffect(() => {
        if (descriptionRef.current) {
            const newHeight = isExpanded ? `${fullHeight.current}px` : `${3 * parseInt(window.getComputedStyle(descriptionRef.current).lineHeight)}px`;
            setHeight(newHeight);
        }
    }, [isExpanded]);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col w-full mx-auto mb-4 px-4">
            <h1 className="text-2xl font-bold text-primary mb-4">{branchName}</h1>
            <div className="relative overflow-hidden" style={{ transition: 'height 0.3s ease-in-out', height }}>
                <p 
                    ref={descriptionRef}
                    className="text-secondary text-justify"
                >
                    {description}
                </p>
            </div>
            {!isExpanded && showButton && (
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t "></div>
            )}
            {showButton && (
                <Button 
                    variant="link" 
                    onClick={toggleDescription} 
                    className="mt-2 p-0 self-start font-semibold"
                >
                    {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
            )}
            <div className="flex items-start mt-4">
                <img src="/map-point.svg" className="w-4 h-auto mt-1" alt="Map Point" />
                <div className="ml-4 flex flex-col">
                    <p>{address}</p>
                    <a href={locationUrl} className="font-bold bg-clip-text text-transparent bg-primary">View on Map</a>
                </div>
            </div>
            <div className="flex items-start mt-4">
                <img src="/time.svg" className="w-4 h-auto mt-1" alt="Time" />
                <div className="ml-4 flex flex-col">
                    <p>Open on Weekend: {openTimeWeekday}</p>
                    <p>Open on Weekday: {openTimeWeekend}</p>
                </div>
            </div>
        </div>
    );
}

export default DescriptionSection;