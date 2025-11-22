"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { MapPin, MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { MenuItem, StoreInfo } from "@/types/store.type";
import { CartItem } from "@/types/cart.type";

export default function StoreDetail({
  menu,
  storeId,
  info,
}: {
  menu: MenuItem[] | undefined;
  storeId: number;
  info: StoreInfo | undefined;
}) {
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});

  // 세션에서 cart 불러오기
  useEffect(() => {
    const saved = sessionStorage.getItem("cart");
    if (saved) {
      queueMicrotask(() => {
        setCart(JSON.parse(saved));
      });
    }
  }, []);

  // cart 변경될 때 세션 저장
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /** 메뉴 추가 (항상 1개만) */
  const increase = (item: MenuItem) => {
    setCart((prev) => {
      const prevItems = Object.values(prev);

      // 장바구니에 다른 매장(storeId) 메뉴가 이미 있으면 전체 초기화
      if (prevItems.length > 0 && prevItems[0].storeId !== storeId) {
        const cleared = {
          [String(item.menuId)]: {
            storeId,
            menuId: item.menuId,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
          },
        };

        sessionStorage.setItem("cart", JSON.stringify(cleared));
        return cleared;
      }

      // 기존 매장과 같으면 그대로 추가
      const updated = {
        ...prev,
        [String(item.menuId)]: {
          storeId,
          menuId: item.menuId,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
        },
      };

      sessionStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  /** 장바구니에서 삭제 */
  const decrease = (menuId: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[String(menuId)];
      return updated;
    });
  };

  return (
    <div className="flex flex-col">
      {/* 고정 헤더 */}
      <div className="sticky top-0 z-10 bg-white">
        <Header
          title={info?.name || "알 수 없음"}
          itemCount={Object.keys(cart).length}
        />
      </div>

      {/* 스크롤 콘텐츠 */}
      <div className="h-[calc(100vh-84px-74px)] overflow-y-auto">
        <div className="">
          <Image
            src={info?.image || "/example.png"}
            alt={info?.name || "알 수 없음"}
            width={600}
            height={300}
            className="w-full h-48 object-cover"
          />{" "}
        </div>

        <div className="flex gap-2">
          <Image
            src={info?.image || "/example.png"}
            alt={info?.name || "알 수 없음"}
            width={89}
            height={89}
            className="rounded-2xl aspect-square object-cover -mt-5 border-2 border-white"
          />
          <div className="mt-2">
            <h1 className="text-[18px] font-bold">{info?.name}</h1>
            <p className="flex items-center text-gray-g6 gap-0.5">
              {" "}
              <MapPin size={18} /> {info?.locationName}{" "}
            </p>{" "}
          </div>{" "}
        </div>

        <div className="grid grid-cols-2 gap-4 my-5">
          {menu?.map((item) => {
            const cartKey = String(item.menuId);
            const isInCart = Boolean(cart[cartKey]);

            return (
              <div
                key={item.menuId}
                className="relative flex flex-col items-center justify-center gap-3 bg-gray-g1 border border-gray-g3 p-4 rounded-2xl"
              >
                {/* + 또는 - 버튼 */}
                {isInCart ? (
                  <MinusCircle
                    size={40}
                    fill="#5a5a5a"
                    className="absolute text-gray-g1 top-1 right-1 cursor-pointer"
                    onClick={() => decrease(item.menuId)}
                  />
                ) : (
                  <PlusCircle
                    size={40}
                    fill="#00593A"
                    className="absolute text-gray-g1 top-1 right-1 cursor-pointer"
                    onClick={() => increase(item)}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
