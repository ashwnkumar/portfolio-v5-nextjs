import { admin } from "@/constants/admin";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Button from "./form/Button";
import GridCard from "./GridCard";
import SocialLinks from "./footer/SocialLinks";
import GridContainer from "./GridContainer";

export default function Footer() {
  return (
    <footer className=" py-5 border-t border-brand mt-5">
      <GridContainer>
        <GridCard className="col-span-8 row-span-2 !px-8">
          <div className="w-full h-full flex flex-col items-start justify-center gap-5 ">
            <div className="">
              <h2 className="text-4xl font-medium text-primary">
                Like what you see?
              </h2>
              <p className="text-2xl">
                Or just want to chat? Feel free to reach out to me.
              </p>
            </div>
          </div>
        </GridCard>
        <GridCard className="col-span-4 row-span-2 !bg-bg !p-0 !shadow-none hover:!scale-100">
          <SocialLinks />
        </GridCard>
        <GridCard className="col-span-12 hover:!scale-100 ">
          <div className="w-full h-full flex flex-row items-center justify-between text-secondary">
            <p>&copy; 2025 Ashwin Kumar. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with{" "}
              <Link
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand font-medium"
              >
                Next.js
              </Link>
            </p>
          </div>
        </GridCard>
      </GridContainer>
    </footer>
  );
}
