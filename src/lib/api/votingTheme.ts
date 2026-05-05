import client from "./client";
import { VotingTheme } from "@/types/index";

export const getVotingTheme = async (): Promise<VotingTheme> => {
  const { data } = await client.get("/config/voting-system-config");
  return data;
};
