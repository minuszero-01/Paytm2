import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="overflow-auto h-[400px]">
        {transactions.map((t) => (
          <div className="flex justify-between border-b  mt-2 ">
            <div>
              <div className="flex gap-2 items-center">
                <div className="text-sm">Received INR</div>
                <div
                  className={
                    t.status === "Success"
                      ? "text-sm border p-1 rounded-xl bg-green-300"
                      : "text-sm border p-1 rounded-xl bg-gray-300"
                  }
                >
                  {t.status}
                </div>
              </div>

              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
