import AboutSocialCard from "@/components/about/AboutSocialCard";
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
      <GridCard className="col-span-5 row-span-7">
        <p>about</p>
      </GridCard>
      <GridCard className="col-span-3 row-span-3">
        <div className="w-full h-full relative min-h-full">
          <Image
            src={admin.aboutProfile}
            alt="profile"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </GridCard>
      <GridCard className="col-span-4 row-span-6">
        <StackCard />
      </GridCard>
      <GridCard className="col-span-3 row-span-3 !bg-bg !p-0 !shadow-none hover:!scale-100">
        <AboutSocialCard />
      </GridCard>
      <GridCard className="col-span-4 row-span-4">
        <p>photos</p>
      </GridCard>
      <GridCard className="col-span-3 row-span-4">
        <p>music</p>
      </GridCard>
      <GridCard className="col-span-5 row-span-3">
        <p>exp</p>
      </GridCard>
    </GridContainer>
  );
}

export default page;
