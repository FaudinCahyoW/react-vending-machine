import { ProductCard } from "../components/ProductCard";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-3 text-center text-red-400">
        Vending Machine
      </h1>
      <ProductCard/>
    </div>
  );
}
