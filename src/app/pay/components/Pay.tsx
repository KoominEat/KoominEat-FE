"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Header from "@/components/Header";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Pay = () => {
  const [payment, setPayment] = useState<string>("");

  const sampleStore = {
    name: "카페미르",
    location: "북악관 1층",
    way: "delivery",
    delivery_location: "북악관 앞",
    delivery_message: "문 앞에 놓고 가주세요",
    menu: [
      {
        name: "아메리카노",
        price: 4500,
        image: "/iced-americano.png",
      },
      {
        name: "카페라떼",
        price: 5500,
        image: "/cafe-latte.png",
      },
    ],
  };

  return (
    <div>
      <Header title="주문하기" />

      <div className="mb-3 mt-4">
        <div className="flex gap-2">
          <h2 className="text-xl font-bold">{sampleStore.name}</h2>
          <p className="flex items-center gap-0.5 text-gray-g6">
            <MapPin size={18} /> {sampleStore.location}
          </p>
        </div>
        <p className="text-gray-g6">
          {sampleStore.way === "delivery"
            ? "전달로 받을게요"
            : "직접 픽업할게요"}
        </p>
      </div>

      <div className="w-full">
        {sampleStore.menu.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-4 py-3 border rounded-2xl mb-2"
          >
            <div>
              <h3 className="text-lg font-semibold mb-0.5 text-gray-g7">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm flex gap-1 items-center font-semibold">
                {item.price}원
              </p>
            </div>

            <Image src={item.image} alt={`item image`} width={40} height={40} />
          </div>
        ))}
        {sampleStore.way === "delivery" && (
          <>
            <Input
              value={sampleStore.delivery_location}
              variant="ghost"
              className="mb-2"
              readOnly
            />
            <Input value={sampleStore.delivery_message} readOnly />
          </>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 mt-4">
          결제 수단을 선택해 주세요
        </h2>

        <div className="w-full flex flex-col gap-2 px-4 py-3 border rounded-2xl mb-2">
          {/* 국민페이 */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="kmu"
              checked={payment === "kmu"}
              onChange={() => setPayment("kmu")}
              className="appearance-none w-4 h-4 border rounded-full checked:bg-main"
            />
            <span className="text-gray-700 font-semibold flex items-center gap-1">
              <Image
                src={"/kookmin_logo.png"}
                alt="국민페이"
                width={25}
                height={25}
              />
              국민페이
            </span>
          </label>

          {/* 토스페이 */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="toss"
              checked={payment === "toss"}
              onChange={() => setPayment("toss")}
              className="appearance-none w-4 h-4 border rounded-full checked:bg-main"
            />
            <span className="text-gray-700 font-semibold flex items-center gap-1">
              <Image
                src={"/tosspay_logo.png"}
                alt="토스페이"
                width={25}
                height={25}
              />
              토스페이
            </span>
          </label>

          {/* 카카오페이 */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="kakao"
              checked={payment === "kakao"}
              onChange={() => setPayment("kakao")}
              className="appearance-none w-4 h-4 border rounded-full checked:bg-main"
            />
            <span className="text-gray-700 font-semibold flex items-center gap-1">
              <Image
                src={"/kakao_logo.png"}
                alt="카카오페이"
                width={35}
                height={35}
              />
              카카오페이
            </span>
          </label>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 mt-4">이 금액으로 결제할게요</h2>
        <div className="w-full flex justify-between items-center px-4 py-3 border rounded-2xl mb-2">
          <div className="w-full">
            <div className="flex justify-between w-full">
              <p className="text-gray-600 flex gap-1 items-center font-semibold">
                메뉴 금액
              </p>
              <p className="font-medium text-gray-g6">
                {sampleStore.menu.reduce((sum, item) => sum + item.price, 0)}원
              </p>
            </div>

            <div className="flex justify-between w-full mt-1">
              <p className="text-gray-600 flex gap-1 items-center font-semibold">
                전달비
              </p>
              <p className="font-medium text-gray-g6">
                {sampleStore.way === "delivery" ? 300 : 0}원
              </p>
            </div>

            <div className="flex justify-between w-full items-center mt-3">
              <h3 className="text-lg font-semibold mb-0.5 text-gray-g7">
                총 결제 금액
              </h3>
              <p className="font-semibold text-lg text-gray-g6">
                {sampleStore.way === "delivery"
                  ? sampleStore.menu.reduce(
                      (sum, item) => sum + item.price,
                      0
                    ) + 300
                  : sampleStore.menu.reduce((sum, item) => sum + item.price, 0)}
                원
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[104px] -mx-4 relative z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.08)] mt-5">
        <div className="px-4">
          <Button
            className="w-full mt-6 mb-4"
            variant={payment ? "primary" : "disabled"}
          >
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pay;
