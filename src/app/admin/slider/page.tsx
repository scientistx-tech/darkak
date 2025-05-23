"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Modal } from "antd";
import ButtonSelf from "../components/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddSlider from "./AddSlider";
import {
  useDeleteSliderMutation,
  useGetAllSlidersQuery,
} from "@/redux/services/admin/adminSliderApis";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ClientLoading from "@/app/(root)/components/ClientLoading";
import Pagination from "@/components/shared/Pagination";

function SliderTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingData, setEditingData] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("Add Slider");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  // redux hooks
  const {
    data: slidersData,
    isLoading,
    error,
    refetch,
  } = useGetAllSlidersQuery({ page: String(currentPage) });
  const [deleteSlider] = useDeleteSliderMutation();

  const handleOk = (id: any) => {
    handleDelete(id);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (sliderId: number) => {
    try {
      await deleteSlider(sliderId).unwrap();
      toast.success("Slider deleted successfully!");
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      toast.error("Failed to delete slider.");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) <ClientLoading></ClientLoading>;
  return (
    <div>
      <div className="">
        <AddSlider refetch={refetch} header={activeTab} />

        <div className="mt-5 bg-white p-6 shadow-1">
          <div className="flex justify-between px-6 py-4">
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              All Sliders
            </h2>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Banner</TableHead>
                <TableHead>Offer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="whitespace-nowrap">Product ID</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slidersData?.data?.map((slider: any) => (
                <TableRow key={slider.id}>
                  <TableCell>{slider.title}</TableCell>
                  <TableCell>
                    {slider.banner !== "null" ? (
                      <Image
                        src={slider.banner}
                        alt={slider.title}
                        width={100}
                        height={50}
                        className="rounded-md"
                      />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{slider.offer_name}</TableCell>
                  <TableCell>{slider.type}</TableCell>
                  <TableCell>{slider.details}</TableCell>
                  <TableCell>{slider.index}</TableCell>
                  <TableCell>{slider.productId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ButtonSelf
                        onClick={() =>
                          router.push(`/admin/slider/edit/${slider.id}`)
                        }
                        className="mr-2 bg-green-50 p-1 text-green-700"
                      >
                        <FaEdit className="" />
                      </ButtonSelf>
                      <Button
                        type="default"
                        onClick={() => {
                          setSelectedProductId(slider.id);
                          setIsModalOpen(true);
                        }}
                        className="mr-2 border-none bg-red-50 p-1 text-red-700 shadow-none hover:bg-red-100 hover:text-red-800"
                      >
                        <FaTrashAlt className="" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={slidersData?.totalPage}
          />
        </div>
      </div>
      <Modal
        title="Product Delete"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={() => {
          if (selectedProductId) handleOk(selectedProductId);
        }}
        onCancel={handleCancel}
        centered
      >
        <p className="text-base">Are you sure?</p>
      </Modal>
    </div>
  );
}

export default SliderTable;
