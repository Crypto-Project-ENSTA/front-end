import { useMutation } from "@tanstack/react-query";
import { startVote } from "@/lib/api/startVote";
import { StartVoteResponse } from "@/types/index";

export const useStartVote = () => {
  return useMutation<StartVoteResponse, Error>({
    mutationFn: () => startVote(),
  });
};