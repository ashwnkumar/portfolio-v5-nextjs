import React from "react";
import SectionHeader from "../SectionHeader";
import { Button } from "../ui/button";
import { socials } from "@/data/_index";
import Link from "next/link";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";

function ContactSection() {
  return (
    <div className="w-full flex flex-col items-start gap-8 py-20">
      <SectionHeader title={"Contact"} />
      <p className="flex flex-col gap-4">
        <span>
          Got a project in mind? Want to chat about tech? Or just want to say
          hi?
        </span>
        <span>I'm always up for a conversation.</span>
        <span>Drop me a line and let's see what we can create.</span>
      </p>

      <Button asChild className="text-sm!">
        <Link href={`${socials.email.url}`}>{socials.email.label}</Link>
      </Button>
    </div>
  );
}

export default ContactSection;
