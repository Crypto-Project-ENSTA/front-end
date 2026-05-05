import { useMutation } from "@tanstack/react-query";
import { auth } from "@/lib/api/auth";
import { AuthResponse } from "@/types/index";

export const useAuth = () => {
  return useMutation<AuthResponse, Error, string>({
    mutationFn: (n1: string) => auth(n1),
  });
};