import { act, renderHook } from '@testing-library/react';

import { describe, expect, it } from 'vitest';
import { useBooksContext } from './booksContext';

describe('useBooksContext hook', async () => {
  it('should get my books', async () => {
    const { result } = renderHook(() => useBooksContext());
    act(() => {
      result.current.books = [];
    });
    expect(result.current.books).toEqual([]);
    // expect(result.current.getMyBooks).toBeInstanceOf(Function);
    // expect(result.current.getMyBooks).toHaveBeenCalledTimes(1);
  });
});
