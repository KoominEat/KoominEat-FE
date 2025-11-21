import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { CircleCheckBig, LoaderCircle, MapPin } from "lucide-react";

export const orderedList = [
  {
    deliveryId: 1,
    status: "PREPARING",
    order: {
      orderId: 11,
      status: "PREPARING",
      totalPrice: 4500,
      orderItemResponses: [
        {
          menuItemResponse: {
            menuId: 1,
            name: "치킨마요덮밥",
            price: 4500,
            image: "/chickenmayo.png",
          },
          quantity: 1,
        },
        {
          menuItemResponse: {
            menuId: 2,
            name: "스팸마요덮밥",
            price: 4500,
            image: "/spamayo.png",
          },
          quantity: 1,
        },
      ],
      orderType: "PICKUP", // pickup
      storeResponse: {
        storeId: 1,
        name: "한솥도시락",
        location: "학생회관 1층",
      },
      userResponse: {
        id: 101,
        name: "김주문자",
      },
    },
    deliveryUser: null,
    destination: "학생회관 1층 픽업대",
    message: "빠르게 부탁드려요!",
    estimatedTime: 5,
  },

  {
    deliveryId: 2,
    status: "FINISHED",
    order: {
      orderId: 12,
      status: "FINISHED",
      totalPrice: 9500,
      orderItemResponses: [
        {
          menuItemResponse: {
            menuId: 2,
            name: "연어초밥 세트",
            price: 9500,
            image: "/salmon.png",
          },
          quantity: 1,
        },
      ],
      orderType: "DELIVERY", // delivery
      storeResponse: {
        storeId: 2,
        name: "스시코우지",
        location: "제1공학관 2층",
      },
      userResponse: {
        id: 102,
        name: "박건강",
      },
    },
    deliveryUser: null,
    destination: "제1공학관 301호",
    message: "문 앞에 두고 연락 주세요.",
    estimatedTime: 8,
  },

  {
    deliveryId: 3,
    status: "FINISHED",
    order: {
      orderId: 13,
      status: "FINISHED",
      totalPrice: 4800,
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
      ],
      orderType: "PICKUP",
      storeResponse: {
        storeId: 3,
        name: "그린커피",
        location: "도서관 1층",
      },
      userResponse: {
        id: 103,
        name: "이독서",
      },
    },
    deliveryUser: null,
    destination: "도서관 1층 픽업대",
    message: "감사합니다 :)",
    estimatedTime: 3,
  },

  {
    deliveryId: 2,
    status: "FINISHED",
    order: {
      orderId: 12,
      status: "FINISHED",
      totalPrice: 9500,
      orderItemResponses: [
        {
          menuItemResponse: {
            menuId: 2,
            name: "연어초밥 세트",
            price: 9500,
            image: "/salmon.png",
          },
          quantity: 1,
        },
      ],
      orderType: "DELIVERY", // delivery
      storeResponse: {
        storeId: 2,
        name: "스시코우지",
        location: "제1공학관 2층",
      },
      userResponse: {
        id: 102,
        name: "박건강",
      },
    },
    deliveryUser: null,
    destination: "제1공학관 301호",
    message: "문 앞에 두고 연락 주세요.",
    estimatedTime: 8,
  },

  {
    deliveryId: 2,
    status: "FINISHED",
    order: {
      orderId: 12,
      status: "FINISHED",
      totalPrice: 9500,
      orderItemResponses: [
        {
          menuItemResponse: {
            menuId: 2,
            name: "연어초밥 세트",
            price: 9500,
            image: "/salmon.png",
          },
          quantity: 1,
        },
      ],
      orderType: "DELIVERY", // delivery
      storeResponse: {
        storeId: 2,
        name: "스시코우지",
        location: "제1공학관 2층",
      },
      userResponse: {
        id: 102,
        name: "박건강",
      },
    },
    deliveryUser: null,
    destination: "제1공학관 301호",
    message: "문 앞에 두고 연락 주세요.",
    estimatedTime: 8,
  },

  {
    deliveryId: 2,
    status: "FINISHED",
    order: {
      orderId: 12,
      status: "FINISHED",
      totalPrice: 9500,
      orderItemResponses: [
        {
          menuItemResponse: {
            menuId: 2,
            name: "연어초밥 세트",
            price: 9500,
            image: "/salmon.png",
          },
          quantity: 1,
        },
      ],
      orderType: "DELIVERY", // delivery
      storeResponse: {
        storeId: 2,
        name: "스시코우지",
        location: "제1공학관 2층",
      },
      userResponse: {
        id: 102,
        name: "박건강",
      },
    },
    deliveryUser: null,
    destination: "제1공학관 301호",
    message: "문 앞에 두고 연락 주세요.",
    estimatedTime: 8,
  },
];

const OrderHistory = () => {
  const hasPreparing = orderedList.some(
    (order) => order.status === "preparing"
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
          {orderedList.map((order, index) => (
            <div
              key={index}
              className="flex justify-between items-start px-4 py-4 border rounded-2xl mb-2"
            >
              <div>
                <div className="flex gap-2 mb-2">
                  <p className="text-[14px] text-gray-g6 font-bold">
                    {order.order.storeResponse.name}
                  </p>
                  <p className="text-[14px] text-gray-g6 flex items-center ">
                    <MapPin size={14} />
                    {order.destination}
                  </p>
                </div>
                <h3 className="text-lg font-semibold text-gray-g7">
                  {(() => {
                    const names = order.order.orderItemResponses.map(
                      (item) => item.menuItemResponse.name
                    );

                    if (names.length === 1) return names[0];
                    return `${names[0]} 외 ${names.length - 1}개`;
                  })()}
                </h3>
                <p className="text-gray-g6 font-semibold">
                  {order.order.totalPrice}원
                </p>
              </div>
              <div className="text-right">
                <p className="text-main font-bold px-6 py-2 bg-[#E7F6F1] rounded-full">
                  {order.order.orderType === "PICKUP" ? "픽업" : "전달"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 주문 진행 상황 */}
        <div className="-mx-4 mt-auto z-10">
          <div className="fixed bottom-[84px] left-0 w-full bg-main rounded-t-2xl p-5 text-white z-50">
            <div className="w-full justify-between flex font-bold text-lg">
              {!hasPreparing ? (
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
                  <CircleCheckBig size={27} className="self-end" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
