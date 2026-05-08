import client from "./client";
import { EndVoteResponse } from "@/types/index";

export const endVote = async (): Promise<EndVoteResponse> => {
  const { data } = await client.post("/voting/end-vote");
  return data;
};