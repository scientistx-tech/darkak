"use client"

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import FruadChart from "./FruadChart";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/app/admin/components/Button";

export default function FruadCheck({
    orderDetails,
}: {
    orderDetails: any;
}) {
    const token = useSelector((s: RootState) => s.auth.token)
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(false)
    const handleCheck = async () => {
        setLoading(true)
        try {
            const res = await fruadCheckCall(orderDetails?.phone, token)
            setData(res)
        } catch (error: any) {
            toast.error(error?.message)
        } finally {
            setLoading(false)
        }
    }


    //console.log(data)
    return (
        <div className="rounded flex flex-col gap-4  bg-white p-4 text-slate-900 shadow dark:bg-gray-dark dark:text-white ">
            {data && (<FruadChart data={data} />)}
            
            <Button disabled={Boolean(data)} onClick={handleCheck} loading={loading}>Check Fruad Order</Button>
        </div>
    );
}

const fruadCheckCall = async (phone: string, token: string | undefined) => {

    try {
        const res = await fetch(`https://api.darkak.com.bd/api/admin/order/fruad-check/${phone}`, {
            method: "GET",
            next: {
                tags: ["FRUAD"]
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return await res.json()
    } catch (error: any) {
        throw new Error(error?.message)
    }
}



