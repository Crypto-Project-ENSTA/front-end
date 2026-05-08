import client from "./client";
import { VotingResults } from "@/types/index";

export const getVotingResults = async (): Promise<VotingResults> => {
  const { data } = await client.get("/results/tally");
  return data;
};
