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
  const onP2pTransfer = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });

  const dataFromOnRamp = onRampData.map((t: Getid) => ({
    amount: t.amount,
    time: t.startTime,
  }));

  // Step 2: Map over onP2pTransfer to extract amount and startTime.
  const dataFromOnP2p = onP2pTransfer.map((t) => ({
    amount: -t.amount,
    time: t.timestamp, // Use t.startTime if you meant to use the current item's startTime.
  }));

  const combinedData = [...dataFromOnRamp, ...dataFromOnP2p];

  combinedData.sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );

  return combinedData;
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
