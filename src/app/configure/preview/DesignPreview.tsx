"use client";

import Pillow from "@/components/Pillow";
import { Button } from "@/components/ui/button";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { cn, formatPrice } from "@/lib/utils";
import {
  BACK_DESIGNS,
  COLORS,
  FABRICS,
  FRINGES,
} from "@/validators/option-validator";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/LoginModal";
import DesignError from "@/components/DesignImageError";
import Loading from "@/components/Loading";

function DesignPreview({ configuration }: { configuration: Configuration }) {
  const { id, quantity } = configuration;
  const { user } = useKindeBrowserClient();

  const router = useRouter();
  const { toast } = useToast();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => setShowConfetti(true));

  const { color, fringe, fabric, backDesign } = configuration;

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  // Calculate total price
  let totalPrice = BASE_PRICE;

  if (quantity) {
    totalPrice = quantity * totalPrice;
  }

  const selectedFabricOption = FABRICS.options.find(
    (option) => option.value === fabric
  );
  if (selectedFabricOption) {
    totalPrice += selectedFabricOption.price;
  }

  const selectedBackDesignOption = BACK_DESIGNS.options.find(
    (option) => option.value === backDesign
  );
  if (selectedBackDesignOption) {
    totalPrice += selectedBackDesignOption.price;
  }

  // trigger button loading state
  const { mutate, isPending } = useMutation({
    mutationKey: ["charge.success"],
    mutationFn: createCheckoutSession,
    // paystack session creation success
    onSuccess: ({ url }) => {
      if (url) {
        router.push(url);
      } else {
        throw new Error("Unable to retrieve payment URL");
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our servers, please try again",
        variant: "destructive",
      });
    },
  });

  // check if user is logged in before proceeding to checkout; If they aren't, save their config to local storage and ask them to login
  const handleCheckout = () => {
    if (user) {
      // create payment method
      mutate({ configId: id });
    } else {
      // keep configuration into localstorage
      localStorage.setItem("configurationId", id);
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 360 }}
        />
      </div>

      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />

      <div className="mt-20 flex flex-col items-center  md:grid  text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <Pillow
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>

        <div className="mt-6 sm:col-span-9 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Review Your Custom pillow
          </h3>

          <div className="mt-8 mb-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600">Base price</p>
                  <p className="text-gray-900 font-medium">
                    {formatPrice(BASE_PRICE)}
                  </p>
                </div>
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600">Quantity</p>
                  <p className="text-gray-900 font-medium">{quantity}</p>
                </div>

                {FABRICS.options.map((option, index) =>
                  fabric === option.value ? (
                    <div
                      key={index}
                      className="flex items-center justify-between py-1 mt-2"
                    >
                      <p className="text-gray-600">{option.label} Fabric</p>
                      <p className="text-gray-900 font-medium">
                        {formatPrice(option.price)}
                      </p>
                    </div>
                  ) : null
                )}
                {BACK_DESIGNS.options.map((option, index) =>
                  backDesign === option.value ? (
                    <div
                      key={index}
                      className="flex items-center justify-between py-1 mt-2"
                    >
                      <p className="text-gray-600">
                        {option.label} Back Design
                      </p>
                      <p className="text-gray-900 font-medium">
                        {formatPrice(option.price)}
                      </p>
                    </div>
                  ) : null
                )}

                <div className="my-2 h-px bg-gray-200"></div>

                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900 ">Total price</p>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end mb-12">
              <Button
                isLoading={isPending}
                disabled={isPending}
                loadingText="Proceeding to payment"
                onClick={() => handleCheckout()}
                className="px-4 sm:px-6 lg:px-8"
              >
                Check out <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9  text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div className="sm:col-span-1">
              <div>
                <p className="font-medium text-zinc-950">What sets us apart</p>
                <ol className="mt-3 text-zinc-700 list-disc list-inside">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-rose-500 mr-2" />
                    Ships in 5 business days
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-rose-500 mr-2" />
                    Secure payment options
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-rose-500 mr-2" />
                    International shipping available
                  </li>
                </ol>
              </div>
            </div>
            <div className="sm:col-span-1">
              <div>
                <p className="font-medium text-zinc-950">Key features</p>
                <ol className="mt-3 text-zinc-700 list-disc list-inside">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-rose-500 mr-2" />
                    Easy Care & Maintenance
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-rose-500 mr-2" />
                    Vibrant, High-Resolution Prints
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-rose-500 mr-2" />
                    Luxuriously Soft & Durable
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesignPreview;
