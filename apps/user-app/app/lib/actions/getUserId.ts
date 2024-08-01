"use server";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

export async function getId() {
  interface Getid {
    amount: number;
    startTime: Date;
  }
  const session = await getServerSession(authOptions);
  const onRampData = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
      status: "Success",
    },
  });

  return onRampData.map((t: Getid) => ({
    amount: t.amount,
    time: t.startTime,
  }));
}

export async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}
