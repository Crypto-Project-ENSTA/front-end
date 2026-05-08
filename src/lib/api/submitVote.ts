import client from "./client";
import { SubmitVoteResponse } from "@/types/index";

export const submitVote = async (n2: string, vote: string): Promise<SubmitVoteResponse> => {
  const { data } = await client.post("/voters/submit_vote", { n2, vote });
  console.log("submitVote response:", data);
  return data;
};