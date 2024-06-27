"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ReactNode, Suspense } from "react";
import Steps from "@/components/Steps";
import Loading from "@/components/Loading";

const Layout = ({ children }: { children: ReactNode }) => {


  return (
    <Suspense fallback={<Loading />}>
      <MaxWidthWrapper className="flex flex-1 flex-col">
        <Steps />
        {children}
      </MaxWidthWrapper>
    </Suspense>
  );
};

export default Layout;
