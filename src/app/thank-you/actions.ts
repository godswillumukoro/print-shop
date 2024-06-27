"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";

export const thankyouAuth = async () => {
const { getUser } = getKindeServerSession();
const user = await getUser();

if (!user) {
  return notFound();
}

}