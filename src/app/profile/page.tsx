"use client";

import Button from "@/components/common/Button";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    // 세션 스토리지 전부 삭제
    sessionStorage.clear();

    // 모든 쿠키 삭제
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
    });

    // 로그인으로 이동
    router.replace("/login");
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) {
      try {
        queueMicrotask(() => {
          try {
            const user = JSON.parse(stored);
            setUserName(user.name);
          } catch (e) {
            console.error("유저정보 파싱 실패:", e);
          }
        });
      } catch (e) {
        console.error("유저정보 파싱 실패:", e);
      }
    }
  }, []);

  return (
    <div>
      <Header title="마이페이지" />

      <p className="text-lg font-bold mt-5">
        {userName || "사용자"}님, <br />
        오늘도 국민대학교에서 행복한 하루 되세요.
      </p>

      <div className="flex justify-between items-center border border-main rounded-2xl px-5 py-4 mt-5">
        <div>
          <p className="text-lg font-bold text-main">국민페이 잔액</p>
          <p className="font-semibold text-gray-g6">7,700원</p>
        </div>
        <Image
          src={"/kookmin_logo.png"}
          alt="kookmin_logo"
          width={50}
          height={50}
        />
      </div>

      <div className="flex gap-3">
        <Button className="w-1/2 mt-5" variant="ghost">
          닉네임 변경
        </Button>
        <Button className="w-1/2 mt-5" variant="ghost" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>

      <div className="text-gray-g6 flex flex-col gap-4 mt-10 font-semibold">
        <p>즐겨 찾는 매장</p>
        <p>결제 수단 관리</p>
        <p>알림 설정</p>
        <p>공지사항</p>
        <p>고객센터</p>
      </div>
    </div>
  );
};

export default Page;
