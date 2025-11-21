"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register, login } from "@/lib/api/auth/authApi";

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

      console.log("로그인 성공:", res);

      // 3) 성공 시 이동
      router.push("/");
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-20 py-10">
      <div className="flex flex-col items-center gap-3">
        <Image
          src={"/service-logo.png"}
          width={100}
          height={100}
          alt="Service Logo"
        />
        <p>한줄 설명</p>
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
