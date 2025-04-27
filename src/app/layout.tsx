import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import UpdateNotice from "./(root)/component/UpdateNotice";

export const metadata: Metadata = {
  title: {
    template: "%s | Darkak",
    default: "Darkak",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

        <UpdateNotice />
        {children}

      </body>
    </html>
  );
}