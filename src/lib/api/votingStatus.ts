import client from "./client";
import { VotingStatus } from "@/types/index";

export const getVotingStatus = async (): Promise<VotingStatus> => {
  const { data } = await client.get("/voting/vote-status");
  return data;
};
