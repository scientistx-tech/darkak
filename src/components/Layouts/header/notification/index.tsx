'use client';

import { Dropdown, DropdownContent, DropdownTrigger } from '@/components/ui/dropdown';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { BellIcon } from './icons';
import { Notification as NOTE } from '@/types/client/notificationTypes';
import { FcDocument, FcFaq } from 'react-icons/fc';
import { useGetNotificationsQuery } from '@/redux/services/client/notification';
import Loader from '@/components/shared/Loader';

const getIcon = (data: NOTE) => {
  if (data.orderId) {
    return <FcDocument className="size-10 min-w-10" />;
  }
  return <FcFaq className="size-10 min-w-10" />;
};

export function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDotVisible, setIsDotVisible] = useState(true);
  const isMobile = useIsMobile();
  const { data, isLoading } = useGetNotificationsQuery("true");

  if (isLoading) return <Loader />;

  return (
    <Dropdown
      isOpen={isOpen}
      setIsOpen={(open) => {
        setIsOpen(open);
        if (open) setIsDotVisible(false);
      }}
    >
      <DropdownTrigger
        className="grid size-12 place-items-center rounded-full border bg-gray-2 text-dark outline-none hover:text-primary focus-visible:border-primary focus-visible:text-primary dark:border-dark-4 dark:bg-dark-3 dark:text-white dark:focus-visible:border-primary"
        aria-label="View Notifications"
      >
        <span className="relative">
          <BellIcon />
          {isDotVisible && (
            <span className="absolute right-0 top-0 z-1 size-2 rounded-full bg-red-light ring-2 ring-gray-2 dark:ring-dark-3">
              <span className="absolute inset-0 -z-1 animate-ping rounded-full bg-red-light opacity-75" />
            </span>
          )}
        </span>
      </DropdownTrigger>

      <DropdownContent
        align={isMobile ? 'end' : 'center'}
        className="w-[20rem] max-w-[22rem] overflow-hidden border border-stroke bg-white px-3.5 py-3 shadow-md dark:border-dark-3 dark:bg-gray-dark"
      >
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-base font-semibold text-dark dark:text-white">Notifications</span>
          <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-white">5 new</span>
        </div>

        <ul className="space-y-2 overflow-y-auto max-h-[23rem] pr-1">
          {data?.notification.map((item, index) => (
            <li key={index} role="menuitem">
              <Link
                href={item.orderId ? `/admin/orders/${item.id}` : `/admin/chat`}
                onClick={() => setIsOpen(false)}
                className="flex w-full items-start gap-3 rounded-lg px-2 py-2 outline-none hover:bg-gray-2 focus-visible:bg-gray-2 dark:hover:bg-dark-3 dark:focus-visible:bg-dark-3"
              >
                <div className="flex-shrink-0">{getIcon(item)}</div>
                <div className="w-full overflow-hidden">
                  <strong className="block text-sm font-medium text-dark dark:text-white truncate">
                    {item.title}
                  </strong>
                  <span className="block text-sm text-dark-5 dark:text-dark-6 truncate">
                    {item.message}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </DropdownContent>
    </Dropdown>
  );
}
