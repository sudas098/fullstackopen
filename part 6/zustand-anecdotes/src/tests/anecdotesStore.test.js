import { describe, it, beforeEach, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";


vi.mock('../Services/anecdotes.js', () => ({

    default: {
        getAll: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        remove: vi.fn()
    }
}));

import anecdoteServices from '../Services/anecdotes';
// anecdotesStore.test.js (continuing from line 16)

import useAnecdotesStore, { useAnecdotes, useSortedAnecdotes, useInitializeAction, useVoteAction, useSearchAcion } from "../store";

const testAnecdotes = [
  { id: 1, content: 'anecdote alpha', votes: 3 },
  { id: 2, content: 'anecdote beta', votes: 7 },
  { id: 3, content: 'anecdote gamma', votes: 1 },
];

describe('useAnecdotesStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAnecdotesStore.setState({ anecdotes: [], searchedAnecdotes: '' });
  });

  // 6.12 — state is initialized with anecdotes from backend
  it('initializes with anecdotes returned by the backend', async () => {
    anecdoteServices.getAll.mockResolvedValue(testAnecdotes);

    const { result } = renderHook(() => ({
      anecdotes: useAnecdotes(),
      initialize: useInitializeAction(),
    }));

    await act(async () => {
      await result.current.initialize();
    });

    expect(result.current.anecdotes).toEqual(testAnecdotes);
  });

  // 6.13 — component receives anecdotes sorted by votes
  it('sorted anecdotes are returned in descending vote order', () => {
    useAnecdotesStore.setState({ anecdotes: testAnecdotes, searchedAnecdotes: '' });

    const { result } = renderHook(() => useSortedAnecdotes());

    const sorted = result.current;
    expect(sorted[0].votes).toBeGreaterThanOrEqual(sorted[1].votes);
    expect(sorted[1].votes).toBeGreaterThanOrEqual(sorted[2].votes);
  });

  // 6.14 — component receives correctly filtered list
  it('filters anecdotes based on search string', () => {
    useAnecdotesStore.setState({
      anecdotes: testAnecdotes,
      searchedAnecdotes: 'beta',
    });

    const { result } = renderHook(() => useSortedAnecdotes());

    expect(result.current).toHaveLength(1);
    expect(result.current[0].content).toBe('anecdote beta');
  });

  // 6.15 — voting increases vote count
  it('voting an anecdote increases its votes by 1', async () => {
    useAnecdotesStore.setState({ anecdotes: testAnecdotes, searchedAnecdotes: '' });
    anecdoteServices.update.mockResolvedValue({ ...testAnecdotes[0], votes: 4 });

    const { result } = renderHook(() => ({
      anecdotes: useAnecdotes(),
      vote: useVoteAction(),
    }));

    await act(async () => {
      await result.current.vote(1); // vote for id=1 (votes was 3)
    });

    const voted = result.current.anecdotes.find(a => a.id === 1);
    expect(voted.votes).toBe(4);
  });
});