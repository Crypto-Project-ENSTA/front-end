import { create } from "zustand";

type VoteStore = {
  currentStep: number;
  n1: string | null;
  isAuthenticated: boolean;

  next: () => void;
  back: () => void;
  goTo: (step: number) => void;
  setN1: (n1: string) => void;
  reset: () => void;
};

const TOTAL_STEPS = 3;

export const useVoteStore = create<VoteStore>((set) => ({
  currentStep: 0,
  n1: null,
  isAuthenticated: false,

  next: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS - 1),
    })),

  back: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  goTo: (step) => set({ currentStep: step }),

  setN1: (n1) => set({ n1, isAuthenticated: true }),

  reset: () => set({ currentStep: 0, n1: null, isAuthenticated: false }),
}));