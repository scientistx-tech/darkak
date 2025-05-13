"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "../components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ModalLayout from "@/components/Layouts/ModalLayout";
import AddSlider from "./AddSlider";

function SliderTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingData, setEditingData] = useState<any | null>(null);
  const [sliders, setSliders] = useState([
    {
      id: 1,
      title: "Summer Sale",
      offerName: "50% OFF",
      details: "All summer items",
      productId: "123",
      bannerUrl: "https://via.placeholder.com/400x200",
    },
    {
      id: 2,
      title: "Winter Deals",
      offerName: "Up to 30%",
      details: "Winter clothing",
      productId: "456",
      bannerUrl: "https://via.placeholder.com/400x200",
    },
  ]);

  const handleSave = (slider: any) => {
    if (editingData) {
      setSliders((prev) =>
        prev.map((s) => (s.id === editingData.id ? { ...s, ...slider } : s)),
      );
    } else {
      setSliders((prev) => [...prev, { ...slider, id: Date.now() }]);
    }
    setIsOpen(false);
    setEditingData(null);
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onChange={() => {
        setIsOpen(false);
        setEditingData(null);
      }}
      modalComponent={<AddSlider />}
    >
      <div className="rounded-[10px] bg-white shadow-md dark:bg-gray-dark">
        <div className="flex justify-between px-6 py-4">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            All Sliders
          </h2>
          <Button
            onClick={() => {
              setIsOpen(true);
              setEditingData(null);
            }}
          >
            Add Slider
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Banner</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Offer</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Product ID</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sliders.map((slider) => (
              <TableRow key={slider.id}>
                <TableCell>
                  <Image
                    src={slider.bannerUrl}
                    alt={slider.title}
                    width={100}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell>{slider.title}</TableCell>
                <TableCell>{slider.offerName}</TableCell>
                <TableCell>{slider.details}</TableCell>
                <TableCell>{slider.productId}</TableCell>
                <TableCell>
                  <Button
                    className="bg-blue text-white"
                    onClick={() => {
                      setEditingData(slider);
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
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

export default SliderTable;
