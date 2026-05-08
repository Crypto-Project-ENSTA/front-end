import { useMutation } from "@tanstack/react-query";
import { submitVote } from "@/lib/api/submitVote";
import { SubmitVoteResponse } from "@/types/index";

export const useSubmitVote = () => {
  return useMutation<SubmitVoteResponse, Error, { n2: string; vote: string }>({
    mutationFn: ({ n2, vote }) => submitVote(n2, vote),
  });
};