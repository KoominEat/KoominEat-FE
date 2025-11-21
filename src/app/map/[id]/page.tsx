import StoreDetail from "./components/StoreDetail";

export interface MenuItem {
  image: string;
  name: string;
  price: number;
}

export interface Store {
  id: number;
  name: string;
  image: string; // 대표 이미지
  profile: string; // 프로필 작은 이미지
  location: string; // OO관 O층
  menu: MenuItem[]; // 메뉴 배열
}

export const stores: Store[] = [
  {
    id: 1,
    name: "카페 미르",
    image: "/store-background.jpg",
    profile: "/store-profile.png",
    location: "북악관 1층",
    menu: [
      {
        image: "/iced-americano.png",
        name: "아메리카노",
        price: 2500,
      },
      {
        image: "/cafe-latte.png",
        name: "카페라떼",
        price: 3200,
      },
      {
        image: "/cafe-mocha.png",
        name: "카페모카",
        price: 4800,
      },
    ],
  },
  {
    id: 2,
    name: "버거스팟",
    image: "/stores/burger/main.jpg",
    profile: "/stores/burger/profile.jpg",
    location: "창공관 2층",
    menu: [
      {
        image: "/menu/burger-set.jpg",
        name: "치즈버거 세트",
        price: 6900,
      },
      {
        image: "/menu/fries.jpg",
        name: "감자튀김",
        price: 2000,
      },
      {
        image: "/menu/coke.jpg",
        name: "콜라",
        price: 1500,
      },
    ],
  },
  {
    id: 3,
    name: "달콤한 빵집",
    image: "/stores/bakery/main.jpg",
    profile: "/stores/bakery/profile.jpg",
    location: "예지관 지하1층",
    menu: [
      {
        image: "/menu/croissant.jpg",
        name: "크루아상",
        price: 3500,
      },
      {
        image: "/menu/egg-tart.jpg",
        name: "에그타르트",
        price: 2900,
      },
      {
        image: "/menu/coffee.jpg",
        name: "드립커피",
        price: 3000,
      },
    ],
  },
  {
    id: 4,
    name: "한끼든든분식",
    image: "/stores/snack/main.jpg",
    profile: "/stores/snack/profile.jpg",
    location: "명상관 1층",
    menu: [
      {
        image: "/menu/tteokbokki.jpg",
        name: "떡볶이",
        price: 4000,
      },
      {
        image: "/menu/kimbap.jpg",
        name: "김밥",
        price: 3000,
      },
      {
        image: "/menu/ramen.jpg",
        name: "라면",
        price: 3500,
      },
    ],
  },
  {
    id: 5,
    name: "그린샐러드랩",
    image: "/stores/salad/main.jpg",
    profile: "/stores/salad/profile.jpg",
    location: "창공관 3층",
    menu: [
      {
        image: "/menu/chicken-salad.jpg",
        name: "치킨 샐러드",
        price: 6000,
      },
      {
        image: "/menu/sandwich.jpg",
        name: "샌드위치",
        price: 5500,
      },
      {
        image: "/menu/greek-yogurt.jpg",
        name: "그릭 요거트",
        price: 5000,
      },
    ],
  },
];

export default async function MapDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const storeId = Number(id);
  const store = stores.find((s) => s.id === storeId);

  return <StoreDetail store={store} />;
}
