import { ArrowRightLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

const Main = () => {
  const cardClass =
    "bg-[#F8F8F9] rounded-2xl border border-[#D8DBE0] p-4 flex flex-col items-center justify-center hover:bg-gray-200 cursor-pointer transition duration-300";

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex items-center h-[58px] mt-4">
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[#26282B] text-lg font-bold">
          로고
        </h1>

        <ShoppingCart className="absolute right-4 cursor-pointer" />
      </div>

      <div className="flex">
        <span className="flex items-center gap-2 text-white font-bold px-4 py-3 bg-main rounded-full cursor-pointer hover:bg-[#004c31] transition duration-300">
          주문자 모드 <ArrowRightLeft size={18} />{" "}
        </span>
      </div>

      <div className="relative w-full h-[300px] rounded-2xl overflow-hidden mb-4">
        <Image
          src="/main_image.jpg"
          alt="Main Image"
          fill
          className="object-cover"
          priority
        />

        {/* 검정 오버레이 */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/50" />

        <div className="absolute inset-0 flex items-start justify-end text-white flex-col gap-1 px-4 pb-7 font-pretendard">
          <p className="text-xl font-bold">북악관 카페미르 10주년 이벤트 🎉</p>
          <p className="text-[14px]">
            오후 3시 이후 아메리카노를 10년 전 가격으로!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-3">
        <div className={`row-span-2 ${cardClass}`}>
          <Image
            src="/image-coffee.png"
            alt="카페"
            width={100}
            height={100}
            className="w-30 h-30 object-contain mb-3"
          />
          <p className="text-center font-bold text-lg">카페</p>
        </div>

        <div className={cardClass}>
          <Image
            src="/image-hamburger.png"
            alt="햄버거"
            width={80}
            height={80}
            className="w-14 h-14 object-contain mb-2"
          />
          <p className="text-center text-sm font-medium">햄버거</p>
        </div>

        <div className={cardClass}>
          <Image
            src="/image-bread.png"
            alt="빵"
            width={80}
            height={80}
            className="w-14 h-14 object-contain mb-2"
          />
          <p className="text-center text-sm font-medium">빵</p>
        </div>

        <div className={cardClass}>
          <Image
            src="/image-gimbob.png"
            alt="분식/식사"
            width={80}
            height={80}
            className="w-14 h-14 object-contain mb-2"
          />
          <p className="text-center text-sm font-medium">분식/식사</p>
        </div>

        <div className={cardClass}>
          <Image
            src="/image-salad.png"
            alt="샐러드/샌드위치"
            width={80}
            height={80}
            className="w-14 h-14 object-contain mb-2"
          />
          <p className="text-center text-sm font-medium whitespace-nowrap">
            샐러드/샌드위치
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
