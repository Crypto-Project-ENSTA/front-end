import client from "./client";
import { VotingTheme } from "@/types/index";

export const updateTheme = async (payload: Partial<VotingTheme>): Promise<VotingTheme> => {
  const { data } = await client.patch("/config/voting-system-config", payload);
  return data;
};