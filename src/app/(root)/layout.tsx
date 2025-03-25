import Footer from "@/components/Layouts/root/Footer";
import FooterNav from "@/components/Layouts/root/FooterNav";
import Header from "@/components/Layouts/root/Header";
import React, { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <div className="md:container pl-5 pr-5 md:pl-0 md:pr-0 mx-auto mt-[60px] md:mt-[160px] w-full md:px-4 lg:px-6">
        {children}
      </div>
      <Footer />
      <div className="md:hidden">
        <FooterNav />
      </div>
    </div>
  );
}

export default layout;
