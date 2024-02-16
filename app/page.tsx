'use client'
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
type Item = {
  itemDescription: string;
  itemQty: number;
  itemUnitPrice: number;
  itemTotalPrice: number;
}

type ItemObject = {
  [key: string]: Item;
}
export default function Home() {

  const [items, setItems] = useState<ItemObject>({
    [uuidv4()]: {
      itemDescription: '',
      itemQty: 1,
      itemTotalPrice: 0,
      itemUnitPrice: 0,
    }
  })

  function AddRow() {
    const newKey = uuidv4();
    const obj = { ...items };
    obj[newKey] = {
      itemDescription: '',
      itemQty: 1,
      itemTotalPrice: 0,
      itemUnitPrice: 0,
    }

    setItems(obj);
  }

  function DeleteRow(key: string) {
    const obj = { ...items };
    delete obj[key];

    setItems(obj);
  }

  function CalculateTotalItemCost(qty: number, price: number) {
    return qty * price;
  }

  function GrandTotal() {
    let cost = 0;
    Object.keys(items).map((key) => {
      cost += items[key].itemTotalPrice;
    })

    return cost;
  }

  return (
    <div className="h-screen flex flex-col gap-1 mt-[15rem]">
      <h1 className="font-bold text-2xl text-center underline print:hidden">Estimate Creation</h1>
      {/* My Table Here */}
      <div className="flex justify-center">
        <table>
          <thead>
            <tr className="border border-black text-center">
              <th>Sr #</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Total Price</th>
              <th className="print:hidden">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(items).map((key, index) => (
                <tr key={key} className="text-center items-center border border-black">
                  <td className="border border-black">
                    {index + 1}
                  </td>
                  <td className="border border-black">
                    <input onChange={(e) => {
                      items[key].itemDescription = e.target.value;
                      const obj = { ...items };
                      setItems(obj);
                    }} className="w-auto" />
                  </td>
                  <td className="border border-black">
                    <input onChange={(e) => {
                      let number = Number(e.target.value);
                      if (number) {
                        const obj = { ...items };
                        obj[key].itemUnitPrice = Number(e.target.value);
                        obj[key].itemTotalPrice = obj[key].itemUnitPrice * obj[key].itemQty;
                        setItems(obj);
                      }


                    }} defaultValue={items[key].itemUnitPrice} type="number" className="w-16" />
                  </td>
                  <td className="border border-black">
                    <input onChange={(e) => {
                      let number = Number(e.target.value);
                      if (number) {
                        const obj = { ...items };
                        obj[key].itemQty = number;
                        obj[key].itemTotalPrice = obj[key].itemUnitPrice * obj[key].itemQty;
                        setItems(obj);
                      }
                    }} defaultValue={items[key].itemQty} type="number" className="w-16" />
                  </td>
                  <td className="border border-black">
                    {(CalculateTotalItemCost(items[key].itemQty, items[key].itemUnitPrice)).toLocaleString() + ' Rs'}
                  </td>
                  <td className="print:hidden px-2 py-2">
                    <button onClick={() => DeleteRow(key)} className="bg-red-500 px-2 py-2 rounded-lg text-white hover:bg-red-500/40">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button className="print:hidden bg-green-700 w-24 px-2 py-2 rounded-lg text-white hover:bg-green-700/40" onClick={() => AddRow()}>Add Row</button>
        <button className="print:hidden bg-black w-24 px-2 py-2 rounded-lg text-white hover:bg-black/40" onClick={() => window.print()}>Print</button>
      </div>

      <div className="flex justify-end gap-1">
        <h1 className="text-xl underline font-bold">Grand Total </h1>
        <h1 className="text-xl underline font-bold">{GrandTotal().toLocaleString() + ' Rs'}</h1>
      </div>
    </div>
  );
}
