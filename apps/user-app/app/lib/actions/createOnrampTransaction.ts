"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { paymentProcess } from "../actions/paymentProcess";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  // Ideally the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  const token = (Math.random() * 1000).toString();
  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: Number(session?.user?.id),
      amount: amount * 100,
    },
  });

  // Sending the request to Dummy HDFC Web hook and Assumming that transaction is Succcessful
  // wait for 10seconds :)

  setTimeout(() => {
    paymentProcess(session?.user?.id, token, amount.toString());
  }, 10000);

  return {
    message: "Done",
  };
}
