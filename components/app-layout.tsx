import React, { ReactNode } from "react";
import Header from "./header";
import Footer from "./footer";

type Props = { children: ReactNode };

function AppLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default AppLayout;
