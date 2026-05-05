import client from "./client";
import { AuthResponse } from "@/types/index";

export const auth = async (n1: string): Promise<AuthResponse> => {
  console.log("Checking N1:", { n1 });
  const { data } = await client.post("/voters/check_n1", { n1 });
  console.log("Auth response:", data);
  return data;
};