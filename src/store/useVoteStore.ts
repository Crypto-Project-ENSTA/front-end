import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type VoteStore = {
  currentStep: number;
  n1: string | null;
  next: () => void;
  goTo: (step: number) => void;
  setN1: (n1: string) => void;
  reset: () => void;
};

const TOTAL_STEPS = 3;

export const useVoteStore = create<VoteStore>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      n1: null,

      next: () => {
        const { currentStep } = get();
        if (currentStep < TOTAL_STEPS - 1) {
          set({ currentStep: currentStep + 1 });
        }
      },

      goTo: (step) => {
        if (step >= 0 && step < TOTAL_STEPS) {
          set({ currentStep: step });
        }
      },

      setN1: (n1) => set({ n1 }),

      reset: () => set({ currentStep: 0, n1: null }),
    }),
    {
      name: "vote-session",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStep: state.currentStep,
        n1: state.n1,
      }),
    },
  ),
);