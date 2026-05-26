import ToppersGalleryClient, { type Topper } from "@/components/ToppersGalleryClient";
import { createClient } from "@/utils/supabase/server";

const defaultToppers: Topper[] = [
  { name: "Smith Patel", rank_position: 1, score_percentage: 96.4, stream: "SYJC Commerce", avatar_url: null },
  { name: "Janhavi Naik", rank_position: 2, score_percentage: 95.2, stream: "SYJC Commerce", avatar_url: null },
  { name: "Tejas More", rank_position: 3, score_percentage: 94.8, stream: "SYJC Commerce", avatar_url: null },
];

async function loadToppers() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("toppers")
      .select("id, name, rank_position, score_percentage, stream, avatar_url")
      .order("rank_position", { ascending: true })
      .limit(3);

    if (error || !data?.length) {
      return defaultToppers;
    }

    return data as Topper[];
  } catch {
    return defaultToppers;
  }
}

export default async function ToppersGallery() {
  const toppers = await loadToppers();

  return <ToppersGalleryClient toppers={toppers} />;
}
