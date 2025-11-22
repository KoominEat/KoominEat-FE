"use client";

import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { CircleCheckBig, LoaderCircle, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getOrders, OrderHistoryResponse } from "@/lib/api/order/order";

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderHistoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res);
      } catch (err) {
        console.error("주문내역 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const hasPreparing = orders.some((order) => order.status === "PREPARING");

  if (loading) {
    return (
      <div>
        <Header title="주문 내역" />
        <p className="text-center mt-10 text-gray-500">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col">
        <Header title="주문 내역" />

        {/* 주문 리스트 */}
        <div
          className={cn(
            "w-full mt-5 h-[calc(100vh-84px-94px-100px)] overflow-y-auto"
          )}
        >
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <CircleCheckBig size={48} className="mb-2 text-gray-g5" />
              <p className="text-lg font-semibold">주문 내역이 비어 있어요</p>
              <p className="mt-1 text-sm">
                주문하시면 이곳에서 확인할 수 있어요.
              </p>
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={order.orderId}
                className="flex justify-between items-start px-4 py-4 border rounded-2xl mb-2"
              >
                <div>
                  <div className="flex gap-2 mb-2">
                    <p className="text-[14px] text-gray-g6 font-bold">
                      {order.storeResponse.name}
                    </p>
                    <p className="text-[14px] text-gray-g6 flex items-center ">
                      <MapPin size={14} />
                      {order.storeResponse.locationName}
                    </p>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-g7">
                    {(() => {
                      const names = order.orderItemResponses.map(
                        (item) => item.menuItemResponse.name
                      );

                      if (names.length === 1) return names[0];
                      return `${names[0]} 외 ${names.length - 1}개`;
                    })()}
                  </h3>

                  <p className="text-gray-g6 font-semibold">
                    {order.totalPrice}원
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-main font-bold px-6 py-2 bg-[#E7F6F1] rounded-full">
                    {order.orderType === "PICKUP" ? "픽업" : "전달"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 주문 진행 상황 */}
        {orders.length > 0 && (
          <div className="-mx-4 mt-auto z-10 max-w-[480px] w-full">
            <div className="fixed bottom-[84px] left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-main rounded-t-2xl p-5 text-white z-50">
              <div className="w-full justify-between flex font-bold text-lg">
                {false ? (
                  <>
                    <p>
                      메뉴가 완성되었어요!
                      <br />
                      픽업하러 매장으로 와 주세요.
                    </p>
                    <CircleCheckBig size={27} className="self-end" />
                  </>
                ) : (
                  <>
                    <p>
                      아직 메뉴를 준비하는 중이에요!
                      <br />
                      조금만 기다려 주세요.
                    </p>
                    <LoaderCircle size={27} className="self-end rotate-270" />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
