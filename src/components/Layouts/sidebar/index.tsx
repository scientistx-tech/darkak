"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, ChevronUp } from "./icons";
import { MenuItem } from "./menu-item";
import { useSidebarContext } from "./sidebar-context";
import { getNavData, getSellerNavData, useFilteredNavData } from "./data";
import { useSelector } from "react-redux";
import { useDashboardDataQuery } from "@/redux/services/admin/adminDashboard";
import { useGetVendorsProductRequestCountsQuery } from "@/redux/services/admin/adminVendorApis";

export function Sidebar() {
  const pathname = usePathname();
  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const user = useSelector((state: any) => state.auth.user);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));

    // Uncomment the following line to enable multiple expanded items
    // setExpandedItems((prev) =>
    //   prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    // );
  };

  // Fetch dashboard data
  const { data: dashboardData } = useDashboardDataQuery({});
  const { data: vendorProductsCount } = useGetVendorsProductRequestCountsQuery(
    {},
  );

  console.log("data drom count", vendorProductsCount);
  // Get nav data with API data
  const NAV_DATA = getNavData(dashboardData, vendorProductsCount);
  const SELLER_NAV_DATA = getSellerNavData(dashboardData);

  const filteredNavs = useFilteredNavData();

  let FinalNavs: any = [];
  if (user?.isModerator) {
    FinalNavs = filteredNavs;
  } else if (user?.isAdmin) {
    FinalNavs = NAV_DATA;
  } else {
    FinalNavs = SELLER_NAV_DATA;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'w-full overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-200 ease-linear dark:border-gray-800 dark:bg-gray-dark',
          isMobile ? 'fixed bottom-0 top-0 z-50' : 'sticky top-0 h-screen',
          isOpen ? 'w-full' : 'w-0'
        )}
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex h-full flex-col py-10 pl-[25px] pr-[7px]">
          <div className="relative pr-4.5">
            <Link
              href={'/'}
              onClick={() => isMobile && toggleSidebar()}
              className="px-0 py-2.5 min-[850px]:py-0"
            >
              <Logo />
            </Link>

            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="absolute left-3/4 right-4.5 top-1/2 -translate-y-1/2 text-right"
              >
                <span className="sr-only">Close Menu</span>

                <ArrowLeftIcon className="ml-auto size-7" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="custom-scrollbar mt-6 flex-1 overflow-y-auto pr-3 min-[850px]:mt-10">
            {FinalNavs.map((section: any) => (
              <div key={section.label} className="mb-6">
                <h2 className="mb-5 text-sm font-medium text-dark-4 dark:text-gray-300">
                  {section.label}
                </h2>

                <nav role="navigation" aria-label={section.label}>
                  <ul className="space-y-2">
                    {section.items?.map((item: any) => (
                      <li key={item.title}>
                        {'items' in item && Array.isArray(item.items) && item.items.length ? (
                          <div>
                            <MenuItem
                              isActive={item.items.some(({ url }: any) => url === pathname)}
                              onClick={() => toggleExpanded(item.title)}
                            >
                              <item.icon className="size-6 shrink-0" aria-hidden="true" />

                              <span>{item.title}</span>

                              <ChevronUp
                                className={cn(
                                  'ml-auto rotate-180 transition-transform duration-200',
                                  expandedItems.includes(item.title) && 'rotate-0'
                                )}
                                aria-hidden="true"
                              />
                            </MenuItem>

                            {expandedItems.includes(item.title) && (
                              <ul className="ml-9 mr-0 space-y-1.5 pb-[15px] pr-0 pt-2" role="menu">
                                {item.items.map((subItem: any) => (
                                  <li
                                    key={subItem.title}
                                    role="none"
                                    className={
                                      pathname === subItem.url
                                        ? 'rounded-md bg-[rgba(87,80,241,0.07)]'
                                        : undefined
                                    }
                                  >
                                    <MenuItem
                                      as="link"
                                      href={subItem.url}
                                      isActive={pathname === subItem.url}
                                    >
                                      <span>{subItem.title}</span>
                                      {'values' in subItem && subItem.values && (
                                        <span
                                          className={` ${subItem.values.vive === 'positive' ? 'bg-green-50 text-green-700' : subItem.values.vive === 'neutral-1' ? 'bg-blue-50 text-blue-700' : subItem.values.vive === 'neutral-2' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'} absolute right-2 rounded-full p-1 text-xs`}
                                        >
                                          {subItem.values.value}
                                        </span>
                                      )}
                                    </MenuItem>{' '}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          (() => {
                            const href =
                              'url' in item
                                ? item.url + ''
                                : '/' + item.title.toLowerCase().split(' ').join('-');

                            return (
                              <MenuItem
                                className="flex items-center gap-3 py-3"
                                as="link"
                                href={href}
                                isActive={pathname === href}
                              >
                                <item.icon className="size-6 shrink-0" aria-hidden="true" />

                                <span>{item.title}</span>
                              </MenuItem>
                            );
                          })()
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
