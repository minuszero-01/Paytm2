"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default async function BalanceGraph({
  balance,
  rampTrans,
}: {
  balance: { amount: number; locked: number };
  rampTrans: { amount: number; time: any }[];
}) {
  let initialBalance = 0;
  const values = rampTrans.map((item) => {
    initialBalance += item.amount;
    return {
      amount: initialBalance / 100,
      time: new Date(item.time).toISOString(),
    };
  });

  const chartData = values;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Balance</CardTitle>
          <CardDescription className="text-lg">
            {"₹" + balance.amount / 100}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            className="mx-auto xl:w-full xl:h-[400px]"
            config={chartConfig}
          >
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="time"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                tickLine={true}
                axisLine={true}
                tickMargin={8}
              />
              <YAxis
                dataKey="amount"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="amount"
                type="natural"
                stroke="#000000"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
      </Card>
    </div>
  );
}
