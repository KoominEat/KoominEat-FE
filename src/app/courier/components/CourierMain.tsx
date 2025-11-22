"use client";

import { pins } from "@/app/map/components/Map";
import Button from "@/components/common/Button";
import LayerPopup from "@/components/common/LayerPopup";
import Header from "@/components/Header";
import {
  acceptDelivery,
  DeliveryRequest,
  getDeliveryRequests,
} from "@/lib/api/delivery/delivery";
import { ArrowRightLeft, MapPin, MapPinX } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Main = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [requests, setRequests] = useState<DeliveryRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationId, setLocationId] = useState<number | null>(null);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(
    null
  );
  const [orderUser, setOrderUser] = useState<{ name: string }>({ name: "" });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getDeliveryRequests(locationId ?? undefined);
        setRequests(data);
      } catch (err) {
        console.error("전달 요청 리스트 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [locationId]);

  if (loading) {
    return (
      <div>
        <Header title="전달 요청 리스트" />
        <p className="text-center mt-10 text-gray-500">불러오는 중...</p>
      </div>
    );
  }

  const handlePinClick = (locId: number) => {
    setLocationId(locId);
    // setOpen(true);
  };

  const handleAccept = async () => {
    if (!selectedDeliveryId) return;

    try {
      await acceptDelivery(selectedDeliveryId);
      setOpen(false);

      // 리스트 갱신
      setRequests((prev) =>
        prev.filter((req) => req.deliveryId !== selectedDeliveryId)
      );

      router.push("/courier/request-accept");
    } catch (error) {
      console.error(error);
      alert("수락 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Header title="전달 요청 리스트" />

      <div className="h-[calc(100vh-84px-94px)] overflow-y-auto">
        <div className="flex mb-2">
          <span
            className="flex items-center gap-2 text-white font-bold px-4 py-2 bg-main rounded-full cursor-pointer hover:bg-[#004c31] transition duration-300"
            onClick={() => {
              router.push("/");
            }}
          >
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

          {pins.map((pin) => (
            <Image
              key={pin.locationId}
              src="/pin.png"
              alt={pin.name}
              width={30}
              height={30}
              className="absolute cursor-pointer"
              style={{ top: pin.top, left: pin.left }}
              onClick={() => handlePinClick(pin.locationId)}
            />
          ))}
        </div>

        {/* 매장 검색 결과 */}
        <div className="flex flex-col gap-3 mt-3 mb-5">
          {requests.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <MapPinX size={40} className="mx-auto mb-2" />
              <p className="text-lg font-semibold">전달 요청이 없습니다</p>
              <p className="text-sm">지도를 눌러 위치를 선택해보세요!</p>
            </div>
          ) : (
            requests.map((item) => {
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
                          <MapPin
                            fill="#00593A"
                            size={28}
                            className="text-white"
                          />{" "}
                          {store.locationName}
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
                          <MapPin
                            fill="#00593A"
                            size={28}
                            className="text-white"
                          />{" "}
                          {item.destination}
                        </p>
                      </div>

                      <p className="text-gray-g6 font-semibold">
                        {item.message}
                      </p>
                    </div>

                    <Button
                      className="w-24 h-[75px] flex justify-center items-center mt-4 bg-main text-white font-bold hover:bg-[#004c31] transition duration-300"
                      onClick={() => {
                        setSelectedDeliveryId(item.deliveryId);
                        setOrderUser(item.order.userResponse);
                        setOpen(true);
                      }}
                    >
                      300원 <br /> 수락하기
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <LayerPopup
        open={open}
        onOpenChange={setOpen}
        title={`${orderUser.name}님의 전달 요청을 수락할까요?`}
      >
        <Button className="w-full" onClick={handleAccept}>
          수락하기
        </Button>
      </LayerPopup>
    </div>
  );
};

export default Main;
