"use client";

import HandleComponent from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatPrice } from "@/lib/utils";
import NextImage from "next/image";
import { Rnd } from "react-rnd";
import { RadioGroup } from "@headlessui/react";
import { useRef, useState } from "react";
import {
  COLORS,
  FRINGES,
  FABRICS,
  DIMENSIONS,
  BACK_DESIGNS,
} from "@/validators/option-validator";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { saveOptionArgs, saveOptions } from "./actions";
import { useRouter } from "next/navigation";

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
}
const DesignConfigurator = ({
  configId,
  imageUrl,
  imageDimensions,
}: DesignConfiguratorProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["save-config"], // for caching
    mutationFn: async (args: saveOptionArgs) => {
      // save cropped image and update db simultaneously
      await Promise.all([saveConfig(), saveOptions(args)]);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was a server error. Please try again",
        variant: "destructive",
      });
    },

    // redirect user to step 3
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  const [quantity, setQuantity] = useState<number>(1);

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    fringe: (typeof FRINGES.options)[number];
    fabric: (typeof FABRICS.options)[number];
    dimension: (typeof DIMENSIONS.options)[number];
    backDesign: (typeof BACK_DESIGNS.options)[number];
  }>({
    color: COLORS[2],
    fringe: FRINGES.options[0],
    fabric: FABRICS.options[0],
    dimension: DIMENSIONS.options[0],
    backDesign: BACK_DESIGNS.options[0],
  });

  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 150,
    y: 205,
  });

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(parseInt(value, 10));
  };

  const pillowTemplateRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { startUpload } = useUploadThing("imageUploader");

  async function saveConfig() {
    try {
      const {
        left: pillowLeft,
        top: pillowTop,
        width,
        height,
      } = pillowTemplateRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = pillowLeft - containerLeft;
      const topOffset = pillowTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;

      await new Promise((resolve) => (userImage.onload = resolve));
      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      // save file
      const blob = base64ToBlob(base64Data, "image/png");
      // the filename.png doesn't matter because uploadThing.com would rename the file
      const file = new File([blob], "filename.png", { type: "image/png" });

      // upload
      await startUpload([file], { configId });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description:
          "We encountered an issue saving your image. Please try again",
        variant: "destructive",
      });
    }
  }

  function base64ToBlob(base64: string, mimeType: string) {
    // conversion
    // turn base64 string encoded into into byteArray
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // turn byteArray into a proper image.png etc...
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[505/509]">
          <AspectRatio
            ref={pillowTemplateRef}
            ratio={505 / 509}
            className="pointer-events-none relative z-50 aspect-[505/509] w-full "
          >
            <NextImage
              fill
              alt="pillow image"
              src="/pillow-template-full.png"
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]"></div>
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px",
              `bg-${options.color.tw}`
            )}
          ></div>
        </div>

        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imageDimensions.height / 4,
            width: imageDimensions.width / 4,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });

            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage
              src={imageUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
        <p className="font-bold absolute top-0 left-0 mt-2 ml-2">
          Drag your image to style the pillow
        </p>
      </div>

      <div className="flex flex-col bg-white h-[37.5rem] w-full col-span-full lg:col-span-1">
        <ScrollArea className="relative flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* gradient */}
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          ></div>

          {/* Options */}
          <div className="px-8 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customize your pillow
            </h2>

            <div className="w-full h-px bg-zinc-200 my-6"></div>

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                {/* Quantity */}
                <div className="relative flex flex-col w-full">
                  <Label className="text-base font-bold">How Many</Label>
                  <input
                    // ref={quantityRef}
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="mt-2 relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between focus:border-primary"
                    placeholder="Enter quantity"
                  />
                </div>

                <RadioGroup
                  value={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: val,
                    }));
                  }}
                >
                  <Label className="text-base font-bold">Color</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.label}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            "relative  -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent",
                            {
                              [`border-${color.tw}`]: active || checked,
                            }
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "h-8 w-8 rounded-full border-black border-opacity-10"
                          )}
                        ></span>
                      </RadioGroup.Option>
                    ))}
                  </div>
                  <span className="font-light text-xs">
                    {options.color.label}
                  </span>
                </RadioGroup>

                <div className="relative flex flex-col gap-3 w-full">
                  <Label className="text-base font-bold">Fringe</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {options.fringe.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {FRINGES.options.map((fringe) => (
                        <DropdownMenuItem
                          key={fringe.label}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                            {
                              "bg-zinc-100":
                                fringe.label === options.fringe.label,
                            }
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, fringe }));
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              fringe.label === options.fringe.label
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {fringe.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {[FABRICS, BACK_DESIGNS].map(
                  ({ name, label, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      value={options[name]}
                      onChange={(val) => {
                        setOptions((prev) => ({
                          ...prev,
                          [name]: val,
                        }));
                      }}
                    >
                      <label className="text-base font-bold">
                        {label.slice(0, 1).toUpperCase() + label.slice(1)}
                      </label>
                      <div className="mt-3 space-y-4">
                        {selectableOptions.map((option) => (
                          <RadioGroup.Option
                            key={option.value}
                            value={option}
                            className={({ active, checked }) =>
                              cn(
                                "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                                {
                                  "border-primary": active || checked,
                                }
                              )
                            }
                          >
                            <span className="flex items-center">
                              <span className="flex flex-col text-sm">
                                <RadioGroup.Label
                                  as="span"
                                  className="font-medium text-gray-900"
                                >
                                  {option.label}
                                </RadioGroup.Label>
                                {option.desc ? (
                                  <RadioGroup.Description
                                    as="span"
                                    className="text-gray-500"
                                  >
                                    <span className="block sm:inline">
                                      {option.desc}
                                    </span>
                                  </RadioGroup.Description>
                                ) : null}
                              </span>
                            </span>
                            <RadioGroup.Description
                              as="span"
                              className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                            >
                              <span className="font-medium text-gray-900">
                                {option.price === 0
                                  ? "Default"
                                  : `+ ${formatPrice(option.price)}`}
                              </span>
                            </RadioGroup.Description>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white">
          <div className="h-px w-full bg-zinc-200" />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  BASE_PRICE + options.fabric.price + options.backDesign.price
                )}
              </p>
              <Button
                isLoading={isPending}
                disabled={isPending}
                loadingText="Saving"
                onClick={() =>
                  mutate({
                    configId,
                    color: options.color.value,
                    fringe: options.fringe.value,
                    fabric: options.fabric.value,
                    backDesign: options.backDesign.value,
                    quantity: quantity,
                  })
                }
                size="sm"
                className="w-full"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
