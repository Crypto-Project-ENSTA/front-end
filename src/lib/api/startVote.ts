import client from "./client";
import { StartVoteResponse } from "@/types/index";

export const startVote = async (): Promise<StartVoteResponse> => {
  const { data } = await client.post("voting/start-vote");
  return data;
};