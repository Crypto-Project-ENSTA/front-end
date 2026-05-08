"use client";

import Link from "next/link";
import { BadgeCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VoteEnded() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-24 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-muted">
        <BadgeCheckIcon className="size-9 text-muted-foreground" />
      </div>

      <div className="space-y-3 max-w-sm">
        <h2 className="text-2xl font-semibold tracking-tight">
          Voting is closed
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          The voting session has ended. You can check the final results
          or confirm that your vote was counted.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button asChild>
          <Link href="/results">View Results</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/results/verify-vote">Verify My Vote</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}