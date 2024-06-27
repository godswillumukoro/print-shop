import { db } from "@/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import AddError from "@/components/AddImageError";

const DesignConfigurator = dynamic(
  () => import("@/app/configure/design/DesignConfigurator"),
  { ssr: false }
);

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return <AddError />;
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DesignConfigurator
        configId={configuration.id}
        imageUrl={imageUrl}
        imageDimensions={{
          width,
          height,
        }}
      />
    </Suspense>
  );
};

export default page;
