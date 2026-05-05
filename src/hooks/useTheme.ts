import { useQuery } from "@tanstack/react-query";
import { getVotingTheme } from '../lib/api/votingTheme';
import { VotingTheme } from "@/types/index";

export const useVotingTheme = () => {
  return useQuery<VotingTheme>({
    queryKey: ["voting-config"],
    queryFn: getVotingTheme,
  });
};