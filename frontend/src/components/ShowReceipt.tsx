import { Link } from "react-router-dom";
import { useReceipt } from "../hooks/useReceipt";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export function ShowReceipt() {
  const { loading, receipts } = useReceipt();

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 border border-dashed border-gray-400 rounded-lg p-6 bg-white text-white dark:bg-gray-800 overflow-x-auto">
      <Link to="/">
        <button className="mb-4 cursor-pointer border-4 border-blue-600 rounded w-36 bg-blue-600 text-white hover:bg-blue-400 hover:text-white"> Back to Home</button>
      </Link>
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold tracking-widest">YOUR RECEIPT</h2>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Product</TableHeadCell>
            <TableHeadCell className="text-right">Price</TableHeadCell>
            <TableHeadCell className="text-right">Paid</TableHeadCell>
            <TableHeadCell className="text-right">Change</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody className="divide-y">
          {receipts.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.productName}</TableCell>
              <TableCell className="text-right">
                Rp {r.price.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-right">
                Rp {r.paid.toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-right">
                Rp {r.change.toLocaleString("id-ID")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
