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

export type SubmitVoteResponse = {
  message: string;
  status: string;
}

export type VotingStatus = {
  voting_status: "register" | "vote_started" | "vote_ended";
}

export type TallyEntry = {
  candidate: string;
  count: number;
  percentage: number;
};

export type VotingResults = {
  total_votes: number;
  tally: TallyEntry[];
};

export type VerifyVoteStatus = "valid" | "invalid_signature" | "invalid_n2";

export type VerifyVoteResponse = {
  found: boolean;
  status: VerifyVoteStatus | null;
  vote: string | null;
  message: string;
};

export type StartVoteResponse = {
  status: "success" | "error";
  message: string;
}

export type EndVoteResponse = {
  status: "success" | "error";
  message: string;
}