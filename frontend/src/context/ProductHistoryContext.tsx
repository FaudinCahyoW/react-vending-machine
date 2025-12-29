import { createContext, useContext } from "react";
import { useProduct } from "../hooks/useProducts";

type ProductContextType = ReturnType<typeof useProduct>;

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const value = useProduct();

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProductContext must be used inside ProductProvider");
  }
  return ctx;
}
