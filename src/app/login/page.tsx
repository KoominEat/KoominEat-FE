"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useState } from "react";

const LoginPage = () => {
  const [nickname, setNickname] = useState("");

  return (
    <div className="flex flex-col w-full min-h-screen pt-20 py-10">
      <div className="flex flex-col items-center gap-3">
        <div className="w-[150px] h-[150px] bg-gray-400">앱로고</div>
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
      >
        로그인
      </Button>
    </div>
  );
};

export default LoginPage;
