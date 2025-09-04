// app/contact/page.tsx
import type { Metadata } from "next";
import GridContainer from "@/components/GridContainer";
import GridCard from "@/components/GridCard";
import ContactForm from "@/components/about/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Ashwin Kumar – MERN Stack Developer",
  description:
    "Get in touch with Ashwin Kumar for freelance projects, collaborations, or any queries.",
  alternates: { canonical: "https://ashwinkumar.dev/contact" },
  openGraph: {
    title: "Contact | Ashwin Kumar",
    description:
      "Get in touch with Ashwin Kumar for freelance projects, collaborations, or any queries.",
    url: "https://ashwinkumar.dev/contact",
    images: ["/assets/og-default.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Ashwin Kumar",
    description:
      "Get in touch with Ashwin Kumar for freelance projects, collaborations, or any queries.",
    images: ["/assets/og-default.png"],
  },
};

export default function Page() {
  return (
    <GridContainer>
      <GridCard className="col-start-1 col-end-13 lg:col-end-7 row-start-1 row-end-4 lg:row-end-7">
        <div className="w-full h-full flex flex-col items-start justify-center gap-3">
          <h3 className="text-3xl lg:text-5xl font-medium text-brand bg-brand-faded px-2">
            Let&apos;s Work Together!
          </h3>
          <p className="text-xl lg:text-2xl">
            I’m always open to new projects, freelance opportunities, and
            collaborations.
          </p>
          <p className="text-lg lg:text-xl">
            Got an idea in mind? Share the details — I’ll get back to you as
            soon as possible.
          </p>
        </div>
      </GridCard>
      <ContactForm />
    </GridContainer>
  );
}
