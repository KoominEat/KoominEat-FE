import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import {
  CircleCheck,
  CircleCheckBig,
  LoaderCircle,
  MapPin,
} from "lucide-react";

export const deliveredList = [
  {
    deliveryId: 12,
    status: "READY",
    order: {
      orderId: 101,
      status: "FINISHED",
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
        id: 301,
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
      status: "FINISHED",
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
        id: 302,
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
    status: "FINISHED",
    order: {
      orderId: 103,
      status: "FINISHED",
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
        id: 303,
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

  {
    deliveryId: 14,
    status: "FINISHED",
    order: {
      orderId: 103,
      status: "FINISHED",
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
        id: 303,
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

  //   {
  //     deliveryId: 14,
  //     status: "FINISHED",
  //     order: {
  //       orderId: 103,
  //       status: "FINISHED",
  //       totalPrice: 8000,
  //       orderItemResponses: [
  //         {
  //           menuItemResponse: {
  //             menuId: 3,
  //             name: "카페라떼",
  //             price: 4800,
  //             image: "/latte.png",
  //           },
  //           quantity: 1,
  //         },
  //         {
  //           menuItemResponse: {
  //             menuId: 4,
  //             name: "크루아상",
  //             price: 3200,
  //             image: "/croissant.png",
  //           },
  //           quantity: 1,
  //         },
  //       ],
  //       orderType: "DELIVERY",
  //       storeResponse: {
  //         storeId: 3,
  //         name: "그린커피",
  //         location: "도서관 1층",
  //       },
  //       userResponse: {
  //         id: 303,
  //         name: "이서준",
  //       },
  //     },
  //     deliveryUser: {
  //       id: 0,
  //       name: "string",
  //     },
  //     destination: "인문관 204호",
  //     message: "조심히 가져다 주세요 🙂",
  //     estimatedTime: 4,
  //   },

  //   {
  //     deliveryId: 14,
  //     status: "FINISHED",
  //     order: {
  //       orderId: 103,
  //       status: "FINISHED",
  //       totalPrice: 8000,
  //       orderItemResponses: [
  //         {
  //           menuItemResponse: {
  //             menuId: 3,
  //             name: "카페라떼",
  //             price: 4800,
  //             image: "/latte.png",
  //           },
  //           quantity: 1,
  //         },
  //         {
  //           menuItemResponse: {
  //             menuId: 4,
  //             name: "크루아상",
  //             price: 3200,
  //             image: "/croissant.png",
  //           },
  //           quantity: 1,
  //         },
  //       ],
  //       orderType: "DELIVERY",
  //       storeResponse: {
  //         storeId: 3,
  //         name: "그린커피",
  //         location: "도서관 1층",
  //       },
  //       userResponse: {
  //         id: 303,
  //         name: "이서준",
  //       },
  //     },
  //     deliveryUser: {
  //       id: 0,
  //       name: "string",
  //     },
  //     destination: "인문관 204호",
  //     message: "조심히 가져다 주세요 🙂",
  //     estimatedTime: 4,
  //   },
];

const DeliveredHistory = () => {
  const hasPreparing = deliveredList.some(
    (delivery) => delivery.status === "PREPARING"
  );

  return (
    <div>
      <div className="flex flex-col">
        <Header title="주문 내역" />

        <div
          className={cn(
            "w-full mt-5 h-[calc(100vh-84px-94px-100px)] overflow-y-auto"
          )}
        >
          {deliveredList.map((delivery, index) => {
            const store = delivery.order.storeResponse;
            const user = delivery.order.userResponse;
            const menus = delivery.order.orderItemResponses;

            return (
              <div
                key={index}
                className="flex justify-between items-start px-4 py-4 border rounded-2xl mb-2"
              >
                <div>
                  {/* 주문자 이름 */}
                  <p className="text-[14px] text-gray-g7 font-bold mb-1">
                    {user.name}
                  </p>

                  {/* 식당 이름 + 위치 */}
                  <div className="flex gap-2 mb-2">
                    <p className="text-lg text-gray-g7 font-bold">
                      {store.name}
                    </p>
                    <p className="text-[14px] text-gray-g6 flex items-center gap-0.5">
                      <MapPin size={15} />
                      {store.location}
                    </p>
                  </div>

                  {/* 주문 메뉴 */}
                  <div>
                    {(() => {
                      const names = menus.map((m) => m.menuItemResponse.name);

                      return (
                        <p className="font-semibold text-gray-g6">
                          {names.length === 1
                            ? names[0]
                            : `${names[0]} 외 ${names.length - 1}개`}
                        </p>
                      );
                    })()}
                  </div>
                </div>

                {/* 배달 상태 */}
                <div className="text-right">
                  <p className="text-main font-bold px-6 py-2 bg-[#E7F6F1] rounded-full">
                    {delivery.status === "READY"
                      ? "준비 완료"
                      : delivery.status === "PREPARING"
                      ? "준비 중"
                      : "전달 완료"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 주문 진행 상황 */}
        <div className="-mx-4 mt-auto z-10">
          <div className="fixed bottom-[84px] left-0 w-full bg-main rounded-t-2xl p-5 text-white z-50">
            <div className="w-full justify-between flex font-bold text-lg">
              {hasPreparing ? (
                <>
                  <p>
                    아직 메뉴를 준비하는 중이에요!
                    <br />
                    조금만 기다려 주세요.
                  </p>
                  <LoaderCircle size={27} className="self-end rotate-270" />
                </>
              ) : (
                <>
                  <p>
                    메뉴가 완성되었어요!
                    <br />
                    픽업하러 매장으로 와 주세요.{" "}
                    {/* 전달자가 메뉴와 함께 출발했어요. */}
                  </p>
                  <div className="text-center text-[14px] text-main bg-white flex justify-center items-center px-3 rounded-[12px]">
                    <p>
                      전달자
                      <br />
                      인증
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveredHistory;
