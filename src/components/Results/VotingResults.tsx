"use client";

import { useEffect, useState } from "react";
import { useVotingResult } from "@/hooks/useVoteResults";
import { Spinner } from "@/components/ui/spinner";
import { TallyEntry } from "@/types/index";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
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

export default function VotingResults() {
  const { data, isLoading, isError } = useVotingResult();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (isLoading)
    return (
      <div className="mx-auto max-w-(--breakpoint-xl) px-6 py-24 text-center h-screen flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );

  if (isError)
    return (
      <div className="mx-auto max-w-(--breakpoint-xl) px-6 py-24 text-center h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Failed to load results.</p>
      </div>
    );

  if (!data || data.tally.length === 0)
    return (
      <div className="mx-auto max-w-(--breakpoint-xl) px-6 py-24 text-center h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No results available yet.</p>
      </div>
    );

  const chartConfig = buildChartConfig(data.tally);
  const winner = data.tally.reduce((a, b) => (a.count > b.count ? a : b));

  return (
    <div className="mx-auto max-w-(--breakpoint-xl) mt-20 px-6 py-24">
      <div className="text-center mb-16">
        <strong className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
          Election Results
        </strong>
        <h2 className="mx-auto mt-5 max-w-4xl text-balance font-semibold text-4xl leading-[1.2] tracking-tight sm:text-5xl">
          Voting Results
        </h2>
        <p className="mt-4 text-muted-foreground text-lg">
          Final tally across{" "}
          <strong className="text-foreground">{data.tally.length}</strong>{" "}
          candidates
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Votes Cast</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tabular-nums">
              {data.total_votes.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Leading Candidate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold truncate">{winner.candidate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Leading Percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tabular-nums">
              {winner.percentage.toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Votes by Candidate</CardTitle>
            <CardDescription>Absolute vote counts</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart
                data={data.tally}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="candidate"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  width={40}
                  allowDecimals={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {data.tally.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={CHART_COLORS[idx % CHART_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vote Share</CardTitle>
            <CardDescription>Percentage distribution</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <PieChart>
                <Pie
                  data={data.tally}
                  dataKey="percentage"
                  nameKey="candidate"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {data.tally.map((_, idx) => (
                    <Cell
                      key={idx}
                      fill={CHART_COLORS[idx % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  formatter={(value) => (
                    <span className="text-sm text-foreground">{value}</span>
                  )}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) =>
                        value != null ? [`${Number(value).toFixed(1)}%`] : [""]
                      }
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Full Breakdown</CardTitle>
          <CardDescription>All candidates ranked by votes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            {[...data.tally]
              .sort((a, b) => b.count - a.count)
              .map((entry) => {
                const colorIdx = data.tally.findIndex(
                  (e) => e.candidate === entry.candidate,
                );
                return (
                  <div key={entry.candidate} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="size-2.5 rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              CHART_COLORS[colorIdx % CHART_COLORS.length],
                          }}
                        />
                        <span className="font-medium">{entry.candidate}</span>
                      </div>
                      <span className="text-muted-foreground tabular-nums font-mono text-xs">
                        {entry.percentage.toFixed(1)}%{" "}
                        <span className="text-muted-foreground/60">
                          ({entry.count.toLocaleString()} votes)
                        </span>
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: mounted ? `${entry.percentage}%` : "0%",
                          backgroundColor:
                            CHART_COLORS[colorIdx % CHART_COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
