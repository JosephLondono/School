"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { type Event } from "@/types/TableDataBases";

import { Card, CardContent } from "@/src/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export function CarouselPlugin({ events }: { events: Event[] }) {
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
        {/* Imagen principal */}
        <CarouselItem>
          <div className="p-1">
            <Card>
              <CardContent className="w-full max-h-[400px] flex aspect-square items-center justify-center p-6 relative">
                <Image
                  src={`/images/slider/imagen-principal.avif`}
                  fill={true}
                  alt="Imagen Slider"
                  priority={true}
                  className="opacity-90 "
                />
                <div className="absolute bottom-4 left-4 flex flex-col bg-black/50 p-4 rounded-md max-w-[90%]">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-semibold z-10 text-white">
                    Bienvenido a colegio Los Alpes
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-medium z-10 text-white/95 ml-1">
                    Si tienes alguna duda, contactanos | ‎
                    <Link
                      href="/contact"
                      className="underline underline-offset-4 text-lime-200">
                      Haz clic aqui
                    </Link>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        {events.map(({ id, description, title }) => (
          <CarouselItem key={id}>
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
                  <div className="absolute bottom-4 left-4 flex flex-col bg-black/50 p-4 rounded-md  max-w-[90%]">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-semibold z-10 text-[#0ced41]">
                      {title}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base font-medium z-10 text-[#0ced41]/95 ml-1 underline underline-offset-4">
                      {description}
                    </span>
                  </div>
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
