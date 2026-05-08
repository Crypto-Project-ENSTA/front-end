"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStartVote } from "@/hooks/useStartVote";
import { useEndVote } from "@/hooks/useEndVote";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VotingStatus } from "@/types/index";

type Props = {
  status: VotingStatus["voting_status"];
};

export default function VoteControls({ status }: Props) {
  const queryClient = useQueryClient();
  const { mutate: start, isPending: isStarting } = useStartVote();
  const { mutate: end, isPending: isEnding } = useEndVote();

  const handleStart = () => {
    start(undefined, {
      onSuccess: () => {
        toast.success("Vote started successfully.");
        queryClient.invalidateQueries({ queryKey: ["voting-status"] });
      },
      onError: () => toast.error("Failed to start vote."),
    });
  };

  const handleEnd = () => {
    end(undefined, {
      onSuccess: () => {
        toast.success("Vote ended successfully.");
        queryClient.invalidateQueries({ queryKey: ["voting-status"] });
        queryClient.invalidateQueries({ queryKey: ["voting-results"] });
      },
      onError: () => toast.error("Failed to end vote."),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vote Controls</CardTitle>
        <CardDescription>
          Start or end the voting session. These actions affect all voters immediately.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button
          onClick={handleStart}
          disabled={isStarting || status !== "register"}
          className="bg-success hover:bg-success/90 text-white"
        >
          {isStarting ? "Starting..." : "Start Vote"}
        </Button>
        <Button
          onClick={handleEnd}
          disabled={isEnding || status !== "vote_started"}
          variant="destructive"
        >
          {isEnding ? "Ending..." : "End Vote"}
        </Button>
      </CardContent>
    </Card>
  );
}