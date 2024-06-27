import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface PillowProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

const Pillow = ({ imgSrc, className, dark = false, ...props }: PillowProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className,
        "w-full max-w-xs pb-full" // Ensure the container is a square
      )}
      {...props}
    >
      <img
        className="pointer-events-none z-50 select-none"
        src={dark ? "/pillow-template-full.png" : "/pillow-template-full.png"}
        alt="pillow"
      />

      <div className="absolute inset-0 -z-10">
        <img
          src={imgSrc}
          alt="overlay pillow"
          className="min-w-full min-h-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Pillow;
