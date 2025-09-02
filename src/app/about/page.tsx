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
      <GridCard className=" col-start-1 col-end-13 lg:col-end-6 row-start-1 row-end-7">
        <AboutDetails />
      </GridCard>

      <GridCard className="col-start-1 col-end-7 lg:col-start-6 lg:col-end-9 row-start-6 row-end-8 lg:row-start-1 lg:row-end-4 !p-3 !lg:p-5">
        <div className="w-full h-full relative min-h-full">
          <Image
            src={admin.aboutProfile}
            alt="profile"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </GridCard>

      <GridCard className="col-start-1 col-end-13 lg:col-start-9 lg:col-end-13 row-start-8 row-end-14 lg:row-start-1 lg:row-end-7 hover:!scale-100">
        <AboutExpCard />
      </GridCard>

      <GridCard className="col-start-7 col-end-13 lg:col-start-6 lg:col-end-9 row-start-6 row-end-8 lg:row-start-4 lg:row-end-7 !bg-bg !p-0 !shadow-none hover:!scale-100">
        <AboutSocialCard />
      </GridCard>

      <GridCard className="col-start-1 col-end-13 lg:col-end-13 row-start-14 row-end-18 lg:row-start-7 lg:row-end-11">
        <StackCard />
      </GridCard>

      <GridCard className="col-start-1 col-end-7 lg:col-start-1 lg:col-end-4 row-start-18 row-end-21 lg:row-start-11 lg:row-end-15">
        <MusicCard />
      </GridCard>

      <GridCard className="col-start-7 col-end-13 lg:col-start-4 lg:col-end-8 row-start-18 row-end-21 lg:row-start-11 lg:row-end-15">
        <PhotosCard />
      </GridCard>
      <GridCard className="col-start-7 col-end-13 lg:col-start-8 lg:col-end-13 row-start-18 row-end-21 lg:row-start-11 lg:row-end-13">
        <div className="w-full h-full flex flex-col items-start justify-between gap-5">
          <h3 className="text-lg lg:text-xl text-secondary flex items-center justify-center gap-2 font-medium">
            My Go To Movie:
          </h3>
          <p className="text-2xl md:text-4xl text-primary font-medium flex items-start justify-center gap-2">
            GoodFellas
          </p>
        </div>
      </GridCard>
      <GridCard className="col-start-7 col-end-13 lg:col-start-8 lg:col-end-13 row-start-18 row-end-21 lg:row-start-13 lg:row-end-15">
        <div className="w-full h-full flex flex-col items-start justify-between gap-5">
          <h3 className="text-lg lg:text-xl text-secondary flex items-center justify-center gap-2 font-medium">
            Currently Reading:
          </h3>
          <p className="text-2xl md:text-4xl text-primary font-medium flex items-start justify-center gap-2">
            You Have Not Yet Heard Your Favourite Song
          </p>
        </div>
      </GridCard>
    </GridContainer>
  );
}

export default page;
