import type { SupabaseClient } from "@supabase/supabase-js";

const COMMON_BATCHES = ["All", "All Batches", "Common"];

type PortalContentBase = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  batch_category: string;
  is_featured: boolean;
  published_at: string;
};

export type StudyMaterial = PortalContentBase & {
  material_type: string;
  file_url: string;
  file_size: string | null;
  download_url: string;
};

export type ClassVideo = PortalContentBase & {
  lecture_type: string;
  video_url: string;
  thumbnail_url: string | null;
  duration_minutes: number | null;
};

type StudyMaterialRow = PortalContentBase & {
  material_type: string;
  file_url: string;
  file_size: string | null;
};

function batchFilter(batchName?: string | null) {
  const normalizedBatch = batchName?.trim();
  return normalizedBatch && normalizedBatch !== "Unassigned Batch"
    ? [normalizedBatch, ...COMMON_BATCHES]
    : COMMON_BATCHES;
}

function safeLimit(limit?: number) {
  return typeof limit === "number" && Number.isFinite(limit) && limit > 0
    ? Math.min(Math.floor(limit), 50)
    : 50;
}

async function resolveMaterialUrl(supabase: SupabaseClient, fileUrl: string) {
  if (/^(https?:)?\/\//.test(fileUrl) || fileUrl.startsWith("/")) {
    return fileUrl;
  }

  const { data, error } = await supabase.storage
    .from("study_materials")
    .createSignedUrl(fileUrl, 60 * 60);

  return error ? fileUrl : data.signedUrl;
}

export async function getStudyMaterials(
  supabase: SupabaseClient,
  batchName?: string | null,
  limit?: number
): Promise<StudyMaterial[]> {
  const { data, error } = await supabase
    .from("study_materials")
    .select(
      "id, title, description, subject, batch_category, material_type, file_url, file_size, is_featured, published_at"
    )
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .in("batch_category", batchFilter(batchName))
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(safeLimit(limit));

  if (error || !data) {
    return [];
  }

  return Promise.all(
    (data as StudyMaterialRow[]).map(async (item) => ({
      ...item,
      download_url: await resolveMaterialUrl(supabase, item.file_url),
    }))
  );
}

export async function getClassVideos(
  supabase: SupabaseClient,
  batchName?: string | null,
  limit?: number
): Promise<ClassVideo[]> {
  const { data, error } = await supabase
    .from("class_videos")
    .select(
      "id, title, description, subject, batch_category, lecture_type, video_url, thumbnail_url, duration_minutes, is_featured, published_at"
    )
    .eq("is_published", true)
    .lte("published_at", new Date().toISOString())
    .in("batch_category", batchFilter(batchName))
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(safeLimit(limit));

  return error || !data ? [] : (data as ClassVideo[]);
}

export function formatPortalDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
