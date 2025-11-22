import { Suspense } from "react";
import Map from "./components/Map";

const page = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <Map />
    </Suspense>
  );
};

export default page;
