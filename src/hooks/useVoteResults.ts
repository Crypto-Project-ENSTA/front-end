import { useQuery } from "@tanstack/react-query";
import { VotingResults } from "@/types/index";
import { getVotingResults } from '../lib/api/votingResults';

export const useVotingResult = () => {
  return useQuery<VotingResults>({
    queryKey: ["voting-results"],
    queryFn: getVotingResults,
  });
};