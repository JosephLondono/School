import { CarouselPlugin as Carrousel } from "@/src/components/home/carrousel";

export default function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center w-full mt-2">
      <Carrousel />
    </div>
  );
}
