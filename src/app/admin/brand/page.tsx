"use client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import AddBrand from "./AddBrand";
import ModalLayout from "@/components/Layouts/ModalLayout";

function BrandTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const data = [
    {
      id: 1,
      title: "Technology",
      icon: "https://via.placeholder.com/60x50",
      _count: {
        news: 15,
      },
    },
    {
      id: 2,
      title: "Sports",
      icon: "https://via.placeholder.com/60x50",
      _count: {
        news: 23,
      },
    },
    {
      id: 3,
      title: "Health",
      icon: "https://via.placeholder.com/60x50",
      _count: {
        news: 9,
      },
    },
  ];

  const handleEdit = (doc: any) => {
    alert(`Edit clicked for ${doc.title}`);
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onChange={() => setIsOpen(false)}
      modalComponent={<AddBrand />}
    >
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex justify-between px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            All Brands
          </h2>

          <Button onClick={() => setIsOpen(true)}>Add Brand</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
              <TableHead className="min-w-[120px] pl-5 sm:pl-6 xl:pl-7.5">
                Icon
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Product Count</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
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
              data?.map((doc, i) => (
                <TableRow key={i}>
                  <TableCell className="pl-5 sm:pl-6 xl:pl-7.5">
                    <Image
                      src={doc.icon}
                      className="aspect-[6/5] w-15 rounded-[5px] object-cover"
                      width={60}
                      height={50}
                      alt={`${doc.title} image`}
                    />
                  </TableCell>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>{doc._count.news}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => setIsOpen(true)}
                      className="bg-blue text-white"
                    >
                      Edit
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => handleEdit(doc)}
                      className="bg-red-500 text-white"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </ModalLayout>
  );
}

export default BrandTable;
