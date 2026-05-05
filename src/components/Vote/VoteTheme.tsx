"use client";
import { useVotingTheme } from "@/hooks/useTheme";
import { Spinner } from "@/components/ui/spinner";

export default function Features() {
  const { data, isLoading, isError } = useVotingTheme();

  if (isLoading) return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-6 py-24 text-center h-screen flex items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
  if (isError) return <p>Failed to load theme.</p>;
  if (!data) return <p>there is no vote</p>;
  return (
    <div className="mx-auto max-w-(--breakpoint-xl) mt-20 px-6 py-24 text-center h-screen">
      <strong className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
        Our Voting Theme
      </strong>
      <h2 className="mx-auto mt-5 max-w-4xl text-balance font-semibold text-4xl leading-[1.2] tracking-tight sm:text-5xl">
        {data.vote_theme}
      </h2>

      <div className="mt-16 flex flex-wrap justify-center items-center gap-4">
        {data.choices.map((choice, idx) => (
          <div
            className="relative w-full overflow-hidden rounded-lg border bg-linear-to-b from-foreground/3 px-6 py-5 sm:max-w-xs flex items-center justify-center"
            key={idx}
          >
              <div className="isolate flex items-center">
                <p className="font-semibold text-xl tracking-[-0.005em]">
                  {choice}
                </p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-20 text-muted-foreground text-xl sm:text-2xl">
        N.B: The maximum number of voters is <strong>{data.num_voters}</strong>.
      </p>
    </div>
  );
}
