import { getServerSession } from "next-auth";
import BalanceGraph from "../../../components/BalanceGraph";
import { getId, getBalance } from "../../lib/actions/getUserId";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export default async function () {
  const data1 = await getId();
  const balance1 = await getBalance();
  const session = await getServerSession(authOptions);

  const name = await prisma.user.findFirst({
    where: { id: Number(session?.user?.id) },
  });

  return (
    <div className=" w-[1300px] ">
      {/* dashboard container */}
      <div className="flex flex-col gap-2 ">
        {/* name */}
        <div className="text-4xl mt-2">
          Hello,{" "}
          {name?.name
            ? name?.name.charAt(0).toUpperCase() + name?.name.slice(1)
            : null}
        </div>
        {/* transcation graph */}
        <div className=" flex flex-col gap-2 w-full h-full">
          <div className="m-4 ">
            <BalanceGraph balance={balance1} rampTrans={data1} />
          </div>
        </div>
      </div>
    </div>
  );
}
