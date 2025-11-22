"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Header from "@/components/Header";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItem } from "@/types/cart.type";
import { getStoreInfo } from "@/lib/api/store/store";
import { StoreInfo } from "@/types/store.type";
import { useRouter } from "next/navigation";
import { OrderPayload, postOrder } from "@/lib/api/order/order";

const Pay = () => {
  const [payment, setPayment] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);

  const [way, setWay] = useState<"pickup" | "delivery" | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (!savedCart) return;

    const cartObj = JSON.parse(savedCart) as { [key: string]: CartItem };
    const list = Object.values(cartObj);

    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    setCartItems(list);

    // ⭐ 매장 정보 불러오기
    if (list.length > 0) {
      const storeId = list[0].storeId;
      getStoreInfo(storeId).then((data) => setStoreInfo(data));
    }

    // ⭐ 주문 방식 및 전달 정보 불러오기
    const savedWay = sessionStorage.getItem("order_way") as
      | "pickup"
      | "delivery"
      | null;
    const savedLocation = sessionStorage.getItem("delivery_location") || "";
    const savedMessage = sessionStorage.getItem("delivery_message") || "";

    setWay(savedWay);
    setDeliveryLocation(savedLocation);
    setDeliveryMessage(savedMessage);
  }, []);

  // 총 금액 계산
  const menuTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!payment) return;

    const savedCart = sessionStorage.getItem("cart");
    if (!savedCart) return alert("장바구니가 비어있습니다!");

    const cartObj = JSON.parse(savedCart) as { [key: string]: CartItem };
    const cartList = Object.values(cartObj);

    const savedWay = sessionStorage.getItem("order_way") as
      | "pickup"
      | "delivery"
      | null;

    if (!savedWay) return alert("수령 방법이 선택되지 않았습니다.");

    const destination = sessionStorage.getItem("delivery_location") || null;
    const message = sessionStorage.getItem("delivery_message") || null;

    const payload: OrderPayload = {
      storeId: cartList[0].storeId,
      menus: cartList.map((item) => ({
        menuItemId: item.menuId,
        quantity: item.quantity ?? 1,
      })),
      orderType:
        savedWay === "delivery" ? ("DELIVERY" as const) : ("PICKUP" as const),
      destination: savedWay === "delivery" ? destination : null,
      message: savedWay === "delivery" ? message : null,
    };

    try {
      const res = await postOrder(payload);

      // 주문 성공 후 session 초기화
      sessionStorage.removeItem("cart");
      sessionStorage.removeItem("order_way");
      sessionStorage.removeItem("delivery_location");
      sessionStorage.removeItem("delivery_message");

      router.push("/order-completed");
    } catch (err) {
      console.error(err);
      alert("주문 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <Header title="주문하기" />

      {cartItems.length > 0 && storeInfo && (
        <>
          {/* 매장 정보 */}
          <div className="mb-3 mt-4">
            <div className="flex gap-2">
              <h2 className="text-xl font-bold">{storeInfo.name}</h2>
              <p className="flex items-center gap-0.5 text-gray-g6">
                <MapPin size={18} /> {storeInfo.locationName}
              </p>
            </div>
            <p className="text-gray-g6">
              {way === "delivery" ? "전달로 받을게요" : "직접 픽업할게요"}
            </p>
          </div>

          {/* 메뉴 목록 */}
          <div className="w-full">
            {cartItems.map((item) => (
              <div
                key={item.menuId}
                className="flex justify-between items-center px-4 py-3 border rounded-2xl mb-2"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-0.5 text-gray-g7">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.price}원</p>
                </div>

                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                />
              </div>
            ))}

            {way === "delivery" && (
              <>
                <Input
                  value={deliveryLocation}
                  readOnly
                  variant="ghost"
                  className="mb-2"
                />
                <Input value={deliveryMessage} readOnly variant="ghost" />
              </>
            )}
          </div>

          {/* 결제 수단 */}
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
                    src="/kookmin_logo.png"
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
                    src="/tosspay_logo.png"
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
                    src="/kakao_logo.png"
                    alt="카카오페이"
                    width={35}
                    height={35}
                  />
                  카카오페이
                </span>
              </label>
            </div>
          </div>

          {/* 금액 요약 */}
          <div>
            <h2 className="text-xl font-bold mb-3 mt-4">
              이 금액으로 결제할게요
            </h2>
            <div className="w-full px-4 py-3 border rounded-2xl">
              <div className="flex justify-between">
                <p className="text-gray-600 font-semibold">메뉴 금액</p>
                <p className="font-medium text-gray-g6">{menuTotal}원</p>
              </div>

              <div className="flex justify-between mt-1">
                <p className="text-gray-600 font-semibold">전달비</p>
                <p className="font-medium text-gray-g6">
                  {way === "delivery" ? 300 : 0}원
                </p>
              </div>

              <div className="flex justify-between mt-3">
                <h3 className="text-lg font-semibold">총 결제 금액</h3>
                <p className="font-semibold text-lg text-gray-g6">
                  {menuTotal + (way === "delivery" ? 300 : 0)}원
                </p>
              </div>
            </div>
          </div>

          {/* 결제 버튼 */}
          <div className="h-[104px] -mx-4 relative z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.08)] mt-5">
            <div className="px-4">
              <Button
                className="w-full mt-6 mb-4"
                variant={payment ? "primary" : "disabled"}
                onClick={handlePayment}
              >
                결제하기
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Pay;
