"use client";

import { cn } from "@/lib/utils";
import { FileText, HouseIcon, MapPin, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navigation = () => {
  const pathname = usePathname();

  if (
    pathname === "/cart" ||
    pathname === "/pay" ||
    pathname === "/order-completed" ||
    pathname === "/request-accept" ||
    pathname === "/login"
  )
    return null;

  return (
    <div className="flex justify-around pt-3 h-[84px] border-t border-gray-g2 text-gray-g5">
      {/* 홈 */}
      <Link
        href={pathname.startsWith("/courier") ? "/courier" : "/"}
        className={cn(
          "flex flex-col items-center cursor-pointer gap-0.5",
          pathname === "/" || pathname === "/courier" ? "text-main" : ""
        )}
      >
        <HouseIcon />
        <p className="text-xs font-pretendard">홈</p>
      </Link>

      {/* 매장 (courier 모드일 때 숨김) */}
      {!pathname.startsWith("/courier") && (
        <Link
          href="/map"
          className={cn(
            "flex flex-col items-center cursor-pointer gap-0.5",
            pathname === "/map" ? "text-main" : ""
          )}
        >
          <MapPin />
          <p className="text-xs font-pretendard">매장</p>
        </Link>
      )}

      {/* 주문 내역 / 전달 내역 */}
      <Link
        href={
          pathname.startsWith("/courier")
            ? "/courier/delivery-history"
            : "/order-history"
        }
        className={cn(
          "flex flex-col items-center cursor-pointer gap-0.5",
          pathname === "/order-history" ||
            pathname === "/courier/delivery-history"
            ? "text-main"
            : ""
        )}
      >
        <FileText />
        <p className="text-xs font-pretendard">
          {pathname.startsWith("/courier") ? "전달 내역" : "주문 내역"}
        </p>
      </Link>

      {/* 내정보 */}
      <Link
        href={pathname.startsWith("/courier") ? "/courier/profile" : "/profile"}
        className={cn(
          "flex flex-col items-center cursor-pointer gap-0.5",
          pathname === "/profile" || pathname === "/courier/profile"
            ? "text-main"
            : ""
        )}
      >
        <UserRound />
        <p className="text-xs font-pretendard">내 정보</p>
      </Link>
    </div>
  );
};

export default Navigation;
