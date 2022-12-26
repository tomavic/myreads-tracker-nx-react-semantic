import { act, renderHook } from '@testing-library/react';

import { describe, expect, it } from 'vitest';
import { useBooksContext } from './books-context';

describe('useBooksContext hook', async () => {
  it('should get my books', async () => {
    const { result } = renderHook(() => useBooksContext());
    act(() => {
      result.current.state.books = [];
    });
    expect(result.current.state.books).toEqual([]);
    expect(result.current.dispatch).toBeInstanceOf(Function);
  });
});
