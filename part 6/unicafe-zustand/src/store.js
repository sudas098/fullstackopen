import { create } from 'zustand';

const useCounterStore = create(set => ({

    feedBack: {
        good: 0,
        bad: 0,
        neutral: 0,
    },

    incrementGood: () => set(state => ({
        feedBack: { ...state.feedBack, good: state.feedBack.good + 1}
    })),

    incrementNeutral: () => set(state => ({
        feedBack: { ...state.feedBack, neutral: state.feedBack.neutral + 1}
    })),
    incrementBad: () => set(state => ({
        feedBack: { ...state.feedBack, bad: state.feedBack.bad + 1 },
    })),
    resetFeedBack: () => set(state => ({
        feedBack: { ...state.feedBack, good: 0, neutral: 0, bad: 0 }
    }))
}))

export const useFeedBack = () => useCounterStore(state => state.feedBack);
export const useFeedbackAction = () => ({

    incrementGood: useCounterStore(state => state.incrementGood),
    incrementNeutral: useCounterStore((state) => state.incrementNeutral),
    incrementBad: useCounterStore((state) => state.incrementBad),
    resetFeedBack: useCounterStore((state) => state.resetFeedBack),
}) 