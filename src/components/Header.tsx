/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useState, ReactNode } from "react";

const Header = ({
  title,
  itemCount = 0,
}: {
  title: ReactNode;
  itemCount?: number;
}) => {
  const pathname = usePathname();
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="relative flex items-center h-[58px] mt-4">
        <div className="absolute left-1/2 -translate-x-1/2 text-[#26282B] text-lg font-bold">
          {title}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center h-[58px] mt-4">
      <ChevronLeft
        className={cn(
          "absolute left-0 cursor-pointer",
          pathname.startsWith("/map/") ||
            pathname === "/cart" ||
            pathname === "/pay"
            ? ""
            : "invisible"
        )}
        onClick={() => router.back()}
      />

      <div className="absolute left-1/2 -translate-x-1/2 text-[#26282B] text-lg font-bold">
        {title}
      </div>

      <div
        className={cn(
          "relative ml-auto",
          pathname.startsWith("/cart") ||
            pathname === "/pay" ||
            pathname === "/courier" ||
            pathname === "/request-accept" ||
            pathname.startsWith("/courier/")
            ? "invisible"
            : ""
        )}
        onClick={() => router.push("/cart")}
      >
        <ShoppingCart size={22} className="cursor-pointer" />

        {itemCount > 0 && (
          <span className="absolute -bottom-1 -right-1 bg-main text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            {itemCount}
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
