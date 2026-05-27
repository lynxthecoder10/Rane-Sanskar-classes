import ToppersGalleryClient, { type Topper } from "@/components/ToppersGalleryClient";
import { createClient } from "@/utils/supabase/server";

async function loadToppers() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("toppers")
      .select("id, name, rank_position, score_percentage, stream, avatar_url")
      .order("rank_position", { ascending: true })
      .limit(3);

    if (error || !data?.length) {
      return [];
    }

    return data as Topper[];
  } catch {
    return [];
  }
}

export default async function ToppersGallery() {
  const toppers = await loadToppers();

  return <ToppersGalleryClient toppers={toppers} />;
}
