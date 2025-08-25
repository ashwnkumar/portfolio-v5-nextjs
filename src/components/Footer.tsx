import { admin } from "@/constants/admin";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Button from "./form/Button";

export default function Footer() {
    return (
        <footer className="py-5 flex flex-col items-end justify-end gap-4 border-t border-gray">
            <div className="flex items-start justify-between w-full">
                <div className="flex flex-col items-start justify-center gap-2">
                    <h2 className="text-4xl font-medium text-primary">Like what you see?</h2>
                    <p className="text-2xl">Or just want to chat?</p>
                    <Link
                        href={`mailto:${admin.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group border border-gray rounded-full px-3 py-1 pe-1 flex items-center justify-center gap-3 transition-all duration-300 text-2xl hover:text-brand hover:border-brand hover:scale-105"
                    >
                        {admin.email}
                        <span className="group-hover:bg-brand group-hover:text-bg group-hover:rotate-45 transition-all duration-300 rounded-full border border-gray">
                            <ArrowUpRight size={32} />
                        </span>
                    </Link>
                </div>
                <div className="flex flex-col items-start justify-center gap-4">
                    <p className="text-lg px-4">Socials:</p>
                    <ul className="flex flex-col items-start justify-center gap-2">
                        {admin.socialLinks.map((social) => (
                            <li key={social.label}>
                                <Button label={`[${social.label}]`} navTo={social.link} />
                            </li>
                        ))}
                    </ul>

                </div>
            </div>

            <div className="w-full flex flex-row items-center justify-between border-t border-gray pt-4">
                <p className="text-text/50 text-sm">
                    &copy; 2025 Ashwin Kumar. All rights reserved.
                </p>
                <p className="text-text/70 flex items-center gap-1 text-sm">
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
        </footer>
    );
}
