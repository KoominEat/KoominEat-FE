export interface Store {
  storeId: number;
  name: string;
  locationName: string;
  image: string;
  backgroundImage: string;
}

export interface Category {
  id: number;
  name: string;
}

export const Categories: Category[] = [
  { id: 1, name: "카페" },
  { id: 2, name: "햄버거" },
  { id: 3, name: "빵" },
  { id: 4, name: "분식/식사" },
  { id: 5, name: "샐러드/샌드위치" },
];

export const getCategoryId = (name: string): number | undefined => {
  return Categories.find((c) => c.name === name)?.id;
};

export interface MenuItem {
  menuId: number;
  name: string;
  price: number;
  image: string;
}

export interface StoreDetail extends Store {
  menuItems: MenuItem[];
}

export interface StoreInfo {
  image: string;
  storeId: number;
  name: string;
  locationId: number;
  locationName: string;
  categoryId: number;
  categoryName: string;
  backgroundImage: string;
}
