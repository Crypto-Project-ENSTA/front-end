import client from "./client";
import { VerifyVoteResponse } from "@/types/index";

export const verifyVote = async (n2: string): Promise<VerifyVoteResponse> => {
  const { data } = await client.post("/results/verify-vote", { n2 });
  return data;
};