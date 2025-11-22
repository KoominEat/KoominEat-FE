"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register, login, getUserInfo } from "@/lib/api/auth/authApi";

const LoginPage = () => {
  const [nickname, setNickname] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!nickname) return;
    setLoading(true);

    try {
      // 1) 닉네임으로 회원가입 (쿠키 저장됨)
      await register(nickname);

      // 2) 쿠키 기반 로그인 시도
      const res = await login();

      // 3) 로그인 후 유저 정보 불러오기
      const user = await getUserInfo();

      // 4) 세션스토리지에 저장
      sessionStorage.setItem("user", JSON.stringify(user));

      console.log("유저 정보 저장됨:", user);

      // 5) 홈 이동
      router.push("/main");
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen pt-20 py-10">
      <Image
        src={"/Ellipse-6.svg"}
        alt="bg"
        width={200}
        height={200}
        className="absolute top-0 -right-4"
      />
      <Image
        src={"/Ellipse-7.svg"}
        alt="bg"
        width={100}
        height={100}
        className="absolute top-0 -right-4"
      />

      <div className="flex flex-col items-start text-main">
        <Image
          src={"/service-logo.png"}
          width={100}
          height={100}
          alt="Service Logo"
        />
        <p className="text-[30px] font-semibold mt-3">쿠민잇</p>
        <p className="text-[20px] font-semibold">국민대 매장과 학생을 잇다</p>
      </div>

      <div className="mt-10">
        <p className="font-semibold text-gray-g7 text-[17px] mb-2">닉네임</p>
        <Input
          placeholder="사용할 닉네임을 8자 이내로 입력해 주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <Button
        className="w-full mt-auto"
        variant={nickname ? "primary" : "disabled"}
        onClick={handleLogin}
        disabled={!nickname || loading}
      >
        로그인
      </Button>
    </div>
  );
};

export default LoginPage;
