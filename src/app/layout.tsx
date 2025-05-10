import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import UpdateNotice from "@/app/(root)/component/UpdateNotice";
import ReduxProvider from "@/redux/ReduxProvider";
import DataLoader from "@/app/DataLoader";
import ClientFirebaseAuthProvider from "@/components/Auth/ClientFirebaseAuthProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | Darkak",
    default: "Darkak",
  },
  description: "Next.js admin dashboard toolkit...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ClientFirebaseAuthProvider />
          <DataLoader>
            <UpdateNotice />
            {children}
          </DataLoader>
        </ReduxProvider>
      </body>
    </html>
  );
}