import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTheme } from "@/lib/api/updateConfig";
import { VotingTheme } from "@/types/index";

export const useUpdateTheme = () => {
  const queryClient = useQueryClient();
  return useMutation<VotingTheme, Error, Partial<VotingTheme>>({
    mutationFn: updateTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voting-config"] });
    },
  });
};