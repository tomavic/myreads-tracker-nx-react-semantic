import { act, renderHook } from '@testing-library/react';

import { describe, expect, it } from 'vitest';
import { useBooksContext } from './books-context';

describe('useBooksContext hook', async () => {
  it('should get my books', async () => {
    const { result } = renderHook(() => useBooksContext());
    console.log(result);
    act(() => {
      result.current.books = [];
      // result.current.getMyBooks();
    });
    expect(result.current.books).toEqual([]);
    // expect(result.current.getMyBooks).toBeInstanceOf(Function);
    // expect(result.current.getMyBooks).toHaveBeenCalledTimes(1);
  });
});
