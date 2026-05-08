import { useQuery } from "@tanstack/react-query";
import { getVotingStatus } from '../lib/api/votingStatus';
import { VotingStatus } from "@/types/index";

export const useVotingStatus = () => {
  return useQuery<VotingStatus>({
    queryKey: ["voting-status"],
    queryFn: getVotingStatus,
  });
};