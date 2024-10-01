import { CarouselPlugin as Carrousel } from "@/src/components/home/carrousel";

export default function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center w-full mt-2">
      <Carrousel />
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
