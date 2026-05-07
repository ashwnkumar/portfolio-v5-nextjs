import SectionHeader from "@/components/SectionHeader";
import StudioGallery from "@/components/home/StudioGallery";
import { getPhotos, getRenders } from "@/lib/photos";

function StudioPage() {
  const photos = getPhotos();
  const renders = getRenders();
  const allImages = [...photos, ...renders];

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex flex-col items-start gap-8 py-20">
        <SectionHeader
          title="Studio"
          desc="Photography and 3D renders — life outside the 9-5."
        />
        <StudioGallery allImages={allImages} />
      </div>
    </div>
  );
}

export default StudioPage;
