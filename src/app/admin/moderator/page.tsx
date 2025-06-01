"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import AddModeratorModal from "./AddModeratorModal";
import {
  useDeleteModeratorMutation,
  useGetAllModeratorQuery,
  useUpdateModeratorStatusMutation,
} from "@/redux/services/admin/adminModeratorApis";
import { Skeleton } from "@/components/ui/skeleton";
import * as Switch from "@radix-ui/react-switch";
import { toast } from "react-toastify";

const Page = () => {
  const [openAddModeratorModal, setOpenAddModeratorCourierModal] =
    useState(false);
  const [isEditable, setIsEditable] = useState<{
    status: boolean;
    value: { id: number; moderator_access: { access: string }[] };
  }>({
    status: false,
    value: { id: 0, moderator_access: [{ access: "" }] },
  });
  const router = useRouter();

  const {
    data: moderatorsData,
    isLoading,
    error,
    refetch,
  } = useGetAllModeratorQuery({});
  const [deleteModerator] = useDeleteModeratorMutation();
  const [changeModeratorStatus] = useUpdateModeratorStatusMutation();

  return (
    <div className="text-slate-950">
      <h2 className="text-2xl font-bold">Moderator</h2>
      <p>Split the works of Admin.</p>

      <div className="mt-10 rounded-lg bg-white p-6 shadow-md">
        {/* button */}
        <div className="flex items-center justify-end">
          <div className="">
            <button
              onClick={() => setOpenAddModeratorCourierModal(true)}
              className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <p>+</p>
              <span>Add Moderator</span>
            </button>
          </div>
        </div>

        <div className="my-8">
          <Table>
            <TableHeader>
              <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Access List</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8" />
                    </TableCell>
                  </TableRow>
                ))}

              {!isLoading && moderatorsData?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No scripts found.
                  </TableCell>
                </TableRow>
              ) : (
                moderatorsData?.data?.map((doc: any) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc?.name}</TableCell>
                    <TableCell>{doc?.email}</TableCell>
                    <TableCell>
                      {new Date(doc?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {doc?.moderator_access?.map(
                          (access: any, idx: number) => (
                            <p
                              className="mt-0.5 inline rounded px-2 py-0.5 text-red-600"
                              key={access?.access || idx}
                            >
                              {access?.access}
                            </p>
                          ),
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch.Root
                        checked={!doc?.isBlocked}
                        onCheckedChange={async (checked) => {
                          try {
                            const res = await changeModeratorStatus(
                              doc.id,
                            ).unwrap();
                            refetch();
                            toast.success(
                              res?.message || "Moderator Status Updated!",
                            );
                          } catch (err: any) {
                            toast.error(
                              err?.data?.message ||
                                "Failed to Update Moderator status",
                            );
                          }
                        }}
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
                      >
                        <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
                      </Switch.Root>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            setOpenAddModeratorCourierModal(true);
                            setIsEditable({ status: true, value: doc });
                          }}
                          // disabled={isDeleting}
                          className="text-blue-600 hover:underline"
                        >
                          Update
                        </button>
                        <button
                          onClick={async () => {
                            await deleteModerator(doc.id)
                              .unwrap()
                              .then(() => {
                                refetch();
                                toast.success("Moderator Deleted Successfully");
                              })
                              .catch((error: any) => {
                                toast.error(error?.data?.message);
                              });
                          }}
                          // disabled={isDeleting}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <AddModeratorModal
        openAddModeratorModal={openAddModeratorModal}
        setOpenAddModeratorCourierModal={setOpenAddModeratorCourierModal}
        refetch={refetch}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
      />
    </div>
  );
};

export default Page;
