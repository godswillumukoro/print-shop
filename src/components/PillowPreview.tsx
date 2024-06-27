"use client";

import { Color } from "@prisma/client";
import { useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";

function PillowPreview({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: Color;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  });

  let pillowBackgroundColor = "bg-zinc-950";
  if (color === "blue") {
    pillowBackgroundColor = "bg-blue-950";
  }
  if (color === "rose") {
    pillowBackgroundColor = "bg-rose-950";
  }
  if (color === "black") {
    pillowBackgroundColor = "bg-black-950";
  }

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
      >
        <img
          width={renderedDimensions.width / (3000 / 637)}
          className={cn(
            "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
            color
          )}
          src={croppedImageUrl}
          alt="Pillow held by a happy client"
        />
      </div>

      <div className="relative h-full w-ful z-40">
        <img
          alt="pillow"
          src="/clearphone.png"
          className="pointer-events-none h-full w-full antialiased rounded-md"
        />
      </div>
    </AspectRatio>
  );
}

export default PillowPreview;
