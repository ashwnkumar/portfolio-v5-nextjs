import { admin } from "@/constants/admin";
import { ArrowUpRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Button from "./form/Button";
import GridCard from "./GridCard";
import SocialLinks from "./footer/SocialLinks";
import GridContainer from "./GridContainer";

export default function Footer() {
  return (
    // <footer className="py-5 flex flex-col items-end justify-end gap-5 bg-gray p-10 rounded-xl my-5">
    //     <div className="flex items-start justify-between w-full">
    //         <div className="flex flex-col items-start justify-center gap-5">
    //             <div className="">
    //                 <h2 className="text-4xl font-medium text-primary">Like what you see?</h2>
    //                 <p className="text-2xl">Or just want to chat?</p>
    //             </div>
    //             <Link
    //                 href={`mailto:${admin.email}`}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className="group hover:bg-brand-faded bg-bg rounded-full px-4 py-1 pe-1 flex items-center justify-center gap-3 transition-all duration-300 text-3xl hover:text-brand hover:border-brand hover:scale-103"
    //             >
    //                 {admin.email}
    //                 <span className="group-hover:bg-brand group-hover:text-bg group-hover:rotate-45 transition-all duration-300 rounded-full border border-border">
    //                     <ArrowUpRight size={32} />
    //                 </span>
    //             </Link>
    //         </div>
    //         <div className="flex flex-col items-start justify-center gap-5">
    //             <p className="text-lg px-4">Socials:</p>
    //             <ul className="flex flex-col items-start justify-center gap-2">
    //                 {admin.socialLinks.map((social) => (
    //                     <li key={social.label}>
    //                         <Button label={`[${social.label}]`} navTo={social.link} />
    //                     </li>
    //                 ))}
    //             </ul>

    //         </div>
    //     </div>

    //     <div className="w-full flex flex-row items-center justify-between border-t border-border pt-4">
    //         <p className="text-text/50 text-sm">
    //             &copy; 2025 Ashwin Kumar. All rights reserved.
    //         </p>
    //         <p className="text-text/70 flex items-center gap-1 text-sm">
    //             Built with{" "}
    //             <Link
    //                 href="https://nextjs.org/"
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className="text-brand font-medium"
    //             >
    //                 Next.js
    //             </Link>
    //         </p>
    //     </div>
    // </footer>
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
