import { useState, useEffect } from "react";
import type { Products } from "../types/products";
import { clientAPi } from "../api/client";
import type { Transactions } from "../types/transactions";

export function useProduct() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [paidMoney, setPaidMoney] = useState<number>(0);

  function insertMoney(amount: number) {
    setPaidMoney((prev) => prev + amount);
  }

  async function fetchProduct() {
    setLoading(true);
    try {
      const res = await clientAPi.get<Products[]>("/products");
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  }
  async function buyProduct(data: { productId: number; paid: number }) {
    const product = products.find((p) => p.id === data.productId);

    if (!product) {
      return { success: false, message: "Product Not Found" };
    }
    if (product.stock === 0) {
      return { success: false, message: "Out of Stock" };
    }
    if (paidMoney < product.price) {
      return { success: false, message: "Your Money is Not Enough" };
    }
    const changeMoney = paidMoney - product.price;

    await clientAPi.patch(`/products/${product.id}`, {
      stock: product.stock - 1,
    });

    const transaction: Transactions = {
      productId: product.id,
      productName: product.productName,
      price: product.price,
      paid: data.paid,
      change: changeMoney,
    };

    await clientAPi.post("/transaction", transaction);

    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p))
    );

    setPaidMoney(changeMoney)
    return {
      success: true,
      message: `Sucess! Change Rp ${changeMoney.toLocaleString("id-ID")}`,
      changeMoney,
    };
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return {
    products,
    insertMoney,
    paidMoney,
    loading,
    fetchProduct,
    buyProduct,
  };
}
