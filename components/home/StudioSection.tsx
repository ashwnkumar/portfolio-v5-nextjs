import { getPhotos, getRenders } from "@/lib/photos";
import SectionHeader from "../SectionHeader";
import StudioGallery from "./StudioGallery";

function StudioSection() {
  const photos = getPhotos();
  const renders = getRenders();

  const combined = [...photos, ...renders];


  return (
    <div className="w-full flex flex-col items-start gap-8 py-20">
      <SectionHeader
        title={"Studio"}
        href="/studio"
        desc="Life outside the 9-5"
      />
      <StudioGallery allImages={combined} preview />
    </div>
  );
}

export default StudioSection;
