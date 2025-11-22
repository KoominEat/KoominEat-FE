export interface CartItem {
  storeId: number;
  menuId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  [key: string]: CartItem; // key는 menuItemId 또는 고유 key로 사용
}
