import { useMutation } from "@tanstack/react-query";
import { endVote } from "@/lib/api/endVote";
import { EndVoteResponse } from "@/types/index";

export const useEndVote = () => {
  return useMutation<EndVoteResponse, Error>({
    mutationFn: () => endVote(),
  });
};