export type VotingTheme = {
  num_voters: number;
  vote_theme: string;
  choices: string[];
}

export type RegisterVoterResponse = {
  status: "success" | "error";
  message: "voter registered successfully" | "email already exists";
  voter: string;
};

export type AuthResponse = {
  is_N1_exist: boolean;
}