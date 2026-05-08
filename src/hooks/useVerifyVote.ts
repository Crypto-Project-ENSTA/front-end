import { useMutation } from "@tanstack/react-query";
import { verifyVote } from "@/lib/api/verify";
import { VerifyVoteResponse } from "@/types/index";

export const useVerifyVote = () => {
  return useMutation<VerifyVoteResponse, Error, { n2: string }>({
    mutationFn: ({ n2 }) => verifyVote(n2),
  });
};