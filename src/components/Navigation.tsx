"use client";

import { cn } from "@/lib/utils";
import { FileText, HouseIcon, MapPin, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-around pt-3 h-[84px] border-t border-gray-g2 text-gray-g5">
      <div
        className={cn(
          "flex flex-col items-center cursor-pointer gap-0.5",
          pathname === "/" ? "text-main" : ""
        )}
      >
        <HouseIcon />
        <p className="text-xs font-pretendard">홈</p>
      </div>

      <div
        className={cn(
          "flex flex-col items-center cursor-pointer gap-0.5",
          pathname === "/map" ? "text-main" : ""
        )}
      >
        <MapPin />
        <p className="text-xs font-pretendard">매장</p>
      </div>

      <div
        className={cn(
          "flex flex-col items-center cursor-pointer gap-0.5",
          pathname === "/orders" ? "text-main" : ""
        )}
      >
        <FileText />
        <p className="text-xs font-pretendard">주문 내역</p>
      </div>

      <div
        className={cn(
          "flex flex-col items-center cursor-pointer gap-0.5",
          pathname === "/profile" ? "text-main" : ""
        )}
      >
        <UserRound />
        <p className="text-xs font-pretendard">내 정보</p>
      </div>
    </div>
  );
};

export default Navigation;
