import { Card } from "flowbite-react";
import { useProductContext } from "../context/ProductHistoryContext";

export function MoneyButton() {
  const { insertMoney } = useProductContext();

  const moneyList = [2000, 5000, 10000, 20000, 50000, 100000];

  return (
    <div className="grid grid-cols-3">
      {moneyList.map((money) => (
        <Card
          key={money}
          className="cursor-pointer hover:bg-gray-100 transition w-full"
          onClick={() => insertMoney(money)}
        >
          <p className="text-center text-base sm:text-xl md:text-base lg:text-xl font-bold text-blue-400">
            Rp {money.toLocaleString("id-ID")}
          </p>
        </Card>
      ))}
    </div>
  );
}
