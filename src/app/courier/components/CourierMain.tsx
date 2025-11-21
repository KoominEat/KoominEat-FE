"use client";

import Button from "@/components/common/Button";
import LayerPopup from "@/components/common/LayerPopup";
import Header from "@/components/Header";
import { ArrowRightLeft, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const data = [
  {
    deliveryId: 12,
    status: "READY",
    order: {
      orderId: 101,
      status: "PREPARING",
      totalPrice: 4500,
      orderItemResponses: [
        {
          menuItemResponse: {
            menuId: 1,
            name: "아메리카노",
            price: 4500,
            image: "/americano.png",
          },
          quantity: 1,
        },
      ],
      orderType: "DELIVERY",
      storeResponse: {
        storeId: 1,
        name: "예술관 카페",
        location: "예술관 1층",
      },
      userResponse: {
        id: 10,
        name: "김민수",
      },
    },
    deliveryUser: {
      id: 0,
      name: "string",
    },
    destination: "예술관 302호",
    message: "빨리 부탁드립니다!",
    estimatedTime: 3,
  },

  {
    deliveryId: 13,
    status: "READY",
    order: {
      orderId: 102,
      status: "PREPARING",
      totalPrice: 7900,
      orderItemResponses: [
        {
          menuItemResponse: {
            menuId: 2,
            name: "치즈버거 세트",
            price: 7900,
            image: "/burger.png",
          },
          quantity: 1,
        },
      ],
      orderType: "DELIVERY",
      storeResponse: {
        storeId: 2,
        name: "공학관 매점",
        location: "제1공학관 1층",
      },
      userResponse: {
        id: 11,
        name: "박지현",
      },
    },
    deliveryUser: {
      id: 0,
      name: "string",
    },
    destination: "공학관 512호",
    message: "문 앞에 두고 연락 주세요.",
    estimatedTime: 5,
  },

  {
    deliveryId: 14,
    status: "READY",
    order: {
      orderId: 103,
      status: "PREPARING",
      totalPrice: 8000,
      orderItemResponses: [
        {
          menuItemResponse: {
            menuId: 3,
            name: "카페라떼",
            price: 4800,
            image: "/latte.png",
          },
          quantity: 1,
        },
        {
          menuItemResponse: {
            menuId: 4,
            name: "크루아상",
            price: 3200,
            image: "/croissant.png",
          },
          quantity: 1,
        },
      ],
      orderType: "DELIVERY",
      storeResponse: {
        storeId: 3,
        name: "그린커피",
        location: "도서관 1층",
      },
      userResponse: {
        id: 12,
        name: "이서준",
      },
    },
    deliveryUser: {
      id: 0,
      name: "string",
    },
    destination: "인문관 204호",
    message: "조심히 가져다 주세요 🙂",
    estimatedTime: 4,
  },
];

const Main = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Header title="전달 요청 리스트" />

      <div className="flex">
        <span className="flex items-center gap-2 text-white font-bold px-4 py-2 bg-main rounded-full cursor-pointer hover:bg-[#004c31] transition duration-300">
          전달자 모드 <ArrowRightLeft size={18} />{" "}
        </span>
      </div>

      <div className="relative w-full">
        <Image
          src="/school-map.png"
          alt="Map Image"
          width={800}
          height={600}
          className="w-full h-auto rounded-2xl"
        />

        <Image
          src="/pin.png"
          alt="Pin"
          width={37}
          height={37}
          className="absolute top-[41.66%] left-[15%] cursor-pointer"
        />
      </div>

      {/* 매장 검색 결과 */}
      <div className="flex flex-col gap-3 mt-3 mb-5">
        {data.map((item) => {
          const store = item.order.storeResponse;
          const orderUser = item.order.userResponse;
          const menus = item.order.orderItemResponses;

          return (
            <div
              key={item.deliveryId}
              className="border border-[#D8DBE0] bg-white rounded-2xl p-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  {/* 픽업 매장 */}
                  <p className="text-xs text-gray-g5 mb-1">픽업물 매장</p>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-lg font-bold text-gray-g7">
                      {store.name}
                    </p>
                    <p className="flex items-center text-gray-g6 font-semibold">
                      <MapPin fill="#00593A" size={28} className="text-white" />{" "}
                      {store.location}
                    </p>
                  </div>

                  {/* 주문 메뉴 */}
                  <div className="mb-2">
                    {menus.map((m, i) => (
                      <p key={i} className="text-gray-g6 font-semibold">
                        {m.menuItemResponse.name}
                      </p>
                    ))}
                  </div>

                  <hr className="mb-2" />

                  {/* 주문자 정보 */}
                  <p className="text-xs text-gray-g5 mb-1">전달 대상</p>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-lg font-bold text-gray-g7">
                      {orderUser.name}
                    </p>
                    <p className="flex items-center text-gray-g6 font-semibold">
                      <MapPin fill="#00593A" size={28} className="text-white" />{" "}
                      {item.destination}
                    </p>
                  </div>

                  <p className="text-gray-g6 font-semibold">{item.message}</p>
                </div>

                <Button
                  className="w-24 h-[75px] flex justify-center items-center mt-4 bg-main text-white font-bold hover:bg-[#004c31] transition duration-300"
                  onClick={() => setOpen(true)}
                >
                  300원 <br /> 수락하기
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <LayerPopup
        open={open}
        onOpenChange={setOpen}
        title={`곰팡이님의 전달 요청을 수락할까요?`}
      >
        <Button className="w-full" onClick={() => setOpen(false)}>
          수락하기
        </Button>
      </LayerPopup>
    </div>
  );
};

export default Main;
