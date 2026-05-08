"use client";

import { useVotingResult } from "@/hooks/useVoteResults";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RadialBarChart, RadialBar, PolarRadiusAxis } from "recharts";
import { TallyEntry } from "@/types/index";

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function buildChartConfig(tally: TallyEntry[]): ChartConfig {
  return tally.reduce<ChartConfig>((acc, entry, idx) => {
    acc[entry.candidate] = {
      label: entry.candidate,
      color: CHART_COLORS[idx % CHART_COLORS.length],
    };
    return acc;
  }, {});
}

export default function AdminResults() {
  const { data, isLoading, isError } = useVotingResult();

  if (isLoading)
    return (
      <Card>
        <CardContent className="flex h-40 items-center justify-center">
          <Spinner className="size-6" />
        </CardContent>
      </Card>
    );

  if (isError || !data)
    return (
      <Card>
        <CardContent className="flex h-40 items-center justify-center">
          <p className="text-muted-foreground text-sm">No results available.</p>
        </CardContent>
      </Card>
    );

  const chartConfig = buildChartConfig(data.tally);
  const winner = data.tally.reduce((a, b) => (a.count > b.count ? a : b));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Final Results</h2>
        <p className="text-muted-foreground text-sm mt-1">
          {data.total_votes.toLocaleString()} total votes cast
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Radial chart */}
        <Card>
          <CardHeader>
            <CardTitle>Vote Distribution</CardTitle>
            <CardDescription>Radial breakdown by candidate</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <RadialBarChart
                data={data.tally.map((entry, idx) => ({
                  ...entry,
                  fill: CHART_COLORS[idx % CHART_COLORS.length],
                }))}
                innerRadius={30}
                outerRadius={110}
                dataKey="percentage"
              >
                <PolarRadiusAxis tick={false} axisLine={false} />
                <RadialBar dataKey="percentage" cornerRadius={4} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        value != null ? [`${Number(value).toFixed(1)}%`] : [""]
                      }
                    />
                  }
                />
              </RadialBarChart>
            </ChartContainer>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
              {data.tally.map((entry, idx) => (
                <div
                  key={entry.candidate}
                  className="flex items-center gap-1.5"
                >
                  <span
                    className="size-2.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: CHART_COLORS[idx % CHART_COLORS.length],
                    }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {entry.candidate}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>Ranked by vote count</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {[...data.tally]
              .sort((a, b) => b.count - a.count)
              .map((entry, rank) => {
                const colorIdx = data.tally.findIndex(
                  (e) => e.candidate === entry.candidate,
                );
                return (
                  <div
                    key={entry.candidate}
                    className="flex items-center gap-4"
                  >
                    <span className="text-muted-foreground font-mono text-sm w-4">
                      {rank + 1}
                    </span>
                    <span
                      className="size-2.5 rounded-full shrink-0"
                      style={{
                        backgroundColor:
                          CHART_COLORS[colorIdx % CHART_COLORS.length],
                      }}
                    />
                    <span className="flex-1 text-sm font-medium">
                      {entry.candidate}
                    </span>
                    <span className="text-muted-foreground text-xs font-mono tabular-nums">
                      {entry.count.toLocaleString()} votes
                    </span>
                    <span
                      className="text-xs font-semibold tabular-nums"
                      style={{
                        color: CHART_COLORS[colorIdx % CHART_COLORS.length],
                      }}
                    >
                      {entry.percentage.toFixed(1)}%
                    </span>
                  </div>
                );
              })}

            <div className="mt-2 rounded-lg border px-4 py-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Winner</span>
              <span className="font-semibold">{winner.candidate}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
