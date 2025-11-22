import { getStoreDetail, getStoreInfo } from "@/lib/api/store/store";
import StoreDetail from "./components/StoreDetail";

export default async function MapDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const storeId = Number(id);
  const menu = await getStoreDetail(storeId);
  const info = await getStoreInfo(storeId);

  return <StoreDetail menu={menu} storeId={storeId} info={info} />;
}
