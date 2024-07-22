"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ImagesSectionProps {
  imageList: string[]; // Array of image URLs
}

const ImagesSection: React.FC<ImagesSectionProps> = ({ imageList }) => {
  const imageCount = imageList.length;
  const slidesCount = Math.ceil(imageCount / 5);

  return (
    <Carousel className="w-full mx-auto mb-4">
      <CarouselContent>
        {Array.from({ length: slidesCount }).map((_, slideIndex) => (
          <CarouselItem key={slideIndex}>
            <Card className="h-[calc(100vh-100px)]"> {/* Adjust height as needed */}
              <CardContent className="flex flex-col md:flex-row p-2 gap-2 h-full">
                <div className="md:w-2/3 flex-grow relative">
                  <Image 
                    src={imageList[slideIndex * 5]} 
                    alt={`Image ${slideIndex * 5 + 1}`} 
                    layout="fill" 
                    objectFit="cover"
                  />
                </div>
                <div className="md:w-1/3 grid grid-cols-2 gap-2">
                  {Array.from({ length: Math.min(4, imageCount - slideIndex * 5 - 1) }).map((_, index) => (
                    <div key={index} className="relative">
                      <Image 
                        src={imageList[slideIndex * 5 + index + 1]} 
                        alt={`Image ${slideIndex * 5 + index + 2}`} 
                        layout="fill" 
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default ImagesSection
