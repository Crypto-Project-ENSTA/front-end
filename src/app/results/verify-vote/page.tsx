'use client'

import VerifyMyVote from "@/components/Results/VerifyMyVote";
import { useVotingStatus } from "@/hooks/useVoteStatus";
import { Spinner } from "@/components/ui/spinner";
import { VoteNotStarted } from "@/components/Vote/VoteNotStarted";
import { VoteStarted } from "@/components/Vote/VoteStarted";

export default function VerifyMyVotePage() {
  const { data: status, isLoading, isError } = useVotingStatus();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (isError || !status) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive text-sm">
          Failed to load voting status. Please refresh the page.
        </p>
      </div>
    );
  }

  if (status.voting_status === "register") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <VoteNotStarted />
      </div>
    );
  }

  if (status.voting_status === "vote_started") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <VoteStarted />
      </div>
    );
  }
  return <VerifyMyVote />;
}
