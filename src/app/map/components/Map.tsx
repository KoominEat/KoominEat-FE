"use client";

import BottomSheet from "@/components/common/BottomSheet";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Header from "@/components/Header";
import { MapPin, MapPinned, Pin, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const data = [
  {
    id: 1,
    name: "카페 미르",
    location: "북악관 1층",
    category: "카페",
  },
  {
    id: 2,
    name: "버거스팟",
    location: "창공관 2층",
    category: "햄버거",
  },
  {
    id: 3,
    name: "달콤한 빵집",
    location: "예지관 지하1층",
    category: "빵",
  },
  {
    id: 4,
    name: "한끼든든분식",
    location: "명상관 1층",
    category: "분식/식사",
  },
  {
    id: 5,
    name: "그린샐러드랩",
    location: "창공관 3층",
    category: "샐러드/샌드위치",
  },
  {
    id: 6,
    name: "라떼하우스",
    location: "비전관 2층",
    category: "카페",
  },
  {
    id: 7,
    name: "킹버거",
    location: "새빛관 1층",
    category: "햄버거",
  },
  {
    id: 8,
    name: "굽는향기",
    location: "드림관 1층",
    category: "빵",
  },
  {
    id: 9,
    name: "오늘의식사",
    location: "늘빛관 2층",
    category: "분식/식사",
  },
  {
    id: 10,
    name: "샐러드바잇",
    location: "창공관 1층",
    category: "샐러드/샌드위치",
  },
];

export const categoryImages: Record<string, string> = {
  카페: "/image-coffee.png",
  햄버거: "/image-hamburger.png",
  빵: "/image-bread.png",
  "분식/식사": "/image-gimbob.png",
  "샐러드/샌드위치": "/image-salad.png",
};

const Map = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 min-h-[calc(100vh-84px)]">
      <Header title="매장" />

      <Input
        placeholder="매장명을 검색하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        rightIcon={
          <Search
            size={20}
            className="text-gray-g6"
            onClick={() => setOpen(true)}
          />
        }
      />

      <div className="relative w-full">
        <Image
          src="/school-map.png"
          alt="Map Image"
          width={800}
          height={600}
          className="w-full h-auto rounded-2xl"
        />

        <Image
          src="/pin.png"
          alt="Pin"
          width={37}
          height={37}
          className="absolute top-[41.66%] left-[15%] cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-gray-g4 font-semibold">
        <MapPinned size={50} />
        <p>지도의 핀을 클릭해보세요!</p>
      </div>

      {/* 매장 검색 결과 */}
      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <Select
          options={[
            { label: "전체", value: "all" },
            { label: "카페", value: "cafe" },
            { label: "햄버거", value: "hamburger" },
            { label: "빵", value: "bread" },
            { label: "분식/식사", value: "snack" },
            { label: "샐러드/샌드위치", value: "salad_sandwich" },
          ]}
          className="ml-2"
          value={selectedCategory}
          onValueChange={(value: string) => setSelectedCategory(value)}
        />

        <div className="overflow-y-auto max-h-[55vh] mt-4 px-2">
          {data.map(
            (item, index) =>
              (selectedCategory === "all" ||
                item.category.toLowerCase() ===
                  selectedCategory.toLowerCase()) && (
                <div
                  key={index}
                  className="flex justify-between items-center px-4 py-3 border rounded-2xl hover:bg-gray-100 cursor-pointer mb-3"
                  onClick={() => router.push(`/map/${item.id}`)}
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-0.5">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm flex gap-1 items-center font-semibold">
                      <MapPin size={16} />
                      {item.location}
                    </p>
                  </div>

                  <Image
                    src={categoryImages[item.category]}
                    alt={`category image for ${item.category}`}
                    width={40}
                    height={40}
                    onClick={() => setOpen(true)}
                  />
                </div>
              )
          )}
        </div>
      </BottomSheet>
    </div>
  );
};

export default Map;
