import { useState } from "react";
import { useProductContext } from "../context/ProductHistoryContext";
// import { useProduct } from "../hooks/useProducts";
import {
  Card,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "flowbite-react";
import { MoneyButton } from "./MoneyButton";
import { Link } from "react-router-dom";

export function ProductCard() {
  const { products, loading, buyProduct, paidMoney } = useProductContext();
  const [openModal, setOpenModal] = useState(false);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  return (
    <>
      <div className="mb-4 font-bold">
        Your Money: Rp {paidMoney.toLocaleString("id-ID")}
      </div>
      <div className="container-product mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
        {products.map((p) => (
          <Card key={p.id} className="max-w-sm mb-5">
            <div className="flex justify-center items-center">
              <img
                src={p.image}
                alt={p.productName}
                className="w-24 aspect-2/3 object-cover items-center justify-center"
              />
            </div>
            <div className="flex items-center justify-between">
              <h5 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {p.productName}
              </h5>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Stock : {p.stock}
              </span>
            </div>
            <div className="items-center flex justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Price : Rp {p.price.toLocaleString("id-ID")}
              </span>
              <button
                className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                onClick={async () => {
                  const result = await buyProduct({
                    productId: p.id,
                    paid: paidMoney,
                  });

                  alert(result.message);
                }}
              >
                Buy Product
              </button>
            </div>
          </Card>
        ))}
        <Card className="w-full max-w-sm sm:w-10">
          <div className="flex justify-between">
            <button
              onClick={() => setOpenModal(true)}
              className="font-bold hover:text-blue-500 border-2 border-green-400 bg-yellow-400 hover:bg-green-400 w-36 h-20 rounded-b-2xl"
            >
              Insert Money
            </button>
            <Link to="/history">
              <button className="font-bold hover:text-blue-500 border-2 border-purple-500 bg-blue-600 text-white hover:bg-green-400 w-36 h-20 rounded-b-2xl">Show Receipt</button>
            </Link>
          </div>
        </Card>
      </div>

      <Modal size="4xl" show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Insert Your Money</ModalHeader>
        <ModalBody>
          <MoneyButton />
        </ModalBody>
        <ModalFooter>
          <Button
            className="cursor-pointer border hover:bg-green-600"
            onClick={() => setOpenModal(false)}
          >
            Done
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
