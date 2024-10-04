import { CarouselPlugin as Carrousel } from "@/src/components/home/carrousel";
import { createClient } from "@/src/utils/supabase/server";

export default async function Hero() {
  const supabase = createClient();
  let { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("featured", true);
  events = events ?? [];
  return (
    <div className="flex flex-col gap-16 items-center w-full mt-2">
      <Carrousel events={events} />
    </div>
  );
}
