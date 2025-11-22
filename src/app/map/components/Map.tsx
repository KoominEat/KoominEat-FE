"use client";

import BottomSheet from "@/components/common/BottomSheet";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import Header from "@/components/Header";
import { MapPin, MapPinned, Search } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getStores } from "@/lib/api/store/store";
import { getCategoryId, Store } from "@/types/store.type";

const categories = [
  "전체",
  "카페",
  "햄버거",
  "빵",
  "분식/식사",
  "샐러드/샌드위치",
];

// 핀 데이터 (locationId와 위치 매핑)
export const pins = [
  { locationId: 7, name: "성곡도서관", top: "3%", left: "4%" },
  { locationId: 6, name: "공학관", top: "25%", left: "8%" },
  { locationId: 1, name: "본부관", top: "25%", left: "55%" },
  { locationId: 3, name: "법학관", top: "35%", left: "70%" },
  { locationId: 2, name: "북악관", top: "10%", left: "52%" },
  { locationId: 8, name: "과학관", top: "25%", left: "90%" },
  { locationId: 5, name: "복지관", top: "60%", left: "35%" },
];

const Map = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string | null>(null); // 초기값을 null로
  const [locationId, setLocationId] = useState<number | null>(null);
  const [stores, setStores] = useState<Store[]>([]);

  const isInitialized = useRef(false);

  // 1. 초기화: URL 파라미터 읽어서 category 설정
  useEffect(() => {
    if (!isInitialized.current) {
      const urlCategory = searchParams.get("category") || "전체";
      // eslint-disable-next-line react-hooks/rules-of-hooks
      setCategory(urlCategory);
      setOpen(true);
      isInitialized.current = true;
    }
  }, [searchParams]);

  // 2. category가 설정된 후에만 API 호출
  useEffect(() => {
    // category가 null이면 아직 초기화 안된 것이므로 스킵
    if (category === null) return;

    const load = async () => {
      const categoryId =
        category === "전체" ? undefined : getCategoryId(category);
      const result = await getStores(categoryId, locationId ?? undefined);
      setStores(result);
    };
    load();
  }, [category, locationId]);

  const handlePinClick = (locId: number) => {
    setLocationId(locId);
    setCategory("전체");
    setOpen(true);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  if (category === null) {
    return <div className="flex items-center justify-center">로딩 중...</div>;
  }

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

        {pins.map((pin) => (
          <Image
            key={pin.locationId}
            src="/pin.png"
            alt={pin.name}
            width={30}
            height={30}
            className="absolute cursor-pointer"
            style={{ top: pin.top, left: pin.left }}
            onClick={() => handlePinClick(pin.locationId)}
          />
        ))}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-gray-g4 font-semibold ">
        <MapPinned size={50} />
        <p>지도의 핀을 클릭해보세요!</p>
      </div>

      {/* BottomSheet */}
      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <Select
          options={categories.map((c) => ({ label: c, value: c }))}
          className="ml-2"
          value={category}
          onValueChange={handleCategoryChange}
        />

        <div className="overflow-y-auto max-h-[55vh] mt-4 px-2">
          {stores.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-g4">
              <MapPin size={40} />
              <p className="mt-2 font-semibold">해당 조건의 매장이 없습니다</p>
            </div>
          ) : (
            stores.map((store) => (
              <div
                key={store.storeId}
                className="flex justify-between items-center px-4 py-3 border rounded-2xl hover:bg-gray-100 cursor-pointer mb-3"
                onClick={() => router.push(`/map/${store.storeId}`)}
              >
                <div>
                  <h3 className="text-lg font-semibold mb-0.5">{store.name}</h3>
                  <p className="text-gray-600 text-sm flex gap-1 items-center font-semibold">
                    <MapPin size={16} />
                    {store.locationName}
                  </p>
                </div>

                <Image
                  src={store.image || "/default.png"}
                  alt={store.name}
                  width={40}
                  height={40}
                />
              </div>
            ))
          )}
        </div>
      </BottomSheet>
    </div>
  );
};

export default Map;
