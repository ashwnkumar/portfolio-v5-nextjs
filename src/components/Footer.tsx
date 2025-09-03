import Link from "next/link";
import GridCard from "./GridCard";
import SocialLinks from "./footer/SocialLinks";
import GridContainer from "./GridContainer";

export default function Footer() {
  return (
    <GridContainer className="py-5 border-t border-brand mt-5">
      {/* Left section */}
      <GridCard className="col-start-1 col-end-13 lg:col-start-1 lg:col-end-9 row-start-1 row-end-3 !px-8">
        {/* <div className="w-full h-full flex flex-col items-start justify-center gap-3"> */}
        <h2 className="text-3xl lg:text-4xl font-medium text-primary">
          Like what you see?
        </h2>
        <p className="text-xl lg:text-2xl">
          Or just want to chat? Feel free to reach out to me.
        </p>
        {/* </div> */}
      </GridCard>

      {/* Social links */}
      <GridCard className="col-start-1 col-end-13 lg:col-start-9 lg:col-end-13 row-start-3 row-end-5 lg:row-start-1 lg:row-end-3 !bg-bg !p-0 !shadow-none hover:!scale-100">
        <SocialLinks />
      </GridCard>

      {/* Bottom full-width row */}
      <GridCard className="col-start-1 col-end-13 row-start-5 row-end-6 lg:row-start-3 lg:row-end-4 hover:!scale-100">
        <div className="w-full h-full flex flex-row items-center justify-between text-secondary text-xs lg:text-sm">
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
  );
}
