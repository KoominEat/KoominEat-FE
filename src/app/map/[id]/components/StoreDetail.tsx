"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { MapPin, MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { MenuItem } from "@/types/store.type";

export default function StoreDetail({
  menu,
}: {
  menu: MenuItem[] | undefined;
}) {
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const increase = (name: string) => {
    setCart((prev) => ({
      ...prev,
      [name]: (prev[name] || 0) + 1,
    }));
  };

  const decrease = (name: string) => {
    setCart((prev) => {
      if (!prev[name]) return prev;

      const updated = { ...prev, [name]: prev[name] - 1 };
      if (updated[name] === 0) delete updated[name];
      return updated;
    });
  };

  return (
    <div className="flex flex-col">
      {/* 고정 헤더 */}
      <div className="sticky top-0 z-10 bg-white">
        {/* <Header
          title={menu?.name || "알 수 없음"}
          itemCount={Object.keys(cart).length}
        /> */}
      </div>

      {/* 스크롤 가능한 콘텐츠 */}
      <div className="h-[calc(100vh-84px)] overflow-y-auto">
        <div className="-mx-4">
          {/* <Image
            src={menu?.image || "/example.png"}
            alt={menu?.name || "알 수 없음"}
            width={600}
            height={300}
            className="w-full h-48 object-cover"
          /> */}
        </div>

        <div className="flex gap-2">
          {/* <Image
            src={menu?.profile || "/example.png"}
            alt={menu?.name || "알 수 없음"}
            width={89}
            height={89}
            className="rounded-2xl aspect-square object-cover -mt-5 border-2 border-white"
          /> */}
          <div className="mt-2">
            {/* <h1 className="text-[18px] font-bold">{menu?.name}</h1> */}
            {/* <p className="flex items-center text-gray-g6 gap-0.5">
              <MapPin size={18} /> {menu?.location}
            </p> */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-5">
          {menu?.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center gap-3 bg-gray-g1 border border-gray-g3 p-4 rounded-2xl"
            >
              {cart[item.name] ? (
                <MinusCircle
                  size={40}
                  fill="#5a5a5a"
                  className="absolute text-gray-g1 top-1 right-1 cursor-pointer"
                  onClick={() => decrease(item.name)}
                />
              ) : (
                <PlusCircle
                  size={40}
                  fill="#00593A"
                  className="absolute text-gray-g1 top-1 right-1 cursor-pointer"
                  onClick={() => increase(item.name)}
                />
              )}

              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                className="w-28 h-28 object-cover rounded-2xl"
              />
              <div className="flex flex-col w-full">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-g6 font-semibold">{item.price}원</p>

                {/* 개수 표시
                {cart[item.name] && (
                  <p className="text-sm text-gray-g6">수량: {cart[item.name]}</p>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
