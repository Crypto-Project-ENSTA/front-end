"use client";

import Link from "next/link";
import { PartyPopperIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVoteStore } from "@/store/useVoteStore";

export function VoteSubmitted() {
  const { reset } = useVoteStore();

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-success/15">
        <PartyPopperIcon className="size-9 text-success" />
      </div>

      <div className="space-y-3 max-w-sm">
        <h2 className="text-2xl font-semibold tracking-tight">
          Thank you for your vote!
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Your opinion has been recorded. Results will be available once
          the voting session ends.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button asChild>
          <Link href="/results">View Results</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/results/verify-vote">Verify My Vote</Link>
        </Button>
        <Button variant="ghost" onClick={reset}>
          Start New Vote
        </Button>
      </div>
    </div>
  );
}