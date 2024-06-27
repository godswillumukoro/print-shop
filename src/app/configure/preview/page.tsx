import { Suspense } from "react";
import { db } from "@/db";
import { notFound } from "next/navigation";
import AddError from "@/components/AddImageError";
import DesignConfigurator from "@/app/configure/preview/DesignPreview";
import Loading from "@/components/Loading"; // Import the loading component

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = searchParams.id;

  if (!id || typeof id !== "string") {
    return <AddError />;
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  // when valid
  return (
    <Suspense fallback={<Loading />}>
      <DesignConfigurator configuration={configuration} />
    </Suspense>
  );
}
