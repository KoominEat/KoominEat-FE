import Button from "@/components/common/Button";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col h-full justify-between pb-10">
      <Header title="주문 완료" />

      <div className="text-center flex flex-col gap-2">
        <h1 className="text-gray-g7 text-[28px] font-bold flex flex-col items-center">
          주문이 완료되었어요!
          <Image
            src="/underline.png"
            alt="underline"
            width={250}
            height={10}
            className="-mt-3"
          />
        </h1>
        <p className="text-gray-g6">주문 내역에서 진행 상황을 볼 수 있어요.</p>
      </div>

      <Image
        src={"/Illustration-coffee.png"}
        alt="order completed"
        width={330}
        height={330}
        className="-mr-4 mx-auto my-6"
      />

      <div className="flex flex-col gap-3">
        <Link href={"/order-history"}>
          <Button variant="primary" className="w-full">
            주문 내역 보러 가기
          </Button>
        </Link>
        <Link href={"/"}>
          <Button variant="ghost" className="w-full">
            홈으로 가기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
