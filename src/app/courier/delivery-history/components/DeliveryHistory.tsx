"use client";

import Header from "@/components/Header";
import {
  DeliveryRequest,
  getMyAcceptedDeliveries,
} from "@/lib/api/delivery/delivery";
import { cn } from "@/lib/utils";
import {
  CircleCheck,
  CircleCheckBig,
  LoaderCircle,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";

const DeliveredHistory = () => {
  const [requests, setRequests] = useState<DeliveryRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getMyAcceptedDeliveries();
        setRequests(data);
      } catch (err) {
        console.error("전달 요청 리스트 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div>
        <Header title="전달 요청 리스트" />
        <p className="text-center mt-10 text-gray-500">불러오는 중...</p>
      </div>
    );
  }

  const hasPreparing = requests.some(
    (delivery) => delivery.status === "PREPARING"
  );

  return (
    <div>
      <div className="flex flex-col">
        <Header title="전달 내역" />

        <div
          className={cn(
            "w-full mt-5 h-[calc(100vh-84px-94px-100px)] overflow-y-auto"
          )}
        >
          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <CircleCheckBig size={48} className="mb-2" />
              <p className="text-lg font-bold mb-1">
                아직 전달한 주문이 없어요
              </p>
              <p className="text-sm">전달 요청을 수락하면 이곳에 표시됩니다.</p>
            </div>
          ) : (
            requests.map((delivery, index) => {
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
                        {store.locationName}
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
            })
          )}
        </div>

        {/* 주문 진행 상황 */}
        {requests.length !== 0 && (
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
        )}
      </div>
    </div>
  );
};

export default DeliveredHistory;
