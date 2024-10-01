"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import Image from "next/image";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full overflow-hidden lg:overflow-visible"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="w-full max-h-[400px] flex aspect-square items-center justify-center p-6 relative">
                  <Image
                    src={`/images/slider/img-1.png`}
                    fill={true}
                    alt="Imagen Slider"
                    priority={true}
                    className="opacity-90 blur-[2px]"
                  />
                  <span className="text-4xl font-semibold z-10 text-[#0ced41] absolute block bottom-14 right-12">
                    Visita Policia Nacional
                  </span>
                  <span className="text-lg font-medium z-10 text-[#0ced41]/95 absolute block bottom-10 right-12">
                    Leer más
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
