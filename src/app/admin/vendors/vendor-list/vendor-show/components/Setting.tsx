import React, { useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { toast } from "react-toastify";
import {
  useGetVendorComissionSettingQuery,
  useUpdateVendorComissionSettingMutation,
} from "@/redux/services/admin/adminVendorApis";

const Setting = ({ id }: { id: string }) => {
  const [comission, setComission] = useState<string>("");
  const { data, isLoading, error, refetch } = useGetVendorComissionSettingQuery(
    { id: Number(id) },
  );
  const [updateComission] = useUpdateVendorComissionSettingMutation();

  // useEffect(() => {
  //   if(data)
  // },[])

  const hanldeComissionSetting = async () => {
    try {
      const payload = {
        charge: Number(comission),
      };
      const res = await updateComission({
        data: payload,
        id: Number(id),
      }).unwrap();
      toast.success(res?.message || "Successfully updated comission value");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };
  return (
    <div className="mt-15 font-medium text-slate-700">
      <div className="h-[300px] w-full rounded bg-white shadow-1 lg:w-1/2">
        <div className="flex items-center justify-between border-b border-slate-600 p-5">
          <p>Sales Commision:</p>
          <Switch.Root
            checked={false}
            onCheckedChange={async (checked) => {
              // handleVendorStatus(doc?.id);
            }}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-400 transition-colors data-[state=checked]:bg-teal-600"
          >
            <Switch.Thumb className="block h-4 w-4 rounded-full bg-white shadow-lg transition-transform data-[state=checked]:translate-x-6" />
          </Switch.Root>
        </div>
        <div className="p-5">
          <p className="inline rounded bg-red-300 px-3 py-1 text-xs font-normal text-red-700">
            If sales commission is disabled here the system default commission
            will be applied.
          </p>
          <div className="mt-8">
            <label className="mb-2" htmlFor="comission">
              Comission (%)
            </label>
            <input
              type="text"
              value={comission}
              onChange={(e) => setComission(e.target.value)}
              className="w-full rounded border border-slate-600 px-2 py-1"
            />
          </div>
          <button
            onClick={hanldeComissionSetting}
            className="mt-5 inline rounded-md bg-blue-950 px-5 py-2 text-white transition-all duration-300 ease-in-out hover:bg-blue-800"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
