"use client";
import { ReactNode } from "react";
import ClickSpark from "./ClickSpark";
import Footer from "./Footer";
import Header from "./Header";

function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <ClickSpark sparkColor="var(--foreground)">
      <div className="flex min-h-screen w-full max-w-[60dvw] flex-col mx-auto">
        <div className="h-[30vh]" />
        <Header />
        <main className="w-full p-2">{children}</main>
        <Footer />
      </div>
    </ClickSpark>
  );
}

export default LayoutWrapper;
