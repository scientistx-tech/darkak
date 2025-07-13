'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from '../../components/Button';
import AddData, { FaqType } from './AddData';
import { useGetCategoriesQuery } from '@/redux/services/admin/adminCategoryApis';
import { useDeleteCategoryMutation } from '@/redux/services/admin/adminCategoryApis';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Switch } from '@/components/FormElements/switch';
import { MdOutlineEdit } from 'react-icons/md';

import { MdDelete } from 'react-icons/md';
import Pagination from '@/components/shared/Pagination';
import RequireAccess from '@/components/Layouts/RequireAccess';

function CategoryTable() {
  const [isEditable, setIsEditable] = useState<{
    status: boolean;
    value: {
      id: string;
      title: string;
      icon: string;
      serial: string;
      meta_keywords: string;
      meta_title: string;
      content: string;
      meta_description: string;
      faq: FaqType[];
      meta_alt: string;
      meta_image: string;
    };
  }>({
    status: false,
    value: {
      id: '',
      title: '',
      icon: '',
      serial: '',
      content: '',
      faq: [],
      meta_alt: '',
      meta_description: '',
      meta_image: '',
      meta_keywords: '',
      meta_title: '',
    },
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useGetCategoriesQuery({
    page: String(currentPage),
  });
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = async (categoryId: number) => {
    try {
      await deleteCategory(categoryId).unwrap();
      toast.success('Category deleted successfully!');
      refetch();
    } catch (err) {
      toast.error('Failed to delete category.');
    }
  };

  return (
    <RequireAccess permission="category">
      <div className="rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
          <AddData refetch={refetch} value={isEditable.value} setIsEditable={setIsEditable} />
        </div>
        <div className="flex justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
          <h2 className="text-xl font-bold text-dark dark:text-white">
            All Categories{' '}
            <button className="rounded-full bg-gray-3 px-4 py-1 text-sm dark:bg-blue-500">
              {data?.data?.length}
            </button>
          </h2>
        </div>

        {error ? (
          <p className="px-6 text-red-500">Error loading categories.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                <TableHead>SL</TableHead>
                <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-center">Product Count</TableHead>
                <TableHead className="text-center">Priority</TableHead>
                <TableHead className="text-center">Home category status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5}>
                      <Skeleton className="h-8" />
                    </TableCell>
                  </TableRow>
                ))}

              {!isLoading &&
                data?.data?.map((doc: any, i: number) => (
                  <TableRow key={i} className="h-auto">
                    <TableCell>{i + 1}</TableCell>
                    <TableCell className="pl-5 sm:pl-6 xl:pl-7.5">
                      <Image
                        src={doc.icon}
                        className="aspect-[5/5] w-15 rounded-[5px] object-cover"
                        width={60}
                        height={50}
                        alt={`${doc.title} image`}
                      />
                    </TableCell>
                    <TableCell>{doc.title}</TableCell>
                    <TableCell className="text-center">{doc._count.products}</TableCell>
                    <TableCell className="text-center">{doc.serial}</TableCell>
                    <TableCell className="flex h-full justify-center align-middle">
                      <Switch />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-x-2">
                        <button
                          onClick={() => {
                            console.log(doc);
                            setIsEditable({
                              status: true,
                              value: {
                                id: String(doc.id),
                                title: doc.title,
                                icon: doc.icon,
                                serial: String(doc.serial),
                                content: doc?.content,
                                faq: doc?.faq?.faq || [],
                                meta_alt: doc?.meta_alt,
                                meta_description: doc.meta_description,
                                meta_image: doc.meta_image,
                                meta_keywords: doc.meta_keywords?.keywords?.join(', ') || '',
                                meta_title: doc.meta_title,
                              },
                            });
                            window.scroll({ top: 0, behavior: 'smooth' });
                          }}
                          // className="bg-blue text-white"
                        >
                          <MdOutlineEdit className="h-8 w-8 cursor-pointer rounded border-2 border-blue-500 p-1 text-blue-500" />
                        </button>
                        <button onClick={() => handleDelete(doc.id)} className="">
                          <MdDelete className="h-8 w-8 rounded border-2 border-red-500 p-1 text-red-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}

        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={data?.totalPage}
        />
      </div>
    </RequireAccess>
  );
}

export default CategoryTable;
