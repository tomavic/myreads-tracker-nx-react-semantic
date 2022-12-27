import { act, render, renderHook } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { describe, expect, it } from 'vitest';
import { useBooksContext } from './books-context';

import App from '../app';

describe('useBooksContext hook', async () => {
  it('should init store with default values', async () => {
    const { result } = renderHook(() => useBooksContext());

    act(() => {
      result.current.state.books = [];
      result.current.state.searchResults = [];
      result.current.state.loading = false;
    });
    expect(result.current.state.books).toEqual([]);
    expect(result.current.dispatch).toBeInstanceOf(Function);
    expect(result.current.state.searchResults).toEqual([]);
  });

  it('should render app component', () => {
    const { baseElement } = render(<App />, { wrapper: BrowserRouter });

    expect(baseElement).toBeTruthy();
  });
});
