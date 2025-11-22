import Button from "@/components/common/Button";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col h-full justify-between pb-1">
      <Header title="전달 요청 수락" />

      <div className="text-center flex flex-col gap-2">
        <p className="text-gray-g7 text-xl font-bold">
          전달 요청을 수락하셨네요! <br />
          안전하고 행복한 전달 되세요.
        </p>
      </div>

      <div className="px-4 bg-gray-g1-5 py-3 flex flex-col rounded-[12px]">
        <div className="flex flex-col gap-7">
          <div className="text-center border border-main px-4 py-2 rounded-[12px] bg-white w-[85%] mx-auto">
            <p className="text-main font-bold text-lg">전달자 인증 화면</p>
            <p className="text-gray-g5">전달 내역에서 다시 볼 수 있어요.</p>
          </div>

          <Image
            src={"/Illustration-icecream.png"}
            alt="order completed"
            width={150}
            height={180}
            className="mx-auto"
          />

          <div className="flex flex-col gap-2 px-4 bg-white rounded-[12px] py-5">
            <div className="flex justify-between">
              <p className="text-gray-g6 font-semibold">주문자명</p>
              <p className="text-gray-g7 font-bold">곰팡이</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-g6 font-semibold">매장 위치</p>
              <p className="text-gray-g7 font-bold">카페미르</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-g6 font-semibold">주문 메뉴</p>
              <p className="text-gray-g7 font-bold">카페라떼</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link href={"/main"}>
          <Button className="w-full">홈으로 가기</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
