import AboutDetails from "@/components/about/AboutDetails";
import AboutExpCard from "@/components/about/AboutExpCard";
import AboutSocialCard from "@/components/about/AboutSocialCard";
import MusicCard from "@/components/about/MusicCard";
import PhotosCard from "@/components/about/PhotosCard";
import StackCard from "@/components/about/StackCard";
import GridCard from "@/components/GridCard";
import GridContainer from "@/components/GridContainer";
import { admin } from "@/constants/admin";
import Image from "next/image";
import React from "react";

type Props = {};

function page({}: Props) {
  return (
    <GridContainer>
      <GridCard className=" col-start-1 col-end-13 md:col-end-6 row-start-1 row-end-6">
        <AboutDetails />
      </GridCard>

      <GridCard className="col-start-1 col-end-7 md:col-start-6 md:col-end-9 row-start-6 row-end-8 md:row-start-1 md:row-end-4 !p-3 !md:p-5">
        <div className="w-full h-full relative min-h-full">
          <Image
            src={admin.aboutProfile}
            alt="profile"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </GridCard>

      <GridCard className="col-start-1 col-end-13 md:col-start-9 md:col-end-13 row-start-8 row-end-14 md:row-start-1 md:row-end-7 hover:!scale-100">
        <AboutExpCard />
      </GridCard>

      <GridCard className="col-start-7 col-end-13 md:col-start-6 md:col-end-9 row-start-6 row-end-8 md:row-start-4 md:row-end-7 !bg-bg !p-0 !shadow-none hover:!scale-100">
        <AboutSocialCard />
      </GridCard>

      <GridCard className="col-start-1 col-end-13 md:col-end-6 row-start-14 row-end-18 md:row-start-6 md:row-end-11">
        <StackCard />
      </GridCard>

      <GridCard className="col-start-1 col-end-7 md:col-start-6 md:col-end-9 row-start-18 row-end-21 md:row-start-7 md:row-end-11">
        <MusicCard />
      </GridCard>

      <GridCard className="col-start-7 col-end-13 md:col-start-9 md:col-end-13 row-start-18 row-end-21 md:row-start-7 md:row-end-11">
        <PhotosCard />
      </GridCard>
    </GridContainer>
  );
}

export default page;
