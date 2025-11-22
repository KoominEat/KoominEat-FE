"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LayerPopup from "@/components/common/LayerPopup";
import { CartItem } from "@/types/cart.type";
import { getStoreInfo } from "@/lib/api/store/store";
import { StoreInfo } from "@/types/store.type";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [way, setWay] = useState<"pickup" | "delivery" | null>(null);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [storeId, setStoreId] = useState<number | null>(null);
  const [info, setInfo] = useState<StoreInfo | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("cart");
    if (!saved) return;

    const obj = JSON.parse(saved) as { [key: string]: CartItem };
    const list = Object.values(obj);

    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    setCartItems(list);

    if (list.length > 0) {
      const id = list[0].storeId;
      setStoreId(id);

      // 매장 정보 불러오기
      getStoreInfo(id).then((data) => setInfo(data));
    }
  }, []);

  const menuTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <Header title="장바구니" />

      {/* 장바구니 비었을 때 */}
      {cartItems.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          장바구니가 비어 있습니다.
        </div>
      )}

      {/* 장바구니 있을 때 */}
      {cartItems.length > 0 && (
        <div>
          {/* 매장 정보 */}
          <div className="flex gap-2 mb-3 mt-4">
            <h2 className="text-xl font-bold">{info?.name}</h2>
            <p className="flex items-center gap-0.5 text-gray-g6">
              <MapPin size={16} /> {info?.locationName}
            </p>
          </div>

          {/* 아이템 목록 */}
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
                  <p className="text-gray-600 text-sm flex gap-1 items-center font-semibold">
                    {item.price}원
                  </p>
                </div>

                <Image
                  src={item.image}
                  alt={`item image`}
                  width={40}
                  height={40}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 수령 방법 */}
      <div>
        <h2 className="text-xl font-bold mb-3">수령 방법을 선택해 주세요</h2>

        <div
          className={cn(
            "flex justify-between items-center px-4 py-3 border rounded-2xl hover:bg-gray-100 cursor-pointer mb-2",
            way === "pickup" && "border border-main transition duration-300"
          )}
          onClick={() => setWay("pickup")}
        >
          <div>
            <h3 className="text-lg font-semibold mb-0.5 text-gray-g7">
              픽업하기
            </h3>
            <p className="text-gray-600 text-sm flex gap-1 items-center font-semibold">
              직접 수령할게요
            </p>
          </div>

          <Image src="/pick-up.png" alt="pickup image" width={40} height={40} />
        </div>

        <div
          className={cn(
            "flex justify-between items-center px-4 py-3 border rounded-2xl hover:bg-gray-100 cursor-pointer mb-2",
            way === "delivery" && "border border-main transition duration-300"
          )}
          onClick={() => setWay("delivery")}
        >
          <div>
            <h3 className="text-lg font-semibold mb-0.5 text-gray-g7 flex items-center gap-1">
              전달받기{" "}
              <Image src="/sparkle.png" alt="sparkle" width={16} height={16} />
            </h3>

            <p className="text-gray-600 text-sm flex gap-1 items-center font-semibold">
              + 전달비 300원
            </p>
          </div>

          <Image
            src="/delivery.png"
            alt="delivery image"
            width={40}
            height={40}
          />
        </div>
      </div>

      {/* 전달하기 선택 시 입력창 */}
      <AnimatePresence>
        {way === "delivery" && (
          <motion.div
            key="delivery-inputs"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 mt-1">
              <Input
                placeholder="전달받을 위치를 입력해 주세요."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="ghost"
              />
              <Input
                placeholder="한줄메시지를 입력해 주세요."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant={message ? "ghost" : "default"}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 결제 금액 */}
      <div>
        <h2 className="text-xl font-bold mb-3 mt-4">
          결제 금액을 선택해 주세요
        </h2>

        <div className="w-full flex justify-between items-center px-4 py-3 border rounded-2xl mb-2">
          <div className="w-full">
            <div className="flex justify-between w-full">
              <p className="text-gray-600 flex gap-1 items-center font-semibold">
                메뉴 금액
              </p>
              <p className="font-medium text-gray-g6">{menuTotal}원</p>
            </div>

            <div className="flex justify-between w-full mt-1">
              <p className="text-gray-600 flex gap-1 items-center font-semibold">
                전달비
              </p>
              <p className="font-medium text-gray-g6">
                {way === "delivery" ? 300 : 0}원
              </p>
            </div>

            <div className="flex justify-between w-full items-center mt-3">
              <h3 className="text-lg font-semibold mb-0.5 text-gray-g7">
                결제 예정 금액
              </h3>
              <p className="font-semibold text-lg text-gray-g6">
                {way === "delivery" ? menuTotal + 300 : menuTotal}원
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="h-[104px] -mx-4 relative z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.08)] mt-5">
        <div className="px-4">
          <Button
            className="w-full mt-6 mb-4"
            variant={
              !way
                ? "disabled"
                : way === "delivery" && !location
                ? "disabled"
                : "primary"
            }
            onClick={() => setOpen(true)}
          >
            주문하기
          </Button>
        </div>
      </div>

      {/* 주문 팝업 */}
      <LayerPopup
        open={open}
        onOpenChange={setOpen}
        title="1분 내로 전달자와 매칭되지 않으면 자동으로 픽업으로 전환돼요."
      >
        <Button
          className="w-full"
          onClick={() => {
            if (way) {
              sessionStorage.setItem("order_way", way);
            }

            if (way === "delivery") {
              sessionStorage.setItem("delivery_location", location);
              sessionStorage.setItem("delivery_message", message);
            } else {
              sessionStorage.removeItem("delivery_location");
              sessionStorage.removeItem("delivery_message");
            }

            setOpen(false);
            router.push("/pay");
          }}
        >
          결제 계속하기
        </Button>
      </LayerPopup>
    </div>
  );
};

export default Cart;
