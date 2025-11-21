import Header from "@/components/Header";
import {
  CircleCheck,
  CircleCheckBig,
  LoaderCircle,
  MapPin,
} from "lucide-react";

export const orderedList = [
  {
    name: "한솥도시락",
    location: "학생회관 1층",
    menuName: "치킨마요덮밥",
    menuPrice: 4500,
    type: "pickup",
    status: "preparing",
  },
  {
    name: "스시코우지",
    location: "제1공학관 2층",
    menuName: "연어초밥 세트",
    menuPrice: 9500,
    type: "delivery",
    status: "finished",
  },
  {
    name: "그린커피",
    location: "도서관 1층",
    menuName: "카페라떼",
    menuPrice: 4800,
    type: "pickup",
    status: "finished",
  },
];

const OrderHistory = () => {
  const hasPreparing = orderedList.some(
    (order) => order.status === "preparing"
  );

  return (
    <div>
      <div className="flex flex-col h-[calc(100vh-84px-94px)]">
        <Header title="주문 내역" />

        <div className="w-full mt-5">
          {orderedList.map((order, index) => (
            <div
              key={index}
              className="flex justify-between items-start px-4 py-4 border rounded-2xl mb-2"
            >
              <div>
                <div className="flex gap-2 mb-2">
                  <p className="text-[14px] text-gray-g6 font-bold">
                    {order.name}
                  </p>
                  <p className="text-[14px] text-gray-g6 flex items-center ">
                    <MapPin size={14} />
                    {order.location}
                  </p>
                </div>
                <h3 className="text-lg font-semibold text-gray-g7">
                  {order.menuName}
                </h3>
                <p className="text-gray-g6 font-semibold">
                  {order.menuPrice}원
                </p>
              </div>
              <div className="text-right">
                <p className="text-main font-bold px-6 py-2 bg-[#E7F6F1] rounded-full">
                  {order.type === "pickup" ? "픽업" : "전달"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 주문 진행 상황 */}
      <div className="-mx-4 mt-auto">
        <div className="flex flex-col justify-center w-full h-[94px] bg-main rounded-t-2xl p-5 text-white">
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
  );
};

export default OrderHistory;
