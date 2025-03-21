import Footer from "@/components/Layouts/root/Footer";
import Header from "@/components/Layouts/root/Header";
import React, { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-[160px] w-full px-4 lg:px-6">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default layout;
