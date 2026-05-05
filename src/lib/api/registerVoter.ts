import client from "./client";
import { RegisterVoterResponse } from "@/types/index";

export const registerVoter = async (email: string): Promise<RegisterVoterResponse> => {
  const { data } = await client.post("/voters/register", { email });
  return data;
};