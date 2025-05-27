"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useDeleteScriptMutation,
  useGetAllScriptsQuery,
} from "@/redux/services/admin/adminScripts";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useGetAllScriptsQuery({});
  const [deleteScript, { isLoading: isDeleting }] = useDeleteScriptMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="text-slate-950">
      <h2 className="text-2xl font-bold">Analytics Script</h2>
      <p>Manage analytics and tracking scripts for your site.</p>

      <div className="mt-10 rounded-lg bg-white p-6 shadow-md">
        {/* button */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="font-bold">Analytic Script</p>
            <p>Manage analytics and tracking scripts for your site.</p>
          </div>
          <div>
            <button
              onClick={() => router.push("/admin/analytics/create-script")}
              className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <p>+</p>
              <span>Add Script</span>
            </button>
          </div>
        </div>

        <div className="my-8">
          <Table>
            <TableHeader>
              <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
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

              {!isLoading && data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No scripts found.
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((doc: any) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc?.name}</TableCell>
                    <TableCell>{doc?.type}</TableCell>
                    <TableCell>{doc?.location}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          doc?.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {doc?.active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(doc?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <button
                          // onClick={async () => {
                          //   await deleteScript(doc.id)
                          //     .unwrap()
                          //     .then(() => refetch())
                          //     .catch((error) => {
                          //       console.error("Failed to delete script", error);
                          //     });
                          // }}
                          disabled={isDeleting}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            await deleteScript(doc.id)
                              .unwrap()
                              .then(() => refetch())
                              .catch((error) => {
                                console.error("Failed to delete script", error);
                              });
                          }}
                          disabled={isDeleting}
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
    </div>
  );
};

export default Page;
