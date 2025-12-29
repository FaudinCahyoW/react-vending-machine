import { useEffect, useState } from "react";
import { clientAPi } from "../api/client";
import type { Transactions } from "../types/transactions";

export function useReceipt() {
    const [loading, setLoading] = useState(false)
    const [receipts, setReceipts] = useState<Transactions[]>([])

    async function fetchReceipt() {
        setLoading(true)
        try{
            const res = await clientAPi.get<Transactions[]>("/transaction")
            setReceipts(res.data)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchReceipt()
    },[])

    return {
        loading, receipts, fetchReceipt
    }
}