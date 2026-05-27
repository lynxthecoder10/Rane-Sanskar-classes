import ClassVideosGridClient from '@/components/dashboard/ClassVideosGridClient';
import { getClassVideos } from '@/lib/portal-content';
import { createClient } from '@/utils/supabase/server';

export default async function VideosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = user
    ? await supabase.from('profiles').select('current_batch').eq('id', user.id).maybeSingle()
    : { data: null };

  const batchName = profile?.current_batch ?? 'Unassigned Batch';
  const videos = await getClassVideos(supabase, batchName);

  return (
    <div className="min-h-full bg-[var(--logo-obsidian)] p-4 text-white md:p-8">
      <ClassVideosGridClient videos={videos} batchName={batchName} />
    </div>
  );
}
