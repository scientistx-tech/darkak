import { Sidebar } from '@/components/Layouts/sidebar';
import { Header } from '@/components/Layouts/header';
import type { Metadata } from 'next';

import NextTopLoader from 'nextjs-toploader';
import type { PropsWithChildren } from 'react';
import { Providers } from './providers';
import AdminPrivateLayout from '@/components/Layouts/AdminPrivateLayout';

export const metadata: Metadata = {
  title: {
    template: '%s | Darkak-Dashboard',
    default: 'Darkak-Dashboard',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <AdminPrivateLayout>
      <Providers>
        <NextTopLoader showSpinner={false} />

        <div className="flex min-h-screen">
          <div className="w-[350px]">
            <Sidebar />
          </div>

          <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
            <Header />

            <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-4 2xl:p-5">
              {children}
            </main>
          </div>
        </div>
      </Providers>
    </AdminPrivateLayout>
  );
}
