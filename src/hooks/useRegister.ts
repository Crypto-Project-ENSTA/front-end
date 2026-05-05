import { useMutation } from "@tanstack/react-query";
import { registerVoter } from "../lib/api/registerVoter";
import { RegisterVoterResponse } from "@/types/index";

export const useRegisterVoter = () => {
  return useMutation<RegisterVoterResponse, Error, string>({
    mutationFn: (email: string) => registerVoter(email),
  });
};