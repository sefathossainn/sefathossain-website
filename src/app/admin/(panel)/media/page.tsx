import { adminList } from "@/lib/admin/data";
import { requireSection } from "@/lib/admin/guard";
import { AdminHeader } from "@/components/admin/ui";
import { MediaManager } from "@/components/admin/media-manager";

type MediaItem = { id: string; url: string; alt?: string };

export default async function MediaPage() {
  await requireSection("media");
  const items = await adminList<MediaItem>("media", { order: "created_at" });

  return (
    <>
      <AdminHeader
        title="Media library"
        description="Upload once, use anywhere — every image picker reads from here."
      />
      <MediaManager initial={items} />
    </>
  );
}
