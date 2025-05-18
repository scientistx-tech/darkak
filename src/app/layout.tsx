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
  description: "Looking for premium quality bags, stylish watches, and the latest electronics in Bangladesh? Darkak Mart offers a wide range of directly imported, top-tier products. Explore our exclusive collections at darkak.com.bd.",
  keywords: [
    "online shopping Bangladesh", "e-commerce Bangladesh", "buy online Bangladesh", "shop online Bangladesh",
  "bags online Bangladesh", "watches online Bangladesh", "electronics online Bangladesh",
  "premium quality bags", "premium quality watches", "premium quality electronics",
  "top quality bags Bangladesh", "top quality watches Bangladesh", "top quality electronics Bangladesh",
  "imported bags Bangladesh", "imported watches Bangladesh", "imported electronics Bangladesh",
  "direct import China", "Darkak Mart", "darkak.com.bd", "best online store Bangladesh",
  "fashion bags online", "stylish watches online", "latest electronics online", "men's bags online",
  "women's bags online", "luxury watches Bangladesh", "smartwatches Bangladesh", "mobile phones Bangladesh",
  "laptops Bangladesh", "accessories online Bangladesh", "bag shop online Bangladesh",
  "watch store online Bangladesh", "electronics store online Bangladesh", "affordable premium quality",
  "unique bags online", "exclusive watches online", "trending electronics Bangladesh", "new arrivals bags",
  "new arrivals watches", "new arrivals electronics", "top selling bags Bangladesh",
  "top selling watches Bangladesh", "top selling electronics Bangladesh", "durable bags online",
  "branded watches online", "innovative electronics", "fashion accessories Bangladesh",
  "timepieces Bangladesh", "gadgets online Bangladesh", "travel bags online", "casual watches online",
  "home electronics", "office electronics", "student bags online", "sports watches online",
  "audio devices Bangladesh", "wearable tech Bangladesh", "gifts online Bangladesh",
  "best bags to buy online", "best watches to buy online", "best electronics to buy online",
  "reliable online shopping Bangladesh", "fast delivery Bangladesh", "secure payment Bangladesh",
  "customer satisfaction Bangladesh", "top rated online store Bangladesh", "bag brands online",
  "watch brands online", "electronic brands online", "China import Bangladesh",
  "wholesale bags Bangladesh", "wholesale watches Bangladesh", "wholesale electronics Bangladesh",
  "bulk purchase bags", "bulk purchase watches", "bulk purchase electronics",
  "discount bags online Bangladesh", "discount watches online Bangladesh", "discount electronics online Bangladesh",
  "sale bags online Bangladesh", "sale watches online Bangladesh", "sale electronics online Bangladesh",
  "new season bags", "new season watches", "new season electronics", "premium fashion Bangladesh",
  "premium tech Bangladesh", "unique finds online Bangladesh", "quality assured products",
  "genuine products online", "official store Bangladesh", "authorized dealer Bangladesh",
  "Darkak Mart", "darkak.com.bd", "premium bags Bangladesh", "men's watches BD", "women's watches BD",
  "smartwatches Bangladesh", "digital watches", "luxury bags BD", "fashion bags Bangladesh",
  "handbags Bangladesh", "electronics online BD", "buy gadgets online Bangladesh", "best ecommerce Bangladesh",
  "top Chinese import products BD", "original smartwatches BD", "premium shopping Bangladesh",
  "best watches under 5000 BDT", "imported bags Bangladesh", "wholesale electronics BD", "online bag shop BD",
  "smartwatch sale BD", "online store Bangladesh", "trusted ecommerce BD", "top quality electronics",
  "premium gadgets Bangladesh", "women’s fashion accessories BD", "men’s watches price Bangladesh",
  "bags online Bangladesh", "trendy backpacks BD", "Darkak online shop", "direct import China to Bangladesh",
  "best online deal BD", "mobile accessories Bangladesh", "laptop bag BD", "fashion trends Bangladesh",
  "buy online watches BD", "gift items Bangladesh", "Darkak premium shop", "BD online tech store",
  "branded bags BD", "genuine products Bangladesh", "ecommerce site Bangladesh", "buy direct from China BD",
  "Chinese electronics BD", "buy smartwatch BD", "BD ecommerce marketplace", "quality bags BD",
  "watches for girls BD", "watches for boys BD", "electronics shop online BD", "women accessories online BD",
  "buy now pay later BD", "best ecommerce deals BD", "shopping mall BD", "online market Bangladesh",
  "darkak bd shopping", "Darkak store", "top ecommerce Bangladesh", "fashion ecommerce Bangladesh",
  "top electronics brands BD", "BD online electronics mart", "trendy watches Bangladesh",
  "premium watch brands BD", "online shopping site Bangladesh", "buy premium gifts BD",
  "electronic accessories BD", "mobile gadgets BD", "darkak bd offers", "electronics deals BD",
  "bag deals Bangladesh", "best value watches BD", "tech gadgets Bangladesh", "online fashion store BD",
  "ecommerce for youth BD", "stylish accessories Bangladesh", "BD ecommerce fashion", "bag brands BD",
  "watch brands BD", "BD shopping deals", "gift bags BD", "Bangladesh shopping cart", "smart shopping BD",
  "best Chinese products Bangladesh", "ecommerce fashion watch BD", "online shop bd premium",
  "BD digital marketplace", "smart bag Bangladesh", "premium store BD", "fashion deals Bangladesh",
  "BD bag mart", "electronic mart BD", "imported gadgets BD", "china product bd", "buy online BD",
  "bd tech store", "bd fashion mart"
  ],
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