import Button from "@/components/common/Button";
import Header from "@/components/Header";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <Header title="마이페이지" />

      <p className="text-lg font-bold mt-5">
        곰팡이님, <br />
        쿠민잇과 함께 따뜻한 마음을 전달해 보세요.
      </p>

      <div className="flex justify-between items-center border border-main rounded-2xl px-5 py-4 mt-5">
        <div>
          <p className="text-lg font-bold text-main">지금까지 번 전달비</p>
          <p className="font-semibold text-gray-g6">30,300원</p>
        </div>
        <Image src={"/delivery.png"} alt="sparkle" width={50} height={50} />
      </div>

      <div className="flex gap-3">
        <Button className="w-1/2 mt-5" variant="ghost">
          닉네임 변경
        </Button>
        <Button className="w-1/2 mt-5" variant="ghost">
          로그아웃
        </Button>
      </div>

      <div className="text-gray-g6 flex flex-col gap-4 mt-10 font-semibold">
        <p>전달비 출금 설정</p>
        <p>알림 설정</p>
        <p>공지사항</p>
        <p>고객센터</p>
      </div>
    </div>
  );
};

export default page;
